import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "陈俊宏的博客",
  description: "人工智能 · 机器学习 · 深度学习",
  lang: "zh-CN",
  base: "/my-blog/",

  // 默认亮色主题，用户可手动切换
  appearance: 'light',

  themeConfig: {
    nav: [
      {
        text: "项目阐述",
        items: [
          { text: "基于SIREN与PINNs的激光衍射高精度自动测量系统", link: "/projects/SIREN-PINNs" },
          { text: "基于RAG的多模态电商智能导购agent", link: "/projects/RAG-agent" }
        ]
      },
      { text: "算法学习", link: "/algorithms/" },
      {
        text: "Kaggle竞赛",
        items: [
          { text: "Spaceship Titanic", link: "/kaggle/Spaceship Titanic" },
          { text: "CIFAR-100 图像分类", link: "/kaggle/CIFAR-100" }
        ]
      },
      {
        text: "深度学习",
        items: [
          { text: "线性回归", link: "/deep-learning/线性神经网络1" },
          { text: "softmax回归", link: "/deep-learning/线性神经网络2" },
          { text: "多层感知机（MLP）", link: "/deep-learning/多层感知机" },
          { text: "卷积神经网络（CNN）", link: "/deep-learning/卷积神经网络" },
          { text: "深度卷积神经网络（AlexNet）", link: "/deep-learning/深度卷积神经网络" },
          { text: "使用块的网络（VGG）", link: "/deep-learning/VGG" },
          { text: "网络中的网络（NiN）", link: "/deep-learning/NiN" },
          { text: "循环神经网络（RNN）", link: "/deep-learning/循环神经网络" },
          { text: "注意力机制与Transformer", link: "/deep-learning/注意力机制与Transformer" }
        ]
      }
    ],

    sidebar: [
      {
        text: "深度学习",
        collapsed: true,
        items: [
          { text: "线性回归", link: "/deep-learning/线性神经网络1" },
          { text: "softmax回归", link: "/deep-learning/线性神经网络2" },
          { text: "多层感知机（MLP）", link: "/deep-learning/多层感知机" },
          { text: "卷积神经网络（CNN）", link: "/deep-learning/卷积神经网络" },
          { text: "AlexNet", link: "/deep-learning/深度卷积神经网络" },
          { text: "VGG", link: "/deep-learning/VGG" },
          { text: "NiN", link: "/deep-learning/NiN" },
          { text: "循环神经网络（RNN）", link: "/deep-learning/循环神经网络" },
          { text: "注意力机制与Transformer", link: "/deep-learning/注意力机制与Transformer" }
        ]
      },
      {
        text: "项目阐述",
        collapsed: true,
        items: [
          { text: "基于SIREN与PINNs的激光衍射系统", link: "/projects/SIREN-PINNs" },
          { text: "基于RAG的多模态电商智能导购agent", link: "/projects/RAG-agent" }
        ]
      },
      {
        text: "算法",
        collapsed: true,
        items: [
          { text: "算法笔记", link: "/algorithms/" }
        ]
      },
      {
        text: "Kaggle竞赛",
        collapsed: true,
        items: [
          { text: "Spaceship Titanic", link: "/kaggle/Spaceship Titanic" },
          { text: "CIFAR-100 图像分类", link: "/kaggle/CIFAR-100" }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/WHUTcjh-2024/my-blog" }
    ],

    outline: {
      label: '页面导航'
    },

    lastUpdated: false,

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '深色模式'
  }
})
