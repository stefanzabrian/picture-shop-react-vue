<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { BASE_URL } from "@/router/api";
import router from "@/router";

const auth = useAuthStore();
const token = auth.token;
const data = ref("");

const navigateToSinglePicture = (picture) => {
  console.log("Clicken on the image:", picture);
  router.push({
    name: "single-picture-view",
    params: { id: picture.id.toString() },
    query: { pictureId: picture.id.toString() },
  });
};

onMounted(async () => {
  const response = await fetch(`${BASE_URL}picture/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    data.value = await response.json();
  }
  if (response.status == 204) {
    console.log("No Content available");
    alert("No content available yet!");
  }
  if (response.status == 401) {
    auth.logout();
  }
});
</script>

<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-3xl text-center font-semibold leading-7 text-gray-900">
        All Pictures
      </h3>
    </div>
    <div
      v-for="picture in data"
      :key="picture.id"
      class="mt-6"
    >
      <dl class="divide-y border-b border-t border-r border-l border-indigo-500">
        <div>
          <div
            class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b"
          >
            <dt class="ml-4 text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ picture.name }}
            </dd>
          </div>
          <div
            class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b"
          >
            <dt class="ml-4 text-sm font-medium leading-6 text-gray-900">Price</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ picture.price }}
            </dd>
          </div>
          <div
            class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          >
            <dt class="ml-4 text-sm font-medium leading-6 text-gray-900">
              Description
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ picture.description }}
            </dd>
          </div>
        </div>

        <div class="flex items-center justify-center mb-5">
          <img
            v-if="picture.pictureUrl"
            :src="picture.pictureUrl"
            alt="Picture"
            @click="navigateToSinglePicture(picture)"
            class="max-w-[400px] max-h-[400px] cursor-pointer mt-5"
          />
          <span v-else>No Image Available</span>
        </div>

        <div class="lg:flex lg:justify-end"></div>
      </dl>
    </div>
  </div>
</template>
