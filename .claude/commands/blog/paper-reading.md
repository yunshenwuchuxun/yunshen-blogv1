---
name: "Blog: Paper Reading"
description: "将论文精读笔记合并为高质量 MDX 博客文章。触发词：论文精读、paper reading、MDX 博客。"
argument-hint: '[论文关键词，如 resnet]'
---

将论文精读的三份源材料（.md 笔记 + .html AI 总结 + .ipynb 代码实现）合并为一篇高质量的 MDX 博客文章。

**输入**：`/blog:paper-reading` 后可附加论文关键词（如 `resnet`），也可不带参数直接启动。

**流程概览**：

1. **Phase 0**：收集源文件路径和论文元信息
2. **Phase 1**：分析源材料，提取结构、公式、代码、图片
3. **Phase 2**：准备静态资产（图片、HTML 复制到 `public/static/blog/[slug]/`）
4. **Phase 3**：按标准结构生成 MDX 文件
5. **Phase 4**：执行 11 项硬性规则 + 6 项质量检查
6. **Phase 5**：`yarn build` 验证构建
7. **Phase 6**：输出发布摘要，等待确认

**MDX 关键规则**：

- 加粗使用 `<strong>` 而非 `**`
- 数学公式使用 `$...$` / `$$...$$`（pipeline 已配置 remarkMath + rehypeKatex）
- 图片路径使用 `/static/blog/[slug]/filename`
- 禁止裸花括号（MDX 解析为 JSX 表达式）
- JSX 组件属性使用 Tab 缩进

**参考模板**：`app/blog/posts/attention-is-all-you-need.mdx`
