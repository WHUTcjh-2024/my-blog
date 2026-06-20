# Kaggle题目：Spaceship Titanic（基于MLP实现）

我使用Colab的免费T4 GPU来完成这个轻量级实战项目。

仅使用MLP，在公开榜单上获得了0.79845分。
![alt text](/images/kaggle/image-7.png)

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

这是训练的数据：
![alt text](/images/kaggle/kaggle-training.png)

在训练集上的准确率在82%左右，在验证集上的准确率为80%左右，有一点轻微的过拟合。

当我把dropout从0.2改为0.3以后，训练数据变成了这样：
![alt text](/images/kaggle/image-4.png)

验证集的准确率有一点点的提高。

当我把dropout改回0.2，并把学习率改为0.0005的时候，产生了过拟合的前兆，模型在训练集和验证集上的准确率并没有提升很多，但是loss在持续下降，模型在训练集上越来越自信：
![alt text](/images/kaggle/image-5.png)

当我把学习率调大一点，直接出现了明显的过拟合现象：
![alt text](/images/kaggle/image-6.png)

如果想要提升准确率，只能采用其他策略，单纯的调参已经无法大幅度提升了。

从特征工程入手，或者直接抛弃MLP，采用其他更强的神经网络。

## 这里是我第一次的代码,我其实是在colab中分模块跑的，大概有五六个模块。但是这里我将它们合并到了一起来展示：
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
