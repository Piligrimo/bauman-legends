<template>
  <div>
    <h3>Логин</h3>
    <el-input placeholder="Логин" v-model="login"/>
    <el-input placeholder="Пароль" v-model="password" show-password/>
    <el-button  :disabled="isDisabled" @click="submitForm">Войти</el-button>
    <router-link to="/sign-up">
      <el-button>Зарегистрироваться</el-button>
    </router-link>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import {signIn} from '@/api/user'

export default {
  data () {
    return {
        login: '',
        password: '',
        errorMessage: ''
    }
  },
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
      } catch (e) {
        this.errorMessage = e.message
        console.error(e)
      }
    } 
  }
}
</script>

<style>

</style>
