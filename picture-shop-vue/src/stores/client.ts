import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { BASE_URL } from "@/router/api";
import router from "@/router";

export const useClientStore = defineStore({
    id: "cl",
    actions: {
        async add(
            firstName: string,
            lastName: string,
            address: string,
            phoneNumber: number
        ) {
            const auth = useAuthStore();
            const token = auth.token;
            const response = await fetch(`${BASE_URL}user/edit-client`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({firstName,lastName,address,phoneNumber})
            });
            if (response.status == 202) {
                alert("Details updated!");
                router.push("/");
            } else {
                const errorBody = await response.json();
                console.log(errorBody);
                throw new Error("Error updating details");
            }
        }
    }
})