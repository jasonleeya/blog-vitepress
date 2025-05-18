import {defineConfig} from 'vitepress'
import {fileURLToPath, URL} from 'node:url'
import posts from './posts.json'

const categoryInfo = [
  {
    type: 'article',
    name: '文章',
    icon: '/images/categories/article.svg',
    description: ''
  },
  {
    type: 'note',
    name: '笔记',
    icon: '/images/categories/note.svg',
    description: ''
  },
  {
    type: 'knowledge',
    name: '知识点',
    icon: '/images/categories/knowledge.svg',
    description: ''
  },
  {
    type: 'life',
    name: '生活',
    icon: '/images/categories/lift.svg',
    description: ''
  }
]
const categoryMap = new Map<string, PostMeta[]>()
const sidebar: SidebarItem[] = []
posts.forEach(post => {
  if (categoryMap.has(post.category)) {
    categoryMap.get(post.category)?.push(post)
  } else {
    categoryMap.set(post.category, [post])
  }
})
categoryMap.forEach((value, key) => {
  sidebar.push({
    text: key,
    collapsed: false,
    items: value.map(post => ({
      text: post.title,
      link: post.path
    }))
  })
})
sidebar.push(...[{
  text: '我的作品',
  link:'/demos'
},{
  text: '关于我',
  link:'/intro'
}])

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JasonLee的技术分享",
  description: "欢迎来到我的技术分享小站",
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    [
        'meta', {name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'}
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    author: 'JasonLee',
    introduce: '一只前端攻城狮',
    avatar: 'https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100',
    nav: [
      {text: '首页', link: '/'},
      {text: '个人作品', link: '/demos'},
      {text: '关于我', link: '/intro'},
    ],
    medias: [
      {icon: '/images/medias/github.svg', type: 'github', link: 'https://github.com/jasonleeya'},
      {
        icon: '/images/medias/wechat.svg',
        type: 'wx',
        qrcodeImg: 'https://file.lsj97.com/imgs/blog/wechat_qrcode.jpg',
      },
      {icon: '/images/medias/mail.svg', type: 'email', link: 'jasonleeya@qq.com'},
      {icon: '/images/medias/zhihu.svg', type: 'zhihu', link: 'https://www.zhihu.com/people/jasonleeya'},
      {icon: '/images/medias/steam.svg', type: 'steam', link: 'https://steamcommunity.com/profiles/76561198961789123/'},
    ],
    categoryInfo,
    outline: 'deep',
    outlineTitle: '当前页面',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    sidebar,
    footer: {
      message: '<a href="https://beian.miit.gov.cn" target=”_blank”>蜀ICP备19027681号</a>',
      copyright: "Copyright © 2019-present JasonLee"
    },
    search: {
      provider: 'local'
    }
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: fileURLToPath(
              new URL('./', import.meta.url)
          )
        },
        {
          find: /^@views\//,
          replacement: fileURLToPath(
              new URL('./theme/views/', import.meta.url)
          )
        },
        {
          find: /^@components\//,
          replacement: fileURLToPath(
              new URL('./theme/components/', import.meta.url)
          )
        },
        {
          find: /^@hooks\//,
          replacement: fileURLToPath(
              new URL('./hooks/', import.meta.url)
          )
        },
        {
          find: /^@icons\//,
          replacement: fileURLToPath(
              new URL('./theme/components/icons/', import.meta.url)
          )
        },
        {
          find: /^@vp-theme\//,
          replacement: 'vitepress/dist/client/theme-default/',
        },
        {
          find: /^.*\/VPNavScreen\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/vp-theme/NavScreen.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNav\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/vp-theme/Nav.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
              new URL('./theme/components/vp-theme/SwitchAppearance.vue', import.meta.url)
          )
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true
  },
  metaChunk:true,
  srcExclude:[
      '**/前端面试题合集/category/*.md',
  ],
  cleanUrls: true,
  rewrites:{
    'pages/demos.md':'demos.md',
    'posts/:type/:category/:page.md':':type/:category/:page.md'
  }
})
