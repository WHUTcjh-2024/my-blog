---
title: 核心项目
description: 陈俊宏的 AI 应用、深度学习与机器学习项目作品集。
---

# 核心项目

这里集中展示能够说明工程能力的项目，重点说明业务问题如何拆解、关键技术为什么这样选择、系统如何落地，以及当前验证范围和演进方向。

## 基于 RAG 的多模态电商智能导购 Agent

基于 H&M 公开数据构建包含 5,000 件真实商品与图片的本地目录。系统通过 MiniLM、CLIP、结构化过滤和交易热度完成多模态检索，再由 Agent 串联推荐、对比、购物车和模拟下单。

- **技术栈：** React 19、TypeScript、FastAPI、LangChain、MiniLM、CLIP、PyTorch、SQLite
- **工程重点：** Grounded 推荐、多路融合排序、10 个业务工具、多轮持久化、SSE 与无 LLM 回退
- **项目介绍：** [查看系统设计、技术选型和评测边界](/projects/RAG-agent)

## 基于 SIREN 与物理先验的液体表面张力智能实验系统

面向液体表面张力实验中人工读数效率低、像素取整和 OCR 误识别会放大误差的问题，构建从实验图像上传、条纹定位、标尺标定到表面张力计算与实验答疑的完整流程。

- **技术栈：** Vue 3、FastAPI、PyTorch、SIREN、OpenCV、EasyOCR、scikit-learn
- **工程重点：** 传统 CV 初值、连续光强拟合、弱物理先验、稳健线性标定、本地 RAG
- **项目介绍：** [查看算法链路、技术取舍和系统边界](/projects/SIREN-PINNs)

## Spaceship Titanic Kaggle 实战

完成表格分类任务的端到端实践：字段理解、缺失值处理、特征构造、OneHot 编码、标准化、PyTorch MLP 训练、验证和提交。

- **技术栈：** PyTorch、scikit-learn、pandas、MLP
- **结果：** Kaggle 公开榜得分 **0.79845**
- **项目复盘：** [查看完整说明](/kaggle/Spaceship%20Titanic)
