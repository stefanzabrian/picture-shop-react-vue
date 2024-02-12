<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-24 w-32 spin"
        src="F:\IT Projects\Picture Shop FrontEnd\React\picture-shop-vue\logo_transparent.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Update Order Status
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
            for="status"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Order Status</label
          >
          <div class="mt-2">
            <select
              id="status"
              name="status"
              v-model="data.status"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="PLACED">Placed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
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
import { useRoute } from "vue-router";

const auth = useAuthStore();
const token = auth.token;
const data = ref({});
const route = useRoute();

onMounted(async () => {
  const orderId = route.params.id;
  const order = route.query.orderId;

  if (order) {
    data.value = JSON.parse(order);
  }
  const response = await fetch(`${BASE_URL}order/update-order/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    data.value = await response.json();
  } else if (response.status == 400) {
    alert("User dont exists");
  } else if (response.status == 204) {
    alert("Order dont exists");
  } else {
    const responseData = await response.json();
    console.log("Error Response", responseData);
  }
});

const onSubmit = async () => {
  const orderId = route.params.id;
  const response = await fetch(`${BASE_URL}order/update-order/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data.value),
  });
  if (response.ok) {
    router.push(`/user/all-orders`);
  } else if (response.status == 400) {
    alert("Status is null");
  } else if (response.status == 204) {
    alert("Order don't exists");
  } else if (response.status == 500) {
    alert("Failed to update the order");
  } else {
    const responseData = response.statusText;
    console.log("Error: ", responseData);
  }
};
</script>

<style scoped></style>
