<template>
  <div class="content info-bg">
    <div class="layout">
      <h3  class="layout__title">Радар</h3>
      <transition name="fade" mode="out-in">
        <div v-if="!isReaderOpened" key="list">
            
            <div class="action">
              <el-button type="primary" class="button"  @click="isReaderOpened=true">
                Cканер
              </el-button>
            </div>
        </div>
        <div v-else key="reader">
          <div class="reader-header">
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
// import {getDecision, getWitnesses, checkCode, decide} from '@/api/sidequest'


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
        console.log('inint');
      } catch (e) {
        if (e.response.status === 400) {
          this.decision =''
        } else {
          this.errorMessage = e.response.data.message
        }
      }
    },
    async checkCode (keyword) {
     try {
      this.errorMessage=keyword
       console.log(keyword)
     } catch (e) {
      console.error(e);
     } finally {
       this.isReaderOpened = false
     }
    },
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
