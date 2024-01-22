<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { BASE_URL } from "@/router/api";

const auth = useAuthStore();
const token = auth.token;
const data = ref("");

onMounted(async () => {

    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      data.value = await response.text();
    } if (response.status == 401) {
      
      auth.logout();
    }
});
</script>

<template>
  <h1 class="text-3xl mb-8">Dashboard</h1>
  <p>{{ data }}</p>
</template>
