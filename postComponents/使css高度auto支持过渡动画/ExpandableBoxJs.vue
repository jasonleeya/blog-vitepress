<script setup lang="ts">
import {ref} from "vue";

const boxRef = ref();
const isExpand = ref(false);
const duration = 200;
const toggle = () => {
  isExpand.value = !isExpand.value;
  if (isExpand.value) {
    boxRef.value.style.height = 'auto';
    requestAnimationFrame(() => {
      //在设置height:auto后下一帧获取元素高度
      const height = boxRef.value.getBoundingClientRect().height || 0;
      //先将元素高度设置为0，再在下一帧设置为上一步获取的高度，这样可以实现0-height的transition
      boxRef.value.style.height = '0px';
      requestAnimationFrame(() => {
        boxRef.value.style.height = height + 'px';
        //在动画结束后，再将元素高度设置为auto
        setTimeout(() => {
          boxRef.value.style.height = 'auto';
        }, duration);
      })
    })
  } else {
    //先获取元素高度，再在下一帧设置为0，这样可以实现height-0的transition
    const height = boxRef.value.getBoundingClientRect().height || 0;
    boxRef.value.style.height = height + 'px';
    requestAnimationFrame(() => {
      boxRef.value.style.height = '0px';
    })
  }
}
</script>

<template>
  <el-button type="primary" class="button" @click="toggle">点击{{isExpand?'收起':'展开'}}</el-button>

  <div class="box" ref="boxRef" :style="{'transition-duration':duration+'ms'}">
    <div class="content">
      <div v-for="item in 10">使css高度auto支持过渡动画</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.button {
  margin-bottom: 20px;
}

.box {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  transition: height 0.5s;
  overflow: hidden;
  height: 0;

  .content {
    padding: 10px;
  }
}
</style>
