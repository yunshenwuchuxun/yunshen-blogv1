---
title: "Swin Transformer：层级式视觉 Transformer"
date: 2026-02-22
tags: [Swin Transformer, Vision Transformer, 计算机视觉, 注意力机制, 窗口注意力]
description: "解读 Swin Transformer 如何通过层级特征图和移动窗口机制实现线性计算复杂度的通用视觉骨干网络"
---

# Swin Transformer

> Swin Transformer 通过层级式特征图和移动窗口（Shifted Window）自注意力机制，解决了标准 ViT 在视觉任务中的尺度和计算量问题，成为高效且通用的视觉骨干网络。

## 摘要

将 Transformer 直接应用于视觉任务面临两大挑战：

1. **尺度变化巨大**：图像中的物体尺寸差异很大，标准 Transformer 的单一尺度处理机制难以应对
2. **高分辨率带来巨大计算量**：全局自注意力的计算复杂度与图像尺寸的平方成正比 $O(N^2)$，对高分辨率图像难以承受

Swin Transformer 的两个核心设计：

- **层级式特征图**（Hierarchical Feature Maps）：类似 CNN，通过逐步合并图像块（Patch Merging）减小分辨率，可方便对接检测、分割等下游任务
- **移动窗口自注意力**（Shifted Windows）：在不重叠的局部窗口内计算自注意力，再通过移动窗口机制实现跨窗口信息交互，将计算复杂度降为与图像尺寸成**线性关系**

## 核心创新

**Swin Transformer**（Shifted Window Transformer）针对 ViT 全局注意力计算量过大的问题，提出三项关键设计：

1. **层级式特征图（Hierarchical Feature Maps）**：类似 CNN（如 ResNet），通过 Patch Merging 层逐步降低特征图分辨率、增加通道数，构建金字塔结构。这使模型能无缝接入 FPN（检测）和 U-Net（分割）等下游框架。

2. **基于窗口的局部注意力（W-MSA）**：不计算全局注意力，而是将注意力限制在不重叠的局部窗口内，使复杂度从 $O((hw)^2)$ 降至 $O(hw)$（线性）。

3. **移动窗口（SW-MSA）**：在连续的 Transformer Block 之间交替使用常规窗口（W-MSA）和移动窗口（SW-MSA），实现跨窗口信息交互。

## 引言

### ViT 与 Swin Transformer 的对比

![Swin Transformer 与 ViT 的对比：(a) Swin 构建多尺度层级特征图（4x、8x、16x），(b) ViT 保持单一尺度（16x）](./解释_assets/media/image137.png)

Swin Transformer 通过"窗口"约束计算，而 ViT 基于"Patch"进行全局计算：

| 特性 | ViT | Swin Transformer |
|------|-----|------------------|
| 自注意力范围 | 全局 | 局部窗口 + 移动窗口 |
| 计算复杂度 | $O((H \times W)^2)$ | $O(H \times W)$（窗口大小固定） |
| 特征图尺度 | 单一尺度 | 多尺度层级 |

### 为什么 ViT 计算复杂度是平方级？

ViT 将输入图像划分为固定大小的图像块（Patch），自注意力模块计算每个图像块与所有其他图像块之间的相关关系。假设图片被分成 $N$ 个图像块，需要计算 $N \times N$ 的注意力矩阵，计算复杂度为 $O(N^2)$。由于 $N$ 与图像尺寸 $H \times W$ 成正比，ViT 的计算复杂度与图像尺寸的平方成正比。当处理高分辨率图像时，计算量和内存占用呈平方倍爆炸式增长。

### 为什么 Swin Transformer 是线性级？

Swin Transformer 将图像划分为 $M \times M$ 个不重叠的窗口，每个窗口内包含 $w \times w$ 个图像块。自注意力计算被限制在每个窗口内部，复杂度为 $O((w \times w)^2)$。由于窗口大小 $w$ 是固定的超参数，每个窗口的计算量恒定。随着图像尺寸增大，窗口数量线性增加，因此总计算复杂度与图像尺寸成**线性关系**。

