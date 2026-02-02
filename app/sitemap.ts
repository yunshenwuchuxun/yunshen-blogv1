import { getPosts } from './blog/utils';

export const baseUrl = 'https://uestc.de5.net';

export default async function sitemap() {
	const blogs = getPosts().map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const routes = ['', 'blog', 'projects', 'about', 'tags'].map((route) => ({
		url: `${baseUrl}/${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...blogs];
}
