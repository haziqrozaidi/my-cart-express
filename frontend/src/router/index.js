import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProductDetailsPage from '../views/ProductDetailsPage.vue';
import CartPage from '../views/CartPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
