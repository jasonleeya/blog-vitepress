<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Read from "./components/Read.vue";
import Home from "./views/Home.vue";

const {Layout} = DefaultTheme

</script>

<template>
  <el-scrollbar height="100vh" class="page-scrollbar">
    <Layout>
      <!--    <template #nav-screen-content-before>1111111</template>-->
      <template #doc-top>
        <read></read>
      </template>
      <template #home-features-before>
        <home></home>
      </template>
    </Layout>
  </el-scrollbar>
</template>

<style scoped>

</style>
