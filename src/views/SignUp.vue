<template>
  <div class="content login-bg">
    <div class="layout">
      <armed-title text="Регистрация" /> 
      <p class="label">Логин</p>
      <el-input class="layout__item" placeholder="Login" v-model="login" :maxlength="21" />
      <p class="label">Пароль</p>
      <el-input
        class="layout__item"
        placeholder="******"
        v-model="password"
        show-password
        :maxlength="21"
      />
      <p class="label">Имя</p>
      <el-input class="layout__item" placeholder="Иван" v-model="firstName" :maxlength="30" />
      <p class="label">Фамилия</p>
      <el-input class="layout__item" placeholder="Иванов" v-model="lastName" :maxlength="30" />
      <p class="label">Учебная группа</p>
      <el-input
        class="layout__item"
        placeholder="ИУ5-14"
        v-model="group"
        :maxlength="10"
      />
      <p class="label">Ник или cсылка ВК</p>
      <el-input class="layout__item" placeholder="id0123456" v-model="vkRef" :maxlength="40" />
      <br/>
      <br/>
      <el-button class="layout__item"  type="primary"  :disabled="isDisabled" @click="submitForm">
        Зарегистрироваться</el-button>
      <router-link  class="layout__action"  to="/login">
        <el-button  class="layout__action_wide" type="primary">Назад</el-button>
      </router-link>
      <p v-for="(message, i) in errorMessages" :key="i" class="error-message" >{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { signUp } from "@/api/user";
import axios from "axios";
import ArmedTitle from '../components/ArmedTitle.vue'

export default {
  components: {
    ArmedTitle
},
  data() {
    return {
      login: "",
      password: "",
      firstName: "",
      lastName: "",
      group: "",
      vkRef: "",
      errorMessages: [],
    };
  },
  computed: {
    isDisabled() {
      const fields = [
        this.login,
        this.password,
        this.firstName,
        this.lastName,
        this.group,
        this.vkRef,
      ];
      return !fields.every(Boolean);
    },
  },
  methods: {
    async submitForm() {
      this.errorMessage = "";
      const args = {
        login: this.login,
        password: this.password,
        first_name: this.firstName,
        last_name: this.lastName,
        group_number: this.group,
        vk_ref: this.vkRef,
      };
      try {
        const {
          data: { access_token },
        } = await signUp(args);
        localStorage.setItem("access_token", access_token);
        axios.defaults.headers.common.Authorization = "Bearer " + access_token;
        await this.$store.dispatch("getUser");

        this.$router.push("/banner");
      } catch (e) {
        console.error(e);
        const detail = e.response?.data?.detail;
        if (detail?.length && typeof detail !== 'string') {
          this.errorMessages =  detail.map(({ msg }) => msg);
          return
        }

        this.errorMessages = [e.response.data.detail || "Произошла ошибка"];
      }
    },
  },
};
</script>

<style scoped>
</style>
