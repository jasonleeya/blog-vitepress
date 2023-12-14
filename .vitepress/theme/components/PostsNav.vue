<script setup lang="ts">
import {usePosts} from "../../hooks/usePosts.ts";
import {Document, Menu, PriceTag, Clock} from "@element-plus/icons-vue";
import {ref, shallowRef} from "vue";
import {formatDate} from "../../utils";
import {withBase} from "vitepress";
import Tag from "./Tag.vue";

enum Type {
  all = 'all',
  tag = 'tag',
  category = 'category',
  time = 'time'
}

const {total, tagsCount, categoryStatistics, getPostsByCategory, hotList, tags, getPostByTag} = usePosts()
const typeList = ref([
  {
    type: Type.all,
    name: '文章',
    icon: shallowRef(Document),
    count: total
  },
  {
    type: Type.category,
    name: '分类',
    icon: shallowRef(Menu),
    count: categoryStatistics.length
  },
  {
    type: Type.tag,
    name: '标签',
    icon: shallowRef(PriceTag),
    count: tagsCount
  },
  {
    type: Type.time,
    name: '时间轴',
    icon: shallowRef(Clock),
    count: 0
  }
])
const currentType = ref(typeList.value[0])

const currentCategory = ref<Category | undefined>()
const changeCategory = (item: Category) => {
  if (currentCategory.value?.name === item.name) {
    currentCategory.value = undefined
  } else {
    currentCategory.value = item
  }

  getPostsByCategory(currentCategory.value?.name)
}

const currentTag = ref<string | undefined>()
const changeTag = (tag: string) => {
  if (currentTag.value === tag) {
    currentTag.value = undefined
  } else {
    currentTag.value = tag
  }
  getPostByTag(currentTag.value)
}
</script>

<template>
  <div class="posts-nav card">
    <div class="types">
      <el-tooltip
          v-for="item in typeList"
          effect="dark"
          :content="item.name"
          placement="top">
        <div class="type" @click="currentType = item" :class="{current: currentType.type === item.type}">
          <el-icon class="icon" :class="item.icon.__name">
            <component :is="item.icon"/>
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div class="title">
      <el-icon class="icon" :class="currentType.icon.__name">
        <component :is="currentType.icon"/>
      </el-icon>
      <span class="title-text" v-if="currentType.count">{{ currentType.count }}</span>{{ currentType.name }}
    </div>
    <div class="content">
      <div v-if="currentType.type === Type.all" class="hot-posts">
        <div class="hot-posts-title"><img class="icon" :src="withBase('/images/hot.svg')" alt="">热门文章</div>
        <div class="hot-post-wrapper">
          <div class="hot-post" v-for="(item,index) in hotList" :key="index">
            <el-link class="hot-post-title" :href="item.path">
              <span class="index">{{ index + 1 }}</span>
              <div class="hot-post-title-text" :title="item.title">{{ item.title }}</div>
            </el-link>
            <div class="hot-post-time">{{ formatDate(item.updateTime, 'yyyy-MM-dd') }}</div>
          </div>
        </div>
      </div>
      <div v-if="currentType.type === Type.category" class="categories">
        <div class="category" v-for="item in categoryStatistics"
             :key="item.name" @click="changeCategory(item)" :class="{current: currentCategory?.name === item.name}">
          <img class="icon" :src="item.icon" alt="">
          <div class="category-label">{{ item.name }}</div>
          <div class="category-value">{{ item.count }}</div>
        </div>
      </div>
      <div v-if="currentType.type === Type.tag" class="tags">
        <tag :text="item" v-for="item in tags" :key="item" @click="changeTag(item)"
             :background-color="currentTag === item ? '#eaf2ff' : undefined"
             :color="currentTag === item ? '#1e80ff' : undefined">{{ item }}
        </tag>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.posts-nav {
  width: 300px;
  padding-top: 20px;

  .types {
    display: flex;
    justify-content: space-around;

    .type {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      cursor: pointer;
      transition: all .3s;

      &.current {
        background-color: var(--vp-c-brand);
        color: #fff;
      }

      .icon {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .title {
    font-size: 17px;
    display: flex;
    align-items: center;
    margin: 20px 0 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    gap: 5px;
    border-bottom: 1px solid #eee;
  }

  .content {
    .hot-posts {
      padding: 10px;

      &-title {
        font-size: 12px;
        display: flex;
        margin-bottom: 5px;
        color: var(--el-text-color-primary);

        .icon {
          width: 14px;
          margin-right: 5px;
        }
      }

      .hot-post {
        &:nth-child(1) {
          .index {
            color: #F56C6C;
          }
        }

        &:nth-child(2) {
          .index {
            color: #f5ba6c;
          }
        }

        &:nth-child(3) {
          .index {
            color: #f1e44a;
          }
        }

        &-title {
          font-size: 14px;
          color: var(--el-text-color-primary);


          .index {
            margin-right: 15px;
            font-size: 16px;
            font-weight: bold;
            color: var(--el-text-color-secondary);
            font-style: italic;
          }

          &-text {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &-time {
          font-size: 12px;
          color: var(--el-text-color-secondary);
          padding-left: 25px;
        }
      }
    }

    .categories {
      .category {
        display: flex;
        align-items: center;
        width: 100%;
        height: 45px;
        border-radius: 4px;
        padding: 0 10px;
        color: var(--vp-c-text-1);

        &-label {
          font-size: 16px;
          margin-right: auto;
        }

        &-value {
          font-size: 16px;
        }

        .icon {
          width: 20px;
          margin-right: 10px;
        }

        &.current {
          color: #1e80ff;
          background-color: #eaf2ff;
          overflow: hidden;

          .icon {
            transform: translateX(-100px);
            filter: drop-shadow(100px 0px #1e80ff);
          }
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
}

.icon.price-tag {
  transform: rotate(45deg);
}
</style>
