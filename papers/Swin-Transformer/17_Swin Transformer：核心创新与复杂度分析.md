---
title: "Swin Transformer：核心创新与复杂度分析"
date: 2026-02-22
tags: [Swin Transformer, Vision Transformer, 窗口注意力, 计算机视觉]
description: "解析 Swin Transformer 的移动窗口注意力机制、复杂度优化及循环移位实现。"
---

# Swin Transformer：核心创新与复杂度分析

> Swin Transformer 通过层级式特征图与移动窗口自注意力，将 Transformer 的计算复杂度从图像尺寸的二次方降低为线性，使其能够高效处理高分辨率视觉任务。

## 核心创新

**Swin Transformer**（Shifted Window Transformer）针对 ViT 全局注意力计算量过大的问题，提出三项关键设计：

1. **层级式特征图（Hierarchical Feature Maps）**：类似 CNN（如 ResNet），通过 Patch Merging 层逐步降低特征图分辨率、增加通道数，构建金字塔结构。这使模型能无缝接入 FPN（检测）和 U-Net（分割）等下游框架。

2. **基于窗口的局部注意力（W-MSA）**：不计算全局注意力，而是将注意力限制在不重叠的局部窗口内，使复杂度从 $O((hw)^2)$ 降至 $O(hw)$（线性）。

3. **移动窗口（SW-MSA）**：在连续的 Transformer Block 之间交替使用常规窗口（W-MSA）和移动窗口（SW-MSA），实现跨窗口信息交互。

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

## Swin Transformer Block 结构

每个 Swin Transformer Block 由两个连续子块组成，交替使用 W-MSA 和 SW-MSA：

$$\hat{\mathbf{z}}^l = \text{W-MSA}(\text{LN}(\mathbf{z}^{l-1})) + \mathbf{z}^{l-1}$$

$$\mathbf{z}^l = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^l)) + \hat{\mathbf{z}}^l$$

$$\hat{\mathbf{z}}^{l+1} = \text{SW-MSA}(\text{LN}(\mathbf{z}^l)) + \mathbf{z}^l$$

$$\mathbf{z}^{l+1} = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^{l+1})) + \hat{\mathbf{z}}^{l+1}$$

先做一次窗口内自注意力（W-MSA），再做一次移动窗口自注意力（SW-MSA），从而实现窗口间的信息通信。

![两个连续的 Swin Transformer Block 结构示意图](./解释_assets/media/image150.png)

## 移动窗口的高效实现：循环移位

### 问题

直接移动窗口会导致窗口数量从 4 个变为 9 个，且窗口大小不一致，无法高效地以 batch 形式并行计算。

### 解决方案：循环移位（Cyclic Shift）

![循环移位实现移动窗口注意力的高效批量计算](./解释_assets/media/image151.png)

通过循环移位，移动后仍保持 4 个等大窗口，具体步骤：

1. **循环移位**：将特征图沿两个方向循环移动 $\lfloor M/2 \rfloor$ 个像素，使原本分属不同窗口的区域拼接到同一窗口中。

2. **Masked Self-Attention**：移位后同一窗口内可能包含原本不相邻的区域（例如图片顶部与底部）。对每个窗口内的注意力矩阵 $B$，加上一个掩码矩阵 $C$（相邻区域填 0，不相邻区域填 $-100$）。经过 $\text{softmax}(B + C)$ 后，大负数对应位置趋近于 0，从而屏蔽了不应交互的区域。

3. **逆循环移位**：注意力计算完成后，将特征图移回原始位置，保持窗口的相对顺序不变。

具体实现中，以窗口大小 $7 \times 7$ 为例：循环移位后的窗口内，不同区域用编号标记（如 3 和 6）。将每个窗口内的 patch 铺平为 $49$ 维向量，计算 $A \cdot A^T$ 得到 $49 \times 49$ 的注意力矩阵，再加上掩码矩阵后做 softmax，即完成 Masked Self-Attention。

## 架构总览

![Swin Transformer 各阶段架构配置](./解释_assets/media/image154.png)

| Stage | 特征图尺寸 | Block 数 | MSA 类型顺序 |
|-------|---------|---------|----------|
| Stage 1 | 1/4 输入图大小 | 2 | W-MSA -> SW-MSA |
| Stage 2 | 1/8 输入图大小 | 2 | W-MSA -> SW-MSA |
| Stage 3 | 1/16 输入图大小 | 6 | W-MSA -> SW-MSA 交替 |
| Stage 4 | 1/32 输入图大小 | 2 | W-MSA -> SW-MSA |

每个 Stage 由多个 Swin Transformer Block 堆叠组成，每个 Block 包含一次 MSA（W-MSA 或 SW-MSA）。Stage 之间通过 Patch Merging 进行下采样，通道数加倍，空间分辨率减半。
