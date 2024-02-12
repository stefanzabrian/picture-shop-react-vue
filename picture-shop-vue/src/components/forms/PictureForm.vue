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
        Add new picture
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        method="POST"
        @submit.prevent="onAddPicture"
      >
        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Name</label
          >
          <div class="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              v-model="picture.name"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="price"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Price</label
            >
          </div>
          <div class="mt-2">
            <input
              id="price"
              name="price"
              type="number"
              v-model="picture.price"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="description"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Description</label
            >
          </div>
          <div class="mt-2">
            <input
              id="description"
              name="description"
              type="text"
              v-model="picture.description"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="pictureUrl"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Picture Url</label
            >
          </div>
          <div class="mt-2">
            <input
              id="pictureUrl"
              name="pictureUrl"
              type="text"
              v-model="picture.pictureUrl"
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
            Add
          </button>
        </div>
      </form>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { usePictureStore } from "@/stores/picture";

const picture = reactive({
  name: "",
  price: 0,
  description: "",
  pictureUrl: "",
});

function onAddPicture() {
  if (
    picture.name != "" &&
    picture.price != 0 &&
    picture.description != "" &&
    picture.pictureUrl != ""
  ) {
    usePictureStore().add(picture.name,picture.price,picture.description,picture.pictureUrl);
  }
}
</script>
