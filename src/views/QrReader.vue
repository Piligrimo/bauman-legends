<template>
  <div class="content login-bg">
    <div class="layout">
      <video @click="tick" id="camera-stream"></video>
      <canvas id="canvas" v-show="false"></canvas>
      <div id="output" v-show="showOutputContainer">
        <div v-if="!isCodeFound" id="outputMessage">QR-code не найден</div>
        <div v-show="showOutputData"><b>Код:</b> <span id="outputData">{{outputData}}</span></div>
      </div>
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
      canvas: null,
      image: null,
      errorMessage: '',
      showCanvas: false,
      showOutputContainer: false,
      showOutputData: false,
      outputData: '',
      isCodeFound: false,
      context: null
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
    this.canvas = document.getElementById('canvas')
    this.context = this.canvas.getContext("2d")
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
    this.tick()

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
    tick(){
      console.log(this.video.readyState)
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      console.log(1)

        this.showCanvas = true
        this.showOutputContainer = true
    
        this.canvas.height = this.video.videoHeight;
        this.canvas.width = this.video.videoWidth;
        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        this.isCodeFound = !!code
        console.log(code)

        if (code) {
          this.showOutputData = true;
          this.outputData = code.data;
        } else {
          this.showOutputData = false;
          this.tick()
        }
      } else {
        this.tick()
      }
    }
  }
}
</script>

<style scoped>


  video {
    width: 100%;
  }
</style>
