<template>
  <div class="content info-bg">
    <div class="layout">
      <h3  class="layout__title">Радар</h3>
      <transition name="fade" mode="out-in">
        <div v-if="!isReaderOpened" key="list">
          <div class="radar">
            <div v-for="i in 11" :key="i" class="radar-item" :style="getRandomPosition()">
              <img class="char" v-if="characters[11-i]" :src="getUrl(characters[11-i])"/>
              <div v-else class="dot"></div>
            </div>
          </div>
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
import { checkCode } from '../api/sidequest'
import { getTeam } from '../api/team'
import { BASEURL } from '../api/config'


export default {
  name: 'SideQuest',
  components: {QrReader},
  data () {
    return {
      errorMessage: '',
      isReaderOpened: false,
      characters: [
      ]
    }
  },
  store,
  async created () {
    await this.updateProgress()
  },
  computed: {
    allWitnessesOpened () {
      return this.witnesses.length && this.witnesses.every(item => item.open)
    }
  },
  methods: {
    async updateProgress() {
      try {
        const {data} =  await getTeam()
        this.characters = data.side
      } catch (e) {
        this.errorMessage = e.response.data.message
      }
    },
    getRandomPosition() {
      const max = 90;
      return {
        top: Math.floor(Math.random() * max) + '%',
        left: Math.floor(Math.random() * max) + '%',
      }
    },
    getUrl(keyword) {
      return `${BASEURL}/file/${keyword}.png`
    },
    async checkCode (keyword) {
     try {
      await checkCode(keyword)
      await this.updateProgress()
      
     } catch (e) {
      this.$message({
        message: 'Неправильны QR-код!',
        type: 'error',
        offset: 65
      });
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

.radar {
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url('../assets/radar.png');
  background-size: cover;
}
.radar-item {
  position: absolute;
  height: 40px;
  width: 40px;
}

.dot {
  background-color: red;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.char {
  width: 100%;
}

.radar-item:last-child {
  position: relative;
}

</style>
