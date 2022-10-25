<template>
  <div class="content game-bg" :class="bgClass">
    <div class="layout">
      <div>
        <div class="refresh-button">
          <div class="refresh-button">
            <font-awesome-icon class="icon" :class="{spinning: isRefreshing}" :icon="['fas', 'sync-alt']"
              @click="refreshTask" />
          </div>
        </div>
        <h3 class="layout__title">{{task === null?'Испытание':'Текущее задание'}}</h3>

        <p v-if="isComplete">
          Все загадки выполнены! Молодцы! Новые загадки будут ждать вас финальном этапе
          <el-button v-if="plotMessage" type="primary" class="layout__item" style="margin-left: 0;"
            @click="plotDialogVisible = true">
            Посмотреть новое сообщение
          </el-button>
        </p>
        <p v-else-if="!enoughPlayers">
          Упс, чтобы взять задание, в команде должно быть 4-8 участников.
          Найти товарищей по команде можно в <a href="https://vk.com/topic-198373277_49117988">обсуждении в группе</a>
        </p>
        <div v-else-if="task === null">
          <el-button v-if="isCaptain" type="primary" class="layout__item" @click="next">
            Взять следующее задание
          </el-button>
          <p v-else>Попроси капитана, чтоб он взял задание</p>
          <el-button v-if="plotMessage" type="primary" class="layout__item" style="margin-left: 0;"
            @click="plotDialogVisible = true">
            Посмотреть новое сообщение
          </el-button>
        </div>
        <div v-else>
          <el-alert v-if="task.puzzle_type === 'photo'" type="info" show-icon>
            Фото отправлять <a target="_blank" href="https://vk.com/im?sel=-198373277">в сообщения группы ВК. </a>
            Ответом на данное задание является код, который пришлет искусственный интеллект
          </el-alert>
          <img class="layout__item" v-if="task.filename" :src="photo" />
          <p v-html="formattedText" />

          <template  v-if="isFinal">
            <p>Осталось времени: {{prettifyTime(timeRemaining)}}</p>
            <br>
            <h3>Подсказки</h3>
            <div style="display: flex">
              <p>Энергия:</p> 
              <div class="e-container">
                <div :style="{width: `${energy}%`}" class="e-bar"/>
                <p class="e-count">{{team.extra_points}}</p>
              </div>
            </div>
            
            <table>
              <tr v-for="(name, i) in hintNames" :key="i">
                <td>{{name}}</td>
                <td> {{(i+1) * 100}} ед. энергии </td>
                <td> 
                  <el-button
                    v-if="!getHint(i)"  
                    style="width: 100px"  
                    type="primary" 
                    size="mini" 
                    :disabled="team.extra_points < (i+1) * 100"
                    @click="buyHint(i + 1)"
                  >
                    Взять
                  </el-button>
                  <el-button  v-else style="width: 100px"  type="primary" size="mini" @click="chooseHint(i)">
                    Посмотреть
                  </el-button>
                </td>
              </tr>
            </table>
          </template>

          <el-input v-if="isCaptain" class="layout__item" placeholder="Oтвет" v-model="answer" />
          <div class="layout__actions">
            <el-button v-if="isCaptain" type="primary" class="layout__item" @click="answerToTask">
              Ответить
            </el-button>
            <el-button v-if="isCaptain && isLogic" class="layout__item button" type="primary" @click="skip">
              Пропустить задание
            </el-button>
          </div>
        </div>
        <p v-for="(message, i) in errorMessages" :key="i" class="error-message">{{ message }}</p>
      </div>
      <el-dialog title="Новое сообщение!" :visible.sync="plotDialogVisible" center width="300px">
        <p v-html="plotMessage" class="dialog-body" />
        <span slot="footer">
          <el-button style="width: 100px" class="button" type="primary" @click="plotDialogVisible = false">ОК
          </el-button>
        </span>
      </el-dialog>
      <el-dialog title="Подсказка" :visible.sync="hintDialogVisible" center width="300px">
        <img class="layout__item" :src="chosenHint.pic"/>
        <p v-html="chosenHint.text" class="dialog-body" />
        <span slot="footer">
          <el-button style="width: 100px" class="button" type="primary" @click="hintDialogVisible = false">ОК
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getTask, getFinalTask, nextTask, nextFinalTask, skipTask, answerFinal, answer, buyHint } from '@/api/game'
import { getTeam } from '@/api/team'
import { BASEURL } from '@/api/config'
import plotMessages from '@/assets/plotMessages'

const getMinutes = (time) => {
  const minutes = Math.floor(time / 60000)
  return minutes >= 10 ? minutes : '0' + minutes
}
const getSeconds = (time) => {
  const seconds = Math.floor((time % 60000)/1000)
  return seconds >= 10 ? seconds : '0' + seconds
}

