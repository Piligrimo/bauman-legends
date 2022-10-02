<template>
  <div class="content game-bg" :class="bgClass">
    <div class="layout">
      <div >
        <div class="refresh-button">
          <div class="refresh-button">
            <font-awesome-icon
              class="icon"
              :class="{spinning: isRefreshing}"
              :icon="['fas', 'sync-alt']"
              @click="refreshTask"
            />
          </div>
        </div>
        <h3 class="layout__title">Игра</h3>


        <div v-if="task === null">
          <el-button v-if="isCaptain" type="primary" class="layout__item" @click="next">
            Взять следующее задание
          </el-button>
          <p v-else>Попроси капитана, чтоб он взял задание</p>
        </div>
        <div v-else>
          <h4>{{task.title}}</h4>
          <img v-if="task.photo" :src="task.photo"/>
          <p>{{task.text}}</p>

          <el-input v-if="isCaptain" class="layout__item" placeholder="Oтвет" v-model="answer"/>
          <div  class="layout__actions">
            <el-button
              v-if="isCaptain"
              type="primary" 
              class="layout__item" 
              @click="answerToTask"
            >
              Ответить
            </el-button>
            <el-button v-if="isCaptain" class="layout__item" type="primary" @click="skip">Пропустить задание</el-button>
          </div>
        </div>

