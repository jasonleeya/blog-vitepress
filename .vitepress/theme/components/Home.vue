<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from 'vue'
import {useData} from "vitepress";
import {ArrowLeftBold, ArrowRightBold, Location, ArrowDownBold} from "@element-plus/icons-vue";
import PostList from "./PostList.vue";

interface BingImg {
  url: string
  locales: {
    zh: {
      title: string
      copyright: string
      description: string
      headline: string
      quickFact: string
    }
  }
}

const bingImgList = ref<BingImg[]>([])
const currentImgIndex = ref(0)

const getBingImg = () => {
  return fetch("https://bing-wallpaper.vuejs.press/api/wallpaper").then((response) => response.json()).then(res => {
    bingImgList.value = res
  })
};
getBingImg()

const changeImg = (direction: 1 | -1) => {
  currentImgIndex.value = (currentImgIndex.value + direction + bingImgList.value.length) % bingImgList.value.length
}

const sentence = ref("")
const author = ref("")

const getSentence = () => fetch("https://v1.hitokoto.cn?c=d&c=h&c=i&c=k&c=j")
    .then((res) => res.json())
    .then(({from, hitokoto}) => {
      sentence.value = "";
      author.value = from;
      let index = 0
      const renderText = (text: string) => {
        if (index < text.length) {
          setTimeout(() => {
            sentence.value += text[index]
            index++
            renderText(text)
          }, 150);
        } else {
          setTimeout(() => {
            getSentence()
          }, 10000)
        }
      }
      renderText(hitokoto)
    });
getSentence()

// 手机端首页导航栏position设置为fixed
onMounted(() => {
  const {frontmatter} = useData()
  document.querySelector('.Layout')?.classList.add(frontmatter.value.layout === 'home' ? 'is-home' : '')
})
onUnmounted(() => {
  document.querySelector('.Layout')?.classList.remove('is-home')
})

const isInfoShow = ref(true)
const toggleInfoShow = () => {
  isInfoShow.value = !isInfoShow.value
}

