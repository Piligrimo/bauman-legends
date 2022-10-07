
<template>
  <div class="content info-bg">
    <div class="layout admin">  
      <h3 class="layout__title">Управление пользователями</h3>
      <p class="label">Поиск</p>
      <el-input
        class="layout__item" 
        placeholder="Введи имя, фамилию или логин"
        v-model="search">
      </el-input>
      <br><br>
      <table v-if="filteredUsers.length">
        <thead>
          <td>ФИО</td>
          <td>Логин</td>
          <td>Роль</td>
          <td v-if="isMainAdmin" width="90px">Действия</td>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="name-cell">{{user.first_name}} {{user.last_name}}</td>
            <td><span class="mobile hint">Логин:</span> {{user.login}}</td>
            <td><span class="mobile hint">Роль:</span> {{getRole(user)}}</td>
            <td width="90px" v-if="isMainAdmin">
              <el-button
                style="width: 100%" 
                v-if="!user.admin && !user.main_admin" 
                type="primary" 
                size="mini"
                @click="promote(user.login)"
              >
                Повысить
              </el-button>
              <el-button 
                style="width: 100%" 
                v-else-if="!user.main_admin" 
                type="primary" 
                size="mini"
                @click="demote(user.login)"
              >
                Кикнуть
              </el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else-if="search">По твоему запросу нет пользователей</p>
      <p v-else>Пользователей нет</p>
    </div>
  </div>
</template>

<script>
import { getUsers } from '../../api/user';
import { promote, demote } from '../../api/admin';
import store from '@/store'

const searchBy = (prop, text) => {
  return (prop || '').toUpperCase().includes(text.toUpperCase())
}

export default {
  name: 'Moderators',
  data () {
    return {
      users: [],
      search: ''
    }
  }, 
  async mounted () {
    this.fetchUsers()
  },
  store,
  computed: {
    mainAdmins() {
      return this.users.filter(({main_admin}) => main_admin)
    },
    admins() {
      return this.users.filter(({admin, main_admin}) => admin && !main_admin)
    },
    players() {
      return this.users.filter(({admin, main_admin}) => !admin && !main_admin)
    }, 
    filteredUsers () {
      const {mainAdmins, admins,players} = this
      const joined = [...mainAdmins, ...admins,...players]
      return joined.filter(({first_name, last_name, login}) => {
        return searchBy(`${first_name} ${last_name} ${login}`, this.search) 
      })
    },
    isMainAdmin () {
      return this.$store.state.user?.main_admin
    }
  },
  methods: {
    async fetchUsers() {
      const {data} = await getUsers()
      this.users = data
    },
    getRole(user) {
      if (user.main_admin) return 'гл. админ'
      if (user.admin) return 'админ'
      return 'игрок'
    },
    async promote(login) {
      try {
        await promote(login)
        this.$message({
          message: 'Пользователь повышен до админа',
          type: 'success'
        });
        this.fetchUsers()
      } catch (e) {
        console.error(e);
        this.$message({
          message: 'Ошибка!',
          type: 'error'
        });
      }
    },
    async demote(login) {
      try {
        await demote(login)
        this.$message({
          message: 'Пользователь понижен до игрока',
          type: 'success'
        });
        this.fetchUsers()
      } catch (e) {
        console.error(e);
        this.$message({
          message: 'Ошибка!',
          type: 'error'
        });
      }
    }
  }
}
</script>

<style scoped>
  .mobile {
    display: none;
  }
  thead {
    width: calc( 100% - 22px );/* scrollbar is average 1em/16px width, remove it from thead width */
    font-weight: bolder;
    background-color: #ffd0a1de;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fffdfbde;
  }
  td {
    border: 1px solid;
    padding: 5px 15px;
  }
  tbody {
    display: block;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    border-bottom: 1px solid;
    border-right: 1px solid;
  }

  thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;/* even columns width , fix width of table too*/
  }

  @media screen and (max-width: 800px) { 
    .name-cell {
      font-size: 18px;
      font-weight: bold;
    }
    thead {
      display: none;
    }
    tr {
      display: flex !important;
      flex-direction: column;
      background-color: #fffdfbde;
      border-radius: 10px;
      margin-bottom: 1rem;
      padding: 10px;
      width: 90% !important;
      -webkit-box-shadow: 0px 14px 10px -7px rgba(0,0,0,0.1); 
      box-shadow: 0px 14px 10px -7px rgba(0,0,0,0.1);
    }
    td {
      border: none;
    }
    table {
      background: none;
    }
    tbody {
      border: none;
     
    }
    .mobile {
      display: inline;
    }
}

  
</style>
 