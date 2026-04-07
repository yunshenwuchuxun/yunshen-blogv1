import type { Project } from './types';

export const projects: Project[] = [
	{
		title: 'Smart Drawio',
		src: 'smart-drawio.png',
		color: '#dbeafe',
		slug: 'smart-drawio',
		role: 'Full Stack Developer',
		summary: 'AI 驱动的 Draw.io 图表生成器，用自然语言创建专业图表',
	},
	{
		title: 'Dynamical System Analyzer',
		src: 'dynamical-system.png',
		color: '#e0e7ff',
		slug: 'dynamical-system-analyzer',
		role: 'Full Stack Developer',
		summary: '智能动力学系统分析平台，可视化相图、混沌吸引子与分岔图',
	},
	{
		title: 'Yun Shen Blog',
		src: 'yunshen-blog.png',
		color: '#f3e8ff',
		slug: 'yunshen-blog',
		role: 'Full Stack Developer',
		summary: '基于 Next.js 16 的个人博客，支持 MDX、主题切换与流畅动画',
	},
	{
		title: 'latex-paper-skills',
		src: 'latex-paper-skills-review.png',
		color: '#dcfce7',
		slug: 'latex-paper-skills',
		role: 'AI Research Tooling Developer',
		summary:
			'面向 ML/AI 论文写作的模块化 LaTeX 技能框架，覆盖选题、写作、审计与编译全流程',
	},
	{
		title: 'Aphex Planner',
		src: 'planner-app.webp',
		color: '#dbeafe',
		url: 'https://aphex.co/planner',
		role: 'Frontend Developer',
	},
	{
		title: 'Aphex Field',
		src: 'field-app.webp',
		color: '#dbeafe',
		url: 'https://aphex.co/field',
		role: 'Frontend Developer',
	},
	{
		title: 'Aphex Publication',
		src: 'publication-app.webp',
		color: '#dbeafe',
		url: 'https://aphex.co/publication',
		role: 'Frontend Developer',
	},
	{
		title: 'Spoken',
		src: 'spoken.webp',
		color: '#dbeafe',
		url: 'https://spoken.io',
		role: 'Full Stack Developer',
	},
	{
		title: 'Topography Health',
		src: 'topo.webp',
		color: '#fef3c7',
		url: 'https://topographyhealth.com',
		role: 'Full Stack Developer',
	},
	{
		title: 'SRI Big Data',
		src: 'bigdata.webp',
		color: '#fef3c7',
		url: 'https://sribigdata.com',
		role: 'Data Engineer',
	},
	{
		title: 'Mathgame',
		src: 'mathgame.png',
		color: '#dbeafe',
		url: 'https://mathgame.io',
		role: 'Full Stack Developer',
	},
	{
		title: 'Snakegame',
		src: 'snakegame.png',
		color: '#c6f6d5',
		url: 'https://snakegame.io',
		role: 'Full Stack Developer',
	},
];

