<!--
 * @Author: 李双江
 * @Date: 2025/4/29 23:35:35
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/29 23:35:35
 * @Description:
-->
<template>
  <Teleport to="body">
    <div class="action-bar">
      <div class="content">
        <el-button type="primary" size="large" @click="handleNext">下一题</el-button>
        <el-button size="large" @click="handlePrev">上一题</el-button>
        <checkbox v-model="isLearned" @update:model-value="setStatus('isLearned',isLearned)"></checkbox>
        <collect v-model="isCollected" @update:model-value="setStatus('isCollected',isCollected)"></collect>
      </div>
    </div>
    <!--把footer顶起来   -->
    <div style="height: 60px">
    </div>
  </teleport>
</template>

<script setup lang="ts">

import Checkbox from "./Checkbox.vue";
import Collect from "./Collect.vue";
import {onMounted, onUnmounted} from "vue";
import {useQuestion} from "../hooks.mjs";

const {isLearned, isCollected, currentIndex, questionListLength,setStatus} = useQuestion()


const prevNextEl: HTMLElement = document.querySelector('.prev-next')
onMounted(() => prevNextEl!.style.display = 'none')
onUnmounted(() => prevNextEl!.style.display = 'block')

const handleNext = () => {
  currentIndex.value = currentIndex.value + 1 > questionListLength.value - 1 ? 0 : currentIndex.value + 1
}
const handlePrev = () => {
  currentIndex.value = currentIndex.value - 1 < 0 ? questionListLength.value - 1 : currentIndex.value - 1
}
</script>

<style scoped lang="scss">
.action-bar {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  background: var(--vp-c-bg-soft);
  z-index: 999;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;

  .content {
    width: 680px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 20px;
  }
}

@media (max-width: 992px) {
  .action-bar {
    padding-right: 10px;
  }
}
</style>
