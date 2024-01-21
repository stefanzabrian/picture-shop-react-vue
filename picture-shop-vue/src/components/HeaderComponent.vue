<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from "vue-router";

const auth = useAuthStore();

function logout() {
  auth.logout();
}


</script>

<template>
  <div>
    <header class="p-8">
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/about" class="ml-3">About</RouterLink>
        <a href="#" class="ml-4 text-indigo-400" @click="logout">Logout</a>
      </nav>
    </header>
  </div>
</template>
