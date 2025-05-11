<!--
 * @Author: 李双江
 * @Date: 2025/4/30 03:05:12
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/30 03:05:12
 * @Description:
-->
<template>
  <el-tooltip
      content="收藏"
      placement="top-start"
      :offset="5"
      :disabled="disabled"
  >
    <div class="wrapper" @click="handleClick" v-bind="$attrs">
      <div id="favorite" class="fave" :class="{animate:modelValue}"
           :style="{transition: `background ${canAnim&&modelValue ? 800 : 0}ms steps(55)`}"></div>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const canAnim = ref(false)
const handleClick = () => {
  canAnim.value = true
  emit('update:modelValue', !props.modelValue)
  setTimeout(() => canAnim.value = false, 800)
}
</script>

<style scoped lang="scss">

.wrapper {
  position: relative;
}

.fave {
  width: 60px;
  height: 45px;
  background: url(https://file.lsj97.com/imgs/2025_04/add-to-favorites.png) 0, 0;
  transform: scale(0.9) translateY(-2px);

  &:hover {
    cursor: pointer;
  }

  &.animate {
    background-position: -3519px 0;
    //transition: background .8s steps(55);
  }
}


</style>
