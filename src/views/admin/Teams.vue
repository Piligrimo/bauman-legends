<template>
    <div class="content info-bg">
      <div class="layout admin">
        <h3 class="layout__title">Команды</h3>
        <div v-for="team in teams" :key="team.id">
          <h4> Команда № {{team.id}} "{{team.name}}" </h4>
          <div v-if="team.history.length" class="puzzles">
            <div
              v-for="(puzzle, i) in team.history" 
              :key="puzzle.id"
              class="puzzle-container" 
            >
              <div 
                class="puzzle" 
                :class="{skip: puzzle.skip}"
              >
                {{time(puzzle)}}
              </div>
              <i v-if="i !== team.history.length - 1" class="el-icon-arrow-right" style="font-size: 30px"> </i> 
            </div>
          </div>
          <p v-else> Команда не решила ни одной загадки. Лохи))00 </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { getTeams } from '../../api/admin';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

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
    },
    methods: {
      format (dur) {
        if (dur.days())
          return '> 24 часов'
        return dur.format('HH:mm:ss')
      },
      time(puzzle) {
        if(!puzzle.end_date) return "В процессе"
        const end = dayjs(puzzle.end_date)
        const start = dayjs(puzzle.start_date)
        const dur = dayjs.duration(end.diff(start))
        return this.format(dur)
      }
    }
  }
  </script>
  
  <style scoped>
    .puzzle {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      background-color: rgb(156, 216, 96);
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 10px;
    }
    .skip {
      background-color: cornflowerblue;
    }

    .puzzle-container {
      display: inline-flex; 
      align-items: center;
      margin-bottom: 1rem;
    }
  
    .puzzles {
    }
  </style>
   