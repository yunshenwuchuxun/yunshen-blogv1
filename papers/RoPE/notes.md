# RoPE（旋转位置编码）

Transformer 直接使用正余弦绝对位置编码带来的问题：在注意力打分时会引入两个交叉噪音项。

论文希望寻找一种特殊的函数 $f_q$ 和 $f_k$，将位置信息 $m,n$ 编码到向量后，两者的点积结果 $g$ 仅依赖于输入向量 $x_m,x_n$ 以及它们的相对距离 $m-n$：

$$
\langle f_q(x_m,m), f_k(x_n,n) \rangle = g(x_m,x_n,m-n)
$$

直接加绝对位置编码时：

$$
Q = W_q(X_m + P_m)
$$

$$
K = W_k(X_n + P_n)
$$

注意力分数：

$$
\begin{aligned}
\mathrm{Score}
&= (X_m + P_m)(X_n + P_n)^T \\
&= (X_m + P_m)(X_n^T + P_n^T) \\
&= X_mX_n^T + X_mP_n^T + P_mX_n^T + P_mP_n^T
\end{aligned}
$$

其中：

- $X_mX_n^T$：纯语义信息；
- $X_mP_n^T + P_mX_n^T$：交叉噪声，模型为了语义建模还要抗干扰；
- $P_mP_n^T$：纯相对位置信息。

## 核心思想

RoPE 就是让不同位置的 token 向量按不同角度旋转。这样 $Q$ 和 $K$ 做点积时，自然就带上了相对位置信息。

## 怎么实现旋转：二维坐标示例

对二维向量：

$$
(x,y)
$$

旋转角度 $\theta$ 后变成：

$$
(x',y') = (x\cos\theta - y\sin\theta,\ x\sin\theta + y\cos\theta)
$$

对应矩阵形式：

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

旋转后，模长没有发生改变，原始语义信息保留，只增加了位置信息。

## 二维推导

令旋转矩阵为 $R(\theta)$。位置 $m$ 的 query 和位置 $n$ 的 key 分别旋转：

$$
q' = R(m\theta)q
$$

$$
k' = R(n\theta)k
$$

注意矩阵转置性质：

$$
(AB)^T = B^TA^T
$$

因此注意力分数为：

