# Proposal: 撰写 Agent Skills 介绍博客

## 概述

在 `app/blog/posts/` 下新建一篇 MDX 博客文章，系统介绍 Agent Skills 这一 AI Agent 能力扩展的开放标准。文章以 Claude 生态为主线，横向对比 OpenAI Codex、LangChain 等平台实现，兼顾概念科普、技术分析、简要实践和行业趋势。

## 需求约束

### Frontmatter（固定值）

```yaml
---
title: 'Agent Skills：AI 编程助手的能力扩展标准'
publishedAt: '2026-03-04'
summary: '系统介绍 Agent Skills 开放标准：从核心设计哲学 Progressive Disclosure 到 Claude Code / OpenAI Codex / LangChain 的跨平台实现对比，附完整 Skill 创建实践。'
draft: false
tags: [AI, Agent Skills, Claude, Developer Tools]
---
```

### 目标读者

有 AI 编程工具使用经验的开发者（熟悉 Claude Code / Cursor / Copilot 等）。假设读者了解 LLM 基础概念（prompt、context window、token），无需铺垫 AI Agent 基础知识。

### 写作风格

- **语言**：中英混合 — 核心叙述使用中文，技术术语首次出现时使用「中文（English）」格式，后续直接使用英文
- **术语清单**（首次出现需中英对照）：渐进式披露（Progressive Disclosure）、上下文窗口（Context Window）、前置配置（Frontmatter）、子代理（Sub-agent）、开放标准（Open Standard）
- **语气**：综述型，第一人称复数（"我们"）与客观叙述交替，偏分析而非教程
- **叙述视角**：以 Agent Skills 开放标准为中心主线，各平台实现作为该标准的不同体现
- **覆盖重点**：Claude 生态（Claude Code / Claude Platform / Agent SDK）为核心（~40% 篇幅），OpenAI Codex 和 LangChain 作为补充对比（~20%）

### 篇幅约束

- **总篇幅**：2000-3000 行（含代码块），阅读时间约 15-20 分钟
- **各章节篇幅分配**：

| 章节 | 目标行数 | 占比 |
|------|---------|------|
| 1. 引言 | 100-150 | 5% |
| 2. 什么是 Agent Skills | 200-300 | 10% |
| 3. Progressive Disclosure | 200-300 | 10% |
| 4. SKILL.md 规范解析 | 300-400 | 15% |
| 5. Claude 生态 | 500-700 | 25% |
| 6. 跨平台对比 | 300-400 | 15% |
| 7. 实践示例 | 250-350 | 12% |
| 8. 展望与思考 | 100-150 | 5% |
| 9. 参考资料 | 50-80 | 3% |

### 技术约束

- **文件路径**：`app/blog/posts/agent-skills.mdx`（MDX 格式，允许 HTML 标签，禁止 JSX 组件）
- **粗体**：全文使用 `<strong>` 标签，禁止 `**` 语法（适用于正文、列表、表格内所有粗体文本）
- **斜体**：使用 `<em>` 标签
- **花括号**：代码块（三反引号围栏）内可正常使用；正文、行内代码反引号内禁止裸花括号，必须转义为 `{'{}'}` 或改用文字描述
- **数学公式**：本文不涉及数学公式，不使用 `$...$` 语法（百分比、数字等直接写纯文本）
- **代码块**：标准 Markdown 三反引号围栏 + 语言标识符（yaml / markdown / bash / typescript / python）。不使用行号、高亮行等额外装饰
- **表格**：标准 Markdown 表格语法
- **链接**：标准 Markdown `[文字](URL)` 格式
- **图片/图表**：本文不包含任何视觉元素（无图片、无 Mermaid、无 ASCII 图、无 SVG），`image` frontmatter 字段不设置
- **MDX 组件**：不使用 PaperCard 等自定义组件，纯 Markdown + HTML 标签（仅允许 `<strong>`、`<em>` 两个 HTML 标签）
- **代码高亮**：基于 `rehype-pretty-code` + Dracula 主题，自动生效无需额外配置
- **章节标题**：使用 `##` 二级标题作为章节分隔，`###` 三级标题作为子章节。标题语言为中文 + 英文关键词混合，中英之间使用半角冒号+空格分隔（如 `## 核心设计哲学：Progressive Disclosure`）
- **篇幅计量**：行数按源文件换行符计算，含空行和代码块行。不强制硬换行宽度
- **正文引用格式**：使用 `[N]` 方括号编号内联引用，对应参考资料章节的编号列表（如 "根据官方规范 [6]，SKILL.md 必须包含..."）

