<template>
  <div class="content game-bg game-bg-1">
    <div class="layout">
      <div>
        <h3 class="layout__title">Игра</h3>
        <p>Тут будет отображаться ваше текущее задание, когда начнется игра</p>
      </div>
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
.game-bg {
  background-color: #EFEAE2;
  background-position: bottom left;
}

.game-bg-1 {
  background-image: url('../assets/game-bg-1.jpg');
}

.game-bg-2 {
  background-image: url('../assets/game-bg-1.jpg');
}

.game-bg-3 {
  background-image: url('../assets/game-bg-3.jpg');
}
</style>
 