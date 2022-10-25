<template>
  <el-dialog
    title="Новое сообщение"
    :visible="!!step"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="350px"
  >
    <div class="dialog-body">
      <component
        v-if="step"
        :is="step.component" 
        :text="step.text" 
        :character="step.character"
        :src="step.src"
        :max="step.max"
        :variant="step.variant"
        @next="next"
      />
    </div>
  </el-dialog>
</template>

<script>
import config from './config';


export default {
  name:  "FinalPlot",
  props: {
    puzzle: Number,
    isComplete: Boolean,
  },
  watch: {
    isComplete() {
      this.stepIndex = 0
    }
  },
  data() {
    return {
      dialogVisible: true,
      stepIndex: 0,
    }
  },
  computed: {
    step() {
      const stage = config[this.puzzle]
      const subStage = this.isComplete ? stage.after : stage.before
      return subStage[this.stepIndex]
    }
  },
  methods: {
    next() {
      this.stepIndex++
      if (!this.step) { 
        this.dialogVisible = false
        this.$emit('ended')
      }
    }
  }

};
</script>

<style scoped>
 
</style>
