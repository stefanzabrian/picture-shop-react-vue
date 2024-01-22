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
      <nav class="flex items-center justify between">
        <div>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/about" class="ml-3">About</RouterLink>
        <a href="#" class="ml-4 text-indigo-400" @click="logout">Logout</a>
      </div>
      <div class="lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-indigo-700 ml-4 mr-10">Hello <span>&#9775;</span></a>
      </div>
      </nav>
    </header>
  </div>
</template>
