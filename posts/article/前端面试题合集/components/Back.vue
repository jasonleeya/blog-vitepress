<!--
 * @Author: 李双江
 * @Date: 2025/4/29 02:31:06
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/29 02:31:06
 * @Description:
-->
<template>
  <div class="back-wrapper">
    <a :href="props.link" class="back">
      <el-icon style="bottom: -2px">
        <ArrowLeftBold/>
      </el-icon>
      <span> 返回</span>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  link : {
    type : String,
    default : '/article/前端面试题合集'
  }
})
</script>

<style scoped lang="scss">
.back-wrapper{
  padding-bottom: 5px;
}
.back{
  text-decoration: none;
}
</style>
