import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "陈俊宏的博客",
  description: "人工智能 · 机器学习 · 深度学习",
  lang: "zh-CN",
  base: "/my-blog/",

  appearance: 'dark',

  themeConfig: {
    nav: [
      { text: "学习小记", link: "/api-examples" },
      { text: "项目阐述", link: "/markdown-examples" },
      { text: "算法", link: "/algorithms" }
    ],

    sidebar: [
      {
        text: "学习小记",
        items: [{ text: "前端 · 网络 · 操作系统", link: "/api-examples" }]
      },
      {
        text: "项目阐述",
        items: [{ text: "博客项目介绍", link: "/markdown-examples" }]
      },
      {
        text: "算法",
        items: [{ text: "算法笔记", link: "/algorithms" }]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/WHUTcjh-2024/my-blog" }
    ],

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    returnToTopLabel: '回到顶部',

    sidebarMenuLabel: '菜单',

    darkModeSwitchLabel: '深色模式'
  }
})
