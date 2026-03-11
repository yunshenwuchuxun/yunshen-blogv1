---
title: "Swin Transformer：层级式视觉 Transformer"
date: 2026-02-22
tags: [Swin Transformer, Vision Transformer, 计算机视觉, 注意力机制]
description: "解读 Swin Transformer 如何通过层级特征图和移动窗口机制实现线性计算复杂度的通用视觉骨干网络"
---

# Swin Transformer：层级式视觉 Transformer

> Swin Transformer 通过层级式特征图和移动窗口（Shifted Window）自注意力机制，解决了标准 ViT 在视觉任务中的尺度和计算量问题，成为高效且通用的视觉骨干网络。

## 摘要

将 Transformer 直接应用于视觉任务面临两大挑战：

1. **尺度变化巨大**：图像中的物体尺寸差异很大，标准 Transformer 的单一尺度处理机制难以应对
2. **高分辨率带来巨大计算量**：全局自注意力的计算复杂度与图像尺寸的平方成正比 $O(N^2)$，对高分辨率图像难以承受

Swin Transformer 的两个核心设计：

- **层级式特征图**（Hierarchical Feature Maps）：类似 CNN，通过逐步合并图像块（Patch Merging）减小分辨率，可方便对接检测、分割等下游任务
- **移动窗口自注意力**（Shifted Windows）：在不重叠的局部窗口内计算自注意力，再通过移动窗口机制实现跨窗口信息交互，将计算复杂度降为与图像尺寸成**线性关系**

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

## Patch Merging

CNN 中通过池化（Pooling）降低分辨率，Swin Transformer 提出了类似的 **Patch Merging** 操作。

![Patch Merging 过程：按位置采样得到四个子张量，拼接后通过线性变换降维](./解释_assets/media/image141.png)

具体步骤（类似 Pixel Shuffle 的逆过程）：

1. 对张量每隔一个点采样一次，得到四个 $H/2 \times W/2$ 的子张量
2. 按通道维度拼接，得到 $H/2 \times W/2 \times 4C$ 的张量
3. 通过 $1 \times 1$ 线性变换将通道数降为 $2C$

这样就得到了多尺度的特征图，可以输入 FPN 做检测，输入 U-Net 做分割。

## Shifted Window 机制

### 为什么需要移动窗口？

在固定窗口内计算自注意力虽然高效，但窗口之间没有信息交互。移动窗口机制解决了这一问题，使得原本只能在同一个窗口内交互的 Patch 可以与相邻窗口的 Patch 进行自注意力计算，从而保留了 Transformer 的全局建模能力。

![Shifted Window 示意：Layer l 使用常规窗口划分，Layer l+1 将窗口移动半个窗口大小](./解释_assets/media/image142.png)

### 具体实现

移动窗口并非真的移动"框"，而是通过**循环位移**（Cyclic Shift）实现：

1. **设定移动距离**：将窗口向左和向上移动半个窗口大小。例如窗口大小为 $4 \times 4$ 个 Patch，则移动 $\lfloor 4/2 \rfloor = 2$ 个 Patch
2. **执行循环位移**：将整个特征图向左上方进行循环位移。"循环"即从左边移出去的部分从右边补回来，从上边移出去的部分从下边补回来
3. **重新划分窗口**：在位移后的特征图上按常规方式（从左上角开始）划分出同样大小的窗口

## 结论

Swin Transformer 的核心贡献：

- **通用性**：不再仅限于图像分类，而是作为通用的视觉骨干网络（Backbone），可全面替代 CNN，支持分类、检测、分割等多种视觉任务
- **准确性与效率兼顾**：在取得高精度的同时，线性计算复杂度使其在处理高分辨率图像时比 ViT 更具优势
