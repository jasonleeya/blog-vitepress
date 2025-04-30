<!--
 * @Author: 李双江
 * @Date: 2025/4/29 16:17:32
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/29 16:17:32
 * @Description:
-->
<template>
  <div class="category-head">
    <back :link="props.link"/>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import Back from "./Back.vue";

const props = defineProps({
  link: {
    type: [String, undefined],
    default: undefined
  }
})
</script>

<style scoped lang="scss">
.category-head {
  position: sticky;
  background: var(--vp-c-bg);
  top: 120px;
  padding-top: 80px;
  transform: translateY(-120px);
  z-index: 9;
}

@media (max-width: 992px) {
  .category-head {
    top: 80px;
    padding-top: 10px;
    transform: translateY(-35px);
    width: calc(100vw - 7px);
    margin-left: -20px;
    padding-left: 15px;
  }
}

</style>
