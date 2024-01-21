import router from "@/router";
import { defineStore } from "pinia";


export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    const currendDate = new Date();
    const isTokenExpired = expirationDate < currendDate;
    localStorage.setItem('isExpired', JSON.stringify(isTokenExpired));
    console.log('Is token expired?',isTokenExpired);
    console.log(expirationDate);

    
    //console.log("Stored user:", storedUser);
    //console.log("Stored token:", storedToken);

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken ? JSON.parse(storedToken) : null,
      returnUrl: "/",
    };
  },
  actions: {
    async login(email: string, password: string) {
      const response = await fetch("http://localhost:8080/login", {
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

        localStorage.setItem("user", JSON.stringify(email));
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("expirationDate", JSON.stringify(expirationDate));
        this.user = email;
        this.token = accessToken;
        router.push(this.returnUrl || "/");

        
      } else {
        throw new Error("Inavlid credentials");
      }
      
      console.log(response.status);
      console.log(response);
    },


    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("isTokenExpired");
      router.push("/login");
    },
  },
});
