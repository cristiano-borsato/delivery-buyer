import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignInForm from '@/components/SignInForm.vue';
import StoresList from '@/components/StoresList.vue';
import StoreProducts from '@/components/StoreProducts.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import OrdersList from '@/components/OrdersList.vue';
import OrderDetails from '@/components/OrderDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    ,
    {
      path: '/signin',
      name: 'signin',
      component: SignInForm
    },
    {
      path: '/stores',
      name: 'stores-list',
      component: StoresList
    },
    {
      path: '/stores/:storeId/products',
      name: 'StoreProducts',
      component: StoreProducts
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    { path: '/orders', 
      name: 'OrdersList',
      component: OrdersList 
    },
    { path: '/orders/:id',
      name: "OrderDetails",
      component: OrderDetails
    }
  ]
})

export default router
