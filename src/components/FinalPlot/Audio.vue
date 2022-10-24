<template>
  <div>
    <audio controls autoplay>
      <source :src="src" type="audio/mpeg">
      Тут должен быть звук, если его нет, то у тебя стремный браузер
    </audio>
    <el-button type="primary" class="layout__item" @click="$emit('next')">
      Далее
    </el-button>
  </div>
</template>

<script>
export default {
  name:  "Audio",
  props: {
    src: String,
  }
};
</script>

<style scoped>
</style>
