---
name: generate-code-tutorial
description: >
  Read a theory markdown file (model/algorithm explanation),
  then generate a companion Jupyter notebook (.ipynb) via a
  four-phase pipeline: Research → Plan → Implement → Review.

  Every notebook contains TWO parallel paths in a SINGLE file:
  - Learning path: understand the model by building/running key components
  - Engineering path: use mature toolchains for production-grade implementation

  Path depth and form adapt independently based on feasibility decisions.
  All implementations target free Colab (free T4 GPU available; must also work on CPU as fallback).
  Final notebook includes interview-oriented extension and project expression content.
---

# Code Tutorial Notebook Generator

Read a theory markdown file → Research → Plan → Implement → Review → Output `.ipynb`.

## Input

`$ARGUMENTS` — the **absolute path** to a theory markdown file.

## Output

Same directory as input: `<number>_<ModelName>_代码实战.ipynb`

Examples:
- `03_Transformer.md` → `03_Transformer_代码实战.ipynb`
- `09_Vision Transformer (ViT) 模型原理详解.md` → `09_ViT_代码实战.ipynb`

---

## Phase 1: Research（调研）

### Step 1.1: Read & Extract from Theory File

Read the target markdown file. Extract a structured summary:

```yaml
model_name: "Transformer"
paper: "Attention Is All You Need (Vaswani et al., 2017)"
task_type: "seq2seq_translation"  # classification / generation / contrastive / detection / ...
core_components:
  - name: "Scaled Dot-Product Attention"
    formula: "Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V"
  - name: "Multi-Head Attention"
    formula: "MultiHead(Q,K,V) = Concat(head_1,...,head_h) W^O"
  - name: "Position-wise FFN"
    formula: "FFN(x) = max(0, xW1+b1)W2+b2"
  - name: "Positional Encoding"
    formula: "PE(pos,2i) = sin(pos/10000^{2i/d})"
  # ... all components
training_vs_inference_diff: true  # Does training differ from inference? (e.g. teacher forcing vs autoregressive)
engineering_ecosystem:
  libraries: ["transformers", "torch.nn.Transformer"]  # known industrial libs for this model
  maturity: "mature"  # "mature" | "limited" | "none"
  typical_usage: "inference-only"  # "inference-only" | "fine-tune" | "train"
```

### Step 1.2: Web Search for API & Version Verification

**Mandatory**: Before writing ANY code using non-built-in APIs, search official documentation:

- PyTorch API signatures (`nn.Transformer`, `nn.MultiheadAttention`, etc.)
- `batch_first` conventions and default values
- Dataset download URLs and class signatures
- Version-specific breaking changes

Use `WebSearch` or `mcp__context7__query-docs` for this. Do NOT rely on memorized API knowledge.

### Step 1.3: Choose Dataset

Select the **simplest dataset** that demonstrates the model's core behavior.

Hard constraints:
- **Free Colab compatible**: Must work with Colab free tier (~12GB RAM, free T4 GPU available, no persistent storage)
- **GPU-aware**: Training should leverage GPU when available (`device = 'cuda' if torch.cuda.is_available() else 'cpu'`); must also run on CPU (slower but functional). Target training time: < 5 min on free T4 GPU, < 15 min on CPU.
- **No manual download**: Single URL or `torchvision.datasets` auto-download
- **Small scale**: < 10k samples for training. Reduce if needed.

| Task Type | Dataset | Source | Est. Train Time (CPU) |
|-----------|---------|--------|----------------------|
| Seq2Seq (Translation) | Tatoeba eng-fra 8k pairs | URL download | ~5 min |
| Image Classification | FashionMNIST (subset 5k) | `torchvision.datasets` | ~3 min |
| Image Generation (GAN) | MNIST (subset 5k) | `torchvision.datasets` | ~5 min |
| Contrastive Learning | CIFAR-10 (subset 5k, no labels) | `torchvision.datasets` | ~5 min |
| Self-supervised (MAE) | CIFAR-10 (subset 5k) | `torchvision.datasets` | ~5 min |
| Graph Tasks | Synthetic graph (inline code) | `torch.randn` + adjacency | ~2 min |
| Text Classification | Synthetic or IMDB subset 2k | URL or inline | ~3 min |
| Regression | Synthetic (`torch.randn`) | Inline generation | ~1 min |

