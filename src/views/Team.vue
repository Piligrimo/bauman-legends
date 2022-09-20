<template>
  <div class="content info-bg">
    <div class="layout">
      <div v-if="team===null">
        <h3 class="layout__title">У вас пока нет команды</h3>
        <el-radio v-model="toJoinTeam" size="medium" :label="true">Присоединиться к команде</el-radio>
        <el-radio v-model="toJoinTeam" size="medium" :label="false">Создать команду</el-radio>
        <div v-if="toJoinTeam">
          <el-input class="layout__item" placeholder="Пригласительный код" v-model="inviteCode"/>
          <el-button class="layout__item" type="primary" @click="joinTeam" :disabled="!inviteCode">Вступить</el-button>
        </div>
        <div v-else>
          <el-input class="layout__item" placeholder="Название команды" v-model="teamNameInput"/>
          <el-button class="layout__item"  @click="createTeam">Создать</el-button>
        </div>
      </div>
      <div v-else-if="team">
        <h2 class="layout__title">"{{team.name}}"</h2>
        <h2 class="layout__title">Команда № {{team.id}}</h2>
        <h3>Капитан: </h3><p>{{captain.first_name}} {{captain.last_name}}</p>
        <h3 v-if="members.length">Участники:</h3>
        <div class="team__member" v-for="(member, i) in members" :key="i">
          <p> {{i+1}}. {{member.first_name}} {{member.last_name}}
            <span v-if="member.user_id===$store.state.user.user_id">(ты)</span>
          </p>
          <div v-if="isCaptain">
            <font-awesome-icon
              class="icon set-leader"
              :icon="['fas', 'crown']"
              @click="openLeaderDialog(member)"
            />
            <font-awesome-icon
              class="icon kick-member"
              :icon="['fas', 'user-minus']"
              @click="openKickDialog(member)"
            />
          </div> 
        </div>
        <p><span class="team__stat">Баллы: </span>{{team.points}}</p>
        <template v-if="isCaptain">
          <p>
            <span class="team__stat">Пригласительный код: </span>
            <span class="team__code">{{team.invitation_code}}</span></p>
          <p class="hint">сообщи этот код членам своей команды, чтоб они могли присоединиться</p>
        </template>
        <el-button
          v-if="!isCaptain || !members.length"
          type="danger"
          @click="openLeaveDialog"
        >
          Покинуть команду
        </el-button>
      </div>
      <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
      <el-dialog
        title="Назначить капитана"
        :visible.sync="leaderDialogVisible"
        :before-close="closeDialog"
        width="300px"
      >
        <p class="dialog-body">
          {{chosenUser.first_name}} {{chosenUser.last_name}} станет капитаном вместо тебя. Продолжить?
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button class="button" type="primary" @click="setLeader">Назначить</el-button>
          <el-button class="button" @click="closeDialog">Отменить</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Удалить члена команды"
        :visible.sync="kickDialogVisible"
        :before-close="closeDialog"
        width="300px"
      >
        <p class="dialog-body">
          {{chosenUser.first_name}} {{chosenUser.last_name}} покинет команду. Продолжить?
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button class="button" type="primary" @click="kickMember">Удалить</el-button>
          <el-button class="button" @click="closeDialog">Отменить</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Покинуть команду"
        :visible.sync="leaveDialogVisible"
        :before-close="closeDialog"
        width="300px"
      >
        <p class="dialog-body">
          Ты действительно собираешься покинуть команду?
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button class="button" type="primary" @click="leave">Покинуть</el-button>
          <el-button class="button" @click="closeDialog">Отменить</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getTeam, getTeamMembers, joinTeam, createTeam, setLeader, kickMember, leave} from '@/api/team'
import store from '@/store'

