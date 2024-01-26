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
        router.push("/picture/all");
      } else {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new Error("Error creating the picture");
      }
      console.log(response.status);
    },

    async delete(id: number) {
      const auth = useAuthStore();
      const token = auth.token;
      const response = await fetch(`${BASE_URL}picture/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 202) {
        alert("Picture Deleted!");
        router.push('/picture/all')
      } else {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new Error("Error deleting the picture");
      }
      console.log(response.status);
    },

    async getById(id: number): Promise<any> {
      const auth = useAuthStore();
      const token = auth.token;
      try {
        const response = await fetch(`${BASE_URL}picture/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status == 200) {
          const data = await response.json();
          return data;
          // i want to return the value on the method call ??
        } else {
          const errorBody = await response.json();
          console.log("Error fetching picture by ID: ", errorBody);
          throw new Error("Error fetchign picture by Id");
        }
      } catch (error) {
        console.error("Error fetching the picture by Id", error);
        throw new Error("Failed to fetch picture by Id");
      }
    },
  },
});
