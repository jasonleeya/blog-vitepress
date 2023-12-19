<script setup lang="ts">
import PostList from "@components/PostList.vue";
import BlogInfo from "@components/BlogInfo.vue";
import PostsNav from "@components/PostsNav.vue";
import Hero from "@components/Hero.vue";
</script>

<template>
    <hero></hero>
    <div class="content">
      <div class="post-list">
        <post-list></post-list>
      </div>
      <div class="aside">
        <blog-info></blog-info>
        <posts-nav style="margin-top: 20px"></posts-nav>
      </div>
    </div>
</template>

<style scoped lang="scss">
.content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  padding-top: 20px;
  align-items: flex-start;
  .post-list{
    flex: 1;
  }
  .aside {
    width: var(--aside-width);
    flex-shrink: 0;
    position: sticky;
    top: 83px;
  }

}
@media (max-width: 992px) {
  .content{
    width: 100%;
  }
  .aside{
    display: none;
  }
}
</style>
