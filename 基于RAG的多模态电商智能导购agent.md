# 基于RAG的多模态电商智能导购Agent

## 概述

本项目是一个基于**检索增强生成（RAG）**技术的多模态电商智能导购系统。该系统结合了大语言模型（LLM）的强大生成能力和知识检索能力，通过理解用户的文本和图片输入，提供精准的商品推荐和购物咨询服务。

## 项目背景

### 1. 电商导购的挑战

传统电商导购面临以下问题：
- **信息过载**：商品数量庞大，用户难以找到心仪商品
- **理解困难**：用户需求表达多样，系统难以准确理解
- **交互单一**：主要依赖文本搜索，缺乏多模态交互
- **知识局限**：基于规则的推荐系统缺乏领域知识

### 2. 解决方案

本项目通过以下技术组合解决上述问题：
- **RAG技术**：结合检索和生成，提供准确且丰富的回答
- **多模态理解**：支持文本和图片输入，更准确理解用户需求
- **Agent架构**：实现自主决策和任务规划，提升交互体验

## 技术架构

### 1. 整体架构

```
用户输入
├── 文本查询
├── 图片上传
└── 混合输入
        │
        ▼
┌─────────────────────┐
│   多模态理解模块     │
│  (CLIP/BLIP)        │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   RAG检索模块       │
│  (向量数据库)       │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   Agent决策模块     │
│  (LLM推理)         │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   响应生成模块      │
│  (LLM生成)         │
└─────────────────────┘
        │
        ▼
商品推荐 + 购物建议
```

### 2. 核心组件

#### 多模态理解模块
- **CLIP**：提取图像和文本的联合表示
- **BLIP**：生成图像描述和视觉问答
- **OCR**：识别图片中的文字信息

#### RAG检索模块
- **向量数据库**：存储商品信息的向量表示
- **检索器**：基于语义相似度的检索
- **重排序器**：对检索结果进行精排

#### Agent决策模块
- **任务规划**：分解用户查询为子任务
- **工具调用**：调用外部API和数据库
- **推理决策**：基于上下文进行推理

## 核心功能

### 1. 商品搜索与推荐

**文本搜索：**
```
用户输入："我想买一台轻薄笔记本，预算6000左右"
系统输出：
1. 检索相关商品信息
2. 理解用户需求（轻薄、笔记本、6000元）
3. 生成推荐列表和理由
```

**图片搜索：**
```
用户输入：上传一张衣服图片
系统输出：
1. 分析图片内容（款式、颜色、风格）
2. 检索相似商品
3. 推荐同款或相似商品
```

### 2. 智能问答

**商品咨询：**
```
用户：这款手机的电池续航怎么样？
系统：
1. 检索商品详情和用户评价
2. 提取电池相关信息
3. 生成准确的回答
```

**比较分析：**
```
用户：iPhone 15和华为Mate 60哪个更好？
系统：
1. 检索两款手机的详细信息
2. 对比关键参数
3. 给出客观的分析和建议
```

### 3. 购物助手

**个性化推荐：**
- 基于用户历史行为
- 考虑用户偏好
- 提供定制化建议

**场景化推荐：**
```
用户：我要送女朋友生日礼物
系统：
1. 询问预算和偏好
2. 检索适合的礼物商品
3. 提供搭配建议
```

## 代码实现

### 1. RAG检索模块

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

class ProductRetriever:
    """商品检索器"""
    def __init__(self, collection_name="products"):
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(
            collection_name=collection_name,
            embedding_function=self.embeddings
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )

    def add_products(self, products):
        """添加商品信息到向量数据库"""
        texts = []
        metadatas = []

        for product in products:
            # 构建商品文本描述
            text = f"""
            商品名称：{product['name']}
            类别：{product['category']}
            价格：{product['price']}
            描述：{product['description']}
            规格：{product['specs']}
            """
            texts.append(text)
            metadatas.append(product)

        # 分块并存储
        chunks = self.text_splitter.create_documents(texts, metadatas)
        self.vectorstore.add_documents(chunks)

    def search(self, query, k=5, filters=None):
        """检索相关商品"""
        results = self.vectorstore.similarity_search_with_score(
            query=query,
            k=k,
            filter=filters
        )
        return results
```

### 2. 多模态理解模块

```python
import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image

class MultimodalUnderstanding:
    """多模态理解模块"""
    def __init__(self, model_name="openai/clip-vit-base-patch32"):
        self.model = CLIPModel.from_pretrained(model_name)
        self.processor = CLIPProcessor.from_pretrained(model_name)

    def encode_image(self, image_path):
        """编码图像"""
        image = Image.open(image_path)
        inputs = self.processor(images=image, return_tensors="pt")
        with torch.no_grad():
            image_features = self.model.get_image_features(**inputs)
        return image_features

    def encode_text(self, text):
        """编码文本"""
        inputs = self.processor(text=text, return_tensors="pt", padding=True)
        with torch.no_grad():
            text_features = self.model.get_text_features(**inputs)
        return text_features

    def image_text_similarity(self, image_path, text):
        """计算图像和文本的相似度"""
        image_features = self.encode_image(image_path)
        text_features = self.encode_text(text)

        # 归一化
        image_features = image_features / image_features.norm(dim=-1, keepdim=True)
        text_features = text_features / text_features.norm(dim=-1, keepdim=True)

        # 计算相似度
        similarity = (image_features @ text_features.T).item()
        return similarity

    def generate_image_caption(self, image_path):
        """生成图像描述"""
        from transformers import BlipProcessor, BlipForConditionalGeneration

        processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

        image = Image.open(image_path)
        inputs = processor(image, return_tensors="pt")

        out = model.generate(**inputs)
        caption = processor.decode(out[0], skip_special_tokens=True)
        return caption