**Key principle**: Don't let GPU/data requirements become a barrier to learning. Students should be able to run the notebook immediately after opening it.

### Step 1.4: Two-Layer Feasibility Decision

Based on the model's complexity and the engineering ecosystem, make **two independent decisions**:

#### Decision 1 — Learning Path Depth

What is the **deepest learning artifact that still runs stably**?

| Level | Criterion | Example Models |
|-------|-----------|----------------|
| **L1: Full mini training** | Model trainable from scratch on free Colab (< 5 min GPU / < 15 min CPU) with toy dataset | Transformer (small), ResNet, GAN, VAE, GNN, simple RNN |
| **L2: Key module demo** | Full model too large, but key components runnable in isolation with dummy input | ViT encoder block, BERT self-attention, Swin window attention, GPT-2 causal block |
| **L3: Forward-pass conceptual** | Even individual modules too heavy; illustrate via minimal forward pass on dummy data | Large LLMs, Diffusion UNet, SAM, full CLIP |

**Rule**: Always choose the deepest level that still runs stably. Prefer L1 > L2 > L3.

#### Decision 2 — Engineering Path Form

Does a **mature industrial toolchain** exist for this model?

| Level | Criterion | Example |
|-------|-----------|---------|
| **E1: Mature library** | Full pipeline available (load, train/infer, evaluate) | HuggingFace `transformers`, `torchvision.models`, `diffusers` |
| **E2: Limited tooling** | Partial library support, some manual assembly needed | `torch_geometric` for GNN, partial CLIP wrappers |
| **E3: No industrial lib** | Must use native PyTorch; no high-level library covers this | Novel/niche architectures, custom training loops |

#### Decision 3 — Most Stable Engineering Action

Derived from Decision 2. What is the **most runnable engineering demo**?

| Action | When | Example |
|--------|------|---------|
| **Train / full fine-tune** | E3 or E2 with training support | GNN with PyG, small models with native PyTorch |
| **Partial fine-tune** | E1 with pretrained weights + feasible fine-tuning on free Colab | ViT head replacement, BERT last-layer fine-tune |
| **Inference-only** | E1 with large pretrained model (fine-tuning infeasible even on free T4) | GPT-2 `generate()`, CLIP zero-shot, Diffusion pipeline |

**Rule**: Always choose the most runnable option. Prefer train > fine-tune > inference-only.

#### Decision 4 — Comparison Table Dimensions

Automatically filled during Phase 3 implementation. The notebook must produce a fixed comparison table with these 6 dimensions: educational value, code volume, flexibility, stability, industrial fitness, applicable scenarios.

Record all decisions:

```yaml
learning_path_depth: "L1"      # L1 / L2 / L3
learning_rationale: "2-layer Transformer trainable from scratch on CPU in ~5 min"
engineering_path_form: "E1"    # E1 / E2 / E3
engineering_rationale: "HuggingFace transformers provides full Seq2Seq pipeline"
engineering_action: "inference-only"  # train / fine-tune / inference-only
action_rationale: "Full model too large to fine-tune on CPU; demo via generate()"
```

### Step 1.5: Component Mapping Table (Mandatory)

After decisions, produce a **component mapping table** that will be embedded in the notebook. Every paper component must appear:

```markdown
| 论文组件 | 学习路径覆盖 | 工程库/API 对应 | 状态 |
|---------|-------------|----------------|------|
| Scaled Dot-Product Attention | 完整实现 + shape 标注 | `nn.MultiheadAttention` (内含) | Runnable |
| Multi-Head Attention | 完整实现 | `nn.MultiheadAttention` | Runnable |
| Positional Encoding | 完整实现 | `AutoModel` 内置 | Runnable |
| Teacher Forcing / Autoregressive | 训练 vs 推理显式分离 | `model.generate()` | Illustrative |
| KV-Cache | 手写状态管理 | `use_cache=True` | Explain-only |
```

