<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-24 w-32 spin"
        src="F:\IT Projects\Picture Shop FrontEnd\React\picture-shop-vue\logo-transparent.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        method="POST"
        @submit.prevent="onSubmit"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              v-model="user.email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              v-model="user.password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <div class="text-sm mt-4">
          <a
            href="/user/forgot-password"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
            >Forgot password?</a
          >
        </div>

      <p class="mt-5 text-center text-sm text-gray-500">
        Not a member?
        <a
          href="/register"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Create an account</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";

const user = reactive({
  email: "",
  password: "",
});

async function onSubmit() {
  if (user.email != "" && user.password != "") {
    const loginSuccess = await useAuthStore().login(user.email, user.password);
    if (!loginSuccess) {
      alert('Invalid Credentials!');
    }
  }
}
</script>

<style scoped></style>
