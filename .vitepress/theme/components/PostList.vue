<script lang="ts" setup>
import {usePosts} from "@/hooks/usePosts.mts";
import {useData} from "vitepress";
import {buildQueryString, formatDate, getQueryParams} from "@/utils";
import {ref, watch, computed} from "vue";
import Tag from "@components/Tag.vue";
import {useIsMobile} from "@/hooks/useIsMobile.mts";

const {postList} = usePosts()
const globalAuthor = useData().theme.value.author

const currentPage = ref(1)
const pageSize = 10

const prevQuery = getQueryParams(window.location.href)
const currentPageChange = (page: number) => {
  prevQuery.page = String(page)
  history.pushState('', '', window.location.pathname+'?'+buildQueryString(prevQuery));
}
const currentPageFromQuery = window.location.search.match(/[?&]page=(\d+)/)
if (currentPageFromQuery) {
  currentPage.value = parseInt(currentPageFromQuery[1])
}

const _postList = computed(() => postList.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
watch(postList, () => {
  currentPage.value = 1
  currentPageChange(1)
}, {deep: true})
const {getTagColorByName} = usePosts()

const isMobile = useIsMobile()

</script>

<template>
  <div class="post-list">
    <a v-for="item in _postList" v-if="!isMobile" :href="item.path" class="card post">
      <div class="card-left">
        <div class="title"><span v-if="item.sticky" class="top">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <path
        d="M256 74.67a53.33 53.33 0 1 0 0 106.67h512a53.33 53.33 0 1 0 0-106.67H256zM549.72 260.945a53.33 53.33 0 0 0-75.43 0l-256 256a53.33 53.33 0 0 0 75.43 75.437l165.12-165.12V896a53.33 53.33 0 1 0 106.67 0V427.61l164.78 164.78a53.33 53.33 0 0 0 75.43-75.44l-256-256z"
        fill="#ff7426"/></svg>
          置顶</span>{{ item.title }}
        </div>
        <div class="description">{{ item.description }}</div>
        <div class="footer">
          <div class="footer-left">
            <div class="author split">{{ item.author || globalAuthor }}</div>
            <div class="time split">{{ formatDate(item.updateTime, 'yyyy-MM-dd') }}</div>
            <div class="category">{{ item.category }}</div>
          </div>
          <div class="tags">
            <tag v-for="(tag,index) in item.tags" :key="index"
                 :background-color="getTagColorByName(tag)?.backgroundColor"
                 :color="getTagColorByName(tag)?.color"
                 :text="tag"/>
          </div>
        </div>
      </div>
      <img v-if="item.cover||item.imgs.length" :src="item.cover?item.cover:item.imgs[0]" alt="" class="cover">
    </a>

    <a v-for="item in _postList" v-else :href="item.path" class="post-mobile">
      <div class="content">
        <div class="content-left">
          <div class="title"><span v-if="item.sticky" class="top">
      <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <path
        d="M256 74.67a53.33 53.33 0 1 0 0 106.67h512a53.33 53.33 0 1 0 0-106.67H256zM549.72 260.945a53.33 53.33 0 0 0-75.43 0l-256 256a53.33 53.33 0 0 0 75.43 75.437l165.12-165.12V896a53.33 53.33 0 1 0 106.67 0V427.61l164.78 164.78a53.33 53.33 0 0 0 75.43-75.44l-256-256z"
        fill="#ff7426"/></svg>
            置顶</span>{{ item.title }}
          </div>
          <div class="description">{{ item.description }}</div>
        </div>
        <img v-if="item.cover||item.imgs.length"  :src="item.cover?item.cover:item.imgs[0]" alt="" class="cover">
      </div>
      <div class="footer">
        <div class="time split">{{ formatDate(item.updateTime, 'yyyy-MM-dd') }}</div>
        <div class="category">{{ item.category }}</div>
        <div class="tags">
          <tag v-for="(tag,index) in item.tags" :key="index" :background-color="getTagColorByName(tag)?.backgroundColor"
               :color="getTagColorByName(tag)?.color"
               :text="tag"/>
        </div>
      </div>
    </a>
  </div>

  <div v-if="postList.length>pageSize" class="pagination-wrapper">
    <el-pagination v-model:current-page="currentPage"
                   :page-size="pageSize"
                   :total="postList.length"
                   background
                   class="pagination"
                   layout="prev, pager, next"
                   small
                   @current-change="currentPageChange"/>
  </div>
</template>

<style lang="scss" scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: calc(100vh - 320px);
}

.post {
  display: flex;
  gap: 15px;
  cursor: pointer;
  background-color: var(--card-bg);

  .card-left {
    flex: 1;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--el-text-color-primary);
    }

    .description {
      color: var(--el-text-color-secondary);
      font-size: 15px;
      margin-bottom: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 48px;
    }
  }

  .cover {
    flex-shrink: 0;
    width: 166px;
    height: 110px;
    object-fit: cover;
    border-radius: 4px;
  }

  .footer {
    display: flex;
    justify-content: space-between;

    .category {
      color: var(--el-text-color-regular);
      font-weight: bold;
    }

    &-left {
      display: flex;
      color: var(--el-text-color-secondary);
      font-size: 13px;
      white-space: nowrap;

      .split {
        margin-right: 20px;
        position: relative;

        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 1px;
          height: 10px;
          background-color: currentColor;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    .tags {
      flex: 1;
      margin-left: 5px;
    }
  }
}

.post-mobile {
  padding-bottom: 15px;
  margin: 0 15px;
  box-sizing: border-box;
  width: calc(100vw - 30px);
  border-bottom: 1px solid var(--el-border-color);

  .content {
    display: flex;

    .content-left {
      flex: 1;
      margin-right: 10px;

      .title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--el-text-color-primary);
      }

      .description {
        color: var(--el-text-color-secondary);
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 48px;
      }
    }

    .cover {
      width: 100px;
      height: 75px;
      border-radius: 4px;
      object-fit: cover;
    }
  }

  .footer {
    display: flex;
    color: var(--el-text-color-secondary);
    font-size: 12px;
    white-space: nowrap;
    margin-top: 10px;

    .category, .time {
      height: 20px;
      line-height: 20px;
    }

    .category {
      color: var(--el-text-color-regular);
      font-weight: bold;
    }

    .tags {
      margin-left: 5px;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      align-items: center;
    }

    .split {
      margin-right: 20px;
      position: relative;

      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        height: 10px;
        background-color: currentColor;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
}

.pagination {
  margin-top: 20px;
}

.top {
  display: inline-flex;
  font-size: 12px;
  align-items: center;
  background-color: #fff7e8;
  color: #ff7426;
  padding: 0 4px;
  margin-right: 4px;
  border-radius: 4px;
}
</style>
