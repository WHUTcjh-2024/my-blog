# 残差网络（ResNet）

## 概述

ResNet（残差网络）是由微软研究院的何恺明等人在2015年提出的深度卷积神经网络架构。它通过引入**残差学习**的概念，成功训练了超过100层的深度网络，解决了深度网络训练中的梯度消失和退化问题，在ImageNet竞赛中取得了冠军成绩。

## 核心问题

### 1. 梯度消失问题
- 随着网络层数增加，梯度在反向传播过程中逐渐衰减
- 导致浅层网络参数难以更新
- 网络训练困难

### 2. 网络退化问题
- 网络层数增加到一定程度后，训练误差反而上升
- 不是过拟合导致，而是优化困难
- 深层网络难以学习恒等映射

## 核心思想：残差学习

### 1. 残差块（Residual Block）

ResNet的核心创新是残差块，通过**跳跃连接（Skip Connection）**实现：

```
输入 x
├── 主路径：F(x) = W2·ReLU(W1·x)
└── 跳跃连接：x（恒等映射）
输出 = F(x) + x
```

**关键思想：**
- 网络学习的是**残差函数** F(x) = H(x) - x
- 而不是直接学习目标映射 H(x)
- 如果恒等映射是最优的，学习 F(x) = 0 比学习 H(x) = x 更容易

### 2. 数学原理

假设最优映射为 H(x)，传统网络直接学习：
```
H(x) = F(x)
```

ResNet学习残差：
```
H(x) = F(x) + x
```

其中 F(x) 是残差函数。如果最优映射接近恒等映射，学习 F(x) ≈ 0 比学习 H(x) ≈ x 更容易。

## 网络架构

### ResNet-18/34 结构

| 层级 | 输出尺寸 | ResNet-18 | ResNet-34 |
|------|----------|-----------|-----------|
| 卷积层 | 112×112 | 7×7, 64, stride 2 | 7×7, 64, stride 2 |
| 最大池化 | 56×56 | 3×3, stride 2 | 3×3, stride 2 |
| 阶段1 | 56×56 | [3×3, 64] × 2 | [3×3, 64] × 3 |
| 阶段2 | 28×28 | [3×3, 128] × 2 | [3×3, 128] × 4 |
| 阶段3 | 14×14 | [3×3, 256] × 2 | [3×3, 256] × 6 |
| 阶段4 | 7×7 | [3×3, 512] × 2 | [3×3, 512] × 3 |
| 全局平均池化 | 1×1 | - | - |
| 全连接层 | 1000 | - | - |

### ResNet-50/101/152 结构（Bottleneck）

对于更深的网络，使用**瓶颈结构（Bottleneck）**：

```
输入 x (256维)
├── 1×1卷积：降维到64维
├── 3×3卷积：64维
├── 1×1卷积：升维到256维
└── 跳跃连接：x
输出 = F(x) + x
```

## 代码实现

