import { NextResponse } from 'next/server';
import { getPosts } from '../../blog/utils';

export async function GET() {
	const posts = getPosts().map((post) => ({
		title: post.metadata.title,
		summary: post.metadata.summary,
		tags: post.metadata.tags ?? [],
		publishedAt: post.metadata.publishedAt,
		slug: post.slug,
	}));

	return NextResponse.json(
		{ posts },
		{
			headers: {
				'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
			},
		},
	);
}
