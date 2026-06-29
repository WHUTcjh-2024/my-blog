# 经典 CNN 架构的工程演进：NiN 与 1×1 卷积

这些部分作为CNN的子模块，我可能书面阐述的会比较少，请理解。

## NiN想干嘛

我认为NiN是卷积的一种升级思路，是在卷积核内部再做一层小网络。

它的核心思想是由全连接层组成的微型网络来替代传统CNN中的标准卷积层，并且在最后用全局平均池化来代替传统的大型全连接层。

## 一个NiN块怎么写

```python
import torch
from torch import nn

def nin_block(in_channels,out_channels,
kernel_size,stride,padding):
return nn.Sequential(
    nn.Conv2d(in_channels,out_channels,kernel_size,stride,padding),
    nn.ReLU(),
    nn.Conv2d(out_channels,out_channels,kernel_size=1),
    nn.ReLU(),
    nn.Conv2d(out_channels,out_channels,kernel_size=1),
    nn.ReLU()
)
```

第一层就是普通卷积，第二层是1×1卷积，第三层依然是1×1卷积。因为每一层后面都接了ReLU,所以连续堆卷积是有效的。

## 一个完整的NiN网络的样子

```python
net = nn.Sequential(
    nin_block(1,96,kernel_size=11,stride=4,padding=0),
    nn.MaxPool2d(kernel_size=3,stride=2),

    nin_block(96, 256, kernel_size=5, stride=1, padding=2),
    nn.MaxPool2d(kernel_size=3, stride=2),

    nin_block(256, 384, kernel_size=3, stride=1, padding=1),
    nn.MaxPool2d(kernel_size=3, stride=2),
    nn.Dropout(0.5),
    nin_block(384,10,kernel_size=3,stride=1,padding=1),
    nn.AdaptiveAvgPool2d((1,1)),
    nn.Flatten()
)
```

一个1×1的全连接层本质上就是对每个像素位置单独做一次全连接运算。

## AlexNet和NiN的区别

前者认为，前面先学着特征，最后交给全连接层作判断就可以。

后者认为卷积阶段就应该把特征学好。

## 什么是1×1卷积

1×1卷积不会提取新的空间信息，因为卷积核大小只有1×1。它主要作用于通道维度，本质上是在每个空间位置上执行一次全连接映射，实现通道之间的信息融合、升维或降维。



先写到这里，后面会补充。

## 工程价值

1. **解决什么问题：** 1×1 卷积以较低成本完成通道融合、升维或降维，NiN 则用局部网络增强卷积块的表达能力。
2. **适合场景：** 需要调整通道数、构建瓶颈层，或希望用全局平均池化替代大规模全连接层的视觉模型。
3. **不适合场景：** 1×1 卷积本身不聚合邻域空间信息，不能单独替代用于纹理和边缘提取的空间卷积。
4. **PyTorch 常见坑：** `Conv2d` 的输入必须保持 `NCHW`；需要同时核对输入通道、输出通道和后续残差分支的形状。
5. **项目联系：** 可作为图像特征压缩模块，用于控制激光衍射图像模型的参数量和计算量。