```python
import torch
import torch.nn as nn

class BasicBlock(nn.Module):
    """ResNet-18/34使用的基本残差块"""
    expansion = 1

    def __init__(self, in_channels, out_channels, stride=1, downsample=None):
        super(BasicBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3,
                               stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3,
                               stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        self.downsample = downsample

    def forward(self, x):
        identity = x

        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)

        out = self.conv2(out)
        out = self.bn2(out)

        if self.downsample is not None:
            identity = self.downsample(x)

        out += identity
        out = self.relu(out)

        return out


class Bottleneck(nn.Module):
    """ResNet-50/101/152使用的瓶颈残差块"""
    expansion = 4

    def __init__(self, in_channels, out_channels, stride=1, downsample=None):
        super(Bottleneck, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3,
                               stride=stride, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        self.conv3 = nn.Conv2d(out_channels, out_channels * self.expansion,
                               kernel_size=1, bias=False)
        self.bn3 = nn.BatchNorm2d(out_channels * self.expansion)
        self.relu = nn.ReLU(inplace=True)
        self.downsample = downsample

    def forward(self, x):
        identity = x

        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)

        out = self.conv2(out)
        out = self.bn2(out)
        out = self.relu(out)

        out = self.conv3(out)
        out = self.bn3(out)

        if self.downsample is not None:
            identity = self.downsample(x)

        out += identity
        out = self.relu(out)

        return out


class ResNet(nn.Module):
    def __init__(self, block, layers, num_classes=1000):
        super(ResNet, self).__init__()
        self.in_channels = 64

        self.conv1 = nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False)
        self.bn1 = nn.BatchNorm2d(64)
        self.relu = nn.ReLU(inplace=True)
        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=2, padding=1)

        self.layer1 = self._make_layer(block, 64, layers[0])
        self.layer2 = self._make_layer(block, 128, layers[1], stride=2)
        self.layer3 = self._make_layer(block, 256, layers[2], stride=2)
        self.layer4 = self._make_layer(block, 512, layers[3], stride=2)

        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(512 * block.expansion, num_classes)

    def _make_layer(self, block, out_channels, blocks, stride=1):
        downsample = None
        if stride != 1 or self.in_channels != out_channels * block.expansion:
            downsample = nn.Sequential(
                nn.Conv2d(self.in_channels, out_channels * block.expansion,
                          kernel_size=1, stride=stride, bias=False),
                nn.BatchNorm2d(out_channels * block.expansion),
            )

        layers = []
        layers.append(block(self.in_channels, out_channels, stride, downsample))
        self.in_channels = out_channels * block.expansion
        for _ in range(1, blocks):
            layers.append(block(self.in_channels, out_channels))

        return nn.Sequential(*layers)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = self.maxpool(x)

        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)

        x = self.avgpool(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)

        return x


def resnet18(num_classes=1000):
    return ResNet(BasicBlock, [2, 2, 2, 2], num_classes)

def resnet34(num_classes=1000):
    return ResNet(BasicBlock, [3, 4, 6, 3], num_classes)

def resnet50(num_classes=1000):
    return ResNet(Bottleneck, [3, 4, 6, 3], num_classes)

def resnet101(num_classes=1000):
    return ResNet(Bottleneck, [3, 4, 23, 3], num_classes)

def resnet152(num_classes=1000):
    return ResNet(Bottleneck, [3, 8, 36, 3], num_classes)
```

## 关键创新点

### 1. 跳跃连接（Skip Connection）
- 实现恒等映射，梯度可以直接流过
- 缓解梯度消失问题
- 使深层网络训练成为可能

### 2. 残差学习
- 学习残差函数而非目标映射
- 优化更容易，收敛更快
- 网络性能随深度增加而提升

### 3. 批归一化（Batch Normalization）
- 加速网络训练
- 提供正则化效果
- 允许使用更大的学习率

## 性能对比

| 模型 | 层数 | Top-5错误率 | 参数量 |
|------|------|------------|--------|
| VGGNet | 19 | 7.3% | 138M |
| GoogLeNet | 22 | 6.67% | 6.8M |
| ResNet-18 | 18 | - | 11.7M |
| ResNet-34 | 34 | - | 21.8M |
| ResNet-50 | 50 | 5.25% | 25.6M |
| ResNet-101 | 101 | - | 44.5M |
| ResNet-152 | 152 | 4.49% | 60.2M |

## 变体与改进

### 1. ResNeXt
- 引入**基数（Cardinality）**维度
- 使用分组卷积
- 在相同参数量下性能更好

### 2. DenseNet
- 密集连接，每层连接所有前面的层
- 特征复用，参数效率更高

### 3. SE-ResNet
- 引入**通道注意力机制**
- 自适应调整通道权重
- 提升特征表示能力

## 应用场景

1. **图像分类**：大规模图像识别基准网络
2. **目标检测**：Faster R-CNN等检测器的骨干网络
3. **图像分割**：语义分割的编码器
4. **迁移学习**：预训练模型广泛用于下游任务
5. **人脸识别**：FaceNet等模型的基础网络

## 总结

ResNet通过残差学习和跳跃连接，成功解决了深度网络训练的难题：

- **解决了退化问题**：深层网络性能不再下降
- **缓解了梯度消失**：梯度可以顺畅传播
- **开启了深度网络时代**：100+层网络成为可能
- **奠定了现代网络基础**：后续网络架构都借鉴了残差思想

ResNet的成功证明了：**网络深度是提升性能的关键因素**，而残差学习是实现深度网络的有效方法。
