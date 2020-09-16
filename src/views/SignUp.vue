<template>
  <div>
    <h3>Регистрация</h3>
    <el-input placeholder="Логин" v-model="login"/>
    <el-input placeholder="Пароль" v-model="password" show-password/>
    <el-input placeholder="Имя" v-model="firstName"/>
    <el-input placeholder="Фамилия" v-model="lastName"/>
    <el-input placeholder="Учебная группа" v-model="group"/>
    <el-input placeholder="Ссылка ВК" v-model="vkRef"/>
    <el-button :disabled="isDisabled" @click="submitForm">Зарегистрироваться</el-button>
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
        this.errorMessage = e.message
        console.error(e)
      }
    } 
  }
}
</script>

<style>

</style>
