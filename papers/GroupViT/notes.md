# GroupViT

上一节讲的LSeg 虽然能够实现 zero-shot 的语义分割，但是训练方式并不是对比学习（无监督训练），没有将文本作为监督信号来使用。因此LSeg还是需要手工标注的分割掩模（segmentation mask）进行训练。其使用的 7 个数据集加起来可能也就一二十万个样本，跟别的有监督无监督训练是远远不能比的。

GroupViT是2022年2月22发表在CVPR的文章。从标题可以看出，其监督信号来自文本而非segmentation mask。GroupViT通过文本自监督的方式进行训练，从而实现简单的分割任务（不再依赖segmentation mask）。训练用的对比学习的训练方式。

## 模型结构

GroupViT 的核心思想，是利用了之前无监督分割工作中的的 <span class="mark">grouping</span>。简单说如果有一些聚类的中心点，从这些中心点开始发散，把周围相似的点逐渐扩散成一个group，最后这个group即相当于一个Segmentation mask（感觉类似DBSCAN）。

Group ViT的贡献就是在现有的ViT模型中加入计算单元Grouping Block，同时加入了可学习的Group Tokens。这样模型在初期学习的时候就能慢慢一点点的将相邻的元素group起来，最后变成一个个segmentation mask。

比如下图，浅层的时候学习到的还是一些五颜六色的块（聚类中心多），到深层大象、房子、草地等都已经分割出来了（聚类中心变少）。

下面来看一下 GroupViT 模型框架和具体的训练过程：

<img src=".\解释3_assets/media/image16.png" style="width:4.25556in;height:2.12431in" alt="IMG_256" />

图像编码器：

<img src=".\解释3_assets/media/image17.png" style="width:5.76181in;height:1.90625in" />

由于分类任务一张图像只需要一个全图的特征，因此只用一个 token 即可。而语义分割中一张图有多个目标，所以需<span class="mark">要多个特征</span>，也就是多个 group tokens。最初是选择64个 group tokens（聚类中心），不大不小，后期可以合并。Group blocks就是在把Patch embedding 分配给各个聚类中心。

<img src=".\解释3_assets/media/image18.png" style="width:5.76319in;height:3.45347in" />

文本方面就和CLIP差不多，就是通过文本编码器得到一个Z^T，这样也就对应了数据集那样的形式，（一个图片和一些文本配对）

## 推理

文本和图像分别经过各自的编码器得到文本特征和图像特征，然后计算相似度，得到最匹配的图像文本对，就可以知道每个group embedding对应什么class。局限性在于最后的聚类中心（Group Tokens）只有8类，所以一张图像中最多分割出八个目标。

GroupViT 没有在ViT基础上加很复杂的模块，目标函数也和CLIP保护一致，所以其scale性能很好。即更大模型更多数据，其性能会更好。

**结论：** GroupViT 图片<span class="mark">分割</span>做得好（segmentation mask生成的好），但是<span class="mark">语义分割（可以分割出来，但是分的类别有问题）</span>做的不够好，这是由于CLIP这种对比学习的训练方式，对于明确语义物体信息能学的很好；但是对于背景这种语义比较模糊类别很难识别，因为背景可以代表很多类。后续改进可以是每个类设置不同阈值，或者使用可学习的阈值，或者是更改 Zero-Shot 推理过程、训练时加入约束，融入背景类概念等等。

Lseg使用CLIP的预训练模型和大概框架，融合了文本和图片特征去做分割，但依旧是一个有监督的学习过程，还是需要手工标注的数据集；GroupViT 从头训练了一个分割模型，但是用的目标函数和CLIP的对比学习目标函数一样，局限之一就是背景类处理得不够好。

