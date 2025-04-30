<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import {useIsMobile} from "@/hooks/useIsMobile"

const isMobile = useIsMobile()

const {Layout} = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-bottom>
      <el-backtop class="back-top" v-if="!isMobile" :right="null" :bottom="200" style="margin-left: -80px"/>
    </template>
    <template #doc-bottom>
      <el-backtop class="back-top" v-if="isMobile" :right="20" :bottom="80"/>
    </template>
  </Layout>
</template>

<style scoped>
.back-top {
  z-index: 9999;
}
</style>
