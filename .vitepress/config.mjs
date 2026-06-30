import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '陈俊宏 · AI 项目作品集',
  description: '陈俊宏的 AI 技术博客与项目作品集，聚焦 RAG、Agent、PyTorch 与后端工程实践。',
  lang: 'zh-CN',
  base: '/my-blog/',
  appearance: 'light',
  cleanUrls: true,
  markdown: {
    math: true
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '核心项目', link: '/projects/' },
      { text: '工程笔记', link: '/deep-learning/' },
      { text: 'Kaggle 实战', link: '/kaggle/Spaceship Titanic' },
      { text: '关于我', link: '/about' }
    ],

    sidebar: {
      '/projects/': [
        {
          text: '核心项目',
          items: [
            { text: '项目总览', link: '/projects/' },
            { text: '多模态电商导购 Agent', link: '/projects/RAG-agent' },
            { text: '液体表面张力智能实验系统', link: '/projects/SIREN-PINNs' }
          ]
        }
      ],
      '/deep-learning/': [
        {
          text: '深度学习工程笔记',
          items: [
            { text: '板块说明与阅读路径', link: '/deep-learning/' },
            { text: '回归任务的训练闭环', link: '/deep-learning/线性神经网络1' },
            { text: '多分类任务与 Softmax', link: '/deep-learning/线性神经网络2' },
            { text: 'MLP 与表格分类实践', link: '/deep-learning/多层感知机' },
            { text: 'CNN 的特征提取机制', link: '/deep-learning/卷积神经网络' },
            { text: '经典 CNN：AlexNet', link: '/deep-learning/深度卷积神经网络' },
            { text: '经典 CNN：VGG', link: '/deep-learning/VGG' },
            { text: '经典 CNN：NiN', link: '/deep-learning/NiN' },
            { text: '序列建模：RNN、LSTM、GRU', link: '/deep-learning/循环神经网络' },
            { text: 'Transformer 的工程理解', link: '/deep-learning/注意力机制与Transformer' }
          ]
        }
      ],
      '/kaggle/': [
        {
          text: 'Kaggle 项目复盘',
          items: [
            { text: 'Spaceship Titanic', link: '/kaggle/Spaceship Titanic' },
            { text: 'CIFAR-100 图像分类', link: '/kaggle/CIFAR-100' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WHUTcjh-2024' }
    ],
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '切换主题',
    footer: {
      message: 'AI 应用开发 · Agent 开发 · 后端工程',
      copyright: 'Copyright © 2026 陈俊宏'
    }
  }
})
