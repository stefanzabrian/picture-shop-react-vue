<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from "vue-router";
import { 
  Popover, 
  PopoverButton, 
  PopoverGroup,  
  PopoverPanel } from "@headlessui/vue";

  import { ChevronDownIcon } from '@heroicons/vue/20/solid';
  import {
  CursorArrowRaysIcon,
  SquaresPlusIcon,
} from '@heroicons/vue/24/outline'

  const products = [
  { name: 'View all', description: 'View all Pictures', href: '/picture/all', icon: CursorArrowRaysIcon },
  { name: 'Create', description: 'Add new picture', href: '/picture/create', icon: SquaresPlusIcon },
]

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
      </div>
      <div class="ml-4">
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text leading-6 text-gray-900">
            Picture
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in products" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                  <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <a :href="item.href" class="block font-semibold text-gray-900">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </a>
                    <p class="mt-1 text-gray-600">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </PopoverGroup>
      </div>
      <div class="lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-orange-800 ml-4">Hello {{ auth.user }}</a>
        <a href="#" class="ml-4 text-indigo-400" @click="logout">Logout</a>
      </div>
      </nav>
    </header>
  </div>
</template>
