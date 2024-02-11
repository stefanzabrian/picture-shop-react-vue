<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-24 w-32 spin"
        src="F:\IT Projects\Picture Shop FrontEnd\React\picture-shop-vue\logo_transparent.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Edit Details
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        method="POST"
        @submit.prevent="saveClient"
      >
        <div>
          <label
            for="first name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >
          <div class="mt-2">
            <input
              id="first name"
              name="first name"
              type="text"
              v-model="clientData.firstName"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="last name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Last Name</label
            >
          </div>
          <div class="mt-2">
            <input
              id="last name"
              name="last name"
              type="text"
              v-model="clientData.lastName"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="address"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Address</label
            >
          </div>
          <div class="mt-2">
            <input
              id="address"
              name="address"
              type="text"
              v-model="clientData.address"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="phone number"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Phone Number</label
            >
          </div>
          <div class="mt-2">
            <input
              id="phone number"
              name="phone number"
              type="text"
              v-model="clientData.phoneNumber"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="text-sm">
          <a
            href="/user/verify-identity"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
            >Change password?</a
          >
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
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
import { onMounted, ref } from "vue";

const token = useAuthStore().token;
const clientData = ref({});

onMounted(async () => {
  const response = await fetch(`${BASE_URL}user/view-client`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    clientData.value = await response.json();
  } else if (response.status == 204) {
    console.log("No Content available");
    alert("No content available yet");
  } else {
    const errorBody = response.json();
    console.log(errorBody);
    console.log(JSON.stringify(errorBody));
  }
});

const saveClient = async () => {
  const response = await fetch(`${BASE_URL}user/edit-client`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(clientData.value),
  });

  if (response.status == 202) {
    alert("Details updated");
    router.push("/");
  } else {
    const errorBody = await response.json();
    console.log(errorBody);
  }
};
</script>
