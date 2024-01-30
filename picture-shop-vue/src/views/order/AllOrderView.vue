<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { BASE_URL } from "@/router/api";
import { onMounted, ref } from "vue";

const auth = useAuthStore();
const token = auth.token;
const data = ref({});

onMounted(async () => {
  const response = await fetch(`${BASE_URL}order/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    data.value = await response.json();
  }
  if (response.status == 204) {
    alert("No Orders yet!");
  }
});

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
</script>

<template>
  <div v-for="order in data[0]" :key="order.id">
    <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <li class="pb-3 sm:pb-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <!-- Order Number -->
          <div class="flex-shrink-0">
            <p class="text-xs text-gray-500 dark:text-gray-400">Order Number</p>
            {{ order.orderNumber }}
          </div>

          <!-- Full Name -->
          <div class="flex-shrink-0">
            <p class="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
            {{ order.client.firstName + " " + order.client.lastName }}
          </div>

          <!-- Email -->
          <div class="flex-shrink-0">
            <p class="text-xs text-gray-500 dark:text-gray-400">Email</p>
            {{ auth.user }}
          </div>

          <!-- Date of Order -->
          <div class="flex-shrink-0">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Date when ordered
            </p>
            {{ new Date(order.dateOfOrder).toLocaleDateString() }}
          </div>

          <!-- Total Price -->
          <div class="flex-shrink-0">
            <p class="text-xs text-gray-500 dark:text-gray-400">Total Price</p>
            {{ order.totalPrice }}
          </div>

          <!-- Status -->
          <div class="flex-shrink-0">
            <p class="text-xs text-gray-500 dark:text-gray-400">Status</p>
            {{ getOrderStatusDisplayName(order.status) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
