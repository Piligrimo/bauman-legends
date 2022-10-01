<template>
  <div class="content info-bg">
    <PuzzleForm :isEdit="true" :initialValues="puzzle"></PuzzleForm>
  </div>
</template>

<script>
import { getPuzzleById } from '../../../api/admin';
import PuzzleForm from '../../../components/PuzzleForm.vue';

export default {
  name: "PuzzleEdit",
  data() {
    return {
      puzzle: null,
    };
  },
  components: { PuzzleForm },
  async mounted() {
    const id = this.$route.params.id
   const {data} = await getPuzzleById(id)
   this.puzzle = data[0]
  }
}
</script>

<style scoped>
</style>
 