export default {
  name: "Game",
  data() {
    return {
      task: null,
      team: null,
      hints: [],
      errorMessages: [],
      answer: "",
      timeOnPageLoad: 0,
      timeRemaining: 0,
      timer: null,
      money: 0,
      points: 0,
      hintDialogVisible: false,
      isRefreshing: false,
      plotDialogVisible: false,
      plotMessage: "",
      isComplete: false,
      done: false,
      chosenHint: {
        pic: '',
        text:''
      },
      hintNames: ['Простая', 'Средняя','Сильная']
    };
  },
  async created() {
    await this.refreshTask();
    const { data } = await getTeam();
    this.team = data;
    const vue = this;
    window.addEventListener("focus", async () => {
      await vue.refreshTask();
    });
  },
  store,
  computed: {
    energy() {
      return this.team.extra_points / 14
    },
    formattedText() {
      return this.task?.text?.replaceAll("\n", "<br>");
    },
    isCaptain() {
      return this.$store.state.user?.captain;
    },
    isFinal() {
      return this.$store.state.stage === "final";
    },
    deadlineTime() {
      return Number(new Date(this.task?.start_date)) + this.task?.timer;
    },
    timeRemainedOnPageLoading() {
      return this.deadlineTime - this.timeOnPageLoad;
    },
    enoughPlayers() {
      return this.team?.amount_of_members >= 4;
    },
    bgClass() {
      switch (this.task?.id % 3) {
        case 0: return "game-bg-1";
        case 1: return "game-bg-2";
        case 2: return "game-bg-3";
        default: return "game-bg-1";
      }
    },
    isHintAffordable() {
      return this.chosenHint?.cost <= this.money;
    },
    photo() {
      return BASEURL + "/file/" + this.task.filename;
    },
    isLogic() {
      return this.task?.puzzle_type === "logic";
    }
  },
  watch: {
    async timeRemaining(val) {
      if (val <= -1) {
        clearInterval(this.timer);
        const { data } = await getFinalTask();
        this.task = data;
      }
    }
  },
  methods: {
    handleError(e) {
      const detail = e.response?.data?.detail;
      if (detail?.length && typeof detail !== "string") {
        this.errorMessages = detail.map(({ msg }) => msg);
        return;
      }
      this.errorMessages = [e.response.data.detail || "Произошла ошибка"];
    },
    async next() {
      try {
        if (this.isFinal) {
          await nextFinalTask();
        }
        else {
          await nextTask();
        }
        await this.refreshTask();
        this.timeOnPageLoad = Number(new Date())
        this.timeRemaining = this.timeRemainedOnPageLoading
        const vue = this
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          vue.timeRemaining-=1000
        }, 1000)
      }
      catch (e) {
        this.handleError();
      }
    },
    async skip() {
      try {
        const { data } = await skipTask();
        this.plotMessage = plotMessages[data];
        this.plotDialogVisible = !!this.plotMessage;
        this.refreshTask();
      }
      catch (e) {
        this.handleError(e);
      }
    },
    async answerToTask() {
      try {
        if (this.isFinal) {
          const { data } = await answerFinal({ answer: this.answer });
          console.log(data);
        }
        else {
          const { data } = await answer({ answer: this.answer });
          this.plotMessage = plotMessages[data];
          this.plotDialogVisible = !!this.plotMessage;
        }
        await this.refreshTask();

      }
      catch (e) {
        await this.refreshTask();
        this.handleError(e);
      }
      finally {
        this.answer = "";
      }
    },
    async refreshTask() {
      this.errorMessages = [];
      this.isRefreshing = true;
      clearInterval(this.timer);
      try {
        let data, status;
        if (this.isFinal) {
          const resp = await getFinalTask();
          data = resp.data;
          status = resp.status;
        }
        else {
          const resp = await getTask();
          data = resp.data;
          status = resp.status;
        }
        this.isComplete = status === 202;
        if (data.id) {
          this.task = data;
        }
        else {
          this.task = null;
          this.plotMessage = this.isComplete ? plotMessages[14] : plotMessages[data?.detail];
        }
        this.timeOnPageLoad = Number(new Date());
        this.timeRemaining = this.timeRemainedOnPageLoading
        const vue = this
        this.timer = setInterval(() => {
          vue.timeRemaining-=1000
        }, 1000)
      }
      catch (e) {
        console.error(e);
        this.task = null;
      }
      finally {
        const vue = this;
        setTimeout(() => { vue.isRefreshing = false; }, 1000);
      }
    },
    prettifyTime(time) {
      if (time <= 0)
        return "00:00";
      return `${getMinutes(time)}:${getSeconds(time)}`;
    },
    async buyHint(index) {
      try {
        await buyHint(index);
        const { data } = await getTeam();
        this.team = data;
        await this.refreshTask();
      }
      catch (e) {
        this.handleError(e);
      }
      finally {
        this.closeDialog();
      }
    },
    getHint(index) {
      const text = this.task?.hint?.[index]
      const filename = this.task?.hint_files?.[index]
      const pic = filename && BASEURL + '/file/' + filename
      if (pic || text) return {pic, text}
      return null
    },
    chooseHint(index) {
      this.chosenHint = this.getHint(index)
      this.hintDialogVisible = true
    },
    closeDialog() {
      this.chosenHint = {
        hint_id: "",
        cost: ""
      };
      this.hintDialogVisible = false;
    },
  },
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
  background-image: url('../assets/game-bg-2.jpg');
}

.game-bg-3 {
  background-image: url('../assets/game-bg-3.jpg');
}

.collapse-title {
  margin-left: 1rem;
}

.collapse {
  margin-top: 1rem;
}

.task-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  border-top: 1px solid #b1b1b1;
  word-break: break-word;
}

.refresh-button {
  position: relative;
  right: 0px;
  font-size: 30px;
  text-align: right;
  color: #080D38;
}

.spinning {
  animation-name: rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

table {
  width: 100%;
}

.e-container {
    width: 200px;
    height: 20px;
    background-color: #694710;
    border-radius: 2px;
    margin-top: 15px;
    margin-left: 10px;
  }
  .e-bar {
    background:#ffac05;
    height: 100%;
    transition: all .5s;
    color: white;
    border-radius: 2px;
    text-align: center;
  }
  .e-count {
    margin: -20px 0;
    text-align: center;
    color: white;
  }
</style>
 