<template>
  <div>
    <div class="overlay"></div>
    <img style="width: 100%" src="warning.png" alt="" >
    <p style="color:red; font-size: 18px;" v-html="text">  </p>
    <el-button type="primary" class="layout__item" @click="$emit('next')">
      Далее
    </el-button>
  </div>
</template>

<script>
export default {
  name:  "Danger",
  props: {
    text: String
  }
};
</script>

<style scoped>
  .overlay {
    position: fixed;
    pointer-events: none;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    background: rgb(251,63,63);
    background: radial-gradient(circle, rgba(251,63,63,0.03265056022408963) 0%, rgba(252,70,70,0.8085609243697479) 100%);
    animation-name: blinks;
    animation-duration: 1s;
    animation-iteration-count: 5;
    animation-timing-function: cubic-bezier();
  }

@keyframes blinks {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
 
</style>
