<template>
  <div class="content info-bg">
    <div class="layout">
      <transition name="fade" mode="out-in">
        <div v-if="decision" key="decision">
          <h3>Результат вашего выбора</h3>
          <p>{{decision}}</p>
        </div>
        <div v-else-if="allWitnessesOpened" key="choise">
          <h3>Выбор судьбы ученого</h3>
          <p>Настало время принять решение. От вас зависит судьба этого человека. Отпустите ли вы его на свободу, признав вменяемым гением, или навсегда запрёте его в стенах психбольницы?</p>
          <div  class="layout__actions">
            <el-button class="layout__action" type="primary"  @click="decide(true)">Отпустить</el-button>
            <div>
              <el-button class="layout__action" type="primary"  @click="decide(false)">Признать сумасшедшим</el-button>
            </div>
          </div>
        </div>
        <div v-else-if="!isReaderOpened && false" key="list">
          <h3>Побочное задание</h3>
          <template v-if="witnesses.length">
            <p>Для вашего удобства предоставлен список людей, имеющих отношение к ученому. Здесь будут появляться отметки после общения с каждым из них</p>
            <div class="witness-list">
              <div v-for="item in witnesses" :key="item.witness_id" class="witness-item">
                <p class="witness-item__title">
                  {{item.witness_id === 7 ? 'Ученый' : `Свидетель №${item.witness_id}`}}
                </p>
                <font-awesome-icon
                    v-if="item.open"
                    class="icon"
                    :icon="['fas', 'check']"
                  />
              </div>  
            </div>
            <el-alert
              v-if="codeCheckingResult !== results.NONE"
              :style="{'margin-top': '1rem'}"
              :title="codeCheckingResult === results.SUCCESS ? 'Допрос прошел успешно!': failText"
              :type="codeCheckingResult === results.SUCCESS ? 'success': 'error'"
              show-icon>
            </el-alert>
            <div class="action">
              <el-button type="primary" class="button"  @click="isReaderOpened=true">
                <font-awesome-icon class="icon" :icon="['fas', 'search']"/>
                Допросить
              </el-button>
            </div>
          </template>
        </div>
        <div v-else key="reader">
          <div class="reader-header">
            <h3>Допрос</h3>
            <font-awesome-icon class="icon" :icon="['fas', 'reply']" @click="isReaderOpened=false"/>
          </div>
          <qr-reader @read="checkCode"/>
        </div>
      </transition>
      <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import QrReader from '@/components/QrReader.vue'
import {getDecision, getWitnesses, checkCode, decide} from '@/api/sidequest'


export default {
  name: 'SideQuest',
  components: {QrReader},
  data () {
    return {
      errorMessage: '',
      showCanvas: false,
      timer: null,
      isReaderOpened: false,
      decision: '',
      witnesses: [],
      codeCheckingResult: 'None',
      results: {
        NONE: 'None',
        FAIL: 'Fail',
        SUCCESS: 'Success'
      },
      failText: ''
    }
  },
  store,
  async created () {
    await this.init()
  },
  computed: {
    allWitnessesOpened () {
      return this.witnesses.length && this.witnesses.every(item => item.open)
    }
  },
  methods: {
    async init() {
      try {
        const {data} = await getDecision()
        this.decision = data.text
      } catch (e) {
        if (e.response.status === 400) {
          this.decision =''
          const {data} = await getWitnesses()
          this.witnesses = data
        } else {
          this.errorMessage = e.response.data.message
        }
      }
    },
    async checkCode (keyword) {
     try {
       await checkCode({keyword})
       console.log(data)
       const {data} = await getWitnesses()
       this.witnesses = data
       if (this.allWitnessesOpened)
        await this.init()
       this.codeCheckingResult=this.results.SUCCESS
     } catch (e) {
       this.codeCheckingResult=this.results.FAIL
       this.failText = e?.response?.data?.message || 'Допрос провалился :('
     } finally {
       this.isReaderOpened = false
     }
    },
    async decide (freedom) {
      const {data} = await decide({freedom})
      this.decision = data.text
    }
  }
}
</script>

<style scoped>
 .witness-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #080D38;
 }
.witness-list {
  padding: 1rem;
  background-color: #f8f7f5;
 }
 .witness-item:not(:last-child) {
  border-bottom: 1px solid #b1b1b1;
 }

 .witness-item__title {
   margin-block-end: 0.5rem;
   margin-block-start: 0.5rem;
 }

 .fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to
 {
  opacity: 0;
}
.button {
  width: 200px;
}
.action {
  text-align: center;
  margin-top: 1rem;
}
.reader-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.reader-header .icon {
  font-size: 30px;
  color: #080D38;
}
</style>
