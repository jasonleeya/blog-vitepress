<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#8a919f',
  },
  backgroundColor: {
    type: String,
    default: '#e8eaef',
  },
  num: {
    type: Number,
    default: 0
  }
})



</script>

<template>
  <div class="tag-wrapper">
    <div class="tag" :style="{backgroundColor, color}">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <path d="M200 0 L120 80 Q100 100 120 120 L200 200Z
    M150 100 A20 20 0 1 1 190 100A20 20 0 1 1 150 100z"
              :fill="backgroundColor" fill-rule="nonzero"/>
      </svg>
      <div class="text">{{ text }}</div>
      <div class="num" v-if="num">{{ num }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag-wrapper {
  display: inline-block;
}

.tag {
  padding: 0 4px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  max-width: 76px;
  box-sizing: border-box;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  display: flex;
  position: relative;
  margin: 0 10px;
  cursor: pointer;

  svg {
    position: absolute;
    left: -20px;
  }
}
</style>
