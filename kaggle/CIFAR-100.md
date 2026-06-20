# Kaggle题目：CIFAR-100 - Object Recognition in Images（基于CNN实现）

这次打的是 Kaggle 上的 CIFAR-100 图像分类题目，目标是把 32×32 的小图分到 100 个类别里。用的是 CNN 方案，具体来说是在 ResNet-18 的基础上做迁移学习。跑的地方是 Kaggle Notebook，绑了手机号以后每周能白嫖 20-30 小时的 GPU，种类还挺多的，跑基本任务完全够用。

![alt text](/images/kaggle/image-9.png)

下载好数据集之后，第一步当然是先打印一些样本看看数据长什么样。CIFAR-100 有 50000 张训练图和 10000 张测试图，每张都是 32×32 的彩色图，100 个类别。说实话 32×32 真的很小，人眼看起来都有点费劲，所以这对模型来说也是个挑战。

![alt text](/images/kaggle/image-8.png)

# 数据预处理

数据集下载下来之后分两份：训练集和测试集，分别给它们设不同的 transform。

训练集要增强，做了三件事：

随机裁剪：图片周围先填 4 像素的白边，然后随机裁一块 32×32 的区域出来。这样每次裁的位置都不一样，等于给模型看稍微有点偏移的图片

随机水平翻转：有概率把图片左右翻过来，猫朝左和朝右应该都是猫

随机旋转：最多转 15 度，让模型不要死记图片的角度
测试集不增强，老老实实转成 Tensor 然后归一化就行，评估的时候不应该加任何干扰。

归一化用的是 ImageNet 的均值和标准差，因为后面用的 ResNet-18 是在 ImageNet 上预训练出来的，它习惯这个分布，保持一致效果会好一些。

DataLoader 那边，batch_size=128，训练集每轮打乱顺序，测试集不打乱。

# 模型设计

这里采用了Gemini给的思路：

直接用原版的 ResNet-18 不太合适，因为 CIFAR 的图片只有 32×32，而 ResNet 原本是给 224×224 的 ImageNet 图片设计的，感受野太大了。所以做了三个改动：

改 conv1：把原来的 7×7、stride=2 的大卷积核换成 3×3、stride=1 的小卷积核。原因如下，32×32 的图如果第一层就 stride=2 把尺寸砍半，再加上 7×7 的核，特征提取就太粗暴了，会丢失很多空间信息。

去掉 maxpool：原版 ResNet 在 conv1 后面有个 3×3、stride=2 的最大池化层，也是为了快速缩小特征图尺寸。但对小图来说不需要这么激进，直接用 nn.Identity() 替换掉，相当于不做池化。

改最后的全连接层：把 fc 的输出从1000改成100。

这里用了一些迁移学习的思想，但是我还没有开始学习迁移学习。

# 训练部分

损失函数用的是分类任务标配的CrossEntropyLoss。

优化器用的是AdamW，这个优化器对学习率没有特别的敏感，而且收敛比较快，比SGD好一些。

## 学习率调度使用了余弦退火，这也是AI提供的思路，让学习率从大到小，平滑地降下来，因为一开始学的时候模型啥也不会，学习率可以大一点。训练到后面学的就差不多了，没必要那么大，学习率就调小一点。这是个不错的想法。


# 问题

这是第一次训练的结果，设置了30轮epoch，使用GPU P100进行训练，大约训练一个epoch需要1分钟左右，训练完成后发现，在训练集上的表现太好了，达到了95%之多，但是在验证集上的表现远低于训练集，只有73%左右，出现了严重的过拟合。

## 这次跑下来算是把整个流程走通了，但效果不理想，时间原因，后面还会继续做这个，把ResNet改掉，换一个别的CNN试一下，我的计划是，哪怕在验证集上的表现不太好，但是不能过拟合，要保证在训练集上的准确率和在验证集上的准确率差别不大。这是冲榜的关键，尤其是私榜。
![alt text](/images/kaggle/image-10.png)

![alt text](/images/kaggle/image-11.png)


# 个人的一些想法

这次跑完看到训练集 95%、验证集 73% 的时候，说实话心里是有预期的，因为训练过程中就能感觉到不对劲， 训练集的 loss 一直在降、acc 一直在涨，但验证集的指标到了某个点就不动了，甚至开始往回走。这就是典型的过拟合信号。

回头想想，我犯了一个比较常见的错误：一上来就端着大模型硬训，没有先从简单的开始试。 ResNet-18 虽然是 ResNet 家族里最小的，但对 CIFAR-100 来说仍然不算小，100 个类别，每类才 500 张训练图，总共也就 5 万张，模型参数量却有上千万。这就好比让一个大学生去做小学数学题，他不是做不对，而是会想太多，把训练集里的噪声和巧合都当成了规律记下来。

另外关于数据增强，我当时只用了最基础的翻转、裁剪、旋转，现在回头看这些增强手段太低级了。CIFAR-100 的数据量本身就不大，增强不够等于没给模型看到足够多样的样本。后面了解到别的方法，它们的思路不太一样 ，不是简单地变换图片，而是直接破坏图片的一部分或者把两张图混在一起，逼着模型去学更鲁棒的特征，而不是死记某块区域的像素。

