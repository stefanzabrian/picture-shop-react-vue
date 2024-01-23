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
    <h1 class="text-3xl mb-8">Dashboard</h1>
    <p>This is the dashboard</p>

  </div>
</template>
