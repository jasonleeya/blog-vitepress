<script setup lang="ts">
import IconLoading from "@icons/IconLoading.vue";
import {PropType, ref, watch} from "vue";

const isAnim = ref(true)

const props = defineProps({
  modelValue: Boolean as PropType<boolean>
})
const emit = defineEmits(['update:modelValue'])
watch(() => props.modelValue, () => {
  if (props.modelValue) {
    isAnim.value = true
  } else {
    setTimeout(() => {
      isAnim.value = false
    }, 400)
  }
})
</script>

<template>
  <div class="mask" :style="{display:isAnim?'flex':'none'}">
    <div class="loading-wrapper" :style="{'max-width': modelValue?'30vw':'0'}">
      <icon-loading class="loading-icon"></icon-loading>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         viewBox="0 0 1920 1080" class="logo">
      <path fill="#33485D" d="M543.9,454.4c0,0,280.9,295.7,284.8,295.3c3.9-0.5,148.3-142.9,148.3-142.9L836,459l294.5-285.8L986.1,25
	L543.9,454.4z"
            id="logo-left" :class="{'is-anim':!modelValue}"/>
      <path fill="#40B682" d="M977,461.4l143.3,147.7L823.9,894.9l66.4,69.2c41.7,43.4,110.6,44.7,153.9,3L1410,614.9l-288.8-298.3
	C1121.2,316.6,977,461.4,977,461.4z"
            id="logo-right" :class="{'is-anim':!modelValue}"/>
    </svg>
  </div>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--vp-c-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.loading-wrapper {
  transition: max-width 0.2s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-icon {
    width: 20vw;
    min-width: 20vw;
  }
}

.logo {
  height: 7vw;
  width: 100%;
  position: absolute;
}
@include mobile {
  .loading-icon {
    width: 40vw!important;
    min-width: 40vw!important;
  }
  .logo {
    height: 12vw!important;
  }
}

#logo-left {
  transform-origin: center;
  transform: translate(-80%, 200px) rotate(-45deg);

  &.is-anim {
    animation: logo-l 0.4s linear;
  }
}

#logo-right {
  transform-origin: center;
  transform: translate(80%, -300px) rotate(-45deg);

  &.is-anim {
    animation: logo-r 0.4s linear;
  }
}

@keyframes logo-l {
  0% {
    transform: translate(-80%, 200px) rotate(-45deg);
  }
  30% {
    transform: translate(0%, 200px) rotate(-45deg);
  }
  50% {
    transform: translate(0%, 200px) rotate(-45deg);
  }
  100% {
    transform: translate(0%, 0) rotate(0);
  }
}

@keyframes logo-r {
  0% {
    transform: translate(80%, -300px) rotate(-45deg);
  }
  30% {
    transform: translate(0%, -300px) rotate(-45deg);
  }
  50% {
    transform: translate(0%, -300px) rotate(-45deg);
  }
  100% {
    transform: translate(0%, 0) rotate(0);
  }
}
</style>
