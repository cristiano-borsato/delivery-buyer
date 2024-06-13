<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Auth } from '../auth'

const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const remember = defineModel<boolean>('remember', { default: true })
const error = ref<string | null>(null) // Adicione uma variável reativa para armazenar a mensagem de erro

const onSubmit = (form: Event) => {
  const auth = new Auth(remember.value)
  awaiting.value = true
  auth.signIn(
    email.value || '',
    password.value || '',
    () => {
      awaiting.value = false
      router.push('/')
    },
    (errorMsg: string) => { // Adicione um parâmetro para a mensagem de erro
      awaiting.value = false
      error.value = errorMsg // Armazene a mensagem de erro na variável error
    }
  )
}
</script>

<template>
  <div>
    <h1>Entrar</h1>
    <form @submit.prevent="onSubmit">
      <label>E-Mail: </label>
      <input v-model="email" type="email" /><br />
      <label>Senha: </label>
      <input v-model="password" type="password" /><br />
      <label>Remember Me: </label>
      <input v-model="remember" type="checkbox" /><br />
      <button type="submit" v-show="!awaiting">Avançar</button>
    </form>
    <p v-if="error">{{ error }}</p> <!-- Exibir a mensagem de erro -->
  </div>
</template>
