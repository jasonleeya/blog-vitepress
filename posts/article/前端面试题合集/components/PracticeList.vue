<!--
 * @Author: 李双江
 * @Date: 2025/4/28 20:00:55
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/28 20:00:55
 * @Description:
-->
<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="display: none">
    <filter id="grayscale">
      <feColorMatrix type="matrix"
                     values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
    </filter>
  </svg>
  <nav-head :link="isPracticing?'':'/posts/article/前端面试题合集'"
            @click="()=>{isPracticing = false;getUserAnswerData()}">
    <div class="tab-container" ref="containerRef" @wheel="handleWheel">
      <div class="item" v-for="item in categoryList" :key="item.category" :style="{order:item.order}"
           @click="handleTabClick(item.category)"
           :id="item.category"
           :class="{active: item.category === currentCategory}">
        <img class="icon"
             :src="`https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2025_04/${item.category}.png`"
             alt="">
        <span class="category-name">{{ item.category }}</span>
        <span class="count">（{{ item.count }}）</span>
      </div>
    </div>
    <el-icon class="icon-right" @click="handleRightIconClick">
      <DArrowLeft/>
    </el-icon>
  </nav-head>
  <div class="content-wrapper">
    <div class="question-list" v-if="!isPracticing">
      <div v-for="(item,index) in questionList" class="question" @click="handleClickQuestion(index)"
           :title="item.title">{{ index + 1 }}.&nbsp;
        <span class="title">{{ item.title }}</span>
        <div class="icons">
          <collect :style="{width: isMobile?'52px':''}" :disabled="true"
                   :model-value="userAnswerData[item.title]?.isCollected"></collect>
          <checkbox :disabled="true" :model-value="userAnswerData[item.title]?.isLearned"></checkbox>
        </div>
      </div>
    </div>
    <practice v-else></practice>
  </div>
</template>

<script setup lang="ts">
import NavHead from "./NavHead.vue";
import {onMounted, ref, watchEffect} from "vue";
import Practice from "./Practice.vue";
import {useQuestion} from "../hooks";
import Collect from "./Collect.vue";
import Checkbox from "./Checkbox.vue";
import {useIsMobile} from "../../../../.vitepress/hooks/useIsMobile";

const isMobile = useIsMobile();
const containerRef = ref();
let {
  categoryList,
  currentCategory,
  questionList,
  currentIndex,
  isPracticing,
  userAnswerData,
  getUserAnswerData
} = useQuestion()

// category tab滚动到中间
const handleScrollToCenter = (element: HTMLElement) => {
  const elementBCR = element.getBoundingClientRect();
  const containerBCR = containerRef.value.getBoundingClientRect();
  const elementXCenter = elementBCR.left + elementBCR.width / 2;
  const containerXCenter = containerBCR.left + containerBCR.width / 2;
  const containerWidth = containerRef.value.offsetWidth;
  if (elementXCenter < containerXCenter) {
    containerRef.value.scrollTo({
      left: containerRef.value.scrollLeft - containerWidth / 4,
      behavior: 'smooth'
    })
  } else {
    containerRef.value.scrollTo({
      left: containerRef.value.scrollLeft + containerWidth / 4,
      behavior: 'smooth'
    })
  }
}

const handleTabClick = (category: string) => {
  const element = document.getElementById(category);
  handleScrollToCenter(element)

  currentCategory.value = category;
  isPracticing.value = false
  getUserAnswerData()
}


// 如果url有category, 自动滚动到对应的tab上
onMounted(() => {
  const categoryEl = document.getElementById(currentCategory.value);
  if (categoryEl) {
    categoryEl.scrollIntoView({block: 'center'});

    handleScrollToCenter(categoryEl)
  }
})

const handleRightIconClick = () => {
  containerRef.value.scrollTo({
    left: containerRef.value.scrollLeft + containerRef.value.offsetWidth / 4 * 3,
    behavior: 'smooth'
  })
}
const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  const containerWidth = containerRef.value.offsetWidth;
  if (e.deltaY < 0) {
    containerRef.value.scrollTo({
      left: containerRef.value.scrollLeft - containerWidth / 2,
      behavior: 'smooth'
    })
  } else {
    containerRef.value.scrollTo({
      left: containerRef.value.scrollLeft + containerWidth / 2,
      behavior: 'smooth'
    })
  }
}

const handleClickQuestion = (index) => {
  currentIndex.value = index
  isPracticing.value = true
}

</script>

<style scoped lang="scss">
.tab-container {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 15px 40px 15px 0;
  position: relative;
  margin-top: -10px;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    background: var(--vp-c-bg-soft);
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    padding-right: 5px;
    border-radius: 20px;
    color: var(--vp-c-text-2);
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    &.active {
      background: #000a20;
      color: #fff;

      .icon {
        filter: url(#grayscale) brightness(5);
      }
    }

    .count {
      color: var(--vp-c-text-3);
    }
  }
}

.icon-right {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #6a6e75;
  z-index: 9;
  width: 50px;
  height: 70px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--vp-c-bg) 40%, var(--vp-c-bg) 100%);
  padding-left: 10px;
  cursor: pointer;
}

.content-wrapper {
  margin-top: -95px;
}

@media (max-width: 992px) {
  .content-wrapper {
    margin-top: -25px;
  }
}

.question-list {
  .question {
    background: var(--vp-c-bg-soft);
    height: 44px;
    line-height: 44px;
    padding-left: 15px;
    padding-right: 5px;
    border-radius: 10px;
    color: var(--pure-black-text);
    font-size: 16px;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    display: flex;
    user-select: none;

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icons {
      margin-left: auto;
      display: flex;
      align-items: center;
      padding-right: 10px;
      transform: scale(0.8);
    }

    &:hover {
      color: var(--vp-c-brand);
      text-decoration: underline;
    }

    &:nth-child(2n) {
      background: transparent;
    }
  }

  @media (max-width: 992px) {
    .question {
      padding-left: 10px;
      padding-right: 0;

      .icons {
        padding-right: 0;
      }
    }
  }
}

</style>
