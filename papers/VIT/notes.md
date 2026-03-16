---
title: "Vision Transformer (ViT) 模型原理详解"
date: 2026-02-22
tags: [Vision Transformer, ViT, 图像分类, Transformer, 自注意力]
description: "ViT 将 Transformer 直接应用于图像分类，通过 Patch 序列化替代卷积操作，在大规模数据上超越 CNN。"
---

# Vision Transformer (ViT) 模型原理详解

> Vision Transformer（ViT）由 Google 于 2020 年提出，首次将 NLP 领域的 Transformer 架构直接应用于图像分类任务。其核心思想是将图像划分为固定大小的 Patch 序列，类比文本中的 Token，输入标准 Transformer Encoder 进行建模，在大规模数据预训练下取得了超越 CNN 的性能。

## 背景与动机

Transformer 在 NLP 任务中大获成功（如 BERT 处理长度为 512 的序列），但直接将其迁移到视觉领域面临一个关键挑战：**序列长度过大**。以常见的 $224 \times 224$ 分辨率图像为例，如果将每个像素作为一个 Token，序列长度将达到 50176，远超 Transformer 的处理能力。目标检测、实例分割等任务的分辨率更高，问题更加严峻。

ViT 的核心创新在于：用 **Patch 切分**将图像转化为可控长度的序列，从而用标准 Transformer 替代 CNN 作为视觉主干网络。与 NLP 中常见的无监督预训练不同，ViT 采用**有监督学习**进行预训练。

## 模型架构

![ViT 整体架构：图像经 Patch 切分、线性投影和位置编码后输入 Transformer Encoder，右侧为 Encoder 内部结构](./解释_assets/media/image96.png)

### 图像切分为 Patch

输入图像被均匀切分为固定大小的非重叠 Patch。以 $224 \times 224$ 的图像、$16 \times 16$ 的 Patch 大小为例：

- Patch 数量：$(224 / 16) \times (224 / 16) = 196$ 个
- 每个 Patch 展平后的维度：$16 \times 16 \times 3 = 768$

这样，一张图像被转化为长度为 196 的序列，每个元素是一个 768 维向量。

### Patch Embedding

每个展平的 Patch 通过一个**线性投影层**（全连接层）映射为固定长度的嵌入向量。以 ViT-Base 为例，投影矩阵维度为 $768 \times 768$，其中输入维度 768 由 Patch 展平大小决定，输出维度 768 为超参数设定。这一过程类似于 NLP 中的**词嵌入**（Word Embedding）。

### 位置编码（Position Embedding）

Transformer 的自注意力机制对序列中元素做两两交互，但本身不包含位置信息。由于图像 Patch 具有空间顺序，需要为每个 Patch Embedding 加上**可学习的位置编码**以保留空间结构。

ViT 论文探讨了三种位置编码策略：

![ViT 论文中关于位置编码的消融实验描述，包含无位置编码、1D、2D 和相对位置编码四种方案](./解释_assets/media/image100.png)

- **1D 位置编码**：将 Patch 按光栅顺序排列，每个位置分配一个长度为 $D$ 的可学习向量。这是 ViT 的默认方案。
- **2D 位置编码**：分别学习 X 轴和 Y 轴方向的编码，各自长度为 $D/2$，拼接后仍为长度 $D$。序列数量从 $N$ 变为 $\sqrt{N}$（每个轴方向）。
- **相对位置编码**：基于 Patch 之间的相对距离编码空间信息。

实验结果表明三种方案性能接近，1D 编码已能隐式学到 2D 的空间结构信息。

### [CLS] Token

借鉴 BERT 的设计，ViT 在 Patch 序列前拼接一个**可学习的 [CLS] Token**（维度为 $1 \times 768$），用于聚合全局图像特征并完成最终分类。

因此，Transformer Encoder 的输入维度为 $197 \times 768$（196 个 Patch + 1 个 [CLS] Token），整个输入 = Patch Embedding + [CLS] Token + Position Embedding（逐元素相加）。

### Transformer Encoder

ViT 直接采用标准 Transformer Encoder 结构，由 $L$ 层堆叠而成，每层包含：

1. **Layer Norm** + **多头自注意力**（Multi-Head Self-Attention, MSA）+ 残差连接
2. **Layer Norm** + **前馈网络**（MLP，含 GELU 激活）+ 残差连接

数学表示如下：

