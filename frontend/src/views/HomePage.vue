<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Featured Products</h1>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="text-center p-6 text-red-500">
      <i class="pi pi-exclamation-triangle text-4xl mb-4"></i>
      <p>{{ error }}</p>
      <Button label="Try Again" @click="fetchProducts" class="mt-4" />
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'

const products = ref([])
const loading = ref(true)
const error = ref(null)

const fetchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('https://dummyjson.com/products')

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`)
    }

    const data = await response.json()
    products.value = data.products
  } catch (err) {
    error.value = err.message || 'Failed to load products'
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
