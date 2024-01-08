<script setup lang="ts">
import {ref} from "vue";
import { useIntersectionObserver } from '@vueuse/core'
defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
})

const isVisible = ref(false)
const detector = ref<HTMLElement>()

const { stop } = useIntersectionObserver(
    detector,
    ([{ isIntersecting }]) => {
      if(isIntersecting){
        isVisible.value = true
        stop()
      }
    },
)
</script>

<template>
  <ClientOnly>
    <div class="detector" ref="detector" :style="{width, height}">
      <slot v-if="isVisible"></slot>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">

</style>
