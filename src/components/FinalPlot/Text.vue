<template>
  <div>
    <p :class="character" v-html="text"></p>
    <el-button type="primary" class="layout__item" @click="$emit('next')">
      Далее
    </el-button>
  </div>
</template>

<script>
export default {
  name:  "Text",
  props: {
    text: Number,
    character: {
      validator(value) {
        return ['stanley', 'stanford', 'stn-2', 'message'].includes(value)
      }
    },
  }
};
</script>

<style scoped>
  .stanley {
    color: #9c3535;
  }

  .stanford {
    color: #69ae56;
  }

  .stn-2 {
    color: rgb(57, 124, 187);
  }
 
</style>
