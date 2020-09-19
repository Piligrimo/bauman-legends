<template>
  <div class="layout">
    <h3 class="layout__title">Регистрация</h3>
    <el-input class="layout__item" placeholder="Логин" v-model="login"/>
    <el-input class="layout__item" placeholder="Пароль" v-model="password" show-password/>
    <el-input class="layout__item" placeholder="Имя" v-model="firstName"/>
    <el-input class="layout__item" placeholder="Фамилия" v-model="lastName"/>
    <el-input class="layout__item" placeholder="Учебная группа" v-model="group"/>
    <el-input class="layout__item" placeholder="Ссылка ВК" v-model="vkRef"/>
    <el-button class="layout__item" :disabled="isDisabled" @click="submitForm">Зарегистрироваться</el-button>
    <p v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import {signUp} from '@/api/user'

export default {
  data () {
    return {
        login: 'makin',
        password: 'qwerty',
        firstName: 'Макс',
        lastName: 'Овчинников',
        group: 'ИУ5-228',
        vkRef: 'https://vk.com/janmakin',
        errorMessage: ''
    }
  },
  computed: {
    isDisabled () {
      const fields = [this.login, this.password, this.firstName, this.lastName, this.group, this.vkRef]
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
        password: this.password,
        first_name: this.firstName,
        last_name: this.lastName,
        group: this.group,
        vk_ref: this.vkRef,
      }
      try {
        await signUp(args)
      } catch (e) {
        this.errorMessage = e.response.data.message
        console.error(e)
      }
    } 
  }
}
</script>

<style scoped>
</style>