const scrollToContent = () => {
  document.documentElement.scrollTo({
    top: window.innerHeight - 63,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="bing-bg" :style="{backgroundImage:`url(${bingImgList[currentImgIndex]?.url})`}">
    <div class="hero">
      <img src="/logo.png" alt="">
      <div class="sentence">
        <div class="sentence-text">{{ sentence }}<span class="cursor">|</span></div>
        <div class="sentence-author">——「{{ author }}」</div>
      </div>
    </div>
    <div class="img-info">
      <div class="switch" :class="{close:!isInfoShow}" @click="toggleInfoShow"></div>
      <template v-if="isInfoShow">
        <div class="title">{{ bingImgList[currentImgIndex]?.locales.zh?.headline }}</div>
        <div class="description">{{ bingImgList[currentImgIndex]?.locales.zh?.description }}</div>
        <div class="copyright">{{ bingImgList[currentImgIndex]?.locales.zh?.copyright }}</div>
        <div class="address">
          <el-icon>
            <Location/>
          </el-icon>
          {{ bingImgList[currentImgIndex]?.locales.zh?.title }}
        </div>
        <div class="change-img">
          <el-icon class="icon" color="#fff" @click="changeImg(-1)">
            <ArrowLeftBold/>
          </el-icon>
          <el-icon class="icon" color="#fff" @click="changeImg(1)">
            <ArrowRightBold/>
          </el-icon>
        </div>
      </template>
    </div>
    <div class="scroll-to-content" @click="scrollToContent">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50px" height="50px">
        <polyline points="10,10 50,40 90,10" stroke="rgba(2255,255,255,0.5)" fill="none" stroke-width="8px"
                  stroke-linecap="round" stroke-linejoin="round"></polyline>
        <polyline points="10,40 50,70 90,40" stroke="rgba(2255,255,255,0.8)" fill="none" stroke-width="8px" stroke-linecap="round"
                  stroke-linejoin="round"></polyline>
      </svg>
    </div>
    <div class="image-source">图片来源:<a href="https://www.bing.com/" target="_blank">Microsoft Bing</a></div>
  </div>
  <div class="content">
    <div class="post-list">
      <post-list></post-list>
    </div>
    <div class="aside"></div>
  </div>
</template>

<style scoped lang="less">
.bing-bg {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background-color: #eee;

  .img-info {
    position: absolute;
    right: 0;
    top: 60px;
    margin: 20px;
    padding: 0.5rem;
    border-radius: 0.375rem;
    background-color: #00000080;
    font-weight: 400;
    line-height: 1.25;
    cursor: default;
    transition: opacity 0.3s;
    color: #fff;
    max-width: 650px;
    z-index: 9;
    min-width: 40px;
    min-height: 40px;

    .switch {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 30px;
      height: 30px;

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 20px;
        background-color: #fff;
        border-radius: 1px;
        transform: translate(-50%, -50%) rotate(45deg);
        transition: all 0.3s;
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 20px;
        background-color: #fff;
        border-radius: 1px;
        transform: translate(-50%, -50%) rotate(-45deg);
        transition: all 0.3s;
      }

      &.close {
        &:before {
          height: 13px;
          transform: translate(calc(-50% - 2px), calc(-50% - 4px)) rotate(45deg);
        }

        &:after {
          height: 13px;
          transform: translate(calc(-50% - 2px), calc(-50% + 4px)) rotate(-45deg);
        }
      }
    }

    .title {
      border-bottom: 1px solid #fff;
      font-weight: 600;
      font-size: 1.1em;
      padding-bottom: 0.5em;
    }

    .description {
      font-size: .9em;
      margin-top: 0.5em;
    }

    .copyright {
      padding: 0.5rem 0.25rem;
      color: #aaa;
      font-size: .8em;
    }

    .address {
      display: flex;
      align-items: center;
      gap: 5px;
      width: calc(100% - 80px);

      .icon {
        width: 16px;
      }
    }

    .change-img {
      /*扩大点击区域*/
      position: absolute;
      right: 10px;
      bottom: 0;

      .icon {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }


  }

  .hero {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;

    .logo {
      width: 200px;
    }

    .sentence {
      position: relative;

      .cursor {
        font-size: 0.8em;
        margin-left: 0.2em;
        animation: blink 1s infinite;
      }

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      &-text {
        font-size: 28px;
        font-weight: bold;
        position: relative;
        max-width: 80vw;
        word-break: break-all;
        line-height: 1.2;
        margin-top: 50px;
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);

        &:before {
          content: "『";
          position: absolute;
          top: -20px;
          left: -30px;
          font-size: 20px;
        }

        &:after {
          content: "』";
          position: absolute;
          bottom: -20px;
          right: -30px;
          font-size: 20px;
        }
      }

      &-author {
        font-weight: 400;
        font-style: italic;
        font-size: 16px;
        text-align: right;
        margin-top: 2em;
        position: absolute;
        right: 0;
        white-space: nowrap;
        backdrop-filter: blur(1px);
        -webkit-backdrop-filter: blur(1px);
      }
    }
  }

  .scroll-to-content {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    animation: floating 2s infinite ease-in-out;
    width: 50px;
    height: 50px;
  }
  .image-source{
    position: absolute;
    bottom: 0;
    right: 10px;
    color: #fff;
    font-size: 10px;
    opacity: 0.5;
  }

  @keyframes floating {
    0% {
      transform: translate(-50%, 0);
    }
    50% {
      transform: translate(-50%, -10px);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }
}
.content {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 15px;
  padding-top: 15px;
  .post-list{
    flex: 1;
  }
  .aside {
    width: 240px;
    flex-shrink: 0;
    background-color: pink;
  }

}
@media (max-width: 960px) {
  .content{
    width: 100%;
  }
  .aside{
    display: none;
  }
}
</style>
