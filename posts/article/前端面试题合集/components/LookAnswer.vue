<!--
 * @Author: 李双江
 * @Date: 2025/4/30 17:56:00
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/30 17:56:00
 * @Description:
-->
<template>
  <button class="look-answer"><span class="text"><slot></slot></span></button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">


.look-answer {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0 rgba(255, 255, 255, .5),
  7px 7px 20px 0 rgba(0, 0, 0, .1),
  4px 4px 5px 0 rgba(0, 0, 0, .1);
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.look-answer {
  background: linear-gradient(0deg, rgba(255, 151, 0, 1) 0, rgba(251, 75, 2, 1) 100%);
  line-height: 42px;
  padding: 0;
  border: none;
}

.look-answer span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.look-answer:before,
.look-answer:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  background: rgba(251, 75, 2, 1);
  box-shadow: -7px -7px 20px 0 rgba(255, 255, 255, .9),
  -4px -4px 5px 0 rgba(255, 255, 255, .9),
  7px 7px 20px 0 rgba(0, 0, 0, .2),
  4px 4px 5px 0 rgba(0, 0, 0, .3);
  transition: all 0.3s ease;
}

.look-answer:before {
  height: 0;
  width: 2px;
}

.look-answer:after {
  width: 0;
  height: 2px;
}

.look-answer:hover {
  color: rgba(251, 75, 2, 1);
  background: transparent;
}

.look-answer:hover:before {
  height: 100%;
}

.look-answer:hover:after {
  width: 100%;
}

.look-answer span:before,
.look-answer span:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  background: rgba(251, 75, 2, 1);
  box-shadow: -7px -7px 20px 0 rgba(255, 255, 255, .9),
  -4px -4px 5px 0 rgba(255, 255, 255, .9),
  7px 7px 20px 0 rgba(0, 0, 0, .2),
  4px 4px 5px 0 rgba(0, 0, 0, .3);
  transition: all 0.3s ease;
}

.look-answer span:before {
  width: 2px;
  height: 0;
}

.look-answer span:after {
  height: 2px;
  width: 0;
}

.look-answer span:hover:before {
  height: 100%;
}

.look-answer span:hover:after {
  width: 100%;
}
</style>
