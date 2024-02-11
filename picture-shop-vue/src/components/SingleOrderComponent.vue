<script setup lang="ts">
import router from "@/router";
import { BASE_URL } from "@/router/api";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const auth = useAuthStore();
const token = auth.token;
const data = ref("");
const route = useRoute();

const getOrderStatusDisplayName = (status) => {
  switch (status) {
    case "PLACED":
      return "Placed";
    case "IN_PROGRESS":
      return "In Progress";
    case "DELIVERED":
      return "Delivered";
    default:
      return status;
  }
};

const navigateToSinglePicture = (picture) => {
  router.push({
    name: "single-picture-view",
    params: { id: picture.id.toString() },
    query: { pictureId: picture.id.toString() },
  });
};

onMounted(async () => {
  const orderId = route.params.id;
  const order = route.query.orderId;

  if (order) {
    data.value = JSON.parse(order);
  }
  const response = await fetch(
    `${BASE_URL}order/single-order-view/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    data.value = await response.json();
  } else {
    alert("Error");
  }
});
</script>

<template v-if="data && data.client">
    <div>
      <table class="border-t border-r border-l border-indigo-500">
        <thead>
          <tr class="border-b border-t border-r border-l max-w-md border-indigo-500">
            <!-- Modifications start here -->
            <th class="w-64 text-left pl-4">Number</th>
            <th class="w-64 text-left">Date</th>
            <th class="w-64 text-left">Total price</th>
            <th class="w-64 text-left">Status</th>
            <th class="w-64 text-left">Client</th>
            <th class="w-64 text-left">Email</th>
            <!-- Modifications end here -->
          </tr>
        </thead>
        <!-- Modifications start here -->
        <tbody>
          <tr>
            <td class="w-64 pl-4">{{ data.orderNumber }}</td>
            <td class="w-64">{{ new Date(data.dateOfOrder).toLocaleDateString() }}</td>
            <td class="w-64">${{ data.totalPrice }}</td>
            <td class="w-64">{{ getOrderStatusDisplayName(data.status) }}</td>
            <td class="w-64">
              {{ data.client && data.client.firstName }}
              {{ data.client && data.client.lastName }}
            </td>
            <td class="w-64">{{ data.email }}</td>
          </tr>
        </tbody>
        <!-- Modifications end here -->
      </table>
      <table class="border-b border-t border-r border-l border-indigo-500">
        <thead>
          <tr>
            <!-- Modifications start here -->
            <th class="w-512 py-4">Pictures</th>
            <!-- Modifications end here -->
          </tr>
        </thead>
        <!-- Modifications start here -->
        <tbody>
          <tr>
            <td>
              <!-- Iterate over order items and display them -->
              <div
                v-for="item in data.items"
                :key="item.id"
                class="flex space-x-4 border-b border-indigo-500 py-4"
              >
                <img
                  :src="item.pictureUrl"
                  alt="Item Image"
                  @click="navigateToSinglePicture(item)"
                  class="ml-4 w-32 h-32 flex-none rounded-lg cursor-pointer"
                />
                <div class="flex flex-col w-full">
                  <p class="font-semibold">{{ item.name }}</p>
                  <p class="text-indigo-600">${{ item.price }}</p>
                  <p class="text-gray-500">{{ item.description }}</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- Modifications end here -->
      </table>
    </div>
  </template>

<style scoped></style>
