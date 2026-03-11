---
title: "GNN（Graph Neural Network）图神经网络：从基础到经典模型"
date: 2026-02-22
tags: [GNN, 图神经网络, Graph Neural Network, 深度学习, 图结构数据]
description: "从图的表示、消息传递机制到 GCN/GAT/GIN 等经典模型的系统笔记，并附代码实战入口。"
---

# GNN（Graph Neural Network）图神经网络：从基础到经典模型

> **图神经网络（Graph Neural Network, GNN）**是一类专门处理图结构数据的神经网络模型。本文从图的基本概念出发，逐步深入到消息传递机制与模型构建，并总结 NN4G、DCNN、GraphSAGE、GAT、GIN 等经典模型的核心思想。

## 代码实战

- Notebook：`code.ipynb`
- Colab：`https://colab.research.google.com/github/yunshenwuchuxun/yunshen-blogv1/blob/main/papers/04-GNN/code.ipynb`

## 图的基本组成

一张图由三类核心元素构成：

- **V（Vertex set，节点集合）**：图中所有节点的集合，数学表示为 $V = \{v_1, v_2, \dots, v_n\}$
- **E（Edge set，边集合）**：图中所有边的集合，每条边连接两个节点表示关系，数学表示为 $E = \{e_1, e_2, \dots, e_m\}$，其中每个 $e$ 通常是一个节点对 $(v_i, v_j)$
- **U（全局属性）**：在不同文献中含义有所差异，常见两种理解：
  - **节点特征矩阵（Node feature matrix）**：所有节点的特征集合。若每个节点有 $d$ 维特征，则 $U$ 是一个 $n \times d$ 的矩阵
  - **全局上下文向量（Global context vector）**：表示整个图的全局属性

![图的三类属性：V 表示节点属性，E 表示边属性，U 表示全局属性](/static/blog/gnn/image32.png)

### 有向图与无向图

边可以有方向性（有向图）或无方向性（无向图）。

![有向边与无向边的对比](/static/blog/gnn/image33.png)

## 图的应用范围

图结构的表示能力非常广泛，几乎任何关系型数据都可以建模为图。

**图像作为图**：每个像素是一个节点，与相邻像素通过边相连。

![图像的像素网格、邻接矩阵与图表示之间的对应关系](/static/blog/gnn/image34.png)

**文本作为图**：字符或词汇是节点，按顺序通过边相连。

![文本序列的有向图表示及其邻接矩阵](/static/blog/gnn/image35.png)

**分子结构**：原子是节点，化学键是边。

![分子结构的 3D 模型、邻接矩阵与图表示](/static/blog/gnn/image36.png)

**社交网络**：用户是节点，关系是边。与图像和文本不同，社交网络的邻接矩阵不具有规则结构。

![莎士比亚戏剧 Othello 中角色互动的邻接矩阵与图表示](/static/blog/gnn/image37.png)

![空手道俱乐部社交网络的邻接矩阵与图表示](/static/blog/gnn/image38.png)

## 三种核心任务

### 节点分类（Node Classification）

已知图结构和部分节点的标签，目标是预测其他未标注节点的类别。

![节点分类任务：输入未标注图，输出带有类别标签的节点](/static/blog/gnn/image39.png)

### 边预测（Edge Prediction / Link Prediction）

已知图结构和节点特征，目标是预测图中哪些节点对之间可能存在边（关系）。

![边预测任务：从全连接无标签图到带关系标签的边](/static/blog/gnn/image40.png)

### 图分类（Graph Classification）

每个样本是一个完整的图，目标是对整个图进行分类。

![图分类任务：输入多个图，输出每个图的类别标签](/static/blog/gnn/image41.png)

## 图的数据表示

图通过节点列表、边列表和邻接列表来表示。邻接列表的长度与边的数量一致，第 $i$ 项表示第 $i$ 条边连接哪两个节点。节点、边、全局属性既可以用标量表示，也可以用向量表示。

![图的数据表示：节点列表、边列表、邻接列表与全局属性](/static/blog/gnn/image42.png)

## GNN 的定义与基本流程

**图神经网络（Graph Neural Network, GNN）** 是一类专门处理图结构数据的神经网络模型，其核心特性包括：

- 对图的所有属性（节点、边、全局上下文）进行可优化的变换
- 保持图的对称性（**排列不变性**，permutation invariance）
- 采用“图输入-图输出”（graph-in, graph-out）架构

GNN 的处理流程：

1. **输入**：一个带有节点、边和全局特征的图
2. **处理**：通过多层**消息传递（message passing）**机制，节点和边不断聚合邻居信息，更新自身嵌入表示
3. **输出**：结构不变但特征已更新的图（或基于图的预测结果）

