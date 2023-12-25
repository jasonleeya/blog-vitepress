<script setup lang="ts">
import DayNightSwitch from "@components/DayNightSwitch.vue";
import {useData} from "vitepress";

const {isDark} = useData()
</script>

<template>
  <div class="switch-wrapper" :title="isDark ? '切换白天模式' : '切换黑夜模式'">
    <day-night-switch v-model="isDark" class="switch"></day-night-switch>
  </div>
</template>

<style scoped lang="scss">
.switch-wrapper{
  width: 50px;
  .switch{
    transform: scale(0.5) translateX(-50%);
  }
}
</style>
