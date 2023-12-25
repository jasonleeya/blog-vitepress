<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Read from "@components/Read.vue";
// import {useData} from "vitepress";

const {Layout} = DefaultTheme
// const cover = useData().frontmatter.value.cover||''
</script>

<template>
<!--  <ClientOnly>-->
    <Layout>
      <template #doc-top>
        <read></read>
      </template>
<!--      <template #layout-top>-->
<!--        <img class="cover" v-if="cover" :src="cover" alt="">-->
<!--      </template>-->
    </Layout>
<!--  </ClientOnly>-->
</template>

<style scoped>
.cover{
  width: 100%;
}
</style>
