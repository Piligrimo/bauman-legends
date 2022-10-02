<template>
    <div class="layout admin">
    <h3 class="layout__title">Конструктор загадок</h3>
    <div class="container">
      <p class="label">Заголовок</p>
      <el-input
        class="layout__item" 
        placeholder="Заголовок"
        v-model="title">
      </el-input>
      <p class="label">Тип загадки</p>
      <el-radio-group class="layout__item"  v-model="puzzle_type">
        <el-radio label="logic">Логическая</el-radio>
        <el-radio label="photo">Фотоквест</el-radio>
        <el-radio label="final">Для Финала</el-radio>
      </el-radio-group>
      <p class="label">Картинка</p>
      <el-upload
        class="layout__item" 
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :limit="1"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <p class="label">Текст загадки</p>
      <el-input
        class="layout__item" 
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="Было два деда..."
        v-model="text">
      </el-input>
      <template  v-if="puzzle_type!=='photo'">
        <p class="label" >Ответ</p>
        <el-input
          class="layout__item" 
          placeholder="Ответ"
          v-model="regex_answer">
        </el-input>
      </template>
      <br>
      <br>
      <el-button  class="layout__action" type="primary" @click="submit">Сохранить</el-button>
      <p v-for="(message, i) in errorMessages" :key="i" class="error-message" >{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { createPuzzle, editPuzzle } from '../api/admin';


export default {
  name: 'PuzzleForm',
  props: {
    isEdit: Boolean,
    initialValues: Object,
  },
  watch: {
    initialValues (val) {
      if (!val) return
      const { title,text,puzzle_type,regex_answer, points, photo} = this.initialValues
      this.title = title
      this.text = text
      this.puzzle_type = puzzle_type
      this.regex_answer = regex_answer
      this.points = points
      this.photo = photo
    }
  },
  data() {
    return {
      title: '',
      text: '',
      puzzle_type: 'logic',
      regex_answer: '',
      photo: '',
      errorMessages: [],
    }
  }, 
  methods: {
    async submit () {
      const { title,text,puzzle_type,regex_answer, photo} = this
      try {
        if (this.isEdit) {
          const id = Number(this.$route.params.id)
          await editPuzzle({title,text,puzzle_type,regex_answer,points:100, photo, id})
        } else {
          await createPuzzle({title,text,puzzle_type,regex_answer,points:100, photo})
        }
        this.$router.push('/puzzle')
      } catch(e) {
        console.error(e);
        const detail = e.response?.data?.detail;
        if (detail?.length && typeof detail !== 'string') {
          this.errorMessages =  detail.map(({ msg }) => msg);
          return
        }

        this.errorMessages = [e.response.data.detail || "Произошла ошибка"];
      }
      
    }
  }
}
</script>

<style scoped>
  .container { 
    max-width: 500px;
    margin: auto;
  }
</style>
 