Status values:
- **Runnable**: Code cell that executes and produces verifiable output
- **Illustrative**: Code cell that runs on dummy/small data for demonstration
- **Explain-only**: Markdown explanation only, no executable code

---

## Phase 2: Plan（规划）

Based on Phase 1 results, draft the full notebook outline before writing any code.

### Step 2.1: Outline the Notebook

Produce a cell-by-cell plan following the **unified 8-section structure**:

```
── Setup ──
Cell 01 [code]    : Environment setup (pip install)
Cell 02 [code]    : Imports + device setup + seed
Cell 03 [markdown] : Title + dual-path overview table

── Section i: Paper & Task Background (2-3 cells) ──
Cell 04 [markdown] : Paper citation, task definition, why this task
Cell 05 [markdown] : Architecture family overview (optional)

── Section ii: Minimal Necessary Theory (2-4 cells) ──
Cell 06 [markdown] : Key formulas and concepts (reference companion .md for full theory)
Cell 07 [markdown] : Component mapping table (from Step 1.5)

── Section 1: Data Preparation (3-5 cells) ──
Cell 08 [markdown] : Data intro
Cell 09 [code]    : Download / load dataset
Cell 10 [code]    : Preprocess / DataLoader
Cell 11 [code]    : Verify batch shape

── Section 2: Shared Components (3-5 cells) ──
Cell 12 [code]    : Hyperparameters (centralized)
Cell 13 [code]    : Shared utilities (training loop, evaluation, metrics)

── Section iii: Learning Implementation (variable depth per D1) ──
Cell 14+ [markdown+code] : Component-by-component build (see depth-specific spec)

── Section iv: Engineering Implementation (variable form per D2/D3) ──
Cell N+ [markdown+code] : Library-based implementation (see form-specific spec)

── Section v: Learning vs Engineering Comparison (1-2 cells, MANDATORY) ──
Cell M  [markdown] : 6-dimension comparison table
Cell M+1 [code]   : Side-by-side output comparison (if both paths produce results)

── Section vi: Training vs Inference Differences (if applicable, 1-3 cells) ──
Cell T  [markdown] : Difference table (both paths)
Cell T+1 [code]   : Inference demo (if not already shown)

── Section vii: Results & Boundaries (2-3 cells) ──
Cell R  [code]    : Loss curves / metrics / inference examples
Cell R+1 [markdown] : Boundaries of each path

── Section viii: Interview / Project Expression (2-3 cells) ──
Cell I  [markdown] : 高频面试题 (5-10 Q&A)
Cell I+1 [markdown] : 面试速答提纲
Cell I+2 [markdown] : 项目表达 + 进阶探索方向

── Appendix ──
Cell A  [code]    : (optional) Visualizations (attention heatmap, feature map, etc.)
```

### Step 2.2: Identify Training vs Inference Differences

If `training_vs_inference_diff == true`, explicitly plan:

| Phase | Behavior | Code Location |
|-------|----------|---------------|
| **Training** | Teacher forcing, full-sequence input, mask construction | Learning path `train_model()` |
| **Inference** | Autoregressive / greedy / beam search, KV-cache (if applicable) | Learning path `predict()`, Engineering path `model.generate()` |

The notebook must contain **separate, clearly labeled code cells** for training and inference logic.
Add a markdown cell before each to explain the difference.
Show how **both paths** handle the training/inference distinction.

### Step 2.3: Plan the Interview & Project Expression Section

Search for interview-relevant content about this model/algorithm:

- Common interview questions (e.g. "Why does Transformer use Layer Norm instead of Batch Norm?")
- Typical follow-up questions and edge cases
- Comparison with related models that interviewers often ask about
- Key concepts that are frequently tested
- Engineering-oriented questions (e.g. "What is `use_cache`?", "Why batch inference?")

