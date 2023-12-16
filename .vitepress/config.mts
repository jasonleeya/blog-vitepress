import {defineConfig} from 'vitepress'
import {fileURLToPath, URL} from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "我的技术分享",
    description: "欢迎来到我的技术分享小站",
    // 官方bug刷新就404了
    // rewrites: {
    //   'posts/:category/:post': '/:category/:post',
    // },
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: './logo.svg',
        author: 'JasonLee',
        introduce: '一只前端攻城狮',
        avatar: 'https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100',
        nav: [
            {text: '首页', link: '/'},
            {text: '关于我', link: '/intro'},
            {text: '测试', link: '/posts/category1/测试文章1'},
        ],
        medias: [
            {icon: '/images/medias/github.svg', type: 'github', link: 'https://github.com/jasonleeya'},
            {icon: '/images/medias/wechat.svg', type: 'wx', qrcodeImg: 'https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/blog/wechat_qrcode.jpg',},
            {icon: '/images/medias/mail.svg', type: 'email', link: 'jasonleeya@qq.com'},
            {icon: '/images/medias/zhihu.svg', type: 'zhihu', link: 'https://www.zhihu.com/people/jasonleeya'},
            {icon: '/images/medias/steam.svg', type: 'steam', link: 'https://steamcommunity.com/profiles/76561198961789123/'},
        ],
        categoryInfo: [
            {
                folder: 'category1',
                name: '知识点',
                icon: '/images/categories/knowledge.svg',
                description: ''
            },
            {
                folder: 'category2',
                name: '笔记',
                icon: '/images/categories/note.svg',
                description: ''
            },
            {
                folder: 'category3',
                name: '生活',
                icon: '/images/categories/lift.svg',
                description: ''
            }
        ],
        outline: {
            label: '当前页面',
        },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '相关文章',
        sidebar: [
            {
                text: 'Examples',
                items: [
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            }
        ],
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
                    find: /^.*\/VPNavScreenMenu\.vue$/,
                    replacement: fileURLToPath(
                        new URL('./theme/components/NavScreen.vue', import.meta.url)
                    )
                },
            ]
        }
    }
})
