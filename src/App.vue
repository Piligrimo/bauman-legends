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
 .header {
   min-height: 30px;
   box-shadow: 0px 8px 8px 0px rgba(34, 60, 80, 0.2);
 }
 body {
   padding: 0;
 }
</style>
