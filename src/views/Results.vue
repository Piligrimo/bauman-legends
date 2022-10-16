<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">Результаты</h3>
      <el-tabs v-model="tab">
        <el-tab-pane label="Исследование тела" name="body">
          <table>
            <tr  v-for="item in tableResults" :key="item.title">
              <td>{{item.title}}</td>
              <td :class="{success: item.complete}">{{item.result}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="Исследование мозга" name="brain">
          <div class="brain-container">
            <img class="brain" src="brain-outline.png"/>
            <img v-for="(_,i) in brainResults" :key="i" class="brain" :src="brainParts[i] || brainParts[0]"/>
          </div>
          <h4 class="subtitle"> Проведено {{pluralize(brainResults.length)}} из 7 </h4>
        </el-tab-pane>
      </el-tabs>
      
    </div>
  </div>
</template>

<script>
import {getResults} from '@/api/team'

export default {
  name: 'Results',
	components: {
  },
	data() {
    return {
      tab: 'body',
      history: [],
      titles: [
        "Стрессоустойчивость",
        "Выносливость",
        "Генетика",
        "Ловкость",
        "Иммунитет",
        "Сила",
        "Скорость реакций",
      ],
      brainParts: [
        'brain1.png',
        'brain2.png',
        'brain3.png',
        'brain4.png',
        'brain5.png',
        'brain6.png',
        'brain7.png',
      ],
    }
  },
  async mounted() {
    const {data} = await getResults()
    this.history = data
  },
  computed: {
    tableResults() {
      const photoPuzzles = this.history.filter(({puzzle_type}) => puzzle_type === 'photo')
      return this.titles.map((title, i) => {
        return {
          title,
          result: photoPuzzles[i]?.end_date ? 'Годен' : 'Нет данных',
          complete: !!photoPuzzles[i]?.end_date
        }
      })
    },
    brainResults() {
      return this.history.filter(({puzzle_type, skip}) => puzzle_type === 'logic' && !skip)
    }
  },
  methods: {
    pluralize (num) {
      if (num === 1) return `${num} тест`
      if (num >=2 && num <5) return `${num} теста`
      return `${num} тестов` 
    }
  }
}
</script>

<style scoped>
  .history-item {
    display: flex;
    justify-content: space-between;
  }

  .result {
    border: 1px solid #080D38;
    border-radius: 5px;
    height: 70px;
    width: 70px;
  }
  .success {
    color: green;
  }

  .fail {
    color: red;
  }

  table {
    background-color: #fffdfbbc;
    border-collapse: collapse;
    width: 100%;
    font-size: 17px;
  }

  td {
    border: 1px solid rgb(175, 175, 175);
    padding: 10px;
    min-width: 80px;
    font-size: 14px;
  }

  .video-player-box /deep/ .video-js {
    width: 100%;
  }

  .brain {
    position: absolute;
    width: 100%;
    border-radius: 10px;
  }

  .brain:last-child {
    position: relative;
  }

  .subtitle {
    text-align: center;
    margin-top: 20px;
  }
</style>
 