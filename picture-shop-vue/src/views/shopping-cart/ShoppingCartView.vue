<template>
  <body class="bg-amber-100 overflow-y-hidden" style="height: 700px">
    <div class="flex items-center justify-center py-8">
      <button
        class="py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Open Modal
      </button>
    </div>
    <div
      class="w-full h-full bg-amber bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
      id="chec-div"
    >
      <div
        class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
        id="checkout"
      >
        <div class="flex items-end lg:flex-row flex-col" id="cart">
          <div
            class="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-amber-100 rounded-md overflow-y-auto overflow-x-hidden lg:h-screen h-auto"
            id="scroll"
          >
            <div class="flex items-center justify-between">
              <div
                class="flex items-center text-violet-800 hover:text-gray-600 cursor-pointer"
              >
                <a href="/" class="flex items-center">
                  <svg
                    class="icon icon-tabler icon-tabler-chevron-left"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p class="text-sm pl-2 leading-none" href="/">Home</p>
                </a>
              </div>
              <div
                class="flex items-center text-violet-800 hover:text-gray-600 cursor-pointer"
              >
                <a href="/picture/all" class="flex items-center">
                  <svg
                    class="icon icon-tabler icon-tabler-chevron-left"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p class="text-sm pl-2 leading-none" href="/picture/all">
                    All Pictures
                  </p>
                </a>
              </div>
            </div>
            <p
              class="lg:text-4xl text-3xl font-black leading-10 text-violet-900 pt-3"
            >
              Shopping cart
            </p>

            <div
              v-for="(product, key) in filteredProducts"
              :key="key"
              class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"
            >
              <div class="md:w-4/12 2xl:w-1/4 w-full">
                <img
                  :src="product?.pictureUrl || 'No pictureUrl'"
                  alt="Black Leather Bag"
                  class="h-full object-center object-cover md:block hidden"
                />
                <img
                  :src="product?.pictureUrl || 'No pictureUrl'"
                  alt="Black Leather Bag"
                  class="md:hidden w-full h-full object-center object-cover"
                />
              </div>
              <div
                class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center"
              >
                <p class="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                  ID: {{ product?.id || "No ID" }}
                </p>
                <div class="flex items-center justify-between w-full pt-1">
                  <p class="text-base font-black leading-none text-gray-800">
                    {{ product.name || "No name" }}
                  </p>
                </div>
                <p class="text-xs leading-3 text-gray-600 pt-2">
                  Description: {{ product.description || "No description" }}
                </p>
                <div class="flex items-center justify-between pt-5">
                  <p class="text-xs text-gray-500 dark:text-gray-400 ml-2 mb-2">
                    Price
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 ml-2 mb-2">
                    Quantity
                  </p>
                </div>

                <div class="flex items-center justify-between">
                  <p class="text-base font-black leading-none text-gray-800">
                    {{ product.price || "No price" }}
                  </p>
                  <div class="mt-3 flex itemms-center">
                    <button
                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                      @click="removePictureFromShoppingCart(product.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                    <p
                      class="form-label ml-6 mr-6 mt-2 mb-2 text-base font-black leading-none text-violet-800"
                      for="form1"
                    >
                      {{ product.quantity || "No quantity" }}
                    </p>
                    <button
                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                      @click="addToShoppingCart(product)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-96 md:w-8/12 w-full bg-amber-200 h-full rounded-md">
            <div
              class="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto"
            >
              <div>
                <p
                  class="lg:text-4xl text-3xl font-black leading-9 text-violet-900"
                >
                  Summary
                </p>
                <div class="flex items-center justify-between pt-16">
                  <p class="text-base leading-none text-gray-800">
                    Total Price
                  </p>
                  <p class="text-base leading-none text-gray-800">
                    ${{ data.totalPrice }}
                  </p>
                </div>
                <div class="flex items-center justify-between pt-5">
                  <p class="text-base leading-none text-gray-800">Shipping</p>
                  <p class="text-base leading-none text-gray-800">$30</p>
                </div>
                <div class="flex items-center justify-between pt-5">
                  <p class="text-base leading-none text-gray-800">Tax</p>
                  <p class="text-base leading-none text-gray-800">$35</p>
                </div>
              </div>
              <div>
                <div
                  class="flex items-center pb-6 justify-between lg:pt-5 pt-20"
                >
                  <p class="text-2xl leading-normal text-gray-800">Total</p>
                  <p
                    class="text-2xl font-bold leading-normal text-right text-gray-800"
                  >
                    ${{ calculateTotalWithCommas() }}
                  </p>
                </div>
                <button
                  @click="checkOut()"
                  class="text-base leading-none w-full py-5 bg-amber-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import router from "@/router";
import { BASE_URL } from "@/router/api";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, ref } from "vue";

const auth = useAuthStore();
const token = auth.token;
const data = ref({
  products: {},
  totalPrice: 0,
  deliveryStart: null,
  deliveryEnd: null,
});

const checkOut = async () => {
  try {
    const response = await fetch(`${BASE_URL}cart-checkout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      mode: "cors",
    });
    if (response.ok) {
      router.push("/user/all-orders");
    } else if (response.status == 400) {
      alert("Username invalid")
    } else if (response.status == 404) {
      router.push("/user/view-client");
    } else if (response.status == 500) {
      alert("Order Placed but Failed to send Email")
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const addToShoppingCart = async (picture) => {
  const response = await fetch(
    `${BASE_URL}shopping-cart-add/${picture.id}?origin=shopping-cart`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include cookies in cross-origin requests
      mode: "cors",
    }
  );
  if (response.status == 200) {
    await fetchData();
  } else {
    const errorData = response.statusText;
    console.log(errorData);
  }
};

// Fetch data from the backend
const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}shopping-cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      mode: "cors",
    });
    if (response.ok) {
      const responseData = await response.json();
      // Update the reactive data object with the fetched data
      Object.keys(responseData).forEach((key) => {
        data.value[key] = responseData[key];
      });
    } else {
      console.error("Failed to fetch data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const removePictureFromShoppingCart = async (productId: any) => {
  const response = await fetch(`${BASE_URL}shopping-cart-remove/${productId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    mode: "cors",
  });
  if (response.ok) {
    await fetchData();
  } else {
    const responseData = response.statusText;
    console.log("Failied to fetch data", responseData);
  }
};

const filteredProducts = computed(() => {
  return Object.values(data.value.products).filter(
    (product) => product.quantity > 0
  );
});

const calculateTotalWithCommas = () => {
  const shipping = 30; // Assuming shipping is a fixed amount
  const tax = 35; // Assuming tax is a fixed amount
  const totalPrice = data.value.totalPrice || 0; // Ensure totalPrice is a valid number
  const totalAmount = totalPrice + shipping + tax;
  return totalAmount.toLocaleString(); // Format with commas
};

onMounted(() => {
  fetchData();
});
</script>

<style>
/* width */

#scroll::-webkit-scrollbar {
  width: 1px;
}

/* Track */

#scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */

#scroll::-webkit-scrollbar-thumb {
  background: rgb(133, 132, 132);
}
</style>
