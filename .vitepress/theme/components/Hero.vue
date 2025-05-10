<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from "vue";
import {useData} from "vitepress";
import ImgInfo from "@components/ImgInfo.vue";
import {useIsMobile} from "@hooks/useIsMobile"
import Loading from "@components/Loading.vue";
import VPNavBarMenu from "@vp-theme/components/VPNavBarMenu.vue";
import MicrosoftBing from "@icons/MicrosoftBing.vue";

const bingImgList = ref<{ isLoaded: boolean, img: BingImg }[]>([])
const currentImgIndex = ref(0)

const getImgListFromBing = async () => {
  return fetch("https://bing-wallpaper.vuejs.press/api/wallpaper").then((response) => response.json()).then(res => {
    bingImgList.value = res.map(item => {
      item.url = item.url.replace(/bing.com/g, "cn.bing.com")
      return {isLoaded: false, img: item}
    })
  })
};

getImgListFromBing().then(() => {
  setLoadedImg()
})
// 避免重复加载，缓存当前，前后三张
const setLoadedImg = () => {
  bingImgList.value[currentImgIndex.value].isLoaded = true
  bingImgList.value[(currentImgIndex.value + 1) % bingImgList.value.length].isLoaded = true
  bingImgList.value[(currentImgIndex.value - 1 + bingImgList.value.length) % bingImgList.value.length].isLoaded = true
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
// 随机获取一句话
const getSentence = () => Promise.race(
    [
      new Promise((resolve) =>{
        return fetch("https://v1.hitokoto.cn?c=d&c=f&c=h&c=i&c=j&c=k").then((res) => res.json()).then(res => {
          resolve({from: res?.from || '', content: res?.hitokoto || ''})
        })
      }),
      new Promise(resolve=>setTimeout(()=>{
        fetch("https://api.xygeng.cn/one").then((res) => res.json()).then(res => {
          const data = res?.data || {}
          resolve({from: data.origin || '', content: data.content || ''})
        })
      }, 200)) // 这个接口的句子太杂了，我愿意等上面哪个200毫秒
    ]
)
    .then(({from, content}) => {
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
      renderText(content)
    })
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
const imgsLoading = (index:number) => {
  if (index === 0) {
    isLoading.value = false
  }
}
setTimeout(() => {
  isLoading.value = false
}, 5000)

const isMobile = useIsMobile()
</script>

<template>
  <loading v-if="isLoading"></loading>
  <div class="hero">
    <img v-for="(item,index) in bingImgList" :key="item.img.url"
         :class="{current:currentImgIndex === index}"
         :style="{'z-index':bingImgList.length - index}"
         :src="item.isLoaded?item.img.url:''" alt="" class="img-bg" @load="imgsLoading(index)">
    <div class="indicators">
      <div v-for="(item,index) in bingImgList" :key="item.img.url" :class="{current:index === currentImgIndex}"
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
      <img-info :change-img="changeImg" :info="bingImgList[currentImgIndex]?.img" class="img-info"></img-info>
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
    z-index: 13;

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
    z-index: 12;

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
