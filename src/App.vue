<template>
  <div id="app">
    <div v-if="$store.state.isAuth" class="header">
      <i class="el-icon-more" @click="collapsed = !collapsed"></i>
      <p @click="logOut">Выйти</p>
    </div>
    <div v-if="$store.state.isAuth" class="sidebar">
      <el-menu 
      router
        class="menu"
        :collapse="collapsed"
        background-color="#20245c"
        active-text-color="#ffffff"
        text-color="#ffca85"
      >
        <el-menu-item index="team">Моя команда</el-menu-item>
        <el-menu-item index="game">Задание</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view/>  
    </div>
  </div>
</template>

<script>
import store from '@/store'
import {logOut, getUser} from '@/api/user'
export default {
  data () {
    return {
      collapsed: true
    }
  },
  async created () {
    try {
      const {data} = await getUser()
      console.log(data) 
      if (data?.user_id) 
        this.$store.commit('setAuth', true)
      else
        this.$store.commit('setAuth', false)
    } catch (e) {
        this.$store.commit('setAuth', false)
    }
  },
  store,
  methods: {
    async logOut () {
      await logOut()
      this.$store.commit('setAuth', false)
    }
  }
}
</script>

<style>
  #app {
    height: 100%; 
  }
  .content{
    height: 100%; 
    background-image: url('./assets/bg.jpg');
    background-size: cover;
    padding: 3rem;
  }
 .header {
   min-height: 60px;
   padding: 0 1rem;
   background-color: #141744;
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: white;
 }
 .sidebar {
   position: absolute;
   height: 100%;
 }
 .el-menu--collapse {
   width: 0;
 }
 .menu {
   height: 100%;
 }
 body {
   margin: 0;
   height: 100%; 
 }
 html {
   height: 100%; 
 }
 
</style>
