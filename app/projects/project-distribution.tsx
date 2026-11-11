interface DistributionMethod {
	title: string;
	description: string;
	code?: string;
	codeLabel?: string;
	note: string;
	url: string;
	linkLabel: string;
	wide?: boolean;
}

interface Distribution {
	title: string;
	intro: string;
	methods: DistributionMethod[];
	resources: { label: string; url: string }[];
}

const distributions: Partial<Record<string, Distribution>> = {
	'smart-drawio': {
		title: '从 Web 到 Agent，选择适合任务的入口',
		intro:
			'可以先在浏览器里体验，再把绘图能力接到日常使用的 Agent。Skill 与 MCP 均有固定版本发布，接入说明和示例随源码一起维护。',
		methods: [
			{
				title: 'Web · 在线绘图工作台',
				description:
					'输入描述或参考图片，流式生成后在 Monaco 与 Draw.io 中继续编辑，再应用布局、文本与样式工具。',
				note: '模型配置保存在浏览器本地；自行托管可使用 Docker / Docker Compose。',
				url: 'https://smart-drawio-next.vercel.app/',
				linkLabel: '打开在线体验',
			},
			{
				title: 'Skill · 复用 Agent 的模型能力',
				description:
					'通过 Skills CLI 安装独立 smart-drawio Skill，在任务中使用 $smart-drawio 调用绘图流程。',
				codeLabel: 'Skills CLI · tools-v0.1.0',
				code: 'npx skills add https://github.com/yunshenwuchuxun/smart-drawio-next/tree/tools-v0.1.0/skills/smart-drawio',
				note: '离线 validator 需要 Python 3，无第三方 Python 依赖；MCP 为可选接入。',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/blob/main/docs/skill-installation.md',
				linkLabel: '查看 Skill 安装说明',
			},
			{
				title: 'MCP · 将图表处理组合进工具调用',
				description:
					'为支持 local stdio 的客户端配置 npm server。5 个工具覆盖 generate_drawio、validate_drawio、repair_drawio、style_drawio 与 list_drawio_options。',
				codeLabel: 'MCP 配置示例 · v0.1.0',
				code: `{
  "mcpServers": {
    "smart-drawio": {
      "command": "npx",
      "args": ["-y", "@yunshenwuchuxun/smart-drawio-mcp@0.1.0"]
    }
  }
}`,
				note: '需要 Node.js 20.9+。仅 generate_drawio 需要配置模型 provider、base URL、API Key 和 model；其余 4 个工具在本地运行。具体配置位置以所用客户端及 MCP README 为准。',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/blob/main/packages/mcp/README.md',
				linkLabel: '查看 MCP 配置与工具参数',
				wide: true,
			},
		],
		resources: [
			{
				label: 'README 与完整功能',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/blob/main/README.md',
			},
			{
				label: '版本、示例与校验和',
				url: 'https://github.com/yunshenwuchuxun/smart-drawio-next/releases/tag/tools-v0.1.0',
			},
			{
				label: 'npm 下载数据',
				url: 'https://api.npmjs.org/downloads/point/2025-01-01:2026-11-10/@yunshenwuchuxun%2Fsmart-drawio-mcp',
			},
		],
	},
	'latex-paper-skills': {
		title: '安装完整 Skill，沿着研究任务继续工作',
		intro:
			'以下示例安装到当前项目的 Codex，目标可以按 README 改为 Claude Code。完整入口保留 8 个源工作流与共享资源，安装后从研究问题开始，确认计划，再推进写作与核验。',
		methods: [
			{
				title: 'Skills.sh · Skills CLI 安装',
				description:
					'通过已收录的 latex-paper-skills 入口安装完整 bundle，保留共享脚本与模板。',
				codeLabel: 'Skills CLI · Codex 当前项目',
				code: 'npx skills@latest add yunshenwuchuxun/latex-paper-skills --skill latex-paper-skills --agent codex --copy --yes',
				note: '完整 bundle 包含总路由、综述、实证、润色、结果回填及协作工作流。',
				url: 'https://skills.sh/yunshenwuchuxun/latex-paper-skills/latex-paper-skills',
				linkLabel: '在 Skills.sh 查看',
			},
			{
				title: 'npm · 一条命令安装',
				description:
					'使用已发布的安装器选择 Agent 目标；npm 包没有安装生命周期脚本。',
				codeLabel: 'npm 安装器 · 当前版本 0.1.0',
				code: 'npx latex-paper-skills@latest --agent codex --copy --yes',
				note: '安装器需要 Node.js 22.20.0+，论文脚本需要 Python 3.10+；编译 PDF 还需 pdflatex + bibtex 或 latexmk。',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills/blob/main/distribution/README.md',
				linkLabel: '查看安装目标与分发说明',
			},
		],
		resources: [
			{
				label: 'README 与完整流程',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills/blob/main/README.zh-CN.md',
			},
			{
				label: 'PEFT 综述 PDF',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills/blob/main/projects/peft-survey-2022-2026/main.pdf',
			},
			{
				label: '实证论文 PDF',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills/blob/main/projects/rt-inflow-forecast-closed-loop/paper/main.pdf',
			},
			{
				label: 'Release ZIP',
				url: 'https://github.com/yunshenwuchuxun/latex-paper-skills/releases/tag/v0.1.0',
			},
		],
	},
};

export function ProjectDistribution({ slug }: { slug: string }) {
	const distribution = distributions[slug];
	if (!distribution) return null;

	return (
		<section id='project-access' className='scroll-mt-28 space-y-6'>
			<h2 className='text-2xl font-semibold'>{distribution.title}</h2>
			<p className='text-sm leading-7 text-gray-600 dark:text-gray-400'>
				{distribution.intro}
			</p>
			<div className='grid gap-4 md:grid-cols-2'>
				{distribution.methods.map((method) => (
					<div
						key={method.title}
						className={`min-w-0 space-y-4 rounded-lg border border-gray-200 p-5 dark:border-gray-700 ${method.wide ? 'md:col-span-2' : ''}`}
					>
						<h3 className='text-lg font-semibold text-primary-500'>
							{method.title}
						</h3>
						<p className='text-sm leading-7 text-gray-600 dark:text-gray-400'>
							{method.description}
						</p>
						{method.code ? (
							<figure className='space-y-2'>
								<figcaption className='text-xs text-gray-500 dark:text-gray-400'>
									{method.codeLabel}
								</figcaption>
								<pre className='overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs leading-6 text-gray-800 dark:bg-gray-900 dark:text-gray-200'>
									<code>{method.code}</code>
								</pre>
							</figure>
						) : null}
						<p className='text-xs leading-6 text-gray-500 dark:text-gray-400'>
							{method.note}
						</p>
						<a
							href={method.url}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:underline'
						>
							{method.linkLabel} <span aria-hidden='true'>↗</span>
						</a>
					</div>
				))}
			</div>
			<div className='flex flex-wrap gap-3 text-sm'>
				{distribution.resources.map((resource) => (
					<a
						key={resource.url}
						href={resource.url}
						target='_blank'
						rel='noopener noreferrer'
						className='rounded-full border border-gray-200 px-3 py-2 text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-500 dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400'
					>
						{resource.label} <span aria-hidden='true'>↗</span>
					</a>
				))}
			</div>
		</section>
	);
}
