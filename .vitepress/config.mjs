import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "陈俊宏的个人博客",
  description: "这是我的个人博客，用来记录我在学习计算机科学中的过程与感悟",
  base: "/my-blog/",

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/articles" }
    ],

    sidebar: [
      {
        text: "文章",
        items: [{ text: "第一篇文章", link: "/articles" }]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/WHUTcjh-2024/my-blog" }
    ]
  }
})