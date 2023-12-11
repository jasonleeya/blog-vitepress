<script setup lang="ts">
import {usePosts} from "../../hooks/usePosts.ts";
import {useData} from "vitepress";
import Box from './Box.vue'

const {postList} = usePosts()
const globalAuthor = useData().theme.value.author
</script>

<template>
  <div class="post-list">
    <box class="post" v-for="item in postList">
      <div class="card-left">
        <div class="title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
        <div class="infos">
          <div class="author">{{ item.author || globalAuthor }}</div>
          <div class="time">{{ item.date }}</div>
          <div class="tags">
            <div class="tag" v-for="tag in item.tags">{{ tag }}</div>
          </div>
        </div>
      </div>
      <img class="cover" :src="item.cover" alt="" v-if="item.cover">
    </box>
  </div>
</template>

<style scoped lang="less">
.post-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.post {
  display: flex;

  .card-left {
    flex: 1;
  }

  .cover {
    flex-shrink: 0;
    width: 120px;
    height: 80px;
    object-fit: cover;
  }
}
</style>
