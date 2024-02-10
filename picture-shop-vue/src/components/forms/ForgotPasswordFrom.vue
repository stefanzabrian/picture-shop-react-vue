<script setup lang="ts">
import router from "@/router";
import { BASE_URL } from "@/router/api";
import { useAuthStore } from "@/stores/auth";
import { usePassStore } from "@/stores/pass";
import { ref } from "vue";

const passToken = usePassStore().passToken;
const token = useAuthStore().token;
const clientData = ref({});


const requestForgotPassword = async () => {
  const response = await fetch(`${BASE_URL}user/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": " application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(clientData.value),
  });

  localStorage.removeItem("passToken");
  if (response.status == 200) {
    alert("Check your email for reset password link");
    const responseData = await response.text();
    localStorage.setItem("passToken", responseData);
    router.push("/");
  } else if (response.status == 400) {
    alert("Email don't exists");
    const errorBody = await response.json();
    console.log(errorBody);
  } else if (response.status == 500) {
    alert("Failed to send email");
    const errorBody = await response.json();
    console.log(errorBody);
  }
  console.log("Pass Token ", passToken);
};
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://www.freeiconspng.com/uploads/blue-ee-game-logo-png-images-24.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Enter E-mail Address
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        method="POST"
        @submit.prevent="requestForgotPassword"
      >
        <div>
          <label
            for="current password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Current Email</label
          >
          <div class="mt-2">
            <input
              id="current email"
              name="current email"
              type="email"
              v-model="clientData.currentPassword"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="!clientData.currentPassword"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
