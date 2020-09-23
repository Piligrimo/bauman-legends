<template>
  <div class="layout">
    <div>
      <h3 class="layout__title">Текущее задание</h3>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Team',
  data () {
    return {
    }
  },
  async created () {
  },
  store,
  computed:{
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  watch: {
    isAuth (val) {
      if (!val)
      this.$router.push('/login')
    } 
  },
  methods: {
  }
}
</script>

<style scoped>
 
</style>
 