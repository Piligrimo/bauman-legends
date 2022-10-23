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
          <el-radio label="logic" :disabled="disableLogic">Логическая</el-radio>
          <el-radio label="photo" :disabled="disablePhoto">Фотоквест</el-radio>
          <el-radio label="final">Для Финала</el-radio>
        </el-radio-group>
      </template>
      
      <p class="label">Картинка</p>
      <img v-if="photo" class="layout__item" :src="photo"/>
      <div class="upload-control">
        <input v-if="!photo" class="layout__item" ref="upload" @change="onFileChange" type="file" />
        <i 
          v-if="photo"
          class="el-icon-delete-solid" 
          style="color:red; font-size: 40px; cursor: pointer;"
          @click="deletePhoto()"
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
      <template v-if="puzzle_type === 'final'">
        <div class="number-inputs">
          <div>
            <p class="label">Пропускная способность</p>
            <el-input-number
              class="layout__item number-input" 
              :min="2"
              :max="8"
              v-model="passing"
            />
          </div>
          <div>
            <p class="label">Время на выполнение (мин)</p>
            <el-input-number
              :min="10"
              :max="25"
              :step="5"
              class="layout__item number-input" 
              v-model="timer"
            />
          </div>
        </div>
        <h4>Подсказки</h4>
        <div :key="keyHack" class="hints-container">
          <div v-for="n in 3" :key="n" class="hint-subform">
            <div>
              <p class="label">Картинка подсказки</p>
              <div class="upload-control">
                <img v-if="getHintPhoto(n-1)" class="hint-image layout__item" :src="getHintPhoto(n-1)" @click="openPreview(n-1)"/>
                <input v-if="!getHintPhoto(n-1)" class="layout__item" :ref="`upload-${n-1}`" @change="onFileChange($event, n-1)" type="file" />
                <i 
                  v-if="getHintPhoto(n-1)"
                  class="el-icon-delete-solid" 
                  style="color:red; font-size: 40px; cursor: pointer;"
                  @click="deletePhoto(n-1)"
                />
              </div>
            </div>
            <div>
              <p class="label">Текст подсказки</p>
              <el-input
                class="layout__item" 
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="тому хуже у кого..."
                v-model="hintTexts[n-1]">
              </el-input>
            </div>
          </div>
        </div>
      </template>
      <br>
      <br>
      <el-button  class="layout__action" type="primary" @click="submit">Сохранить</el-button>
      <p v-for="(message, i) in errorMessages" :key="i" class="error-message" >{{ message }}</p>
      <el-dialog
        title="Так подсказка будет выглядеть у игрока"
        :visible.sync="dialogVisible"
        width="300px"
      >
        <div class="dialog-body">
          <img class="layout__item" :src="getHintPhoto(chosenHint)"/>
          <p v-html="formattedText"/>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { createPuzzle, editPuzzle, getPuzzles } from '../api/admin';
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
      const { title,text,puzzle_type,regex_answer,filename, hint_files,hint,passing,timer} = val
      this.title = title || ''
      this.text = text || ''
      this.puzzle_type = puzzle_type || ''
      this.regex_answer = regex_answer || ''
      this.filename = filename
      this.hintFileNames=hint_files
      this.hintTexts = hint
      this.passing = passing
      this.timer = timer
    }
  },
  data() {
    return {
      title: '',
      text: '',
      puzzle_type: 'logic',
      regex_answer: '',
      filename: '',
      file: null,
      hintFileNames: ['','',''],
      hintTexts: ['','',''],
      hintFiles: [null, null, null],
      errorMessages: [],
      disableLogic: false,
      disablePhoto: false,
      dialogVisible: false,
      passing: 0,
      timer: 10,
      keyHack: 0,
      chosenHint: 0,
      
    }
  },
  async mounted() {
    if (!this.isEdit)
    {
      const {data} = await getPuzzles()
      const logicNum = data.filter(({puzzle_type}) => puzzle_type === 'logic').length
      const photoNum = data.filter(({puzzle_type}) => puzzle_type === 'photo').length
      this.disableLogic = logicNum >=7
      this.disablePhoto = photoNum >=7

      const warnings = []
      if (this.disableLogic) {
        this.puzzle_type = 'photo'
        warnings.push('логических загадок')
      }
      if (this.disablePhoto) {
        this.puzzle_type = 'final'
        warnings.push('загадок для фотоквеста')
      }
      if (warnings.length)
        this.$message({
          message: 'Достигнуто максимальное количество ' + warnings.join(' и '),
          type: 'warning',
          offset: 65
        });
    }
  },
  computed: {
    photo() {
      if (this.filename) return BASEURL + '/file/' + this.filename
      if (!this.file || this.file === '"delete"') return
      return URL.createObjectURL(this.file)
    },
    formattedText() {
      if (!this.chosenHint) return ''
      return this.hintTexts[this.chosenHint].replaceAll('\n','<br>')
    },
  },
  methods: {
    getHintPhoto(n) {
      if (!this.hintFileNames || !this.hintFiles) return
      const filename = this.hintFileNames[n]
      if (filename) return BASEURL + '/file/' + filename
      const file = this.hintFiles[n]
      if (!file || file === '"delete"') return
      return URL.createObjectURL(file)
    },
    onFileChange(e, hintIndex) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      if (hintIndex != undefined) {
        this.$set(this.hintFiles, hintIndex, files[0])
      } else  {
        this.file = files[0]
      }
    },
    deletePhoto(hintIndex) {
      if (hintIndex != undefined)
      {
        console.log(this.$refs[`upload-${hintIndex-1}`])
        this.hintFiles[hintIndex]= '"delete"'
        if (this.$refs[`upload-${hintIndex-1}`])
          this.$refs[`upload-${hintIndex-1}`].value = null;
        this.hintFileNames[hintIndex] = ''
        this.keyHack++
      } else {
        this.file= '"delete"'
        if (this.$refs.upload)
          this.$refs.upload.value = null;
        this.filename = ''
      }
    },
    async submit () {
      const { title,text,puzzle_type,regex_answer} = this
      const id = Number(this.$route.params.id)
      const puzzle = {title,text,puzzle_type,regex_answer,points:100}
      const formData = new FormData()
      formData.append('file', this.file)
      if (puzzle_type === 'final') {
        formData.append('hint1', this.hintFiles[0])
        formData.append('hint2', this.hintFiles[1])
        formData.append('hint3', this.hintFiles[2])
        puzzle.passing = this.passing
        puzzle.timer = this.timer
        puzzle.hint = this.hintTexts 
      }
      try {
        if (this.isEdit) {     
          formData.append('puzzle', JSON.stringify({...puzzle, id}))
          await editPuzzle(formData)
        } else {
          formData.append('puzzle', JSON.stringify(puzzle))
          await createPuzzle(formData)
        }
        this.$router.push('/puzzle')
        window.location.reload()
      } catch(e) {
        console.error(e);
        const detail = e.response?.data?.detail;
        if (detail?.length && typeof detail !== 'string') {
          this.errorMessages =  detail.map(({ msg }) => msg);
          return
        }

        this.errorMessages = [e.response.data.detail || "Произошла ошибка"];
      }
      
    },
    openPreview(n) {
      this.dialogVisible = true
      this.chosenHint = n
    }
  }
}
</script>

<style scoped>
  .container { 
    max-width: 500px;
    margin: auto;
  }

  .number-input {
    max-width: 200px;
    margin-top: 10px;
  }

  .number-inputs {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }


  .upload-control {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  .hints-container {
    margin-left: 20px;
  }

  .hint-subform {
    display: flex;
    justify-content: space-between;
  }

  .hint-image {
    height: 100px;
    width: 100px;
    cursor: pointer;
  }
</style>
 