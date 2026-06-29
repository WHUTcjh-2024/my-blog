# 陈俊宏的个人技术博客

📝 一个基于开源项目 VitePress 构建的个人技术博客，记录 AI 方向的学习笔记与项目实践。

这是我的 AI 技术博客与项目作品集，用于整理 RAG、Agent、深度学习工程实践、Kaggle 实战和算法学习内容。博客重点展示项目架构、工程实现、实验结果和问题复盘，而不是单纯记录学习过程。

## 在线访问

[https://whutcjh-2024.github.io/my-blog/](https://whutcjh-2024.github.io/my-blog/)

## 重点项目

- 基于 RAG 的多模态电商智能导购 Agent
- 基于 SIREN 与 PINNs 的激光衍射自动测量系统
- Spaceship Titanic & CIFAR-100 Kaggle 实战

## 技术栈

- VitePress
- Vue 3
- GitHub Pages
- GitHub Actions
- Markdown

## 内容结构

- **核心项目：** AI 项目复盘与系统设计
- **工程笔记：** 深度学习 — 从线性回归到 Transformer，系统梳理经典模型
- **Kaggle 实战：** Spaceship Titanic、CIFAR-100 图像分类等实战
- **算法笔记：** 常用算法与刷题记录

## 本地运行

需要 Node.js 18 或更高版本。

```bash
npm install
npm run docs:dev
```

构建并在本地预览生产版本：

```bash
npm run docs:build
npm run docs:preview
```

## 部署

推送到 `main` 分支后，仓库中的 GitHub Actions 工作流会构建站点并部署到 GitHub Pages。

## 后续计划

- 补充 RAG Agent 项目完整复盘
- 补充 SIREN / PINNs 项目完整复盘
- 增加项目架构图、实验截图和接口说明
- 持续整理 PyTorch 工程实践经验
