# Spaceship Titanic：从特征工程到 PyTorch MLP 提交

## 项目背景

Spaceship Titanic 是一个表格二分类任务：根据乘客的出发地、目的地、舱位、消费、冷冻睡眠状态等信息，预测乘客是否被传送到另一个维度。本项目使用 pandas 与 scikit-learn 完成数据处理，使用 PyTorch 构建 MLP，并完成验证集评估和 Kaggle 提交。

**项目结果：** 仅使用 MLP，在 Kaggle 公开榜获得 **0.79845**。训练集准确率约 82%，验证集准确率约 80%。

## 数据字段理解

数据同时包含数值、类别、布尔和复合字符串字段。预处理前重点检查字段类型、缺失比例以及业务关系：

- `PassengerId` 中包含组编号，可派生同行组规模与是否独行。
- `Cabin` 可拆分为甲板、舱号和左右侧。
- `RoomService`、`FoodCourt` 等消费列可合成为总消费额。
- `CryoSleep` 与消费存在业务关联，冷冻睡眠乘客通常不产生消费。
- `Transported` 是训练集标签，提交时需要还原为布尔结果。

## 特征工程

1. 将 `Cabin` 拆为 `Cabin_deck`、`Cabin_num`、`Cabin_side`。
2. 从 `PassengerId` 提取组编号，构造 `GroupSize` 和 `IsAlone`。
3. 汇总五项消费得到 `TotalSpend`，并构造 `NoSpend`。
4. 数值特征用中位数填补，并使用 `StandardScaler` 标准化。
5. 类别特征用众数填补，使用 `OneHotEncoder(handle_unknown='ignore')` 编码。

消费缺失值在初版实验中按 0 填补，这是结合冷冻睡眠背景做出的假设。更严谨的后续方案应区分 `CryoSleep=True` 与其他乘客，并比较“填 0”“中位数填补”“增加缺失指示特征”的交叉验证结果。

## 模型设计

模型为 `input_dim → 64 → 32 → 1` 的 MLP。隐藏层使用 ReLU，每层后加入 Dropout；输出使用 Sigmoid，并以二元交叉熵训练。初版设置为 Adam 优化器、学习率 `0.001`、batch size `64`、训练 40 个 epoch。

> 当前代码沿用 `Sigmoid + BCELoss` 便于展示原始实验。工程实现更推荐移除最后的 Sigmoid，改用数值稳定性更好的 `BCEWithLogitsLoss`，推理时再对 logits 调用 Sigmoid。

## 训练与验证

数据按 8:2 划分训练集和验证集，并使用 `stratify=y` 保持标签比例。训练阶段开启梯度和 Dropout；评估阶段调用 `model.eval()` 关闭 Dropout，并使用 `torch.no_grad()` 避免构建计算图。

## 结果分析与过拟合处理

我使用 Colab 的免费 T4 GPU 完成这个轻量级实战项目。

提交结果如下：
![Spaceship Titanic Kaggle 公开榜提交结果](/images/kaggle/image-7.png)

我首先拿到了数据集，然后读取并打印了它们，结合kaggle竞赛的官网数据集介绍大致了解了一下，然后使用python看了一下缺失值情况以及各列的数据样式。

然后我开始进行清洗数据和特征工程，这里我选择了使用中位数和众数来填补缺失值的方法，然后根据实际背景情况对某些缺失值进行了特殊处理，比如说消费金额的缺失值，我用0进行的填补，因为这个题目的实际背景有一个参数是CryoSleep——表示乘客是否选择在整个航程内进入休眠状态。处于冷冻睡眠状态的乘客被限制在舱内。

所以消费金额的缺失值极有可能是这类人进入了冷冻睡眠状态，这里没有用常规的中位数或者众数来替代，而是根据冷冻人不消费的原则，将他们全部记为了0。

另外数据处清洗的过程中，由于每一列的类型和不同，对于不同的数据采用的方式也不同。

对于数值型的数据，就用中位数来填充的缺失值并进行了标准化。

对于类别类的特征，用的是众数来填充缺失值，然后进行的独热编码。

