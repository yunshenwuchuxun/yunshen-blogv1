# MoE 稀疏门控混合专家层 (Sparsely-Gated MoE)

该目录按多数 `papers/*` 的最小集合方式保留：`notes.md` 与 `code.ipynb`。

MoE 的完整、可发布版本已经整理在：
- `app/blog/posts/mixture-of-experts.mdx`
- `public/static/blog/mixture-of-experts/`

如果需要查看图文完整版本，请优先阅读已发布博客；本 `notes.md` 仅保留源材料摘要，避免继续依赖额外的原始图片目录。

## 核心主题

MoE（Mixture of Experts，混合专家模型）的核心思想是：
- 用多个专家网络扩展参数规模
- 通过路由器为每个 Token 只激活少量专家
- 从而实现“参数规模更大，但单次计算量不必同比增长”

文中主要涉及两条代表性路线：
- <strong>Switch Transformer</strong>：用 Top-1 路由简化 MoE 的训练与部署
- <strong>DeepSeekMoE</strong>：通过细粒度专家分割与共享专家隔离，提高专家专门化程度

## 关键问题

### 1. 为什么要用 MoE

标准 Transformer 扩大规模时，参数量和 FLOPs 往往同步增长。MoE 试图把二者部分解耦：
- 参数可以很多
- 但每个 Token 只经过少量专家
- 因而推理与训练成本更可控

### 2. Switch Transformer 解决了什么

Switch Transformer 的核心是将传统 Top-k 路由进一步简化为 <strong>Top-1 路由</strong>：
- 每个 Token 只发送给 1 个专家
- 降低路由复杂度与通信成本
- 结合负载均衡损失，缓解专家使用不均的问题

### 3. DeepSeekMoE 解决了什么

DeepSeekMoE 主要针对传统大专家方案的两个问题：
- <strong>知识混合</strong>：单个专家接收到过于多样的知识类型
- <strong>知识冗余</strong>：多个专家重复学习通用知识

它的改进方向包括：
- <strong>细粒度专家分割</strong>
- <strong>共享专家隔离</strong>

## 代码实战

Notebook 保留在：
- `papers/MoE/code.ipynb`

当前博客中的 Colab 链接也应对应到该路径。

## 备注

原始带截图的讲义版本已不再保留在该目录中；如需完整图示，请查看站点中的已发布文章。