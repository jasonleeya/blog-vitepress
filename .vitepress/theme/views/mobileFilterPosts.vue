<script setup lang="ts">

import Tag from "@components/Tag.vue";
import {usePosts} from "@/hooks/usePosts.mjs";
import {ref} from "vue";
import PostList from "@components/PostList.vue";

console.log('%c window.location.href ','color:white;background:red',window.location.href)
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const type = params.get("type");
const value = params.get("value");
const {
  tags,
  categories,
  getTagColorByName,
  groupPostListByTag,
  groupPostListByCategory
} = usePosts()

const currentTag = ref<string | undefined>(value)

const changeTag = (tag: string) => {
  if (currentTag.value === tag) {
    currentTag.value = undefined
  } else {
    currentTag.value = tag
  }
  groupPostListByTag(currentTag.value)
}

const currentCategory = ref<string | undefined>(value)
const changeCategory = (category: string) => {
  if (currentCategory.value === category) {
    currentCategory.value = undefined
  } else {
    currentCategory.value = category
  }
  groupPostListByCategory(currentCategory.value)
}

if(type==='tag'){
  groupPostListByTag(currentTag.value)
}else {
  groupPostListByCategory(currentCategory.value)
}
</script>

<template>
  <div class="wrapper">
    <div class="filter tags" v-if="type==='tag'">
      <tag v-for="item in tags"
           :key="item.name"
           :background-color="getTagColorByName(item.name).backgroundColor"
           :color="getTagColorByName(item.name).color"
           :is-active="currentTag === item.name"
           :num="item.count"
           :text="item.name"
           class="tag"
           @click="changeTag(item.name)">{{ item }}
      </tag>
    </div>
    <template v-if="type==='category'">
      <div class="filter categories">
        <div class="category" v-for="item in categories" :key="item.name" @click="changeCategory(item.name)"
             :class="{current:currentCategory===item.name}">
          <img class="icon" :src="item.icon" alt="">
          <div class="name">{{ item.name }}</div>
          <div class="count">{{ item.count }}</div>
        </div>
      </div>
    </template>

    <post-list></post-list>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  box-sizing: border-box;
  padding-bottom: 40px;

  .filter {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 15px;
    position: sticky;
    top: 49px;
    background-color: var(--card-bg);
    z-index: 9;
    box-shadow: var(--el-box-shadow-light);
    margin-bottom: 20px;

    &.tags {
      .tag {
        margin-bottom: 5px;
      }
    }

    &.categories {
      gap: 15px;

      .category {
        display: flex;
        gap: 5px;
        align-items: center;
        padding: 4px 8px;
        background-color: var(--vp-c-bg-alt);
        color: var(--el-text-color-secondary);
        border-radius: 4px;
        overflow: hidden;

        .icon {
          width: 16px;
          height: 16px;
        }

        &.current {
          background-color: var(--vp-c-brand-soft);
          color: var(--vp-c-brand-1);

          .icon {
            transform: translateX(-100px);
            filter: drop-shadow(100px 0px var(--vp-c-brand));
          }
        }
      }
    }
  }
}
</style>
