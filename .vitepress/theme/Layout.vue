<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Read from "./components/Read.vue";

const {Layout} = DefaultTheme

</script>

<template>
  <Layout>
    <template #nav-screen-content-before>1111111</template>
    <template #doc-top>
      <read></read>
    </template>
  </Layout>
</template>

<style scoped>

</style>
