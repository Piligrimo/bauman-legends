<template>
  <div class="layout">
    <div v-if="team===null">
      <h3 class="layout__title">У вас пока нет команды</h3>
      <el-radio v-model="toJoinTeam" size="medium" :label="true">Присоединиться к команде</el-radio>
      <el-radio v-model="toJoinTeam" size="medium" :label="false">Создать команду</el-radio>
      <div v-if="toJoinTeam">
        <el-input class="layout__item" placeholder="ID команды" v-model="teamIdInput"/>
        <el-input class="layout__item" placeholder="Секретный код" v-model="inviteCode"/>
        <el-button class="layout__item"  @click="joinTeam">Присоединиться</el-button>
      </div>
      <div v-else>
        <el-input class="layout__item" placeholder="Название команды" v-model="teamNameInput"/>
        <el-button class="layout__item"  @click="createTeam">Создать</el-button>
      </div>
    </div>
    <div v-else-if="team">
      <h2 class="layout__title">"{{team.team_name}}"</h2>
      <h2 class="layout__title">Команда № {{team.team_id}}</h2>
      <h3>Капитан: </h3><p>{{captain.first_name}} {{captain.last_name}}</p>
      <h3>Участники:</h3>
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
      <p><span class="team__stat">Баллы: </span>{{team.score}}</p>
      <p><span class="team__stat">Эсктра-баллы: </span>{{team.money}}</p>
      <template v-if="isCaptain">
        <p>
          <span class="team__stat">Пригласительный код: </span>
          <span class="team__code">{{team.invite_code}}</span></p>
        <p class="hint">сообщи этот код членам своей команды, чтоб они могли присоединиться</p>
      </template>
      <el-button
        v-if="!isCaptain"
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
</template>

<script>
import {getTeam, getTeamMembers, joinTeam, createTeam, setLeader, kickMember, leave} from '@/api/team'
import store from '@/store'

export default {
  name: 'Team',
  data () {
    return {
      team: undefined,
      toJoinTeam: true,
      teamIdInput: '',
      teamNameInput: '',
      inviteCode: '',
      captain: '',
      members: [],
      chosenUser: {
        first_name: '',
        last_name: '',
        user_id: ''
      },
      leaderDialogVisible: false,
      kickDialogVisible: false,
      leaveDialogVisible: false,
      errorMessage: ''
    }
  },
  async created () {
    if (!this.$store.state.isAuth)
      this.$router.push('/login')
    await this.getTeam()
  },
  store,
  computed:{
    isAuth () {
      return this.$store.state.isAuth
    },
    isCaptain () {
      return this.$store.state.user?.user_id === this.team?.leader_id
    }
  },
  watch: {
    isAuth (val) {
      if (!val)
      this.$router.push('/login')
    } 
  },
  methods: {
    async getTeam () {
      this.errorMessage= ''
      try {
        const {data} = await getTeam()
        this.setTeam(data)
      } catch (e) {
        if (e.response.status === 404)
         {this.team = null}
         else{
           console.error(e)
           this.errorMessage=e.response.data.message
         }
      }
    },
    async joinTeam () {
      try {
       const {data} = await joinTeam({team_id: this.teamIdInput, invite_code: this.inviteCode})
        this.setTeam(data)
      } catch (e) {
        this.errorMessage=e.response.data.message
      }
    },
    async createTeam () {
      console.log('create invalid')
      try {
        const {data} = await createTeam({team_name: this.teamNameInput})
        this.setTeam(data)
      } catch (e) {
        this.errorMessage=e.response.data.message
      }
    },
    async setTeam (team) {
      const {data} = await getTeamMembers()
      this.team = team
      this.captain = data.find(member => member?.user_id === team?.leader_id)
      this.members = data.filter(member => member?.user_id !== team?.leader_id)
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
    closeDialog() {
      this.chosenUser = {
        first_name: '',
        last_name: '',
        user_id: ''
      }
      this.kickDialogVisible = false
      this.leaderDialogVisible = false
      this.leaveDialogVisible = false
    },
    async setLeader() {
      const {data} = await setLeader(this.chosenUser.user_id)
      this.setTeam(data)
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
  .hint {
    margin-top: -1rem;
    font-size: 0.8rem;
    line-height: 0.9rem;
    color: #5f5f5f
  }
  .button {
    width: 110px;
    margin-top: 0.5rem;
  }
</style>
 