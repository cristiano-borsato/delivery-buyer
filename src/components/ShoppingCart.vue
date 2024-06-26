<script setup lang="ts">
import { computed } from 'vue'
import { cartState, removeFromCart, createOrder, clearCart } from '../cart'
import { useRouter } from 'vue-router'


const cartItems = computed(function() {
  return cartState.cart;
});
const router = useRouter();

function goBackToStores() {
  router.push('/stores');
}

const calculateTotalPrice = function() {
  return cartItems.value.reduce(function(total, product) {
    return total + (product.price * product.quantity);
  }, 0);
};

const formatTotalPrice = function(price) {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const totalPrice = computed(function() {
  return calculateTotalPrice();
});
const formattedTotalPrice = computed(function() {
  return formatTotalPrice(totalPrice.value);
});

function removeItem(productId) {
  removeFromCart(productId);
}

async function placeOrder() {
  const orderItems = cartItems.value.map(function(product) {
    return {
      product_id: product.id,
      amount: product.quantity,
      price: parseFloat(product.price)
    };
  });

  const orderData = {
    order: {
      store_id: cartItems.value[0].store_id,
      order_items_attributes: orderItems
    }
  };

  try {
    await createOrder(orderData);
    alert('Order placed successfully!');
    cartState.cart = [];
    router.push('/stores');
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Error placing order. Please try again later.');
  }
}
</script>

<template>
  <div class="cart-container">
    <h1>My Cart</h1>
    <div v-if="cartItems.length === 0">
      <p>Your shopping cart is empty.</p>
      <button @click="goBackToStores">Back to Shopping</button>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartItems" :key="product.id">
            <td>{{ product.title }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
            <td><button @click="removeItem(product.id)">Remover</button></td>
          </tr>
        </tbody>
      </table>
      <p>Total: {{ totalPrice }}</p>
      <button @click="placeOrder">Fechar Pedido</button>&nbsp;     
      <button @click="clearCart">Limpar Carrinho</button> 
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.cart-container {
  margin: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px 0;
}

p {
  font-size: 18px;
}
</style>
