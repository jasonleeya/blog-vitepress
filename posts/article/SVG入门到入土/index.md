---
category: 文章
tags:
  - SVG
---

<script setup>
import Read from "@components/Read.vue";
import CanvasSvgCompare from "./CanvasSvgCompare.vue";
import {ref} from 'vue';
import {withBase} from 'vitepress';

const arcXr = ref(0);
const arcMx = ref(160);
const arcMy = ref(180);
const arcX = ref(240);
const arcY = ref(220);
const arcRx = ref(100);
const arcRy = ref(50);
const arcLaf = ref(0);
const arcSf = ref(0);
</script>

<ClientOnly>
  <read></read>
</ClientOnly>

<style>
 #rect1 { fill: url(#Gradient1); }
              .stop1 { stop-color: red; }
              .stop2 { stop-color: black; stop-opacity: 0; }
              .stop3 { stop-color: blue; }
</style>

![cover](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/svg.svg)

# SVG入门到入土

相信绝大多数前端同学都不愿意自己手写SVG代码吧，这种事情还是直接交给UI省事的多，但是我学习了SVG的基础用法之后，发现SVG还是可以给平时开发带来很大便利的。在此我写下这篇文章，方便日后查阅，也希望能帮助到其他前端小伙伴入门svg。


<!--@include: ./base.md-->
<!--@include: ./path.md-->
<!--@include: ./fillAndStroke.md-->
<!--@include: ./gradient.md-->
<!--@include: ./pattern.md-->
<!--@include: ./text.md-->
<!--@include: ./filter.md-->
<!--@include: ./transform.md-->