export interface ProjectDetail {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	overviewSections?: {
		title: string;
		body: string;
		image?: string;
		imageAlt?: string;
	}[];
	features: { title: string; description: string }[];
	techStack: { category: string; items: string[] }[];
	links: { label: string; url: string }[];
	usage: string[];
	targetUsers: string[];
	license: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
	'smart-drawio': {
		slug: 'smart-drawio',
		title: 'Smart Drawio Next',
		subtitle: '用自然语言或参考图片，几秒钟生成可编辑的专业科研 Draw.io 图表',
		description: `Smart Drawio Next 将 Next.js 16、Draw.io embed 以及流式大模型调用组合在一起，打造了一款革命性的图表生成工具。它能够理解你的自然语言描述或参考图片，自动生成结构化的专业图表，并且支持在线编辑和持续优化。

无论是科研论文中的架构图、产品设计的流程图，还是技术文档的系统架构，都可以通过简单的描述快速生成。项目已经内置了多模型配置、访问密码、历史记录、通知系统等配套功能，可以直接部署为个人效率工具或团队内部服务。`,
		features: [
			{
				title: 'LLM 原生绘图体验',
				description:
					'流式显示生成进度，支持"继续生成"拆分长内容；可手动指定 20+ 图表类型或让模型自动选择',
			},
			{
				title: '多模态输入',
				description:
					'支持拖拽 PNG/JPG/WebP/GIF（≤5 MB）或使用文件选择，配合 Vision 模型将已有图纸转成可编辑信息',
			},
			{
				title: '双画布联动',
				description:
					'Monaco 编辑器负责查看/修改原始代码，Draw.io iframe 负责渲染与微调；支持随时重新应用代码',
			},
			{
				title: '智能优化链路',
				description:
					'一键修复箭头锚点、线条宽度等常见问题，或通过高级优化面板勾选/自定义需求交给 AI 再处理',
			},
			{
				title: '配置管理器',
				description:
					'UI 里即可创建、复制、导入/导出任意数量的 OpenAI/Anthropic 兼容配置，支持在线测试模型列表',
			},
			{
				title: '历史记录 & 通知',
				description:
					'最近 20 条生成记录保存在浏览器 localStorage，可随时回放；通知、确认弹窗等提升整体 UX',
			},
		],
		techStack: [
			{ category: '前端框架', items: ['Next.js 16 (App Router)', 'React 19'] },
			{ category: '画布渲染', items: ['Draw.io Embed'] },
			{ category: '代码编辑器', items: ['@monaco-editor/react'] },
			{ category: '样式方案', items: ['Tailwind CSS v4', '自定义设计系统'] },
			{
				category: 'LLM 接入',
				items: [
					'OpenAI / Anthropic 兼容接口',
					'Server Actions',
					'Edge API 路由',
				],
			},
			{
				category: '状态持久化',
				items: ['localStorage（配置、历史、访问密码）'],
			},
		],
		links: [
			{ label: '在线体验', url: 'https://smart-drawio-next.vercel.app/' },
			{
				label: 'GitHub',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next',
			},
		],
		usage: [
			'克隆仓库：git clone https://github.com/yunshenwuchuxun/smart-drawio-next.git',
			'安装依赖：pnpm install',
			'启动开发服务器：pnpm dev',
			'访问 http://localhost:3000 即可体验',
		],
		targetUsers: [
			'科研工作者 - 快速生成论文中的架构图、流程图',
			'产品经理 - 绘制产品流程图、用户旅程图',
			'开发人员 - 创建系统架构图、技术文档图表',
			'教育工作者 - 制作教学演示图表',
			'任何需要快速生成专业图表的用户',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'dynamical-system-analyzer': {
		slug: 'dynamical-system-analyzer',
		title: '智能动力学系统分析器',
		subtitle: '交互式 2D/3D 动力学系统分析与可视化平台',
		description: `智能动力学系统分析器是一款基于 Flask 的 Web 应用，专注于线性与非线性动力学系统的分析与可视化。平台支持相图生成、轨迹动画、混沌分析以及离散系统应用的全面研究。

借助自然语言转矩阵的智能功能，用户可以用直观的方式描述系统，平台自动解析并生成专业的数学分析结果。无论是学习动力学系统理论，还是进行科研工作中的系统仿真，都能获得流畅的交互体验。`,
		features: [
			{
				title: '2D 线性系统分析',
				description:
					'自动计算特征值、特征向量，生成相图并分类平衡点类型（稳定/不稳定节点、鞍点、焦点等）',
			},
			{
				title: '非线性系统分析',
				description:
					'平衡点检测、雅可比矩阵线性化、局部稳定性分析，支持自定义向量场表达式',
			},
			{
				title: '3D 混沌吸引子',
				description:
					'内置 Lorenz、Rössler、Chua、Thomas 等经典混沌系统，支持 Poincaré 截面与分形维数计算',
			},
			{
				title: '离散系统工具',
				description:
					'分岔图绘制、蛛网图分析，内置 Ricker 种群模型、离散 SIR 传染病模型、经济蛛网模型等',
			},
			{
				title: '自然语言输入',
				description:
					'智能解析自然语言描述，自动转换为系统矩阵或微分方程，降低使用门槛',
			},
			{
				title: '实时轨迹动画',
				description: '基于 Canvas 的实时轨迹绘制，支持交互式参数调节和动态演示',
			},
		],
		techStack: [
			{ category: '后端框架', items: ['Flask 3.0', 'Gunicorn'] },
			{
				category: '科学计算',
				items: ['NumPy', 'SciPy', 'SymPy', 'Matplotlib'],
			},
			{ category: '前端渲染', items: ['Chart.js', 'Three.js / Plotly'] },
			{ category: '设计风格', items: ['Neobrutalism 设计系统', 'Vanilla JS'] },
		],
		links: [
			{
				label: '在线体验',
				url: 'https://dynamical-system-analyzer.onrender.com/',
			},
			{
				label: 'GitHub',
				url: 'https://github.com/yunshenwuchuxun/dynamical-system-analyzer',
			},
		],
		usage: [
			'克隆仓库：git clone https://github.com/yunshenwuchuxun/dynamical-system-analyzer.git',
			'安装依赖：pip install -r requirements.txt',
			'启动服务器：python app.py',
			'访问 http://localhost:5000 即可体验',
		],
		targetUsers: [
			'数学/物理专业学生 - 学习动力学系统与混沌理论',
			'科研工作者 - 系统仿真与相空间分析',
			'工程师 - 控制系统稳定性分析',
			'教育工作者 - 动力学课程可视化教学',
			'对混沌理论感兴趣的爱好者',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'yunshen-blog': {
		slug: 'yunshen-blog',
		title: 'Yun Shen Blog',
		subtitle: '基于 Next.js 16 与 React 19 构建的现代个人博客平台',
		description: `Yun Shen Blog 是一款精心打造的个人博客平台，采用 Next.js 16 App Router 与 React 19 构建，结合 Tailwind CSS v4 实现响应式设计。博客以 MDX 作为内容格式，支持丰富的代码高亮与自定义组件渲染。

平台集成了 Lenis 平滑滚动、GSAP 与 Motion 动画库，配合 View Transition API 实现的主题切换，带来流畅的浏览体验。部署于 Vercel，内置 Analytics 与 Speed Insights，兼顾性能与用户体验。`,
		features: [
			{
				title: 'MDX 博客系统',
				description:
					'基于 MDX 的内容管理，支持 rehype-pretty-code 语法高亮、自定义组件与 frontmatter 元数据',
			},
			{
				title: '流畅动画体验',
				description:
					'集成 Lenis 平滑滚动、GSAP 复杂动画与 Motion 声明式动效，交互自然流畅',
			},
			{
				title: '主题切换',
				description:
					'深色/浅色模式切换，基于 View Transition API 实现丝滑过渡效果',
			},
			{
				title: '响应式设计',
				description:
					'Tailwind CSS v4 驱动的自适应布局，在桌面端与移动端均有良好表现',
			},
			{
				title: '性能优化',
				description:
					'Turbopack 开发构建、React Compiler 编译优化、Vercel Edge 部署',
			},
			{
				title: 'SEO 友好',
				description:
					'自动生成元数据、静态路由预生成、结构化内容组织，搜索引擎友好',
			},
		],
		techStack: [
			{ category: '框架', items: ['Next.js 16 (App Router)', 'React 19'] },
			{ category: '样式', items: ['Tailwind CSS v4', 'Biome 格式化'] },
			{
				category: '内容',
				items: ['MDX', 'next-mdx-remote', 'rehype-pretty-code'],
			},
			{ category: '动画', items: ['GSAP', 'Motion', 'Lenis'] },
			{
				category: '部署',
				items: ['Vercel', 'Vercel Analytics', 'Speed Insights'],
			},
		],
		links: [
			{ label: '在线访问', url: 'https://uestc.de5.net/' },
			{
				label: 'GitHub',
				url: 'https://github.com/yunshenwuchuxun/yunshen-blogv1',
			},
		],
		usage: [
			'克隆仓库：git clone https://github.com/yunshenwuchuxun/yunshen-blogv1.git',
			'安装依赖：pnpm install',
			'启动开发服务器：pnpm dev',
			'访问 http://localhost:3000 即可体验',
		],
		targetUsers: [
			'开发者 - 寻找现代化博客模板',
			'技术写作者 - 需要 MDX 支持的内容平台',
			'个人站长 - 部署自己的博客站点',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'latex-paper-skills': {
		slug: 'latex-paper-skills',
		title: 'latex-paper-skills',
		subtitle:
			'科研 skills：想法、写作、实验、文献、排版一条龙服务，一条 prompt 即可生成有证据、排版好的论文',
		description: `latex-paper-skills 是一个面向 ML/AI 学术写作的科研 skills 系统。它把想法形成、文献检索、研究规划、章节写作、实验设计、结果回填、引用核验和 LaTeX 排版串成一条完整流水线，让“写论文”第一次像搭建软件工作流一样可组织、可追踪、可复用。

它最强的地方不只是会生成正文，而是能把一条自然语言 prompt 路由成真正可交付的论文流程：先规划、再写作、强制核验证据、自动维护 BibTeX、最后编译成版式规范的 PDF。相比单纯的 prompt 模板，这是一套能稳定产出“有证据、排版好、可复现”论文的研究生产系统。`,
		overviewSections: [
			{
				title: '一条 prompt 到论文 PDF：完整 pipeline 是这个项目的核心竞争力',
				body: `latex-paper-skills 的定位不是“论文润色工具”，而是科研写作全流程的 skills 系统。README 里把它定义为从 topic 到 compiled PDF 的可移植 AI agent skill bundle，核心路由 skill 会把一个研究想法继续拆成文献搜索、创新 framing、贡献地图、证据矩阵，再根据任务类型分流到综述论文或实证论文写作器。

这意味着用户输入的不再只是一个 prompt，而是一次完整科研流程的起点。系统会把想法、文献、实验、写作、引用、排版组织成可执行工序，最终交付的也不只是文字草稿，而是带证据约束、带 BibTeX、带 LaTeX 排版、可直接编译成 PDF 的论文工程。`,
				image: '/static/images/project/latex-paper-skills-pipeline.svg',
				imageAlt: 'latex-paper-skills 从选题到论文 PDF 的总流程图',
			},
			{
				title: 'Skill 体系不是一句“AI 写论文”，而是可分工、可组合的科研工作台',
				body: `这个仓库最值得单独介绍的，是它把论文生产拆成了一组职责明确的 skills。paper-from-zero 负责总路由；arxiv-paper-writer 负责综述论文；empirical-paper-writer 负责实验论文；latex-rhythm-refiner 负责在不破坏引用位置的前提下优化表达；results-backfill 负责把真实实验结果回填进草稿并生成图表。

在协作层上，collaborating-with-gemini 更偏广度扩展，适合做文献扩写、替代框架与关键词分组；collaborating-with-claude 更偏深度审查，适合做 claim stress-test、证据审计与关键判断；check-collaborators 则负责检查 CLI、认证与接口可用性。换句话说，这不是一个单点功能，而是一个覆盖“想法—文献—写作—实验—排版”的科研工作台。`,
				image: '/static/blog/latex-paper-skills/review-paper-preview.png',
				imageAlt: 'latex-paper-skills 综述论文示例预览',
			},
			{
				title: '它为什么强：不是写得快，而是把证据、流程和排版同时做对',
				body: `很多 AI 写作工具只能快速吐出一篇“像论文的文字”，但 latex-paper-skills 追求的是更难的目标：让结果既有研究证据，又符合论文生产流程，还能在 LaTeX 层面直接交付。README 里反复强调 no prose before approval、Issues CSV is the contract、citations must be verified、never fabricate citations/results/significance claims——这些不是营销词，而是系统设计原则。

配合门禁流程图可以看到，项目把 Kickoff、用户审批、Issues 合同、research/write/verify 循环、节奏润色、citation audit、source scoring、compile 和 warning review 串成了完整状态机。它的强大之处就在这里：一条 prompt 不是换来一篇“看起来像论文”的草稿，而是换来一条能够稳定生成“有证据、排版好、可审计、可编译”论文的科研生产线。`,
				image: '/static/blog/latex-paper-skills/empirical-paper-preview.png',
				imageAlt: 'latex-paper-skills 实证论文示例预览',
			},
		],
		features: [
			{
				title: '一条 Prompt 到论文 PDF',
				description:
					'从主题输入开始，自动路由到文献搜索、规划、写作、引用核验与 LaTeX 编译，最终交付可读可编译的论文工程',
			},
			{
				title: '科研 Skills 全链路',
				description:
					'覆盖想法形成、文献检索、综述写作、实验论文、结果回填、文本润色与排版交付，不是单点工具而是完整科研工作台',
			},
			{
				title: '综述 / 实证双论文模式',
				description:
					'同时支持 review paper 与 empirical paper，两类论文共享同一套工程化约束与交付标准',
			},
			{
				title: '证据优先写作',
				description:
					'每条引用先核验再进入 BibTeX，明确禁止伪造 citation、results 或 significance claims，让生成结果更可信',
			},
			{
				title: '门禁式工作流',
				description:
					'通过审批门禁、Issues CSV 合同与 research/write/verify/compile 循环约束 Agent，减少失控写作与结构漂移',
			},
			{
				title: '多模型协作与结果回填',
				description:
					'利用 Claude / Gemini 做深度审查与广度扩展，并支持把真实实验结果和图表回填进已有论文草稿',
			},
		],
		techStack: [
			{ category: '核心语言', items: ['Python 3.8+', 'TeX'] },
			{
				category: '论文工具链',
				items: ['LaTeX', 'BibTeX', 'latexmk / pdflatex'],
			},
			{
				category: 'Agent Runtime',
				items: ['Claude Code', 'Codex CLI 兼容 Skill 工作流'],
			},
			{ category: '数据与状态', items: ['SQLite', 'arXiv registry / cache'] },
			{
				category: '辅助脚本',
				items: ['引用审计', '来源排序', '风格检查', '编译验证'],
			},
		],
		links: [
			{
				label: 'GitHub',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills',
			},
			{
				label: '设计博客',
				url: '/blog/latex-paper-skills',
			},
		],
		usage: [
			'克隆仓库：git clone https://github.com/yunshenwuchuxun/latex-paper-skills.git',
			'准备 Python 3.8+ 与 LaTeX 环境（pdflatex / bibtex 或 latexmk）',
			'在支持 SKILL.md 的 agent runtime 中打开项目',
			'使用 paper-from-zero、arxiv-paper-writer 或 empirical-paper-writer 启动写作流程',
			'如为实证论文，可在实验完成后通过 results-backfill 回填结果并重新编译',
		],
		targetUsers: [
			'AI / ML 研究者 - 需要更系统的论文写作工作流',
			'研究生与博士生 - 需要从选题到成稿的结构化支持',
			'综述论文作者 - 需要更稳定的文献梳理与引用审计流程',
			'实证研究作者 - 希望先搭建论文骨架、后补实验结果',
			'研究团队 - 需要可审计、可复用的 AI 协作写作流程',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
};
