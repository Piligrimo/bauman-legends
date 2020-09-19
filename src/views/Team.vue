<template>
  <div class="layout">
    <div v-if="team===null">
      <h3 class="layout__title">У вас пока нет команды</h3>
      <el-radio v-model="toJoinTeam" :label="true">Присоединиться к команде</el-radio>
      <el-radio v-model="toJoinTeam" :label="false">Создать команду</el-radio>
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
      <h3 class="layout__title">"{{team.team_name}}"</h3>
      <h3 class="layout__title">Команда № {{team.team_id}}</h3>
      <h3>Капитан: </h3><p>{{captain.first_name}} {{captain.last_name}}</p>
      <h3>Участники:</h3>
      <p v-for="(member, i) in members" :key="i"> {{i+1}}. {{member.first_name}} {{member.last_name}}</p>
      <h3>Баллы:</h3>
      <p>{{team.score}}</p>
    </div>
  </div>
</template>

<script>
import {getTeam, getTeamMembers, joinTeam, createTeam} from '@/api/team'
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
      members: []
    }
  },
  async created () {
    if (!this.$store.state.isAuth)
      this.$router.push('/login')
    try {
      const {data} = await this.getTeam()
      this.setTeam(data)
    } catch (e) {
      console.log(e.response)
      if (e.response.status === 404)
        this.team = null
    }
  },
  store,
  computed:{
    isAuth () {
      return this.$store.state.isAuth
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
      return await getTeam()
    },
    async joinTeam () {
      const {data} = await joinTeam({team_id: this.teamIdInput, invite_code: this.inviteCode})
      this.setTeam(data)
      
    },
    async createTeam () {
      const {data} = await createTeam({team_name: this.teamNameInput})
      this.setTeam(data)
    },
    async setTeam (team) {
      const {data} = await getTeamMembers()
      this.team = team
      this.captain = data.find(member => member?.user_id === team?.leader_id)
      this.members = data.filter(member => member?.user_id !== team?.leader_id)
      console.log(data)
    }
  }
}
</script>

<style scoped>
  .login {
    margin: auto;
    padding: 3rem;
    max-width: 350px;
    background-color: #eeca95c4;
  }
  @media screen and (max-width: 480px) { 
      .login {
        margin: 0 auto;
      }
  }
  .login__item {
    margin-top: 0.5rem;
    width: 100%;
  }

  .login__title {
    text-align: center;
    color: white;
  }

  .login__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  @media screen and (max-width: 480px) { 
    .login__actions {
      flex-direction: column;
    }
    .login__action {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
  
</style>
 