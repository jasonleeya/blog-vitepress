<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Read from "@components/Read.vue";

const {Layout} = DefaultTheme
</script>

<template>
  <ClientOnly>
    <Layout>
      <template #doc-top>
        <read></read>
      </template>
    </Layout>
  </ClientOnly>
</template>

<style scoped>

</style>
