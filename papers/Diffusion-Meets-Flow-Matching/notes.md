# Diffusion Meets Flow Matching：同一生成范式的两种表述

原文链接：[Diffusion Meets Flow Matching: Two Sides of the Same Coin](https://diffusionflow.github.io/)

## 扩散模型

对于扩散模型，可以先从其线性插值形式出发理解前向加噪过程：

$$
z_t = \alpha_t x + \sigma_t \epsilon,
$$

其中 $x$ 表示原始数据，$\epsilon \sim \mathcal{N}(0, I)$ 表示高斯噪声，$\alpha_t$ 与 $\sigma_t$ 则共同决定在时刻 $t$ 下数据成分与噪声成分的占比。这个表达也揭示了扩散模型的基本几何直觉：样本在时间轴上始终处于“数据方向”和“噪声方向”的线性组合之中。

扩散模型可以分为两个彼此对应的部分：正向过程与反向过程。

### 1. 正向过程：将干净数据逐步扰动为纯噪声

更具体地说，扩散模型中的“加噪”并不是无约束地向样本中叠加随机扰动，而是沿着一条预先设定的路径，逐步将数据分布推向高斯噪声分布。常见写法是：

$$
z_t = \alpha_t x + \sigma_t \epsilon.
$$

此时，当 $t$ 较小时，$\alpha_t$ 较大、$\sigma_t$ 较小，因此 $z_t$ 更接近原始样本；当 $t$ 较大时，$\alpha_t$ 较小、$\sigma_t$ 较大，因此 $z_t$ 更接近噪声。

同时通常约束

$$
\alpha_t^2 + \sigma_t^2 = 1,
$$

因此虽然随着时间推进，数据成分占比逐渐减小、噪声成分占比逐渐增大，但整体尺度不会发生无控制漂移，数值上保持稳定。由此可知，$z_0$ 接近原始数据 $x$，而 $z_1$ 接近纯高斯噪声。

### 2. 反向过程：从噪声逐步恢复数据

在反向过程中，模型会先基于当前带噪样本 $z_t$ 估计对应的干净样本：

$$
\hat{x} = \frac{z_t - \sigma_t \hat{\epsilon}}{\alpha_t}.
$$

这里 $\hat{\epsilon}$ 表示模型对噪声的预测，$\hat{x}$ 则是由当前状态反推出的干净样本估计。

随后，也可以反过来根据当前状态 $z_t$ 与模型预测的 $\hat{x}$ 估计噪声分量：

$$
\hat{\epsilon} = \frac{z_t - \alpha_t \hat{x}}{\sigma_t}.
$$

这组“估计的干净样本 + 估计的噪声”可以重新投影到更低噪声的时刻 $s$：

$$
z_s = \alpha_s \hat{x} + \sigma_s \hat{\epsilon}, \quad s < t.
$$

这一过程的本质是：先从带噪样本中恢复其所对应的干净内容，再依据既定噪声日程回退到更低噪声的位置，并不断重复这一迭代，直至接近 $t=0$，最终得到干净样本。

从整体上看，扩散模型首先将真实图像表述为“信号 + 噪声”的混合形式，再训练一个神经网络从混合物中恢复信号；在采样阶段，则按照同一混合规律逐步降低噪声，最终重建出图像。

## Flow Matching

Flow Matching 将生成过程视为：样本沿着一条连续路径，从噪声分布流向数据分布。一个常见的路径写法是

$$
x_t = \alpha_t x + \sigma_t \epsilon,
$$

训练阶段学习的是这条轨迹上的速度场；推理阶段则将时间反转，使样本从噪声端沿速度场演化回数据端。若把它看作一条连接数据分布与噪声分布的连续概率路径，那么 Flow Matching 的核心任务，就是在每个时间点上学习该路径的瞬时运动方向。

与扩散模型通过预测噪声或信号不同，Flow Matching 更直接地对“速度场”进行监督学习：

$$
\mathcal{L}_{\mathrm{FM}} = \mathbb{E}_{t,x,\epsilon}\left[\left\|v_\theta(x_t,t)-u_t(x,\epsilon)\right\|^2\right].
$$

### 1. 真实速度 $u(x,t)$ 从何而来

对于给定的连续路径

$$
\psi_t(x,\epsilon)=\alpha_t x+\sigma_t\epsilon,
$$

其真实速度场由对时间求导得到：

$$
u_t(x,\epsilon)=\dot{\alpha}_t x+\dot{\sigma}_t\epsilon.
$$

如果进一步把 $x$ 表示为路径点 $x_t$ 与噪声 $\epsilon$ 的函数，那么可得

$$
x = \frac{x_t - \sigma_t \epsilon}{\alpha_t},
$$

从而速度也可改写为

$$
u_t(x_t,\epsilon)=\frac{\dot{\alpha}_t}{\alpha_t}x_t+\left(\dot{\sigma}_t-\frac{\dot{\alpha}_t}{\alpha_t}\sigma_t\right)\epsilon.
$$

将路径点记为 $x_t=\psi_t(x,\epsilon)$ 后，模型学习的对象就是速度向量场

$$
v_\theta(x_t,t),
$$

而监督信号则是对应路径上的真实速度

$$
u_t(x,\epsilon).
$$

训练时即可构造标准的均方误差目标：

$$
\mathcal{L}_{\mathrm{FM}} = \mathbb{E}_{t,x,\epsilon}\left[\left\|v_\theta(x_t,t)-u_t(x,\epsilon)\right\|^2\right].
$$

### 2. Flow Matching 的优势

Flow Matching 的关键优势在于：它不必先预测噪声、再经过额外代数变换恢复采样方向，而是直接学习路径上的瞬时速度。这意味着模型学到的是生成轨迹本身的动力学结构，而非某个中间变量的代理表示。

可以将模型理解为一个函数：对于路径上的任意一点，它都能够输出“从起点到终点的整体移动方向”。若把轨迹写成常微分方程

$$
\frac{\mathrm{d}x_t}{\mathrm{d}t}=v_\theta(x_t,t),
$$

那么采样过程就是沿着该速度场积分，从而把噪声逐步映射回数据。这使得 Flow Matching 直接对生成轨迹的几何运动规律进行建模，而不必间接地通过噪声预测再进行换算。

### 3. 如何进行推理

在推理阶段，Flow Matching 将学习到的速度场视为一个常微分方程：

$$
\frac{\mathrm{d}x_t}{\mathrm{d}t}=v_\theta(x_t,t).
$$

若从噪声样本 $x_1 \sim p_1$ 出发，并沿时间反向积分到数据端，则得到

$$
x_0 = x_1 - \int_0^1 v_\theta(x_t,t)\,\mathrm{d}t,
$$

更一般地，也可以写成从初值问题出发的数值求解过程：

$$
x_t = x_0 + \int_0^t v_\theta(x_\tau,\tau)\,\mathrm{d}\tau.
$$

在实际实现中，采样往往通过 Euler、Heun 或其他 ODE 求解器离散积分完成，本质上就是根据模型给出的速度场不断更新样本位置。

## 两种框架的统一理解

两种方法在表面形式上不同，但其核心本质高度一致：它们都在描述样本如何沿一条时间相关的路径，在数据分布与噪声分布之间连续变化。

若取

$$
x_t = \alpha_t x + \sigma_t \epsilon,
$$

则扩散模型中的去噪估计、噪声估计与 Flow Matching 中的速度场学习，其实都建立在同一条概率路径之上，只是参数化方式不同。特别地，若对路径求导，则有

$$
\frac{\mathrm{d}x_t}{\mathrm{d}t}=\dot{\alpha}_t x+\dot{\sigma}_t\epsilon,
$$

而扩散模型若已知 $\hat{x}$ 或 $\hat{\epsilon}$，同样可以恢复对应的速度信息，因此二者在本质上是等价的路径建模。

进一步说，扩散模型更像是通过“去噪”这一观察视角来描述同一条路径，而 Flow Matching 则直接使用速度场来刻画路径的局部运动规律。二者描述对象相同，只是坐标系不同。

从这一视角看，扩散模型可以理解为对同一动态过程的一种特定参数化方式，而 Flow Matching 则直接从连续动力系统的角度刻画该过程。因此，二者并非彼此割裂的两类方法，而更像是同一生成机制的两种数学表述。

## Training

扩散模型的训练目标可写为

$$
\mathcal{L}_{\mathrm{DM}} = \mathbb{E}_{t,x,\epsilon}\left[\left\|\hat{\epsilon}_\theta(z_t,t)-\epsilon\right\|^2\right].
$$

若把路径写成

$$
z_t = \alpha_t x + \sigma_t \epsilon,
$$

则可以把噪声预测重新换算成对干净样本的预测：

$$
\hat{x} = \frac{z_t - \sigma_t \hat{\epsilon}_\theta(z_t,t)}{\alpha_t}.
$$

进一步地，把扩散路径对时间求导，可得到与 Flow Matching 对应的速度形式：

$$
u_t(x,\epsilon)=\dot{\alpha}_t x+\dot{\sigma}_t\epsilon.
$$

若再将 $x$ 用 $z_t$ 与 $\epsilon$ 表示，则有

$$
x = \frac{z_t-\sigma_t\epsilon}{\alpha_t},
$$

代回后得到

$$
u_t(z_t,\epsilon)=\frac{\dot{\alpha}_t}{\alpha_t}z_t+
\left(\dot{\sigma}_t-\frac{\dot{\alpha}_t}{\alpha_t}\sigma_t\right)\epsilon.
$$

因此，只要模型能够准确预测噪声 $\epsilon$，就能进一步恢复对应的速度场；反过来，若模型学习的是速度场，也可换算回扩散模型中的噪声预测形式。若把这种关系写成更概念化的形式，可以理解为存在某个时间相关映射，使得

$$
v_\theta(z_t,t)=a_t z_t+b_t\hat{\epsilon}_\theta(z_t,t),
$$

其中 $a_t$ 与 $b_t$ 仅依赖于路径系数 $\alpha_t,\sigma_t$ 及其时间导数。换言之，扩散模型中的噪声预测器与 Flow Matching 中的速度场网络并不是彼此独立的两套对象，而是同一路径上两种可互相换算的参数化。

进一步地，若把扩散目标代入上述线性变换，就可得到与 Flow Matching 极为接近的平方误差目标，即

$$
\mathcal{L}_{\mathrm{FM}} \propto \mathbb{E}_{t,x,\epsilon}\left[\left\|v_\theta(z_t,t)-u_t(z_t,\epsilon)\right\|^2\right].
$$

这说明在适当变量替换与参数化条件下，扩散模型的训练目标与 Flow Matching 的目标函数之间存在紧密联系。也正因此，标题中所说的 “Two Sides of the Same Coin” 并非修辞，而是在训练目标、路径构造以及生成动力学层面都成立的结构性结论。
