---
title: "BERT 预训练语言模型详解"
date: 2026-02-20
tags: [BERT, 预训练, NLP, Transformer, 语言模型]
description: "BERT 的双向编码机制、预训练任务与微调范式全面解析"
---

# BERT 预训练语言模型详解

> BERT（Bidirectional Encoder Representations from Transformers）由 Google 于 2018 年提出，通过深度双向 Transformer 编码器和创新的预训练任务（MLM + NSP），开创了"预训练 + 微调"范式，在多项 NLP 基准上刷新了当时的最佳成绩。

## 研究动机

### 预训练模型的两种策略

使用预训练模型做特征表示时，主要有两类策略：

- **基于特征（Feature-based）**：为下游任务构造特定的网络结构，将预训练得到的表示作为额外特征与原始输入一起输入模型（如 ELMo）。
- **基于微调（Fine-tuning）**：先在大规模语料上预训练通用模型，然后在下游任务上继续训练全部参数，使模型适应新任务（如 GPT、BERT）。

### 前人的局限性

在 BERT 之前，主流预训练语言模型大多是**单向的**：

- **GPT**：仅使用从左到右的上下文（前向）
- **ELMo**：虽然结合了前向和后向两个方向，但两个方向独立训练后拼接，无法实现深度双向交互

BERT 的核心突破在于：利用 Transformer Encoder 的自注意力机制，使每个位置能**同时关注左右两侧的上下文**，实现真正的深度双向表示。

## 模型结构

### 基础架构

BERT 基于 Transformer 的 Encoder 部分（不使用 Decoder），提供两种规模：

| 模型 | 层数 | 隐藏维度 | 注意力头数 | 参数量 |
|------|------|--------|---------|-------|
| BERT-Base | 12 | 768 | 12 | 1.1 亿 |
| BERT-Large | 24 | 1024 | 16 | 3.4 亿 |

### 输入表示

BERT 的输入是一个序列（Sequence），可以是单个句子或两个句子拼接。与原始 Transformer 不同，BERT 只有编码器，通过将句子对拼接为一个序列来处理。

**特殊标记**：

- `[CLS]`：始终放在序列开头。经过多层 Transformer 编码后，其输出向量聚合了整个序列的全局信息，用作分类任务的特征。之所以选择 `[CLS]` 而非其他位置的输出，是因为其他位置的词向量受 MLM 训练目标引导，偏向于表示对应词本身的语义；`[CLS]` 没有这种偏向，能更纯粹地关联全局信息，并结合下游任务的监督信号来表征整个序列。
- `[SEP]`：用于分隔两个句子。

**输入向量由三部分相加得到**：

![BERT 输入表示](./解释_assets/media/image88.png)

1. **Token Embeddings**：基于 WordPiece 分词的词嵌入。WordPiece 将词拆分为子词单元（如 `unhappiness` → `un`, `##happi`, `##ness`，其中 `##` 表示非词首子词），有效减少词表规模（约 30,000）并处理未登录词（OOV）。
2. **Segment Embeddings**：区分句子 A 和句子 B 的学习向量（$E_A$ 和 $E_B$）。
3. **Position Embeddings**：位置编码向量。与 Transformer 使用固定三角函数不同，BERT 的位置编码是**学习得到的**。

## 预训练任务

BERT 的预训练采用两个任务**联合训练**（multi-task joint training），总损失 = MLM 损失 + NSP 损失，模型参数同时优化。

### Masked Language Model（MLM）

**目标**：实现深度双向上下文理解。传统语言模型只能单向预测（从左到右或从右到左），无法同时利用双向信息。

**方法**：随机遮盖输入序列中 15% 的 token（不包括 `[CLS]` 和 `[SEP]`），让模型预测被遮盖的原始词。损失函数只计算被遮盖 token 的预测准确性。

**替换策略**：被选中的 15% token 并非全部替换为 `[MASK]`，而是采用混合策略：

| 概率 | 操作 | 示例（原句：`my dog is cute`，选中 `cute`） |
|------|------|------|
| 80% | 替换为 `[MASK]` | `my dog is [MASK]` |
| 10% | 替换为随机词 | `my dog is apple` |
| 10% | 保持不变 | `my dog is cute` |

**为什么不全部用 `[MASK]`？**

- **缩小训练与推理的分布差异**：推理时输入中没有 `[MASK]`，全部使用 `[MASK]` 会导致预训练和实际应用的特征分布不一致，影响泛化能力。
- **防止过度依赖 `[MASK]` 标记**：保留原 token 迫使模型对所有位置都进行建模，而非仅在看到 `[MASK]` 时才做预测，提升鲁棒性。
- **增强泛化能力**：让模型在训练时也能见到"正常"输入，有助于在下游任务中更好地泛化到真实数据。
- **增加训练目标多样性**：模型既要学会预测被遮盖的词，也要学会在没有遮盖的情况下保持对上下文的理解。

### Next Sentence Prediction（NSP）

**目标**：让模型理解句子间的关系，提升问答（QA）、自然语言推断（NLI）等需要跨句推理的任务表现。

**方法**：

1. 从语料中随机采样句子对 $(A, B)$：
   - 50% 概率：$B$ 是 $A$ 的真实下一句（正样本，label=IsNext）
   - 50% 概率：$B$ 是随机采样的句子（负样本，label=NotNext）
2. 输入格式：`[CLS] 句子A [SEP] 句子B [SEP]`
3. 取 `[CLS]` 的输出向量，接全连接层（分类器），输出 IsNext/NotNext 的概率
4. 损失函数为二分类交叉熵

**示例**：

- 正样本：`[CLS] The man went to the store. [SEP] He bought a gallon of milk. [SEP]`
- 负样本：`[CLS] The man went to the store. [SEP] Penguins are flightless birds. [SEP]`

NSP 属于**自监督学习**——虽然形式上是监督学习（有输入、有标签、有交叉熵损失），但标签由数据本身的结构自动生成，无需人工标注。

## 训练与微调

### 预训练阶段

在大规模无标注文本（Wikipedia、BooksCorpus）上，对每个训练样本（一对句子 $A$ 和 $B$）同时执行：

1. 对 token 序列随机选取 15% 进行遮盖（MLM）
2. 判断 $B$ 是否为 $A$ 的下一句（NSP）
3. 总损失 = MLM 损失 + NSP 损失，共同反向传播更新参数

### 微调阶段

将预训练好的 BERT 作为基础，添加**简单的输出层**（如线性分类器），在具体下游任务上进行有监督微调。不同任务只需更换输出层：

- **文本分类**：用 `[CLS]` 输出向量接全连接层
- **问答（QA）**：预测答案在文本中的起止位置
- **序列标注（NER）**：对每个 token 的输出做分类

## 关键优势

- **深度双向性**：相比单向语言模型（GPT）和浅层双向拼接（ELMo），BERT 能真正利用完整上下文
- **通用性强**：同一个预训练模型可迁移到多种 NLP 任务，只需简单微调
- **效果显著**：在 GLUE、SQuAD 等多项基准上刷新当时最佳成绩

## 总结

BERT 通过深度双向 Transformer 编码器和两个创新的预训练任务（MLM + NSP），极大提升了语言理解能力。其"预训练 + 微调"范式成为后续 NLP 模型的标准流程，深刻影响了 RoBERTa、ALBERT、XLNet 等后续工作的发展。

## 参考文献

- Devlin, J., et al. (2019). BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. *NAACL 2019*.
