<template>
  <div class=" p-8 footer shadow-lg rounded-md bg-amber-500 text-violet-800 py-2mx-auto flex justify-between items-center">

  <!-- Logo -->
  <div class="mx-auto flex justify-between items-center container">
    <div class="flex items-start">
    <img
      class="h-16 w-auto mr-2"
      src="F:\IT Projects\Picture Shop FrontEnd\React\picture-shop-vue\logo-transparent-static.png"
      alt="Your Company Logo"
    />
    <p class="py-4 ml-4 font-bold font-serif text-2xl">VOYAGE WELL</p>
  </div>

    <!-- Footer Navigation Links -->
    <div class="text-lg">
      <RouterLink to="/">Home</RouterLink>
      <span class="mx-4">•</span>
      <RouterLink to="/about">About</RouterLink>
      <span class="mx-4">•</span>
      <RouterLink to="/contact">Contact</RouterLink>
    </div>
    
  </div>
</div>
</template>

<style>
.footer {
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
