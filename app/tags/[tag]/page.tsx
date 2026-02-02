import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '../../blog/utils';
import Header from '../../components/header';
import BackNavigation from '../../components/layouts/back-navigation';
import PageContainer from '../../components/layouts/page-container';
import { Thoughts } from '../../components/thoughts';

export function generateStaticParams() {
	const tags = getAllTags();
	return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata(props: {
	params: Promise<{ tag: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const tag = decodeURIComponent(params.tag);

	return {
		title: `${tag} - Tags`,
		description: `Articles tagged with ${tag} - Yun Shen`,
	};
}

export default async function TagPage(props: {
	params: Promise<{ tag: string }>;
}) {
	const params = await props.params;
	const tag = decodeURIComponent(params.tag);
	const posts = getPostsByTag(tag);

	if (posts.length === 0) {
		notFound();
	}

	return (
		<PageContainer>
			<BackNavigation href='/tags' />
			<Header title={tag} />
			<div className='space-y-6'>
				<p className='text-lg text-gray-500 dark:text-gray-400'>
					{posts.length} {posts.length === 1 ? 'article' : 'articles'} tagged
					with <span className='text-primary-500 font-medium'>{tag}</span>
				</p>
				<Thoughts posts={posts} />
			</div>
		</PageContainer>
	);
}
