<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">{{isAdmin ? 'Опубликовать новость' : 'Обновления'}}</h3>
      <template v-if="isAdmin">
        <h4>Добавление новости</h4>
        <p class="label">Заголовок</p>
        <el-input
          class="layout__item" 
          placeholder="Заголовок"
          v-model="title">
        </el-input>
        <p class="label">Описание</p>
        <el-input
          class="layout__item" 
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="Описание"
          v-model="description">
        </el-input>
        <br>
        <br>
        <el-button  class="layout__action" type="primary" :disabled="!title" @click="publish">Опубликовать</el-button>      
        <br><br>
        <h4>Лента новостей</h4>
      </template>
      <div class="container">
        <table>
          <tr v-for="item in feed" :key="item.id">
            <td @click="open(item)" class="time">{{formatDate(item.date)}}</td>
            <td @click="open(item)"><b>{{item.title}}</b></td>
            <td v-if="isAdmin"> <i class="el-icon-close" @click="openDeleteDialog(item)" ></i> </td>
          </tr>
        </table>
      </div>
    </div>
    <el-dialog
      :title="chosenItem.title"
      :visible.sync="detalsDialogVisible"
      width="300px"
      
    >
      <div class="dialog-body">
        <span v-html="formattedText"/>
      </div>
    </el-dialog>
    <el-dialog
      title="Удаление новости"
      :visible.sync="deleteDialogVisible"
      width="300px"
      
    >
      <div class="dialog-body">
        <div style="color: red">
          <i class="el-icon-warning"></i> 
          <span> Ты действительно хочешь удалить новость? </span>
        </div>
        <br>
        <h4>{{chosenItem.title}}</h4>
        <p v-html="formattedText" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="button" type="primary" @click="deleteItem" >Удалить</el-button>
        <el-button class="button" @click="deleteDialogVisible = false">Отмена</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getFeed, publish, deleteFeed} from '@/api/feed'
import dayjs from 'dayjs'
import store from '@/store'

export default {
  name: 'Feed',
  data() {
    return {
      title: '',
      description: '',
      feed: [],
      detalsDialogVisible: false,
      deleteDialogVisible: false,
      chosenItem:  {
        title: '',
        description: '',
        id: '',
      }
    }
  },
   mounted() {
    this.get()
  },
  store,
  computed: {
    isAdmin ()  {
      return this.$store.state.user?.admin
    },
    formattedText() {
      return this.chosenItem?.description?.replaceAll('\n','<br>')
    },
  },
  methods: {
    async get() {
      const {data} = await getFeed()
      this.feed = data
    },
    formatDate(date) {
      return dayjs(date).format('DD.MM.YYYY hh:mm')
    },
    open(item) {
      this.chosenItem = item
      this.detalsDialogVisible = true
    }, 
    openDeleteDialog(item) {
      this.chosenItem = item
      this.deleteDialogVisible = true
    },
    async publish() {
      const { title,description} = this

      try {
       await publish({title,description})
       await this.get()
      } catch(e) {
        console.error(e)
      }
    },
    async deleteItem() {
      try {
       await deleteFeed(this.chosenItem.id)
       await this.get()
       this.deleteDialogVisible = false
      } catch(e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>  

  tr  {
    cursor: pointer;
  }
  td  {
    padding: 5px;
    vertical-align: top;
    color: #375eb3;
  }

  .time {
    font-size: 0.8rem;
    color: #5f5f5f
  }
  .container {
    max-height: 300px;
    overflow-y: auto;
  }

  .item {
    display: flex;
    flex-direction: row;
  }
</style>
 