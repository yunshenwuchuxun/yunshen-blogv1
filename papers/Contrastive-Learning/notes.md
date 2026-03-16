---
title: "对比学习串烧：从 InstDisc 到 CMC"
date: 2026-02-22
tags: [对比学习, 自监督学习, 表征学习]
description: "梳理对比学习早期代表性工作 InstDisc、InvaSpread、CPC、CMC 的核心思路与正负样本构造方式"
---

# 对比学习串烧：从 InstDisc 到 CMC

> 对比学习（Contrastive Learning）是自监督表征学习的核心范式之一。本文梳理四篇早期代表性工作——InstDisc、InvaSpread、CPC 和 CMC，聚焦它们各自的代理任务设计与正负样本构造策略。

## InstDisc

**InstDisc**（Instance Discrimination）将每张图片视为一个独立的类别，通过实例判别任务学习特征表示。

![InstDisc 架构：图像经 CNN 编码后存入 Memory Bank，在 128 维单位球面上进行对比](./解释_assets/media/image125.png)

其核心流程如下：

1. 从图像 $x$ 生成增强视图 $x'$
2. 用主干网络提取并归一化特征 $v$
3. 从 Memory Bank 提取所有其他图像向量 $\{m_j\}_{j=1}^{N}$
4. 计算与所有样本的相似度（非参数 softmax）
5. 计算损失：$-\log \frac{e^{v \cdot m_y / \tau}}{\sum_j e^{v \cdot m_j / \tau}}$
6. 优化主干网络参数（反向传播）
7. 更新 Memory Bank 的对应向量：$m_y \leftarrow \lambda m_y + (1 - \lambda) v$

**负样本采样**：从 Memory Bank 中随机提取 $N$ 个向量作为负样本。一个 epoch 通常只遍历一遍 Memory Bank。

![InstDisc 的 Memory Bank 机制：编码器生成 query，从 Memory Bank 采样 key，计算对比损失](./解释_assets/media/image128.png)

采样的 $N$ 个负样本会重新放入编码器得到更新后的表示，再写回 Memory Bank。

## InvaSpread

**InvaSpread** 直接在一个 batch 内构造正负样本，不需要额外的 Memory Bank。

![InvaSpread 架构：原图与增强图经共享权重的 CNN 编码，正样本拉近，负样本推远](./解释_assets/media/image129.png)

正负样本构造方式如下：

- **Batch size** 设为 256，经数据增广后变为 512 张图片
- 512 张图片通过 CNN 编码为向量，再经全连接层降维
- 图片 $x_i$ 与其增广版本 $\hat{x}_i$ 构成**正样本对**，其余 510 张图片均为**负样本**
- 总计 256 个正样本对，$2 \times (256 - 1)$ 个负样本
- 目标：拉近正样本对的距离，推远正样本与负样本之间的距离

## CPC

**CPC**（Contrastive Predictive Coding）采用不同于实例判别的代理任务：利用上下文信息预测未来的潜在表示。

![CPC 架构：编码器 g_enc 提取序列特征，自回归模型 g_ar 基于上下文 c_t 预测未来时步的表示](./解释_assets/media/image130.png)

CPC 是一个通用模型，可以将音频、视频、文本等序列作为输入，利用生成的方式进行对比学习：

- 将序列的一部分输入编码器 $g_{enc}$ 得到向量表征
- 将这些表征输入自回归器 $g_{ar}$，得到对序列的预测
- 当前时刻的上下文编码 $c_t$ 作为 query，真实的未来编码作为正样本（key），随机取其他输出的编码作为负样本
- 通过对比学习让模型区分真实的未来编码与随机的负样本编码

## CMC

**CMC**（Contrastive Multiview Coding）进一步改变代理任务：最大化同一样本在不同视图下嵌入的一致性，同时最小化不同样本之间视图嵌入的相似度。

![CMC 多视图对比学习：同一场景的四种视图（灰度、HHA、深度、语义）经各自编码器映射到共享表示空间](./解释_assets/media/image132.png)

### 正负样本定义

CMC 使用 NYU RGBD 数据集，该数据集包含同一张图片的四种视图。

- **正样本**：同一图像的不同视图（多 view）
- **负样本**：其他图片及其不配对的视角

### 影响与延伸

CMC 的成功证明了对比学习的灵活性，启发了后续重要工作：

- **CLIP**（OpenAI）：将图片-文本对作为输入，匹配的图像-文本对为正例，不匹配的为负例
- **对比知识蒸馏**（CMC 原班人马）：同一样本在 teacher 和 student 编码器下的输出互为正例，不同样本的输出作为负例

### 局限性

Multi-view 方法可能需要多个编码器分别处理不同模态，训练代价较高。例如 CLIP 需要用 BERT 编码文本、用 ViT 编码图像。
