<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { BASE_URL } from "@/router/api";
import { useRoute } from "vue-router";
import { usePictureStore } from "@/stores/picture";

const auth = useAuthStore();
const token = auth.token;
const data = ref("");
const route = useRoute();
const pic = usePictureStore();

const canEdit = ref(false);
const canDelete = ref(false);

onMounted(async () => {
  const authorityObject = JSON.parse(localStorage.getItem("authority"));
  const authority = authorityObject ? authorityObject.authority : null;

  // Check if the user is ADMIN or MODERATOR
  if (authority === "ADMIN" || authority === "MODERATOR") {
    canEdit.value = true;
    canDelete.value = true;
  }

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
      <h3 class="text-3xl text-center font-semibold leading-7 text-gray-900">
        {{ data.name }}
      </h3>
    </div>
    <div class="lg:flex lg:justify-end">
      <div v-if="canEdit" class="ml-4 px-4 py-6 sm:grid">
        <div>
          <router-link
            :to="{ name: 'edit-picture-view', params: { id: data.id } }"
            class="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </router-link>
        </div>
      </div>

      <div
        v-if="canDelete"
        class="ml-4 px-4 py-5 sm:grid sm:grid-cols-1.5 sm:px-0"
      >
        <div>
          <button
            type="submit"
            @click="pic.delete(data.id)"
            class="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <dl
        class="divide-y border-b border-t border-r border-l border-indigo-500 mb-10 rounded-lg"
      >
        <div>
          <div
            class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b"
          >
            <dt class="ml-4 text-sm font-medium leading-6 text-gray-900">
              Name
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ data.name }}
            </dd>
          </div>
          <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="ml-4 text-sm font-medium leading-6 text-gray-900">
              Price
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ data.price }}
            </dd>
          </div>
        </div>

        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="ml-4 text-sm font-medium leading-6 text-gray-900">
            Description
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ data.description }}
          </dd>
        </div>
        <div class="flex items-center justify-center">
          <div class="overflow-hidden mt-5 mb-5 mr-5 ml-5 shadow-lg">
            <img v-if="data.pictureUrl" :src="data.pictureUrl" alt="Picture" />
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>
