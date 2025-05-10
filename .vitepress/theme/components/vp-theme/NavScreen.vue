<script setup lang="ts">
import {useScrollLock} from '@vueuse/core'
import {inBrowser, useRouter} from 'vitepress'
import {ref} from 'vue'
import SwitchAppearance from './SwitchAppearance.vue'
import VPNavBarMenu from '@vp-theme/components/VPNavBarMenu.vue'
import BlogInfoMobile from "@components/BlogInfoMobile.vue";
import PostsNav from "@components/PostsNav.vue";
import RainbowWaves from "@components/RainbowWaves.vue";

const props = defineProps<{
  open: boolean,
  closeScreen: () => void
}>()

const screen = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(inBrowser ? document.body : null)

const router = useRouter()
const getItem = ({type,value}) => {
  props.closeScreen();
  // router.go(`/pages/mobileFilterPosts?type=${type}&value=${value}`)
  if (!import.meta.env.SSR) {
    window.location.href = `/pages/mobileFilterPosts?type=${type}&value=${value}`
  }
}
</script>

<template>
  <transition
      name="fade"
      @enter="isLocked = true"
      @after-leave="isLocked = false"
  >
    <div v-if="open" class="VPNavScreen" ref="screen" id="VPNavScreen">
      <rainbow-waves class="container">
        <div class="top-nav">
          <VPNavBarMenu class="menu"/>
          <SwitchAppearance/>
        </div>
        <blog-info-mobile></blog-info-mobile>
        <posts-nav @item-click="getItem" class="posts-nav-mobile"></posts-nav>
      </rainbow-waves>
    </div>
  </transition>
</template>

<style scoped>
.VPNavScreen {
  position: fixed;
  --vp-layout-top-height: 0px;
  top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px));
  border-top: 1px solid var(--vp-c-border);
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  width: 100%;
  background-color: var(--vp-nav-screen-bg-color);
  transition: background-color 0.5s;
  pointer-events: auto;
  overflow: hidden;
}

.VPNavScreen.fade-enter-active,
.VPNavScreen.fade-leave-active {
  transition: opacity 0.25s;
}

.VPNavScreen.fade-enter-active .container,
.VPNavScreen.fade-leave-active .container {
  transition: transform 0.25s ease;
}

.VPNavScreen.fade-enter-from,
.VPNavScreen.fade-leave-to {
  opacity: 0;
}

.VPNavScreen.fade-enter-from .container,
.VPNavScreen.fade-leave-to .container {
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .VPNavScreen {
    display: none;
  }
}

.container {
  margin: 0 auto;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.menu + .translations,
.menu + .appearance,
.translations + .appearance {
  margin-top: 24px;
}

.menu + .social-links {
  margin-top: 16px;
}

.appearance + .social-links {
  margin-top: 16px;
}

.container {
  padding: 0 20px;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

:deep(.menu) {
  display: flex;
  align-items: center;
}

.posts-nav-mobile {
  width: calc(100% + 40px);
  height: calc(100vh - 100px);
  margin: 0 -20px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
</style>