```

### 3. Agent决策模块

```python
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool
from langchain.prompts import PromptTemplate

class ShoppingAgent:
    """购物Agent"""
    def __init__(self, llm, retriever):
        self.llm = llm
        self.retriever = retriever

        # 定义工具
        self.tools = [
            Tool(
                name="商品搜索",
                func=self.search_products,
                description="搜索商品信息，输入应该是商品描述"
            ),
            Tool(
                name="价格比较",
                func=self.compare_prices,
                description="比较不同商品的价格，输入应该是商品名称列表"
            ),
            Tool(
                name="用户评价",
                func=self.get_reviews,
                description="获取商品的用户评价，输入应该是商品名称"
            ),
        ]

        # 定义提示模板
        self.prompt = PromptTemplate.from_template("""
        你是一个智能购物助手，帮助用户找到合适的商品。

        你可以使用以下工具：
        {tools}

        工具名称列表：{tool_names}

        请按照以下格式回答：

        Question: 用户的问题
        Thought: 思考应该采取什么行动
        Action: 工具名称
        Action Input: 工具输入
        Observation: 工具返回的结果
        ... (可以重复多次)
        Thought: 我现在知道答案了
        Final Answer: 最终答案

        开始！

        Question: {input}
        {agent_scratchpad}
        """)

        # 创建Agent
        self.agent = create_react_agent(self.llm, self.tools, self.prompt)
        self.agent_executor = AgentExecutor(
            agent=self.agent,
            tools=self.tools,
            verbose=True,
            handle_parsing_errors=True
        )

    def search_products(self, query):
        """搜索商品"""
        results = self.retriever.search(query, k=3)
        return "\n".join([str(r) for r in results])

    def compare_prices(self, products):
        """比较价格"""
        # 实现价格比较逻辑
        pass

    def get_reviews(self, product_name):
        """获取评价"""
        # 实现评价获取逻辑
        pass

    def run(self, query):
        """运行Agent"""
        result = self.agent_executor.invoke({"input": query})
        return result["output"]
```

### 4. 完整系统集成

```python
class ECommerceAssistant:
    """电商智能导购系统"""
    def __init__(self):
        # 初始化各模块
        self.retriever = ProductRetriever()
        self.multimodal = MultimodalUnderstanding()
        self.agent = ShoppingAgent(llm=None, retriever=self.retriever)

    def process_query(self, query, image=None):
        """处理用户查询"""
        # 1. 理解用户意图
        if image:
            # 多模态理解
            image_caption = self.multimodal.generate_image_caption(image)
            query = f"{query}，参考图片：{image_caption}"

        # 2. 使用Agent处理查询
        response = self.agent.run(query)

        return response

    def add_products(self, products):
        """添加商品信息"""
        self.retriever.add_products(products)

# 使用示例
assistant = ECommerceAssistant()

# 添加商品数据
products = [
    {
        "name": "iPhone 15 Pro",
        "category": "手机",
        "price": 8999,
        "description": "苹果最新旗舰手机，A17 Pro芯片",
        "specs": "6.1英寸，256GB，钛金属边框"
    },
    # ... 更多商品
]
assistant.add_products(products)

# 文本查询
response = assistant.process_query("推荐一款拍照好的手机")
print(response)

# 图片查询
response = assistant.process_query("找到类似的商品", image="query.jpg")
print(response)
```

## 技术亮点

### 1. RAG技术
- **知识增强**：结合外部知识库，提高回答准确性
- **实时更新**：商品信息可以动态更新
- **可解释性**：可以追溯回答的来源

### 2. 多模态理解
- **图文结合**：支持文本和图片输入
- **语义理解**：深度理解用户意图
- **跨模态检索**：用图片搜索文本，用文本搜索图片

### 3. Agent架构
- **自主决策**：根据任务自动选择工具
- **任务规划**：复杂任务自动分解
- **迭代优化**：根据反馈不断改进

## 应用场景

### 1. 电商平台
- **智能客服**：自动回答用户咨询
- **商品推荐**：个性化推荐系统
- **搜索增强**：语义搜索，提高搜索准确率

### 2. 社交电商
- **内容理解**：理解用户分享的图文内容
- **相似推荐**：推荐相似风格的商品
- **搭配建议**：提供穿搭、家居搭配建议

### 3. 跨境电商
- **多语言支持**：支持不同语言的咨询
- **文化理解**：理解不同地区的购物习惯
- **本地化推荐**：针对不同市场推荐商品

## 总结

基于RAG的多模态电商智能导购Agent系统代表了电商智能服务的发展方向：

- **RAG技术**：解决了大模型知识局限和幻觉问题
- **多模态理解**：更准确地理解用户需求
- **Agent架构**：实现了智能化的任务处理
- **实际应用**：可直接应用于电商平台

该系统展示了AI技术在电商领域的巨大潜力，为用户提供了更智能、更便捷的购物体验。
