<template>
  <div class="content info-bg">
    <div class="layout admin">  
      <h3 class="layout__title">Загадки</h3>
      <router-link to="/puzzle/create">
        <el-button  class="layout__action" type="primary">Создать новую</el-button>
      </router-link>
      <div class="sections">
        <div  class="section" v-if="logicPuzzles.length">
        <h3>Логические</h3>
        <router-link 
          v-for="{id, puzzle_type,title} in logicPuzzles" 
          :key="id" 
          :to="{name: 'PuzzleEdit', params: {id, type:puzzle_type}}"
        >
          <h3 class="item">
            {{title}}
          </h3>
        </router-link>
        </div>
        <div class="section" v-if="photoPuzzles.length">
          <h3>Фотоквест</h3>
          <router-link 
            v-for="{id, puzzle_type,title} in photoPuzzles" 
            :key="id" 
            :to="{name: 'PuzzleEdit', params: {id, type:puzzle_type}}"
          >
            <h3 class="item">
              {{title}}
            </h3>
          </router-link>
        </div>
        <div class="section" v-if="finalPuzzles.length">
          <h3>Финал</h3>
          <router-link 
            v-for="{id, puzzle_type,title} in finalPuzzles" 
            :key="id" 
            :to="{name: 'PuzzleEdit', params: {id, type:puzzle_type}}"
          >
            <h3 class="item">
              {{title}}
            </h3>
          </router-link>
        </div>
      </div>
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
  }, 
  computed: {
    logicPuzzles () {
      return this.puzzles.filter(({puzzle_type}) => puzzle_type === 'logic')
    },
    photoPuzzles () {
      return this.puzzles.filter(({puzzle_type}) => puzzle_type === 'photo')
    },
    finalPuzzles () {
      return this.puzzles.filter(({puzzle_type}) => puzzle_type === 'final')
    }
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

  .sections {
    display:  flex;
    
  }

  @media screen and (max-width: 800px) { 
    .sections {
      display: block;
    }
  }
  .section {
    width: 300px;
    margin: 20px;
  }

</style>
 