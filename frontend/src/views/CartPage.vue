<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>

    <div v-if="!cartItems.length" class="text-center py-12">
      <i class="pi pi-shopping-cart text-6xl text-gray-300 mb-4"></i>
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
      <p class="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
      <Button label="Continue Shopping" icon="pi pi-shopping-bag" @click="$router.push('/home')" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Cart Items ({{ cartItems.length }})</h2>

          <div class="space-y-4">
            <CartItem v-for="item in cartItems" :key="item.id" :item="item" />
          </div>
        </div>
      </div>

      <div>
        <div class="bg-white rounded-lg shadow p-6 sticky top-4">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span>${{ cartStore.totalPrice }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span>$0.00</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Tax</span>
              <span>${{ calculateTax() }}</span>
            </div>

            <Divider />

            <div class="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${{ calculateTotal() }}</span>
            </div>
          </div>

          <Button label="Proceed to Checkout" icon="pi pi-check" class="w-full" />

          <Button
            label="Continue Shopping"
            icon="pi pi-arrow-left"
            class="w-full mt-3"
            severity="secondary"
            @click="$router.push('/home')"
          />

          <Button
            label="Clear Cart"
            icon="pi pi-trash"
            class="w-full mt-3"
            severity="danger"
            @click="confirmClearCart"
          />
        </div>
      </div>
    </div>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useConfirm } from 'primevue/useconfirm'
import CartItem from '../components/CartItem.vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import ConfirmDialog from 'primevue/confirmdialog'

const router = useRouter()
const cartStore = useCartStore()
const confirm = useConfirm()

const cartItems = computed(() => cartStore.items)

const calculateTax = () => {
  const subtotal = parseFloat(cartStore.totalPrice)
  const taxRate = 0.07 // 7% tax rate
  return (subtotal * taxRate).toFixed(2)
}

const calculateTotal = () => {
  const subtotal = parseFloat(cartStore.totalPrice)
  const tax = parseFloat(calculateTax())
  return (subtotal + tax).toFixed(2)
}

const confirmClearCart = () => {
  confirm.require({
    message: 'Are you sure you want to clear your cart?',
    header: 'Clear Cart',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {
      cartStore.clearCart()
    },
  })
}
</script>
