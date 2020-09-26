<template>
  <div class="layout">
    <div>
      <h3 class="layout__title">Игра</h3>
      <p>Тут будет отображаться ваше текущее задание, когда начнется игра</p>
    </div>
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
 