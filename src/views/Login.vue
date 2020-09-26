<template>
  <div class="content login-bg">
    <div class="layout">
      <h3 class="layout__title">Логин</h3>
      <el-input class="layout__item" disabled placeholder="Логин" v-model="login"/>
      <el-input class="layout__item" disabled placeholder="Пароль" v-model="password" show-password/>
      <div  class="layout__actions">
        <el-button class="layout__action" type="primary" :disabled="isDisabled" @click="submitForm">Войти</el-button>
        <router-link to="/sign-up">
          <el-button class="layout__action" type="primary">Зарегистрироваться</el-button>
        </router-link>
      </div>
      <p  class="error-message" v-if="errorMessage">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import {signIn} from '@/api/user'
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
    },
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  watch: {
    isAuth (val) {
      if (val)
      this.$router.push('/team')
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
        await this.$store.dispatch('getUser')

        this.$router.push('/team')
    
      } catch (e) {
        this.errorMessage = e.response.data.message
      }
    } 
  }
}
</script>

<style scoped>
    
</style>
