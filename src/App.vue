<template>
  <div id="app">
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
          <el-menu-item 
            v-if="$store.state.stage === 'FINAL'"
            index="/side-quest" 
            @click="collapsed = true"
          > 
            <p class="menu-item">Побочное задание</p>
          </el-menu-item>
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
    this.$message({
          message: this.browser,
          type: 'warning',
          duration: 0,
          showClose: true
        });

    console.log('Мужество, Воля, Труд и Упорство!')
    console.log('--------------------------------')
    console.log('Здорова, хакер. Все ответы тут https://clck.ru/9TFat')
    await this.$store.dispatch('getUser')
    await this.$store.dispatch('getStage')
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
    browser () {
      const uAgent = navigator.userAgent || ''
      return {
       
	version : (uAgent.match( /.+(?:me|ox|on|rv|it|era|ie)[/: ]([\d.]+)/ ) || [0,'0'])[1],
	opera : /opera/i.test(uAgent),
	mozilla : /firefox/i.test(uAgent),
	chrome : /chrome/i.test(uAgent),
	safari : (!(/chrome/i.test(uAgent)) && /webkit|safari|khtml/i.test(uAgent)),
	iphone : /iphone/i.test(uAgent),
	ipod : /ipod/i.test(uAgent),
	iphone4 : /iphone.*OS 4/i.test(uAgent),
	ipod4 : /ipod.*OS 4/i.test(uAgent),
	ipad : /ipad/i.test(uAgent),
	ios : /ipad|ipod|iphone/i.test(uAgent),
	android : /android/i.test(uAgent),
	bada : /bada/i.test(uAgent),
	mobile : /iphone|ipod|ipad|opera mini|opera mobi|iemobile/i.test(uAgent),
	msie_mobile : /iemobile/i.test(uAgent),
	safari_mobile : /iphone|ipod|ipad/i.test(uAgent),
	opera_mobile : /opera mini|opera mobi/i.test(uAgent),
	opera_mini : /opera mini/i.test(uAgent),
	mac : /mac/i.test(uAgent),
	android_version: parseFloat(uAgent.slice(uAgent.indexOf("Android")+8)) || 0
};

    }
  },
  methods: {
    async logOut () {
      await logOut()
      this.$store.commit('setAuth', false)
    },
    handleRouting () {
      if (!this.isAuth && this.requiresAuth)
        this.$router.push('/login')
      if (this.isAuth && !this.requiresAuth)
        this.$router.push('/team')
      if (this.$store?.state?.stage !== 'FINAL' && 
        this.$store?.state?.stage !== '' && 
        this.$route.path === '/side-quest'
      )
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
