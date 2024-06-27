<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { fetchStoreAndProducts } from '../orders';
import { addToCart } from '../cart';  

const products = ref([]);
const storeName = ref('');
const router = useRouter();
const route = useRoute();
const storeId = route.params.storeId;

onMounted(async () => {
  try {
    const data = await fetchStoreAndProducts(storeId);
    storeName.value = data.store.name;
    products.value = data.products.map(product => ({
      ...product,
      quantity: 1 // Define a quantidade padrão como 1
    }));
  } catch (error) {
    console.error('Error fetching store and products:', error);
  }
});

function goBack() {
  router.push('/stores');
}

function addItemToCart(product) {
  const productWithStore = {
    ...product,
    storeName: storeName.value
  };
  addToCart(productWithStore);
}
</script>

<template>
  <div>
    <h1>Produtos na {{ storeName }}</h1>
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }} - {{ product.price }}</td>
          <td>
            <select v-model="product.quantity">
              <option v-for="n in 9" :key="n" :value="n">{{ n }}</option>
            </select>
          </td>
          <td>
            <button @click="addItemToCart(product)">Adicionar ao Carrinho</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <button @click="goBack">Lista de Lojas</button><br>
    <RouterLink to="/cart">Carrinho de Compras</RouterLink><br>
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
</style>