Use `WebSearch` with queries like:
- `"<model_name> 面试题"` or `"<model_name> interview questions deep learning"`
- `"<model_name> 常见问题"` or `"<model_name> FAQ"`

Also plan the **project expression** content: how to frame this model in a project interview context.

---

## Phase 3: Implement（实现）

### Step 3.1: Write Notebook Cells

Use `NotebookEdit` with `edit_mode=insert` to build the notebook cell by cell, following the plan from Phase 2.

### Notebook Structure Specification

#### Cell 0: Environment Setup (code) — MANDATORY

**This cell is REQUIRED as the very first code cell in every notebook.** It must:
1. List **all** third-party packages the notebook needs (torch, torchvision, transformers, torch_geometric, etc.)
2. Provide both Colab (commented `!pip install`) and local Jupyter (`subprocess`) install paths
3. Be placed **before** any `import` statement so the notebook runs top-to-bottom on a fresh environment

Adapt the package list below to match the notebook's actual dependencies:

```python
# ============================================================
#  环境配置
#  - Colab 用户：取消注释下方 Colab 区块
#  - 本地 Jupyter 用户：直接运行 Local 区块
# ============================================================

# ── Colab 环境（取消注释后运行） ──
# !pip install torch torchvision -q
# !pip install matplotlib numpy -q

# ── 本地 Jupyter 环境 ──
import subprocess, sys
def _install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", pkg, "-q"])

_install("torch")
_install("torchvision")
_install("matplotlib")
_install("numpy")
```

#### Cell 1: Imports + Setup (code)

```python
import math, collections, os, re
import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
import matplotlib.pyplot as plt
import numpy as np

torch.manual_seed(42)
np.random.seed(42)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f'Using device: {device}')
```

#### Cell 2: Title & Overview (markdown)

Use the **unified dual-path template**:

```markdown
# <Model Name> 代码实战：学习实现 vs 工程实现

基于论文 *<Paper Title>* (<Authors>, <Year>)，
用 **<task>** 任务演示 <Model> 的核心架构。

本 Notebook 包含两条并行路径，使用 **相同的任务和数据**：

| | 学习路径 (Learning) | 工程路径 (Engineering) |
|---|---|---|
| 目标 | 理解模型内部机制 | 掌握工业级使用方式 |
| 实现方式 | <L-level description> | <E-level description> |
| 代码量 | ~N 行 | ~M 行 |
| 适合场景 | 面试准备、原理深入 | 工程落地、快速验证 |

> 两条路径不是两套无关的代码，而是同一套 <Model> 思想在不同抽象层级上的表达。
```

#### Section i: Paper & Task Background (2-3 cells)

- `[markdown]` Paper citation, task definition, why this specific task demonstrates the model's core behavior
- `[markdown]` (optional) Architecture family overview — where this model sits in its lineage (e.g. RNN → Attention → Transformer → BERT/GPT)
- `[markdown]` Scope: what this notebook covers vs what it does not

#### Section ii: Minimal Necessary Theory (2-4 cells)

- `[markdown]` Only the formulas and concepts needed to understand the code that follows. This is NOT a full theory recap — reference the companion `.md` for that.
- `[markdown]` **Component mapping table** from Step 1.5 (mandatory). This table anchors both paths and lets readers see the full picture before diving into code.

#### Section 1: Data Preparation (3-5 cells)

Pattern: `markdown intro` → `code: download/load` → `code: preprocess/DataLoader` → `code: verify shape & sample`

#### Section 2: Shared Components (3-5 cells)

```python
# ── 超参数（两条路径共用，集中管理） ──
D_MODEL    = 32     # 模型维度（论文 512，此处缩小以适配 CPU）
NUM_HEADS  = 4      # 注意力头数
NUM_LAYERS = 2      # 编码器/解码器层数
D_FF       = 64     # FFN 隐藏维度
DROPOUT    = 0.1
LR         = 5e-3
NUM_EPOCHS = 50     # CPU 友好
BATCH_SIZE = 64
```

Then: shared utilities (PositionalEncoding, training loop, evaluation, metrics, comparison helpers).

