import { getPosts } from '../blog/utils';
import { absoluteUrl, siteUrl } from '../lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
	const entities: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&apos;',
	};
	return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export function GET() {
	const posts = getPosts();
	const items = posts.map((post) => {
		const link = escapeXml(
			absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`),
		);
		const publishedAt = new Date(post.metadata.publishedAt);
		const publicationDate = Number.isNaN(publishedAt.getTime())
			? ''
			: `<pubDate>${publishedAt.toUTCString()}</pubDate>`;
		const categories = (post.metadata.tags ?? [])
			.map((tag) => `<category>${escapeXml(tag)}</category>`)
			.join('');

		return `<item>
<title>${escapeXml(post.metadata.title)}</title>
<link>${link}</link>
<guid isPermaLink="true">${link}</guid>
<description>${escapeXml(post.metadata.summary)}</description>
${publicationDate}
${categories}
</item>`;
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Yun Shen</title>
<link>${escapeXml(`${siteUrl}/`)}</link>
<description>Yun Shen 的技术博客与项目实践</description>
<language>zh-cn</language>
<atom:link href="${escapeXml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml" />
${items.join('\n')}
</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
		},
	});
}
