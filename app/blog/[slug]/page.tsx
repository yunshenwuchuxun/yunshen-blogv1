import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import BackNavigation from '../../components/layouts/back-navigation';
import { createPageMetadata } from '../../lib/seo';
import { absoluteUrl } from '../../lib/site';
import { formatDate, getPostFromSlug, getPosts } from '../utils';
import PageTitle from './page-title';

const getPublishedPost = cache(async (slug: string) => {
	if (!getPosts().some((post) => post.slug === slug)) {
		notFound();
	}
	return getPostFromSlug(slug);
});

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const { metadata } = await getPublishedPost(params.slug);

	const path = `/blog/${encodeURIComponent(params.slug)}`;
	const url = absoluteUrl(path);
	const ogImage = metadata.image || '/static/og-image.png';
	const pageMetadata = createPageMetadata({
		path,
		title: metadata.title,
		description: metadata.summary,
	});

	return {
		...pageMetadata,
		openGraph: {
			...pageMetadata.openGraph,
			title: metadata.title,
			description: metadata.summary,
			type: 'article',
			url: url,
			publishedTime: metadata.publishedAt,
			authors: ['Yun Shen'],
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: metadata.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: metadata.title,
			description: metadata.summary,
			images: [ogImage],
		},
		alternates: {
			canonical: url,
		},
	};
}

export default async function Blog(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;

	const { metadata, content } = await getPublishedPost(params.slug);

	return (
		<>
			<section>
				<BackNavigation />
				<PageTitle>{metadata.title}</PageTitle>
				<div className='flex justify-between items-center mt-2 text-sm'>
					<p className='text-sm text-neutral-600 dark:text-neutral-400'>
						{formatDate(metadata.publishedAt)}
					</p>
				</div>
				{metadata.image ? (
					<img
						src={metadata.image}
						alt={metadata.title}
						className='mt-6 w-full rounded-2xl border border-neutral-200 dark:border-neutral-800'
					/>
				) : null}
			</section>
			<article className='md:max-w-5xl'>{content}</article>
		</>
	);
}
