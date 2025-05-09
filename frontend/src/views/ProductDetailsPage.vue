<template>
  <div class="container mx-auto px-8 py-8">
    <Breadcrumb :model="breadcrumbItems" class="mb-6" />
    <ProductDetails :productId="productId" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductDetails from '../components/ProductDetails.vue'
import Breadcrumb from 'primevue/breadcrumb'

const route = useRoute()
const productId = computed(() => route.params.id)

const breadcrumbItems = ref([
  { label: 'Home', to: '/home' },
  { label: 'Product Details', disabled: true },
])
</script>
