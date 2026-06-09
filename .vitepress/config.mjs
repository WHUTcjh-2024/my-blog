import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "陈俊宏的博客",
  description: "人工智能 · 机器学习 · 深度学习",
  lang: "zh-CN",
  base: "/my-blog/",

  appearance: 'dark',

  themeConfig: {
    nav: [
      {
        text: "项目阐述",
        items: [
          { text: "基于SIREN与PINNs的激光衍射高精度自动测量系统", link: "/基于 SIREN 与 PINNs 的激光衍射高精度自动测量系统" },
          { text: "基于RAG的多模态电商智能导购agent", link: "/基于RAG的多模态电商智能导购agent" }
        ]
      },
      { text: "算法学习", link: "/algorithms" },
      {
        text: "Kaggle竞赛",
        items: [
          { text: "Spaceship Titanic", link: "/Spaceship Titanic" },
          { text: "CIFAR-100 图像分类", link: "/CIFAR-100 - Object Recognition in Images" }
        ]
      },
      {
        text: "深度学习",
        items: [
          { text: "线性回归", link: "/线性神经网络1" },
          { text: "softmax回归", link: "/线性神经网络2" },
          { text: "多层感知机（MLP）", link: "/多层感知机" },
          { text: "卷积神经网络（CNN）", link: "/卷积神经网络" },
          { text: "深度卷积神经网络（AlexNet）", link: "/深度卷积神经网络" },
          { text: "使用块的网络（VGG）", link: "/VGG" },
          { text: "网络中的网络（NiN）", link: "/NiN" },
          { text: "含并行连结的网络（GoogLeNet）", link: "/GoogLeNet" },
          { text: "残差网络（ResNet）", link: "/ResNet" },
          { text: "稠密连接网络（DenseNet）", link: "/DenseNet" },
          { text: "循环神经网络（RNN）", link: "/循环神经网络" },
          { text: "注意力机制与Transformer", link: "/注意力机制与Transformer" }
        ]
      }
    ],

    sidebar: [
      {
        text: "深度学习",
        items: [
          { text: "线性回归", link: "/线性神经网络1" },
          { text: "softmax回归", link: "/线性神经网络2" },
          { text: "多层感知机（MLP）", link: "/多层感知机" },
          { text: "卷积神经网络（CNN）", link: "/卷积神经网络" },
          { text: "AlexNet", link: "/深度卷积神经网络" },
          { text: "VGG", link: "/VGG" },
          { text: "NiN", link: "/NiN" },
          { text: "GoogLeNet", link: "/GoogLeNet" },
          { text: "ResNet", link: "/ResNet" },
          { text: "DenseNet", link: "/DenseNet" },
          { text: "循环神经网络（RNN）", link: "/循环神经网络" },
          { text: "注意力机制与Transformer", link: "/注意力机制与Transformer" }
        ]
      },
      {
        text: "项目阐述",
        items: [
          { text: "基于SIREN与PINNs的激光衍射系统", link: "/基于 SIREN 与 PINNs 的激光衍射高精度自动测量系统" },
          { text: "基于RAG的多模态电商智能导购agent", link: "/基于RAG的多模态电商智能导购agent" }
        ]
      },
      {
        text: "算法",
        items: [
          { text: "算法笔记", link: "/algorithms" }
        ]
      },
      {
        text: "Kaggle竞赛",
        items: [
          { text: "Spaceship Titanic", link: "/Spaceship Titanic" },
          { text: "CIFAR-100 图像分类", link: "/CIFAR-100 - Object Recognition in Images" }
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