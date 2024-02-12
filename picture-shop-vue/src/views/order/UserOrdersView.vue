<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { BASE_URL } from "@/router/api";
import { onMounted, ref } from "vue";
import router from "@/router";

const auth = useAuthStore();
const token = auth.token;
const orders = ref({});

const navigateToSingleOrder = (order) => {
  router.push({
    name: "single-order-view",
    params: { id: order.id.toString() },
    query: { orderId: order.id.toString() },
  });
};

const navigateToUpdateOrder = (order) => {
  router.push({
    name: "update-order-view",
    params: { id: order.id.toString() },
    query: { orderId: order.id.toString() },
  });
};

onMounted(async () => {
  const response = await fetch(`${BASE_URL}order/user-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    orders.value = await response.json();
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
  <div>
    <div v-if="orders.length > 0">
      <div v-for="order in orders" :key="order.id" class="flex items-center border-b border-r border-l border-t">
        <ul class="flex ml-2 max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <li class="sm:pb-4 sm:pt-4">
        <div class="rtl:space-x-reverse">
          <div class="flex border-r">
            <!-- Ordered By -->
            <div class="flex-shrink-0 w-64">
              <p class="text-xs text-gray-500 dark:text-gray-400">Ordered By</p>
              {{ order.client.firstName + " " + order.client.lastName }}
            </div>

            <!-- Email -->
            <div class="flex-shrink-0 w-64">
              <p class="text-xs text-gray-500 dark:text-gray-400">Email</p>
              {{ order.email }}
            </div>

            <!-- Address -->
            <div class="flex-shrink-0 w-128">
              <p class="text-xs text-gray-500 dark:text-gray-400">To Address</p>
              {{ order.client.address }}
            </div>
          </div>

          <div class="flex items-center">
            <!-- Order Number -->
            <div class="flex-shrink-0 w-64">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Order Number
              </p>
              {{ order.orderNumber }}
            </div>

            <!-- Date of Order -->
            <div class="flex-shrink-0 w-64">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Date when ordered
              </p>
              {{ new Date(order.dateOfOrder).toLocaleDateString() }}
            </div>

            <!-- Total Price -->
            <div class="flex-shrink-0 w-64">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Total Price
              </p>
              {{ order.totalPrice }}
            </div>

            <!-- Status -->
            <div class="flex-shrink-0 w-64">
              <p class="text-xs text-gray-500 dark:text-gray-400">Status</p>
              {{ getOrderStatusDisplayName(order.status) }}
            </div>

            <!-- Button-->
            <div class="flex-shrink-0 w-24">
              <p class="text-xs text-gray-500 dark:text-gray-400">Options</p>
              <button
                type="submit"
                @click="navigateToSingleOrder(order)"
                class="rounded-md bg-blue-600 mt-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                View
              </button>
            </div>

            <!-- Button-->
            <div class="flex-shrink-0 w-32 mt-4">
              <button
                type="submit"
                @click="navigateToUpdateOrder(order)"
                class="rounded-md bg-blue-600 mt-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
      </div>
    </div>
  </div>
</template>
