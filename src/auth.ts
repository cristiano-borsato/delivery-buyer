import { createStorage, type SimpleStorage } from './storage'
export const X_API_KEY = "1MqDNOVN3St6EFhEPmkSOApTbRE="

class Auth {
  private storage: SimpleStorage
  constructor(persistent = false) {
    this.storage = createStorage(persistent)
  }

  private getFallback(key: string): string | null {
    const transient = createStorage(false)
    const persistent = createStorage(true)

    return transient.get(key) || persistent.get(key)
  }

  success(response: Response, onSuccess: () => void) {
    response.json().then((json) => {
      this.storage.store('token', json.token)
      this.storage.store('email', json.email)
      onSuccess()
    })
  }

  failure(response: Response, onFailure: () => void) {
    onFailure()
  }

  currentUser() {
    if (!this.isLoggedIn()) {
      return null
    }

    return {
      email: this.getFallback('email')
    }
  }

  isLoggedIn() {
    return Boolean(this.getFallback('token'))
  }

  signOut(andThen = () => { }) {
    const transient = createStorage(false)
    const persistent = createStorage(true)

    transient.remove('token')
    transient.remove('email')
    persistent.remove('token')
    persistent.remove('email')

    andThen()
  }

  async signIn(
    email: string,
    password: string,
    onSuccess: () => void,
    onFailure: (error: string) => void // Adicionando um parâmetro para a mensagem de erro
  ) {
    const body = {
      login: {
        email: email,
        password: password
      }
    }
  
    try {
      const response = await fetch("http://localhost:3000/sign_in", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY
        },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        this.success(response, onSuccess)
      } else {
        const data = await response.json();
        onFailure(data.error || "Erro ao tentar fazer login"); // Passando a mensagem de erro para o callback onFailure
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      onFailure("Erro ao tentar fazer login");
    }
  }
  
 
  async signUp(
    email: string,
    password: string,
    password_confirmation: string,
    onSuccess: () => void,
    onFailure: (error: string) => void
  ) {
    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      }
    }
  
    try {
      const response = await fetch("http://localhost:3000/new", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY
        },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        this.success(response, onSuccess);
      } else {
        const data = await response.json();
        onFailure(data.error || "Erro ao tentar criar o usuário");
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
      onFailure("Erro ao tentar criar o usuário");
    }
  }
  

}
export { Auth }