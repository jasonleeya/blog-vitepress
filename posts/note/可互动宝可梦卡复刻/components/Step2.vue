<!--
 * @Author: 李双江
 * @Date: 2025/5/4 17:29:29
 * @LastEditors: 李双江
 * @LastEditTime: 2025/5/4 17:29:29
 * @Description:
-->
<template>
  <div class="card-wrapper">
    <div class="game-card"
         v-if="isShow"
         ref="cardRef"
         :style="{transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}"
         @mousemove="handleMouseMove">
      <div class="shine"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";

let cardLeft = 0
let cardTop = 0
const cardRef = ref()

/*onMounted(() => {
  const bcr = cardRef.value.getBoundingClientRect()
  cardLeft = bcr.left
  cardTop = bcr.top
})*/
const isShow = ref(false)
setTimeout(async () => {
  isShow.value = true
  await nextTick()
  const bcr = cardRef.value.getBoundingClientRect()
  cardLeft = bcr.left
  cardTop = bcr.top
},500)


const rotateX = ref(0)
const rotateY = ref(0)
const handleMouseMove = (e: MouseEvent) => {

  const posX = (e.pageX - cardLeft) - cardRef.value.offsetWidth / 2;
  const posY = (e.pageY - cardTop) - cardRef.value.offsetHeight / 2
  rotateX.value = posY / 10
  rotateY.value = -posX / 10
}
</script>

<style scoped lang="scss">

.card-wrapper {
  perspective: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: scale(0.8);
}

.game-card {
  width: 367px;
  height: 512px;
  background-image: url("https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2025_05/49_hires.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  overflow: hidden;


  .shine {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
