<template>
  <div class="content login-bg">
    <div class="layout">
      <video @click="takeSnapshot" id="camera-stream"></video>
      <canvas id="canvas"/>
      <img id="photo">
      <p  class="error-message" v-if="errorMessage">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import jsQR from "jsqr";
export default {
  data () {
    return {
      video: null,
      hiddenCanvas: null,
      image: null,
      errorMessage: ''
    }
  },
  store,
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  mounted () {
    this.video = document.getElementById('camera-stream')
    this.hiddenCanvas = document.getElementById('canvas')
    this.image = document.getElementById('photo')
    const vue = this

    const mainCamOptions = { video: { facingMode: { exact: "environment" } }}
    const otherCamOptions = { video: true}

    const resolveCallback = (stream) => {
      vue.video.srcObject = stream
      vue.video.play()
    }  
    const rejectCallback = (err) => {
      switch (err.name) {
        case 'PermissionDenied':
          vue.errorMessage = 'Запрещен доступ к камере'
          break;
        case 'DevicesNotFound':
          vue.errorMessage = 'Камера не обнаружена'
          break;
        case 'OverconstrainedError':
          navigator.getUserMedia( otherCamOptions, resolveCallback, () => {console.log(err)})
          break;
        default:
          vue.errorMessage = 'Произошла проблема с подключением к камере'
          console.log(err)
      }
    }
    navigator.getUserMedia( mainCamOptions, resolveCallback, rejectCallback)
  },
  watch: {
    isAuth: { 
      immediate: true,
      handler(val) {
        if (!val)
          this.$router.push('/login')
      }
    }
  },
  methods: {
    takeSnapshot(){
      const width = this.video.videoWidth
      const height = this.video.videoHeight
      const context = this.hiddenCanvas.getContext('2d')

      this.hiddenCanvas.width = width
      this.hiddenCanvas.height = height
      context.drawImage(this.video, 0, 0, width, height)
      
      const imageData = this.hiddenCanvas.toDataURL('image/png')
      // this.image.setAttribute('src', imageDataURL)
      // const imageData = context.getImageData(0, 0, width, height)
      console.log(imageData)
      const code = jsQR(imageData, imageData.width, imageData.height)

      if (code) {
        console.log("Found QR code", code);
        this.errorMessage = code
      }
    }
  }
}
</script>

<style scoped>


  img {
    width: 100%;
  }
</style>