#### Section iii: Learning Implementation (depth-dependent)

The content varies by learning path depth (Decision 1):

---

##### L1: Full Mini Training

**This is the core learning section**. For each component from the theory file:

1. **markdown cell** (required for each component):
   - Component name and role
   - Mathematical formula in LaTeX ($$...$$)
   - Brief derivation or intuitive explanation of WHY this formula works
   - Input/output tensor shapes

2. **code cell**:
   - Full hand-written implementation
   - Shape annotations at every transformation: `# (batch, seq, d_model) → (batch, seq, d_ff)`
   - Inline comments explaining non-obvious choices

3. **If training ≠ inference for this component**:
   - Add a **markdown cell** explicitly titled `### 训练 vs 推理的区别`
   - Explain the difference (e.g., teacher forcing vs autoregressive, dropout on/off, mask construction)
   - Show both code paths clearly

Component order: follow the model's **data flow** (input → embedding → encoder → decoder → output).

Final cells:
- `[code]` Assemble all components into complete model class
- `[markdown]` Training section intro
- `[code]` Train (call shared training function)
- `[markdown]` Inference section intro (if different from training)
- `[code]` Inference / predict function
- `[code]` Evaluate + plot results

---

##### L2: Key Module Demo

For each **key component** from the theory file:

1. **markdown cell**:
   - Component name, role, formula, shapes (same as L1)

2. **code cell**:
   - Implement the component in isolation
   - Shape annotations at every transformation

3. **code cell** (verification):
   - Feed dummy input (`torch.randn(...)`)
   - Print output shape, verify correctness
   - Optionally visualize intermediate representations

4. **markdown cell**:
   - "What this component does in the full model"
   - Connection to adjacent components

Component order: follow data flow.

Final cells:
- `[markdown]` Summary: how components connect into the full architecture
- `[code]` (optional) Assemble minimal model for illustration, or show pretrained model structure via `print(model)`

Do NOT assemble into a full trainable model unless it can run on CPU.

---

##### L3: Forward-Pass Conceptual Demo

- `[markdown]` Model architecture overview with component roles
- `[code]` Load or construct a minimal version of the model (smallest available pretrained or hand-built skeleton)
- `[code]` Run forward pass on dummy data, inspect intermediate representations
- `[code]` Visualize key internal states (attention weights, feature maps, etc.)
- `[markdown]` Shape trace: walk through dimension changes at each stage

Focus on **visualization and shape tracing** rather than training. The goal is to demystify the model's internal data flow.

---

#### Section iv: Engineering Implementation (form-dependent)

The content varies by engineering path form (Decision 2 + Decision 3):

---

##### E1 + Inference-Only

Follow the pattern proven in `03_Transformer_工程实践.ipynb`:

1. `[markdown]` Engineering path intro: why use a pretrained model, what library, model selection rationale
2. `[code]` Load pretrained model and tokenizer/processor
3. `[code]` Minimal runnable example (single input → output)
4. `[markdown]` **Black-box teardown**: What does the high-level API actually do internally?
   - Example: `model.generate()` → encode → autoregressive loop → token selection → stop condition
   - Map each step back to learning path components
5. `[markdown]` **Component correspondence table**:

```markdown
| 学习路径实现 | 工程库内部对应 | 说明 |
|---|---|---|
| `MultiHeadAttention` (手写) | `model.encoder.layer[i].attention` | 相同计算，更高抽象 |
| `predict()` 自回归循环 | `model.generate()` | 手写版 = 最小 generate() |
| 手动 KV-cache 管理 | `use_cache=True` | 同一工程思想，不同抽象层级 |
```

6. `[code]` Demonstrate decoding strategies (greedy / beam / sampling) if applicable
7. `[markdown]` Batch inference intro: padding, truncation, attention_mask
8. `[code]` Batch inference function + demo
9. `[markdown]` **Trade-off table** (parameter / speed / memory / effect):

