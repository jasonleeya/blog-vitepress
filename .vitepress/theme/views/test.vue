<!--用于写文章时的测试组件-->
<script setup>
import {ref} from "vue";

const isExpand = ref(false);
</script>

<template>
  <el-button type="primary" class="button" @click="isExpand = !isExpand">点击{{isExpand?'收起':'展开'}}</el-button>
  <div class="grid" :style="{gridTemplateRows: isExpand ? '1fr 1fr 1fr' : '1fr 0fr 1fr'}">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  margin: 0 auto;
  display: grid;
  height: 300px;
  width: 100px;
  transition: grid-template-rows 0.3s;
}

.item {
  border: 1px solid #000;
  border-bottom: none;
  box-sizing: border-box;
  background: skyblue;
}

.item:last-child {
  border-bottom: 1px solid #000;
}


</style>
