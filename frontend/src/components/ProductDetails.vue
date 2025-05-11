<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="text-center p-6 text-red-500">
      <i class="pi pi-exclamation-triangle text-4xl mb-4"></i>
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Product Images -->
        <div>
          <div class="mb-4 relative pb-[75%] overflow-hidden rounded-lg">
            <img
              :src="currentImage"
              :alt="product.title"
              class="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>

          <div class="flex gap-2 overflow-x-auto pb-2">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2"
              :class="currentImage === image ? 'border-blue-500' : 'border-gray-200'"
              @click="currentImage = image"
            >
              <img
                :src="image"
                :alt="`${product.title} ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>

          <div class="flex items-center gap-2 mb-4">
            <Rating :modelValue="product.rating" readonly :cancel="false" />
            <span class="text-gray-600">({{ product.rating }})</span>
          </div>

          <p class="text-3xl font-bold text-blue-700 mb-4">${{ product.price.toFixed(2) }}</p>

          <div class="mb-6">
            <p class="text-gray-700 mb-4">{{ product.description }}</p>

            <div class="grid grid-cols-2 gap-y-2 mb-4">
              <div class="text-gray-600">Brand:</div>
              <div class="font-medium">{{ product.brand }}</div>

              <div class="text-gray-600">Category:</div>
              <div class="font-medium">{{ product.category }}</div>
              
              <div class="text-gray-600">Weight:</div>
              <div class="font-medium">{{ product.weight }} oz</div>
              
              <div class="text-gray-600">Availability:</div>
              <div class="font-medium">
                <Badge
                  :value="product.stock > 0 ? 'In Stock' : 'Out of Stock'"
                  :severity="product.stock > 0 ? 'success' : 'danger'"
                />
              </div>
              
              <div class="text-gray-600">Warranty:</div>
              <div class="font-medium">{{ product.warrantyInformation }}</div>

              <div class="text-gray-600">Stock:</div>
              <div class="font-medium">{{ product.stock }}</div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row items-start gap-4">
            <InputNumber input-class="md:w-full" v-model="quantity" :min="1" :max="product.stock" inputId="horizontal-buttons" showButtons buttonLayout="horizontal">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>

            <Button
              label="Add to Cart"
              icon="pi pi-shopping-cart"
              @click="addToCart"
              :disabled="product.stock <= 0"
            />
          </div>
        </div>
      </div>

      <!-- Additional Sections -->
      <div class="mt-10">
        <TabView>
          <TabPanel header="Details">
            <div class="p-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-2">Basic Information</h3>
                  <div>
                    <div class="grid grid-cols-[120px_1fr] gap-y-2">
                      <div>Brand:</div>
                      <div>{{ product.brand }}</div>
                      
                      <div>Category:</div>
                      <div>{{ product.category }}</div>
                      
                      <div>SKU:</div>
                      <div>{{ product.sku }}</div>
                      
                      <div>Weight:</div>
                      <div>{{ product.weight }} oz</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold mb-2">Physical Details</h3>
                  <div>
                    <div class="grid grid-cols-[120px_1fr] gap-y-2">
                      <div>Dimensions:</div>
                      <div>{{ product.dimensions.width }} × {{ product.dimensions.height }} × {{ product.dimensions.depth }} cm</div>
                      
                      <div>Availability:</div>
                      <div>{{ product.availabilityStatus }}</div>
                      
                      <div>Warranty:</div>
                      <div>{{ product.warrantyInformation }}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold mb-2">Purchase Details</h3>
                  <div>
                    <div class="grid grid-cols-[120px_1fr] gap-y-2">
                      <div>Price:</div>
                      <div>${{ product.price.toFixed(2) }}</div>
                      
                      <div>Discount:</div>
                      <div>{{ product.discountPercentage }}%</div>
                      
                      <div>Return Policy:</div>
                      <div>{{ product.returnPolicy }}</div>
                      
                      <div>Last Updated:</div>
                      <div>{{ new Date(product.meta.updatedAt).toLocaleString() }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Shipping & Returns">
            <div class="p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-semibold mb-2">Shipping Information</h3>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <i class="pi pi-truck mr-2 mt-1 text-blue-500"></i>
                      <span>Free shipping on all orders over $50.</span>
                    </li>
                    <li class="flex items-start">
                      <i class="pi pi-calendar mr-2 mt-1 text-blue-500"></i>
                      <span>Standard shipping: 3-5 business days.</span>
                    </li>
                    <li class="flex items-start">
                      <i class="pi pi-bolt mr-2 mt-1 text-blue-500"></i>
                      <span>Express shipping: 1-2 business days (additional fee).</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-2">Return Policy</h3>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <i class="pi pi-calendar mr-2 mt-1 text-blue-500"></i>
                      <span>We accept returns within 30 days of purchase.</span>
                    </li>
                    <li class="flex items-start">
                      <i class="pi pi-box mr-2 mt-1 text-blue-500"></i>
                      <span>Items must be unused and in original packaging.</span>
                    </li>
                    <li class="flex items-start">
                      <i class="pi pi-phone mr-2 mt-1 text-blue-500"></i>
                      <span>Contact customer service to initiate a return.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import Badge from 'primevue/badge'
import InputNumber from 'primevue/inputnumber'
import ProgressSpinner from 'primevue/progressspinner'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

const props = defineProps({
  productId: {
    type: [String, Number],
    required: true,
  },
})

const cartStore = useCartStore()
const product = ref(null)
const loading = ref(true)
const error = ref(null)
const quantity = ref(1)
const currentImage = ref('')
const toast = useToast()

const fetchProductDetails = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`https://dummyjson.com/products/${props.productId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch product. Status: ${response.status}`)
    }

    product.value = await response.json()
    currentImage.value = product.value.thumbnail
  } catch (err) {
    error.value = err.message || 'Failed to load product details'
    console.error('Error fetching product details:', err)
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (product.value && product.value.stock > 0) {
    cartStore.addToCart(product.value, quantity.value)
    toast.add({
      severity: 'success',
      summary: 'Added to Cart',
      detail: `${product.value.title} has been added to your cart.`,
      life: 3000,
    })
  }
}

onMounted(() => {
  fetchProductDetails()
})
</script>