$$\mathbf{z}_0 = [\mathbf{x}_{\text{class}};\, \mathbf{x}_p^1 \mathbf{E};\, \mathbf{x}_p^2 \mathbf{E};\, \cdots;\, \mathbf{x}_p^N \mathbf{E}] + \mathbf{E}_{\text{pos}}, \quad \mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D},\, \mathbf{E}_{\text{pos}} \in \mathbb{R}^{(N+1) \times D}$$

$$\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}, \quad \ell = 1 \ldots L$$

$$\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell, \quad \ell = 1 \ldots L$$

$$\mathbf{y} = \text{LN}(\mathbf{z}_L^0)$$

其中 $P$ 为 Patch 大小，$C$ 为通道数，$D$ 为嵌入维度，$N$ 为 Patch 数量，$L$ 为 Encoder 层数。最终取 $\mathbf{z}_L^0$（即 [CLS] Token 的输出）作为图像的全局表示。

### 分类头（Classification Head）

Transformer Encoder 输出的 [CLS] Token 向量经过一个 MLP 分类头，输出最终的类别概率。预训练时使用一个隐藏层的 MLP，微调时替换为单层线性层。

### 混合模型（Hybrid Architecture）

ViT 还提出了一种混合架构：

1. 先用 CNN（如 ResNet）提取特征图
2. 将特征图切分为 Patch 序列
3. 对特征 Patch 进行线性投影（若 CNN 输出通道数已匹配 Transformer 维度则可省略）
4. 添加位置编码和 [CLS] Token 后输入 Transformer Encoder

## 微调与高分辨率处理

### 微调流程

ViT 采用典型的**预训练-微调**范式：先在大规模数据集上预训练，再迁移到下游任务。微调时：

- 移除预训练的分类头
- 添加新的全连接层（$D \times K$，$K$ 为下游任务类别数），使用零初始化

### 高分辨率适配

微调时通常使用比预训练更高的分辨率以提升性能。由于 Patch 大小保持不变，更高分辨率意味着更多的 Patch、更长的序列。Transformer 本身可处理任意长度序列（受内存限制），但预训练的位置编码需要调整。

解决方案：对预训练的位置编码进行 **2D 插值**，根据 Patch 在原始图像中的位置进行空间插值。

## 实验分析

### 数据规模的影响

数据集规模对 ViT 性能影响显著。在小规模数据集（如 ImageNet）上训练时，ViT 不如同等大小的 ResNet，这表明 Transformer 缺乏 CNN 内置的**归纳偏置**（如局部性和平移不变性）。但随着数据量增加到 JFT-300M，ViT 性能优势逐渐显现并超越 CNN，说明大规模数据能弥补归纳偏置的缺失。

### 迁移学习能力

在 19 个下游分类任务中，ViT 平均比基于 ResNet 的 BiT 模型高出 2.7% 的准确率，在 CIFAR-10/100、Oxford Flowers 等数据集上表现尤为突出，展现了优秀的泛化能力。

### 计算效率

与达到相同性能的 EfficientNet 相比，ViT 所需训练计算资源显著更少，在 TPU 上训练速度快 2.5 倍以上，得益于 Transformer 架构的高度并行性。

### 可视化分析

![ViT 可视化分析：左图为线性投影层学到的 RGB 嵌入滤波器，中图为位置编码的余弦相似度矩阵，右图为不同层注意力头的平均注意距离](./解释_assets/media/image104.png)

上图展示了三个关键发现：

- **线性投影滤波器**（左）：类似 CNN 低层的 Gabor 滤波器，说明模型学到了基础视觉特征
- **位置编码相似度**（中）：相邻位置的编码更相似，呈现明显的 2D 空间结构
- **注意力距离**（右）：浅层注意力头关注局部特征（短距离），深层捕捉全局信息（长距离），类似 CNN 的层次特征提取

### 消融实验要点

| 实验项目 | 结论 |
|---------|------|
| 位置编码 | 1D、2D 和相对位置编码效果接近，1D 已能隐式学到 2D 信息 |
| Patch 大小 | 较小 Patch（如 $14 \times 14$）效果更好，但计算开销更大 |
| 注意力机制 | 浅层关注局部，深层关注全局，无需显式局部性偏置 |

## 总结

ViT 证明了纯 Transformer 架构在视觉任务中的可行性：当预训练数据充足时，无需卷积操作即可取得卓越的图像分类性能，同时保持更高的计算效率和更强的可扩展性。这一工作为视觉领域的预训练-微调范式开辟了新的方向。
