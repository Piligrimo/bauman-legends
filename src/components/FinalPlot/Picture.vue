<template>
  <div>
    <div class="image-container">
      <img :src="src"/>
    </div>
    <el-button type="primary" class="layout__item" @click="$emit('next')">
      Далее
    </el-button>
  </div>
</template>

<script>
export default {
  name:  "Picture",
  props: {
    src: String,
  }
};
</script>
  
<style scoped>
  .image-container {
    max-height: 300px;
    overflow: hidden scroll;
    word-break: break-word;
  }
  img {
    width: 100%
  }
</style>
