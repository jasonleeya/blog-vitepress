// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from "./Layout.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/index.scss'
import axios from "axios";

axios.defaults.baseURL = 'https://tcb.lsj97.com/api/blog'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, /*router, siteData*/ }) {
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
} satisfies Theme
