<script setup lang="ts">
import {useData, withBase} from "vitepress";
import {DocumentCopy} from "@element-plus/icons-vue";
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
  <div class="blog-info">
    <div class="top">
      <img class="avatar" :src="avatar" alt="">
      <div class="top-right">
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
            <el-link v-else type="primary" :href="item.link" target="_blank" underline="never"><img class="icon" :src="withBase(item.icon)" alt=""></el-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-info {
  width: 100%;
  color: var(--el-text-color-primary);
  text-align: center;
  background-color: transparent;
  margin-bottom: 20px;

  .top{
    display: flex;
    align-items: center;
    gap: 20px;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .top-right{
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: flex-start;
      .name {
        font-size: 22px;
        font-family: Georgia Pro, Crimson, Georgia, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", STHeiti, "Microsoft YaHei", SimSun, sans-serif;
      }

      .intro {
        font-size: 14px;
      }
      .medias {
        display: flex;
        gap: 15px;
        .icon {
          width: 26px;
          height: 26px;
        }
      }

    }
  }

}
</style>
