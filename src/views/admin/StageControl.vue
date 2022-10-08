<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">Переключение этапа</h3>
      <p>Текущий этап - {{stageDict[initialStage] || 'Неизвестный этап'}}</p>
      <el-select v-model="stage" placeholder="Выбери этап">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="button" type="primary" @click="dialogVisible = true"  :disabled="stage === initialStage">Применить</el-button>
      <el-dialog
        title="Переключить этап?"
        :visible.sync="dialogVisible"
        width="300px"
      >
        <p class="dialog-body">
          Это действие изменит многие игровые механики, нажимай "Продолжить", только если знаешь что делаешь!
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveStage">Продолжить</el-button>
          <el-button @click="dialogVisible = false">Отменить</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import store from '@/store'
import {getStage} from '@/api/game'
import {setStage} from '@/api/admin'

export default {
  name: 'StageControl',
	components: {
  },
	data() {
    return {
      stageDict: {
        0: 'Регистрация',
        1: 'Основной',
        2: 'Финал',
        3: 'Конец'
      },
      stage: '',
      initialStage: '',
      dialogVisible: false,
    }
  },
  store,
  watch: {
    user(val) {
      if (val && !val.main_admin) this.$router.push('/teams')
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    isMainAdmin () {
      return this.$store.state.user?.main_admin
    },
    options() {
      return Object.entries(this.stageDict).map(([value, label]) => ({value, label}))
    }
  },
  async mounted() {
    const {data: stage} = await getStage()
    this.stage = Object.keys(stage)[0]
    this.initialStage  = this.stage
  },
  methods: {
    async saveStage() {
      try {
        await setStage(this.stage)
        this.$message({
          message: 'Этап изменен',
          type: 'success',
          offset: 65
        });
        this.initialStage = this.stage
      } catch (e) {
        console.error(e);
        this.$message({
          message: 'Произошла ошбика!',
          type: 'error',
          offset: 65
        });
      } finally {
        this.dialogVisible = false
      }
    }
  },
}
</script>

<style scoped>
.button {
  margin-left: 18px;
}
</style>
 