还有一个我后来才意识到的点，之前根本就不知道，我没有冻结预训练层。 ResNet-18 的前面几层学到的是通用的边缘、纹理特征，这些在 CIFAR-100 上大概率也是有用的，没必要全部放开训练。全部放开的话，前面那些层也在跟着 CIFAR-100 的小数据集调参数，反而容易把预训练学到的好特征给洗掉了。如果当时冻结前面的层，只微调后面的全连接层和最后几个block，可能过拟合会好很多。

这次最大的收获其实不是怎么调模型，而是理解了一件事：过拟合的本质是模型的能力超过了数据能提供的信息量。 解决办法无非两条路，，要么给模型加约束，要么给数据更强的数据增强、数据扩充。两条路应该同时走，而不是只靠一条。

这是失败的代码，出现了严重的过拟合。
```python
import copy
import time
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
import torchvision.models as models
from torchvision.models import resnet18, ResNet18_Weights 
import matplotlib.pyplot as plt
from tqdm.auto import tqdm

device = torch.device("cuda")
print(f"GPU设备: {torch.cuda.get_device_name(0)}")

transform_train = transforms.Compose([
    transforms.RandomCrop(32, padding=4),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))
])

transform_test = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))
])

trainset = torchvision.datasets.CIFAR100(root='./data', train=True, download=True, transform=transform_train)
testset = torchvision.datasets.CIFAR100(root='./data', train=False, download=True, transform=transform_test)

trainloader = torch.utils.data.DataLoader(trainset, batch_size=128, shuffle=True, num_workers=0, pin_memory=False)
testloader = torch.utils.data.DataLoader(testset, batch_size=128, shuffle=False, num_workers=0, pin_memory=False)


def get_cifar_resnet18():
    model = resnet18(weights=ResNet18_Weights.DEFAULT)
    model.conv1 = nn.Conv2d(3, 64, kernel_size=3, stride=1, padding=1, bias=False)
    model.maxpool = nn.Identity() 
    model.fc = nn.Linear(model.fc.in_features, 100)
    return model

model = get_cifar_resnet18().to(device)

criterion = nn.CrossEntropyLoss()

optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)

epochs = 30
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)
def train(epoch):
    model.train()
    train_loss = 0
    correct = 0
    total = 0
    pbar = tqdm(trainloader, desc=f"Epoch [{epoch+1:02d}/{epochs}]", leave=False)
    for batch_idx, (inputs, targets) in enumerate(pbar):
        inputs, targets = inputs.to(device), targets.to(device)
        
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()
        
        train_loss += loss.item()
        _, predicted = outputs.max(1)
        total += targets.size(0)
        correct += predicted.eq(targets).sum().item()
        
        if batch_idx % 20 == 0 or batch_idx == len(trainloader) - 1:
            current_loss = train_loss / (batch_idx + 1)
            current_acc = 100. * correct / total
            pbar.set_postfix(Loss=f"{current_loss:.4f}", Acc=f"{current_acc:.2f}%")
            
    return train_loss / len(trainloader), current_acc

def test():
    model.eval()
    test_loss = 0
    correct = 0
    total = 0
    
    with torch.no_grad():
        for batch_idx, (inputs, targets) in enumerate(testloader):
            inputs, targets = inputs.to(device), targets.to(device)
            outputs = model(inputs)
            loss = criterion(outputs, targets)
            
            test_loss += loss.item()
            _, predicted = outputs.max(1)
            total += targets.size(0)
            correct += predicted.eq(targets).sum().item()
            
    return test_loss / len(testloader), 100. * correct / total
history = {'train_loss': [], 'train_acc': [], 'test_loss': [], 'test_acc': []}
best_acc = 0.0

print("===启动训练===")

for epoch in range(epochs):
    start_time = time.time()
    
    train_loss, train_acc = train(epoch)
    test_loss, test_acc = test()
    scheduler.step()
    
    epoch_time = time.time() - start_time
    
    history['train_loss'].append(train_loss)
    history['train_acc'].append(train_acc)
    history['test_loss'].append(test_loss)
    history['test_acc'].append(test_acc)
    
    print(f"Epoch [{epoch+1:02d}/{epochs}] | 耗时: {epoch_time:.1f}s | "
          f"Train Loss: {train_loss:.4f} Train Acc: {train_acc:.2f}% | "
          f"Test Loss: {test_loss:.4f} Test Acc: {test_acc:.2f}%")
    
    if test_acc > best_acc:
        best_acc = test_acc
        torch.save(model.state_dict(), 'best_model.pth')
        print(f"最高测试准确率更新为: {best_acc:.2f}%")

print(f"\n训练结束，历史最高的验证准确率为: {best_acc:.2f}%")

plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history['train_loss'], label='Train Loss')
plt.plot(history['test_loss'], label='Test Loss')
plt.title('Loss Curve')
plt.legend(); plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(history['train_acc'], label='Train Acc')
plt.plot(history['test_acc'], label='Test Acc')
plt.title('Accuracy Curve')
plt.legend(); plt.grid(True)
plt.show()
```