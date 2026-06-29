---
title: 深度学习工程笔记
description: 围绕 PyTorch 训练、模型结构、过拟合处理和 Transformer 应用整理的工程笔记。
---

# 深度学习工程笔记

本板块不是单纯复述教材内容，而是围绕 PyTorch 训练流程、模型结构理解、过拟合处理、Transformer 工程应用、Kaggle 实战等主题，整理深度学习在实际项目中的使用方式和常见问题。

## 推荐阅读路径

### 训练与表格任务

- [回归任务的 PyTorch 训练闭环](/deep-learning/线性神经网络1)：数据、模型、损失、优化器与验证流程。
- [多分类任务中的 Softmax 与交叉熵](/deep-learning/线性神经网络2)：从 logits 到类别概率的实现要点。
- [MLP 在表格分类任务中的实践](/deep-learning/多层感知机)：激活函数、正则化、Dropout 与过拟合处理。

### 视觉模型与架构演进

- [CNN 图像分类中的卷积、池化与特征提取](/deep-learning/卷积神经网络)
- [经典 CNN 架构的工程演进：AlexNet](/deep-learning/深度卷积神经网络)
- [经典 CNN 架构的工程演进：VGG](/deep-learning/VGG)
- [经典 CNN 架构的工程演进：NiN](/deep-learning/NiN)

这些文章保留了经典模型的基础推导，但阅读重点是结构选择、计算代价、训练稳定性和在现代项目中的适用边界。

### 序列与 Agent 基础

- [序列建模实践：RNN、LSTM 与 GRU](/deep-learning/循环神经网络)
- [Transformer 的工程理解：Attention、推理瓶颈与 RAG 中的作用](/deep-learning/注意力机制与Transformer)

## 与项目的连接

- MLP、数据预处理和正则化用于 [Spaceship Titanic 项目](/kaggle/Spaceship%20Titanic)。
- PyTorch 连续函数拟合与训练流程可迁移到 [SIREN / PINNs 项目](/projects/SIREN-PINNs)。
- Attention、向量表示与上下文组织是 [RAG Agent 项目](/projects/RAG-agent) 的模型基础。

