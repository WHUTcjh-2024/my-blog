# 经典 CNN 架构的工程演进：VGG 与模块化卷积块

这里阐述一下我对VGG的理解。

## 从AlexNet到VGG

AlexNet已经证明了"更深的网络效果更好"，但是AlexNet的结构其实有点乱——每层的卷积核大小、步幅、填充都不一样，没有什么规律可言。

VGG的核心思想其实就一句话：**用重复的小卷积块来构建深层网络**。

VGG的作者发现，与其用一个大的卷积核（比如7×7），不如用多个小的卷积核（比如三个3×3）来替代。为什么呢？因为三个3×3的卷积核堆起来，感受野和一个7×7的一样大，但是参数量更少，而且多了两次非线性变换，表达能力更强。

举个例子：

一个7×7的卷积层：参数量 = 7×7 = 49

三个3×3的卷积层：参数量 = 3×3×3 = 27

参数少了将近一半，效果还更好，这就是VGG的聪明之处。

## VGG块的概念

VGG提出了一个概念——**VGG块**。

一个VGG块由以下部分组成：
```text
卷积层（3×3，padding=1）→ ReLU → 卷积层（3×3，padding=1）→ ReLU → ... → 最大池化（2×2，stride=2）
```

就是几个3×3卷积加上ReLU，最后跟一个2×2的最大池化层。

VGG的网络其实就是把这些VGG块堆叠起来，最后再接上全连接层。

VGG的精妙之处就在于用小卷积核，因为小卷积核更容易训练，多个堆起来的感受野比较大，结构统一。

## VGG的典型结构

VGG-16的结构大致是这样的：
```text
输入（224×224×3）
→ VGG块1：2个卷积层（64通道）→ 最大池化
→ VGG块2：2个卷积层（128通道）→ 最大池化
→ VGG块3：3个卷积层（256通道）→ 最大池化
→ VGG块4：3个卷积层（512通道）→ 最大池化
→ VGG块5：3个卷积层（512通道）→ 最大池化
→ 展平
→ 全连接层（4096）→ ReLU → Dropout
→ 全连接层（4096）→ ReLU → Dropout
→ 全连接层（1000）→ 输出
```

为什么叫VGG-16？因为总共有16个带权重的层（13个卷积层 + 3个全连接层）。

## VGG比AlexNet强在哪

**结构更规整**：AlexNet每层都在"即兴发挥"，VGG则用统一的3×3卷积核，结构非常工整，像搭积木一样。

**更深但更省参数**：VGG-16有16层，比AlexNet深很多，但因为用了小卷积核，参数量反而更可控。

**特征提取更精细**：多个小卷积核堆叠，每一层都能学到更细致的特征。第一层学边缘，第二层学纹理，第三层学更复杂的模式，层层递进。

**迁移学习效果好**：VGG的特征提取能力很强大。

## 工程角度

从工程角度看，VGG的设计思想对后来的网络影响很大：

**模块化设计**：VGG块的概念启发了后来的ResNet、DenseNet等网络，大家都开始用"块"来组织网络结构。

**小卷积核的胜利**：VGG证明了3×3卷积核的有效性，从此3×3成为了主流选择，一直沿用到现在。

**计算量大**：VGG的缺点也很明显，就是计算量大，尤其是全连接层，参数量巨大。VGG-16的参数量大约有1.38亿，其中全连接层就占了大部分。

**显存占用高**：因为网络深，中间的特征图也多，所以训练VGG需要比较大的显存。

## VGG的PyTorch实现

这里给出VGG块的简洁实现：

```python
import torch
from torch import nn

def vgg_block(num_convs, in_channels, out_channels):
    """
    创建一个VGG块
    num_convs: 卷积层的数量
    in_channels: 输入通道数
    out_channels: 输出通道数
    """
    layers = []
    for _ in range(num_convs):
        layers.append(nn.Conv2d(in_channels, out_channels,kernel_size=3, padding=1))
        layers.append(nn.ReLU())
        in_channels = out_channels
    layers.append(nn.MaxPool2d(kernel_size=2, stride=2))#池化
    return nn.Sequential(*layers)
```
这里in_channels = out_channels是因为为了保证通道维度的匹配，第二轮以后必须输入通道数是上一轮的输出通道数。

然后用VGG块来构建完整的网络：

```python
def vgg(conv_arch):
    conv_blks = []
    in_channels = 1 

    for (num_convs, out_channels) in conv_arch:
        conv_blks.append(vgg_block(num_convs, in_channels, out_channels))
        in_channels = out_channels

    return nn.Sequential(
        *conv_blks,
        nn.Flatten(),
        nn.Linear(out_channels * 7 * 7, 4096), nn.ReLU(), nn.Dropout(0.5),
        nn.Linear(4096, 4096), nn.ReLU(), nn.Dropout(0.5),
        nn.Linear(4096, 10)
    )

# VGG-11的配置
conv_arch = ((1, 64), (1, 128), (2, 256), (2, 512), (2, 512))
net = vgg(conv_arch)
```

## 总结

VGG的核心贡献就是提出了**用重复的块来构建深层网络**的思想，以及证明了**小卷积核堆叠比大卷积核更有效**。

虽然VGG现在在实际应用中已经很少直接使用了（因为太重了），但是它的设计理念——模块化、小卷积核——深深影响了后来所有的卷积神经网络。

## 工程价值

1. **解决什么问题：** VGG 用重复卷积块统一网络结构，降低深层 CNN 的设计和调试复杂度。
2. **适合场景：** 教学、架构验证、特征提取基线，以及算力充足时的小规模迁移学习实验。
3. **不适合场景：** 移动端、低延迟服务或显存受限环境；VGG 的参数量和计算量通常明显高于现代轻量模型。
4. **PyTorch 常见坑：** 展平前必须确认特征图尺寸；固定写死全连接层输入维度会在图片尺寸改变时触发 shape 错误，可使用自适应池化降低耦合。
5. **项目联系：** VGG 的模块化思想可用于组织衍射图像特征提取网络，但实际系统更需要控制模型规模和推理耗时。
