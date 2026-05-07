动量梯度下降法

真动量梯度下降法可写为：

$$
V_{t0} = \beta V_{t0-1} + (1 - \beta)\delta\theta_0
$$

$$
V_{t1} = \beta V_{t1-1} + (1 - \beta)\delta\theta_1
$$

$$
\theta_0 := \theta_0 - \eta V_{t0}
$$

$$
\theta_1 := \theta_1 - \eta V_{t1}
$$

其直观含义是：在梯度较小的时候适当把步子调大一些，同时通过动量抑制震荡，提高更新速度。

## RMSProp

普通梯度下降可以写成：

$$
\theta := \theta - \eta \frac{\delta\theta}{?}
$$

RMSProp 的核心是对梯度平方做滑动平均，再用它来缩放步长：

$$
S_t = \beta S_{t-1} + (1 - \beta)\delta\theta^2
$$

$$
\theta := \theta - \eta \frac{\delta\theta}{\sqrt{S_t} + \epsilon}
$$

## Adam 的思想

Adam 融合了动量法和 RMSProp：

- 一阶动量：融合动量法，主要控制更新方向。
- 二阶动量：融合 RMSProp，主要控制步长。

可以分三步理解：

第一步：

$$
V_t = \beta_1 V_{t-1} + (1 - \beta_1)\delta\theta
$$

第二步：

$$
S_t = \beta_2 S_{t-1} + (1 - \beta_2)\delta\theta^2
$$

第三步：

$$
\theta := \theta - \eta \frac{V_t}{\sqrt{S_t} + \epsilon}
$$

## 完整 Adam 公式

带偏置修正的 Adam 公式可写为：

第一步：

$$
V_t = \frac{\beta_1 V_{t-1} + (1 - \beta_1)\delta\theta}{1 - \beta_1^t}
$$

第二步：

$$
S_t = \frac{\beta_2 S_{t-1} + (1 - \beta_2)\delta\theta^2}{1 - \beta_2^t}
$$

第三步：

$$
\theta := \theta - \eta \frac{V_t}{\sqrt{S_t} + \epsilon}
$$

这里除以 $1 - \beta^t$ 的原因是：由于 $V_0$ 和 $S_0$ 初始化为 0，早期计算出的一阶、二阶动量会偏小；除以 $1 - \beta^t$ 相当于对指数加权平均做归一化，从而消除初始化带来的偏差。

## AdamW

权重衰退在传统 SGD 中很好用，使用 L2 正则通常等价于 weight decay；但在 Adam 中会出现问题。

### 为什么 Adam 中的 L2 正则不等价于 weight decay

在迭代末期，如果梯度约等于 0，则有：

$$
\frac{\partial L}{\partial \theta} \approx 0
$$

若总损失为 $L_{total} = L + \frac{\lambda}{2}\theta^2$，则：

$$
g_t = \frac{\partial L_{total}}{\partial \theta}
= \frac{\partial L}{\partial \theta} + \lambda\theta
\approx \lambda\theta
$$

于是：

$$
V_t \approx \lambda\theta
$$

$$
S_t \approx \lambda\theta^2
$$

并且：

$$
|\lambda\theta| = \lambda|\theta|
$$

代入 Adam 更新式：

$$
\theta := \theta - \eta \frac{\lambda\theta}{\sqrt{\lambda\theta^2} + \epsilon}
= \theta - \eta \frac{\lambda\theta}{|\lambda\theta| + \epsilon}
\approx \theta - \eta \operatorname{sign}(\theta)
$$

也就是说，在这种情况下，所谓的 weight decay 更接近：

$$
\theta - \eta \operatorname{sign}(\theta)
$$

它体现为减去一个与符号相关的近似固定量，而不再是标准的“按比例衰减权重”。

### SGD 中真正的 weight decay

在 SGD 中，weight decay 的形式是：

$$
\theta_{t+1} = (1 - \eta\lambda)\theta_t - \eta g_t
$$

这表示每个参数都会先统一乘上：

$$
1 - \eta\lambda
$$

也就是说，权重衰减是比较直接、统一的。

### Adam + L2 时的问题

在 Adam + L2 中，更新近似变成：

$$
\theta_{t+1} = \theta_t - \eta \frac{g_t + \lambda\theta_t}{\sqrt{v_t} + \epsilon}
$$

其中 L2 的那一部分相当于：

$$
-\eta \frac{\lambda\theta_t}{\sqrt{v_t} + \epsilon}
$$

这就不是简单的：

$$
-\eta\lambda\theta_t
$$

而是：

$$
-\eta \frac{\lambda}{\sqrt{v_t} + \epsilon}\theta_t
$$

也就是说，不同参数的衰减强度变成了：

$$
\frac{\lambda}{\sqrt{v_t} + \epsilon}
$$

因此 Adam 中的 L2 正则化会被自适应缩放扭曲，不再等价于真正的 weight decay。

## AdamW 怎么解决这个问题

AdamW 的做法是：把 weight decay 和梯度更新解耦。

AdamW 不把 $\lambda\theta$ 加进梯度里，而是单独对参数做衰减。其更新形式大致为：

$$
\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} - \eta\lambda\theta_t
$$

也可以写成：

$$
\theta_{t+1} = (1 - \eta\lambda)\theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
$$

这里 weight decay 又恢复成了清楚的形式：

$$
(1 - \eta\lambda)\theta_t
$$

这就是 AdamW 中的 decoupled weight decay。
