<template>
  <div class="content info-bg">
    <div class="layout">
      <p>Номер загадки</p>
      <el-input-number
        :min="1"
        :max="10"
        class="layout__item number-input" 
        v-model="puzzle"
      />
      <br>
      <br>
      <el-checkbox size="medium" v-model="isComplete">Выполнена</el-checkbox>
      <br>
      <br>
      <el-button class="layout__action" type="primary" @click="show=true">Начать</el-button>
      <FinalPlot v-if="show" :puzzle="puzzle - 1" :isComplete="isComplete" @ended="show=false"/>
    </div>
  </div>
</template>

<script>
import FinalPlot from '../components/FinalPlot/index.vue';
export default {
    name: "Sandbox",
    data() {
        return {
            puzzle: 1,
            isComplete: false,
            show: false
        };
    },
    components: { FinalPlot }
};
</script>

<style scoped>

 
</style>
