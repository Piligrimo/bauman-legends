<template>
  <div>
    <div id="container">
      <div id="dummy"></div>
      <div id="element">
        <h2 id="loading" v-if="!isVideoReady">{{loadingMessage}}</h2>
        <div id="blick"/>
        <video @click="tick" id="camera-stream"></video>
      </div>
    </div>
    <div id="handle"/>
    <canvas id="canvas" v-show="false"></canvas>
    <div v-if="!isCodeFound" id="outputMessage">QR-code не найден</div>
  </div>
</template>

<script>
import jsQR from "jsqr";
export default {
  data () {
    return {
      video: null,
      canvas: null,
      image: null,
      isVideoReady: false,
      errorMessage: '',
      showCanvas: false,
      showOutputContainer: false,
      showOutputData: false,
      outputData: '',
      isCodeFound: false,
      context: null,
      timer: null,
      dotCount: 0,
      loadingMessage: ''
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
      }
    }
    navigator.getUserMedia( mainCamOptions, resolveCallback, rejectCallback)
    this.timer = setInterval(()=> {vue.tick()},100)
  },
  methods: {
    tick(){
      if (this.video?.readyState === this.video?.HAVE_ENOUGH_DATA) {
        this.showOutputContainer = true
        this.isVideoReady = true
        this.canvas.height = this.video.videoHeight;
        this.canvas.width = this.video.videoWidth;
        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        this.isCodeFound = !!code

        if (code) {
          this.showOutputData = true;
          this.outputData = code.data;
          this.$emit('read', code.data)
          clearInterval(this.timer)
        } else {
          this.showOutputData = false;
        }
      } else {
         this.dotCount = (this.dotCount + 1) % 3
         switch (this.dotCount) {
             case 0: this.loadingMessage='  Загрузка.'; break
             case 1: this.loadingMessage=' Загрузка..'; break
             case 2: this.loadingMessage='Загрузка...'; break
         }
      }
    }
  }
}
</script>

<style scoped>

#container {
    display: inline-block;
    position: relative;
    width: 100%;
}
#dummy {
    margin-top: 100%;
}
#element {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    text-align: center;
    overflow:hidden;
    background-color: rgb(157, 224, 236);
    border: 20px solid #141744;
    z-index: 1;
  }
  video {
    width: 100%;
  }
  #handle {
    position: relative;
    transform: rotate(150deg);
    top: -90px;
    left: 75%;
    background-color: #141744;
    width: 40px;
    height: 200px;
  }
  #blick {
    position: absolute;
    top: 20%;
    left: 20%;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.822);
  }
  #loading {
    position: absolute;
    top: 40%;
    /* left: 20%; */
    width: 100%;
    text-align: center;
    color: white;
  }
  #outputMessage {
      margin-top: -8rem;
  }
</style>