**多尺度特征的重要性**：不同感受野能捕获不同尺寸的物体特征，对目标检测等任务至关重要。

## 计算复杂度分析

以 Swin-T 第一阶段为例，输入特征图大小为 $56 \times 56 \times 96$，默认窗口大小为 $M = 7$（即每个窗口包含 $7 \times 7$ 个 patch，共有 $8 \times 8 = 64$ 个窗口）。

### 标准全局自注意力

设特征图空间尺寸为 $h \times w$，通道数为 $C$：

1. 计算 Q、K、V：$(hwC) \times C = hwC^2$，三者共 $3hwC^2$
2. Q 与 K 相乘得到注意力矩阵 A：$(hw)^2 \cdot C$
3. A 与 V 相乘：$(hw)^2 \cdot C$
4. 最终线性投影：$hwC^2$

$$\Omega(\text{MSA}) = 4hwC^2 + 2(hw)^2C$$

### 窗口自注意力

将注意力计算从全局 $h \times w$ 缩小为窗口内 $M \times M$，共有 $\frac{hw}{M^2}$ 个窗口：

$$\Omega(\text{W-MSA}) = 4hwC^2 + 2M^2hwC$$

当 $M$ 固定（默认为 7）时，复杂度关于 $hw$ 为**线性**，而非二次方。

## 整体架构

![Swin Transformer 架构：(a) 四个 Stage 的整体结构，(b) 两个连续的 Swin Transformer Block（W-MSA 和 SW-MSA 交替使用）](./解释_assets/media/image144.png)

Swin Transformer 的整体流程包含以下阶段：

### Patch Partition 与 Linear Embedding

将输入的 $224 \times 224 \times 3$ 图像切割成 $4 \times 4$ 大小的不重叠图像块：

- 切割后图像块数量：$(224/4) \times (224/4) = 56 \times 56 = 3136$ 个
- 每个图像块的维度：$4 \times 4 \times 3 = 48$
- 通过线性层将维度从 48 映射到 $C$（Swin-T 中 $C = 96$）
- 输出：展平后的 Token 序列 `[B, 3136, 96]`，可 reshape 为 `[B, 96, 56, 56]`

由于 3136 个 Token 做全局自注意力开销过大，Swin Transformer 引入窗口机制，每个窗口默认包含 $7 \times 7$ 个 Patch。

### 四个 Stage

经过 Swin Transformer Block（不改变输入输出尺寸）后，通过 **Patch Merging** 逐步降低分辨率、增加通道数：

$$56 \times 56 \times 96 \rightarrow 28 \times 28 \times 192 \rightarrow 14 \times 14 \times 384 \rightarrow 7 \times 7 \times 768$$

最后经过 Average Pooling 变为 $1 \times 768$，再接分类头输出 $1 \times 1000$（以 ImageNet 为例）。整个过程与 CNN 十分相似。

## 架构总览

![Swin Transformer 各阶段架构配置](./解释_assets/media/image154.png)

| Stage | 特征图尺寸 | Block 数 | MSA 类型顺序 |
|-------|---------|---------|----------|
| Stage 1 | 1/4 输入图大小 | 2 | W-MSA -> SW-MSA |
| Stage 2 | 1/8 输入图大小 | 2 | W-MSA -> SW-MSA |
| Stage 3 | 1/16 输入图大小 | 6 | W-MSA -> SW-MSA 交替 |
| Stage 4 | 1/32 输入图大小 | 2 | W-MSA -> SW-MSA |

每个 Stage 由多个 Swin Transformer Block 堆叠组成，每个 Block 包含一次 MSA（W-MSA 或 SW-MSA）。Stage 之间通过 Patch Merging 进行下采样，通道数加倍，空间分辨率减半。

## Patch Merging

CNN 中通过池化（Pooling）降低分辨率，Swin Transformer 提出了类似的 **Patch Merging** 操作。

