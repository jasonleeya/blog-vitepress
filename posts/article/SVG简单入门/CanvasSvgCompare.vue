<script setup>
import {onMounted, ref} from "vue";

const canvasRef = ref();
onMounted(() => {
  const canvas = canvasRef.value;// [!code focus:8]
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeWidth = 1;
  ctx.arc(50, 50, 10, 0, 2 * Math.PI);
  ctx.stroke();
})
</script>

<template>
  <div class="wrapper">
    <el-card class="card">
      <canvas id="canvas" ref="canvasRef"></canvas><!--// [!code focus]-->
    </el-card>
    <el-card class="card">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><!--// [!code focus:3]-->
        <circle cx="50" cy="50" r="10" stroke="black" stroke-width="1" fill="none"/>
      </svg>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.wrapper{
  display: flex;
  gap: 20px;
}
.card{
  width: fit-content;
}
#canvas{
  width: 100px;
  height: 100px;
  transform: scale(5)/* [!code focus]*/
}
svg{
  transform: scale(5)/* [!code focus]*/
}
</style>
