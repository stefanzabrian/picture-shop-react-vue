<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-24 w-32 spin"
        src="F:\IT Projects\Picture Shop FrontEnd\React\picture-shop-vue\logo-transparent.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Change Password
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        method="POST"
        @submit.prevent="updatePassword"
      >
        <div>
          <label
            for="new password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >New Password</label
          >
          <div class="mt-2">
            <input
              id="new password"
              name="new password"
              type="text"
              v-model="clientData.newPassword"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="confirm password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Confirm Password</label
          >
          <div class="mt-2">
            <input
              id="confirm password"
              name="confirm password"
              type="text"
              v-model="clientData.confirmPassword"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Change
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { BASE_URL } from "@/router/api";
import { useAuthStore } from "@/stores/auth";
import { usePassStore } from "@/stores/pass";
import { ref } from "vue";

const passToken = usePassStore().passToken;
const token = useAuthStore().token;
const clientData = ref({});

const updatePassword = async () => {
  if (clientData.value.newPassword !== clientData.value.confirmPassword) {
    alert("New password and confirm password do not match");
    return; // Prevent further execution
  }

  const response = await fetch(`${BASE_URL}user/update-password?token=${passToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(clientData.value),
  });
  if (response.status == 200) {
    alert("Password changed");
    localStorage.removeItem("passToken");
    router.push("/");
  } else {
    alert("Failed to update password");
    const errorBody = await response.json();
    console.log(errorBody);
  }
};
</script>
