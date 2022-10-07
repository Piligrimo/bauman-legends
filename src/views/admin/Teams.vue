<template>
    <div class="content info-bg">
      <div class="layout admin">
        <h3 class="layout__title">Команды</h3>
        <div v-for="team in teams" :key="team.id">
          <h4> Команда № {{team.id}} "{{team.name}}" </h4>
          <template v-if="code(team)">
            <span class="hint">Посмотреть код:</span>
            <span 
              class="hint spoiler" 
              :class="{spoiler_shown: shownCodeTeam === team.id}" 
              @click="handleSpoilerClick(team.id)">{{code(team)}}
            </span>
            <i class="el-icon-copy-document" @click="copyCode(team)"> </i> 
          </template>
         
          <div v-if="team.history.length" class="puzzles">
            <div
              v-for="(puzzle, i) in team.history" 
              :key="puzzle.id"
              class="puzzle-container" 
            >
              <div>
                <p class="puzzle-name hint">{{puzzle.title}}</p>
                <p class="puzzle-name hint">{{typeHumanize(puzzle.puzzle_type)}}</p>
                <div 
                  class="puzzle" 
                  :class="{skip: puzzle.skip}"
                >
                  {{time(puzzle)}}
                </div>
              </div>
              <i v-if="i !== team.history.length - 1" class="el-icon-arrow-right" style="font-size: 30px"> </i> 
            </div>
          </div>
          <p v-else> Команда не решила ни одной загадки.</p>
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
        teams: [],
        shownCodeTeam: ''
      }
    },
    async mounted() {
      const {data} = await getTeams()
      this.teams = data
    },
    computed: {
      
    },
    methods: {
      handleSpoilerClick(id) {
        if (id === this.shownCodeTeam) {
          this.shownCodeTeam = ''
          return
        }
        this.shownCodeTeam = id
      },
      code(team) {
        const last = team.history[team.history.length - 1]

        if (!last) return null
        const isPhoto = last.puzzle_type === 'photo'
        const isInProgress = !last.end_date
        if (isPhoto && isInProgress) return last.photo_code
        return null
      },
      copyCode(team) {
        navigator.clipboard.writeText(this.code(team));
      },
      format (dur) {
        if (dur.days())
          return dur.format('DD:HH:mm:ss')
        return dur.format('HH:mm:ss')
      },
      time(puzzle) {
        if(!puzzle.end_date) return "В процессе"
        const end = dayjs(puzzle.end_date)
        const start = dayjs(puzzle.start_date)
        const dur = dayjs.duration(end.diff(start))
        return this.format(dur)
      },
      typeHumanize(type) {
        if (type === 'photo') return '(фотоквест)' 
        if (type === 'logic') return '(логика)'
        return '' 
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
      margin-top: 10px;

    }
    .skip {
      background-color: cornflowerblue;
    }

    .puzzle-container {
      display: inline-flex; 
      align-items: flex-end;
      margin-bottom: 1rem;
      width: 130px;
    }
  

    .el-icon-arrow-right {
      margin-bottom: 36px;
    }
    .el-icon-copy-document {
      cursor: pointer;
    }

    .puzzle-name {
      text-overflow: ellipsis;
      margin: 0 5px;
    }

    .spoiler {
      background-color: #5f5f5f;
      border-radius: 3px;
      margin: 0 10px;
      line-height: 1.2;
      cursor: pointer;
    }
    .spoiler_shown {
      background: none;
    }

    .puzzles {
      margin-top: 1rem;
    }
  </style>
   