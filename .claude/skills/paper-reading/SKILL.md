---
name: paper-reading
description: 将论文精读笔记（.md + .html + .ipynb）合并为高质量 MDX 博客文章，自动处理公式、图片、代码等 MDX 兼容性问题。触发词：论文精读、paper reading、MDX 博客、论文笔记。
argument-hint: '[论文关键词，如 resnet]'
---

将论文精读的三份源材料（Markdown 笔记、HTML AI 总结、Jupyter Notebook 代码实现）合并为一篇高质量的 MDX 博客文章。

本 skill 固化了 Transformer 论文精读博客开发中积累的全部 MDX 踩坑经验，确保每篇论文精读博客都能一次构建通过。

**金标准模板**：`app/blog/posts/attention-is-all-you-need.mdx`

---

## 关键文件索引

| 用途 | 路径 |
|------|------|
| 博客文章目录 | `app/blog/posts/` |
| MDX 组件定义 | `app/components/mdx.tsx` |
| PaperCard 组件 | `app/components/paper-card.tsx` |
| MDX 编译管道 | `app/blog/utils.ts` |
| 全局样式 | `app/tailwind.css` |
| 静态资产根目录 | `public/static/blog/[slug]/` |
| 博客路由 | `/blog/[slug]` |

---

## Phase 0：输入收集

使用 `AskUserQuestion` 收集以下信息：

**问题 1 — canonical source 路径**

优先要求用户按以下 canonical source layout 提供或确认论文目录：

```text
papers/<Paper>/notes.md
papers/<Paper>/ai-summary.html
papers/<Paper>/code.ipynb
```

规则：
- `papers/<Paper>/` 是唯一 canonical source 目录
- `notes.md` 是主要内容来源
- `ai-summary.html` 可选；缺失时不生成「AI 总结」链接
- `code.ipynb` 可选；缺失时不生成「代码实战」链接，跳过代码实战章节
- 允许用户先提供旧路径或旧文件名作为原始输入，但正式生成前必须归一化到上述 canonical 路径
- 根目录或 `papers/<Paper>/` 外的重复源文件/目录不应继续作为工作输入；允许的重复仅限发布产物 `public/static/blog/[slug]/`

典型非 canonical 输入示例：
- `08_BERT_代码实战.ipynb`
- `18_AlphaFold2_代码实战.ipynb`
- 根目录遗留资产目录如 `解释2_assets/`

> 降级策略：
> - 缺少 `ai-summary.html` → PaperCard 不生成「AI 总结」链接
> - 缺少 `code.ipynb` → PaperCard 不生成「代码实战」链接，跳过代码实战章节
> - `PaperCard.links` 至少保留「论文原文」

**问题 2 — 论文元信息**

收集以下字段（用于 frontmatter 和 PaperCard）：

| 字段 | 示例 | 用途 |
|------|------|------|
| 英文论文标题 | Attention Is All You Need | PaperCard title |
| 作者与机构 | Vaswani et al. — Google Brain | PaperCard description |
| 会议/年份 | NeurIPS 2017 | PaperCard description |
| arXiv URL | https://arxiv.org/abs/1706.03762 | PaperCard 论文链接 |
| 博客 slug | `transformer` | URL 路径 + 资产目录名 |
| 中文标题 | Transformer 论文精读 | frontmatter title |
| 中文摘要 | Transformer 模型论文精读笔记… | frontmatter summary |
| 标签 | [Deep Learning, Transformer, Paper Reading] | frontmatter tags |

> `publishedAt` 默认使用当天日期，无需用户提供。
> Colab 链接不再作为用户输入字段；若存在 `papers/<Paper>/code.ipynb`，应基于该 canonical 路径生成代码实战链接。

---

## Phase 1：Canonicalization / Preflight

在分析内容前，先统一并验证源材料布局：

1. 确认当前论文的 canonical source 目录为 `papers/<Paper>/`
2. 若用户提供的是旧命名 notebook（如 `08_BERT_代码实战.ipynb`），先迁移/重命名为 `papers/<Paper>/code.ipynb`
3. 若用户提供的 Markdown 或 HTML 不在 `papers/<Paper>/` 下，先迁移/重命名为 `notes.md` / `ai-summary.html`
4. 若原始图片或附件位于根目录或 paper 目录外（如 `解释_assets/`、`解释2_assets/`），先迁移到当前 paper 的 source 体系中，再继续生成流程
5. 明确区分两类重复：
   - 允许：发布态副本 `public/static/blog/[slug]/...`
   - 不允许：根目录或 `papers/<Paper>/` 外的重复源文件/目录
