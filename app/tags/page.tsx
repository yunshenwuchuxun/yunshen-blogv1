import { getAllTags, getPosts } from '../blog/utils';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { TagCloud } from '../components/tag-cloud';

export const metadata = {
	title: 'Tags',
	description: 'Browse articles by topic - Yun Shen',
};

const TOPIC_GROUPS = [
	{
		title: 'AI Engineering',
		description: 'Agents, orchestration, tooling, and workflow-oriented posts.',
		tags: [
			'AI',
			'Agent',
			'Tooling',
			'Engineering',
			'SystemDesign',
			'CallChain',
			'LangGraph',
			'Orchestration',
			'PokemonChat',
		],
	},
	{
		title: 'LLM & RAG',
		description:
			'LLM applications, retrieval pipelines, and adaptation methods.',
		tags: ['LLM', 'SFT', 'RAG', 'Retrieval', 'LoRA', 'PEFT'],
	},
	{
		title: 'Model & Training',
		description:
			'Architecture, tokenization, pre-training recipes, and optimizers.',
		tags: [
			'Transformer',
			'MoE',
			'Tokenizer',
			'BPE',
			'BBPE',
			'Pre-training',
			'Scaling Laws',
			'Data Engineering',
			'Distributed Training',
			'Optimizer',
			'Adam',
			'AdamW',
		],
	},
	{
		title: 'RL & Alignment',
		description:
			'Preference alignment and reinforcement learning for reasoning models.',
		tags: [
			'RLHF',
			'DPO',
			'PPO',
			'GRPO',
			'RLVR',
			'Reinforcement Learning',
			'RL',
			'Policy Gradient',
			'MDP',
			'DeepSeek-R1',
		],
	},
	{
		title: 'Systems & Platform',
		description:
			'Inference performance, GPU kernels, infrastructure, and deployment.',
		tags: [
			'Inference',
			'GPU',
			'Triton',
			'PyTorch',
			'Linux',
			'Infra',
			'Infrastructure',
			'Docker',
			'DevOps',
			'Config',
			'Runtime',
		],
	},
	{
		title: 'Research & Notes',
		description: 'Paper reading, tech notes, and evaluation across DL domains.',
		tags: [
			'Paper',
			'Paper Reading',
			'Tech Blog',
			'DL',
			'Deep Learning',
			'CV',
			'NLP',
			'GenAI',
			'Evaluation',
			'Benchmark',
		],
	},
] as const;

export default function TagsPage() {
	const posts = getPosts();
	const postCount = posts.length;
	const tags = getAllTags();
	const tagMap = new Map(tags.map((item) => [item.tag, item]));

	const groupedTags = TOPIC_GROUPS.map((group) => ({
		...group,
		tags: group.tags
			.map((tag) => tagMap.get(tag))
			.filter((tag): tag is { tag: string; count: number } => Boolean(tag)),
	})).filter((group) => group.tags.length > 0);

	const usedTags = new Set(
		groupedTags.flatMap((group) => group.tags.map(({ tag }) => tag)),
	);
	const uncategorizedTags = tags.filter(({ tag }) => !usedTags.has(tag));

	return (
		<PageContainer>
			<Header title='Tags' />
			<div className='space-y-10'>
				<p className='text-sm text-gray-500 dark:text-gray-400'>
					{postCount} blog posts
				</p>
				{groupedTags.map((group) => (
					<section key={group.title} className='space-y-3'>
						<div className='space-y-1'>
							<h2 className='text-xl font-medium text-black dark:text-white'>
								{group.title}
							</h2>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								{group.description}
							</p>
						</div>
						<TagCloud tags={group.tags} showCount />
					</section>
				))}

				{uncategorizedTags.length > 0 && (
					<section className='space-y-3'>
						<div className='space-y-1'>
							<h2 className='text-xl font-medium text-black dark:text-white'>
								未分类
							</h2>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								保留给暂未纳入主题体系的标签。
							</p>
						</div>
						<TagCloud tags={uncategorizedTags} showCount />
					</section>
				)}
			</div>
		</PageContainer>
	);
}