```markdown
| 因素 | 增大时 | 吞吐量 | 内存 | 速度 | 效果 |
|------|--------|--------|------|------|------|
| batch_size | ↑ | ↑ | ↑↑ | ↑ (per example) | ~ |
| sequence_length | ↑ | ↓ | ↑↑ (quadratic) | ↓↓ | potentially ↑ |
| num_beams | ↑ | ↓ | ↑ | ↓↓ | ↑ |
| use_cache | True | — | ↑ | ↑↑ | ~ |
| device | CPU→GPU | ↑↑ | (GPU-bound) | ↑↑↑ | ~ |
```

---

##### E1 + Fine-Tune

1. `[markdown]` Fine-tuning strategy: which layers frozen, which trainable, why
2. `[code]` Load pretrained model (e.g. `torchvision.models.vit_b_16(weights='DEFAULT')`, `AutoModel.from_pretrained(...)`)
3. `[code]` Modify head / classifier for downstream task
4. `[code]` Freeze backbone (if applicable), set up optimizer for trainable params only
5. `[markdown]` Parameter efficiency: show trainable vs total parameter count
6. `[code]` Train on downstream dataset (reuse shared training function)
7. `[code]` Evaluate + plot results
8. `[markdown]` **Component correspondence table** (same format as E1+Inference, mapping learning components to pretrained model internals)

---

##### E2 or E3: Limited / No Industrial Library

Use mid-level PyTorch APIs (`nn.Transformer`, `nn.TransformerEncoder`, `nn.Sequential`, `nn.ModuleList`) to build a concise implementation.

1. `[markdown]` Component correspondence table:

```markdown
| 学习路径（手写） | 工程路径 (nn.XXX) | 说明 |
|---|---|---|
| `MultiHeadAttention` | `nn.MultiheadAttention` | API 封装 |
| `EncoderBlock` | `nn.TransformerEncoderLayer` | 含残差 + LayerNorm |
| ... | ... | ... |
```

