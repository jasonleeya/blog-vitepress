<script setup lang="ts">
import axios from "axios";
import {useRoute} from "vitepress";

const route = useRoute()
const read = async (path) => {
  return axios.post('/read', {
    path
  })
}
read(decodeURIComponent(route.path).replace(/\.html$/, ''))
</script>
<template></template>
