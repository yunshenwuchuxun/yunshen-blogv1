import type { Project } from './types';

interface DeployedProject {
	title: string;
	src: string;
	color: string;
	role: string;
	summary: string;
	url: string;
	githubUrl: string;
	image?: string;
	imageAlt?: string;
}

export const projects: Project[] = [
	{
		title: 'Ofox Desktop',
		src: 'ofox-desktop.webp',
		color: '#ffedd5',
		slug: 'ofox-desktop',
		role: 'AI Workspace',
		summary:
			'把 10 个 AI 工具接入同一工作台，打通原生配置、会话、资源与用量，交付 macOS / Windows 双平台应用',
	},
	{
		title: 'Ofox Skills',
		src: 'ofox-skills.svg',
		color: '#fff7ed',
		slug: 'ofox-skills',
		role: 'Agent Skills Toolkit',
		summary:
			'20 个创作与工具技能，npm 累计 1.9k+ 下载，已被 Skills.sh、ClawHub 等平台收录',
	},
	{
		title: 'Smart Drawio',
		src: 'smart-drawio.png',
		color: '#dbeafe',
		slug: 'smart-drawio',
		role: 'Full Stack Developer',
		summary:
			'366 GitHub Stars · 从 Web 绘图到 Agent Skill 与 MCP，生成、校验并优化可编辑的 Draw.io 图表',
	},
	{
		title: 'latex-paper-skills',
		src: 'latex-paper-skills-review.png',
		color: '#dcfce7',
		slug: 'latex-paper-skills',
		role: 'Research Writing Pipeline',
		summary:
			'275 GitHub Stars · npm 1k+ 下载，8 个科研工作流覆盖选题、证据与 LaTeX PDF，已收录 Skills.sh',
	},
	{
		title: 'Dynamical System Analyzer',
		src: 'dynamical-system.png',
		color: '#e0e7ff',
		slug: 'dynamical-system-analyzer',
		role: 'Interactive Dynamics Lab',
		summary: '智能动力学系统分析平台，可视化相图、混沌吸引子与分岔图',
	},
	{
		title: 'Yun Shen Blog',
		src: 'yunshen-blog.png',
		color: '#f3e8ff',
		slug: 'yunshen-blog',
		role: 'Personal Digital Garden',
		summary: '基于 Next.js 16 的个人博客，支持 MDX、主题切换与流畅动画',
	},
	{
		title: 'TavilyProxy',
		src: 'tavily-proxy.png',
		color: '#fef3c7',
		slug: 'tavily-proxy',
		role: 'Full Stack Developer',
		summary:
			'Tavily API 代理与密钥池管理平台，提供统一入口、失败切换与管理后台',
	},
	{
		title: 'Small Tools, Real Use',
		src: 'og-image.png',
		color: '#fee2e2',
		slug: 'one-more-thing',
		role: 'Deployed Tools & Services',
		summary: '一组已经真正上线、能访问、也还在继续迭代的小工具。',
	},
];

export const extraProjects: DeployedProject[] = [
	{
		title: 'CLI Proxy API',
		src: 'tavily-proxy.png',
		color: '#dbeafe',
		role: 'Infra / Tooling Developer',
		summary:
			'把命令行能力封装成可调用的 HTTP API，用一个管理面板统一管理和调试 CLI 调用。',
		url: 'https://cpa.yunshen.online/management.html',
		githubUrl: 'https://github.com/router-for-me/CLIProxyAPI',
	},
	{
		title: 'grok2api',
		src: 'tavily-proxy.png',
		color: '#dcfce7',
		role: 'Backend Developer',
		summary: '把 Grok 能力封装成标准化 API 服务，提供管理后台进行配置与监控。',
		url: 'https://grok2api.yunshen.online/chat',
		githubUrl: 'https://github.com/chenyme/grok2api',
	},
	{
		title: 'Cloud Mail',
		src: 'tavily-proxy.png',
		color: '#fef3c7',
		role: 'Mail / Infra Developer',
		summary: '一个可自建的 Web 邮件服务，用自己的域名和基础设施托管邮箱。',
		url: 'https://mail.niuaoao.ggff.net/',
		githubUrl: 'https://github.com/maillab/cloud-mail',
	},
	{
		title: 'Z-Image Turbo',
		src: 'tavily-proxy.png',
		color: '#e0f2fe',
		role: 'Full Stack Developer',
		summary: '专注图片处理与加速的小工具，用简单界面完成批量转换和优化。',
		url: 'https://x-pi-inky-99.vercel.app/',
		githubUrl: 'https://github.com/yunshenwuchuxun/Z-Image-turbo',
	},
	{
		title: 'Render Service Manager',
		src: 'tavily-proxy.png',
		color: '#f3e8ff',
		role: 'Platform / DevOps',
		summary:
			'集中管理 Render 平台上的服务实例，一目了然地查看状态、重启和调试。',
		url: 'https://render-manager.uestc.nyc.mn/',
		githubUrl: 'https://github.com/ssfun/render-service-manager',
	},
	{
		title: 'cursor2api',
		src: 'tavily-proxy.png',
		color: '#fee2e2',
		role: 'Dev Tooling',
		summary:
			'把 Cursor 的能力与工作流暴露为 HTTP API，方便在脚本和其他工具里复用。',
		url: 'http://62.234.31.111:3010',
		githubUrl: 'https://github.com/7836246/cursor2api',
	},
];

export interface ProjectDetail {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	featureTitle?: string;
	overviewSections?: {
		id?: string;
		title: string;
		body: string;
		image?: string;
		imageAlt?: string;
		video?: string;
		videoPoster?: string;
		mediaCaption?: string;
		gallery?: { image: string; alt: string; caption: string }[];
	}[];
	features: { title: string; description: string }[];
	techStack: { category: string; items: string[] }[];
	links: { label: string; url: string; primary?: boolean }[];
	usage: string[];
	targetUsers: string[];
	license: string;
	deployedProjects?: {
		title: string;
		role: string;
		summary: string;
		url: string;
		githubUrl: string;
		image?: string;
		imageAlt?: string;
	}[];
}

