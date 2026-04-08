---
name: tech-blog-mdx
description: 将普通技术博客 Markdown 源稿整理为高质量 MDX 博客文章，自动处理公式、图片、代码块、裸花括号、移动端公式滚动等 MDX 兼容性问题。适用于算法原理讲解、工程实践总结、框架机制解析、normal 技术博客、公式排版、手机端适配等常规技术博客场景，不适用于带 .html / .ipynb 联动的论文精读场景。
argument-hint: '[技术博客 markdown 文件路径或主题关键词]'
---

将普通技术博客的 Markdown 源稿整理为一篇可发布、可构建、移动端友好的 MDX 博客文章。

本 skill 继承 `paper-reading` 的 MDX 兼容性规则、公式排版要求、构建验证流程和移动端适配经验，但输入简化为常规技术博客，不依赖 `.html` AI 总结页或 `.ipynb` Notebook。

**适用场景**：算法原理讲解、框架机制解析、工程实践复盘、技术方案说明、源码导读。

**不适用场景**：需要 `.html` 总结页或 `.ipynb` 代码实战联动的论文精读博客（请使用 `paper-reading`）。

---

## 关键文件索引

| 用途 | 路径 |
|------|------|
| 博客文章目录 | `app/blog/posts/` |
| MDX 组件定义 | `app/components/mdx.tsx` |
| MDX 编译管道 | `app/blog/utils.ts` |
| 全局样式 | `app/tailwind.css` |
| 静态资产根目录 | `public/static/blog/[slug]/` |
| 博客路由 | `/blog/[slug]` |

> 若当前项目不存在上述结构，先停在 Phase 0，要求用户提供博客项目根目录，不进入生成阶段。

---

## Phase 0：输入收集

使用 `AskUserQuestion` 收集以下信息。

### 问题 1 — 源文件路径

请用户提供：
- `.md` 文件路径：技术博客原始稿件（必需）
- 相关图片所在目录（可选；若图片路径已在 `.md` 中可解析，可不单独提供）
- 封面图路径（可选）

> 降级策略：
> - 缺少图片目录 → 仅处理 `.md` 中已能解析的图片引用
> - 缺少封面图 → frontmatter 可暂不写 `image`，但需给出警告
> - 若源稿不是 Markdown → 停止并要求用户先转换为 `.md`

### 问题 2 — 博客元信息

收集以下字段（用于 frontmatter 和文章生成）：

| 字段 | 示例 | 用途 |
|------|------|------|
| 博客 slug | `resnet-guide` | URL 路径 + 资产目录名 |
| 中文标题 | ResNet 原理与残差结构解析 | frontmatter title |
| 英文标题（可选） | Understanding ResNet | 文内或 SEO 辅助 |
| 中文摘要 | 从退化问题出发，系统解释残差连接为何有效 | frontmatter summary |
| 标签 | [Deep Learning, ResNet, Computer Vision] | frontmatter tags |
| 发布日期（可选） | 2026-04-01 | frontmatter publishedAt，默认当天 |
| 博客项目根目录 | `/path/to/blog` | 写入 `app/blog/posts/` 与 `public/static/blog/` |

> 若用户未提供 `publishedAt`，默认使用当天日期。

---

## Phase 1：源材料分析

读取用户提供的 `.md` 文件，提取以下信息并输出分析摘要。

1. **文章结构**：
   - 标题层级（H1 / H2 / H3）
   - 是否存在结构跳级、重复标题、过长段落

2. **数学公式**：
   - inline `$...$`
   - display `$$...$$`
   - 非兼容语法：`\(...\)`、单行 `$$...$$`、公式截图

3. **图片与资源**：
   - 图片引用路径及数量
   - 是否存在 `<img>` 标签
   - 是否存在无效相对路径
   - 是否存在不适合保留的截图（低质量、带明显 UI 噪声）

4. **代码内容**：
   - 代码块数量
   - 是否标注语言
   - 是否存在行内代码 / shell 命令 / 配置片段

5. **MDX 风险点**：
   - `**...**` 加粗（需转为 `<strong>`）
   - 裸花括号 `{}`（需转义）
   - 原始 HTML 标签
   - 不规范表格

输出分析摘要供用户确认后再继续。

---

## Phase 2：资产准备