6. 若 canonicalization 未完成，不进入后续生成阶段

输出一份 preflight 摘要，明确：
- 已确认/迁移的 canonical 文件
- 发现的非 canonical 输入
- 需要清理的根目录重复源目录或文件

---

## Phase 2：源材料分析

读取 canonical source 文件，提取以下信息并输出分析摘要：

1. **从 .md 文件提取**：
   - 文章结构（标题层级）
   - 数学公式（inline `$...$` 和 display `$$...$$`）
   - 图片引用路径及数量
   - 加粗/强调文本（需转为 `<strong>`）
   - 表格
   - 裸花括号（需转义）

2. **从 .html 文件提取**：
   - 确认文件存在且可用于静态托管

3. **从 .ipynb 文件提取**：
   - 关键代码片段（用于嵌入博客正文）
   - Notebook 整体结构概览

输出摘要供用户确认后再继续。

---

## Phase 3：资产准备

0. **预检**：若 `app/blog/posts/[slug].mdx` 已存在，请求用户确认是否覆盖（默认不覆盖）
1. 创建静态资产目录：`public/static/blog/[slug]/`
2. 将 `papers/<Paper>/notes.md` 中引用的图片复制到该目录
3. 若提供了 `papers/<Paper>/ai-summary.html`，复制到该目录并命名为 `ai-summary.html`
4. 记录所有图片的新路径映射（旧路径 → `/static/blog/[slug]/filename`）
5. 记录链接可用性标记：`hasAiSummary`、`hasColab`
6. 明确：`public/static/blog/[slug]/` 是发布态输出目录，不是源目录；源文件仍以 `papers/<Paper>/` 为准

---

## Phase 4：MDX 生成

按以下标准结构生成 MDX 文件 `app/blog/posts/[slug].mdx`。

### 3.1 Frontmatter

```yaml
---
title: '[中文博客标题]'
publishedAt: '[YYYY-MM-DD]'
summary: '[一句话中文摘要]'
draft: false
image: '/static/blog/[slug]/[封面图]'
tags: [tag1, tag2, ..., Paper Reading]
---
```

### 3.2 PaperCard

紧跟 frontmatter 之后，前后各留一个空行。根据可用性标记动态组装 `links` 数组：

若存在 `papers/<Paper>/code.ipynb`，则“代码实战”链接必须基于该 canonical notebook 路径生成；禁止继续使用旧的带编号 notebook 文件名。

**完整示例**（三个链接都可用时）：
```jsx
<PaperCard
	title="Attention Is All You Need"
	description="Vaswani et al. — NeurIPS 2017 (Google Brain)"
	links={[
		{ label: "论文原文", url: "https://arxiv.org/abs/1706.03762" },
		{ label: "AI 总结", url: "/static/blog/transformer/ai-summary.html" },
		{ label: "代码实战", url: "https://colab.research.google.com/github/yunshenwuchuxun/yunshen-blogv1/blob/main/papers/Transformer/code.ipynb" },
	]}
/>
```

**最小示例**（仅论文链接）：
```jsx
<PaperCard
	title="[论文标题]"
	description="[作者] — [会议/年份] ([机构])"
	links={[
		{ label: "论文原文", url: "[arXiv URL]" },
	]}
/>
```

### 3.3 正文结构

按以下顺序组织内容，每个部分作为 `## 二级标题`：

1. **开篇导言**（无标题，1-2 段概述论文的历史地位和核心贡献）
2. **研究动机**（现有方法的问题 → 本文的解决思路）
3. **核心方法/模型架构**（论文的主要技术贡献）
4. **组件详解**（各关键组件的子章节，用 `### 三级标题`）
5. **实验结果**（如有关键数据）
6. **总结**（简洁总结核心贡献）
7. **代码实战**（嵌入关键代码片段 + Colab 徽章链接；无 `papers/<Paper>/code.ipynb` 则跳过。若存在 notebook，则徽章链接必须指向该 canonical `code.ipynb`）
8. **参考文献**（写博客时参考的资料：论文原文、教程视频、技术博客等，而非论文自身的 References）

