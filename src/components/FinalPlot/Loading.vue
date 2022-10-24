<template>
  <div>
    <h3 style="text-align: center" v-html="text"></h3>
    <div class="pb-container">
      <div :style="{width: `${progress}%`}" class="pb-progress">
        
      </div>
      <p class="percents">{{percents}}%</p>
    </div>
  </div>
</template>

<script>
export default {
  name:  "Loading",
  props: {
    text: String,
    max: Number
  },
  data() {
    return {
      time:0,
      completeTime: 0,
    }
  },
  mounted() {
    setInterval(() => {
      this.time+=10
    }, 50)
  },
  watch: {
    calc (val, oldVal) {
      if( oldVal<= this.max && val > this.max) 
      {
        const vue = this
        setTimeout(()=>{vue.$emit('next')}, 2000)
      }
    }
  },
  computed: {
    calc() {
      return Math.sqrt( this.time * 7)
    },
    progress() {
      return this.calc > this.max ? this.max : this.calc
    },
    percents()  {
      return Math.round(this.progress)
    },
  }
};
</script>

<style scoped>
  .pb-container {
    width: 100%;
    height: 40px;
    background-color: #000000;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .pb-progress {
    background:#5abfd5;
    height: 100%;
    transition: all .5s;
    color: white;
    text-align: center;
  }
  .percents {
    margin: -30px 0;
    font-size: 20px;
    text-align: center;
    color: white;
  }
 
</style>
