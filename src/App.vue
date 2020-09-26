<template>
  <div id="app">
    <div id="mop"/>
    <div v-if="$store.state.isAuth" class="header">
      <font-awesome-icon
        class="icon"
        :icon="['fas', 'bars']"
        @click="collapsed = !collapsed"
      />
      <div class='logo'/>
      <font-awesome-icon
        class="icon"
        :icon="['fas', 'sign-out-alt']"
        @click="logOut"
      />
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
          <el-menu-item index="/team" @click="collapsed = true"> <p class="menu-item">Моя команда</p> </el-menu-item>
          <el-menu-item index="/game" @click="collapsed = true"> <p class="menu-item">Задание</p></el-menu-item>
        </el-menu>
      </div>
    </transition>
    <router-view/>  
  </div>
</template>

<script>
import store from '@/store'
import {logOut} from '@/api/user'
export default {
  data () {
    return {
      collapsed: true
    }
  },
  async created () {
    await this.$store.dispatch('getUser')
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

  #mop {
    background-size: contain;
    position: absolute;
    height: 100%; 
    width: 100%;
    background-repeat: no-repeat;
    background-image: url('./assets/mop.png');
    z-index: 10;
  }

  .default-bg {
    background-image: url('./assets/bg.jpg');
  }

  .logo {
    background-image: url('./assets/smol-logo.jpg');
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
 .header {
   min-height: 60px;
   padding: 0 1rem;
   background-color: #141744;
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: white;
   z-index: 2;
 }
 .sidebar {
   position: absolute;
   font-family: 'Cool jazz';
   height: 100%;
   z-index: 1;
 }
 .el-menu--collapse {
   width: 0;
 }
 .menu {
   height: 100%;
   width: 300px;
 }
 .menu-item {
   font-size: 18px;
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
