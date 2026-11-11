export interface ProjectShowcase {
	metrics: { value: string; label: string; url: string; context: string }[];
	dataNote: string;
	advantages: { title: string; description: string }[];
	listings: { label: string; url: string }[];
}

// Public source snapshots. Keep the date and measurement scope with each metric.
export const projectShowcases: Record<string, ProjectShowcase> = {
	'smart-drawio': {
		metrics: [
			{
				value: '366',
				label: 'GitHub Stars',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next',
				context: 'GitHub 公开仓库数据：366 Stars，核验于 2026-11-11',
			},
			{
				value: '48',
				label: 'GitHub Forks',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/forks',
				context: 'GitHub 公开仓库数据：48 Forks，核验于 2026-11-11',
			},
			{
				value: '5',
				label: 'MCP Tools',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/blob/main/packages/mcp/README.md',
				context:
					'生成、校验、保守修复、样式处理与选项发现；local stdio MCP v0.1.0',
			},
		],
		dataNote:
			'公开数据快照 · 2026.11.11 · MCP npm 包累计 188 次下载（截至 11.10，非独立用户数）',
		advantages: [
			{
				title: '三种入口，同一份可编辑图表',
				description:
					'Web 与 MCP 共享绘图核心，独立 Skill 复用 Agent 模型；三种入口都围绕可编辑的 Draw.io XML 组织生成、编辑与处理。',
			},
			{
				title: '把图表当作工程对象',
				description:
					'结构校验覆盖 ID、parent 与引用，配合保守修复、布局整理和样式包，让生成后的图表可以继续检查与迭代。',
			},
			{
				title: '按任务组合模型与本地工具',
				description:
					'Skill 复用 Agent 的模型；MCP 的校验、修复、样式和选项查询在本地运行，生成工具再按需调用配置的模型 API。',
			},
		],
		listings: [
			{
				label: 'MCP Registry',
				url: 'https://registry.modelcontextprotocol.io/v0.1/servers/io.github.yunshenwuchuxun%2Fsmart-drawio/versions/0.1.0',
			},
			{
				label: 'npm · MCP Server',
				url: 'https://www.npmjs.com/package/@yunshenwuchuxun/smart-drawio-mcp',
			},
			{
				label: 'Skill & MCP Release',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/releases/tag/tools-v0.1.0',
			},
		],
	},
	'latex-paper-skills': {
		metrics: [
			{
				value: '275',
				label: 'GitHub Stars',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills',
				context: 'GitHub 公开仓库数据：275 Stars、23 Forks，核验于 2026-11-11',
			},
			{
				value: '1.0k+',
				label: 'npm 累计下载',
				url: 'https://api.npmjs.org/downloads/point/2026-01-01:2026-11-10/latex-paper-skills',
				context:
					'安装器自 2026-10-14 发布，截至 11-10 累计 1,021 次包下载，非独立用户数',
			},
			{
				value: '8',
				label: '完整科研工作流',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills/blob/main/README.zh-CN.md',
				context: '1 个完整 Skill 入口包含 8 个源工作流，以及共享脚本和模板',
			},
		],
		dataNote:
			'公开数据快照 · 2026.11.11 · npm 累计至 11.10 · GitHub 同期 23 Forks',
		advantages: [
			{
				title: '把研究过程做成工作流',
				description:
					'用计划审批、Issues CSV 和结果状态组织任务，把贡献、证据、实验、引用与编译放在同一个可追踪的论文工程中。',
			},
			{
				title: '一次安装，保留共享依赖',
				description:
					'完整 bundle 同时分发 8 个工作流、_shared、脚本和模板，减少拆开安装源目录造成的依赖缺失，支持 Codex 与 Claude Code。',
			},
			{
				title: '用完整案例呈现交付',
				description:
					'公开 PEFT 综述与入流预测实证两套案例，展示计划、文献、真实结果、BibTeX、LaTeX 源码和 PDF 如何衔接。',
			},
		],
		listings: [
			{
				label: 'Skills.sh',
				url: 'https://skills.sh/yunshenwuchuxun/latex-paper-skills/latex-paper-skills',
			},
			{
				label: 'npm · Skill 安装器',
				url: 'https://www.npmjs.com/package/latex-paper-skills',
			},
			{
				label: 'ClawHub',
				url: 'https://clawhub.ai/yunshenwuchuxun/plugins/latex-paper-skills',
			},
			{
				label: 'LobeHub',
				url: 'https://lobehub.com/skills/yunshenwuchuxun-latex-paper-skills',
			},
		],
	},
	'ofox-desktop': {
		metrics: [
			{
				value: '10',
				label: 'AI 工具接入',
				url: 'https://ofox.ai/zh/desktop',
				context:
					'v1.5.0 支持矩阵：含 Claude Code、Codex、OpenCode、Gemini CLI 等工具',
			},
			{
				value: '2',
				label: '桌面平台',
				url: 'https://ofox.ai/zh/desktop#desktop-install',
				context: 'macOS Apple Silicon 与 Windows x64',
			},
			{
				value: '3',
				label: '资源统一分发',
				url: 'https://github.com/ofoxai/ofox-desktop/blob/main/docs/library-workbench.md',
				context: '指令、MCP、Skills；各客户端支持范围见项目文档',
			},
		],
		dataNote: '产品能力依据官网 v1.5.0 · 核验于 2026.11.10',
		advantages: [
			{
				title: '打通多工具配置',
				description:
					'自动发现客户端、管理工具专属 Key、写入原生配置，把冲突检查和变更预览放进接入流程。',
			},
			{
				title: '连接工作上下文',
				description:
					'跨工具整理本地会话，按来源能力搜索、导出与续聊；指令、MCP 和 Skills 集中维护、按需分发。',
			},
			{
				title: '交付完整产品体验',
				description:
					'从双平台安装、更新到多模态助手、用量分析，把原生集成和日常交互一起打磨到可用。',
			},
		],
		listings: [],
	},
	'ofox-skills': {
		metrics: [
			{
				value: '1.9k+',
				label: 'npm 累计下载',
				url: 'https://api.npmjs.org/downloads/point/2026-09-01:2026-11-09/ofox-skills',
				context: 'ofox-skills 安装器：截至 2026-11-09 累计 1,922 次包下载',
			},
			{
				value: '420',
				label: 'Skills.sh 累计安装',
				url: 'https://skills.sh/ofoxai/skills',
				context: 'Skills.sh 仓库目录显示的累计安装数，核验于 2026-11-10',
			},
			{
				value: '3',
				label: '技能平台收录',
				url: 'https://ofox.ai/docs/integrations/claude-code/skills',
				context:
					'Skills.sh、ClawHub、Skills Directory 均有公开技能条目；见下方收录链接',
			},
		],
		dataNote: '公开数据快照 · 2026.11.10（npm 累计至 11.09）',
		advantages: [
			{
				title: '从场景编排到交付',
				description:
					'把创作 brief、参数校验、执行和结果保存连成工作流，场景技能共享稳定的图片与视频执行层。',
			},
			{
				title: '费用与结果可追踪',
				description:
					'dry-run 先估价再执行；视频附任务、提示词、参数和实际费用记录，让创作过程可以回看。',
			},
			{
				title: '解决跨 Agent 分发',
				description:
					'完整安装同步场景与 core 依赖，doctor 检查技能是否可见，减少“装了但用不了”的断点。',
			},
		],
		listings: [
			{ label: 'Skills.sh', url: 'https://skills.sh/ofoxai/skills' },
			{
				label: 'ClawHub',
				url: 'https://clawhub.ai/ofoxai/skills/seedance-product-video',
			},
			{
				label: 'Skills Directory',
				url: 'https://www.skillsdirectory.com/authors/ofoxai',
			},
		],
	},
};
