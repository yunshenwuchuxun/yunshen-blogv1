**LoRA**

![image1](./LoRA_assets/image1.png){width="5.7659722222222225in"
height="3.442361111111111in"}

![image2](./LoRA_assets/image2.png){width="5.753472222222222in"
height="3.716666666666667in"}

r一般为4,8,16,32

![image3](./LoRA_assets/image3.png){width="5.7625in"
height="3.433333333333333in"}

权重参数 = 原始模型参数 + alpha\* B@A / r

B 矩阵初始化为0 ，A矩阵随机初始化。（只有 B 和 A 矩阵参与训练）

Alpha 和 r 是超参数

![image4](./LoRA_assets/image4.png){width="5.764583333333333in"
height="3.0076388888888888in"}

代码：

![image5](./LoRA_assets/image5.png){width="5.7652777777777775in"
height="4.444444444444445in"}

![image6](./LoRA_assets/image6.png){width="5.763888888888889in"
height="2.4055555555555554in"}

QLoRA（量化LoRA）

![image7](./LoRA_assets/image7.png){width="5.761805555555555in"
height="3.9791666666666665in"}

原来的float-32或16位 量化为 int8，int4\...，从计算速率方面提升。

SFT 时主流做法

如果是大语言模型做 SFT，最常见配置通常是：

优先微调 attention 相关层，有时再加上 FFN 层，一般不动 embedding 和
lm_head，除非有特殊需求。

LoRA 做 SFT 主要是挂在线性变换矩阵上，而不是整个 MSA/FFN
模块"全部参数都微调"。

总结：

![image8](./LoRA_assets/image8.png){width="5.761111111111111in"
height="3.542361111111111in"}

参考：

https://www.bilibili.com/video/BV1euPkerEtL?vd_source=421df6b98aee0b275cf8c837bea8e696
