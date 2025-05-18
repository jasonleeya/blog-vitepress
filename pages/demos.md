---
layout: home
footer: false
title: 我的技术分享
titleTemplate: :title
---
<script setup>
import Demos from '@views/demos.vue';
import Loading from "@components/Loading.vue"; 

import {ref} from "vue"; 
const loading = ref(true);
const handleLoad = ()=>{
  loading.value =false
}
</script>
<ClientOnly>
<demos @load="handleLoad"/>
<Loading v-model="loading"/>
</ClientOnly>
