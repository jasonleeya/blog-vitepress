<script setup lang="ts">
import {useData, withBase} from "vitepress";
import {Link,DocumentCopy} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
const {avatar, author, introduce, medias}: {
  avatar: string,
  author: string,
  introduce: string,
  medias: {
    icon: string
    link: string
    type: string
    qrcodeImg?: string
  }[]
} = useData().theme.value

const copyText = (text: string) => {
  if (!navigator.clipboard) {
    ElMessage.error({
      message: '复制失败, 请手动复制',
    })
  }
  navigator.clipboard.writeText(text)
    .then(() => {
      ElMessage.success({
        message: '复制成功',
      })
    })
}
</script>

<template>
  <div class="blog-info card">
    <img class="avatar" :src="avatar" alt="">
    <div class="name">{{ author }}</div>
    <div class="intro">{{ introduce }}</div>

    <div class="medias">
      <div class="item" v-for="item in medias">
        <el-popover
            placement="bottom"
            :width="200"
            trigger="click"
            v-if="item.type === 'wx'||item.type === 'email'"
        >
          <div style="text-align: center">
            <img :src="item.qrcodeImg" alt="" v-if="item.type === 'wx'">
            <el-link  v-else href="javascript:" @click="copyText(item.link)">{{item.link}}&nbsp<el-icon><DocumentCopy /></el-icon></el-link>
          </div>
          <template #reference>
            <img class="icon" :src="withBase(item.icon)" alt="">
          </template>
        </el-popover>
        <el-link v-else type="primary" :href="item.link" target="_blank" :underline="false"><img class="icon" :src="withBase(item.icon)" alt=""></el-link>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-info {
  width: var(--aside-width);
  color: var(--el-text-color-primary);
  text-align: center;
  background-color: var(--card-bg);

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px auto 0;
  }

  .name {
    margin: 16px 0;
    font-size: 22px;
    font-family: Georgia Pro, Crimson, Georgia, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", STHeiti, "Microsoft YaHei", SimSun, sans-serif;
  }

  .intro {
    font-size: 14px;
    margin: 16px 0;
  }

  .statistics {
    display: flex;
    justify-content: space-around;

    .label {
      font-size: 12px;
      color: rgb(134, 144, 156);
    }

    .value {
      font-size: 20px;
      color: rgb(60, 60, 67);
      font-weight: bold;
    }
  }

  .medias {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 10px 0;

    .icon {
      width: 26px;
      height: 26px;
    }
  }
}
</style>
