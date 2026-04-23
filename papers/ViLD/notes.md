# ViLD（CLIP目标检测）

ViLD是21年4月28上传到Arxiv上的，也就是CLIP发表仅仅两个月之后，而且训练了约460epoch，所以速度是很快的。ViLD即Vision and Knowledge Language Distillation，即用CLIP当做teacher蒸馏网络，从而能达到Zero-Shot检测。简单来说，ViLD 想要做到的事情是：<span class="mark">在训练时只需要训练基础类，然后通过知识蒸馏从 CLIP 模型中学习，从而在推理时能够检测到任意的新的物体类别（Open-vocabulary Object）</span>。

下面的例子中，如果用传统的目标检测算法的话，模型只会判断这些物体都是玩具，也就是图中蓝色的基础类，而无法检测到更细致的类别。使用CLIP之后，在现有检测框上，不需要额外标注，就可以检测出新的类（图中红色标识类）。

<img src=".\解释3_assets/media/image19.png" style="width:4.93889in;height:2.46319in" alt="IMG_256" />

## 模型结构

<img src=".\解释3_assets/media/image20.png" style="width:3.72361in;height:1.40069in" />

ViLD 方法的研究重点在两阶段目标检测方法的第二阶段，即得到提议框（proposal）之后。其思想还是最简单的分别抽取文本和图片特征，然后通过点积计算相似度。其模型结构如下图所示。

<img src=".\解释3_assets/media/image21.png" style="width:5.63264in;height:2.05139in" alt="IMG_256" />

(a)：Mask R-CNN框架。

一阶段得到的候选框proposals经过检测头得到 region embeddings，然后经过分类头得到预测的bounding box以及对应的类别。损失分为<span class="mark">定位损失（回归损失）和分类损失</span>。

\(b\) ：ViLD-text 分支

N个proposals经过一些处理得到类似图a中的N个 region embeddings（图片特征）。将物体类别（基础类）处理为prompt 句子就得到了文本，然后将这些文本扔给文本编码器得到Text Embeddings（文本特征）。和Lseg类似，这些<span class="mark">Text Embeddings也是冻住权重</span>的，不参与训练。

上面物体类别就是 Base categories（也叫CB，Class Base），和Mask R-CNN有监督训练的基础类一样，所以ViLD-text 做的还是有<span class="mark">监督训练</span>。

因为是有监督训练，所以需要额外<span class="mark">添加一个背景类</span>进行训练，即可学习的Background embedding（基础类之外的类别全部归为背景类）。

Text Embeddings加上类别和可学习的背景 embedding以及 region embeddings进行<span class="mark">点积</span>来计算图文相似度得到logics，然后计算logics和GT的交叉熵损失来进行训练。

在 ViLD-text 模型中，只是将文本特征和图像特征做了关联（感觉到这里只是类似Lseg），模型可以做文本查询的 zero-shot 检测。但是由于模型还不了解基础类CB之外的其他语义内容（X新类别CN），因此直接做 zero-shot 的效果不会很好。

<img src=".\解释3_assets/media/image22.png" style="width:5.76319in;height:4.22361in" />

<img src=".\解释3_assets/media/image23.png" style="width:2.55139in;height:2.30069in" />

<img src=".\解释3_assets/media/image21.png" style="width:5.63264in;height:2.05139in" alt="IMG_256" />

**ViLD-image分支**：引入CLIP特性，这部分只在训练时进行蒸馏，推理时不蒸馏。考虑到 CLIP的图片编码器训练的很好，而且和文本紧密关联，所以希望ViLD-image-encoder输出的region embeddings和CLIP输出的image embedding尽可能的接近，这样就可以学习到CLIP图像编码器中开放世界的图像特征提取能力。做到这一点的最简单方式就是知识蒸馏（Knowledge Distillation）。

