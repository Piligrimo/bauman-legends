<template>
  <div class="sign-up">
    <h3 class="sign-up__title">Регистрация</h3>
    <el-input class="sign-up__item" placeholder="Логин" v-model="login"/>
    <el-input class="sign-up__item" placeholder="Пароль" v-model="password" show-password/>
    <el-input class="sign-up__item" placeholder="Имя" v-model="firstName"/>
    <el-input class="sign-up__item" placeholder="Фамилия" v-model="lastName"/>
    <el-input class="sign-up__item" placeholder="Учебная группа" v-model="group"/>
    <el-input class="sign-up__item" placeholder="Ссылка ВК" v-model="vkRef"/>
    <el-button class="sign-up__item" :disabled="isDisabled" @click="submitForm">Зарегистрироваться</el-button>
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

<style scoped>
  .sign-up {
    margin: auto;
    padding: 3rem;
    max-width: 350px;
    background-color: #eeca95c4;
  }
  @media screen and (max-width: 480px) { 
      .sign-up {
        margin: 0 auto;
      }
  }
  .sign-up__item {
    margin-top: 0.5rem;
    width: 100%;
  }

  .sign-up__title {
    text-align: center;
    color: white;
  }
</style>
