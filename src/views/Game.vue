<template>
  <div class="content game-bg game-bg-1">
    <div class="layout">
      <div v-loading="task === null">
        <h3 class="layout__title">Игра</h3>
        <p v-if="!isPlay && task">{{task.text}}</p>

        <div v-if="html" v-html="html" class="task-view"/>
        
        <h3>На решение осталось {{getMinutes}}:{{getSeconds}}</h3>

        <p v-if="isSuccess">Вы ответили верно! Скажи своим товарищам по команде обновить страницу на своих устройствах. Пусть капитан возьмет следующее задание, когда будете готовы</p>
        <p v-if="isFail">К сожалению вы не смогли ответить верно :( Пусть капитан возьмет следующее задание, когда будете готовы</p>
        
        <el-input v-if="isPlay" class="layout__item" placeholder="Oтвет" v-model="answer"/>

        <el-button v-if="isCaptain && isPause" type="primary" class="layout__item" @click="next">Взять задание</el-button>
        <el-button v-if="isPlay" type="primary" class="layout__item" @click="answerToTask">Ответить</el-button>
       
        <div v-if="isCaptain && isPlay" class="layout__actions">
          <el-button class="layout__action" type="primary" @click="skip">Пропустить задание</el-button>
          <el-button :style="{'margin-left': 0}" class="layout__action" type="primary" @click="hint">Взять подсказку</el-button>
        </div>

        <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import {getTask, nextTask, skipTask, answer} from '@/api/game'
export default {
  name: 'Game',
  data () {
    return {
      task: null,
      errorMessage: '',
      answer: '',
      timeOnPageLoad: 0,
      timeRemaining: 0,
      timer: null
    }
  },
  async created () {
    const {data} = await getTask() 
    this.task = data
    this.timeOnPageLoad = Number(new Date()) / 1000
    if (this.isPlay && this.task?.task?.task_type === 'MAIN') {
      this.timeRemaining = this.timeRemainedOnPageLoading
      const vue = this
      this.timer = setInterval(() => {
        vue.timeRemaining-- 
      }, 1000)
    }
  },
  store,
  computed:{
    isAuth () {
      return this.$store.state.isAuth
    },
    isCaptain () {
      return this.$store.state.user?.role === 'CAPTAIN'
    },
    isPlay () {
      return this.task?.status === 'PLAY'
    },
    isPause () {
      return this.task?.status === 'PAUSE'
    },
    isSuccess () {
      return this.task?.task?.task_status === 'SUCCESS'
    },
    isFail () {
      return this.task?.task?.task_status === 'FAIL'
    },
    html () {
      return this.task?.task?.html
    },
    deadlineTime () {
      return this.task?.task?.start_time + this.task?.task?.duration
    },
    timeRemainedOnPageLoading () {
      return this.deadlineTime - this.timeOnPageLoad
    },
    getMinutes () {
      return Math.floor(this.timeRemaining / 60)
    },
    getSeconds () {
      const seconds = Math.floor(this.timeRemaining % 60)
      return seconds > 10 ? seconds : '0' + seconds
    }
  },
  watch: {
    isAuth (val) {
      if (!val)
      this.$router.push('/login')
    } 
  },
  methods: {
    async next() {
      try {
        const {data} = await nextTask()
        this.task = data
      } catch (e) {
        this.errorMessage = e.response.data.message
      }
    },
    async skip() {
      try {
        const {data} = await skipTask()
        this.task = data
      } catch (e) {
        this.errorMessage = e.response.data.message
      }
    },
    async answerToTask() {
      try {
        const team_id = this.$store.state.user?.team_id
        const task_id = this.task?.task?.task_id
        await answer({team_id, task_id, answer: this.answer})
        const {data} = await getTask() 
        this.task = data
      } catch (e) {
        this.errorMessage = e.response.data.message
      }
    },
    async hint () {

    }
  }
}
</script>

<style scoped>
.game-bg {
  background-color: #EFEAE2;
  background-position: bottom left;
}

.game-bg-1 {
  background-image: url('../assets/game-bg-1.jpg');
}

.game-bg-2 {
  background-image: url('../assets/game-bg-1.jpg');
}

.game-bg-3 {
  background-image: url('../assets/game-bg-3.jpg');
}

</style>
 