### 内容约束

- **必须引用的参考文献**（全部 7 个 URL 已验证可访问，2026-03-04）：
  1. OpenAI Codex Skills: https://developers.openai.com/codex/skills
  2. Claude Code Skills: https://code.claude.com/docs/en/skills
  3. Claude Platform Agent Skills: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
  4. LangChain Multi-Agent Skills: https://docs.langchain.com/oss/python/langchain/multi-agent/skills
  5. Agent Skills 开放标准: https://agentskills.io
  6. Agent Skills 规范: https://agentskills.io/specification
  7. Anthropic 工程博客: https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills
- **额外参考文献**：允许，但每增加一个必须是正文中有实际引用的一手来源
- **参考资料格式**：编号列表，格式为 `[N] [标题](URL) — 一句话说明`
- **"开放标准" 术语**：直接引用 agentskills.io 的自我定位，使用"开放标准"表述，无需加引号或限定词

### 实践章节规范

- **范围**：仅 Claude Code 平台
- **示例 Skill**：创建一个名为 `code-reviewer` 的自定义 Skill，功能为代码审查
- **展示内容**：
  1. 完整的目录结构示例（tree 格式）
  2. 完整的 `SKILL.md` 文件内容（包含 frontmatter + body）
  3. 2-3 条 Claude Code 中使用该 Skill 的命令示例
- **复杂度**：最小可用示例，SKILL.md body 不超过 30 行
- **文件产出**：仅在博客文章内展示代码片段，不在仓库中创建实际 Skill 文件

### 展望章节规范

- **内容类型**：分析 + 开放问题（非预测、非行动清单）
- **必须涵盖的 3 个方向**：
  1. 开放标准对 AI 工具生态碎片化的缓解意义
  2. Skills 作为 Agent 专业化知识的载体 vs 传统 plugin/extension 模式的区别
  3. Agent 自主创建和迭代 Skills 的可能性（meta-skill）

## 研究发现

### 1. Agent Skills 开放标准（核心概念）

Agent Skills 是一种轻量级、开放的格式，用于通过专业化知识和工作流扩展 AI Agent 能力。

- **起源**：由 Anthropic 于 2025 年底首创，随后发布为开放标准
- **采纳规模**：30+ 平台已支持，包括 Claude Code、OpenAI Codex、Cursor、Gemini CLI、GitHub Copilot、VS Code、Junie、Roo Code、Databricks、JetBrains 等
- **核心格式**：一个目录 + 必需的 `SKILL.md` 文件

目录结构：
```
my-skill/
├── SKILL.md          # 必需：指令 + 元数据
├── scripts/          # 可选：可执行代码
├── references/       # 可选：参考文档
└── assets/           # 可选：模板、资源
```

SKILL.md 必须包含 YAML frontmatter：
- `name`（必需）：1-64 字符，仅小写字母、数字和连字符
- `description`（必需）：最多 1024 字符，描述功能和触发条件
- `license`、`compatibility`、`metadata`、`allowed-tools`（可选）

### 2. Progressive Disclosure（渐进式披露）— 核心设计哲学

三层加载机制，有效管理上下文窗口：

| 层级 | 加载时机 | Token 开销 | 内容 |
|------|---------|-----------|------|
| Level 1: Metadata | 启动时（始终加载） | ~100 tokens/Skill | name + description |
| Level 2: Instructions | Skill 被触发时 | < 5000 tokens（建议） | SKILL.md body |
| Level 3: Resources | 按需加载 | 实际无限制 | scripts/、references/、assets/ |

类比：像一本精心组织的入职手册，不会一次把所有内容塞给新员工，而是按需逐步展开。

### 3. Claude 生态中的 Skills 实现

#### 3.1 Claude Code（开发者 CLI 工具）
- **完整实现 + 扩展特性**：
  - 调用控制：`disable-model-invocation` 阻止自动调用，`user-invocable: false` 隐藏用户菜单
  - 子代理执行：`context: fork` 在隔离环境中运行 Skill
  - 动态上下文注入：`` !`command` `` 语法在 Skill 发送给 Claude 前执行 shell 命令
  - Hooks：Skill 生命周期事件绑定
  - 参数传递：`$ARGUMENTS`、`$ARGUMENTS[N]`、`$N` 替换
