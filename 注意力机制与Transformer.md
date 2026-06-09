# 注意力机制与Transformer

## 概述

注意力机制（Attention Mechanism）是深度学习中最重要的创新之一，它使模型能够**聚焦于输入中最相关的部分**。Transformer架构完全基于注意力机制构建，摒弃了传统的循环和卷积结构，在自然语言处理、计算机视觉等领域取得了革命性突破。

## 注意力机制

### 1. 核心思想

注意力机制的核心是**动态加权**：根据当前任务的需要，对输入的不同部分赋予不同的权重。

**直觉理解：**
- 当我们阅读一个句子时，会自动聚焦于重要的词语
- 当我们看一张图片时，会关注关键的区域
- 注意力机制模拟了这种选择性关注的能力

### 2. 注意力计算

基本的注意力计算可以表示为：

```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

其中：
- **Q（Query）**：查询矩阵，表示当前需要关注的内容
- **K（Key）**：键矩阵，表示可以被关注的内容
- **V（Value）**：值矩阵，表示实际的内容信息
- **d_k**：键向量的维度，用于缩放

### 3. 注意力类型

**软注意力（Soft Attention）：**
- 对所有位置计算权重
- 权重和为1（通过softmax归一化）
- 可微分，可以端到端训练

**硬注意力（Hard Attention）：**
- 只选择一个或几个位置
- 不可微分，需要强化学习训练
- 计算效率更高

**自注意力（Self-Attention）：**
- Q、K、V来自同一个序列
- 捕捉序列内部的依赖关系
- 是Transformer的核心组件

## Transformer架构

### 1. 整体结构

Transformer由编码器（Encoder）和解码器（Decoder）组成：

```
输入序列 → ┌─────────┐     ┌─────────┐ → 输出序列
           │ Encoder │ ──► │ Decoder │
           │ (N层)   │     │ (N层)   │
           └─────────┘     └─────────┘
```

### 2. 编码器（Encoder）

每个编码器层包含：

```
输入 x
├── 多头自注意力层
├── 残差连接 + 层归一化
├── 前馈神经网络
└── 残差连接 + 层归一化
输出
```

**数学表达：**
```
Attention_output = LayerNorm(x + MultiHeadAttention(x, x, x))
FFN_output = LayerNorm(Attention_output + FFN(Attention_output))
```

### 3. 解码器（Decoder）

每个解码器层包含：

```
输入 y
├── 掩码多头自注意力层（防止看到未来信息）
├── 残差连接 + 层归一化
├── 编码器-解码器注意力层
├── 残差连接 + 层归一化
├── 前馈神经网络
└── 残差连接 + 层归一化
输出
```

### 4. 多头注意力（Multi-Head Attention）

多头注意力允许模型同时关注不同位置的不同表示子空间：

```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W^O
其中 head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
```

**优势：**
- 捕捉不同类型的依赖关系
- 提供多个表示子空间
- 增强模型的表达能力

## 代码实现

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    """多头注意力机制"""
    def __init__(self, d_model, num_heads, dropout=0.1):
        super(MultiHeadAttention, self).__init__()
        assert d_model % num_heads == 0

        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        # 线性变换层
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

        self.dropout = nn.Dropout(dropout)

    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        """缩放点积注意力"""
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)

        attention_weights = F.softmax(scores, dim=-1)
        attention_weights = self.dropout(attention_weights)

        output = torch.matmul(attention_weights, V)
        return output, attention_weights

    def forward(self, Q, K, V, mask=None):
        batch_size = Q.size(0)

        # 线性变换并分割成多头
        Q = self.W_q(Q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # 计算注意力
        output, attention_weights = self.scaled_dot_product_attention(Q, K, V, mask)

        # 拼接多头
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)

        # 最终线性变换
        output = self.W_o(output)

        return output, attention_weights


class PositionWiseFeedForward(nn.Module):
    """位置前馈网络"""
    def __init__(self, d_model, d_ff, dropout=0.1):
        super(PositionWiseFeedForward, self).__init__()
        self.fc1 = nn.Linear(d_model, d_ff)
        self.fc2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x


class PositionalEncoding(nn.Module):
    """位置编码"""
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()

        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))

        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0)

        self.register_buffer('pe', pe)

    def forward(self, x):
        return x + self.pe[:, :x.size(1)]


class EncoderLayer(nn.Module):
    """Transformer编码器层"""
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super(EncoderLayer, self).__init__()
        self.self_attention = MultiHeadAttention(d_model, num_heads, dropout)
        self.feed_forward = PositionWiseFeedForward(d_model, d_ff, dropout)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # 自注意力
        attn_output, _ = self.self_attention(x, x, x, mask)
        x = self.norm1(x + self.dropout(attn_output))

        # 前馈网络
        ff_output = self.feed_forward(x)
        x = self.norm2(x + self.dropout(ff_output))

        return x


class DecoderLayer(nn.Module):
    """Transformer解码器层"""
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super(DecoderLayer, self).__init__()
        self.self_attention = MultiHeadAttention(d_model, num_heads, dropout)
        self.cross_attention = MultiHeadAttention(d_model, num_heads, dropout)
        self.feed_forward = PositionWiseFeedForward(d_model, d_ff, dropout)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.norm3 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, encoder_output, src_mask=None, tgt_mask=None):
        # 掩码自注意力
        attn_output, _ = self.self_attention(x, x, x, tgt_mask)
        x = self.norm1(x + self.dropout(attn_output))

        # 编码器-解码器注意力
        attn_output, _ = self.cross_attention(x, encoder_output, encoder_output, src_mask)
        x = self.norm2(x + self.dropout(attn_output))

        # 前馈网络
        ff_output = self.feed_forward(x)
        x = self.norm3(x + self.dropout(ff_output))

        return x


class Transformer(nn.Module):
    """Transformer模型"""
    def __init__(self, src_vocab_size, tgt_vocab_size, d_model=512, num_heads=8,
                 num_encoder_layers=6, num_decoder_layers=6, d_ff=2048, dropout=0.1):
        super(Transformer, self).__init__()

        # 嵌入层
        self.src_embedding = nn.Embedding(src_vocab_size, d_model)
        self.tgt_embedding = nn.Embedding(tgt_vocab_size, d_model)
        self.positional_encoding = PositionalEncoding(d_model)

        # 编码器和解码器
        self.encoder_layers = nn.ModuleList([
            EncoderLayer(d_model, num_heads, d_ff, dropout)
            for _ in range(num_encoder_layers)
        ])
        self.decoder_layers = nn.ModuleList([
            DecoderLayer(d_model, num_heads, d_ff, dropout)
            for _ in range(num_decoder_layers)
        ])

        # 输出层
        self.fc = nn.Linear(d_model, tgt_vocab_size)
        self.dropout = nn.Dropout(dropout)

        # 初始化参数
        self._init_parameters()

    def _init_parameters(self):
        for p in self.parameters():
            if p.dim() > 1:
                nn.init.xavier_uniform_(p)

    def generate_mask(self, src, tgt):
        # 源序列掩码
        src_mask = (src != 0).unsqueeze(1).unsqueeze(2)

        # 目标序列掩码（防止看到未来信息）
        tgt_mask = (tgt != 0).unsqueeze(1).unsqueeze(2)
        seq_len = tgt.size(1)
        nopeak_mask = (1 - torch.triu(torch.ones(1, seq_len, seq_len), diagonal=1)).bool()
        tgt_mask = tgt_mask & nopeak_mask

        return src_mask, tgt_mask

    def forward(self, src, tgt):
        src_mask, tgt_mask = self.generate_mask(src, tgt)

        # 编码
        src_embedded = self.dropout(self.positional_encoding(self.src_embedding(src)))
        enc_output = src_embedded
        for enc_layer in self.encoder_layers:
            enc_output = enc_layer(enc_output, src_mask)

        # 解码
        tgt_embedded = self.dropout(self.positional_encoding(self.tgt_embedding(tgt)))
        dec_output = tgt_embedded
        for dec_layer in self.decoder_layers:
            dec_output = dec_layer(dec_output, enc_output, src_mask, tgt_mask)

        # 输出
        output = self.fc(dec_output)
        return output
```