### 基本工作过程

1. **初始化**：为每个节点赋予初始特征表示
2. **消息传递**：节点从其邻居节点收集信息
3. **更新**：根据收集的信息更新节点的表示
4. **重复**：多次重复上述过程，使信息可以从更远的节点传递过来
5. **输出**：使用最终的节点表示进行预测或其他任务

这个过程与卷积操作类似：目标节点及其邻居节点类似于一个卷积核覆盖的范围，信息通过汇聚操作整合。区别在于卷积中每个位置有不同的权重，而基础 GNN 中邻居信息通常直接相加。

## 模型构建：从图输出到预测结果

GNN 经过若干层处理后，输出一张更新了特征的图。要得到具体的预测结果，需要将节点嵌入传入**全连接层**（加上 Softmax）来获得分类输出。

![GNN 最终层节点嵌入通过分类器得到节点预测结果](/static/blog/gnn/image43.png)

### 缺失信息的处理

如果不知道某个节点的向量表示，仍然可以通过**信息聚合**来传递信息。不管缺失的是边、节点还是全局向量，都可以通过聚合邻居信息来补充。

GNN 的核心是通过图的结构来聚合和传递信息：每个节点从其邻居收集信息，更新自己的表示，再将更新后的信息传递给下一层。

![信息聚合示意：节点从相邻边收集信息并求和](/static/blog/gnn/image44.png)

## 消息传递机制与 GNN Blocks

![GNN 基本流程：输入图 -> GNN blocks -> 变换后的图 -> 分类层 -> 预测](/static/blog/gnn/image45.png)

基本的 GNN blocks 没有显式区分节点与节点、边与边之间的关系。一个常见的建模思路是尽早将图的结构信息引入网络，并在“聚合（Aggregate）—更新（Update）”的循环中推进表征学习。

### 节点间消息传递（V -> V）

先聚合，再更新。以某个节点为例，其聚合向量 = 自身向量 + 相邻节点向量之和，之后再进入 MLP 更新。

![节点聚合邻居信息后经过变换函数 f 更新特征](/static/blog/gnn/image46.png)

### 图卷积层（Graph Convolutional Layer）

![图卷积层：U、V、E 分别经过变换函数，V 的更新包含邻居聚合操作](/static/blog/gnn/image47.png)

### 消息传递层（Message Passing Layer）

在消息传递层中，节点先聚合 1 跳邻边的信息，再聚合近邻节点的信息。如果节点向量和边向量维度不同，需要先投影到相同维度再进行信息汇聚。

![消息传递层：V 和 E 之间的双向信息聚合](/static/blog/gnn/image48.png)

### 不同的聚合顺序

不同的聚合顺序会产生不同的结果：

- **Node Then Edge Learning**：先更新节点，再更新边
- **Edge Then Node Learning**：先更新边，再更新节点
- **Weave Layer**：节点和边同时交换信息后各自更新

![三种不同的聚合顺序及 Weave Layer 结构](/static/blog/gnn/image49.png)

### 全局表示 U 的作用

如果两个节点距离很远，逐层传递信息效率较低。一个常见思路是将全局表示 $U$ 也加入汇聚过程。

$U$ 与图中所有节点和边都有连接，可作为信息传递的“桥梁”。其作用包括：

1. **信息桥梁**：节点和边的信息可以汇总到 $U$，$U$ 的信息也可以反过来影响所有节点和边
2. **全局特征建模**：$U$ 能捕捉整个图的全局属性（如图的类别、整体结构特征），对图分类等任务非常重要
3. **丰富表达能力**：仅靠节点和边的局部信息难以捕捉到全局性的结构特征，引入 $U$ 后模型能学习到更丰富的图表示

## 超参数与性能

GNN 对超参数比较敏感，主要包括：层数、特征维度（节点、边、全局）、聚合/激活函数、邻居采样数等。

![不同消息传递方式下，模型性能（test AUC）与参数量的关系](/static/blog/gnn/image51.png)

从实验结果可以看出，使用更多类型信息（nodes & edges & globals）的消息传递策略通常能获得更好的性能。

## 经典模型：空间卷积范式（Aggregate & Readout）

许多经典的空间卷积（Spatial-based Convolution）GNN 可以归纳为两步：

- **Aggregate**：用邻居特征（neighbor features）更新下一层的隐藏状态（hidden state）
- **Readout**：把所有节点的特征集合起来代表整个图（图级任务）

