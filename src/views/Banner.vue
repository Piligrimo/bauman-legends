<template>
    <div class="content info-bg">
      <div class="layout">
        <h3 class="layout__title">{{stage==='end'? 'Конец' : 'Важное объявление!'}}</h3>
        <p v-if="stage==='register' || stage==='main'" style="line-height: 30px; text-align: center;">
          Основной этап Легенд переносится на <br> 17 октября, а пока  в  
          <a target="_blank" href="https://vk.com/bmstu_legends_2022">группе ВК</a> 
          можно выполнять задания от наших партнёров
        </p>
        <p v-else-if="stage==='final'" style="line-height: 30px; text-align: center;">
          Мы пока не сделали финал, подождите чутка, мы стараемся (по крайней мере некоторые)
        </p>
        <p v-else-if="stage==='end'" style="line-height: 30px; text-align: center;">
          Вот и закончились Легенды Бауманки 2022. Ждем тебя в следующем году в организаторском составе!
        </p>
      </div>
    </div>
  </template>
  
  <script>
import store from '@/store'


  export default {
    name: 'Banner',
    store,
    computed: {
      stage ()  {
        return this.$store.state.stage
      },
    },
  }
  </script>
  
  <style scoped>
  </style>
   