<template>
  <div class="content info-bg">
    <div class="layout">
      <h3 class="layout__title">Консультация</h3>

      <div id="vk_community_messages"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
	components: {
  },
	data() {
    return {
      source1: 'help.pdf',
    }
  }
}
</script>

<style scoped>

#vk_community_messages{
  position: relative !important;
}


</style>
 