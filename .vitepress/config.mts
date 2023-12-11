import {defineConfig, useRoute} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的技术分享",
  description: "欢迎来到我的技术分享小站",
  icon: './logo.svg',
  // 官方bug刷新就404了
  // rewrites: {
  //   'posts/:category/:post': '/:category/:post',
  // },
  lastUpdated:true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: '首页', link: '/'},
      {text: '关于我', link: '/intro'},
      {text: '测试', link: '/posts/category2/test'},
    ],
    logo: "/logo.svg",
    sidebar: [
      {
        text: 'Examples',
        items: [
          {text: 'Markdown Examples', link: '/markdown-examples'},
          {text: 'Runtime API Examples', link: '/api-examples'}
        ]
      }
    ],
    footer:{
      message: '<a href="https://beian.miit.gov.cn" target=”_blank”>蜀ICP备19027681号</a>',
      copyright: "Copyright © 2019-present JasonLee"
    },
    search: {
      provider: 'local'
    }
  }
})
