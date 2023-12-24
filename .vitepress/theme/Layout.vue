<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Read from "@components/Read.vue";

const {Layout} = DefaultTheme
</script>

<template>
    <Layout>
      <template #doc-top>
        <read></read>
      </template>
    </Layout>
</template>

<style scoped>
.cover{
  width: 100%;
}
</style>