2. `[code]` Complete model in one class (~30-50 lines)
3. `[code]` Train (reuse shared function)
4. `[code]` Evaluate + plot results
5. `[markdown]` Key differences from learning path (abstraction gains, what's hidden)

---

#### Section v: Learning vs Engineering Comparison (MANDATORY, 1-2 cells)

This section is **required in every notebook**. Must contain all 6 dimensions:

```markdown
## 学习路径 vs 工程路径对比

| 对比维度 | 学习路径 | 工程路径 |
|---------|---------|---------|
| 教育价值 | <reason: e.g. 理解每个组件的计算细节> | <reason: e.g. 理解工业级 API 的设计思路> |
| 代码量 | ~N 行 | ~M 行 |
| 灵活性 | <e.g. 可修改任意组件> | <e.g. 受限于库 API 接口> |
| 稳定性 | <e.g. 手写代码可能有 edge case> | <e.g. 经过大规模验证> |
| 工业适配度 | <e.g. 适合研究原型> | <e.g. 可直接部署> |
| 适用场景 | <bulleted list> | <bulleted list> |
```

If both paths produce comparable outputs, add a code cell with side-by-side comparison (loss curves, metrics, inference examples).

#### Section vi: Training vs Inference Differences (if applicable, 1-3 cells)

If `training_vs_inference_diff == true`:

- `[markdown]` Difference table showing how **both paths** handle training vs inference:

```markdown
| 阶段 | 学习路径行为 | 工程路径行为 |
|------|------------|------------|
| 训练 | Teacher forcing, 手写 mask | `model.train()`, 库自动处理 |
| 推理 | `predict()` 自回归循环 | `model.generate(num_beams=...)` |
```

- `[code]` Inference demo (if not already shown in Sections iii/iv)
- `[markdown]` Key insight: "The same fundamental algorithm, at different abstraction levels"

#### Section vii: Results & Boundaries (2-3 cells)

- `[code]` Side-by-side loss curves / metrics / inference examples (where both paths produce comparable outputs)
- `[markdown]` Boundaries of each path:
  - Learning path: "What you gain (deep understanding, full control) and what you lose (stability, scalability, engineering efficiency)"
  - Engineering path: "What you gain (speed, stability, production readiness) and what you lose (transparency, fine-grained control)"
- `[markdown]` When to use which path in practice

**Plot language rule**: All `plt.xlabel()`, `plt.ylabel()`, `plt.title()`, `plt.legend()`, and `plt.annotate()` must use **English text only** (avoids matplotlib CJK font issues).

#### Appendix A: Visualizations (optional, 2-3 cells)

- Attention weight heatmap
- Feature map / embedding visualization
- Positional encoding pattern
- Dimension sanity check

**All figure text (titles, axis labels, legends, annotations) must be English.**

#### Appendix B: Interview / Project Expression（面试与项目表达）(2-3 cells)

**This section is mandatory**. Content sourced from Phase 2.3 web search results.

Format:

```markdown
## 面试与项目表达

### 高频面试题

**Q1: <question>?**

<Concise, structured answer with key points bulleted>

**Q2: <question>?**

<Answer>

...

### 面试速答提纲

| # | 问题 | 一句话回答 |
|---|------|-----------|
| 1 | <e.g. generate() 本质在做什么？> | <e.g. encoder-decoder 自回归推理循环> |
| 2 | <e.g. 为什么翻译常用 beam search？> | <e.g. 翻译重稳定性和可重复性> |
| 3 | <e.g. use_cache 的作用？> | <e.g. 缓存历史 KV 避免重复计算> |
| 4 | ... | ... |
| 5 | ... | ... |

### 项目表达

> 如果面试官问"你做过什么相关项目"，可以这样组织回答：

- **学习深度**：从零实现了 <Model> 的 <key components>，理解了 <core insight>
- **工程能力**：使用 <library> 完成了 <task>，掌握了 <engineering skill>
- **对比思考**：能说清楚手写实现与工业库的差异，以及各自适用场景

### 延伸阅读与对比

| 对比维度 | <Model A> | <Model B> | <Model C> |
|---------|-----------|-----------|-----------|
| 核心思想 | ... | ... | ... |
| 复杂度   | ... | ... | ... |
| 适用场景 | ... | ... | ... |

### 进阶探索方向

- <direction 1>: <brief description>
- <direction 2>: <brief description>
```

Target: 5-10 high-frequency interview questions covering:
- "Why" questions (design motivation)
- "How" questions (mechanism details)
- "Compare" questions (vs related models)
- "What if" questions (edge cases, failure modes)
- Complexity analysis questions
- **Engineering questions** (e.g. "What is `use_cache`?", "Why batch inference?", "How to choose decoding strategy?")

---

## Phase 4: Review（审查）

### Step 4.1: Self-Review Checklist

Before finalizing, verify every item:

- [ ] **Runs top-to-bottom**: No undefined variables, correct cell execution order, no circular dependencies
- [ ] **Colab free-tier**: Training < 5 min on free T4 GPU / < 15 min on CPU, RAM < 12GB; notebook must run on both GPU and CPU (device-agnostic)
- [ ] **Environment setup cell**: Cell 0 is a code cell that installs ALL required packages (both Colab `!pip` commented + local `subprocess` active). It must list every third-party dependency the notebook uses — missing packages will cause ImportError on fresh environments
- [ ] **Dual-path completeness**: Both learning and engineering paths are present and clearly labeled
- [ ] **Component mapping table**: Present in Section ii, covers all paper components with status (Runnable/Illustrative/Explain-only)
- [ ] **Path depth consistency**: Learning path depth matches D1 decision throughout (L1/L2/L3)
- [ ] **Path form consistency**: Engineering path form matches D2/D3 decisions throughout (E1/E2/E3 + action)
- [ ] **Comparison table**: Section v contains all 6 dimensions (educational value, code volume, flexibility, stability, industrial fitness, applicable scenarios)
- [ ] **Cross-references**: Engineering section references corresponding learning components (and vice versa)
- [ ] **Formula coverage**: Every formula in the theory md has a corresponding code implementation or explanation
- [ ] **Shape annotations**: Tensor shapes annotated at all key transformation points
- [ ] **Training ≠ Inference**: Clearly separated if applicable, with explanatory markdown showing both paths' handling
- [ ] **Interview section**: ≥ 5 interview questions with structured answers + 面试速答提纲 + 项目表达
- [ ] **No fabrication**: Only implements what the theory file describes
- [ ] **Loss curve**: Plotted after training (where training occurs)
- [ ] **Plot language**: All matplotlib text (titles, labels, legends) is English only
- [ ] **Results & Boundaries**: Section vii summarizes findings, trade-offs, and path boundaries
- [ ] **Device-agnostic**: All tensors and models use `.to(device)`, notebook runs on both GPU and CPU without code changes

### Step 4.2: Codex MCP Code Review (mandatory)

After writing the complete notebook, invoke `mcp__codex__codex` to review the generated code:

```
Prompt: "Review this Jupyter notebook for correctness. Check:
1. Will all cells run top-to-bottom without errors?
2. Are tensor shapes consistent across all operations?
3. Are there any undefined variables or import issues?
4. Is the training loop correct (loss computation, backward, optimizer step)?
5. Are masks constructed correctly (padding mask, causal mask)?
6. Does the inference logic match the training logic appropriately?
7. Do both learning and engineering paths use consistent data and produce comparable outputs?
Report any bugs or issues found."

cd: <notebook_directory>
sandbox: read-only
```

If Codex reports issues, fix them before finalizing.

---

## Code Style Rules

| Rule | Detail |
|------|--------|
| **Framework** | PyTorch primary. Minimize external deps. |
| **Language** | Variable names: English. Comments: Chinese + English. Markdown cells: Chinese. **Plots (title / axis / legend / annotation): English only.** |
| **Shape comments** | `# (batch, seq, d_model)` at every key point |
| **Hyperparameters** | Centralized, UPPERCASE, Colab-free-tier-friendly values |
| **Device** | `device = torch.device(...)`. All tensors `.to(device)`. |
| **Seed** | `torch.manual_seed(42)` + `np.random.seed(42)` |
| **Training output** | Print loss every N epochs + plot loss curve |
| **Interface** | Implementations share `forward(...)` signature where applicable |
| **Derivations** | Include brief formula derivation in markdown before code |

## Implementation Reference: Model Family → Recommended Paths

| Model Family | Learning Path (D1) | Engineering Path (D2+D3) | Notes |
|---|---|---|---|
| Transformer (small) | L1: Full mini training | E1+inference: HF `generate()` | Reference: `03_Transformer` notebooks |
| ResNet / CNN | L1: Full mini training | E1+fine-tune: `torchvision.models` | |
| GAN | L1: Full mini training | E3+train: native PyTorch `nn.Sequential` | No mature GAN library |
| VAE | L1: Full mini training | E3+train: native PyTorch | |
| GNN | L1: Full mini training | E2+train: `torch_geometric.nn.GCNConv` | |
| ViT | L1: Full mini training | E1+fine-tune: `torchvision.models.vit_b_16` | |
| BERT | L1: Full mini training (toy pretrain) | E1+fine-tune: `transformers.AutoModel` | |
| GPT-2 / LLMs | L2: Key module demo | E1+inference: `transformers.pipeline` | |
| Diffusion | L2: Key module demo (UNet forward) | E1+inference: `diffusers.StableDiffusionPipeline` | |
| CLIP | L2: Key module demo | E1+inference: `transformers.CLIPModel` | |
| SAM | L3: Forward-pass conceptual | E1+inference: `segment_anything` | |
| Swin Transformer | L2: Key module demo (window attention) | E1+fine-tune: `torchvision.models.swin_t` | |
| Contrastive (MoCo/SimCLR) | L1: Full mini training | E3+train: native PyTorch | |
| MAE | L1: Full mini training | E1+fine-tune: `torchvision.models` encoder | |
| MobileNet | L1: Full mini training | E1+fine-tune: `torchvision.models.mobilenet_v2` | |
| Whisper | L3: Forward-pass conceptual | E1+inference: `transformers.pipeline('asr')` | |
