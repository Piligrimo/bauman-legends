<template>
  <div class="content login-bg">
    <div class="layout">
      <armed-title text="Логин" />
      <el-input class="layout__item" placeholder="Логин" v-model="login"/>
      <el-input class="layout__item" placeholder="Пароль" v-model="password" show-password/>
      <div  class="layout__actions">
        <el-button class="layout__action"  type="primary" :disabled="isDisabled" @click="submitForm">Войти</el-button>
        <router-link to="/sign-up">
          <el-button  class="layout__action" type="primary">Зарегистрироваться</el-button>
        </router-link>
      </div>
      <p v-for="(message, i) in errorMessages" :key="i" class="error-message" >{{ message }}</p>
    </div>
  </div>
</template>

<script>
import {signIn} from '@/api/user'
import store from '@/store'
import axios from 'axios';
import ArmedTitle from '../components/ArmedTitle.vue';

export default {
  components: { ArmedTitle },
  data () {
    return {
        login: '',
        password: '',
        errorMessages: []
    }
  },
  store,
  computed: {
    isDisabled () {
      const fields = [this.login, this.password]
      return !fields.every(Boolean)
    },
    isAdmin ()  {
      return this.$store.state.user.admin
    },
  },
  methods: {
    async submitForm() {
      this.errorMessages = ''
      const args = {
        login: this.login,
        password: this.password
      }
      try {
        const {data: {access_token} } =  await signIn(args)

        localStorage.setItem('access_token', access_token)
        axios.defaults.headers.common.Authorization = 'Bearer ' + access_token
        await this.$store.dispatch('getUser')

        if(this.isAdmin)
          this.$router.push('/teams')
        else
          this.$router.push('/banner')
    
      } catch (e) {
        console.error(e);
        const detail = e.response?.data?.detail;
        if (detail?.length && typeof detail !== 'string') {
          this.errorMessages =  detail.map(({ msg }) => msg)
          return
        }
        this.errorMessages = [e.response.data.detail || "Произошла ошибка"];
      }
    } 
  }
}
</script>

<style scoped>
    
</style>
