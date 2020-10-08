<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">Документы</h3>
      <div class="doc-list">
        <p v-if="!docs.length">Пока у вашей команды нет открытых документов. Проходите основные задания, что разблокирвать их</p>
        <div v-for="(item, i) in docs" :key="i" class="doc-item">
          <p class="doc-item__title">
            Документ №{{i+1}}
          </p>
          <font-awesome-icon
            @click="download(item.url)"
            class="icon"
            :icon="['fas', 'file-alt']"
          />
        </div>  
      </div>
      <p 
        :style="{padding: '0 0.7rem', 'margin-top': '0.5rem'}" 
        class="hint"
      >
        Чтобы скачать документ, нажми на пиктограммку файла напротив него
      </p>
      <el-alert
        v-if="docs.length >= 10"
        :style="{'margin-top': '1rem'}"
        title="Поздравляем! Ваша команда собрала все документы!"
        type="success"
        show-icon>
      </el-alert>
    </div>
  </div>
</template>

<script>
import {getDocs} from '@/api/game'
import store from '@/store'

export default {
  data () {
    return {
      docs:[]
    }
  },
  store,
  async created() {
   const {data} = await getDocs()
   this.docs = data
  },
  computed: {
  },
  methods: {
    download (url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>
    .doc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #080D38;
 }
.doc-list {
  padding: 1rem;
  background-color: #f8f7f5;
 }
 .doc-item:not(:last-child) {
  border-bottom: 1px solid #b1b1b1;
 }

 .doc-item__title {
   margin-block-end: 0.5rem;
   margin-block-start: 0.5rem;
 }
</style>
