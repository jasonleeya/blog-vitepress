<script setup lang="ts">
import {usePosts} from "@/hooks/usePosts.mts";
import {formatDate} from "@/utils";
import {ref} from "vue";
import CollapsibleBox from "@components/CollapsibleBox.vue";

const {getPostsByCreateTime} = usePosts()

const postList = getPostsByCreateTime()
const timeLineList = ref<{
  year: number;
  list: PostMeta[],
  isExpand: boolean
}[]>([])
const timeLineMap = new Map<number, PostMeta[]>()
postList.forEach(item => {
  const year = new Date(item.createTime).getFullYear()
  if (timeLineMap.has(year)) {
    timeLineMap.get(year)?.push(item)
  } else {
    timeLineMap.set(year, [item])
  }
})
timeLineList.value.push(...Array.from(timeLineMap.entries()).map(item => {
  return {
    year: item[0],
    list: item[1],
    isExpand: true
  }
}))
</script>

<template>
  <div class="time-line">
    <div v-for="item in timeLineList">
      <div class="year" @click="item.isExpand = !item.isExpand" :class="{expand: item.isExpand}">
        <div class="title">{{ item.year }}</div>
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24"
             height="24">
          <path
              d="M512 725.33a73.39 73.387 0 0 1-56.747-27.31l-179.627-217.6a89.6 89.6 0 0 1-11.093-94.294A75.093 75.09 0 0 1 332.37 341.33h359.254a75.09 75.09 0 0 1 67.84 44.8 89.6 89.6 0 0 1-11.09 94.3l-179.63 217.6A73.39 73.39 0 0 1 512 725.33z"
              fill="#231F20"/>
        </svg>
      </div>
      <collapsible-box :open="item.isExpand" justifyContent="left">
        <div class="item" v-for="post in item.list">
          <div class="time">{{ formatDate(post.createTime, 'MM/dd') }}</div>
          <div class="title"><a :href="post.path">{{ post.title }}</a></div>
        </div>
      </collapsible-box>
    </div>
  </div>
</template>

<style scoped lang="scss">
.time-line {
  margin-right: 5px;

  .year, .item {
    margin-left: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-right: 10px;
    border-left: 1px solid var(--vp-c-brand-4);
    position: relative;

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: var(--card-bg);
      border-radius: 50%;
      border: 2px solid var(--vp-c-brand);
      outline: 4px solid var(--card-bg);
      left: -6px;
      top: 30px;
    }

    .time {
      font-size: 12px;
      color: var(--el-text-color-secondary);
      user-select: none;
    }

    .title {
      font-size: 14px;
      color: var(--el-text-color-primary);
    }

    &:hover {
      .title {
        color: var(--vp-c-brand);
      }

      &:before {
        background-color: var(--el-color-primary);
      }

      .icon path {
        fill: var(--vp-c-brand);
      }
    }
  }

  .year {
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    .title{
      font-weight: bold;
      font-size: 20px;
      color: var(--el-text-color-primary);
      font-family: fantasy;
      cursor: pointer;
      user-select: none;
    }

    &:before {
      width: 16px;
      height: 16px;
      background-color: var(--card-bg);
      border-radius: 50%;
      border: 3px solid var(--vp-c-brand);
      outline: 4px solid var(--card-bg);
      left: -8px;
      top: 24px;
    }

    .icon {
      transform: rotateX(180deg);
      transition: all 0.3s;
    }

    &.expand {
      .icon {
        transform: rotateX(0);
      }
    }
  }

}
</style>
