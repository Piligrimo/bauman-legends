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
      <template v-if="!isEdit" >
        <p class="label">Тип загадки</p>
        <el-radio-group class="layout__item"  v-model="puzzle_type">
          <el-radio label="logic">Логическая</el-radio>
          <el-radio label="photo">Фотоквест</el-radio>
          <el-radio label="final">Для Финала</el-radio>
        </el-radio-group>
      </template>
      
      <p class="label">Картинка</p>
      <img v-if="photo" class="picture layout__item" :src="photo"/>
      <div class="upload-control">
        <input v-if="!photo" class="layout__item" ref="upload" @change="onFileChange" type="file" />
        <i 
          v-if="photo"
          class="el-icon-delete-solid" 
          style="color:red; font-size: 40px; cursor: pointer;"
          @click="deletePhoto"
        />
      </div>
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
import { BASEURL } from '../api/config';


export default {
  name: 'PuzzleForm',
  props: {
    isEdit: Boolean,
    initialValues: Object,
  },
  watch: {
    initialValues (val) {
      if (!val) return
      const { title,text,puzzle_type,regex_answer,filename} = this.initialValues
      this.title = title || ''
      this.text = text || ''
      this.puzzle_type = puzzle_type || ''
      this.regex_answer = regex_answer || ''
      this.filename = filename
    }
  },
  data() {
    return {
      title: '',
      text: '',
      puzzle_type: 'logic',
      regex_answer: '',
      filename: '',
      errorMessages: [],
      file: null,
    }
  }, 
  computed: {
    photo() {
      if (this.filename) return BASEURL + '/file/' + this.filename
      if (!this.file || this.file === '"delete"') return
      return URL.createObjectURL(this.file)
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.file = files[0]

    },
    deletePhoto() {
      this.file= '"delete"'
      if (this.$refs.upload)
        this.$refs.upload.value = null;
      this.filename = ''
    },
    async submit () {
      const { title,text,puzzle_type,regex_answer} = this
      const id = Number(this.$route.params.id)
      const puzzle = {title,text,puzzle_type,regex_answer,points:100}
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        if (this.isEdit) {     
          formData.append('puzzle', JSON.stringify({...puzzle, id}))
          await editPuzzle(formData)
        } else {
          formData.append('puzzle', JSON.stringify(puzzle))
          await createPuzzle(formData)
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

  .upload-control {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 1rem;
  }
</style>
 