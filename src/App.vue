<template>
  <div id="app">
    <div v-if="isAuth" class="header">
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
          background-color="#10141d"
          active-text-color="#ffffff"
          text-color="#fbf5c3"
        >
          <el-menu-item index="/team" @click="collapsed = true"> <p class="menu-item">Моя команда</p> </el-menu-item>
          <el-menu-item index="/help" @click="collapsed = true"> <p class="menu-item">Справка</p> </el-menu-item>
          <el-menu-item index="/consult" @click="collapsed = true"> <p class="menu-item">Консультация</p> </el-menu-item>
          <!-- !!!!!!!!!!! На время регистрации !!!!!!!!!!! -->
          <!-- <el-menu-item index="/game" @click="collapsed = true"> <p class="menu-item">Задание</p></el-menu-item>
          <el-menu-item index="/docs" @click="collapsed = true"> <p class="menu-item">Документы</p></el-menu-item>
          <el-menu-item index="/side-quest"  @click="collapsed = true"> <p class="menu-item">Побочное задание</p></el-menu-item> -->
        </el-menu>
      </div>
    </transition>
    <router-view/>
    <div id="vk_community_messages" :class="{hide: hideVkWidget}"></div>
  </div>
</template>

<script>
import store from '@/store'
import axios from 'axios';

export default {
  data () {
    return {
      collapsed: true
    }
  },
  async created () {
    if (this.message && !localStorage.messageShown) {
      this.$message({
        message: this.message,
        type: 'warning',
        duration: 0,
        showClose: true
      })
      localStorage.messageShown = true
    }

    console.log('Мужество, Воля, Труд и Упорство!')
    console.log('--------------------------------')
    console.log('Здорова, хакер. Все ответы тут https://clck.ru/9TFat')
    await this.$store.dispatch('getUser')
    //  await this.$store.dispatch('getStage') на время регистрации закоментил
    this.handleRouting()
  },
  store,
  watch: {
    isAuth: { 
      handler() {
        this.handleRouting()
      }
    }
  },
  computed: {
    requiresAuth () {
      const nonAuthRoutes = ['/login', '/sign-up']
      return !nonAuthRoutes.includes(this.$route.path)
    },
    isAuth () {
      return this.$store.state.isAuth
    },
    hideVkWidget () {
      return this.$route.name !== 'Consult'
    },
    message () {
      const uAgent = navigator.userAgent || ''
      const ios = /ipad|ipod|iphone/i.test(uAgent)
      const android = /android/i.test(uAgent)
      if (ios) return 'Для нормальной работоспособности сайта используйте Safari'
      if (android) return 'Для нормальной работоспособности сайта используйте Google Chrome'
      return ''
    }
  },
  methods: {
    async logOut () {
      localStorage.removeItem('access_token')
      delete axios.defaults.headers.common.Authorization
      
      this.$store.commit('setAuth', false)
    },
    handleRouting () {
      if (!this.isAuth && this.requiresAuth)
        this.$router.push('/login')
      if (this.isAuth && !this.requiresAuth)
        this.$router.push('/team')
    }
  }
}
</script>

<style>
  #app {
    height: 100%; 
  }
  .default-bg {
    background-image: url('./assets/bg.jpg');
  }

  .hide {
    display: none;
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
   background-color: #080b11;
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: white;
   z-index: 5;
 }
 .sidebar {
   position: absolute;
   font-family: 'Cool jazz';
   height: 100%;
   z-index: 4;
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
