<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { BASE_URL } from "@/router/api";
import { useRoute } from "vue-router";

const auth = useAuthStore();
const token = auth.token;
const data = ref("");
const route = useRoute();

onMounted(async () => {
  const pictureId = route.params.id;
  const picture = route.query.pictureId;

  if (picture) {
    data.value = JSON.parse(picture);
  }
  const response = await fetch(`${BASE_URL}picture/${pictureId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    data.value = await response.json();
  } else if (response.status == 204) {
    console.log("No Content available");
    alert("No content available yet!");
  } else {
  
    console.error("Error fetching picture by ID:", response.statusText);
  }
});
</script>

<template>
  <div>
    <div class="px-4 sm:px-0">
      <h3 class="text-base text-center font-semibold leading-7 text-gray-900">
        {{ data.name }}
      </h3>
    </div>
    <div
      class="mt-6 border-t border-gray-100"
    >
      <dl class="divide-y divide-gray-100 border-b border-t">
        <div class="lg:flex lg:flex-1 lg:justify-end">
          <div
            class="ml-20 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b"
          >
            <dt class="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ data.name }}
            </dd>
          </div>
          <div
            class="ml-4 mr-20 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b"
          >
            <dt class="text-sm font-medium leading-6 text-gray-900">Price</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ data.price }}
            </dd>
          </div>
        </div>

        <div class="lg:flex px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt
            class="text-sm font-medium leading-6 text-gray-900 border-b border-t"
          >
            Description
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ data.description }}
          </dd>
        </div>
        <div class="flex items-center justify-center mb-10">
          <div class="overflow-hidden">
            <img
              v-if="data.pictureUrl"
              :src="data.pictureUrl"
              alt="Picture"
            />
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>
