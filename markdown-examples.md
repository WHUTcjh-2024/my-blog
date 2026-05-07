---
outline: deep
---

# 项目阐述

## 博客简介

这是我基于 **VitePress** 搭建的个人技术博客，用于记录学习过程中的知识总结和实践心得。

选择 VitePress 的原因：
- 极快的开发体验，热更新几乎无感知
- 基于 Vue 3，支持在 Markdown 中嵌入 Vue 组件
- 简洁优雅的默认主题，开箱即用
- Markdown 语法友好，写起来没有负担

## 项目结构

```
my-blog/
├── .vitepress/
│   ├── config.mjs          # 站点配置
│   └── theme/
│       ├── index.js        # 自定义主题入口
│       ├── style.css       # 全局样式覆盖
│       └── HomePage.vue    # 自定义首页组件
├── index.md                # 首页
├── api-examples.md         # 学习小记
└── markdown-examples.md    # 项目阐述（当前页面）
```

## 技术实现

### 自定义首页

首页使用了 Vue 3 组件化开发，通过 `.vitepress/theme/HomePage.vue` 实现了自定义的卡片式导航布局：

```vue
<template>
  <div class="home-page">
    <div class="hero-section">
      <h1 class="hero-name">陈俊宏的博客</h1>
      <p class="hero-tagline">计算机科学 · 学习记录 · 技术分享</p>
    </div>
    <div class="nav-cards">
      <a class="nav-card" href="/api-examples.html">
        <h3>学习小记</h3>
        <p>记录学习中的知识点和技术原理</p>
      </a>
    </div>
  </div>
</template>
```

### 蓝色主题

通过覆盖 VitePress 的 CSS 变量实现了统一的蓝色基调：

```css
:root {
  --vp-c-brand-1: #1d4ed8;
  --vp-c-brand-2: #2563eb;
  --vp-c-brand-3: #3b82f6;
  --vp-c-brand-soft: rgba(59, 130, 246, 0.14);
}
```

::: info
主题色彩贯穿整个博客，包括导航栏、按钮、链接、代码高亮等所有交互元素，保持视觉一致性。
:::

### 部署方式

博客通过 GitHub Pages 进行部署，使用 GitHub Actions 自动化构建流程：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动执行 `vitepress build`
3. 构建产物自动部署到 GitHub Pages

## 后续规划

- [ ] 添加更多学习笔记文章
- [ ] 实现文章标签分类功能
- [ ] 添加评论系统
- [ ] 优化移动端适配体验
