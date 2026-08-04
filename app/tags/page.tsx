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
		tags: ['AI', 'Agent', 'Tooling', 'LangGraph'],
	},
	{
		title: 'LLM & RAG',
		description:
			'LLM applications, retrieval pipelines, and adaptation methods.',
		tags: ['LLM', 'RAG', 'SFT'],
	},
	{
		title: 'Model & Training',
		description:
			'Architecture, tokenization, training recipes, RL, and evaluation.',
		tags: ['Transformer', 'Tokenizer', 'Training', 'RL', 'Evaluation'],
	},
	{
		title: 'Systems & Platform',
		description:
			'GPU kernels, inference performance, infrastructure, and deployment.',
		tags: ['GPU', 'Infra'],
	},
	{
		title: 'Research & Notes',
		description: 'Paper reading, tech notes, and core deep learning domains.',
		tags: ['Paper', 'DL', 'CV', 'NLP', 'Tech Blog'],
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
