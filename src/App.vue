<template>
  <div id="app">
    <div v-if="$store.state.isAuth" class="header">
      <i class="el-icon-more" @click="collapsed = !collapsed"></i>
      <p @click="logOut">Выйти</p>
    </div>
    <transition name="slide">
      <div v-if="$store.state.isAuth && !collapsed" class="sidebar">
        <el-menu 
          router
          :default-active="$route.path"
          class="menu"
          background-color="#20245c"
          active-text-color="#ffffff"
          text-color="#ffca85"
        >
          <el-menu-item index="/team" @click="collapsed = true">Моя команда</el-menu-item>
          <el-menu-item index="/game" @click="collapsed = true">Задание</el-menu-item>
        </el-menu>
      </div>
    </transition>
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
   width: 300px;
 }
 body {
   margin: 0;
   height: 100%; 
 }
 html {
   height: 100%; 
 }
 .slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
 
</style>
