<template>
  <div id="app">
    <div v-if="$store.state.isAuth" class="header">
      <i class="el-icon-more"></i>
      <p @click="logOut">Выйти</p>
    </div>
    <div class="content">
      <router-view/>  
    </div>
  </div>
</template>

<script>
import store from '@/store'
import {logOut, getUser} from '@/api/user'
export default {
  data () {
    return {
    }
  },
  async created () {
    try {
      const {data} = getUser()
      console.log(data) 
      if (data?.user_id) 
        this.$store.commit('setAuth', true)
      else
        this.$store.commit('setAuth', false)
    } catch (e) {
        this.$store.commit('setAuth', false)
    }
  },
  store,
  methods: {
    async logOut () {
      await logOut()
      this.$store.commit('setAuth', false)
    }
  }
}
</script>

<style>
  #app {
    height: 100%; 
  }
  .content{
    height: 100%; 
    background-image: url('./assets/bg.jpg');
    background-size: cover;
    padding: 3rem;
  }
 .header {
   min-height: 60px;
   padding: 0 1rem;
   background-color: #854114;
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: white;
 }
 body {
   margin: 0;
   height: 100%; 
 }
 html {
   height: 100%; 
 }
 
</style>
