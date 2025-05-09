<template>
  <div class="shadow-md">
    <div class="container mx-auto px-8 py-5">
      <div class="flex justify-between items-center">
        <router-link to="/home" class="text-2xl font-bold text-blue-700">
          MyCartExpress
        </router-link>

        <div class="flex items-center space-x-4">
          <router-link to="/home" class="text-gray-700 hover:text-blue-700"> Home </router-link>
          <router-link to="/cart" class="relative">
            <OverlayBadge :value="cartCount">
              <Button icon="pi pi-shopping-cart" rounded variant="outlined" aria-label="Cart" />
            </OverlayBadge>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import OverlayBadge from 'primevue/overlaybadge'
import Button from 'primevue/button'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)
</script>
