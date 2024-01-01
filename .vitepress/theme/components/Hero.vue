<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from "vue";
import {useData} from "vitepress";
import ImgInfo from "@components/ImgInfo.vue";
import {useIsMobile} from "@/hooks/useIsMobile.mjs";
import Loading from "@components/Loading.vue";
import VPNavBarMenu from "@vp-theme/components/VPNavBarMenu.vue";

const bingImgList = ref<BingImg[]>([])
const currentImgIndex = ref(0)

const getImgListFromBing = async () => {
  return fetch("https://bing-wallpaper.vuejs.press/api/wallpaper").then((response) => response.json()).then(res => {
    return bingImgList.value = res
  })
};
const loadedImgSet = new Set<string>()

getImgListFromBing().then(() => {
  setLoadedImg()
})
// 避免重复加载，缓存当前，前后三张
const setLoadedImg = () => {
  if (loadedImgSet.size !== bingImgList.value.length) {
    loadedImgSet.add(bingImgList.value[currentImgIndex.value].url)
    loadedImgSet.add(bingImgList.value[(currentImgIndex.value + 1) % bingImgList.value.length].url)
    loadedImgSet.add(bingImgList.value[(currentImgIndex.value - 1 + bingImgList.value.length) % bingImgList.value.length].url)
  }
}
const changeImg = (direction: 1 | -1 | null, index?: number) => {
  if (direction !== null) {
    currentImgIndex.value = (currentImgIndex.value + direction + bingImgList.value.length) % bingImgList.value.length
  } else {
    currentImgIndex.value = index
  }
  setLoadedImg()
}
const sentenceList = ref([])
const author = ref("")

let timeout = null
//a动画b漫画c游戏d文学e原创f来自网络g其他h影视i诗词j网易云k哲学l抖机灵
const getSentence = () => fetch("https://v1.hitokoto.cn?c=d&c=f&c=h&c=i&c=j&c=k")
    .then((res) => res.json())
    .then(({from, hitokoto}) => {
      sentenceList.value.length = 0
      author.value = from;
      let index = 0
      const renderText = (text: string) => {
        if (index < text.length) {
          setTimeout(() => {
            sentenceList.value.push(text[index])
            index++
            renderText(text)
          }, 200);
        } else {
          timeout = setTimeout(() => {
            getSentence()
          }, 5000)
        }
      }
      renderText(hitokoto)
    });
getSentence()
onUnmounted(() => {
  clearTimeout(timeout)
})

// 手机端首页导航栏position设置为fixed
onMounted(() => {
  const {frontmatter} = useData()
  document.querySelector('.Layout')?.classList.add(frontmatter.value.layout === 'home' ? 'is-home' : '')
})
onUnmounted(() => {
  document.querySelector('.Layout')?.classList.remove('is-home')
})


const scrollToContent = () => {
  // document.documentElement.scrollTo({
  //   top: window.innerHeight - 63,
  //   behavior: 'smooth'
  // })
  window.scrollTo({
    top: window.innerHeight - 63,
    behavior: 'smooth'
  })
}

const isLoading = ref(true)
let i = 0
const imgsLoading = () => {
  i++
  if (i === 3) {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
setTimeout(() => {
  isLoading.value = false
}, 10000)

const isMobile = useIsMobile()
</script>

<template>
  <div class="hero">
    <img v-for="(item,index) in bingImgList" v-show="!isLoading" :key="item.url"
         :class="{current:currentImgIndex === index}"
         :src="loadedImgSet.has(item.url)?item.url:''" alt="" class="img-bg" @load="imgsLoading">
    <div class="indicators">
      <div v-for="(item,index) in bingImgList" :key="item.url" :class="{current:index === currentImgIndex}"
           class="indicator" @click="changeImg(null,index)"></div>
    </div>
    <div class="hero-content">
      <VPNavBarMenu v-if="isMobile" class="menu"/>
      <img alt="" class="logo" src="/logo.svg">
      <div class="sentence">
        <div class="sentence-text"><span v-for="(item,index) in sentenceList" :key="index"
                                         class="character">{{ item }}</span><span class="cursor">|</span></div>
        <div class="sentence-author">——「{{ author }}」</div>
      </div>
      <img-info :change-img="changeImg" :info="bingImgList[currentImgIndex]" class="img-info"></img-info>
      <div class="scroll-to-content" @click="scrollToContent">
        <svg height="50px" viewBox="0 0 100 100" width="50px" xmlns="http://www.w3.org/2000/svg">
          <polyline fill="none" points="10,10 50,40 90,10" stroke="rgba(2255,255,255,0.7)" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="8px"></polyline>
          <polyline fill="none" points="10,40 50,70 90,40" stroke="rgba(2255,255,255,0.9)" stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8px"></polyline>
        </svg>
      </div>
    </div>
  </div>
  <loading v-if="isLoading"></loading>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.hero {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background-color: #eee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);

  .img-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 1s;
    opacity: 0;
    background-color: var(--card-bg);

    &.current {
      opacity: 1;
    }
  }

  .indicators {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;

    .indicator {
      width: 40px;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.4);
      margin: 0 5px;
      cursor: pointer;

      &.current {
        background-color: rgba(255, 255, 255, 0.8);
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    .img-info {
      position: absolute;
      right: 0;
      top: 60px;
    }

    .logo {
      width: 200px;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translateX(-50%);
    }

    @include mobile {
      .logo {
        width: 100px;
        top: 30%;
      }
    }

    .sentence {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
      color: #fff;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);

      .cursor {
        font-size: 1em;
        margin-left: 0.2em;
        animation: blink 1s infinite;
        position: relative;
        bottom: 2px;
        font-weight: lighter;
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
        word-break: break-all;
        line-height: 1.4em;
        font-family: monospace;
        margin-top: 50px;

        .character {
          animation: character-appear 0.5s;
        }

        @keyframes character-appear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

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
        font-family: cursive;
      }
    }

    .scroll-to-content {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      animation: floating 2s infinite ease-in-out;
      width: 50px;
      height: 50px;
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
}

@media screen and (max-width: 992px) {
  .sentence {
    width: 80%;
  }
}

.menu {
  display: flex;
  position: absolute;
  top: 65px;
  left: 20px;

  :deep(.VPNavBarMenuLink) {
    color: #fff;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);

    &:not(.active) {
      color: rgba(255, 255, 255, 0.8);

    }
  }
}
</style>
