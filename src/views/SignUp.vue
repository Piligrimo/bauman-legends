<template>
  <div class="content login-bg">
    <div class="layout">
      <h3 class="layout__title">Регистрация</h3>
      <p class="label">Логин</p>
      <el-input class="layout__item" placeholder="Login" v-model="login" />
      <p class="label">Пароль</p>
      <el-input
        class="layout__item"
        placeholder="******"
        v-model="password"
        show-password
      />
      <p class="label">Имя</p>
      <el-input class="layout__item" placeholder="Иван" v-model="firstName" />
      <p class="label">Фамилия</p>
      <el-input class="layout__item" placeholder="Иванов" v-model="lastName" />
      <p class="label">Учебная группа</p>
      <el-input
        class="layout__item"
        placeholder="ИУ5-14"
        v-model="group"
      />
      <p class="label">Ссылка ВК</p>
      <el-input class="layout__item" placeholder="id0123456" v-model="vkRef" />
      <br/>
      <br/>
      <el-button class="layout__item"  type="primary"  :disabled="isDisabled" @click="submitForm"
        >Зарегистрироваться</el-button
      >
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { signUp } from "@/api/user";
import axios from "axios";

const errorDict = {
  first_name: "Имя введено в неправильном формате!",
  last_name: "Фамилия введена в неправильном формате!",
  vk_ref: "Ссылка на вк введена в неправильном формате!",
  group_number: "Учебная группа введена в неправильном формате!",
};

export default {
  data() {
    return {
      login: "",
      password: "",
      firstName: "",
      lastName: "",
      group: "",
      vkRef: "",
      errorMessage: "",
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

        this.$router.push("/team");
      } catch (e) {
        console.error(e);
        const detail = e.response?.data?.detail;
        if (detail?.length) {
          const messages = detail.map(({ loc }) => {
            const field = loc?.[1];
            return errorDict[field];
          });
          this.errorMessage = messages.join('\n')
          return
        }

        this.errorMessage = e.response.data.detail || "Произошла ошибка";
      }
    },
  },
};
</script>

<style scoped>
  .label {
    color: rgb(46, 49, 51);
    font-size: 12px;
    margin: 8px 4px -6px 6px;
  }
</style>
