<template>
  <div class="login">
    <h3 class="login__title">Логин</h3>
    <el-input class="login__item" placeholder="Логин" v-model="login"/>
    <el-input class="login__item" placeholder="Пароль" v-model="password" show-password/>
    <div  class="login__actions">
      <el-button class="login__action" type="primary" :disabled="isDisabled" @click="submitForm">Войти</el-button>
      <router-link to="/sign-up">
        <el-button class="login__action" type="primary">Зарегистрироваться</el-button>
      </router-link>
    </div>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import {signIn, getUser} from '@/api/user'
import store from '@/store'

export default {
  data () {
    return {
        login: '',
        password: '',
        errorMessage: ''
    }
  },
  store,
  computed: {
    isDisabled () {
      const fields = [this.login, this.password]
      return !fields.every(Boolean)
    }
  },
  methods: {
    async submitForm() {
      this.errorMessage = ''
      const args = {
        login: this.login,
        password: this.password
      }
      try {
        await signIn(args)
        const response = await getUser()
        console.log(response)
        // this.store.commit('setAuth',)
      } catch (e) {
        this.errorMessage = e.message
        console.error(e)
      }
    } 
  }
}
</script>

<style scoped>
  .login {
    margin: auto;
    padding: 3rem;
    max-width: 350px;
    background-color: #eeca95c4;
  }
  @media screen and (max-width: 480px) { 
      .login {
        margin: 0 auto;
      }
  }
  .login__item {
    margin-top: 0.5rem;
    width: 100%;
  }

  .login__title {
    text-align: center;
    color: white;
  }

  .login__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  @media screen and (max-width: 480px) { 
    .login__actions {
      flex-direction: column;
    }
    .login__action {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
  
</style>
