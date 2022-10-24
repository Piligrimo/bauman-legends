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
          <template v-if="isAdmin">
            <el-menu-item index="/teams" @click="collapsed = true"> <p class="menu-item">Команды</p> </el-menu-item>
            <el-menu-item index="/moders" @click="collapsed = true"> <p class="menu-item">Модераторы</p> </el-menu-item>
            <el-menu-item v-if="isMainAdmin" index="/puzzle" @click="collapsed = true"> <p class="menu-item">Загадки</p> </el-menu-item>
            <el-menu-item index="/feed" @click="collapsed = true"> <p class="menu-item">Опубликовать новость</p> </el-menu-item>
            <el-menu-item v-if="isMainAdmin" index="/stage-control" @click="collapsed = true"> <p class="menu-item">Переключение этапа</p> </el-menu-item>
          </template>
          <template v-else-if="stage==='register'">
            <el-menu-item index="/banner" @click="collapsed = true"> <p class="menu-item">Главная</p> </el-menu-item>
            <el-menu-item index="/team" @click="collapsed = true"> <p class="menu-item">Моя команда</p> </el-menu-item>
            <el-menu-item index="/consult" @click="collapsed = true"> <p class="menu-item">Консультация</p> </el-menu-item>
            <el-menu-item index="/feed" @click="collapsed = true"> <p class="menu-item">Обновления</p> </el-menu-item>
          </template>
          <template v-else-if="stage==='main'">
            <el-menu-item index="/team" @click="collapsed = true"> <p class="menu-item">Моя команда</p> </el-menu-item>
            <el-menu-item index="/game" @click="collapsed = true"> <p class="menu-item">Испытание</p></el-menu-item>
            <el-menu-item index="/results" @click="collapsed = true"> <p class="menu-item">Результаты</p> </el-menu-item>
            <el-menu-item index="/help" @click="collapsed = true"> <p class="menu-item">Справка</p> </el-menu-item>
            <el-menu-item index="/consult" @click="collapsed = true"> <p class="menu-item">Консультация</p> </el-menu-item>
            <el-menu-item index="/feed" @click="collapsed = true"> <p class="menu-item">Обновления</p> </el-menu-item>
          </template>
          <template v-else-if="stage==='final'">
            <el-menu-item index="/team" @click="collapsed = true"> <p class="menu-item">Моя команда</p> </el-menu-item>
            <el-menu-item index="/game" @click="collapsed = true"> <p class="menu-item">Бортовой журнал</p></el-menu-item>
            <el-menu-item index="/results" @click="collapsed = true"> <p class="menu-item">Архив</p> </el-menu-item>
            <el-menu-item index="/consult" @click="collapsed = true"> <p class="menu-item">Связь</p> </el-menu-item>
            <el-menu-item index="/help" @click="collapsed = true"> <p class="menu-item">Справка</p> </el-menu-item>
            <el-menu-item index="/feed" @click="collapsed = true"> <p class="menu-item">Обновления</p> </el-menu-item>
          </template>
          <template v-else-if="stage==='end'">
            <el-menu-item index="/banner" @click="collapsed = true"> <p class="menu-item">Главная</p> </el-menu-item>
          </template>
          
          <!-- !!!!!!!!!!! На время регистрации !!!!!!!!!!! -->
          <!-- 
          <el-menu-item index="/docs" @click="collapsed = true"> <p class="menu-item">Документы</p></el-menu-item>
          <el-menu-item index="/side-quest"  @click="collapsed = true"> <p class="menu-item">Побочное задание</p></el-menu-item> -->
        </el-menu>
      </div>
    </transition>
    <router-view/>
    <el-dialog
      title="Новое сообщение!"
      :visible.sync="plotDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      center
      width="300px"
    >
      <p v-html="plotMessage" class="dialog-body" />
      <span slot="footer">
        <template v-if="buttonSet === 0">
          <el-button style="width: 100px" class="button" type="primary" @click="helpPlotStage">Да</el-button>
          <el-button style="width: 100px" class="button" type="primary" @click="termsPlotStage">Нет</el-button>
        </template>
        <el-button v-else-if="buttonSet === 1" class="button" type="primary" @click="preStartPlotStage">Продолжить</el-button>
        <el-button v-else class="button" type="primary" @click="startPlotStage">Ура!</el-button>
      </span>
    </el-dialog>
    <el-dialog
        class="shakin"
        title="Warning!!!"
        :visible.sync="warningVisible"
        width="300px"
      >
        <div style="color: red" class="dialog-body">
          <i class="el-icon-warning"></i> 
          <span> Нет доступа!!!</span>
        </div>
      </el-dialog>
    <div id="vk_community_messages" :class="{hide: hideVkWidget}"></div>
  </div>
