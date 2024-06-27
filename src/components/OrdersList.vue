<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchOrders } from '../orders';

const orders = ref([]);
const router = useRouter();

async function loadOrders() {
  try {
    orders.value = await fetchOrders();
  } catch (error) {
    console.error('Error fetching orders:', error);
    alert('Error fetching orders. Please try again later.');
  }
}

onMounted(() => {
  loadOrders();
});

function viewOrderDetails(orderId) {
  router.push(`/orders/${orderId}`);
}
</script>


<template>
  <div class="orders-container">
    <h1>My Orders</h1>
    <div v-if="orders.length === 0">
      <p>No orders found.</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>            
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>            
            <td>{{ new Date(order.created_at).toLocaleString() }}</td>
            <td><button @click="viewOrderDetails(order.id)">View Details</button></td>
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

.orders-container {
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
