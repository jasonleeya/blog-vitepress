<script setup lang="ts">
import IconLoading from "@icons/IconLoading.vue";
import {onMounted, onUnmounted} from "vue";
const fn = (e: any) => {
  e.preventDefault()
}
onMounted(()=>{
  window.addEventListener('touchmove',fn,{passive:false})
  window.addEventListener('mousewheel',fn,{passive:false})
})
onUnmounted(()=>{
  window.removeEventListener('touchmove',fn)
  window.removeEventListener('mousewheel',fn)
})
</script>

<template>
<div class="loading">
  <icon-loading></icon-loading>
</div>
</template>

<style scoped lang="scss">
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--vp-c-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>
