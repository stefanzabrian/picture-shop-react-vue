<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { BASE_URL } from "@/router/api";
import router from "@/router";

const auth = useAuthStore();
const token = auth.token;
const data = ref("");

const navigateToSinglePicture = (picture) => {
  router.push({
    name: "single-picture-view",
    params: { id: picture.id.toString() },
    query: { pictureId: picture.id.toString() },
  });
};

const addToShoppingCart = async (picture) => {
  const response = await fetch(
    `${BASE_URL}shopping-cart-add/${picture.id}?origin=home`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',  // Include cookies in cross-origin requests
      mode: 'cors',
    }
  );
  if (response.status == 202) {
    // Access the JSESSIONID cookie from the response
    const jsessionIdCookie = response.headers.get('Set-Cookie');
    
    // Store the cookie in your preferred way (localStorage, cookies, etc.)
    document.cookie = jsessionIdCookie;

    console.log(`Headers`, document.cookie);

  } else if (response.status == 200) {
    router.push("/");
  } else {
    const errorData = response.statusText;
    console.log(errorData);
  }
};

onMounted(async () => {
  const response = await fetch(`${BASE_URL}picture/all`, {
    method: "GET",
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
  <h3 class="text-3xl text-center font-semibold leading-2 text-gray-900 mb-1">
    All Pictures
  </h3>
  <div class="flex flex-wrap justify-center">
    <div
      v-for="picture in data"
      :key="picture.id"
      class="flex flex-wrap justify-center max-w-sm rounded overflow-hidden shadow-lg ml-2 mr-2 mb-4 mt-4"
    >
      <div
        class="max-w-sm rounded overflow-hidden shadow-lg ml-2 mr-2 mb-4 mt-2"
      >
        <div class="image-container">
          <img
            v-if="picture.pictureUrl"
            :src="picture.pictureUrl"
            @click="navigateToSinglePicture(picture)"
            alt="Picture"
            class="shadow-lg w-[400px] h-[400px] cursor-pointer"
          />
          <span v-else>No Image Available</span>
        </div>

        <div class="description-container">
          <div class="px-6 py-4 flex flex-1 flex-col">
            <div class="font-bold text-xl mb-2">{{ picture.name }}</div>

            <div>
              <p class="text-gray-700 text-base">
                {{ picture.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          class="bottom-section flex flex-row items-center justify-between px-6 pt-1 pb-5"
        >
          <div class="px-6 pt-1 pb-5">
            <p class="text-xs text-gray-500 dark:text-gray-400 ml-2 mb-2">
              Price
            </p>
            <span
              class="inline-block bg-amber-500 rounded-md px-9 py-3 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >{{ picture.price }}</span
            >
          </div>

          <div class="px-6 pt-1 pb-5 shadow-lg">
            <p class="text-xs text-gray-500 dark:text-gray-400 ml-2 mb-2">
              Buy
            </p>
            <button
            @click="addToShoppingCart(picture)"
              class="bg-amber-700 rounded-md hover:bg-amber-900 text-white font-bold py-2 px-5"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.description-container {
  height: 20em; /* Set your desired height */
  overflow-y: auto;
}
</style>
