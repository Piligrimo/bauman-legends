<template>
  <div class="content info-bg">
    <div class="layout">
      <div class="helpder">
        <h3>Справка</h3>
        <a :href="source1" download>
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'download']"
          />
        </a>
      </div>
			
      <div class="viewer"><vue-pdf-embed :source="source1" /></div>
    </div>
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
export default {
  name: 'Help',
	components: {
    VuePdfEmbed,
  },
	data() {
    return {
      source1: 'help.pdf',
    }
  }
}
</script>

<style scoped>
.viewer {
  max-height: 500px;
  overflow-y: scroll;
}

.helpder {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.icon {
  margin-left: 10px;
  font-size: 20px;
  color: #080D38;
}
</style>
 