export default {
  name: 'Team',
  data () {
    return {
      team: undefined,
      teamList: [],
      toJoinTeam: true,
      teamIdInput: '',
      teamNameInput: '',
      inviteCode: '',
      captain: '',
      members: [],
      search: '',
      chosenUser: {
        first_name: '',
        last_name: '',
        user_id: ''
      },
      chosenTeam: {
        team_name: '',
        team_id: ''
      },
      leaderDialogVisible: false,
      kickDialogVisible: false,
      leaveDialogVisible: false,
      joinDialogVisible: false,
      errorMessage: ''
    }
  },
  async created () {
    await this.getTeam()
  },
  store,
  computed:{
    isCaptain () {
      return this.$store.state.user.captain
    },
    filteredTeams () {
      if (!this.search) return this.teamList
      return this.teamList.filter(team => {
        const name = team?.team_name.toUpperCase()
        const search = this.search.toUpperCase()
        const id = String(team?.team_id)
        return name.indexOf(search) >=0 || id.indexOf(search) >=0
      })
    }
  },
  methods: {
    async getTeam () {
      this.errorMessage= ''
      try {
        const {data} = await getTeam()
        await this.setTeam(data)
      } catch (e) {
        if (e.response.status === 400)
        {
          this.team = null
        }
         else{
           console.error(e)
           this.errorMessage=e.response.data.detail
         }
      }
    },
    async joinTeam () {
      try {
       const {data} = await joinTeam({code: this.inviteCode})
        this.setTeam(data)
      } catch (e) {
        this.errorMessage=e.response?.data?.detail || "Произошла ошибка!"
      }
    },
    async createTeam () {
      try {
        await createTeam({name: this.teamNameInput})
        await this.getTeam()
      } catch (e) {
        console.log(e.response)
        this.errorMessage=e.response?.data?.detail || "Произошла ошибка!"
      }
    },
    async setTeam (team) {
      const {data} = await getTeamMembers()
      this.team = team
      this.captain = data.find(member => member.captain)
      this.members = data.filter(member => !member.captain)
    },
    openLeaderDialog(member) {
      this.chosenUser = member
      this.leaderDialogVisible = true
    },
    openKickDialog(member) {
      this.chosenUser = member
      this.kickDialogVisible = true
    },
    openLeaveDialog() {
      this.leaveDialogVisible = true
    },
    openJoinDialog(team) {
      this.chosenTeam = team
      this.joinDialogVisible = true
    },
    closeDialog() {
      this.chosenUser = {
        first_name: '',
        last_name: '',
        user_id: ''
      }
      this.chosenTeam = {
        team_name: '',
        team_id: ''
      }
      this.inviteCode = ''
      this.kickDialogVisible = false
      this.leaderDialogVisible = false
      this.leaveDialogVisible = false
      this.joinDialogVisible = false
    },
    async setLeader() {
      const {data} = await setLeader(this.chosenUser.user_id)
      await this.$store.dispatch('getUser')
      await this.setTeam(data)
      this.closeDialog()
    },
    async kickMember() {
      await kickMember(this.chosenUser.user_id)
      await this.getTeam()
      this.closeDialog()
    },
    async leave() {
      await leave()
      await this.getTeam()
      this.closeDialog()
    },
    pluralize(num) {
      switch (num % 10) {
        case 1: return num + ' участник'
        case 2: return num + ' участника'
        case 3: return num + ' участника'
        case 4: return num + ' участника'
        default: return num + ' участников'
      }
    }
  }
}
</script>

<style scoped>
  .team__member {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -1em;
  }
  .icon {
    margin: 3px;
  }
  .set-leader {
    color: #ffa600;
  }

  .kick-member {
    color: red;
  }
  .team__stat {
    font-weight: bold;
  }
  .team__code {
    font-family: monospace;
    color: #5f5f5f;
    font-weight: bold;
  }

  .button {
    width: 110px;
    margin-top: 0.5rem;
  }
  .team__list {
    max-height: 300px;
    overflow: hidden scroll;
    margin-top: 1rem;
  }
  .team__list-title {
    max-width: 130px;
    margin-top: 0;
  }
  td {
    vertical-align: top;
    word-break: break-word;
    min-width: 35px;
  }
  td:not(:first-child) {
    padding: 0 0.5rem;
  }
  td:last-child {
    text-align: end;
    width: auto;
  }
  table {
    width: 100%;
  }
</style>
 