右侧teacher分支：将M个proposals resize到比如224×224的尺寸，然后输入预训练好的CLIP-image-encoder（冻结，不参与训练，保证抽出来的特征和CLIP一样好）得到M image embeddings

左侧student分支：和ViLD-text 分支前面的结构一样，<span class="mark">输入M个proposals</span> 得到M个region embeddings

计算<span class="mark">region embeddings和 image embeddings的L1 loss来进行知识蒸馏</span>，让检测器学习 CLIP 提取的特征。

为了加速模型训练，在训练 ViLD-image 时先用 CLIP 模型提取好图像区域特征，保存在硬盘中，在训练时直接从硬盘读取即可。

此<span class="mark">分支监督信号不再是人工标注的数据，而是CLIP的图像编码</span>，所以就不再受基础类CB的限制了，对于任何的语义区域都可以由 CLIP 抽取图像特征。利用ViLD-image，大大加强了做Open-vocabulary检测的能力.

**ViLD-image分支的弊端**：预加载训练好的proposals，而不是随时可以变的N proposals

此分支输入是M pre-complete proposals，这是为了训练加速。

理论上第一阶段输出的N proposals应该输入text和image两个分支进行训练，但如果每次训练时再去抽取CLIP特征就太慢了。因为ViLD选用的CLIP-L模型非常大，做一次前向过程非常贵。比如M=1000时等于每一次迭代都需要前向1000次才能得到所有图像特征，这样训练时间会拉到无限长。

作者在这里的做法就是在ViLD-image开始训练之前，利用RPN网络预先抽取M pre-complete proposals，然后按照图中顺序算好 M image embeddings。ViLD-image训练时，只需要将其load进来，这样loss算起来就很快，蒸馏过程也就训练的很快。

<img src=".\解释3_assets/media/image21.png" style="width:5.63264in;height:2.05139in" alt="IMG_256" />

**(d) ：ViLD-text 和 ViLD-image的合体**

为了训练简单，将M pre-complete proposals和N proposals一起输入检测头Head得到n+m个embedding，然后拆分为N region embeddings和M region embeddings。前者算ViLD-text 分支的交叉熵损失，后者算ViLD-image的蒸馏L1损失。

**<span class="mark">绿色的 “Head” 是什么？</span>**

它就是 Faster R-CNN 的 ROI Box Head（两层 FC），  
但是 不再输出分类 logits，  
而是输出一个 固定维度的 ROI embedding（区域嵌入向量）

一般来说，Head后面直接就是输出了，包括映射为几类，做Softmax，算Logits

<img src=".\解释3_assets/media/image24.png" style="width:5.75972in;height:3.60694in" />

<img src=".\解释3_assets/media/image21.png" style="width:5.63264in;height:2.05139in" alt="IMG_256" />

1.  绿色 Head 输出 ROI 视觉特征RoI → Head → 1024-d feature

<!-- -->

2.  Projection Layer 把特征投影到文本空间1024 → 512

3.  L2 Normalization得到 ViLD 的 region embedding：embedding_R

4.  和 text embedding 对齐：score = embedding_R ⋅ embedding_T

5.  分类通过 similarity 完成，不再有 softmax 分类器。

    模型总览图：

    <img src=".\解释3_assets/media/image25.png" style="width:5.56042in;height:2.63542in" alt="IMG_256" />

    <img src=".\解释3_assets/media/image26.png" style="width:5.7625in;height:1.75in" />

    <img src=".\解释3_assets/media/image27.png" style="width:5.76319in;height:1.59306in" />

    ViLD是第一个在LVis这么难的数据集上做Open-vocabulary目标检测的模型，是一个里程碑式的工作。ViLD借鉴了CLIP的思想，也借鉴了CLIP的预训练参数，最后的结果也不错。

    <img src=".\解释3_assets/media/image28.png" style="width:5.76736in;height:3.0625in" />

    <img src=".\解释3_assets/media/image29.png" style="width:5.76042in;height:3.53611in" />