- **内置 Skills**：
  - `/simplify`：代码质量审查，生成 3 个并行审查 agent
  - `/batch`：大规模并行代码修改，每个单元在独立 git worktree 中运行
  - `/debug`：会话调试
- **存储层级**：Enterprise > Personal (`~/.claude/skills/`) > Project (`.claude/skills/`)
- **权限控制**：通过 permission rules 精细控制 Skill 访问

#### 3.2 Claude Platform（API / claude.ai）
- **预构建 Skills**：PowerPoint (pptx)、Excel (xlsx)、Word (docx)、PDF (pdf)
- **自定义 Skills**：通过 `/v1/skills` API 上传，组织范围内共享
- **执行环境**：VM 虚拟机，具有文件系统访问和代码执行能力
- **API 使用需要 3 个 beta header**：`code-execution-2025-08-25`、`skills-2025-10-02`、`files-api-2025-04-14`
- **跨平台**：Claude.ai（个人使用）、API（工作区共享）、Agent SDK（编程集成）

#### 3.3 Claude Agent SDK
- 文件系统配置，在 `.claude/skills/` 创建 Skill 目录
- `allowed_tools` 配置中包含 `"Skill"` 即可启用
- 自动发现机制

### 4. OpenAI Codex Skills 实现

- **遵循 Agent Skills 开放标准**，目录结构一致
- **发现范围**：REPO (`.agents/skills`)、USER (`$HOME/.agents/skills`)、ADMIN (`/etc/codex/skills`)、SYSTEM（内置）
- **调用方式**：
  - 显式：`/skills` 或 `$` mention
  - 隐式：Codex 根据 description 自动匹配
- **额外配置**：`agents/openai.yaml` 控制 UI 元数据、调用策略和工具依赖
- **配置管理**：`~/.codex/config.toml` 中 `[[skills.config]]` 可禁用 Skill
- **内置 Skills**：`$skill-creator`、`$skill-installer`

### 5. LangChain Skills 实现

- **定位**：多代理架构中的 prompt 驱动专业化
- **实现方式**：Skills 作为 `@tool` 装饰的函数，agent 通过 `load_skill(skill_name)` 调用
- **特点**：
  - 动态工具注册：加载 Skill 可同时注册新工具
  - 层级化 Skills：树状结构实现细粒度专业化
  - 资源链接：按需加载外部资源
- **与开放标准的关系**：理念相通（progressive disclosure），但实现更偏框架层面

### 6. 跨平台对比摘要

| 维度 | Claude Code | Claude Platform | OpenAI Codex | LangChain |
|------|------------|----------------|-------------|-----------|
| 标准兼容 | Agent Skills 开放标准 + 扩展 | 自有实现 + 标准兼容 | Agent Skills 开放标准 | 独立实现 |
| 发现位置 | Enterprise/Personal/Project | API 上传 / VM 文件系统 | REPO/USER/ADMIN/SYSTEM | 代码中注册 |
| 调用方式 | /命令 + 自动识别 | API 指定 skill_id | $mention + 自动匹配 | @tool 函数调用 |
| 子代理支持 | context: fork | VM 代码执行 | 无直接支持 | 多代理架构原生 |
| 预构建 Skills | /simplify, /batch, /debug | PPT/Excel/Word/PDF | skill-creator/installer | 无 |
| 权限控制 | 精细到 Skill 级别 | API beta header | config.toml 配置 | 代码层控制 |
| 网络访问 | 与宿主机一致 | API: 无 / claude.ai: 可配 | 与宿主机一致 | 无限制 |

### 7. 生态发展时间线

- **2025 年底**：Anthropic 在 Claude Code 中首创 Skills 机制
- **数周内**：OpenAI 在 Codex CLI 中采纳相同格式
- **2026 年 1 月**：Google 将标准集成到 Antigravity
- **后续**：Vercel 推出 skills.sh 作为首个 Skills 包管理器和目录
- **截至目前**：30+ 平台支持，形成真正的跨平台开放标准

## 博客文章结构设计

### 最终标题

`Agent Skills：AI 编程助手的能力扩展标准`

### 固定标题清单（实现时必须严格使用以下文本）