然后将它们整合到了一个预处理器当中，最终得到特征矩阵。

神经网络部分没有使用sklearn，使用的是PyTorch来实现的。

训练过程使用的二分类交叉熵损失函数以及Adam优化器，学习率使用的经验值0.001。

模型评估部分关闭了dropout和梯度计算，然后计算准确率来评估。

这是训练数据：
![MLP 初始训练与验证指标](/images/kaggle/kaggle-training.png)

在训练集上的准确率在82%左右，在验证集上的准确率为80%左右，有一点轻微的过拟合。

当我把dropout从0.2改为0.3以后，训练数据变成了这样：
![Dropout 调整为 0.3 后的训练结果](/images/kaggle/image-4.png)

验证集的准确率有一点点的提高。

当我把dropout改回0.2，并把学习率改为0.0005的时候，产生了过拟合的前兆，模型在训练集和验证集上的准确率并没有提升很多，但是loss在持续下降，模型在训练集上越来越自信：
![降低学习率后的训练与验证曲线](/images/kaggle/image-5.png)

当我把学习率调大一点，直接出现了明显的过拟合现象：
![调大学习率后出现过拟合](/images/kaggle/image-6.png)

如果想要提升准确率，只能采用其他策略，单纯的调参已经无法大幅度提升了。

继续提升时应优先改进特征工程并建立树模型基线，而不是盲目加深 MLP。对这类中小规模表格数据，CatBoost、LightGBM 或 XGBoost 往往比更深的神经网络更值得比较。

## 实现代码

第一次实验在 Colab 中分模块运行，下面合并展示完整的数据处理与训练主流程：
```python
import os
import pandas as pd

train_df = pd.read_csv('data/train.csv')
test_df = pd.read_csv('data/test.csv')

print("Training data shape:", train_df.shape)
print("Test data shape:", test_df.shape)

display(train_df.head(30))
train_df.info()
print(train_df.isnull().sum())

df = pd.concat([train_df, test_df], ignore_index=True)

df['Cabin'] = df['Cabin'].fillna('None/None/None')
df[['Cabin_deck', 'Cabin_num', 'Cabin_side']] = df['Cabin'].str.split('/', expand=True)

df['Group'] = df['PassengerId'].apply(lambda x: x.split('_')[0])
group_sizes = df['Group'].value_counts().to_dict()
df['GroupSize'] = df['Group'].map(group_sizes)
df['IsAlone'] = (df['GroupSize'] == 1).astype(int)

spend_cols = ['RoomService', 'FoodCourt', 'ShoppingMall', 'Spa', 'VRDeck']

# 消费如果是缺失值，大概率是没消费用0填补
df[spend_cols] = df[spend_cols].fillna(0)

df['TotalSpend'] = df[spend_cols].sum(axis=1) #axis=1是按行求和

# 判断总消费是否为0，如果是，记为1
df['NoSpend'] = (df['TotalSpend'] == 0).astype(int)

train_features = df[df['Transported'].notnull()].copy()
test_features = df[df['Transported'].isnull()].copy()

drop_cols = ['PassengerId', 'Cabin', 'Cabin_num', 'Name', 'Group', 'Transported']

X = train_features.drop(columns=drop_cols)
y = train_features['Transported'].astype(int)  # 转化为 0 和 1

X_test = test_features.drop(columns=drop_cols)

numerical_cols = ['Age', 'RoomService', 'FoodCourt', 'ShoppingMall', 'Spa', 'VRDeck', 'TotalSpend', 'GroupSize']
categorical_cols = ['HomePlanet', 'CryoSleep', 'Destination', 'VIP', 'Cabin_deck', 'Cabin_side', 'IsAlone', 'NoSpend']

print("训练集特征形状 (X):", X.shape)
print("测试集特征形状 (X_test):", X_test.shape)

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
#数值型特征
num_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())#归一化
])
#类别型
cat_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

preprocessor = ColumnTransformer(transformers=[
    ('num', num_transformer, numerical_cols),
    ('cat', cat_transformer, categorical_cols)
])

# 转换数据
X_processed = preprocessor.fit_transform(X)
X_test_processed = preprocessor.transform(X_test)

X_train_raw, X_val_raw, y_train_raw, y_val_raw = train_test_split(
    X_processed, y.values, test_size=0.2, random_state=42, stratify=y
)

X_train_tensor = torch.tensor(X_train_raw, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train_raw, dtype=torch.float32).unsqueeze(1) # 转成列向量
X_val_tensor = torch.tensor(X_val_raw, dtype=torch.float32)
y_val_tensor = torch.tensor(y_val_raw, dtype=torch.float32).unsqueeze(1)
X_test_tensor = torch.tensor(X_test_processed, dtype=torch.float32)

train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)

class SpaceshipMLP(nn.Module):
    def __init__(self,input_dim):
        super(SpaceshipMLP,self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 1),#直接压缩到1维就是能否活着
            nn.Sigmoid()#压缩到概率
        )
        
    def forward(self,x):
        return self.network(x)

input_dim = X_train_tensor.shape[1]
model = SpaceshipMLP(input_dim)
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
epochs = 40

for epoch in range(epochs):
    model.train() 
    epoch_loss = 0
    
    for batch_X, batch_y in train_loader:
        optimizer.zero_grad()      
        predictions = model(batch_X)
        loss = criterion(predictions, batch_y)
        loss.backward()
        optimizer.step() 
        
        epoch_loss += loss.item() * batch_X.size(0)
        
    if (epoch + 1) % 10 == 0 or epoch == 0:
        model.eval() #关掉dropout
        with torch.no_grad():
            val_preds = model(X_val_tensor)
            val_preds_cls = (val_preds > 0.5).float() #大于0.5视为生还
            val_acc = (val_preds_cls == y_val_tensor).float().mean()
            train_preds = model(X_train_tensor)
            train_preds_cls = (train_preds > 0.5).float()
            train_acc = (train_preds_cls == y_train_tensor).float().mean()   
        print(f"Epoch [{epoch+1}/{epochs}] | Loss: {epoch_loss/len(X_train_raw):.4f} | Train Accuracy: {train_acc:.4f} | Val Accuracy: {val_acc:.4f}")
print("\n模型训练完成")
```

