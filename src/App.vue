<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      collapse: true
    }
  }
}
</script>

<style>
  #app{
    height: 100%; 
    background-image: url('./assets/bg.jpg');
    background-size: cover;

    padding: 3rem;
  }
 .header {
   min-height: 30px;
   box-shadow: 0px 8px 8px 0px rgba(34, 60, 80, 0.2);
 }
 body {
   margin: 0;
   height: 100%; 
 }
 html {
   height: 100%; 
 }
</style>
