import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInForm from '@/components/SignInForm.vue'

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
    }
  ]
})

export default router
