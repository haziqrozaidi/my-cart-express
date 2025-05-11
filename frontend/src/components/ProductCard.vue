<template>
  <Card class="h-full shadow-md hover:shadow-lg transition-shadow">
    <template #header>
      <div class="relative pb-[75%] overflow-hidden">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
          @click="navigateToProduct"
        />
      </div>
    </template>

    <template #title>
      <div class="cursor-pointer" @click="navigateToProduct">
        <h3 class="text-lg font-semibold truncate">{{ product.title }}</h3>
      </div>
    </template>

    <template #content>
      <div class="mb-3">
        <p class="text-xl font-bold text-blue-600">${{ product.price.toFixed(2) }}</p>
        <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ product.description }}</p>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between items-center">
        <Rating :modelValue="product.rating" readonly :cancel="false" />
        <Button label="Add to Cart" icon="pi pi-shopping-cart" @click="addToCart" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Rating from 'primevue/rating'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const navigateToProduct = () => {
  router.push(`/product/${props.product.id}`)
}

const addToCart = () => {
  cartStore.addToCart(props.product)
  toast.add({
    severity: 'success',
    summary: 'Added to Cart',
    detail: `${props.product.title} has been added to your cart.`,
    life: 3000,
  })
}
</script>
