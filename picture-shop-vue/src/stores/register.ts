import router from "@/router";
import { BASE_URL } from "@/router/api";
import { defineStore } from "pinia";


export const useRegisterStore = defineStore({
    id: "register",
   actions: {
    async register(email:string, password:string){
        const response = await fetch(`${BASE_URL}register`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({email,password}),
        });
        if (response.status == 201) {
            alert("Account Created");
            router.push('/login');
        } else if (response.status == 409) {
            alert("Email already exists.")

        } else {
            throw new Error("Error creating the user")
        }
        console.log(response.status);
    }
   }
})