<!--
 * @Author: 李双江
 * @Date: 2025/5/14 16:41:46
 * @LastEditors: 李双江
 * @LastEditTime: 2025/5/14 16:41:46
 * @Description:
-->
<template>
  <div class="container"
       :style="{
         '--skew': `${skew}deg`,
         '--scaleY': scaleY,
         'font-size': isMobile ? '30px' : '80px',
         'height': isMobile ? '150px' : '300px'
       }">
    <div class="text" data-text="可交互文字阴影">
      可交互文字阴影
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {useIsMobile} from "@hooks/useIsMobile";

const isMobile = useIsMobile()
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
let mouseX = 0
let mouseY = 0
const skew = ref(0)
const scaleY = ref(0.5)

const handleMouseMove = (e: MouseEvent | TouchEvent) => {
  const event = e instanceof MouseEvent ? e : e.touches[0]
  mouseX = event.clientX
  mouseY = event.clientY
  skew.value = 180 * (mouseX - windowWidth / 2) / windowWidth

  if (mouseY > windowHeight / 2) {
    scaleY.value = (mouseY - windowHeight / 2) / (windowHeight / 2) + 0.5
  } else {
    scaleY.value = 0.5 - 0.5 * (1 - mouseY / (windowHeight / 2)) * 0.8
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('touchmove', handleMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #CBD2D5;
  font-weight: bold;
  overflow: hidden;
  --skew: 0deg;
  --scaleY: 0.5;

  .text {
    color: #fff;
    position: relative;
    z-index: 1;
    line-height: 0.76;
    font-family: Arial, sans-serif;

    &:after {
      content: attr(data-text);
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      color: #000;
      transform: translate(-2px, -2px) scaleY(var(--scaleY)) skew(var(--skew));
      transform-origin: 0 100%;
      z-index: -1;
      //mask: linear-gradient(rgba(0, 0, 0, 0.2) 0%, #000 100%);
      filter: blur(2px);
    }
  }
}
</style>
