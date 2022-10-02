<template>
  <div class="content info-bg">
    <div class="layout admin">  
      <h3 class="layout__title">Загадки</h3>
      <router-link to="/puzzle/create">
        <el-button  class="layout__action" type="primary">Создать новую</el-button>
      </router-link>
      <router-link 
        v-for="{id, puzzle_type,title} in puzzles" 
        :key="id+puzzle_type" 
        :to="{name: 'PuzzleEdit', params: {id, type:puzzle_type}}"
      >
        <h2 class="item">
          {{title}}
        </h2>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getPuzzles } from '../../../api/admin';

export default {
  name: 'Puzzles',
  data () {
    return {
      puzzles: []
    }
  }, 
  async mounted () {
    const {data} = await getPuzzles()
    this.puzzles = data
  }
}
</script>

<style scoped>
  .item {
    cursor: pointer;
    color: #375eb3;
  }

  .item:hover {
    color: #4572d4;
  }
</style>
 