<script setup lang="ts">
import { Auth } from '../auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SignUpForm from '../components/SignUpForm.vue'

const router = useRouter()
const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = function () {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
    router.push('/') 
  })
}
</script>

<template>
  <main>
    <template v-if="isLoggedIn">
      <h3>Hi, {{ currentUser && currentUser.email }}</h3>
      <br />
      <nav>        
        <p><a @click="signOut" style="cursor: pointer;">Sign Out</a></p>
      </nav>      
    </template>

    <template v-else>      
      <SignUpForm />
      <br /><br>
            
      <nav>        
        <h2>Já têm uma conta?</h2>
        <RouterLink to="/signin">Entrar</RouterLink>
      </nav>
    </template>
  </main>
</template>