---

## 3.4 MDX 转换规则

以下规则从实际踩坑中总结，**必须逐条遵循**。

### R1：加粗文本 — 使用 `<strong>` 标签

```
❌ **这是加粗文本**
✅ <strong>这是加粗文本</strong>
```

`**...**` 在普通段落中通常可正常解析，但在「列表项 + 公式 + 标点」混排时存在解析歧义。统一使用 `<strong>` 确保风格一致、消除边界情况。

### R2：Inline 数学公式 — 使用 `$...$`

```
❌ 维度为 \(d_{model}\)
✅ 维度为 $d_{model}$
```

`$` 符号前后无多余空格。pipeline 已配置 `remarkMath` + `rehypeKatex`。

### R3：Display 数学公式 — 使用 `$$...$$` 三行格式居中

```
❌ $$h_i^{(l+1)} = \sigma(\sum_{j} \alpha_{ij} Wh_j)$$

✅
$$
h_i^{(l+1)} = \sigma(\sum_{j} \alpha_{ij} Wh_j)
$$
```

- `$$` 必须独占一行（三行格式：开 `$$` / 公式 / 闭 `$$`），单行 `$$...$$` 无法居中
- 公式块前后各留一个空行
- `\text{}` 在 KaTeX display 模式下可正常工作
- 集合花括号使用 `\lbrace` / `\rbrace` 替代 `\{` / `\}`，避免 MDX 解析冲突

### R4：图片路径 — 正文插图使用绝对路径

```
❌ ![alt](./images/fig1.png)
❌ ![alt](media/fig1.png)
✅ ![alt](/static/blog/[slug]/fig1.png)
```

正文插图必须位于 `public/static/blog/[slug]/` 下，MDX 中省略 `public` 前缀。

允许外链徽章图（如 Colab badge）：
```
✅ [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yunshenwuchuxun/yunshen-blogv1/blob/main/papers/Transformer/code.ipynb)
```

若使用 Colab 链接，其目标 notebook 必须是 canonical `papers/<Paper>/code.ipynb`，不能是旧的带编号 notebook 文件名。

### R5：代码块 — 标准 Markdown 语法（优先标注语言）

````
✅
```python
def attention(Q, K, V):
    ...
```
````

pipeline 已配置 `rehype-pretty-code`（Dracula 主题）。纯输出/示意块允许无语言标注，推荐使用 ` ```text `。

### R6：表格 — 标准 Markdown 表格

```
✅
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| a   | b   | c   |
```

pipeline 已配置 `remarkGfm`。表格内加粗同样使用 `<strong>`。

### R7：禁止裸花括号

```
❌ 集合 {a, b, c}
✅ 集合 \{a, b, c\}   （数学模式内）
✅ 集合 &#123;a, b, c&#125;   （正文中）
```

MDX 将 `{...}` 解析为 JSX 表达式，裸花括号会导致编译错误。

### R8：JSX 组件格式

- 属性缩进使用制表符（Tab），与项目 Biome 配置一致
- JSX 组件块前后各保留一个空行
- 字符串属性使用双引号

### R9：文件编码 UTF-8 无 BOM

### R10：Frontmatter 字段完整性

必填：`title`、`publishedAt`、`summary`、`draft`。强烈建议：`image`、`tags`。`tags` 必须包含 `Paper Reading`。

### R11：移动端适配

论文精读博客含大量数学公式，必须确认 `app/tailwind.css` 中存在以下规则（若缺失则补充）：

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

根因：KaTeX 渲染的 `.katex-display` 是 `<span>` 内联元素，`overflow` 属性对内联元素无效。必须 `display: block` 转为块级元素后 `overflow-x: auto` 才能生效。

> 此规则为全局基础设施，已存在则跳过，不属于"修改现有文件"范畴。

---

## Phase 4：合规性检查

生成 MDX 文件后，执行以下自动检查并修正。

### 硬性规则检查（R1-R13）

| 编号 | 检查项 | 检测方法 |
|------|--------|---------|
| R1 | 无 `**...**` 加粗语法 | Grep `\*\*[^*]+\*\*`，排除代码块内的匹配 |
| R2 | Inline 数学使用 `$...$` | 确认无 `\(...\)` 语法 |
| R3 | Display 数学 `$$` 独占行 | 检查 `$$` 前后无其他字符 |
| R4 | 正文插图路径合法 | 允许 `/static/blog/...` 和 `https://` 外链徽章图 |
| R5 | 代码块语法合法 | 检查围栏成对；无语言标注时给出警告 |
| R6 | 表格语法正确 | 检查 `\|` 分隔符和对齐行 |
| R7 | 无裸花括号 | Grep 非数学模式、非代码块、非 JSX 属性中的 `{` |
| R8 | JSX 格式正确 | Tab 缩进 + 组件块前后空行 + 双引号属性 |
| R9 | UTF-8 无 BOM | 检查文件头字节 |
| R10 | Frontmatter 字段完整 | 验证必填字段 + tags 含 Paper Reading |
| R11 | KaTeX 移动端样式存在 | 检查 `app/tailwind.css` 含 `.katex-display { display: block; overflow-x: auto }` |
| R12 | 所有 Colab / GitHub notebook 链接都指向 canonical `code.ipynb` | 检查 notebook URL 必须以 `/code.ipynb` 结尾，禁止旧编号 notebook 文件名 |
| R13 | 不依赖 paper 目录外原始资产路径 | 检查 `notes.md` 与生成结果中不存在 `解释_assets`、`解释2_assets` 或其他 `papers/<Paper>/` 外源路径 |

