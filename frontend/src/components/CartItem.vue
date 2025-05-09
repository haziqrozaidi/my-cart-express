<template>
  <div class="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-shrink-0">
        <img :src="item.thumbnail" :alt="item.title" class="w-24 h-24 object-cover rounded" />
      </div>

      <div class="flex-grow">
        <router-link :to="`/product/${item.id}`" class="text-lg font-medium hover:text-blue-600">
          {{ item.title }}
        </router-link>

        <p class="text-gray-600 mt-1">${{ item.price.toFixed(2) }}</p>

        <div class="flex items-center mt-2">
          <InputNumber
            v-model="quantity"
            :min="1"
            :max="99"
            inputClass="w-16 text-center"
            showButtons
            buttonLayout="horizontal"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            @update:modelValue="updateQuantity"
          />
        </div>
      </div>

      <div class="flex flex-col justify-between items-end">
        <div class="font-semibold text-lg">${{ (item.price * item.quantity).toFixed(2) }}</div>

        <Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="removeItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()
const quantity = ref(props.item.quantity)

watch(
  () => props.item.quantity,
  (newVal) => {
    quantity.value = newVal
  },
)

const updateQuantity = (value) => {
  cartStore.updateQuantity(props.item.id, value)
}

const increaseQuantity = () => {
  cartStore.updateQuantity(props.item.id, props.item.quantity + 1)
}

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateQuantity(props.item.id, props.item.quantity - 1)
  }
}

const removeItem = () => {
  cartStore.removeFromCart(props.item.id)
}
</script>
