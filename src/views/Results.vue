<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">Результаты</h3>
      <table>
        <tr  v-for="(title, i) in titles" :key="i">
          <td>{{title}}</td>
          <td :class="state(history[i])">{{stateCaption(history[i])}}</td>
        </tr>
      </table>
      <!-- <video-player  
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
      >
      </video-player> -->
    </div>
  </div>
</template>

<script>
import {getResults} from '@/api/team'
//import { videoPlayer } from 'vue-video-player'

export default {
  name: 'Results',
	components: {
   // videoPlayer
  },
	data() {
    return {
      history: [],
      titles: [
        "Интеллект",
        "Выносливость",
        "Сила",
        "Ловкость",
        "Здоровье",
        "Не с Энерго",
      ],
      playerOptions: {
          // videojs options
          muted: false,
          language: 'ru',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          height: 200,
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
        }
    }
  },
  async mounted() {
    const {data} = await getResults()
    this.history = data.filter(({puzzle_type})=> puzzle_type === 'logic')
  },
  methods: {
    state(item) {
      if (!item?.end_date) return 'progress'
      if (item.skip) return 'fail'
      return 'success'
    },
    stateCaption(item) {
      const dict = {
        progress: '',
        success: 'годен',
        fail: 'не годен'
      }
      return dict[this.state(item)]
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
    padding: 10px 15px;
    min-width: 80px;
  }

  .video-player-box /deep/ .video-js {
    width: 100%;
  }
</style>
 