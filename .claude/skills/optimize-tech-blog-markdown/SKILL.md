---
name: optimize-tech-blog-markdown
description: >
  Convert raw markdown notes, lecture materials, or fragmented technical drafts
  into a well-structured, publication-ready technical blog post.

  The transformation must:

  - Preserve all technical content, formulas, and code blocks exactly.
  - Improve logical structure and section hierarchy.
  - Introduce meaningful headings and subheadings where missing.
  - Clarify complex concepts without oversimplifying them.
  - Eliminate redundancy, incomplete thoughts, and fragmented sentences.
  - Ensure consistent terminology and notation throughout.
  - Improve readability while maintaining technical depth.
  - Avoid adding unsupported claims or fabricating information.
  - Avoid marketing language or exaggerated tone.
  - Maintain a professional, educational writing style.

  When applicable:
  - Add a concise contextual introduction (no fluff).
  - Add a structured summary or key takeaways section.
  - Highlight core insights, design motivations, and trade-offs.
  - Make implicit reasoning explicit.

  The result should read like a carefully edited technical blog post
  written for readers learning deep learning, LLM architectures,
  or AI agent systems.
---

# Markdown Blog Post Optimizer

Transform raw lecture notes / messy markdown into clean, beginner-friendly blog posts.

## Execution Steps

### Step 1: Read & Analyze

Read the target file `$ARGUMENTS`. Identify:

- All referenced images (relative paths)
- Document structure and topic
- Noisy or redundant content (stray translations, filler phrases, informal tone)

### Step 2: Image Audit

Read **every** image referenced in the document using the Read tool (which has OCR capability). Classify each image into one of:

| Category | Criteria | Action |
|----------|----------|--------|
| **KEEP** | Clean diagrams, charts, paper figures, architecture plots with no extraneous UI elements | Keep. Convert `<img>` tags to standard `![alt](path)` syntax. Add descriptive alt text. |
| **REPLACE** | Formulas or equations captured as screenshots | Remove image. Rewrite as LaTeX (`$$...$$` block or `$...$` inline). |
| **REMOVE** | Video screenshots (with presenter's face, player UI, watermarks, hand-drawn annotations on screen captures), dark-theme app screenshots, blurry or low-quality images | Remove image. Extract key textual/visual information via OCR and incorporate into prose, tables, or lists. |

### Step 3: Rewrite Content

Rewrite the entire document following the **Blog Format Specification** below.

**Content principles:**

- **Target audience**: Beginners learning or reviewing the topic
- **Tone**: Clear, structured, educational — not conversational lecture notes
- **Conciseness**: Remove filler, redundancy, and raw transcript artifacts (e.g. "pixel：像素")
- **Accuracy**: Preserve all technical substance. Do not fabricate information.
- **Separation of eras**: When both the original paper's approach and modern best practices exist, clearly distinguish them (e.g. using a comparison table)

### Step 4: Write Output

Overwrite the original file with the optimized version.

## Blog Format Specification

### Frontmatter (YAML)

```yaml
---
title: "文章标题"
date: YYYY-MM-DD
tags: [tag1, tag2]
description: "一句话摘要"
---
```

- `date`: Use today's date from system context
- `tags`: 2-5 relevant technical keywords
- `description`: Under 80 characters

### Document Structure

```
# Title (H1) — exactly one

> Blockquote: 1-2 sentence overview / historical significance

## Section (H2) — major topics
### Subsection (H3) — sub-topics within a section

(body content)

## References (optional)
```

### Formatting Rules

| Element | Rule |
|---------|------|
| **Headings** | H1 = title (one only). H2 = major sections. H3 = subsections. Never skip levels. |
| **Bold** | Use `**text**` for key terms on first introduction. |
| **Code** | Inline \`code\` for variable names, function names. Fenced blocks with language tag for code snippets. |
| **Math** | Inline: `$formula$`. Block: `$$formula$$`. Never use image screenshots for formulas. |
| **Lists** | Use `-` for unordered lists. Use `1.` for ordered steps. |
| **Tables** | Use for comparisons, parameter summaries, or structured data. Keep columns ≤ 5. |
| **Images** | Standard markdown `![descriptive alt text](path)`. No inline HTML `<img>` tags. |
| **Paragraphs** | One idea per paragraph. Blank line between paragraphs. |
| **Chinese punctuation** | Use full-width punctuation in Chinese text（，。：；！？）. |
| **Spacing** | Add a space between Chinese and English/numbers: `使用 ReLU 激活函数`. |

### Section Content Guidelines

- **Introduction** (blockquote): What is this? Why does it matter? When was it published?
- **Architecture / Core Concept**: Explain the structure with kept diagrams. Use bullet points for layer-by-layer or component-by-component breakdowns.
- **Key Innovations**: Each innovation gets its own H3. Explain the problem it solves, how it works, and why it matters.
- **Training Details**: Optimizer, learning rate schedule, regularization — use tables for parameter summaries or strategy comparisons.
- **Results**: Quantitative results with context (e.g. "比第二名低 10 个百分点").
- **Summary / Significance**: 2-3 sentences on historical impact and what came next.

## Quality Checklist

Before writing the final output, verify:

- [ ] Exactly one H1, logical H2/H3 hierarchy
- [ ] Frontmatter includes title, date, tags, description
- [ ] All `<img>` tags converted to `![alt](path)` or removed
- [ ] No video screenshots or informal images remain
- [ ] All formulas use LaTeX, not image screenshots
- [ ] Chinese-English spacing is correct
- [ ] No filler phrases or raw transcript artifacts
- [ ] Technical accuracy preserved
