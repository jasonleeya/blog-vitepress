<script setup lang="ts">
import {PropType} from 'vue'

defineProps({
  open: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  duration: {
    type: Number as PropType<number>,
    default: 300
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical' | 'both'>,
    default: 'vertical'
  },
  justifyContent: {
    type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
    default: 'right'
  }
})

</script>

<template>
  <div class="collapsible-box" :class="{expand:open,[direction]:true}" :style="{'--duration':duration + 'ms',justifyContent}">
    <div class="collapsible-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collapsible-box {
  display: grid;
  --duration: 300ms;
  transition: grid-template-columns var(--duration), grid-template-rows var(--duration);
  &-content {
    overflow: hidden;
  }

  &.vertical {
    grid-template-rows: 0fr;

    &.expand {
      grid-template-rows: 1fr;
    }
  }

  &.horizontal {
    grid-template-columns: 0fr;

    &.expand {
      grid-template-columns: 1fr;
    }
  }
  &.both {
    grid-template-columns: 0fr;
    grid-template-rows: 0fr;
    &.expand {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
  }
}
</style>
