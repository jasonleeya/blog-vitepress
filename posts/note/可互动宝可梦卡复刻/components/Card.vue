<!--
 * @Author: 李双江
 * @Date: 2025/5/3 20:58:45
 * @LastEditors: 李双江
 * @LastEditTime: 2025/5/3 20:58:45
 * @Description:
-->
<template>
  <div class="card-wrapper">
    <div class="game-card"
         v-if="isShow"
         @mouseenter="handleMouseEnter"
         @mousemove="handleMouseMove"
         @mouseleave="handleMouseLeave"
         @touchstart="handleMouseEnter"
         @touchmove="handleMouseMove"
         @touchend="handleMouseLeave"
         ref="cardRef"
         :style="{transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: shouldTransition?'transform 0.2s ease-out!important':'',
          '--img-url':`url(${props.imgUrl})`,
          '--foil-img-url':`url(${props.foilUrl})`,
          '--pointer-x': pointerX + 'px',
          '--pointer-y': pointerY + 'px',
          '--radial-size':isHover?'70%':'0'
          }">
      <div class="shine" :style="{opacity: isHover ? 1 : 0}"></div>
    </div>
    <span class="notice">PC端鼠标悬停查看效果</span>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, PropType, ref} from "vue";

const props = defineProps({
  imgUrl: {
    type: String as PropType<string>,
    default: 'https://file.lsj97.com/imgs/2025_05/49_hires.png',
  },
  foilUrl: {
    type: String as PropType<string>,
    default: 'https://file.lsj97.com/imgs/2025_05/49_foil.webp',
  }
})

const cardRef = ref()

let cardLeft = 0
let cardTop = 0
const rotateX = ref(0)
const rotateY = ref(0)
const pointerX = ref(0)
const pointerY = ref(0)
const isHover = ref(false)

/*onMounted(() => {
  const bcr = cardRef.value.getBoundingClientRect()
  cardLeft = bcr.left
  cardTop = bcr.top
})*/

const isShow = ref(false)
setTimeout(async () => {
  isShow.value = true
  await nextTick()
  const bcr = cardRef.value?.getBoundingClientRect()
  cardLeft = bcr?.left
  cardTop = bcr?.top
},500)

const shouldTransition = ref(false)
const handleMouseEnter = () => {
  shouldTransition.value = true
  isHover.value = true
}
const handleMouseMove = (e: any) => {
  let event = e
  if(e.targetTouches){
    event = e.targetTouches[0]
  }
  if (shouldTransition.value) {
    setTimeout(() => {
      shouldTransition.value = false
    }, 300)
  }
  pointerX.value = event.clientX - cardLeft
  pointerY.value = event.clientY - cardTop


  const posX = (event.clientX - cardLeft) - cardRef.value.offsetWidth / 2;
  const posY = (event.clientY - cardTop) - cardRef.value.offsetHeight / 2
  rotateX.value = posY / 10
  rotateY.value = -posX / 10
}
const handleMouseLeave = () => {
  shouldTransition.value = true
  rotateX.value = 0
  rotateY.value = 0
  setTimeout(() => {
    shouldTransition.value = false
  }, 200)
  isHover.value = false
}
</script>

<style scoped lang="scss">
.card-wrapper {
  perspective: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 512px;
  transform: scale(0.8);
  position: relative;
}

.game-card {
  --pointer-x: 0;
  --pointer-y: 0;
  --img-url:'';
  --foil-img-url:'';
  width: 367px;
  height: 512px;
  background-image: var(--img-url);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform-origin: center center;
  border-radius: 15px;
  will-change: trasform;
  overflow: hidden;


  .shine {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background:  radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.6) 0, transparent 70%,transparent 100%);
    transition: opacity 0.2s ease-out;
    will-change: background;
  }
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: var(--foil-img-url);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    mask: radial-gradient(circle at var(--pointer-x) var(--pointer-y), #fff 0, transparent,var(--radial-size),transparent 100%);
    filter: brightness(0.55) contrast(1.5) saturate(1);
    mix-blend-mode: color-dodge;
    will-change: mask, background, filter;
  }
}
.notice {
  position: absolute;
  bottom: -40px;
}
</style>
