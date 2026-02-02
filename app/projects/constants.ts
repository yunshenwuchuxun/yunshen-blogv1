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
};
