<template>
  <div class="sign-in-header">
    <div class="arms ss"/>
      <h3 class="layout__title">{{text}}</h3>        
    <div class="arms bmstu"/>
  </div>
</template>

<script>
export default {
  name: "АrmedTitle",
  props: {
    text: String
  }
};
</script>

<style scoped>
 .sign-in-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  .arms {
    height: 60px;
    width: 60px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .ss {
    background-image: url('../assets//ss.png');
  }

  .bmstu {
    background-image: url('../assets//bmstu.png');
  }
</style>