0. **预检**：若 `app/blog/posts/[slug].mdx` 已存在，请求用户确认是否覆盖（默认不覆盖）
1. 创建静态资产目录：`public/static/blog/[slug]/`
2. 将 `.md` 中实际使用的本地图片复制到该目录
3. 记录所有图片的新路径映射：`旧路径 -> /static/blog/[slug]/filename`
4. 检查封面图是否可用；若可用，复制到同一目录并记录新路径
5. 记录可用性标记：`hasCoverImage`、`hasLocalImages`

> 仅复制正文实际引用的本地图片，不复制无引用资产。

---

## Phase 3：MDX 生成

按以下标准结构生成 MDX 文件 `app/blog/posts/[slug].mdx`。

### 3.1 Frontmatter

```yaml
---
title: '[中文博客标题]'
publishedAt: '[YYYY-MM-DD]'
summary: '[一句话中文摘要]'
draft: false
image: '/static/blog/[slug]/[封面图]'
tags: [tag1, tag2, ..., Tech Blog]
---
```

规则：
- 必填：`title`、`publishedAt`、`summary`、`draft`
- 强烈建议：`image`、`tags`
- `tags` 最后必须包含 `Tech Blog`
- 若无封面图，允许省略 `image`，但需在检查结果中明确警告

### 3.2 正文结构

按以下顺序组织内容，每个部分作为 `## 二级标题`。

1. **开篇导言**（无标题，1-2 段，说明这篇文章解决什么问题、为什么重要）
2. **问题背景 / 动机**（技术背景、现有痛点、设计目标）
3. **核心原理 / 整体方案**（整体思路、系统结构、关键机制）
4. **关键组件 / 关键机制详解**（用 `### 三级标题` 分解核心模块）
5. **实现细节 / 代码示例**（关键代码片段，附必要解释）
6. **效果 / 实验 / 对比 / 注意事项**（按文章主题选择其一或组合）
7. **总结**（简洁回顾核心结论与适用边界）
8. **参考资料**（写博客时参考的资料，不是为了凑数）

> 如果原稿缺少其中某一部分，可在不编造事实的前提下做结构重组，但不能虚构实验结果或外部结论。

---

## 3.3 MDX 转换规则

以下规则必须逐条遵循。

### R1：加粗文本使用 `<strong>` 标签

```
❌ **这是加粗文本**
✅ <strong>这是加粗文本</strong>
```

统一使用 `<strong>`，避免列表、公式、标点混排时的 MDX 解析歧义。

### R2：Inline 数学公式使用 `$...$`

```
❌ 维度为 \(d_{model}\)
✅ 维度为 $d_{model}$
```

`$` 前后不加多余空格。

### R3：Display 数学公式使用三行 `$$` 块

```
❌ $$y = Wx + b$$

✅
$$
y = Wx + b
$$
```

要求：
- `$$` 必须独占一行
- 公式块前后各空一行
- 涉及集合花括号时，数学模式中优先使用 `\lbrace` / `\rbrace`

### R4：图片路径使用绝对静态路径

```
❌ ![alt](./images/fig1.png)
❌ <img src="media/fig1.png" />
✅ ![alt](/static/blog/[slug]/fig1.png)
```

规则：
- 正文图片统一放在 `public/static/blog/[slug]/`
- MDX 中省略 `public` 前缀
- 不保留 `<img>` 标签
- 外链图片仅在确有必要且来源稳定时允许保留

### R5：代码块使用标准 fenced markdown

````
✅
```python
def residual_block(x):
    return x
```
````

规则：
- 优先标注语言
- 配置、日志、终端输出推荐用 `text`、`bash`、`json`、`yaml` 等明确类型
- 代码块前应有一句文字说明其用途

### R6：表格使用标准 Markdown 表格

```
| 方案 | 优点 | 缺点 |
|------|------|------|
| A | 简单 | 灵活性低 |
```

表格内加粗同样使用 `<strong>`。

### R7：禁止裸花括号

```
❌ 配置项 {a: 1, b: 2}
✅ 配置项 &#123;a: 1, b: 2&#125;
✅ 数学集合 $\lbrace a, b \rbrace$
```

MDX 会将 `{...}` 解析为 JSX 表达式，必须转义。

### R8：原始 HTML 谨慎使用

