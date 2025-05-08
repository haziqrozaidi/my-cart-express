<template>
  <div class="shadow-md">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <router-link to="/home" class="text-2xl font-bold text-blue-700">
          MyCartExpress
        </router-link>

        <div class="flex items-center space-x-4">
          <router-link to="/home" class="text-gray-700 hover:text-blue-700"> Home </router-link>
          <router-link to="/cart" class="relative">
            <i class="pi pi-shopping-cart text-xl"></i>
            <Badge v-if="cartCount > 0" :value="cartCount" class="absolute -top-2 -right-2"></Badge>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import Badge from 'primevue/badge'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>
