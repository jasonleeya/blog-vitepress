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
         @mousemove="handleMouseMove">
      <div class="shine"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleMouseMove = (e: MouseEvent) => {
  console.log(e)
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
  background-image: url("https://file.lsj97.com/imgs/2025_05/49_hires.png");
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
