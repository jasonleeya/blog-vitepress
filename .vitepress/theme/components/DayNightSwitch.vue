<script setup lang="ts">
import {ref, watch,nextTick} from "vue";

const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const switchMode = () => {
  emits('update:modelValue', props.modelValue !== true)
}

//默认主题的切换按钮绑定之为boolean类型，且每次切换时会触发两次，导致动画失效，所以做以下处理
const mode = ref<'day' | 'night'>('day')
watch(() => props.modelValue, (value) => {
  if(value&&mode.value === 'day'){
    nextTick(()=>{
      mode.value = 'night'
    })
  }
  if(!value&&mode.value === 'night'){
    nextTick(()=>{
      mode.value = 'day'
    })
  }
},{immediate: true})
</script>

<template>
  <div class="day-night-switch" @click="switchMode" :class="[mode]">
    <div class="slider">
      <div class="sun-moon">
        <div class="sun"></div>
        <div class="moon">
          <div class="crater"></div>
        </div>
      </div>
      <div class="light"></div>
    </div>
    <div class="cloud"></div>
    <svg class="stars" xmlns="http://www.w3.org/2000/svg" width="100px" height="40px">
      <defs>
        <path id="stars" d="M0 10 Q10,10 10,0 Q10,10 20,10 Q10,10 10,20 Q10,10 0,10"/>
      </defs>
      <g class="stars" fill="#fff">
        <use xlink:href="#stars" style="transform:translateX(47px) translateY(15px) scale(0.3);"/>
        <use xlink:href="#stars" style="transform:translateX(15px) translateY(5px) scale(0.3);"/>
        <use xlink:href="#stars" style="transform:translateX(38px) translateY(25px) scale(0.2);"/>
        <use xlink:href="#stars" style="transform:translateX(21px) translateY(19px) scale(0.2);"/>
        <use xlink:href="#stars" style="transform:translateX(10px) translateY(24px) scale(0.2);"/>
        <use xlink:href="#stars" style="transform:translateX(8px) translateY(13px) scale(0.1);"/>
        <use xlink:href="#stars" style="transform:translateX(43px) translateY(32px) scale(0.1);"/>
        <use xlink:href="#stars" style="transform:translateX(29px) translateY(14px) scale(0.1);"/>
        <use xlink:href="#stars" style="transform:translateX(33px) translateY(6px) scale(0.1);"/>
        <use xlink:href="#stars" style="transform:translateX(41px) translateY(9px) scale(0.1);"/>
        <use xlink:href="#stars" style="transform:translateX(15px) translateY(32px) scale(0.1);"/>
        <use xlink:href="#stars" style="transform:translateX(28px) translateY(31px) scale(0.1);"/>
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.day-night-switch {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  position: relative;
  background: #3679AE;
  cursor: pointer;
  transition: background-color 0.3s;
  overflow: hidden;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0 -2px 2px rgba(1, 13, 61, 0.42), 0 2px 2px #d2d2d2;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 20px;
    box-shadow: inset 0 2px 2px #010d3d, inset 0 -2px 2px rgba(0, 0, 0, 0.3);
  }

  .slider {
    width: 30px;
    height: 30px;
    position: absolute;
    transform: translateX(0);
    transition: transform 0.3s;
    z-index: 2;

    .sun-moon, .sun, .moon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .sun-moon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      box-shadow: inset 2px 2px 2px #fff, inset -2px -2px 2px #848688, 2px 2px 2px #535456;
      overflow: hidden;

      .sun {
        background: #F0C529;
        box-shadow: inset 2px 2px 2px #fff, inset -2px -2px 2px #848688, 2px 2px 2px #535456;
      }

      .moon {
        background: #C2CBD2;
        box-shadow: inset 2px 2px 2px #fff, inset -2px -2px 2px #9a9a9a;
        position: absolute;
        top: 0;
        transform: translateX(30px);
        transition: transform 0.2s;

        .crater {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background: #939EB0;
          position: absolute;
          left: 5px;
          box-shadow: inset 0 0 2px #59606b;
          top: 12px;

          &:before {
            content: '';
            display: block;
            width: 5px;
            height: 5px;
            border-radius: 2.5px;
            background: #939EB0;
            position: absolute;
            left: 8px;
            box-shadow: inset 0 0 2px #59606b;
            top: -6px;
          }

          &:after {
            content: '';
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background: #939EB0;
            position: absolute;
            left: 12px;
            box-shadow: inset 0 0 2px #59606b;
            top: 6px;
          }
        }
      }
    }

    .light {
      background: rgba(255, 255, 255, 0.45);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.15), 0 0 0 20px rgba(255, 255, 255, 0.15);
    }
  }

  .cloud {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: -30px;
    transition: bottom 0.3s;
    box-shadow: 17px -38px 0 0 #FFF, 8px -24px 0 0 #FFF, -5px -17px 0 0 #FFF, -22px -9px 0 0 #FFF, -37px -10px 0 0 #FFF, -60px -8px 0 5px #FFF, 11px -44px 0 -3px #abc1d9, 6px -33px 0 0 #abc1d9, -5px -29px 0 0 #abc1d9, -23px -19px 0 0 #abc1d9, -43px -19px 0 3px #abc1d9;
  }

  .stars {
    position: absolute;
    left: 10px;
    top: -40px;
    transition: top 0.3s, left 0.3s;
  }

  &.night {
    background: #1D212D;
    box-shadow: 0 -2px 2px rgba(255, 255, 255, 0.5), 0 2px 2px rgba(255, 255, 255, 0.5);

    &:after {
      box-shadow: inset 0 2px 2px #000, inset 0 -2px 2px #000;
    }

    .slider {
      transform: translateX(60px);

      .moon {
        transform: translateX(0);
      }
    }

    .cloud {
      bottom: -130px;
    }

    .stars {
      left: 0;
      top: 0;
    }
  }

  &:hover {
    &.day {
      .slider {
        transform: translateX(2px);
      }

      .cloud {
        bottom: -32px;
      }
    }

    &.night {
      .slider {
        transform: translateX(58px);
      }

      .stars {
        top: -2px;
        left: 1px;
      }
    }
  }
}
</style>
