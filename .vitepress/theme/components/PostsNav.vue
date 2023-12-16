<script lang="ts" setup>
import {usePosts} from "../../hooks/usePosts.ts";
import {Document, Menu, PriceTag, Clock} from "@element-plus/icons-vue";
import {ref, shallowRef} from "vue";
import {formatDate} from "../../utils";
import {withBase} from "vitepress";
import Tag from "./Tag.vue";
import TimeLine from "./TimeLine.vue";

enum Types {
  all = 'all',
  tag = 'tag',
  category = 'category',
  time = 'time'
}

type Type = {
  type: Types,
  name: string
  icon: any
  measureWord: string
  count: number
}

const {
  postsTotal,
  tags,
  getAllPosts,
  getTagColorByName,
  categories,
  groupPostListByCategory,
  getHotPostList,
  groupPostListByTag
} = usePosts()
const typeList = ref<Type[]>([
  {
    type: Types.all,
    name: '文章',
    measureWord: '篇',
    icon: shallowRef(Document),
    count: postsTotal
  },
  {
    type: Types.category,
    name: '分类',
    measureWord: '个',
    icon: shallowRef(Menu),
    count: categories.length
  },
  {
    type: Types.tag,
    name: '标签',
    measureWord: '个',
    icon: shallowRef(PriceTag),
    count: tags.length
  },
  {
    type: Types.time,
    name: '时间轴',
    measureWord: '',
    icon: shallowRef(Clock),
    count: 0
  }
])
const currentType = ref(typeList.value[0])
const currentTypeChange = (type: Type) => {
  currentType.value = type
  currentCategory.value = undefined
  currentTag.value = undefined
  getAllPosts()
}

const hotList = ref<PostMeta[]>([])
getHotPostList().then(res => {
  hotList.value = res || []
})

const currentCategory = ref<Category | undefined>()
const changeCategory = (item: Category) => {
  if (currentCategory.value?.name === item.name) {
    currentCategory.value = undefined
  } else {
    currentCategory.value = item
  }

  groupPostListByCategory(currentCategory.value?.name)
}

const currentTag = ref<string | undefined>()
const changeTag = (tag: string) => {
  if (currentTag.value === tag) {
    currentTag.value = undefined
  } else {
    currentTag.value = tag
  }
  groupPostListByTag(currentTag.value)
}
const mouseOverItem = ref('')
const mouseOver = (item: string) => {
  mouseOverItem.value = item
}
</script>

<template>
  <div class="posts-nav card">
    <div class="types">
      <el-tooltip
          v-for="item in typeList"
          :content="item.name"
          effect="dark"
          placement="top">
        <div :class="{current: currentType.type === item.type}" class="type" @click="currentTypeChange(item)">
          <el-icon :class="item.icon.__name" class="icon">
            <component :is="item.icon"/>
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <div class="posts-nav-title">
      <el-icon :class="currentType.icon.__name" class="icon">
        <component :is="currentType.icon"/>
      </el-icon>
      <span v-if="currentType.count" class="title-text">{{ currentType.count }}</span>{{currentType.measureWord}}{{ currentType.name }}
    </div>
    <el-scrollbar class="posts-nav-content" max-height="calc(100vh - 500px)">
      <div v-show="currentType.type === Types.all" class="hot-posts">
        <div class="hot-posts-title"><img :src="withBase('/images/hot.svg')" alt="" class="icon">热门文章</div>
        <div class="hot-post-wrapper">
          <div v-for="(item,index) in hotList" :key="index" class="hot-post">
            <el-link :href="item.path" class="hot-post-title" :underline="false">
              <span class="index">{{ index + 1 }}</span>
              <div :title="item.title" class="hot-post-title-text">{{ item.title }}</div>
            </el-link>
            <div class="hot-post-time">{{ formatDate(item.updateTime, 'yyyy-MM-dd') }}</div>
          </div>
        </div>
      </div>
      <div v-show="currentType.type === Types.category" class="categories">
        <div v-for="item in categories" :key="item.name"
             :class="{current: currentCategory?.name === item.name}" class="category" @click="changeCategory(item)">
          <img :src="item.icon" alt="" class="icon">
          <div class="category-label">{{ item.name }}</div>
          <div class="category-value">{{ item.count }}</div>
        </div>
      </div>
      <div v-show="currentType.type === Types.tag" class="tags">
        <tag v-for="item in tags"
             :key="item.name"
             :background-color="getTagColorByName(item.name).backgroundColor"
             :color="getTagColorByName(item.name).color"
             :is-active="mouseOverItem === item.name || currentTag === item.name"
             :num="item.count"
             :text="item.name"
             class="tag"
             @click="changeTag(item.name)"
             @mouseleave="mouseOver('')"
             @mouseover="mouseOver(item.name)">{{ item }}
        </tag>
      </div>
      <div v-show="currentType.type === Types.time" class="time-line">
        <time-line></time-line>
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.posts-nav {
  width: var(--aside-width);
  padding-top: 20px;
  background-color: var(--card-bg);

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
      background-color: var(--vp-c-bg-alt);
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

  &-title {
    font-size: 17px;
    display: flex;
    align-items: center;
    margin: 20px 0 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    gap: 5px;
    border-bottom: 1px solid #eee;
  }

  &-content {
    max-height: calc(100vh - 500px);
    overflow-y: auto;

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
            max-width: 170px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:hover {
              color: var(--vp-c-brand);
            }
          }
        }

        &-time {
          font-size: 12px;
          line-height: 1em;
          margin-bottom: 5px;
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
        cursor: pointer;
        margin-bottom: 5px;

        &-label {
          font-size: 16px;
          margin-right: auto;
        }

        &-value {
          font-size: 18px;
          font-style: italic;
        }

        .icon {
          width: 20px;
          margin-right: 10px;
        }

        &.current, &:hover {
          color: var(--vp-c-brand);
          background-color: var(--vp-c-brand-soft);
          overflow: hidden;

          .icon {
            transform: translateX(-100px);
            filter: drop-shadow(100px 0px var(--vp-c-brand));
          }
        }

      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      .tag {
        margin-bottom: 10px;
      }
    }

    .time-line {
    }
  }
}

.icon.price-tag {
  transform: rotate(45deg);
}
</style>
