<script setup lang="ts">
import {usePosts} from "../../hooks/usePosts.ts";
import {useData} from "vitepress";
import {formatDate} from "../../utils";
import {ref, computed} from "vue";

const {postList} = usePosts()
const globalAuthor = useData().theme.value.author

const currentPage = ref(1)
const pageSize = 10
const currentPageChange = (page: number) => {
  history.pushState('', '', location.pathname + '?page=' + page);
}
const currentPageFromQuery = location.search.match(/[?&]page=(\d+)/)
if (currentPageFromQuery) {
  currentPage.value = parseInt(currentPageFromQuery[1])
}
const _postList = computed(() => postList.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
</script>

<template>
  <div class="post-list">
    <a class="card post" v-for="item in _postList" :href="item.path">
      <div class="card-left">
        <div class="title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
        <div class="footer">
          <div class="footer-left">
            <div class="author split">{{ item.author || globalAuthor }}</div>
            <div class="time">{{ formatDate(item.updateTime, 'yyyy-MM-dd') }}</div>
          </div>
          <div class="tags">
            <div class="tag" v-for="tag in item.tags">{{ tag }}</div>
          </div>
        </div>
      </div>
      <img class="cover" :src="item.cover" alt="" v-if="item.cover">
    </a>
  </div>

  <div class="pagination-wrapper" v-if="postList.length>pageSize">
    <el-pagination layout="prev, pager, next"
                   :total="postList.length"
                   :page-size="pageSize"
                   background
                   small
                   class="pagination"
                   v-model:current-page="currentPage"
                   @current-change="currentPageChange"/>
  </div>
</template>

<style scoped lang="scss">
.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post {
  display: flex;
  gap: 15px;
  cursor: pointer;

  .card-left {
    flex: 1;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #191b1f;
    }

    .description {
      color: #535861;
      font-size: 15px;
      margin-bottom: 5px;
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
  }

  .footer {
    display: flex;
    justify-content: space-between;

    &-left {
      display: flex;
      color: #4e5969;
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
      display: flex;
      overflow-x: auto;

      .tag {
        background-color: #f2f3f5;
        padding: 0 6px;
        border-radius: 2px;
        max-width: 76px;
        box-sizing: border-box;
        margin-left: 6px;
        color: #8a919f;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
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

@media (max-width: 960px) {
  .footer .author{
    display: none;
  }
  .post {
    box-shadow: none;
    padding: 0 0 15px;
    margin: 0 20px;
    border-bottom: 1px solid #eee;
    .cover{
      width: 100px;
      height: 80px;
    }
    .description{
      height: 24px!important;
    }
  }
}
</style>
