import Image from 'next/image';

const readmeUrl =
	'https://github.com/ofoxai/ofox-desktop/blob/main/README.zh-CN.md';

const chapters = [
	['desktop-connect', '一键接入'],
	['desktop-sessions', '会话管理'],
	['desktop-library', '资源分发'],
	['desktop-assistant', '对话与创作'],
	['desktop-recovery', '配置诊断'],
	['desktop-usage', '用量分析'],
] as const;

export function DesktopIntroduction() {
	return (
		<div className='space-y-6'>
			<p className='text-base leading-8 text-gray-600 dark:text-gray-400'>
				把多工具协作中反复配置、切换上下文和整理资源的成本，收进一个日常可用的桌面产品。
				从接入到继续工作，再到创作与用量回看，每个入口都有明确的下一步。
			</p>
			<figure className='space-y-3'>
				<div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
					<Image
						src='/static/images/project/ofox-desktop.webp'
						alt='Ofox Desktop 工具总览，集中展示本机 AI 客户端、接入状态与模型配置'
						width={1440}
						height={900}
						sizes='(min-width: 1024px) 880px, 90vw'
						style={{ width: '100%', height: 'auto' }}
						loading='eager'
					/>
				</div>
				<figcaption className='text-xs leading-6 text-gray-500 dark:text-gray-400'>
					本页配图与视频来自{' '}
					<a
						href={readmeUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='text-primary-500 hover:underline'
					>
						官方 README
					</a>
					，展示真实应用组件，使用示例会话与用量数据。
				</figcaption>
			</figure>
			<nav aria-label='产品体验章节' className='flex flex-wrap gap-3'>
				{chapters.map(([id, label]) => (
					<a
						key={id}
						href={`#${id}`}
						className='rounded-full border border-gray-200 px-3 py-2 text-sm text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-500 dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400'
					>
						{label}
					</a>
				))}
			</nav>
		</div>
	);
}

const tools = [
	['Claude Code', '阅读 / 导出 / 续聊', '支持安装与更新'],
	['Codex', '阅读 / 导出 / 续聊', '支持安装与更新'],
	['ChatGPT（Codex 模式）', '与 Codex 共用本地记录', '安装 / 原生更新'],
	['OpenCode', '阅读 / 导出 / 续聊', '支持安装与更新'],
	['OpenClaw', '阅读 / 导出', '支持安装与更新'],
	['Hermes', '阅读 / 导出 / 续聊', '支持安装与更新'],
	['Gemini CLI', '阅读 / 导出 / 续聊', '支持安装与更新'],
	['WorkBuddy', '阅读 / 导出', '官网安装 / 应用内更新'],
	['DeepSeek Harness（dsh）', '会话列表', '支持安装与更新'],
	['Pi', '阅读 / 导出 / 续聊', '支持安装与更新'],
] as const;

export function DesktopCompatibility() {
	return (
		<section className='space-y-6'>
			<h2 className='text-2xl font-semibold'>围绕常用 AI 工具构建</h2>
			<p className='text-sm leading-7 text-gray-600 dark:text-gray-400'>
				v1.5.0 的十个受支持工具均可接入 Ofox，并提供用量、MCP 与 Skills 支持。
				会话和安装能力按工具区分，沿用各自原生格式与运行方式。
			</p>
			<div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
				<table className='w-full min-w-[580px] text-left text-sm'>
					<caption className='sr-only'>
						Ofox Desktop v1.5.0 工具支持矩阵
					</caption>
					<thead className='border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'>
						<tr>
							<th scope='col' className='px-4 py-3 font-medium'>
								工具
							</th>
							<th scope='col' className='px-4 py-3 font-medium'>
								会话能力
							</th>
							<th scope='col' className='px-4 py-3 font-medium'>
								安装与更新
							</th>
						</tr>
					</thead>
					<tbody>
						{tools.map(([name, sessions, installation]) => (
							<tr
								key={name}
								className='border-b border-gray-200 last:border-b-0 dark:border-gray-700'
							>
								<th scope='row' className='px-4 py-3 font-medium'>
									{name}
								</th>
								<td className='px-4 py-3 text-gray-600 dark:text-gray-400'>
									{sessions}
								</td>
								<td className='px-4 py-3 text-gray-600 dark:text-gray-400'>
									{installation}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className='text-xs leading-6 text-gray-500 dark:text-gray-400'>
				ChatGPT 普通云端聊天不在接入范围内；dsh 需 0.2+ 并完成首次初始化。
				指令分发支持 Claude Code、Codex、Gemini CLI、OpenCode 与 Hermes。
				具体能力以{' '}
				<a
					href={`${readmeUrl}#compatibility`}
					target='_blank'
					rel='noopener noreferrer'
					className='text-primary-500 hover:underline'
				>
					官方支持矩阵
				</a>
				为准。
			</p>
		</section>
	);
}

const steps = [
	{
		title: '下载并打开客户端',
		description:
			'选择对应平台的安装包。已有 AI 工具可以继续使用，未安装的工具再选择受支持的安装方式。',
	},
	{
		title: '登录并选择工具',
		description:
			'登录 Ofox 账号，从自动检测结果中选择需要接入的客户端；也可先使用受支持的本地管理功能。',
	},
	{
		title: '一键接入，查看逐项结果',
		description:
			'为选中的工具配置接入，检查成功、冲突或失败提示，再按需选择模型与补充 MCP、Skills。',
	},
	{
		title: '沿着项目继续工作',
		description:
			'在会话中找回上下文，在助手中对话与创作，在用量页面查看项目消耗和请求记录。',
	},
];

export function DesktopGettingStarted() {
	return (
		<>
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold'>下载与开始使用</h2>
				<div className='grid gap-4 sm:grid-cols-2'>
					{[
						['macOS', 'Apple Silicon · macOS 12+ · .dmg'],
						['Windows', 'x64 · Windows 10 / 11 · .exe'],
					].map(([platform, requirements]) => (
						<a
							key={platform}
							href='https://ofox.ai/zh/desktop#desktop-install'
							target='_blank'
							rel='noopener noreferrer'
							className='rounded-lg border border-gray-200 p-5 transition-colors hover:border-primary-400 dark:border-gray-700 dark:hover:border-primary-500'
						>
							<span className='font-semibold text-primary-500'>
								下载 {platform} 版 ↗
							</span>
							<p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
								{requirements}
							</p>
						</a>
					))}
				</div>
				<ol className='grid gap-4 sm:grid-cols-2'>
					{steps.map((step, index) => (
						<li
							key={step.title}
							className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'
						>
							<h3 className='mb-2 font-semibold'>
								<span className='mr-2 text-primary-500'>0{index + 1}</span>
								{step.title}
							</h3>
							<p className='text-sm leading-7 text-gray-600 dark:text-gray-400'>
								{step.description}
							</p>
						</li>
					))}
				</ol>
				<p className='text-sm leading-7 text-gray-600 dark:text-gray-400'>
					桌面客户端以 MIT 协议开源，模型服务与媒体生成按所选服务计费。
					安装包与更新记录也可在{' '}
					<a
						href='https://github.com/ofoxai/ofox-desktop/releases/latest'
						target='_blank'
						rel='noopener noreferrer'
						className='text-primary-500 hover:underline'
					>
						GitHub Releases
					</a>
					查看。
				</p>
			</section>
			<section className='space-y-4'>
				<h2 className='text-2xl font-semibold'>项目资料</h2>
				<div className='flex flex-wrap gap-3 text-sm'>
					{[
						['README 与功能演示', readmeUrl],
						[
							'原生配置与数据来源',
							'https://github.com/ofoxai/ofox-desktop/blob/main/docs/agent-wiring.md',
						],
						[
							'资源分发设计',
							'https://github.com/ofoxai/ofox-desktop/blob/main/docs/library-workbench.md',
						],
						[
							'用量统计口径',
							'https://github.com/ofoxai/ofox-desktop/blob/main/docs/usage-analytics-contract.md',
						],
					].map(([label, url]) => (
						<a
							key={url}
							href={url}
							target='_blank'
							rel='noopener noreferrer'
							className='rounded-full border border-gray-200 px-3 py-2 text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-500 dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400'
						>
							{label} ↗
						</a>
					))}
				</div>
			</section>
		</>
	);
}
