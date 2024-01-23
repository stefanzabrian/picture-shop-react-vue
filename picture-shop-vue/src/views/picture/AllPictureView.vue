<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { BASE_URL } from "@/router/api";

const auth = useAuthStore();
const token = auth.token;
const data = ref("");

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
      <h3 class="text-base text-center font-semibold leading-7 text-gray-900">
        All Pictures
      </h3>
    </div>
    <div
      v-for="picture in data"
      :key="picture.id"
      class="mt-6 border-t border-gray-100"
    >
      <dl class="divide-y divide-gray-100 border-b border-t">
        <div class="lg:flex lg:flex-1 lg:justify-end">
          <div class="ml-20 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b">
            <dt class="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ picture.name }}
            </dd>
          </div>
          <div
            class="ml-4 mr-20 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b"
          >
            <dt class="text-sm font-medium leading-6 text-gray-900">Price</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ picture.price }}
            </dd>
          </div>
        </div>

        <div class="lg:flex px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900 border-b border-t">
            Description
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ picture.description }}
          </dd>
        </div>
        <div class="flex items-center justify-center mb-10">
          <div class="max-w-[400px] max-h-[400px] overflow-hidden">
            <img
              v-if="picture.pictureUrl"
              :src="picture.pictureUrl"
              alt="Picture"
            />
            <span v-else>No Image Available</span>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>
