<script lang="ts" setup>

import {computed} from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#8a919f',
  },
  backgroundColor: {
    type: String,
    default: '#f2f3f5',
  },
  isActive: {
    type: Boolean,
    default: true,
  }
})
const _color = computed(() => {
  return props.isActive ? props.color : ''
})
const _backgroundColor = computed(() => {
  return props.isActive ? props.backgroundColor : ''
})

</script>

<template>
    <span :style="{backgroundColor:_backgroundColor, color:_color}" class="tag">
      <svg height="20" viewBox="0 0 200 200" width="20" xmlns="http://www.w3.org/2000/svg">
        <path :fill="_backgroundColor"
              d="M200 0 L120 80 Q100 100 120 120 L200 200Z
    M150 100 A20 20 0 1 1 190 100A20 20 0 1 1 150 100z" fill-rule="nonzero"/>
      </svg>
      <span class="text">{{ text }}</span>
      <span v-if="num" :style="{backgroundColor:_color, color:_backgroundColor}" class="num">{{ num }}</span>
  </span>
</template>

<style lang="scss" scoped>


.tag {
  padding: 0 8px 0 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  display: inline-flex;
  position: relative;
  margin-left: 15px;
  cursor: pointer;
  user-select: none;
  color: #8a919f;
  background-color: #f2f3f5;

  svg {
    position: absolute;
    left: -20px;
    fill: #f2f3f5;
  }

  .num {
    margin: auto auto auto 5px;
    border-radius: 8px;
    min-width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    padding: 0 3px;
    background-color: #8a919f;
    color: #f2f3f5;
  }
}
.dark{
  .tag{
    color: #ffffff;
    background-color: #737373;
  }
  svg{
    fill: #737373;
  }
  .num{
    background-color: #484747;
  }
}
</style>
