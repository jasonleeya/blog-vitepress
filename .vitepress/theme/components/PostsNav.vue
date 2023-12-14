<script setup lang="ts">
import {usePosts} from "../../hooks/usePosts.ts";
import {Document, Menu, PriceTag, Clock} from "@element-plus/icons-vue";
import {ref,shallowRef} from "vue";
import axios from "axios";
import {formatDate} from "../../utils";
import {withBase} from "vitepress";

enum Type {
  all = 'all',
  tag = 'tag',
  category = 'category',
  time = 'time'
}

const {total, tagsCount, categoriesCount, hotList} = usePosts()
const typeList = ref([
  {
    type: Type.all,
    name: '文章',
    icon:shallowRef(Document) ,
    count: total
  },
  {
    type: Type.category,
    name: '分类',
    icon: shallowRef(Menu),
    count: categoriesCount
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
    padding: 10px;

    .hot-posts {
      &-title {
        font-size: 12px;
        display: flex;
        margin-bottom: 5px;
        color: var(--el-text-color-primary);

        .icon{
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
          &-text{
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
  }
}

.icon.price-tag {
  transform: rotate(45deg);
}
</style>
