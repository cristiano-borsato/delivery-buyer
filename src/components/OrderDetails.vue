<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchOrderDetails, fetchStoreAndProducts } from '../orders';

const route = useRoute();
const orderDetails = ref(null);
const orderItems = ref([]);
const storeName = ref('');
const products = ref({});

async function loadOrderDetails() {
  try {
    const orderId = route.params.id;
    const response = await fetchOrderDetails(orderId);
    orderDetails.value = response.order;
    orderItems.value = response.order_items;

    const storeId = orderDetails.value.store_id;
    const data = await fetchStoreAndProducts(storeId);
    storeName.value = data.store.name;
    products.value = data.products.reduce((acc, product) => {
      acc[product.id] = product.title;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching order details:', error);
    alert('Error fetching order details. Please try again later.');
  }
}

onMounted(() => {
  loadOrderDetails();
});
</script>

<template>
  <div class="order-details-container">
    <h1>Order Details</h1>
    <div v-if="!orderDetails">
      <p>Loading...</p>
    </div>
    <div v-else>
      <p><strong>Order ID:</strong> {{ orderDetails.id }}</p>
      <p><strong>Store:</strong> {{ storeName }}</p>
      <p><strong>Order Date:</strong> {{ new Date(orderDetails.created_at).toLocaleString() }}</p>
      <p><strong>Order State:</strong> {{ orderDetails.state }}</p>
      <h2>Order Items</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderItems" :key="item.id">
            <td>{{ products[item.product_id] || 'Loading...' }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <RouterLink to="/">Home</RouterLink>
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

.order-details-container {
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