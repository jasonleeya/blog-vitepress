---
category: 笔记
tags:
  - CSS
  - JavaScript
description: 最近偶然发现一个令人惊艳的卡牌效果网站 Poke-Holo，其动态全息效果和3D交互令人印象深刻。出于学习目的，我决定尝试复刻这个效果，以下是实现过程的完整记录。
cover: https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2025_05/pokemon.svg
---
<script setup>
import Read from "@components/Read.vue";
import Card from './components/Card.vue'
</script>

<ClientOnly>
  <read></read>
</ClientOnly>

<Card/>


# 可互动宝可梦卡复刻


最近偶然发现一个令人惊艳的卡牌效果网站 [Poke-Holo](https://poke-holo.simey.me/)，其动态交互令人印象深刻。出于学习目的，我决定尝试用vue简单复刻这个效果(主要复刻鼠标交互效果，浮雕等光影效果未复刻)，以下是实现过程的完整记录。

## 一、效果解析
通过开发者工具分析及视觉观察，总结出主要复刻要点：
1. 通过监听鼠标`mousemove`事件，计算出鼠标指针在卡片上的位置。
2. 通过鼠标指针坐标位置计算出卡片X轴和Y轴上的旋转角度。
3. 
