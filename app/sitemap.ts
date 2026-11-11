import type { MetadataRoute } from 'next';
import { getAllTags, getPosts } from './blog/utils';
import { absoluteUrl } from './lib/site';
import { projectDetails, projects } from './projects/constants';

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ['/', '/blog', '/projects', '/about', '/tags'];
	const projectPages = projects.flatMap((project) =>
		project.slug && projectDetails[project.slug]
			? [`/projects/${encodeURIComponent(project.slug)}`]
			: [],
	);
	const tagPages = getAllTags().map(
		({ tag }) => `/tags/${encodeURIComponent(tag)}`,
	);
	const blogPages = getPosts().map(
		(post) => `/blog/${encodeURIComponent(post.slug)}`,
	);

	// Omit lastModified until a reliable content-update date is maintained.
	return [
		...new Set([...routes, ...projectPages, ...tagPages, ...blogPages]),
	].map((path) => ({ url: absoluteUrl(path) }));
}
