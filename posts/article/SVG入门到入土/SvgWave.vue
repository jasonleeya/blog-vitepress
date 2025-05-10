<script setup>
import {onUnmounted, ref} from "vue";

let process = 0.005
let sign = 1
const baseFrequency = ref('0.005 0.005')

let raf
function animate() {
  process += 0.0005 * sign
  if (sign === 1 && process > 1) {
    sign = -1
  }
  if (sign === -1 && process < 0) {
    sign = 1
  }
  baseFrequency.value = `${process * 0.005 + 0.015} ${process * 0.05 + 0.1}`
  raf = requestAnimationFrame(animate)
}

requestAnimationFrame(() => {
  animate()
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div id="wave-container">
    <div id="water"></div>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg">
    <filter id="turbulence" filterUnits="objectBoundingBox" x="0" y="0" width="100%" height="100%">
      <feTurbulence id="feturbulence" type="fractalNoise" numOctaves="3" seed="2"
                    :baseFrequency="baseFrequency"></feTurbulence>
      <feDisplacementMap xChannelSelector="G" yChannelSelector="B" scale="20" in="SourceGraphic"></feDisplacementMap>
    </filter>
  </svg>
</template>

<style lang="scss" scoped>
#wave-container,
#water {
  background-image: url("https://cdn.jsdelivr.net/gh/lsj97Blog/imgs@master/imgs/2024_01/lake.jpg");
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

#wave-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  aspect-ratio: 550/412;
  overflow: hidden;
  box-shadow: 0 4px 20px #4f4f4f;
}

#wave-container #water {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 66%;
  filter: url("#turbulence");
}
@media (min-width: 992px) {
  #wave-container{
    height: 412px;
    width: 550px;
    aspect-ratio: unset;
  }
}
</style>
