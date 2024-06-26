import { reactive, computed, watch } from 'vue';
import { Auth } from "./auth"
import { X_API_KEY } from "./auth"

const auth = new Auth()

export async function createOrder(orderData: any) {
  try {
    const response = await fetch('http://localhost:3000/buyers/orders', {
      method: 'POST',    
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
        Authorization: `Bearer ${auth.getFallback('token')}`
      },      
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao criar pedido 1: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Erro ao criar pedido 2: ${error.message}`);
  }
}

const loadCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartState = reactive({
  cart: loadCart(),
});

export const addToCart = (product) => {
  const existingProduct = cartState.cart.find(item => item.id === product.id && item.store_id === product.store_id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cartState.cart.push({ ...product });
  }
  saveCart(cartState.cart);
};

export const removeFromCart = (productId) => {
  cartState.cart = cartState.cart.filter(product => product.id !== productId);
  saveCart(cartState.cart);
};

export const clearCart = () => {
  cartState.cart = [];
  saveCart([]);
};

watch(() => cartState.cart, (newCart) => {
  saveCart(newCart);
}, { deep: true });