- 默认不保留原始 HTML 标签
- 若必须使用 JSX / HTML 组件，确保属性使用双引号、块前后空行、缩进符合项目风格
- 纯排版需求优先使用 Markdown，而不是手写 HTML

### R9：文件编码必须为 UTF-8 无 BOM

### R10：Frontmatter 字段完整性

必填：`title`、`publishedAt`、`summary`、`draft`。

强烈建议：`image`、`tags`。`tags` 必须包含 `Tech Blog`。

### R11：移动端公式适配

若文章包含较多 display 数学公式，必须确认 `app/tailwind.css` 中存在以下规则（若缺失则补充）：

```css
.katex-display {
  display: block;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

.katex-display > .katex {
  white-space: nowrap;
}
```

根因：KaTeX 渲染的 `.katex-display` 默认是内联结构，不转为块级元素时移动端横向滚动无法生效。

---

## Phase 4：合规性检查

生成 MDX 后，执行以下自动检查并修正。

### 硬性规则检查（R1-R11）

| 编号 | 检查项 | 检测方法 |
|------|--------|---------|
| R1 | 无 `**...**` 加粗语法 | Grep `\*\*[^*]+\*\*`，排除代码块 |
| R2 | Inline 数学使用 `$...$` | 确认无 `\(...\)` |
| R3 | Display 数学 `$$` 独占行 | 检查 `$$` 前后无其他字符 |
| R4 | 正文插图路径合法 | 只允许 `/static/blog/...` 或明确批准的稳定外链 |
| R5 | 代码块语法合法 | 围栏成对；尽量带语言标注 |
| R6 | 表格语法正确 | 检查表头、分隔行、列数一致 |
| R7 | 无裸花括号 | 排除数学模式、代码块、合法 JSX 属性后检查 `{` |
| R8 | 无不必要原始 HTML | 检查 `<img>`、内联样式、危险标签 |
| R9 | UTF-8 无 BOM | 检查文件头字节 |
| R10 | Frontmatter 字段完整 | 验证必填字段 + tags 含 `Tech Blog` |
| R11 | KaTeX 移动端样式存在 | 检查 `app/tailwind.css` 中对应规则 |

### 质量检查（Q1-Q6）

| 编号 | 检查项 |
|------|--------|
| Q1 | 正文结构是否符合 3.2 节定义的标准顺序 |
| Q2 | 公式是否在 KaTeX 支持范围内 |
| Q3 | 图片文件是否实际存在于 `public/static/blog/[slug]/` |
| Q4 | 代码块前是否有必要的引导说明 |
| Q5 | 是否存在内容编造、夸大或无依据结论 |
| Q6 | 参考资料是否真实、相关、不过量 |

规则：
- `R` 类失败必须自动修正后重新检查
- `Q` 类问题输出警告供用户决策，不得擅自编造内容来“补齐结构”

---

## Phase 5：构建验证

```bash
yarn build
```

- 构建成功 → 进入 Phase 6
- 构建失败 → 分析错误，回到 Phase 4 修正后重试（最多 3 次）
- 若仍失败 → 输出错误详情，请用户介入

---

## Phase 6：发布确认

输出摘要，等待用户最终确认：

```text
## 发布摘要

- 文件：app/blog/posts/[slug].mdx
- 标题：[中文标题]
- 标签：[tags]
- 资产目录：public/static/blog/[slug]/
- 图片数量：[N] 张
- 代码块数量：[N] 个
- 公式数量：[N] 处
- 构建状态：✅ 通过

确认发布？（draft 字段已设为 false）
```

---

## 护栏

- **不修改现有文件**：仅创建新 MDX 文件和静态资产（R11 的全局 CSS 为基础设施例外，已存在则跳过）
- **不引入新依赖**：基于现有 MDX pipeline
- **每个 Phase 等待用户确认**：Phase 0、Phase 1、Phase 2、Phase 4、Phase 6 都要停顿确认
- **不自动 git commit**：完成后提示用户手动 commit 或使用 `/commit`
- **不编造内容**：若原稿缺失实验、结论、背景信息，必须明确说明缺失，而不是擅自补写事实
- **不保留不必要 HTML**：优先标准 Markdown / MDX 兼容写法
- **遵循项目代码风格**：Tab 缩进、单引号、分号、trailing comma（若目标项目如此约定）