export const projectDetails: Record<string, ProjectDetail> = {
	'ofox-desktop': {
		slug: 'ofox-desktop',
		title: 'Ofox Desktop',
		subtitle: '一键接入 AI 工具，让配置、会话、资源与创作在同一工作台中衔接',
		description: `当 Claude Code、Codex、Gemini CLI 等工具同时进入日常工作，真正耗费精力的往往是它们之间的缝隙：同一个模型服务要重复配置，上一段会话散落在不同客户端，MCP 与 Skills 需要逐处维护，用量记录也难以放在一起理解。

	Ofox Desktop 从这些具体问题出发，把工具接入、会话管理、资源分发、内置助手与用量分析组织成一条完整工作流。用户可以先接入工具，再沿着项目继续之前的对话，复用同一组资源，最后回看任务消耗。它覆盖 10 个 AI 工具，并交付 macOS 与 Windows 桌面应用。

	这个项目的工程重点，是适配各工具真实的原生配置与本地数据：区分安装和绑定状态，处理配置冲突，保留用户改动，并把不同来源的会话与用量整理成可理解的界面。外部工具仍直接连接各自配置的服务，关闭 Desktop 后也能继续使用已保存的接入配置。`,
		featureTitle: '工程设计与实现',
		overviewSections: [
			{
				id: 'desktop-connect',
				title: '一键接入：把原生配置的复杂度收进清晰的操作流程',
				body: `第一次使用时，用户先登录 Ofox，再从自动检测到的本机客户端中选择目标。点击开始绑定后，工作台为选中的工具管理专属 API Key，写入各自要求的接入配置，并逐项呈现成功、冲突或失败结果。未安装的客户端可以先走受支持的安装流程或官方下载入口。

	安装、绑定和模型选择分别记录，避免把“安装好了”和“已经可以调用模型”混为一谈。已有配置出现冲突时会明确提示，缺失配置可以显式恢复，解绑前也能先预览变更。这让多工具接入成为一个可查看、可检查的产品流程。`,
				video: '/static/images/project/ofox-desktop-onboarding.mp4',
				videoPoster: '/static/images/project/ofox-desktop.webp',
				mediaCaption: '官方一键接入演示 · 无音轨 · 使用虚构演示数据',
			},
			{
				id: 'desktop-sessions',
				title: '会话管理：沿着项目找到上下文，接着上次的工作继续',
				body: `同一个项目可能先在一个工具中探索，再换到另一个工具中实现。会话入口把受支持工具的本地记录按项目组织起来，让用户可以搜索、阅读和导出对话，并在来源支持时继续会话或使用可恢复的回收站。

	界面保留不同工具的能力差异：Claude Code、Codex、OpenCode 等来源支持阅读、导出与续聊；OpenClaw、WorkBuddy 提供阅读和导出；dsh 当前展示会话列表。ChatGPT 的接入范围是 Codex 模式，共用 Codex 的本地记录。把这些差异呈现清楚，才能让“跨工具管理”真正服务于日常工作。`,
				image: '/static/images/project/ofox-desktop-sessions.webp',
				imageAlt:
					'Ofox Desktop 按项目浏览本地会话，展示工具来源、会话列表与对话内容',
			},
			{
				id: 'desktop-library',
				title: '资源库与发现：一次整理能力，预览后分发到目标工具',
				body: `指令、MCP 和 Skills 可以集中维护。工作台发现已有的原生配置，将内容整理为草稿，比较差异，再由用户选择需要应用的客户端。发现页提供精选 MCP 与 Skills 入口，让“找到能力”与“把能力接到工具里”能够衔接起来。

	这里的关键是分发过程可见：保存资源、写入目标配置与连接验证是不同状态，同名冲突和部分成功需要分别处理。各客户端沿用自己的配置格式和协议规则，Codex 与 ChatGPT 的 Codex 模式共享同一个物理配置目标，减少重复写入和配置漂移。`,
				image: '/static/images/project/ofox-desktop-library.webp',
				imageAlt:
					'Ofox Desktop 资源库中集中维护 MCP、Skills 和指令，并选择目标客户端',
				gallery: [
					{
						image: '/static/images/project/ofox-desktop-discover.webp',
						alt: 'Ofox Desktop 发现页中的 MCP 与 Skills 目录',
						caption: '发现页：浏览 MCP 与 Skills，选择后先形成可编辑草稿。',
					},
				],
			},
			{
				id: 'desktop-assistant',
				title: '内置助手：从信息处理到多模态创作，在同一段对话中推进',
				body: `助手把模型对话、文件附件、联网搜索和本地历史放在一起，支持会话分叉与导出，以及语音输入和朗读。用户可以在讨论需求的过程中继续生成图片、视频或语音，让想法、参考资料和创作结果留在同一条工作线上。

	媒体操作提供对应的模型与参数选择：图片可选择尺寸、质量和数量，视频可设置时长、分辨率、画面比例与音轨选项。具体能力由所选模型与账号提供，界面中的控制项服务于实际的创作决策。`,
				image: '/static/images/project/ofox-desktop-assistant.webp',
				imageAlt: 'Ofox Desktop 助手界面，展示本地对话、模型选择和示例回复',
				gallery: [
					{
						image: '/static/images/project/ofox-desktop-assistant-image.webp',
						alt: 'Ofox Desktop 图片生成的模型、尺寸、质量与数量选择界面',
						caption: '图片生成：按任务选择模型、尺寸、质量与数量。',
					},
					{
						image: '/static/images/project/ofox-desktop-assistant-video.webp',
						alt: 'Ofox Desktop 视频生成的时长、分辨率、画面比例与音轨设置界面',
						caption: '视频生成：配置时长、分辨率、画面比例与音轨。',
					},
				],
			},
			{
				id: 'desktop-recovery',
				title: '配置诊断：把出错后的下一步也纳入产品体验',
				body: `工具无法使用时，用户可以点击“用不了？让助手看看”，进入带有工具背景的诊断对话。发送请求后，助手可检查配置、运行环境和 Ofox 接入状态，在用户所选权限范围内执行修改，再验证修复结果。

	这个入口把接入、诊断、修改和验证连成闭环。配置失败不再只留下一个报错；用户能够沿着当前工具的问题继续处理，未解决的部分仍然明确呈现。`,
			},
			{
				id: 'desktop-usage',
				title: '用量分析：从总览下钻到请求，让每段工作都能被解释',
				body: `用量视图按工具、项目、模型与日期整理本地记录，用户可以从总览进入请求明细，并导出 CSV 做进一步分析。这把分散在各客户端中的消耗信息放回具体项目，帮助理解一次工作主要用了哪些模型、资源消耗集中在哪个阶段。

	数据展示区分账户账单、历史保存金额与当前价格估算，同时呈现覆盖范围和未知价格。不同工具对 Token 与缓存的记录方式存在差异，缺失数据与已知零值也需要分别表达。这些口径设计让统计结果更容易核对，避免把一个汇总数字当成全部事实。`,
				image: '/static/images/project/ofox-desktop-usage.webp',
				imageAlt:
					'Ofox Desktop 用量分析中的工具、项目、模型筛选、趋势与请求记录',
			},
		],
		features: [
			{
				title: '原生配置与协议适配',
				description:
					'适配各客户端的 JSON、JSONC、TOML、YAML 等配置形式，协调模型、服务地址与工具专属 Key，并保留无关字段。',
			},
			{
				title: '配置所有权与可恢复操作',
				description:
					'区分接入前的值、工作台写入值和用户后续修改；变更前预览与冲突检查，让解绑和恢复具有明确边界。',
			},
			{
				title: '多来源本地数据整理',
				description:
					'从各工具的 JSONL、JSON 与 SQLite 等原生记录中提取会话和用量，同时保留来源能力、数据覆盖与统计口径。',
			},
			{
				title: '资源分发与结果核验',
				description:
					'将资源定义、应用目标和执行结果分开管理；原生配置比较后再写入，处理同名冲突与部分成功。',
			},
			{
				title: '系统凭据与本地配置协同',
				description:
					'正式版将登录令牌和工具密钥副本交由系统凭据库保存，接入时按各工具要求写入本机原生配置。',
			},
			{
				title: '跨平台桌面交付',
				description:
					'基于 Tauri 2、Rust 与 React 组织桌面能力，交付 macOS / Windows 安装包，提供应用内更新检查。',
			},
		],
		techStack: [
			{ category: '桌面框架', items: ['Tauri 2', 'Rust'] },
			{ category: '前端界面', items: ['React 18', 'TypeScript'] },
			{ category: '本地数据', items: ['JSONL / JSON', 'SQLite', 'CSV 导出'] },
			{
				category: '原生集成',
				items: ['JSON / JSONC / TOML / YAML', 'MCP', 'Agent Skills'],
			},
			{ category: '开发环境', items: ['Node.js', 'pnpm 10', 'Rust stable'] },
			{
				category: '产品交付',
				items: ['macOS Apple Silicon', 'Windows x64', 'MIT'],
			},
		],
		links: [
			{ label: '官方网站', url: 'https://ofox.ai/zh/desktop' },
			{ label: 'GitHub', url: 'https://github.com/ofoxai/ofox-desktop' },
			{
				label: 'GitHub Releases',
				url: 'https://github.com/ofoxai/ofox-desktop/releases/latest',
			},
		],
		usage: [
			'从官网或 GitHub Releases 下载对应平台的安装包',
			'打开应用并登录 Ofox，或进入受支持的本地管理功能',
			'选择已安装的 AI 工具并一键接入，查看每个工具的配置结果',
			'在会话、资源库和用量入口继续管理日常工作',
		],
		targetUsers: [
			'AI 开发者 - 同时使用多个编程助手与命令行工具',
			'内容创作者 - 希望在对话中完成图片、视频与语音创作',
			'个人用户 - 需要统一整理本地会话、工具配置与用量记录',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'ofox-skills': {
		slug: 'ofox-skills',
		title: 'Ofox Skills',
		subtitle: '把创作经验和工具能力，封装成 Agent 可以执行的工作流',
		description: `Ofox Skills 把视频创作、图片处理与实用工具操作，组织成可以安装、组合和持续改进的 Agent 技能。用户表达目标，场景技能整理输入与创作方案，共享执行层完成校验、API 调用、任务跟踪和成果保存，让工作流一直走到实际交付。

	项目通过统一仓库维护场景、脚本和参考说明，提供安装器与可见性诊断，并接入 skills.sh 等技能发现生态。它展示了从任务设计、执行引擎到开发者分发的完整工程路径，也让内容创作能力能够在不同 Agent 中复用。`,
		overviewSections: [
			{
				title: '围绕真实任务设计技能',
				body: '从短剧、广告、电商展示、动漫分镜，到产品演示、口播和音乐视频，每种场景都包含对应的输入组织和交付方式。图片技能支持局部编辑与多组产品图，hal-image、hal-vault、cloudflare-drop 则补上本地图片处理、加密密钥管理和静态发布能力，让创作与后续工具操作可以衔接起来。',
				image: '/static/images/project/ofox-skills.svg',
				imageAlt:
					'Ofox Skills 的视频、图片与工具三类能力及安装到交付的工作流示意',
			},
			{
				title: '共享执行引擎，可追溯的交付',
				body: 'ofox-video-core 与 ofox-image-core 将参数校验、费用预估、提交、轮询和下载集中到共享脚本，场景技能可以专注创作逻辑。dry-run 在提交前给出估价；视频产物随附记录任务、提示词、参数与实际费用的 JSON 文件，方便后续定位和调整。这种分层设计兼顾复用、成本透明与交付可追溯性。',
			},
			{
				title: '从开源代码到技能生态',
				body: 'npx ofox-skills 负责安装完整技能集，doctor 检查 Agent 实际能看到哪些技能，也支持按技能、Agent 和项目范围选择。skills.sh 提供公开目录和安装入口，部分技能也进入 ClawHub、Skills Directory 等发现渠道。统一分发和依赖组织，让一套工作流能够更顺畅地进入用户已有的 Agent 环境。',
			},
		],
		features: [
			{
				title: '从场景到成片',
				description:
					'按广告、短剧、产品展示、动画与口播等任务组织创作输入、镜头计划和视频交付',
			},
			{
				title: '图片编辑与产品创作',
				description:
					'针对已有图片执行具体修改，围绕同一产品生成多种风格与背景的候选素材',
			},
			{
				title: '先估价，再执行',
				description:
					'dry-run 先校验参数和估算费用，生成后保留任务记录与实际用量，便于追踪创作成本',
			},
			{
				title: '创作之外的实用能力',
				description:
					'把 ImageMagick、hal-vault 与静态发布能力封装成技能，衔接素材处理、凭据使用和成果发布',
			},
			{
				title: '安装与可见性诊断',
				description:
					'提供完整安装和按需分发，用 doctor 核对 Agent 的实际可见性，减少环境与依赖断点',
			},
			{
				title: '开放分发，多生态发现',
				description:
					'通过 skills.sh 分发，部分技能可在 ClawHub 与 Skills Directory 发现，共享脚本保持统一维护',
			},
		],
		techStack: [
			{ category: '技能规范', items: ['SKILL.md', 'Markdown', 'skills.sh'] },
			{ category: '执行脚本', items: ['Shell', 'curl', 'jq'] },
			{ category: '创作能力', items: ['Ofox Video API', 'Ofox Image API'] },
			{
				category: '工具集成',
				items: ['ImageMagick', 'hal-vault', 'Cloudflare'],
			},
		],
		links: [
			{
				label: '官方网站',
				url: 'https://ofox.ai/docs/integrations/claude-code/skills',
			},
			{ label: 'GitHub', url: 'https://github.com/ofoxai/skills' },
			{ label: '技能目录', url: 'https://skills.sh/ofoxai/skills' },
		],
		usage: [
			'安装完整技能集：npx ofox-skills',
			'检查 Agent 可见性：npx ofox-skills doctor',
			'按需选择 Agent 或项目范围，安装后重启 Agent 以加载技能',
			'使用图片或视频生成前配置 OFOX_API_KEY，并先通过 dry-run 查看预估费用',
		],
		targetUsers: [
			'Agent 用户 - 希望让编程助手执行创作与实用工具任务',
			'内容创作者 - 需要可复用的图片与视频生产工作流',
			'技能开发者 - 需要参考场景技能与共享执行层的组织方式',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'smart-drawio': {
		slug: 'smart-drawio',
		title: 'Smart Drawio Next',
		subtitle:
			'从 Web 工作台到 Agent Skill 与 MCP，把想法和参考图转成可编辑、可检查、可继续打磨的 Draw.io 图表',
		description: `Smart Drawio Next 把图表生成、结构编辑与后处理连接成一条工作流。自然语言或参考图片进入模型后，结果以 Draw.io XML / JSON 呈现在 Monaco 编辑器和嵌入式画布中，用户可以继续修改节点、关系与布局，再应用到论文、技术文档和演示中。

	项目已从浏览器产品延伸到独立 Agent Skill 和 local stdio MCP。三种入口围绕同一套图表能力工作：在 Web 中交互编辑，在 Agent 中沿着文档任务生成图表，再通过本地工具校验结构、修复受支持的问题并应用样式。Skill 与 MCP v0.1.0 已发布，MCP 同时进入官方 Registry。`,
		overviewSections: [
			{
				id: 'drawio-workspace',
				title: '生成、代码与画布，在同一个工作台里迭代',
				body: `左侧组织描述、参考图片与生成控制，中间通过 Monaco 检查和修改 XML / JSON，右侧用 Draw.io 继续拖拽与微调。流式生成和续写把复杂图表逐步展开，结构化输出让节点、连线与文本能够继续编辑。

	这个设计把模型起稿和人工精修连接起来。一次修改可以落到具体的节点或样式上，也能回到可视化画布中检查阅读效果，适合需要多轮调整的架构图、方法图与流程图。`,
				image: '/static/images/project/smart-drawio-page.png',
				imageAlt:
					'Smart Drawio 工作台，展示输入区、Monaco 编辑器与 Draw.io 画布',
			},
			{
				id: 'drawio-agents',
				title: '把绘图能力带进 Agent：独立 Skill 与 MCP',
				body: `独立 smart-drawio Skill 提供绘图约定、工作流程和离线校验，复用 Agent 已有的模型能力。MCP 则以 5 个工具暴露生成、校验、保守修复、样式处理与选项发现，供支持 local stdio 的客户端调用。

	MCP 返回可由客户端保存的未压缩 Draw.io XML。校验、修复、样式与选项查询在本地执行，只有 generate_drawio 需要模型 API 配置。下方两张图来自仓库的 Skill 与 MCP 实际生成示例，展示两种接入方式的交付结果。`,
				gallery: [
					{
						image: '/static/images/project/smart-drawio-skill.png',
						alt: '通过 Smart Drawio Skill 生成的 Transformer 图表示例',
						caption: 'Skill 示例：Agent 按绘图约定生成可编辑 XML。',
					},
					{
						image: '/static/images/project/smart-drawio-mcp.png',
						alt: '通过 Smart Drawio MCP 生成的 Transformer 图表示例',
						caption: 'MCP 示例：由工具生成 XML，后续仍可人工调整布局与连线。',
					},
				],
			},
			{
				id: 'drawio-refinement',
				title: '让生成结果进入可检查、可优化的工具链',
				body: `结构校验检查 XML、ID、parent 和引用关系，保守修复处理受支持的缺失闭合标签。Drawing Tricks、Text Tools、Style Presets 与 Style Packs 进一步整理对齐、间距、正交连线、文本和视觉层级。

	这些能力把结构正确性与视觉打磨分开处理：先发现可定位的问题，再按任务选择修复或样式工具，最后回到 Draw.io 检查细节。图片和 PDF 导出仍由 Draw.io renderer 完成，MCP 交付的是可编辑源文件。`,
				image: '/static/images/project/smart-drawio-tools-business-clean.png',
				imageAlt: 'Smart Drawio 应用 Business Clean 样式后的图表示例',
			},
			{
				id: 'drawio-research',
				title: '从系统架构到科研方法图，保留结构表达能力',
				body: `项目提供 20+ 图表类型和 10 种颜色主题，覆盖 Flowchart、UML、ER、Sequence、Architecture Diagram 等场景。公开示例包含 Transformer、Swin Transformer、CLIP 与 ProSST，呈现分层模块、跨模态交互与数据流等不同组织方式。

	Web 的参考图片输入也支持从已有图示开始重建结构。用户可以根据实际任务补充节点含义、调整信息层级，并将最终 XML 带回自己的文档和研究流程。`,
				gallery: [
					{
						image: '/static/images/project/smart-drawio-transformer.png',
						alt: 'Smart Drawio 的 Transformer 架构图示例',
						caption: 'Transformer：编码器、解码器与信息流。',
					},
					{
						image: '/static/images/project/smart-drawio-clip.png',
						alt: 'Smart Drawio 的 CLIP 图表示例',
						caption: 'CLIP：图像与文本分支的结构表达。',
					},
				],
			},
		],
		features: [
			{
				title: '流式生成与续写',
				description:
					'逐步生成复杂图表，并通过 continue generation 接着补全内容。',
			},
			{
				title: '参考图到可编辑结构',
				description:
					'Web 支持自然语言与图片输入，将参考信息转成可继续编辑的 Draw.io 内容。',
			},
			{
				title: '代码与可视化协作',
				description:
					'Monaco 中精确修改 XML / JSON，在 Draw.io 画布中应用并继续微调。',
			},
			{
				title: '5 个 MCP Tools',
				description:
					'生成、结构校验、保守修复、样式处理与选项发现，可组合进 Agent 工作流。',
			},
			{
				title: '布局与样式后处理',
				description:
					'以 drawing tricks、文本工具、presets 与 style packs 整理图表的结构和视觉层级。',
			},
			{
				title: '可安装、可自部署',
				description:
					'Skill 通过 Skills CLI 安装，MCP 通过 npm 分发，Web 提供 Docker / Docker Compose 部署。',
			},
		],
		techStack: [
			{
				category: 'Web 应用',
				items: ['Next.js 16', 'React 19', 'Tailwind CSS v4'],
			},
			{
				category: '图表与编辑',
				items: ['Draw.io Embed', 'Monaco Editor', 'XML / JSON'],
			},
			{
				category: 'Agent Skill',
				items: ['SKILL.md', 'Python 3 离线校验', '复用 Agent 模型'],
			},
			{
				category: 'MCP Server',
				items: ['Node.js 20.9+', 'local stdio', '5 个 MCP Tools'],
			},
			{
				category: '模型与状态',
				items: ['OpenAI / Anthropic 兼容 API', 'SSE', 'localStorage'],
			},
			{
				category: '分发与部署',
				items: ['npm', 'MCP Registry', 'Docker / Docker Compose'],
			},
		],
		links: [
			{
				label: '在线体验',
				url: 'https://smart-drawio-next.vercel.app/',
				primary: true,
			},
			{
				label: 'GitHub',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next',
			},
			{
				label: '安装 Skill',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/blob/main/docs/skill-installation.md',
			},
			{
				label: '接入 MCP',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/blob/main/packages/mcp/README.md',
			},
		],
		usage: [
			'在线打开 Web，在浏览器中配置模型服务，输入描述或上传参考图片。',
			'通过 Skills CLI 安装 smart-drawio Skill，使用 $smart-drawio 调用。',
			'MCP 客户端通过 npx 启动 @yunshenwuchuxun/smart-drawio-mcp@0.1.0。',
			'如需自行托管 Web，使用 Docker / Docker Compose；当前模型配置保存在浏览器本地。',
		],
		targetUsers: [
			'研究者：生成并持续修改论文模型图与方法图。',
			'开发者：将架构图、数据流图与技术文档组织进同一个 Agent 任务。',
			'产品与教学团队：用自然语言起稿，再通过画布完成演示细节。',
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
		overviewSections: [
			{
				title: '博客首页与设计风格预览',
				body: `Yun Shen Blog 以现代个人博客为目标，整体围绕简洁排版、流畅动效与稳定内容呈现展开。封面图展示的是项目首页的整体视觉风格，也对应这个博客最核心的产品形态：把内容、导航、动画和主题体验整合到一个统一界面里。`,
				image: '/static/images/project/yunshen-blog.png',
				imageAlt: 'Yun Shen Blog 封面图',
			},
		],
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
	'tavily-proxy': {
		slug: 'tavily-proxy',
		title: 'TavilyProxy',
		subtitle:
			'面向 AI Agent 场景的 Tavily Search 代理与密钥池管理平台，提供统一入口、失败切换与可视化后台',
		description: `Tavily Search 是一个为 LLM / Agent 设计的实时搜索接口，适合做网页检索、事实补充、研究问答，以及 RAG 和自动化工作流中的外部信息获取。它解决的是“让模型拿到最新网页信息”这件事。

	TavilyProxy 解决的则是“如何把 Tavily 稳定接进系统”。它把多把 Tavily API Key 收口成一个统一入口，对外只暴露单一 Master Key，对内负责密钥池调度、失败切换、请求日志和后台管理，更适合长期运行的 Agent、检索流程和内部工具。`,
		overviewSections: [
			{
				title: 'TavilyProxy 首页界面预览',
				body: `这张封面图展示的是 TavilyProxy 的首页界面。项目本质上是在 Tavily Search 与实际 AI Agent 系统之间增加一层统一代理与管理平面，因此首页本身就能很好体现它“统一入口 + 后台管理”的产品定位。`,
				image: '/static/images/project/tavily-proxy.png',
				imageAlt: 'TavilyProxy 封面图',
			},
			{
				title: '先理解 Tavily Search：它适合给 Agent 提供实时外部信息',
				body: `Tavily Search 不只是普通搜索接口，更适合接进 AI 应用。它可以给 agent 提供最新网页结果，也能服务于研究型问答、RAG 补充检索、内容聚合和自动化工作流。

			  但当调用从“偶尔用一下”变成“长期运行”，工程问题就出现了：API Key 怎么管、额度怎么分配、单 Key 失效怎么办、请求记录怎么追踪。TavilyProxy 就是在这里切入。`,
			},
			{
				title: '统一入口 + 密钥池，让 Tavily 更适合长期运行',
				body: `TavilyProxy 把多个上游 Tavily API Key 收拢到同一个代理层后面。客户端只需要配置一套 Master Key，就能通过统一地址访问 Tavily，不必在业务代码里自己处理多 Key 切换、额度耗尽或失败重试。

			它会根据额度状态选择可用 Key，并在认证失败、限流或配额问题出现时自动切换，让原本脆弱的单 Key 依赖变成更适合生产使用的可调度资源池。`,
			},
			{
				title: '不只是代理，也是一块可视化运维面板',
				body: `这个项目不只负责转发请求，还提供完整的 Web 管理后台。你可以管理密钥、查看请求日志、观察额度使用情况，并处理定时维护任务。

			对个人开发者来说，它减少了手动换 Key 和排查问题的摩擦；对团队来说，它让 Tavily 的使用状态更透明，也更容易长期维护。`,
			},
			{
				title: 'MCP 接入，让它可以自然融入 Agent 工具链',
				body: `TavilyProxy 还提供 MCP endpoint，因此它不只是一个后端代理服务，也可以作为 Claude Code、VS Code 或其他 Agent runtime 里的搜索工具层。

			这意味着它既适合普通应用调用，也适合本地 AI 工作流、团队内部 Agent 平台或统一搜索中间层。这种兼顾 API 代理和 Agent 接入的设计，是它最有辨识度的亮点之一。`,
			},
		],
		features: [
			{
				title: '统一 Tavily 访问入口',
				description:
					'对外暴露单一 Master Key 与代理地址，客户端无需直接管理多把 Tavily API Key',
			},
			{
				title: '密钥池调度',
				description:
					'根据额度状态选择可用 Key，并在相近候选之间随机分配，提高整体配额利用率',
			},
			{
				title: '自动重试与失败切换',
				description:
					'当上游出现认证失败、限流或配额问题时，自动切换其他 Key 继续完成请求',
			},
			{
				title: '管理后台与日志',
				description:
					'提供 Web UI、密钥管理、请求日志、使用趋势查看与后台运维入口',
			},
			{
				title: '定时维护任务',
				description: '支持额度重置与日志清理等周期性任务，便于长期稳定运行',
			},
			{
				title: 'MCP Endpoint',
				description:
					'可作为 Claude / VS Code 等 Agent 工具链中的搜索服务层接入',
			},
		],
		techStack: [
			{ category: '后端', items: ['Go'] },
			{ category: '前端', items: ['Vue 3', 'Vite', 'TypeScript', 'Naive UI'] },
			{ category: '数据存储', items: ['SQLite'] },
			{
				category: '部署',
				items: ['Docker', 'Docker Compose', 'GHCR 镜像', 'Render Blueprint'],
			},
			{
				category: '接口能力',
				items: ['HTTP API Proxy', 'MCP Endpoint'],
			},
		],
		links: [
			{
				label: '在线体验',
				url: 'https://tavily-proxy.onrender.com/',
			},
			{
				label: 'GitHub',
				url: 'https://github.com/yunshenwuchuxun/TavilyProxy',
			},
		],
		usage: [
			'克隆仓库：git clone https://github.com/yunshenwuchuxun/TavilyProxy.git',
			'使用 Docker Compose 启动：docker-compose up -d',
			'或用 Docker 运行 GHCR 镜像并挂载 SQLite 数据目录',
			'如需本地开发，运行 Go 服务端并在 web 目录安装前端依赖后启动 Vite',
		],
		targetUsers: [
			'AI Agent 开发者 - 需要稳定接入 Tavily 搜索能力',
			'内部工具团队 - 想把多把 Tavily Key 收口成统一服务',
			'个人开发者 - 希望降低单 Key 耗尽带来的中断风险',
			'需要运维可视化的团队 - 需要查看请求日志、额度状态与后台统计',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'latex-paper-skills': {
		slug: 'latex-paper-skills',
		title: 'latex-paper-skills',
		subtitle:
			'把选题、证据、真实结果与 LaTeX PDF 串成 8 个科研工作流，完整 Skill 一次安装到 Codex 或 Claude Code',
		description: `latex-paper-skills 面向 ML/AI 论文写作，把研究规划、文献检索、综述与实证写作、结果回填、引用核验和 LaTeX 编译组织成可执行的 Agent 工作流。任务从贡献和证据开始，沿着计划与 Issues CSV 推进，最终交付论文源码、BibTeX、图表和可编译的 PDF。

	分发层将 8 个源工作流、_shared、脚本与模板打包为一个 latex-paper-skills 入口，支持 npm 安装器与 Skills CLI，也已上架 Skills.sh、ClawHub 和 LobeHub。这个完整 bundle 保留工作流之间的共享依赖，让科研工具链能够在不同 Agent 中复用。`,
		overviewSections: [
			{
				id: 'paper-pipeline',
				title: '从研究问题到论文工程，每一步都有明确产物',
				body: `paper-from-zero 组织研究起点，将主题继续拆为文献检索、创新 framing、贡献地图与证据矩阵，再分流到综述或实证路线。计划经确认后，Issues CSV 作为任务执行契约，记录研究、写作、核验与编译进度。

	交付围绕完整论文工程展开：文献笔记解释依据，BibTeX 管理核实后的引用，LaTeX 源码承载正文和图表，编译结果用于检查版式与 warning。研究者可以从中间产物继续修改和审阅。`,
				image: '/static/images/project/latex-paper-skills-pipeline.svg',
				imageAlt: 'latex-paper-skills 从选题、证据规划到 LaTeX PDF 的工作流',
			},
			{
				id: 'paper-bundle',
				title: '一个安装入口，保留 8 个工作流与共享资源',
				body: `完整 bundle 包含总路由 paper-from-zero、综述写作 arxiv-paper-writer、实证写作 empirical-paper-writer、表达优化 latex-rhythm-refiner 和真实结果回填 results-backfill。Gemini / Claude 协作与 check-collaborators 补充文献扩展、深度审查和 CLI 健康检查，共 8 个源工作流。

	安装时一并保留 _shared、脚本和模板，避免把源目录拆开后遗漏依赖。npm 安装器提供 Codex 与 Claude Code 目标选择，Skills CLI、ClawHub、LobeHub 和 Release ZIP 则为不同使用环境提供分发入口。`,
			},
			{
				id: 'paper-showcases',
				title: '两套完整 Showcase，把交付过程公开出来',
				body: `PEFT 综述示例包含研究计划、Issues、文献笔记、BibTeX 与论文 PDF。入流预测实证示例进一步公开实验代码、真实 CSV / JSON 结果、图表和论文，呈现从实验到正文的衔接过程。

	这些案例让读者可以顺着源码和产物检查工作流。实证示例的原始 ResOpsUS v2 数据因体积没有保留在仓库，完整复现需要按项目说明另行下载数据。`,
				gallery: [
					{
						image: '/static/blog/latex-paper-skills/review-paper-preview.png',
						alt: 'latex-paper-skills 的 PEFT 综述论文 PDF 预览',
						caption: 'PEFT 综述：文献与证据组织后的论文产物。',
					},
					{
						image:
							'/static/blog/latex-paper-skills/empirical-paper-preview.png',
						alt: 'latex-paper-skills 的入流预测实证论文 PDF 预览',
						caption: '入流预测实证：真实实验结果回填到论文工程。',
					},
				],
			},
			{
				id: 'paper-evidence',
				title: '用证据与结果状态约束写作',
				body: `工作流通过引用核验、claim-evidence 对应与 planned / placeholder / verified 状态，明确区分计划、占位内容和经过核实的实验结果。results-backfill 将真实结果与图表回填到既有草稿，再继续进行引用审计、来源检查和编译。

	这些机制为研究协作提供可检查的约束。真实实验、证据判断和最终论文审阅仍需要研究者完成；可选的 Gemini / Claude 协作也需要相应 CLI 已安装并完成认证。`,
				image: '/static/images/project/latex-paper-skills-gated-workflow.svg',
				imageAlt:
					'latex-paper-skills 的计划审批、任务执行、引用审计与编译检查流程',
			},
		],
		features: [
			{
				title: '综述与实证双路线',
				description:
					'根据任务进入 review paper 或 empirical paper，共享规划、引用核验与论文工程结构。',
			},
			{
				title: '完整 Skill 分发',
				description:
					'1 个入口保留 8 个源工作流、共享脚本和模板，支持 npm 与 Skills CLI 安装。',
			},
			{
				title: '证据与引用管理',
				description:
					'以文献笔记、证据矩阵、BibTeX 和引用审计连接论文中的主要判断。',
			},
			{
				title: '真实结果回填',
				description:
					'将实验结果和图表带回已有草稿，以明确状态区分 planned、placeholder 与 verified。',
			},
			{
				title: '可检查的执行过程',
				description:
					'用计划审批、Issues CSV 与 research / write / verify / compile 循环组织任务。',
			},
			{
				title: '源码到 PDF 的交付',
				description:
					'汇集正文、BibTeX 与图表，执行 LaTeX 编译和 warning review，保留后续修改入口。',
			},
		],
		techStack: [
			{
				category: '脚本与排版',
				items: ['Python 3.10+', 'LaTeX / BibTeX', 'latexmk / pdflatex'],
			},
			{
				category: '安装与分发',
				items: ['Node.js 22.20.0+', 'npm / Skills CLI', '完整 Skill bundle'],
			},
			{
				category: 'Agent Runtime',
				items: ['Codex', 'Claude Code', '可选 Gemini / Claude CLI 协作'],
			},
			{
				category: '数据与状态',
				items: ['Issues CSV', 'SQLite', 'arXiv registry / cache'],
			},
			{
				category: '科研核验',
				items: ['引用审计', 'claim-evidence 对应', '编译与 warning review'],
			},
			{
				category: '公开案例',
				items: ['PEFT 综述', '入流预测实证', 'LaTeX 源码 / 结果 / PDF'],
			},
		],
		links: [
			{
				label: '安装完整 Skill',
				url: 'https://www.npmjs.com/package/latex-paper-skills',
				primary: true,
			},
			{
				label: 'Skills.sh',
				url: 'https://skills.sh/yunshenwuchuxun/latex-paper-skills/latex-paper-skills',
			},
			{
				label: 'GitHub',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills',
			},
			{ label: '原理介绍', url: '/blog/latex-paper-skills' },
		],
		usage: [
			'用 npm 安装器或 Skills CLI 安装完整 latex-paper-skills 入口，并选择 Codex 或 Claude Code。',
			'准备 Python 3.10+；需要 PDF 时安装 pdflatex / bibtex 或 latexmk。',
			'从研究问题、贡献与证据开始，确认计划后按 Issues CSV 逐项推进。',
			'实验完成后回填真实结果，核验引用，再编译和审阅论文。',
		],
		targetUsers: [
			'AI / ML 研究者：组织选题、实验、文献与论文工程。',
			'综述作者：建立可追踪的文献与证据结构。',
			'研究团队：共享可检查、可复用的 Agent 写作工作流。',
		],
		license: 'MIT License – 可在保留版权声明的前提下自由使用、复制与分发',
	},
	'one-more-thing': {
		slug: 'one-more-thing',
		title: 'Small Tools, Real Use',
		subtitle:
			'我会把想法、需求和麻烦事，真正做成能上线、能运行、能继续迭代的小工具。',
		description: `这一页不是在讲一个完整的大项目，也不是在补作品集里的“其他项目”。它更像一组我已经亲手做出来、并且真的放到线上去跑的小东西：有的解决代理转发，有的补上管理后台，有的承担托管服务，有的只是为了把某个工作流变顺手。

		我更在意的从来不是把故事讲得多完整，而是能不能把东西做出来、接起来、跑起来。对我来说，动手能力不是一句“我会写代码”，而是面对具体问题时，能快速把接口、页面、部署、配置和使用路径一起落成一个真的可用的结果。`,
		features: [
			{
				title: '从需求到上线',
				description:
					'我会把零散的问题和想法，尽快收敛成一个能访问、能操作、能交付的在线工具。',
			},
			{
				title: '先解决，再包装',
				description:
					'这些项目大多不是为了做展示页而生，而是为了把代理、托管、管理、接入这些真实问题先解决掉。',
			},
			{
				title: '做完还要能跑',
				description:
					'我关注的不只是写出来，还包括部署、维护、入口设计和后续迭代，让它们在真实环境里持续工作。',
			},
		],
		techStack: [
			{
				category: '我会交付的东西',
				items: ['Web 工具', '管理后台', 'API 服务', '自部署应用'],
			},
			{
				category: '我常处理的问题',
				items: ['代理转发', '邮件托管', '服务管理', '开发者工具'],
			},
		],
		links: [{ label: 'Projects', url: '/projects' }],
		usage: [
			'点击下方任一项目进入在线地址',
			'如需查看实现细节，可直接进入对应 GitHub 仓库',
			'后续会逐步把占位图替换为各项目真实截图',
		],
		targetUsers: [
			'喜欢看真实上线小工具的人',
			'对个人部署和自托管服务感兴趣的开发者',
			'想快速浏览我还做过哪些实用项目的访客',
		],
		license: '各项目遵循其各自仓库中的开源许可或发布方式',
		deployedProjects: [
			{
				title: 'CLI Proxy API',
				role: 'Infra / Tooling Developer',
				summary:
					'把命令行能力封装成可调用的 HTTP API，用一个管理面板统一管理和调试 CLI 调用。',
				url: 'https://cpa.yunshen.online/management.html',
				githubUrl: 'https://github.com/router-for-me/CLIProxyAPI',
				image: '/static/images/project/CLIProxyAPI.png',
				imageAlt: 'CLI Proxy API 项目截图',
			},
			{
				title: 'grok2api',
				role: 'Backend Developer',
				summary:
					'把 Grok 能力封装成标准化 API 服务，提供管理后台进行配置与监控。',
				url: 'https://grok2api.yunshen.online/chat',
				githubUrl: 'https://github.com/chenyme/grok2api',
				image: '/static/images/project/grok2api-user.png',
				imageAlt: 'grok2api 项目截图',
			},
			{
				title: 'Cloud Mail',
				role: 'Mail / Infra Developer',
				summary: '一个可自建的 Web 邮件服务，用自己的域名和基础设施托管邮箱。',
				url: 'https://mail.niuaoao.ggff.net/',
				githubUrl: 'https://github.com/maillab/cloud-mail',
				image: '/static/images/project/cloud-mail.png',
				imageAlt: 'Cloud Mail 项目截图',
			},
			{
				title: 'Z-Image Turbo',
				role: 'Full Stack Developer',
				summary: '专注图片处理与加速的小工具，用简单界面完成批量转换和优化。',
				url: 'https://x-pi-inky-99.vercel.app/',
				githubUrl: 'https://github.com/yunshenwuchuxun/Z-Image-turbo',
				image: '/static/images/project/z-image-turbo-user.png',
				imageAlt: 'Z-Image Turbo 项目截图',
			},
			{
				title: 'Render Service Manager',
				role: 'Platform / DevOps',
				summary:
					'集中管理 Render 平台上的服务实例，一目了然地查看状态、重启和调试。',
				url: 'https://render-manager.uestc.nyc.mn/',
				githubUrl: 'https://github.com/ssfun/render-service-manager',
				image: '/static/images/project/render-service-manager-user.png',
				imageAlt: 'Render Service Manager 项目截图',
			},
			{
				title: 'cursor2api',
				role: 'Dev Tooling',
				summary:
					'把 Cursor 的能力与工作流暴露为 HTTP API，方便在脚本和其他工具里复用。',
				url: 'http://62.234.31.111:3010',
				githubUrl: 'https://github.com/7836246/cursor2api',
			},
		],
	},
};
