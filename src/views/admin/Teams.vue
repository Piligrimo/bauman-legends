<template>
    <div class="content info-bg">
      <div class="layout admin">
        <h3 class="layout__title">Команды</h3>
        <p>Команды типа</p>
      </div>
    </div>
  </template>
  
  <script>
import { getTeams } from '../../api/admin';

  export default {
    name: 'Teams',
    data() {
      return {
        teams: []
      }
    },
    async mounted() {
      const {data} = await getTeams()
      this.teams = data
      console.log(data)
    }
  }
  </script>
  
  <style scoped>
  </style>
   