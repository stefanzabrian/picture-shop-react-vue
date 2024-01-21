<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";

</script>

<template>
  <div class="min-h-screen bg-gray-100 container mx-auto">
    <HeaderComponent/>
    <main class="p-8">
      <RouterView/>
    </main>
  </div>
</template>
