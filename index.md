---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 我的技术分享
titleTemplate: :title
#
#hero:
#  name: "我的技术分享"
#  text: "欢迎来到我的技术分享小站"
#  tagline: My great project tagline
#  actions:
#    - theme: brand
#      text: Markdown Examples
#      link: /markdown-examples
#    - theme: alt
#      text: API Examples
#      link: /api-examples
#
#features:
#  - title: Feature A
#    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#  - title: Feature B
#    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#  - title: Feature C
#    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
<script setup>
import Home from '.vitepress/theme/views/home.vue'
</script>
<ClientOnly>
<home/>
</ClientOnly>