## 关键创新点

### 1. 自注意力机制
- 捕捉序列中任意两个位置之间的依赖关系
- 不受距离限制，直接建模长距离依赖
- 计算复杂度为O(n²)，但可以并行计算

### 2. 位置编码
- 为序列中的每个位置添加位置信息
- 使用正弦和余弦函数生成
- 使模型能够感知序列的顺序

### 3. 残差连接和层归一化
- 缓解深层网络的训练困难
- 加速收敛
- 提高模型稳定性

### 4. 多头注意力
- 同时关注不同位置的不同特征
- 提供多个表示子空间
- 增强模型的表达能力

## Transformer的优势

### 1. 并行计算
- 所有位置可以同时计算
- 充分利用GPU并行能力
- 训练速度远超RNN

### 2. 长距离依赖
- 自注意力直接建模任意距离的依赖
- 不需要像RNN那样逐步传递信息
- 更好地捕捉全局信息

### 3. 灵活性
- 可以处理变长序列
- 支持多种任务（分类、生成、翻译等）
- 易于扩展和修改

## 性能对比

| 模型 | 机器翻译BLEU | 训练速度 | 参数量 |
|------|-------------|----------|--------|
| RNN | 25.3 | 1x | 62M |
| LSTM | 28.4 | 0.8x | 78M |
| Transformer | 32.7 | 5x | 65M |

## 应用场景

### 1. 自然语言处理
- **机器翻译**：Transformer最初就是为翻译任务设计的
- **文本生成**：GPT系列模型
- **文本理解**：BERT、RoBERTa等预训练模型
- **问答系统**：阅读理解和对话系统

### 2. 计算机视觉
- **Vision Transformer (ViT)**：将图像分割成patch序列
- **目标检测**：DETR（Detection Transformer）
- **图像生成**：DALL-E、Stable Diffusion

### 3. 语音处理
- **语音识别**：Whisper模型
- **语音合成**：基于Transformer的TTS
- **语音翻译**：端到端语音翻译

### 4. 多模态学习
- **图文匹配**：CLIP模型
- **视觉问答**：结合图像和文本
- **视频理解**：处理时序视觉信息

## 变体与改进

### 1. BERT（Bidirectional Encoder Representations from Transformers）
- 双向编码器
- 预训练+微调范式
- 在多个NLP任务上取得突破

### 2. GPT（Generative Pre-trained Transformer）
- 单向解码器
- 自回归生成
- 强大的文本生成能力

### 3. Vision Transformer (ViT)
- 将图像视为序列
- 在图像分类上媲美CNN
- 开启了Transformer在视觉领域的应用

### 4. DETR（Detection Transformer）
- 端到端目标检测
- 无需锚框和NMS
- 简化了检测流程

## 总结

注意力机制和Transformer架构代表了深度学习的重要进步：

- **注意力机制**：使模型能够动态聚焦于重要信息
- **Transformer**：完全基于注意力，摒弃循环和卷积
- **并行计算**：大幅提升训练效率
- **长距离依赖**：更好地捕捉全局信息
- **广泛应用**：NLP、CV、语音等多领域

Transformer的成功证明了：**注意力机制是捕捉序列依赖关系的有效方法**，其设计思想对后续的深度学习架构产生了深远影响。
