import router from "@/router";
import { defineStore } from "pinia";
import { BASE_URL } from "@/router/api";


export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const currendDate = new Date();
    const isTokenExpired = expirationDate < currendDate;
    localStorage.setItem('isExpired', JSON.stringify(isTokenExpired));

    const storedAuthority = localStorage.getItem("authority");


    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken ? JSON.parse(storedToken) : null,

      authority: storedAuthority ? JSON.parse(storedAuthority) : null,
      returnUrl: "/",
    };
  },
  actions: {
    async login(email: string, password: string) {
      const response = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status == 200) {
        const responseData = await response.json();
        const accessToken = responseData.accessToken;
        const expirationDate = responseData.expirationDate;

        const tokenPayload = parseJwt(accessToken);
        const authority = tokenPayload.authorities[0];

        localStorage.setItem("user", JSON.stringify(email));
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("expirationDate", JSON.stringify(expirationDate));
        localStorage.setItem("authority", JSON.stringify(authority));
        this.user = email;
        this.token = accessToken;
        this.authority = authority;
        router.push(this.returnUrl || "/");
        return true;
      } else {
        return false;
      }
    },


    logout() {
      this.user = null;
      this.token = null;
      this.authority = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("isTokenExpired");
      localStorage.removeItem("authority");
      router.push("/login");
    },
  },
});
// Function to parse JWT token
function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