$$
\begin{aligned}
\mathrm{Score}
&= (q')^T \cdot k' \\
&= (R(m\theta)q)^T \cdot (R(n\theta)k) \\
&= q^T R(m\theta)^T R(n\theta) k
\end{aligned}
$$

令：

$$
\alpha = m\theta, \quad \beta = n\theta
$$

旋转矩阵转置为：

$$
\begin{aligned}
R(\alpha)^T
&=
\begin{bmatrix}
\cos\alpha & -\sin\alpha \\
\sin\alpha & \cos\alpha
\end{bmatrix}^T \\
&=
\begin{bmatrix}
\cos\alpha & \sin\alpha \\
-\sin\alpha & \cos\alpha
\end{bmatrix} \\
&=
\begin{bmatrix}
\cos(-\alpha) & -\sin(-\alpha) \\
\sin(-\alpha) & \cos(-\alpha)
\end{bmatrix} \\
&= R(-\alpha) = R(-m\theta)
\end{aligned}
$$

所以：

$$
\mathrm{Score} = q^T R(-m\theta)R(n\theta)k
$$

继续展开：

$$
R(-m\theta)R(n\theta)
=
\begin{bmatrix}
\cos\alpha & \sin\alpha \\
-\sin\alpha & \cos\alpha
\end{bmatrix}
\begin{bmatrix}
\cos\beta & -\sin\beta \\
\sin\beta & \cos\beta
\end{bmatrix}
$$

使用和差角公式：

$$
\cos(\beta-\alpha)=\cos\beta\cos\alpha+\sin\beta\sin\alpha
$$

$$
\sin(\beta-\alpha)=\sin\beta\cos\alpha-\cos\beta\sin\alpha
$$

可得：

$$
\begin{aligned}
R(-m\theta)R(n\theta)
&=
\begin{bmatrix}
\cos\alpha\cos\beta + \sin\alpha\sin\beta & -\cos\alpha\sin\beta + \sin\alpha\cos\beta \\
-\sin\alpha\cos\beta + \cos\alpha\sin\beta & \sin\alpha\sin\beta + \cos\alpha\cos\beta
\end{bmatrix} \\
&=
\begin{bmatrix}
\cos(\beta-\alpha) & -\sin(\beta-\alpha) \\
\sin(\beta-\alpha) & \cos(\beta-\alpha)
\end{bmatrix} \\
&= R((n-m)\theta)
\end{aligned}
$$

所以注意力分数只和相对位置 $n-m$ 有关：

$$
\mathrm{Score} = q^T R((n-m)\theta)k
$$

更一般地写成：

$$
(R_mx_m)^T(R_nx_n)=x_m^TR_m^TR_nx_n=x_m^TR_{n-m}x_n
$$

## 怎么扩展到高维？

RoPE 的高维扩展方式是：将 $d$ 维空间两两划分为 $d/2$ 个相互独立的二维子空间。每个二维子空间做一次独立旋转。

形式上：

$$
f_{\{q,k\}}(x_m,m)=R_{\Theta,m}^d W_{\{q,k\}}x_m
$$

其中旋转矩阵为：

$$
R_{\Theta,m}^d=
\begin{bmatrix}
\cos m\theta_1 & -\sin m\theta_1 & 0 & 0 & \cdots & 0 & 0 \\
\sin m\theta_1 & \cos m\theta_1 & 0 & 0 & \cdots & 0 & 0 \\
0 & 0 & \cos m\theta_2 & -\sin m\theta_2 & \cdots & 0 & 0 \\
0 & 0 & \sin m\theta_2 & \cos m\theta_2 & \cdots & 0 & 0 \\
\vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
0 & 0 & 0 & 0 & \cdots & \cos m\theta_{d/2} & -\sin m\theta_{d/2} \\
0 & 0 & 0 & 0 & \cdots & \sin m\theta_{d/2} & \cos m\theta_{d/2}
\end{bmatrix}
$$

预定义参数为：

$$
\Theta = \{\theta_i = 10000^{-2(i-1)/d},\ i \in [1,2,\cdots,d/2]\}
$$

应用 RoPE 到 self-attention 后：

$$
q_m^Tk_n = (R_{\Theta,m}^d W_qx_m)^T(R_{\Theta,n}^d W_kx_n)
= x_m^T W_q R_{\Theta,n-m}^d W_kx_n
$$

## 在 RoPE 里怎么做

假设一个 head 的向量是：

$$
[x_0,x_1,x_2,x_3,x_4,x_5]
$$

RoPE 会把它按两维一组拆开：

- $(x_0,x_1)$
- $(x_2,x_3)$
- $(x_4,x_5)$

然后对第 $i$ 组使用对应角度：

$$
\theta_i \cdot p
$$

其中：

- $p$ 是 token 的位置；
- $\theta_i$ 是这一组维度对应的频率。

所以每组都做一次二维旋转。

## 为什么要乘 $\theta$

如果只用位置 $m$ 当角度：

$$
\cos(m),\ \sin(m)
$$

那就意味着：

- 所有二维维度对都按同一个频率旋转；
- 每往后一个 token 都转同样大的角度。

这不够好，因为模型希望不同维度能表达不同尺度的位置关系：

- 有些维度适合表示短距离变化，角度变化快；
- 有些维度适合表示长距离变化，角度变化慢。

所以要给第 $i$ 个二维子空间一个自己的频率 $\theta_i$。于是位置 $m$ 在这一对维度上的相位就是：

$$
m\theta_i
$$

也就是说：

> 位置 = 步数，$\theta_i$ = 每一步转多少角度，二者相乘才是总旋转角。

对于第 $i$ 个二维子空间，$i=0,1,\cdots,\frac{d}{2}-1$：

$$
\theta_i = 10000^{-2i/d}
$$

也常写成：

$$
\theta_i = \frac{1}{10000^{2i/d}}
$$

RoPE 里乘不同的 $\theta_i$，就是为了让不同维度对用不同尺度/频率来观察位置关系。