## 遇到的问题与解决方案

### 类别和数值特征不能使用同一套处理方式

通过 `ColumnTransformer` 分开组织两条流水线：数值列执行中位数填补和标准化，类别列执行众数填补和 OneHot 编码。`handle_unknown='ignore'` 避免测试集出现训练集未见类别时直接报错。

### Dropout 需要在验证阶段关闭

训练时使用 `model.train()`，验证时切换到 `model.eval()`，否则验证结果会受到随机失活影响，难以稳定比较实验。

### 仅看 loss 不能判断泛化能力

实验中训练 loss 继续下降，但验证准确率没有同步提升。解决方式是同时记录训练集与验证集指标，并将两者差距作为过拟合信号。

### 初版流程存在数据泄漏风险

当前保留的原始代码在划分训练/验证集之前对全部训练数据执行了 `preprocessor.fit_transform`，这会让填补值、标准化统计量和类别集合提前看到验证集。更严格的流程应先划分原始 DataFrame，再仅在训练折上 `fit`，对验证集和测试集只执行 `transform`。公开榜成绩可作为项目结果保留，但后续实验比较应修复这一问题。

## 项目收获

- 跑通了从原始 CSV、业务字段理解、特征工程到 Kaggle 提交的完整闭环。
- 理解了 OneHot 编码、标准化和 MLP 输入维度之间的连接关系。
- 通过对比 Dropout 和学习率实验，建立了用验证集识别过拟合的基本方法。
- 认识到表格任务的主要上限往往来自特征质量与验证方案，而不是单纯增加网络深度。

## 后续优化方向

1. 先划分数据，再拟合预处理器，消除验证集泄漏。
2. 使用 `BCEWithLogitsLoss`，并增加 early stopping 与最佳权重保存。
3. 使用 Stratified K-Fold，降低单次划分带来的结果波动。
4. 建立 Logistic Regression、Random Forest、CatBoost 等基线。
5. 对消费缺失假设、同行组信息和舱位拆分特征进行消融实验。
