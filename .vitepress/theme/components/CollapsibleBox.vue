<script setup lang="ts">
import {PropType} from 'vue'

defineProps({
  open: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  duration: {
    type: Number as PropType<number>,
    default: 300
  }
})

</script>

<template>
  <div class="collapsible-box" :class="{expand:open}" :style="{transition:`grid-template-rows ${duration}ms`}">
    <div></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collapsible-box {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0fr 1fr;

  &.expand {
    grid-template-rows: 0fr 0fr;
  }

  .content {
    overflow: hidden;
  }
}
</style>
