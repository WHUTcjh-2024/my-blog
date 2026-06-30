---
title: Atelier：基于 RAG 的多模态电商导购 Agent
description: 从真实商品目录、多模态检索、Agent 工具调用到交易闭环，介绍 Atelier 的系统设计、技术选型、评测结果与工程边界。
---

# Atelier：基于 RAG 的多模态电商导购 Agent

Atelier 是一个可本地运行、结果可追溯的服装导购系统。用户可以用自然语言描述场景与偏好，也可以上传参考图片；系统从 **5,000 件 H&M 真实商品及对应图片**中检索候选，再通过 Agent 完成推荐、对比、加购和模拟下单。

[查看项目源码](https://github.com/WHUTcjh-2024/-RAG-agent) · 技术方向：`RAG` `Agent` `多模态检索` `FastAPI` `React`

![Atelier 商品首页](/images/projects/atelier/home.png)

_首页直接展示真实商品目录，导购能力建立在可查询的数据之上，而不是让模型临时编造商品。_

## 项目要解决什么问题

传统关键词搜索适合查明确商品名，但不擅长处理下面这些需求：

- “预算有限、蓝色、简约、适合通勤的上衣”包含多个软硬约束；
- 用户通常在多轮对话中逐步补充颜色、场景和排除条件；
- 一张参考图片无法直接转换成稳定的关键词；
- 推荐结果如果没有商品证据，很容易出现不存在的款式或错误属性；
- 搜索、比较、购物车和下单属于业务动作，不能只生成一段自然语言。

因此我没有把系统做成“聊天框 + 大模型 API”，而是拆成真实商品目录、多模态 Retriever、状态化 Agent、交易工具和 Grounded 生成五部分。

## 系统如何运行

一次“参考这张图，推荐简约的蓝色通勤上衣”的请求会经过以下链路：

1. React 前端提交文本、可选图片、会话 ID 和语言；
2. FastAPI 校验图片 MIME、内容和 10 MB 大小限制；
3. 槽位抽取器识别颜色、品类、风格、场景、预算与排除项，并合并历史偏好；
4. Planner 从白名单工具中选择文本检索、图片检索或融合检索；
5. Retriever 先执行结构化硬过滤，再计算向量相似度和融合分数；
6. LLM 只能读取 Top-K 候选的安全字段并生成推荐理由；
7. Pydantic 校验结构，服务端再次检查商品 ID 是否属于候选集；
8. 后端通过 SSE 依次返回状态、槽位、工具轨迹、商品和回复文本。

```text
React / TypeScript
        │ REST + SSE
        ▼
FastAPI API ── 图片与参数校验
        │
        ▼
Agent Orchestrator ── Memory / Slot Extractor / Planner
        │
        ▼
Tool Registry ── 搜索 / 详情 / 对比 / 购物车 / 结算
        │
        ├── MiniLM 文本索引（384 维）
        ├── CLIP 图像索引（512 维）
        ├── 结构化属性与交易热度
        └── SQLite 商品库与会话状态
```

## 技术栈与职责

| 层级 | 技术 | 在项目中的作用 |
| --- | --- | --- |
| 前端 | React 19、TypeScript 5.9、Tailwind CSS 4 | 商品浏览、筛选、对比、导购抽屉和响应式界面 |
| 状态管理 | Zustand 5 | 管理商品、会话偏好、聊天、购物车和对比状态 |
| API | FastAPI、Pydantic 2 | REST/SSE 接口、参数校验、结构化输出和错误边界 |
| Agent | LangChain、OpenAI-compatible API | 工具注册、工具选择、Prompt 链和候选集内的理由生成 |
| 文本检索 | `paraphrase-multilingual-MiniLM-L12-v2` | 生成 384 维中英文商品语义向量 |
| 图像检索 | `openai/clip-vit-base-patch32` | 生成 512 维视觉向量，支持以图搜图 |
| 计算 | PyTorch、Transformers、Sentence Transformers、NumPy | 本地向量化、余弦相似度和 Top-K 选择 |
| 存储 | SQLite、CSV、JSON | 商品目录、会话、购物车、评测集与报告 |
| 质量保障 | Pytest、Vitest、Playwright、GitHub Actions | 后端、前端、端到端流程和持续集成 |
| 交付 | Docker Compose、Nginx | 前后端容器化和 API 反向代理 |

## 核心设计一：多模态检索不是把向量硬拼起来

文本向量是 384 维，图像向量是 512 维。系统没有直接拼接或相加两个不同空间的向量，而是分别计算模态内相似度，再做分数级后融合：

```text
final_score = 0.30 × text_score
            + 0.45 × image_score
            + 0.15 × structured_score
            + 0.10 × popularity_score
```

- `text_score`：用户描述与商品文本画像的语义相似度；
- `image_score`：参考图与商品图的视觉相似度；
- `structured_score`：颜色、品类等明确条件的匹配程度；
- `popularity_score`：真实交易热度经过 `log1p` 后形成的弱先验。

排序前先做结构化硬过滤。比如用户明确要求蓝色，就不应只依靠语义向量“猜测”颜色。图片权重较高是因为上传参考图时视觉意图更强，但这些权重只是当前产品场景的工程初值，并非训练得到的全局最优值。

### 为什么文本用 MiniLM，而不是更大的 Embedding 模型

项目需要本地运行、中英文检索和较低资源占用。MiniLM 在模型体积、CPU 推理速度和语义能力之间比较均衡，适合 5,000 商品的验证规模。更大模型可能提高语义能力，但会增加下载、内存和推理成本；是否值得应在同一人工标注集上比较 NDCG、Recall 和延迟，而不是只看参数量。

### 为什么图片用 CLIP，而不是训练一个服装分类器

CLIP 已具备通用视觉语义表示，可以在没有额外标注的情况下比较参考图与商品图。自训练分类器需要明确标签体系和大量标注，而且分类概率并不等价于视觉相似度。当前只使用 CLIP 图像编码侧做图像相似检索，没有把它包装成端到端跨模态推荐模型。

### 为什么当前不用 Elasticsearch 或向量数据库

5,000 条归一化向量直接用 NumPy 矩阵乘法即可完成精确检索，部署简单、行为透明，也便于验证排序逻辑。只取最大 K 项时使用 `argpartition`，避免对全部候选完整排序。

如果扩展到十万或百万商品，我会改为 FAISS HNSW/IVF 或 Milvus 做 ANN 召回，结构化字段建立独立索引，再用 Reranker 重排 Top 50～200；同时补充索引版本、增量更新和召回率—延迟监控。

## 核心设计二：Agent 是受控业务编排，不是自由聊天

系统把能力封装为 10 个白名单工具：

```text
search_products_by_text  search_products_by_image  hybrid_search
get_product_detail       compare_products          update_user_preference
add_to_cart              remove_from_cart          view_cart
checkout
```

Planner 只决定调用哪个工具，不直接修改数据库。工具参数、商品 ID 和状态变更仍由服务端校验。例如：

```text
“推荐蓝色通勤上衣”
→ update_user_preference
→ search_products_by_text
→ 保存 last_results

“对比第 1 件和第 3 件”
→ 从 last_results 解析真实商品 ID
→ compare_products
```

![Atelier 私人顾问与工具轨迹](/images/projects/atelier/ai-stylist.png)

_导购抽屉同时展示当前偏好槽位和工具轨迹，便于观察 Agent 为什么得到当前结果。_

## 核心设计三：如何控制大模型幻觉

这套系统的原则是：**检索决定“推荐谁”，LLM 只负责“如何解释”。**

- 商品卡片必须来自 Retriever 返回的真实目录；
- 只向模型暴露商品 ID、名称、品类、颜色、描述和检索分数等安全字段；
- Pydantic 限制输出字段、数量和推荐理由长度；
- 模型返回的 `article_id` 必须属于当前候选集；
- 工具由服务端执行，参数和业务状态再次校验；
- 模型超时、解析失败或越界时，自动生成基于目录字段的确定性理由。

因此即使用户通过 Prompt Injection 要求“忽略规则并推荐不存在的商品”，模型也无法绕过服务端商品白名单。当前仍缺少系统化的攻击样本评测，生产化还需要输入隔离、工具最小权限、调用限额和输出审计。

## 多轮记忆与交易闭环

每个 `session_id` 保存对话历史、偏好槽位、最近检索结果和购物车。内存缓存负责当前进程内快速读取，SQLite 使用 UPSERT 持久化完整状态，并用 `RLock` 保护单进程并发写入。服务重启后仍能恢复会话和购物车。

![Atelier 商品对比](/images/projects/atelier/comparison.png)

_用户可以从最近检索结果中选择 2～3 件商品比较，再继续加购和模拟结算。_

### 为什么用 SQLite，而不是一开始就用 Redis + PostgreSQL

当前目标是本地 Demo 和低并发单实例，SQLite 能用一个文件完成事务型持久化，显著降低部署成本。它的边界也很清楚：进程内锁不能覆盖多 Worker，更不适合高并发写入。生产化时会把短期会话和热点状态放入 Redis，把订单等长期业务数据放入 PostgreSQL。

### 为什么选择 SSE，而不是 WebSocket

当前交互是客户端发起一次请求，服务端单向持续返回 `status → meta → tool → products → message → done`。SSE 基于 HTTP，代理配置和前端增量解析更简单，正好匹配通信模式。只有在实时语音、高频双向通信或服务端主动推送出现后，WebSocket 才更合适。

## 评测结果与证据边界

固定评测报告包含 62 条确定性用例，其中 40 条是文本自检索用例：

| 指标 | 当前结果 |
| --- | ---: |
| Recall@1 / @5 / @10 | 1.000 / 1.000 / 1.000 |
| MRR@10 | 1.000 |
| 检索延迟 P50 | 40.66 ms |
| 检索延迟 P95 | 44.16 ms |
| 意图识别准确率 | 1.000 |
| 槽位抽取准确率 | 1.000 |

这些查询由目标商品信息构造，作用是防止索引或代码回归，**不能代表真实用户查询上的泛化能力**。更严格的评测需要人工标注 query-product 相关性，报告 NDCG、Recall、约束满足率、推荐多样性和置信区间。

本次整理博客时重新执行了当前仓库测试：后端 **13 项 Pytest**、前端 **2 项 Vitest** 全部通过，前端生产构建成功。仓库还包含覆盖浏览、筛选、图片上传、对比、购物车、结算和双语切换的 Playwright 流程。

## 我会如何继续演进

1. 建立 100～300 条人工查询与商品相关性标注，补齐 NDCG 和约束满足率；
2. 做融合权重消融实验，并引入 Cross-Encoder Reranker；
3. 使用 FAISS 构造十万/百万级压测，记录 P95/P99、吞吐和内存；
4. 将 SQLite 状态升级为 Redis + PostgreSQL，增加幂等、鉴权和限流；
5. 增加 Prompt Injection、恶意图片和工具越权测试；
6. 接入链路追踪、模型成本和失败率监控。

项目源码：[WHUTcjh-2024/-RAG-agent](https://github.com/WHUTcjh-2024/-RAG-agent)
