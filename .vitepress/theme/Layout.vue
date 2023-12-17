<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Read from "@components/Read.vue";
import Home from "@views/Home.vue";
import {useIsMobile} from "@/hooks/useIsMobile.mjs";

const {Layout} = DefaultTheme
const isMobile = useIsMobile()
const scrollbar = isMobile.value ? 'div' : 'el-scrollbar'
</script>

<template>
  <component :is="scrollbar" height="100vh" class="page-scrollbar">
    <Layout>
      <template #doc-top>
        <read></read>
      </template>
      <template #home-features-before>
        <home></home>
      </template>
    </Layout>
  </component>
</template>

<style scoped>

</style>
