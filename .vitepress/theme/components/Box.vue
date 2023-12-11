<script setup lang="ts">

</script>

<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
  .box{
    position: relative;
    padding: 10px;
    border-radius: 0.25rem;
    box-shadow:  0 1px 8px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    transition: all .3s;
    background-color: #fff;
    &:hover{
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .2);;
    }
  }
</style>
