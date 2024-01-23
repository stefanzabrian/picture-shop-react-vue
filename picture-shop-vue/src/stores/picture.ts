import { BASE_URL } from "@/router/api";
import { defineStore } from "pinia";
import router from "@/router";
import { useAuthStore } from "./auth";

export const usePictureStore = defineStore({
  id: "add",
  actions: {
    async add(
      name: string,
      price: number,
      description: string,
      pictureUrl: string
    ) {
      const auth = useAuthStore();
      const token = auth.token;
      const response = await fetch(`${BASE_URL}picture/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price, description, pictureUrl }),
      });
      if (response.status == 201) {
        alert("Picture added successfully");
        router.push("/");
      } else {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new Error("Error creating the use");
      }
      console.log(response.status);
    },
  },
});