<!--     !!! легаси или типа того    
        <h3  v-if="isPlay && isMain">На решение осталось {{prettifyTime(this.timeRemaining)}}</h3>
        <p v-if="isPlay && attemptsCaption">{{attemptsCaption}}</p>

        <b v-if="isSuccess">Вы ответили верно! Скажи своим товарищам по команде обновить страницу на своих устройствах. Пусть капитан возьмет следующее задание, когда будете готовы</b>
        <b v-if="isFail">К сожалению, вы не смогли ответить верно :( Пусть капитан возьмет следующее задание, когда будете готовы</b>
        <p v-if="isSuccess && correctAnswer">Правильный ответ: {{correctAnswer}}</p>
        <p v-if="isPause && isMain && isSuccess">Задание решено за {{timeSpent}}</p>
        <p v-if="isPause && isMain && isSuccess">Баллы команды: {{points}}</p>
        
        <el-input v-if="isPlay" class="layout__item" placeholder="Oтвет" v-model="answer"/>
        <el-button v-if="isCaptain && task===null" type="primary" class="layout__item" @click="next">
          {{task && task.task && task.task.task_id ? 'Взять следующее задание':'Взять задание'}}
        </el-button>
        <el-button
          v-if="isPlay" 
          type="primary" 
          class="layout__item" 
          :disabled="!answer"
          @click="answerToTask"
        >
          Ответить
        </el-button>
       
        <el-button v-if="isCaptain && isPlay && isSkippable" class="layout__item" type="primary" @click="skip">Пропустить задание</el-button>

        <el-collapse v-if="isPlay && isMain && hints.length" class="collapse" >
          <el-collapse-item>
            <h3 class="collapse-title" slot="title">Подсказки</h3>
            <h4>Экстра-баллы: {{money}}</h4>
            <div v-for="hint in hints" :key="hint.hint_id" class="task-hint">
              <div v-if="hint.html" v-html="hint.html"/>
              <template v-else>
                <p>Подсказка за {{hint.cost}}</p>
                <el-button type="primary" size="mini" @click="openHintDialog(hint)">Купить</el-button>
              </template>
            </div>
          </el-collapse-item>
        </el-collapse> -->
        <p v-for="(message, i) in errorMessages" :key="i" class="error-message" >{{ message }}</p>
      </div>
      <el-dialog
        :title="`Купить подсказку за ${chosenHint.cost} экстра-баллов?`"
        :visible.sync="hintDialogVisible"
        :before-close="closeDialog"
        width="300px"
      >
        <div class="dialog-body">
          <p v-if="isHintAffordable">Баланс вашей команды - {{money}}.<br> Вы уверены, что хотите взять подсказку?</p>
          <p v-else>К сожалению, у команды недостаточно экстра-баллов, чтоб взять эту подсказку</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="button" type="primary" @click="buyHint" :disabled="!isHintAffordable">Купить</el-button>
          <el-button class="button" @click="closeDialog">Отменить</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import {getTask, nextTask, skipTask, answer, getHints, buyHint, getFact} from '@/api/game'
import {getTeam} from '@/api/team'
const getMinutes = (time) => {
  const minutes = Math.floor(time / 60)
  return minutes >= 10 ? minutes : '0' + minutes
}
const getSeconds = (time) => {
  const seconds = Math.floor(time % 60)
  return seconds >= 10 ? seconds : '0' + seconds
}

export default {
  name: 'Game',
  data () {
    return {
      task: null,
      hints: [],
      errorMessages: [],
      answer: '',
      timeOnPageLoad: 0,
      timeRemaining: 0,
      timer: null,
      chosenHint: {
        id: '',
        cost: ''
      },
      money: 0,
      points: 0,
      hintDialogVisible: false,
      isRefreshing: false,
      factText:'',
      factDialogVisible: false
    }
  },
  async created () {
    await this.refreshTask()
    const vue = this
    window.addEventListener('focus', async() => {
      if (vue.isMain)
        await vue.refreshTask()
    })
  },
  store,
  computed:{
    isCaptain () {
      return this.$store.state.user.captain
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
    isMain () {
      return this.task?.task?.task_type === 'MAIN'
    },
    isSkippable () {
      return this.task?.task?.skip
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
    timeSpent () {
      return this.prettifyTime(this.task?.task?.finish_time - this.task?.task?.start_time)
    },
    bgClass () {
      switch (this.task?.task?.task_id % 3){
        case 0 : return 'game-bg-1'
        case 1 : return 'game-bg-2'
        case 2 : return 'game-bg-3'
        default: return 'game-bg-1'
      }
    },
    isHintAffordable () {
      return this.chosenHint?.cost <= this.money
    },
    attemptsCaption () {
      if (!this.task?.task?.max_attempts) return
      return `Попытки ${this.task.attempts_count} из ${this.task.task.max_attempts}`
    },
    correctAnswer () {
      return this.task?.task.answer
    }
  },
  watch: {
    async timeRemaining (val) {
      if (val <= -1){
        clearInterval(this.timer)
        const {data} = await getTask() 
        this.task = data
      }
    }
  },
  methods: {
    handleError(e) {
      const detail = e.response?.data?.detail;
      if (detail?.length && typeof detail !== 'string') {
        this.errorMessages =  detail.map(({ msg }) => msg)
        return
      }
      this.errorMessages = [e.response.data.detail || "Произошла ошибка"];
    },
    async next() {
      try {
        const {data} = await nextTask()
        this.task = data
        this.timeOnPageLoad = Number(new Date()) / 1000
        this.getHints()
        this.timeRemaining = this.timeRemainedOnPageLoading
        const vue = this
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          vue.timeRemaining-- 
        }, 1000)
      } catch (e) {
        console.error(e);
        const detail = e.response?.data?.detail;
        if (detail?.length && typeof detail !== 'string') {
          this.errorMessages =  detail.map(({ msg }) => msg)
          return
        }
        this.errorMessages = [e.response.data.detail || "Произошла ошибка"];
      }
    },
    async skip() {
      try {
        const {data} = await skipTask()
        await this.getPoints()
        this.task = data
      } catch (e) {
        this.handleError(e)
      }
    },
    async answerToTask() {
      try {
        await answer({answer: this.answer})
        await this.refreshTask()
      } catch (e) {
        await this.refreshTask()
        this.handleError(e)
      } finally {
        this.answer = ''
      }
    },
    async getHints() {
      try {
        const {data} = await getHints()
        this.hints = data
        const team = await getTeam()
        this.money = team?.data?.money
      } catch (e) {
        this.handleError(e)
      }
    },

    async refreshTask () {
      this.errorMessages = []
      this.isRefreshing = true
      clearInterval(this.timer)
      try {
        const {data} = await getTask() 
        this.task = data
        this.timeOnPageLoad = Number(new Date()) / 1000
        if (this.isPlay && this.isMain) {
          this.getHints()
          this.timeRemaining = this.timeRemainedOnPageLoading
          const vue = this
          this.timer = setInterval(() => {
            vue.timeRemaining-- 
          }, 1000)
        }
        await this.getPoints()
      } catch (e) {
        this.handleError(e)
      } finally {
        const vue = this
        setTimeout(()=>{vue.isRefreshing = false}, 1000)
      }
    },
    openHintDialog(hint) {
      this.hintDialogVisible = true
      this.chosenHint = hint
    },
    prettifyTime (time) {
      if (time<=0) return '00:00'
      return `${getMinutes(time)}:${getSeconds(time)}`
    },
    async buyHint(){
      try {
        await buyHint(this.chosenHint.hint_id)
        await this.getHints()
      } catch (e) {
        this.handleError(e)
      } finally {
        this.closeDialog()
      }
    },
    closeDialog () {
      this.chosenHint = {
        hint_id:'',
        cost: ''
      }
      this.hintDialogVisible = false
    },
    async getPoints() {
        const {data} = await getTeam()
        this.points = data?.score
    },
    async getFact () {
      try {
        const {data} = await getFact()
        this.factText = data.fact
        this.factDialogVisible = true
      } catch (e) {
        this.handleError(e)
      }
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
  background-image: url('../assets/game-bg-2.jpg');
}

.game-bg-3 {
  background-image: url('../assets/game-bg-3.jpg');
}

.collapse-title {
  margin-left: 1rem;
}

.collapse {
  margin-top: 1rem;
}
.task-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  border-top: 1px solid #b1b1b1;
  word-break: break-word;
}

.refresh-button {
  position: relative;
  right: 0px;
  font-size: 30px;
  text-align: right;
  color: #080D38;
}
.spinning {
  animation-name: rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotation {
  0% {
      transform:rotate(0deg);
  }
  100% {
      transform:rotate(360deg);
  }
}
</style>
 