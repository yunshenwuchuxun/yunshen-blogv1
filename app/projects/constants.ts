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
		title: 'latex-paper-skills',
		src: 'latex-paper-skills-review.png',
		color: '#dcfce7',
		slug: 'latex-paper-skills',
		role: 'AI Research Tooling Developer',
		summary:
			'面向 ML/AI 论文写作的模块化 LaTeX 技能框架，覆盖选题、写作、审计与编译全流程',
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
		subtitle:
			'用自然语言或参考图片，几秒钟生成可编辑的 Draw.io 图表，适用于科研、架构文档与演示场景',
		description: `Smart Drawio Next 是一个面向科研图、系统架构图与产品说明图的 AI 绘图工具。它不是把想法直接渲染成一张不可修改的图片，而是把自然语言描述或参考图片转成结构化的 Draw.io 内容，让你得到真正可编辑、可继续优化的图表结果。

整个流程围绕“生成 → 编辑 → 应用 → 优化”展开：用户先输入 prompt 或上传参考图，模型流式生成 XML / JSON，结果会同步进入 Monaco 编辑器与嵌入式 Draw.io 画布；你既可以像写代码一样直接改结构，也可以像传统白板工具一样继续拖拽微调。再配合后处理工具、样式包、多模型配置与本地历史记录，它更像一套完整的图表生产工作台，而不是一次性 demo。`,
		overviewSections: [
			{
				title:
					'从 Prompt 到可编辑图表：这是结构化图表工作流，而不是一次性截图生成',
				body: `README 里最重要的判断，是把“AI 生成图”从一次性输出升级成可反复迭代的图表工作流。Smart Drawio Next 接收自然语言描述，也支持上传参考图片，然后把结果生成成结构化的 XML / JSON，而不是只吐出一张静态图。这样做的好处非常直接：图生成出来之后，你依然可以继续编辑、继续优化、继续应用到真实的科研、文档和汇报场景里。

对研究者和工程团队来说，这种可编辑性比“单次出图速度”更重要。论文结构图、系统架构图、流程图、时间线图往往都需要多轮修改，如果 AI 只能给你一张图片，你最后还是要重画；而 Smart Drawio Next 生成的是可落进 Draw.io 的内容，所以它在产品定位上更像“AI 加持的专业绘图工作台”。`,
				image: '/static/images/project/smart-drawio-page.png',
				imageAlt: 'Smart Drawio Next 主界面截图，展示输入区、编辑器与画布联动',
			},
			{
				title: '代码编辑器 + Draw.io 画布双栈联动，是它真正拉开差距的地方',
				body: `项目最强的体验不是“AI 会画图”，而是“图生成之后还能像工程对象一样被继续操作”。README 把这一层讲得很清楚：左边是输入与生成控制，中间是 Monaco 编辑器，右边是嵌入式 Draw.io 画布。你可以直接在代码层修改节点、箭头、布局与文本，再一键重新应用；也可以在画布里继续拖动和微调，让生成结果真正融入既有工作流。

这种 code + canvas 的双栈设计非常适合复杂图表：一方面，结构化编辑让你可以精确控制图的逻辑；另一方面，Draw.io 原生的可视化交互保留了普通用户的低门槛操作方式。它不是在编辑器和白板之间二选一，而是把两者的优势拼接到了一起。`,
				image: '/static/images/project/smart-drawio-transformer.png',
				imageAlt: 'Smart Drawio Next 生成的 Transformer 架构图示例',
			},
			{
				title: '它不是只会一类图：科研图、视觉模型图和多模态结构图都能生成',
				body: `README 的 Gallery 很能说明这个项目的上限。除了通用流程图和架构图，它还展示了 Transformer、Swin Transformer、CLIP、ProSST 等不同风格与内容密度的科研图表示例。这一点很重要，因为真正的图表工具不能只会“画几个盒子”，而要能适应完全不同的信息组织方式：有的图强调模块分层，有的图强调跨模态交互，有的图强调时序和数据流。

从这些示例可以看出，Smart Drawio Next 更像一个图表生成引擎：你可以显式指定图表类型，也可以让模型自动判断；你可以做学术论文里的模型图，也可以做技术文档里的系统图、汇报里的概念图，甚至偏信息可视化风格的演示图。这种跨场景通用性，正是它适合作为 portfolio 项目的原因。`,
				image: '/static/images/project/smart-drawio-swin.png',
				imageAlt: 'Smart Drawio Next 生成的 Swin Transformer 图表示例',
			},
			{
				title: '多模态输入不是噱头，而是把“参考图改造”为可编辑内容的关键入口',
				body: `README 强调了这个项目不仅支持文本生成，还支持图片输入。你可以上传一张已有图示、手绘草图、论文截图或参考页面，让 vision 模型先理解其结构，再转成可编辑图表内容。相比单纯的 text-to-diagram，这一步非常实用：现实工作里很多需求并不是“从零开始画”，而是“把这张已有图改成适合我汇报、文档或论文的版本”。

这也是 Smart Drawio Next 在实战里更有价值的原因。它把图片理解、结构重建和后续编辑串成一条链路，让参考图不再只是灵感来源，而是可转换、可重组、可二次创作的输入。对科研和工程用户来说，这类能力比“炫技式自动生成”更贴近真实工作流。`,
				image: '/static/images/project/smart-drawio-clip.png',
				imageAlt: 'Smart Drawio Next 生成的 CLIP 图表示例',
			},
			{
				title: '复杂科研图也能保持结构清晰，这让它更像生产工具而不是展示 Demo',
				body: `README 里的 ProSST 示例说明，这个项目不仅能处理经典 AI 架构图，也能覆盖更复杂的科研示意场景。此类图通常包含更多层次、更复杂的关系线和更高的信息密度，如果没有后续编辑与后处理能力，很容易生成出“元素都有，但读不明白”的结果。Smart Drawio Next 的优势在于：生成只是起点，后续你还能继续整理结构、调整视觉层级、压缩冗余线条与文本噪声。

因此它适合的不只是“做一张好看的图”，而是“把复杂知识表达整理成真正能被人读懂、能放进论文和文档里的图”。这是科研绘图里很稀缺、也很有说服力的产品能力。`,
				image: '/static/images/project/smart-drawio-prosst.png',
				imageAlt: 'Smart Drawio Next 生成的 ProSST 图表示例',
			},
			{
				title: '后处理工具链与样式系统，让图表从“能用”走向“能展示”',
				body: `很多 AI 图表工具的问题不是“生成不出来”，而是“生成出来以后不够像最终交付物”。README 里的 Tools System 正是在解决这个问题：Drawing Tricks 负责对齐、正交连线、统一间距、箭头规范化、跳线等结构修正；Text Tools 负责文本折行、居中、面板化与紧凑排版；Style Presets 与 Style Packs 则负责把整张图一键拉到可展示、可汇报的视觉质量。

这让 Smart Drawio Next 不只是一个生成器，更像一个能把草图打磨成展示级图表的后期系统。你可以先用模型快速起稿，再用工具链把它整理到适合论文、演讲或技术方案评审的精度。这种“生成 + 工具化 refinement”的组合，是这个项目最值得在 portfolio 里强调的地方之一。`,
				image: '/static/images/project/smart-drawio-tools-business-clean.png',
				imageAlt: 'Smart Drawio Next 样式包处理后的商业风格图表示例',
			},
		],
		features: [
			{
				title: '流式图表生成',
				description:
					'支持 streaming generation 与 continue generation，长图或复杂图表也能分段生成并持续补全',
			},
			{
				title: '多模态输入',
				description:
					'既支持自然语言 prompt，也支持上传参考图片，把已有图示转换成可编辑 Draw.io 内容',
			},
			{
				title: '代码 + 画布双工作流',
				description:
					'中间用 Monaco 编辑 XML / JSON，右侧嵌入 Draw.io 实时预览与继续编辑，兼顾精确控制与可视操作',
			},
			{
				title: '后处理工具链',
				description:
					'提供布局整理、连线修复、文本格式化、样式预设与 style packs，让初稿快速提升到展示级效果',
			},
			{
				title: '20+ 图表类型',
				description:
					'覆盖 flowchart、mind map、sequence、UML、ER、timeline、architecture diagram、network topology 等多种图表形态',
			},
			{
				title: '主题与样式系统',
				description:
					'内置 10 种颜色主题，并支持 blueprint、business clean、presentation cards 等一键视觉风格',
			},
			{
				title: '配置管理与历史记录',
				description:
					'支持多模型配置切换、访问密码模式、本地历史回放与通知系统，适合个人或团队长期使用',
			},
			{
				title: '可部署产品形态',
				description:
					'提供 Docker / Docker Compose 部署路径，并支持 client-side 与 server-side 两种 LLM 配置模式',
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
					'SSE 流式响应',
					'Server Actions',
					'Edge API 路由',
				],
			},
			{
				category: '状态与配置',
				items: ['localStorage', '访问密码模式', '历史记录回放'],
			},
			{
				category: '部署方式',
				items: ['Docker', 'Docker Compose', 'Next.js standalone output'],
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
			'本地开发：pnpm dev',
			'访问 http://localhost:3000',
			'Docker 启动：docker compose up -d --build',
			'按需选择浏览器本地配置模式或服务端 Access Password 模式',
		],
		targetUsers: [
			'科研工作者 - 快速生成论文中的模型图、方法流程图与实验结构图',
			'产品与设计团队 - 用自然语言快速起草流程图、概念图与汇报图示',
			'开发人员 - 创建系统架构图、数据流图、网络拓扑图与技术文档图表',
			'教育工作者 - 制作教学演示图、课程讲义图与可修改示意图',
			'内部工具团队 - 部署为组织内共享的 AI 绘图工作台',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'dynamical-system-analyzer': {
		slug: 'dynamical-system-analyzer',
		title: '智能动力学系统分析器',
		subtitle: '交互式 2D/3D 动力学系统分析与可视化平台',
		description: `智能动力学系统分析器是一款基于 Flask 的 Web 应用，专注于线性与非线性动力学系统的分析与可视化。平台支持相图生成、轨迹动画、混沌分析以及离散系统应用的全面研究。

借助自然语言转矩阵的智能功能，用户可以用直观的方式描述系统，平台自动解析并生成专业的数学分析结果。无论是学习动力学系统理论，还是进行科研工作中的系统仿真，都能获得流畅的交互体验。`,
		overviewSections: [
			{
				title: '主页面与智能输入：把动力学分析入口做得足够直观',
				body: `README 里最容易让人建立第一印象的，不是某个单点算法，而是整个入口设计。首页把矩阵输入、特征值分析、系统分类和文本转矩阵放进同一条工作流里，让用户不用先写一堆脚本，就能快速看到系统的基本性质和可视化结果。

这让项目很适合教学和快速探索：初学者可以从线性系统矩阵直接入门，研究者也可以把自然语言描述转成可计算对象，再继续做更深入的相图与轨迹分析。它不是单纯展示公式结果，而是在努力降低动力学系统分析的使用门槛。`,
				image: '/static/images/project/dynamical-system-main.png',
				imageAlt:
					'智能动力学系统分析器首页，展示矩阵输入、特征值分析与智能输入入口',
			},
			{
				title: '线性与非线性系统分析：从平衡点分类到局部稳定性判断',
				body: `README 展示的线性系统分析页，清楚说明这个项目不是“给出几个数字”的计算器，而是把特征值、相图、向量场和系统分类真正组合到了一起。用户可以直接看到节点、鞍点、焦点等典型行为，也能把代数结果和几何直觉对应起来。

进一步到非线性系统时，平台还能做平衡点检测、雅可比矩阵线性化和局部稳定性分析。对学习者来说，这种从理论定义到图形反馈的闭环很有价值；对做系统建模的人来说，它也能更快地验证方程在局部邻域里的动力学表现。`,
				image: '/static/images/project/dynamical-system-linear-analysis.png',
				imageAlt: '线性系统分析页面，展示相图、向量场与平衡点行为',
			},
			{
				title: '轨迹绘制与交互动画：把系统演化过程直接动态化',
				body: `相比静态相图，README 里的轨迹绘制页面更能体现这个项目的交互价值。平台用 Canvas 做实时轨迹动画，不只是画出一条路径，而是让用户观察不同初值下轨迹如何随时间展开、收敛、发散或绕转。

这类动态可视化对解释系统行为非常有效，尤其适合课堂演示、多轨迹对比和参数调节后的即时反馈。它把“系统会怎么动”从抽象概念变成可直接观察的过程，也让这个项目比普通数学可视化工具更有产品感。`,
				image: '/static/images/project/dynamical-system-trajectory.png',
				imageAlt: '轨迹绘制页面，展示实时动画与多轨迹对比',
			},
			{
				title: '3D 混沌吸引子与高级分析：从好看的图进一步走向可分析对象',
				body: `README 里最有表现力的部分之一，是对 Lorenz、Rössler、Chua、Thomas 等经典混沌系统的支持。页面不仅能渲染 3D 吸引子，还把 Lyapunov 指数、Poincaré 截面和分形维数这些更高阶的分析能力放进同一个平台里。

这意味着项目并不满足于“把混沌图画出来”，而是试图把混沌系统研究里常见的几个关键分析视角整合起来。对课程项目来说这已经很完整；对 portfolio 展示来说，这一块也最能体现系统的数学深度和可视化表达能力。`,
				image: '/static/images/project/dynamical-system-chaos-analysis.png',
				imageAlt: '混沌分析页面，展示 3D 吸引子与 Lyapunov 指数相关能力',
			},
			{
				title: '离散系统与实际应用：把 textbook 图形延伸到真实模型场景',
				body: `README 没有把离散动力学停留在教材式示意图层面，而是把分岔图、蛛网图、回归映射和 Lyapunov 指数这些分析工具，继续延伸到人口动态、离散 SIR、经济蛛网模型等更具体的应用场景。这样做的好处，是用户能把抽象的离散映射行为和实际建模问题联系起来。

从项目展示角度看，这一部分很重要，因为它说明平台不仅适合讲“理论”，也适合讲“问题”。你可以先分析系统什么时候进入周期、分岔或混沌，再把这种行为放回人口、流行病或经济系统里理解，这让整个项目的应用面比单纯的相图工具更宽。`,
				image:
					'/static/images/project/dynamical-system-discrete-applications.png',
				imageAlt: '离散动力学实际应用页面，展示人口模型与流行病模型等场景',
			},
		],
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
			'访问 http://localhost:5001 即可体验',
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
