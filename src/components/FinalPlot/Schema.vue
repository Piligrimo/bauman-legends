<template>
  <div>
    <div class="brain-container">
      <img class="schema" src="sch1.png"/>
      <img v-if="variant === 1" class="schema blink" src="sch2.png"/>
      <template v-else>
        <img class="schema blink" src="sch3.png"/>
        <img class="schema blink" src="sch4.png"/>
        <img class="schema blink" src="sch5.png"/>
      </template>
    </div>
    <el-button type="primary" class="layout__item" @click="$emit('next')">
      Далее
    </el-button>
  </div>
</template>

<script>
export default {
  name:  "Schema",
  props: {
    variant: Number,
  },
};
</script>

<style scoped>
   .schema {
    position: absolute;
    width: 310px;
  }

  .schema:last-child {
    position: relative;
  }

  .blink {
    animation-name: blinks;
    animation-duration: 1s;
    animation-iteration-count: infinite;
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
