<template>
  <footer class="bg-gray-800 text-white py-8 mt-auto">
    <div class="container mx-auto px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">MyCartExpress</h3>
          <p class="text-gray-300">Your one-stop shop for all your needs.</p>
        </div>

        <div>
          <h3 class="text-xl font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/home" class="text-gray-300 hover:text-white">Home</router-link>
            </li>
            <li>
              <router-link to="/cart" class="text-gray-300 hover:text-white">Cart</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-bold mb-4">Contact Us</h3>
          <p class="text-gray-300">
            Email: support@mycartexpress.com<br />
            Phone: +60 12-345 6789
          </p>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} MyCartExpress. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
