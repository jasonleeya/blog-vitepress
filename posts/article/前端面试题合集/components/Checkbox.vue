<!--
 * @Author: 李双江
 * @Date: 2025/4/30 01:26:35
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/30 01:26:35
 * @Description:
-->
<template>
  <el-tooltip
      content="已掌握"
      placement="top-start"
      :disabled="disabled"
  >
    <svg viewBox="-2 -3 22 22" width="30" height="30" @click="handleClick">
      <polyline points="2,2 15,2 15,15 2,15 2,2" fill="none" stroke="#dbdbdb" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></polyline>
      <polyline class="check-line" points="5.5,8.5 9,11.8 17.6,3" fill="none" stroke="#f04d4d" stroke-width="4"
                stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="21"
                :stroke-dashoffset="modelValue?0:21"
                :style="{transition: `stroke-dashoffset ${canAnim?'0.2':'0'}s linear`} "></polyline>
    </svg>
  </el-tooltip>
</template>

<script setup lang="ts">
import { PropType, ref} from "vue";

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
  setTimeout(() => canAnim.value = false, 200)
}
</script>

<style scoped lang="scss">
.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--vp-c-brand);
  border-radius: 4px;
  box-sizing: border-box;
}

.check-line {
  //transition: stroke-dashoffset 0.2s linear;
}
</style>
