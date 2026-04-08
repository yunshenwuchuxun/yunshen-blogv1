---
name: "Blog: Paper Reading"
description: "将论文精读笔记合并为高质量 MDX 博客文章。触发词：论文精读、paper reading、MDX 博客。"
argument-hint: '[论文关键词，如 resnet]'
---

将论文精读的三份源材料（.md 笔记 + .html AI 总结 + .ipynb 代码实现）合并为一篇高质量的 MDX 博客文章。

**输入**：`/blog:paper-reading` 后可附加论文关键词（如 `resnet`），也可不带参数直接启动。

**canonical source 约束**：

- 论文源目录统一为 `papers/<Paper>/`
- 源文件名统一为 `notes.md`、`ai-summary.html`、`code.ipynb`
- 若输入仍是旧命名 notebook 或根目录遗留源目录，先 canonicalize，再继续生成
- Colab 链接统一指向 canonical `papers/<Paper>/code.ipynb`
- `public/static/blog/[slug]/` 仅作为发布态输出目录

**流程概览**：

1. **Phase 0**：收集 canonical source 路径和论文元信息
2. **Phase 1**：执行 canonicalization / preflight
3. **Phase 2**：分析 canonical source，提取结构、公式、代码、图片
4. **Phase 3**：准备静态资产（图片、HTML 复制到 `public/static/blog/[slug]/`）
5. **Phase 4**：按标准结构生成 MDX 文件
6. **Phase 5**：执行 13 项硬性规则 + 6 项质量检查
7. **Phase 6**：`pnpm build` 验证构建
8. **Phase 7**：输出发布摘要，等待确认

**MDX 关键规则**：

- 加粗使用 `<strong>` 而非 `**`
- 数学公式使用 `$...$` / `$$...$$`（pipeline 已配置 remarkMath + rehypeKatex）
- 图片路径使用 `/static/blog/[slug]/filename`
- 禁止裸花括号（MDX 解析为 JSX 表达式）
- JSX 组件属性使用 Tab 缩进
- 代码实战链接只能指向 canonical `code.ipynb`

**参考模板**：`app/blog/posts/attention-is-all-you-need.mdx`
