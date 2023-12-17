<script setup lang="ts">
import axios from "axios";
import {useRoute} from "vitepress";
import {onMounted} from "vue";

const route = useRoute()
const read = async (path) => {
  return axios.post('/read', {
    path
  })
}
read(decodeURIComponent(route.path).replace(/\.html$/, ''))


const fn = (e: any) => {
  const url = e.target?.baseURI
  if (url) {
    const math = decodeURIComponent(url).match(/(\/posts\/.*)\.html/)
    if (math) {
      const path = math[1]
      read(path)
    }
  }
}
//侧边栏点击的文章不会触发popstate,且官方没有提供监听路由的方法，故出此下策，监听sidebar点击
onMounted(() => {
  const sidebar = document.querySelector('.VPSidebar')
  try {
    if (sidebar) {
      sidebar.removeEventListener('click', fn)
      sidebar.addEventListener('click', fn)
    }
  } catch (e) {
    console.error(e)
  }
})

</script>
<template></template>
