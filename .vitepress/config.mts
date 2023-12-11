import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的技术分享",
  description: "欢迎来到我的技术分享小站",
  // 官方bug刷新就404了
  // rewrites: {
  //   'posts/:category/:post': '/:category/:post',
  // },
  lastUpdated:true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: './logo.svg',
    author: 'JasonLee',
    nav: [
      {text: '首页', link: '/'},
      {text: '关于我', link: '/intro'},
      {text: '测试', link: '/posts/category1/测试文章1'},
    ],
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
