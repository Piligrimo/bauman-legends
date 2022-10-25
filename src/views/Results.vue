<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">{{isFinal ? 'Архив' : 'Результаты'}}</h3>
      <el-tabs v-if="!isFinal" v-model="tab">
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
      <table v-else>
        <tr class="archive" v-for="(item, i) in finalArchive" :key="i" @click="handleAccess({...item, id: i+1})">
          <td>Архивная запись №{{i+1}}</td>
          <td  class="icon"> <img :src="item.type+'.png'"/></td>
        </tr>
      </table>
      <el-dialog
        class="shakin"
        title="Warning!!!"
        :visible.sync="warningVisible"
        width="300px"
      >
        <div style="color: red" class="dialog-body">
          <i class="el-icon-warning"></i> 
          <span> Нет доступа!!!</span>
        </div>
      </el-dialog>
      <el-dialog
        v-if="chosenFile"
        :title="'Архивная запись №' + chosenFile.id"
        :visible.sync="showFile"
        width="350px"
      >
        <div class="dialog-body">
          <component
            :is="fileComponents[chosenFile.type]" 
            :src="chosenFile.src"
            @next="showFile=false"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getResults} from '@/api/team'
import store from '@/store'
import Video from '@/components/FinalPlot/Video.vue'
import Picture from '@/components/FinalPlot/Picture.vue'
import Audio from '@/components/FinalPlot/Audio.vue'

const fileComponents = {
  video: Video,
  sound: Audio,
  doc: Picture,
}

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
      finalArchive: [
        {
          type: 'video',
          src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          condition: {
            task: 1,
            done: true
          }
        },
        {
          type: 'doc',
          src: "report.png",
          condition: {
            task: 2,
            done: true
          }
        },
        {
          type: 'video',
          src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          condition: {
            task: 3,
            done: true
          }
        },
        {
          type: 'doc',
          src: "34.png",
          condition: {
            task: 4,
            done: true
          }
        },
        {
          type: 'sound',
          src: "experiment.wav",
          condition: {
            task: 5,
            done: true
          }
        },
        {
          type: 'doc',
          src: "favicon.png",
          condition: {
            task: 6,
            done: true
          }
        },
        {
          type: 'sound',
          src: "diary.mp3",
          condition: {
            task: 7,
            done: false
          }
        },
        {
          type: 'doc',
          src: "rpeort.png",
          condition: {
            task: 7,
            done: true
          }
        },
        {
          type: 'sound',
          src: "firstflight.mp3",
          condition: {
            task: 8,
            done: true
          }
        },
      ],
      fileComponents,
      chosenFile: null,
      warningVisible: false,
      showFile: false
    }
  },
  async mounted() {
    const {data} = await getResults()
    this.history = data
  },
  store,
  computed: {
    isFinal() {
      return this.$store.state.stage === "final";
    },
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
    },
  },
  methods: {
    pluralize (num) {
      if (num === 1) return `${num} тест`
      if (num >=2 && num <5) return `${num} теста`
      return `${num} тестов` 
    },
    handleAccess(item) {
      const taskCount = this.history.length
      if (taskCount < item.condition.task) {
        this.warn()
        return
      } 
      if (item.condition.done && !this.history[taskCount-1].end_date){
        this.warn()
        return
      } 
      this.chosenFile = item
      this.showFile = true
    },
    warn()  {
      this.warningVisible = true
      const vue = this
        setTimeout(()=>{vue.warningVisible = false}, 1500)
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

  .archive {
    cursor: pointer;
  }

  .archive>td {
    font-size: 16px;
  }
  .archive:hover {
    background-color: #e6e2ddbc;
  }

  .icon {
    width: 70px;
    text-align: center;
  }
  .icon>img {
    height: 50px;
  }
</style>
 