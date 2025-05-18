<!--
 * @Author: 李双江
 * @Date: 2025/4/29 02:26:40
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/29 02:26:40
 * @Description:
-->
<template>
  <div class="start_container">
    <a class="start_box" href="./practice">
      <span class="start_name">点击开始刷题</span>
      <span class="start_desc">LET`S GO🚀</span>
    </a>
  </div>

</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">

.start {
  &_container {
    display: flex;
    gap: 16px;
  }

  &_box {
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color .25s, background-color .25s;
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none !important;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
      box-shadow: 0 0 0 2px var(--vp-c-default-soft);
    }
  }

  &_read {
    margin-bottom: 5px;
  }

  &_name {
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
  }

  &_desc {
    flex-grow: 1;
    padding-top: 8px;
    line-height: 24px;
    font-size: 18px;
    font-weight: bold;
    font-family: serif;
    font-style: italic;
  }
}

</style>