### 质量检查（Q1-Q6）

| 编号 | 检查项 |
|------|--------|
| Q1 | 正文结构是否符合 3.3 节定义的标准顺序 |
| Q2 | 数学公式是否在 KaTeX 支持范围内 |
| Q3 | 图片文件是否实际存在于 `public/static/blog/[slug]/` |
| Q4 | PaperCard 的 links 本地路径对应文件是否存在 |
| Q5 | 代码片段前是否有文字引导说明 |
| Q6 | 参考文献是否为写博客时参考的资料（论文原文、教程视频、技术博客等） |

R 类检查失败必须自动修正后重新检查。Q 类检查如有问题，输出警告供用户决策。

额外要求：若发现旧 notebook 文件名链接、根目录重复源目录、或 `解释_assets` / `解释2_assets` 这类遗留引用，必须先完成 canonicalization，再继续生成。

---

## Phase 6：构建验证

```bash
pnpm build
```

- 构建成功 → 进入 Phase 7
- 构建失败 → 分析错误，回到合规检查阶段修正后重试（最多 3 次）
- 仍失败 → 输出错误详情请用户介入

---

## Phase 7：发布确认

输出摘要，等待用户最终确认：

```
## 发布摘要

- 文件：app/blog/posts/[slug].mdx
- 标题：[中文标题]
- 标签：[tags]
- 资产目录：public/static/blog/[slug]/
- 图片数量：[N] 张
- 代码块数量：[N] 个
- 构建状态：✅ 通过

确认发布？（draft 字段已设为 false）
```

---

## 护栏

- **优先 canonicalize 源文件**：若输入不是 `papers/<Paper>/{notes.md, ai-summary.html, code.ipynb}`，先归一化再生成
- **禁止沿用根目录重复源目录**：如 `解释_assets/`、`解释2_assets/` 仅可作为待迁移遗留输入，不能继续作为稳定 source of truth
- **允许发布态副本**：`public/static/blog/[slug]/` 下的图片和 `ai-summary.html` 属于发布输出，可与 source 并存
- **不引入新依赖**：基于现有 pipeline（remarkGfm、remarkMath、rehypeKatex、rehypePrettyCode）
- **每个 Phase 等待用户确认**：Phase 0 收集输入、Phase 1 preflight 摘要、Phase 2 分析摘要、Phase 3 资产准备、Phase 4 MDX 生成、Phase 5 检查结果、Phase 7 发布确认
- **不自动 git commit**：完成后提示用户手动 commit 或使用 `/commit`
- **遵循项目代码风格**：Tab 缩进、单引号、分号、trailing comma
