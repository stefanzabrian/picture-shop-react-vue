<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";

import {
  ArrowRightCircleIcon,
  ChevronDownIcon,
  CogIcon,
  FilmIcon,
  PlusIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/vue/20/solid";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";

type Option = {
  name: string;
  href?: string;
  icon: Function;
  onClick?: () => void;
};

const products: Option[] = [
  {
    name: "View all",
    href: "/picture/all",
    icon: FilmIcon,
  },
  {
    name: "Create",
    href: "/picture/create",
    icon: PlusIcon,
  },
];

const usersOptions: Option[] = [
  {
    name: "Settings",

    href: "/user/view-client",
    icon: CogIcon,
  },
  {
    name: "Orders",

    href: "/user/all-orders",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Logout",
    onClick: logout,
    icon: ArrowRightCircleIcon,
  },
];

const auth = useAuthStore();

function logout() {
  auth.logout();
}
</script>

<template>
  <div>
    <header class="p-8 bg-amber-500 shadow-lg rounded-md" v-if="auth.user !== null">
      <nav class="flex items-center justify between">
        <div class="flex ml-2 mr-6 font-bold text-xl">
          <img
            class="mx-auto h-12 w-12"
            src="F:\IT Projects\Picture Shop FrontEnd\React\picture-shop-vue\logo-transparent-static.png"
            alt="Your Company"
          />
          <p class="text-blue-900 py-2 font-semibold font-serif">VOYAGE WELL</p>
        </div>
        <div class="text-violet-800">
          <RouterLink to="/">Dashboard</RouterLink>
          <span class="mx-4">•</span>
          <RouterLink to="/about" class="ml-3">About</RouterLink>
          <span class="mx-4">•</span>
          <RouterLink to="/order/all" class="ml-3">All Orders</RouterLink>
          <span class="mx-4">•</span>
        </div>
        <div class="ml-1">
          <PopoverGroup class="hidden lg:flex lg:gap-x-12">
            <Popover class="relative">
              <PopoverButton
                class="flex items-center gap-x-1 text leading-6 text-violet-800"
              >
                Picture
                <ChevronDownIcon
                  class="h-5 w-5 flex-none text-violet-800"
                  aria-hidden="true"
                />
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                >
                  <div class="p-4 bg-amber-100">
                    <div
                      v-for="item in products"
                      :key="item.name"
                      class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div
                        class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                      >
                        <component
                          :is="item.icon"
                          class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div class="flex-auto">
                        <a
                          v-if="item.onClick"
                          href="#"
                          class="block font-semibold text-violet-800"
                          @click.preevent="item.onClick"
                        >
                          {{ item.name }}
                          <span class="absolute inset-0" />
                        </a>
                        <a
                          v-else
                          :href="item.href"
                          class="block font-semibold text-violet-800"
                        >
                          {{ item.name }}
                          <span class="absolute inset-0" />
                        </a>
                      
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </div>

        <div v-if="auth.user !== null" class="lg:flex lg:flex-1 lg:justify-end">
          <div>
            <PopoverGroup class="lg:flex lg:gap-x-12">
              <Popover class="relative">
                <PopoverButton
                  class="flex items-center gap-x-5 text leading-6 text-indigo-600"
                >
                  <UserIcon
                    class="h-9 w-9 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                </PopoverButton>

                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1"
                >
                  <PopoverPanel
                    class="absolute -left-32 top-full z-10 mt-3 max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
                  >
                    <div class="p-4 bg-amber-100 rounded-3xl w-full">
                      <div class="flex">
                        <p class="text-indigo-600 top-full mr-2">Hello!</p>
                        <p class="text-indigo-600 top-full">{{ auth.user }}</p>
                      </div>
                      <div
                        v-for="item in usersOptions"
                        :key="item.name"
                        class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div
                          class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                        >
                          <component
                            :is="item.icon"
                            class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            aria-hidden="false"
                          />
                        </div>
                        <div class="flex-auto">
                          <a
                            v-if="item.onClick"
                            href="#"
                            class="block font-semibold text-violet-800"
                            @click.preevent="item.onClick"
                          >
                            {{ item.name }}
                            <span class="absolute inset-0" />
                          </a>
                          <a
                            v-else
                            :href="item.href"
                            class="block font-semibold text-violet-800"
                          >
                            {{ item.name }}
                            <span class="absolute inset-0" />
                          </a>
                  
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
            </PopoverGroup>
          </div>
        </div>

        <div class="mr-24 ml-2">
          <RouterLink to="/shopping-cart">
            <ShoppingCartIcon
              class="h-12 w-8 ml-5 text-violet-800"
              aria-hidden="true"
            />
          </RouterLink>
        </div>
      </nav>
    </header>
  </div>
</template>
