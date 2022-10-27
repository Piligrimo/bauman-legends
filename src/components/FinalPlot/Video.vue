<template>
  <div>
    <video-player  
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
    />
    <p class="hint">(Загрузка видео может занять пару минут)</p>
    <el-button type="primary" class="layout__item" @click="$emit('next')">
      Далее
    </el-button>
  </div>
</template>

<script>
export default {
  name:  "Video",
  props: {
    src: String,
  }, 
  data () {
    return {
      playerOptions: {
          // videojs options
          language: 'ru',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          height: 200,
          sources: [{
            type: "video/mp4",
            src: this.src
          }],
        }
    }
  }
};
</script>

<style scoped>
 .video-player-box /deep/ .video-js {
    width: 100%;
  }

  .hint {
    margin-top: 1rem;
  }
 
</style>
