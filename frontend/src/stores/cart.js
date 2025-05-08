import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart-items')) || [],
  }),
  
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0).toFixed(2),
  },
  
  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: quantity
        });
      }
      this.updateLocalStorage();
    },
    
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.updateLocalStorage();
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          this.updateLocalStorage();
        }
      }
    },
    
    updateLocalStorage() {
      localStorage.setItem('cart-items', JSON.stringify(this.items));
    },
    
    clearCart() {
      this.items = [];
      this.updateLocalStorage();
    }
  }
});
