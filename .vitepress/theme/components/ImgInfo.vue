<script lang="ts" setup>
import CollapsibleBox from "@components/CollapsibleBox.vue";
import {ArrowLeftBold, ArrowRightBold, Location} from "@element-plus/icons-vue";
import {PropType, ref} from "vue";
import {useIsMobile} from "@/hooks/useIsMobile";

defineProps({
  info: {
    type: Object as PropType<BingImg>,
  },
  changeImg: {
    type: Function as PropType<(direction: 1 | -1) => void>,
    required: true
  }
})
const isMobile = useIsMobile()

const isInfoShow = ref(!isMobile.value)
const toggleInfoShow = () => {
  isInfoShow.value = !isInfoShow.value
}
</script>

<template>
  <collapsible-box :class="{mobile:isMobile}" :open="isInfoShow" class="img-info" direction="both">
    <div :class="{close:!isInfoShow}" class="switch" @click="toggleInfoShow"></div>
    <div v-if="info?.url" class="wrapper">
      <div class="title">
        <span>{{ info?.locales.zh?.headline }}</span>
        <div v-if="isInfoShow" class="change-img">
          <el-icon class="icon" color="#fff" @click="changeImg(-1)">
            <ArrowLeftBold/>
          </el-icon>
          <el-icon class="icon" color="#fff" @click="changeImg(1)">
            <ArrowRightBold/>
          </el-icon>
        </div>

      </div>
      <div class="description">{{ info?.locales.zh?.description }}</div>
      <div class="copyright">{{ info?.locales.zh?.copyright }}</div>
      <div class="address">
        <el-icon>
          <Location/>
        </el-icon>
        {{ info?.locales.zh?.title }}
      </div>
    </div>
  </collapsible-box>
</template>

<style lang="scss" scoped>
.img-info {
  margin: 20px;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: #00000080;
  font-weight: 400;
  line-height: 1.25;
  cursor: default;
  color: #fff;
  z-index: 9;
  min-width: 40px;
  min-height: 40px;
  position: relative;

  .wrapper {
    width: 650px;
    overflow: hidden;
  }

  .switch {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 99;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 20px;
      background-color: #fff;
      border-radius: 1px;
      transform: translate(-50%, -50%) rotate(45deg);
      transition: all 0.3s;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 20px;
      background-color: #fff;
      border-radius: 1px;
      transform: translate(-50%, -50%) rotate(-45deg);
      transition: all 0.3s;
    }

    &.close {
      &:before {
        height: 13px;
        transform: translate(calc(-50% - 2px), calc(-50% - 4px)) rotate(45deg);
      }

      &:after {
        height: 13px;
        transform: translate(calc(-50% - 2px), calc(-50% + 4px)) rotate(-45deg);
      }
    }
  }

  .title {
    border-bottom: 1px solid #fff;
    font-weight: 600;
    font-size: 1.1em;
    padding-bottom: 0.5em;
    position: relative;
  }

  .description {
    font-size: .9em;
    margin-top: 0.5em;
  }

  .copyright {
    padding: 0.5rem 0.25rem;
    color: #aaa;
    font-size: .8em;
  }

  .address {
    display: flex;
    align-items: center;
    gap: 5px;

    .icon {
      width: 16px;
    }
  }

  .change-img {
    position: absolute;
    right: 35px;
    bottom: 0;
    opacity: 0;
    animation: show 1s forwards;
    white-space: nowrap;
    @keyframes show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .icon {
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }

  &.mobile {
    .wrapper {
      //得又确切的宽度
      width: calc(100vw - 56px);
    }
  }
}

</style>