</template>

<script>
import store from '@/store'
import axios from 'axios';
import plotMessages from './assets/plotMessages';

export default {
  data () {
    return {
      collapsed: true,
      warningVisible: false,
      plotMessage: '',
      plotDialogVisible: false,
      buttonSet: 0,
    }
  },
  async created () {
    if (this.message && !localStorage.messageShown) {
      this.$message({
        message: this.message,
        type: 'warning',
        duration: 0,
        showClose: true,
      })
      localStorage.messageShown = true
    }

    

    console.log('Мужество, Воля, Труд и Упорство!')
    console.log('--------------------------------')
    console.log('Здорова, хакер. Все ответы тут https://clck.ru/9TFat')
    await this.$store.dispatch('getUser')
    this.handleRouting()
  },
  store,
  watch: {
    isAuth: { 
      handler(val) {
        this.handleRouting()
        if (val) {
          this.handlePlot()
        }
      }
    },
    isOnHelp(val) {
      if (val) {
        this.plotDialogVisible = false
      } else if (localStorage.getItem('plotStage') === 'help') {
        localStorage.setItem('plotStage', 'terms')
        this.handlePlot()
      }
    }
  },
  computed: {
    requiresAuth () {
      const nonAuthRoutes = ['/login', '/sign-up']
      return !nonAuthRoutes.includes(this.$route.path)
    },
    isOnHelp() {
      return this.$route.path === '/help'
    },
    isAuth () {
      return this.$store.state.isAuth
    }, 
    isAdmin ()  {
      return this.$store.state.user.admin
    },
    isMainAdmin ()  {
      return this.$store.state.user.main_admin
    },
    stage ()  {
      return this.$store.state.stage
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
    helpPlotStage() {
      this.$router.push('/help')
      localStorage.setItem('plotStage', 'help')
    },
    termsPlotStage() {
      this.plotMessage=plotMessages[16] 
      localStorage.setItem('plotStage', 'terms')
      this.buttonSet = 1
    },
    preStartPlotStage() {
      this.plotMessage=plotMessages[17] 
      localStorage.setItem('plotStage', 'preStart')
      this.buttonSet = 2
    },
    startPlotStage() {
      this.plotDialogVisible = false;
      localStorage.setItem('plotStage', 'start')
    },
    handleRouting () {
      if (!this.isAuth && this.requiresAuth){
        this.logOut()
        this.$router.push('/login')
      }
      if (this.isAuth && !this.requiresAuth)
      {
        if(this.isAdmin)
          this.$router.push('/teams')
        else
          this.$router.push('/team')
      }
    },
    handlePlot() {
      if (this.isAdmin) return
      const plotStage = localStorage.getItem('plotStage')
      if (!plotStage) {
        this.plotDialogVisible = true;
        this.plotMessage = plotMessages[15]
        this.buttonSet = 0
      } else if (plotStage === 'terms') {
        this.plotDialogVisible = true;
        this.plotMessage = plotMessages[16]
        this.buttonSet = 1 
      } else if (plotStage === 'preStart') {
        this.plotDialogVisible = true;
        this.plotMessage = plotMessages[17]
        this.buttonSet = 2
      }
    },
    warn()  {
      this.warningVisible = true
      const vue = this
        setTimeout(()=>{vue.warningVisible = false}, 1500)
    }
  }
}
</script>

<style>
  #app {
    height: 100%; 
   font-family: 'Cool jazz';

  }

  #vk_community_messages {
    z-index: 3 !important;
    right: 0 !important;
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
