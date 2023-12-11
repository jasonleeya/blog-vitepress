// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.less'
import Layout from "./Layout.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
  }
} satisfies Theme
