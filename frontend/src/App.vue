<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-grow">
      <router-view />
    </main>

    <Footer />

    <Toast position='bottom-right' />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Toast from 'primevue/toast'

// Redirect to home on initial load if needed
const router = useRouter()
if (window.location.pathname === '/') {
  router.push('/home')
}
</script>

<style>
</style>