```
## 引言：为什么 AI Agent 需要"技能包"
## 什么是 Agent Skills
## 核心设计哲学：Progressive Disclosure
## SKILL.md 规范解析
## Claude 生态中的 Skills
### Claude Code：开发者的 Skills 体验
### Claude Platform：企业级 Agent Skills
### Claude Agent SDK
## 跨平台对比
### OpenAI Codex Skills
### LangChain Skills
### 总结对比表
## 实践：一个 Skill 长什么样
## 展望与思考
## 参考资料
```

### 章节结构（固定，不可调整）

1. **引言：为什么 AI Agent 需要"技能包"**
   - 通用型 Agent 的能力边界（1-2 段）
   - 反复提供相同指令的痛点（1 个具体场景）
   - Skills 如何解决这些问题（1 段概括）

2. **什么是 Agent Skills**
   - 核心概念：一个文件夹 + SKILL.md（代码块展示目录结构）
   - 开放标准的诞生与生态（时间线叙述）
   - 30+ 平台的采纳图景（列举主要平台名称）

3. **核心设计哲学：Progressive Disclosure**
   - 三层加载机制（表格展示）
   - 上下文窗口管理的必要性（1-2 段分析）
   - 入职手册类比（1 段）

4. **SKILL.md 规范解析**
   - 目录结构（代码块：tree 格式）
   - Frontmatter 字段说明（表格：字段名/类型/必需性/说明）
   - Body 内容最佳实践（3-5 条要点）

5. **Claude 生态中的 Skills**（核心章节）
   - 5.1 Claude Code：开发者的 Skills 体验
     - 创建 / 发现 / 调用（各 1 段 + 必要代码片段）
     - 扩展特性：子代理（context: fork）、动态注入（!command）、Hooks（各 1-2 段）
     - 内置 Skills：/simplify, /batch, /debug（各 2-3 句说明）
   - 5.2 Claude Platform：企业级 Agent Skills
     - 预构建 Skills 列举（PPT/Excel/Word/PDF）
     - API 集成方式（1 个代码片段展示 beta header 设置）
     - VM 执行环境说明（1 段）
   - 5.3 Claude Agent SDK
     - 编程方式使用 Skills（1 段 + 配置代码片段）

6. **跨平台对比**
   - OpenAI Codex Skills：与 Claude Code 的异同（2-3 段）
   - LangChain Skills：framework-level vs standard-level 差异（1-2 段）
   - 总结对比表（直接使用研究发现中的 7 维度对比表）

7. **实践：一个 Skill 长什么样**
   - 场景说明：创建 `code-reviewer` Skill（1 段）
   - 目录结构展示（代码块：tree 格式）
   - 完整 SKILL.md 内容（代码块：yaml + markdown）
   - Claude Code 中的使用演示（2-3 条命令示例）

8. **展望与思考**
   - 方向一：开放标准对工具生态碎片化的缓解（1-2 段，引用 30+ 平台采纳数据）
   - 方向二：Skills vs 传统 plugin/extension 模式的本质区别（1 段，聚焦"prompt-native"特性）
   - 方向三：Agent 自主创建 Skills 的可能性（1 段，以开放问题 "When agents can create their own skills, what changes?" 结尾）

9. **参考资料**
   - 编号列表，格式：`[N] [标题](URL) — 一句话说明`
   - 至少包含 7 个必须引用 + 正文中实际引用的额外来源

## 成功判据

1. MDX 文件通过 `pnpm build` 构建验证，零错误零警告
2. 文章在 `/blog` 页面正确显示，4 个标签均可点击跳转至对应 `/tags/[tag]` 页面
3. 所有代码块正确渲染（Dracula 主题高亮，语言标识正确）
4. 所有 7 个必须引用的外部链接正确可访问（已于 2026-03-04 验证）
5. 文章总行数在 2000-3000 行范围内
6. 中英混合风格一致：中文叙述 + 英文术语，首次出现有中英对照
7. 全文无裸花括号、无 `**` 粗体、无未转义 JSX 表达式

## 实施任务

### Task 1: 创建 MDX 博客文件
- 文件：`app/blog/posts/agent-skills.mdx`
- 包含上述固定 frontmatter + 全部 9 个章节内容
- 严格遵循技术约束（`<strong>` 粗体、无裸花括号、标准 Markdown 表格）
- 所有代码块标注正确的语言标识符

### Task 2: 构建验证
- 运行 `pnpm build` 确认无编译错误
- 确认文章在博客列表页正确显示
- 确认文章详情页渲染正常（标题、目录、代码块、表格、链接）