在 Layer $i$ 中，每个节点有隐藏状态 $h_0^0, h_1^0, \dots$，经过 Aggregation 得到 Layer $i+1$ 的隐藏状态 $h_0^1, h_1^1, \dots$，最终通过 Readout 得到图级表示 $h_G$。

### NN4G（Neural Networks for Graph）

NN4G 的隐藏层特征记为 $h_{node}^{layer}$。以节点 $v_3$ 在第 1 层的特征 $h_3^1$ 为例：

$$h_3^1 = \hat{w}_{1,0}(h_0^0 + h_2^0 + h_4^0) + \bar{w}_1 \cdot x_3$$

Readout 使用**分层聚合 + 加权融合**：

- 对每层节点特征取平均值：$X_l = \text{MEAN}(h^l)$
- 加权求和得到图表示：$y = \sum_l w_l \cdot X_l$

### DCNN（Diffusion-Convolution Neural Network）

DCNN 的核心是**基于距离的扩散聚合**，并在 Readout 阶段做多跳特征融合：

- Aggregate：按与中心节点的距离分组，对距离为 $k$ 的节点特征做均值，再通过权重加权
- Readout：多跳特征拼接后线性变换输出

### DGC（Diffusion Graph Convolution）

DGC 与 DCNN 的主要区别在 Readout：不使用拼接 + 线性变换，而是直接对各跳的特征矩阵做（可加权的）求和：

$$H = \sum_k \alpha_k H^k$$

### MoNet（Mixture Model Networks）

MoNet 的核心思想是通过定义节点间的“距离”度量，使用**加权聚合**而非简单求和/平均来更新节点特征，并用高斯混合模型思想对邻居信息做更细粒度的建模。

### GraphSAGE（Graph Sample and Aggregate）

GraphSAGE 的核心思想是**学习聚合函数**而非为每个节点学习独立嵌入，从而实现**归纳式学习**（inductive learning），可处理未见节点。

常见聚合器：

- Mean aggregator
- Max-pooling aggregator
- LSTM aggregator

### GAT（Graph Attention Networks）

GAT 在邻居信息汇聚时引入**注意力机制**，为不同邻居分配不同的权重；并可通过多头注意力增强表达能力。

### GIN（Graph Isomorphism Network）

GIN 的关键结论：使用 **Sum** 聚合优于 Mean/Max，因为求和可区分多重集合（Multiset），其表达力与 Weisfeiler-Lehman（WL）同构测试等价。

节点更新（第 $k$ 层）：

$$h_v^{(k)} = \text{MLP}^{(k)}\left((1 + \varepsilon^{(k)}) \cdot h_v^{(k-1)} + \sum_{u \in N(v)} h_u^{(k-1)}\right)$$

Readout（图级表示）常用置换不变池化，并做层间融合：

$$h_G = \text{CONCAT}_k\left(\sum_{v \in V} h_v^{(k)}\right)$$

### 模型对比总结

| 模型 | 聚合方式 | 核心特点 |
|------|----------|----------|
| NN4G | 邻居求和 + 自身特征加权 | 分层 Readout，加权融合不同层 |
| DCNN | 基于距离的扩散聚合 | 多跳特征拼接 + 线性变换 |
| DGC | 同 DCNN | Readout 改为直接求和 |
| MoNet | 加权聚合（高斯混合权重） | 基于节点距离度量动态计算权重 |
| GraphSAGE | Mean / Max-pooling / LSTM | 归纳式学习，可处理未见节点 |
| GAT | 注意力加权聚合 | 多头注意力，自适应权重 |
| GIN | 求和聚合 + MLP | 表达力等价 WL 测试，理论最优 |

## GNN 的创新点（总结）

- **数据表示的普适性**：只要数据可以表示为图结构，GNN 就能处理
- **处理不规则结构数据**：适合处理不规则连接结构的数据（区别于规则网格/序列）
- **关系学习**：显式学习并利用实体之间的关系
- **与其他架构的联系**：与 RNN、CNN、Transformer 等存在内在联系，展示了神经网络设计的统一性

## 参考资料

- Sanchez-Lengeling, B., Reif, E., Pearce, A., & Wiltschko, A. B. (2021). *A Gentle Introduction to Graph Neural Networks*. Distill.
- Kipf, T. N., & Welling, M. (2017). Semi-Supervised Classification with Graph Convolutional Networks. *ICLR 2017*.
- Hamilton, W., Ying, Z., & Leskovec, J. (2017). Inductive Representation Learning on Large Graphs. *NeurIPS 2017*.
- Veličković, P., et al. (2018). Graph Attention Networks. *ICLR 2018*.
- Xu, K., et al. (2019). How Powerful are Graph Neural Networks? *ICLR 2019*.