![Patch Merging 过程：按位置采样得到四个子张量，拼接后通过线性变换降维](./解释_assets/media/image141.png)

具体步骤（类似 Pixel Shuffle 的逆过程）：

1. 对张量每隔一个点采样一次，得到四个 $H/2 \times W/2$ 的子张量
2. 按通道维度拼接，得到 $H/2 \times W/2 \times 4C$ 的张量
3. 通过 $1 \times 1$ 线性变换将通道数降为 $2C$

这样就得到了多尺度的特征图，可以输入 FPN 做检测，输入 U-Net 做分割。

## Swin Transformer Block 结构

每个 Swin Transformer Block 由两个连续子块组成，交替使用 W-MSA 和 SW-MSA：

$$\hat{\mathbf{z}}^l = \text{W-MSA}(\text{LN}(\mathbf{z}^{l-1})) + \mathbf{z}^{l-1}$$

$$\mathbf{z}^l = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^l)) + \hat{\mathbf{z}}^l$$

$$\hat{\mathbf{z}}^{l+1} = \text{SW-MSA}(\text{LN}(\mathbf{z}^l)) + \mathbf{z}^l$$

$$\mathbf{z}^{l+1} = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^{l+1})) + \hat{\mathbf{z}}^{l+1}$$

先做一次窗口内自注意力（W-MSA），再做一次移动窗口自注意力（SW-MSA），从而实现窗口间的信息通信。

![两个连续的 Swin Transformer Block 结构示意图](./解释_assets/media/image150.png)

## Shifted Window 机制

### 为什么需要移动窗口？

在固定窗口内计算自注意力虽然高效，但窗口之间没有信息交互。移动窗口机制解决了这一问题，使得原本只能在同一个窗口内交互的 Patch 可以与相邻窗口的 Patch 进行自注意力计算，从而保留了 Transformer 的全局建模能力。

![Shifted Window 示意：Layer l 使用常规窗口划分，Layer l+1 将窗口移动半个窗口大小](./解释_assets/media/image142.png)

### 移动窗口的高效实现：循环移位

#### 问题

直接移动窗口会导致窗口数量从 4 个变为 9 个，且窗口大小不一致，无法高效地以 batch 形式并行计算。

#### 解决方案：循环移位（Cyclic Shift）

![循环移位实现移动窗口注意力的高效批量计算](./解释_assets/media/image151.png)

通过循环移位，移动后仍保持 4 个等大窗口，具体步骤：

1. **循环移位**：将特征图沿两个方向循环移动 $\lfloor M/2 \rfloor$ 个像素，使原本分属不同窗口的区域拼接到同一窗口中。

2. **Masked Self-Attention**：移位后同一窗口内可能包含原本不相邻的区域（例如图片顶部与底部）。对每个窗口内的注意力矩阵 $B$，加上一个掩码矩阵 $C$（相邻区域填 0，不相邻区域填 $-100$）。经过 $\text{softmax}(B + C)$ 后，大负数对应位置趋近于 0，从而屏蔽了不应交互的区域。

3. **逆循环移位**：注意力计算完成后，将特征图移回原始位置，保持窗口的相对顺序不变。

具体实现中，以窗口大小 $7 \times 7$ 为例：循环移位后的窗口内，不同区域用编号标记（如 3 和 6）。将每个窗口内的 patch 铺平为 $49$ 维向量，计算 $A \cdot A^T$ 得到 $49 \times 49$ 的注意力矩阵，再加上掩码矩阵后做 softmax，即完成 Masked Self-Attention。

## 结论

Swin Transformer 的核心贡献：

- **通用性**：不再仅限于图像分类，而是作为通用的视觉骨干网络（Backbone），可全面替代 CNN，支持分类、检测、分割等多种视觉任务
- **准确性与效率兼顾**：在取得高精度的同时，线性计算复杂度使其在处理高分辨率图像时比 ViT 更具优势
