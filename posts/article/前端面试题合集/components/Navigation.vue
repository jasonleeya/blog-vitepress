<!--
 * @Author: 李双江
 * @Date: 2025/4/29 02:26:40
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/29 02:26:40
 * @Description:
-->
<template>
  <div class="mst_container">
    <a class="mst_box" href="./read">
      <div class="mst_icon"><span class="mst_read">📖</span></div>
      <span class="mst_name">阅读模式</span>
      <span class="mst_desc">文档阅读，查漏补缺</span>
    </a>
    <a class="mst_box" href="./practice">
      <div class="mst_icon">📝</div>
      <span class="mst_name">练习模式</span>
      <span class="mst_desc">实战练习，展现实力</span>
    </a>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">

.mst {
  &_container {
    display: flex;
    gap: 10px;
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

    &:hover {
      box-shadow: 0 0 0 2px var(--vp-c-default-soft);
    }
  }

  &_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 6px;
    background-color: var(--vp-c-default-soft);
    width: 48px;
    height: 48px;
    font-size: 24px;
    transition: background-color .25s;
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
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
  }
}

</style>
