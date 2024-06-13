<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'

const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const password_confirmation = defineModel<string>('password_confirmation')
const remember = defineModel<boolean>('remember', { default: true })
const error = ref<string | null>(null)

const onSubmit = () => {
  error.value = null // Limpa o erro antes de fazer uma nova tentativa
  const auth = new Auth(remember.value)
  awaiting.value = true
  auth.signUp(
    email.value || '',
    password.value || '',
    password_confirmation.value || '',
    () => {
      awaiting.value = false
      router.push('/signin')
    },
    (errorMessage) => {
      awaiting.value = false
      error.value = errorMessage
    }
  )
}
</script>

<template>
  <div>
    <h1>Inscreva-se hoje</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="error" class="error-message">{{ error }}</div>
      <label><p>E-Mail:</p></label>
      <input v-model="email" type="email" /><br />
      <label><p>Senha:</p> </label>
      <input v-model="password" type="password" /><br />
      <label><p>Confirmar Senha:</p></label>
      <input v-model="password_confirmation" type="password" /><br />
      <button type="submit" v-show="!awaiting">Criar Conta</button>
    </form>
  </div>
</template>

<style>
.error-message {
  color: red;
}
</style>