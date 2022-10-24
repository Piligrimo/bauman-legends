<template>
  <div>
    <div class="loading" v-loading="true"></div>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name:  "Process",
  props: {
    text: String
  },
  mounted() {
    const vue = this
    setTimeout(()=>{vue.$emit('next')}, 3000)
  }
};
</script>

<style scoped>
  .loading {
    height: 100px;
    width: 100px;
    margin: auto;
  }
 
  p {
    font-size: 18px;
    text-align: center;
  }
</style>
