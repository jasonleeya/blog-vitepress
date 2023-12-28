<script setup lang="ts">
import {ref} from "vue";

const isExpand= ref(false);
</script>

<template>
  <el-button type="primary" class="button" @click="isExpand = !isExpand">点击{{isExpand?'收起':'展开'}}</el-button>
  <div class="box" :style="{'max-height':isExpand?'5000px':'0'}">
    <div class="content"><div v-for="item in 10">使css高度auto支持过渡动画</div></div>
  </div>
</template>

<style scoped lang="scss">
.button{
  margin-bottom: 20px;
}
.box{
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  overflow: hidden;
  transition: max-height 0.5s;
  .content{
    padding: 10px;
  }
}
</style>
