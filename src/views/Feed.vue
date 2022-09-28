<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">Обновления</h3>
      <div class="container">
        <table>
          <tr @click="open(item)" v-for="item in feed" :key="item.id">
            <td class="time">{{formatDate(item.date)}}</td>
            <td><b>{{item.title}}</b></td>
          </tr>
        </table>
      </div>
    </div>
    <el-dialog
      :title="chosenItem.title"
      :visible.sync="dialogVisible"
      width="300px"
      
    >
      <div class="dialog-body">
        <span>{{chosenItem.description}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getFeed} from '@/api/feed'
 import dayjs from 'dayjs'

export default {
  name: 'Feed',
  data() {
    return {
      feed: [],
      dialogVisible: false,
      chosenItem:  {
        title: '',
        description: ''
      }
    }
  },
  async mounted() {
    const {data} = await getFeed()
   this.feed = data
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('DD.MM.YYYY hh:mm')
    },
    open(item) {
      this.chosenItem = item
      this.dialogVisible = true
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
    max-height: 700px;
    overflow-y: auto;
  }

  .item {
    display: flex;
    flex-direction: row;
  }
</style>
 