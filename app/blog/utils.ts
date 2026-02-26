import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { components } from '../components/mdx';

export interface BlogPost {
	metadata: Metadata;
	slug: string;
	content: string;
}

type Metadata = {
	title: string;
	publishedAt: string;
	summary: string;
	draft: boolean;
	image?: string;
	tags?: string[];
};

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match?.[1];
	const content = fileContent.replace(frontmatterRegex, '').trim();
	const frontMatterLines = frontMatterBlock?.trim().split('\n');
	const metadata: Partial<Metadata> = {};

	frontMatterLines?.forEach((line) => {
		const separatorIndex = line.indexOf(':');
		if (separatorIndex === -1) return;

		const key = line.slice(0, separatorIndex).trim();
		const value = line.slice(separatorIndex + 1).trim();

		if (key === 'tags') {
			if (value.startsWith('[') && value.endsWith(']')) {
				const inner = value.slice(1, -1).trim();
				const rawTags = inner
					? inner.split(',').map((t) => {
							const trimmed = t.trim();
							return trimmed.replace(/^["']|["']$/g, '');
						})
					: [];
				metadata.tags = rawTags
					.map((t) => t.trim())
					.filter((t) => t.length > 0)
					.filter((t, i, arr) => arr.indexOf(t) === i);
			}
		} else if (key === 'draft') {
			metadata.draft = value === 'true';
		} else if (
			key === 'title' ||
			key === 'publishedAt' ||
			key === 'summary' ||
			key === 'image'
		) {
			metadata[key] = value.replace(/^["']|["']$/g, '');
		}
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, 'utf-8');
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

export function getPosts(): BlogPost[] {
	const posts = getMDXData(path.join(process.cwd(), 'app/blog/posts'));

	return posts
		.filter((post) => !post.metadata.draft)
		.sort((a, b) => {
			return (
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
			);
		});
}

export function getAllTags(): Array<{ tag: string; count: number }> {
	const posts = getPosts();
	const tagMap = new Map<string, number>();

	for (const post of posts) {
		const tags = post.metadata.tags;
		if (tags && Array.isArray(tags)) {
			for (const tag of tags) {
				tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
			}
		}
	}

	return Array.from(tagMap.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => {
			if (b.count !== a.count) return b.count - a.count;
			return a.tag.localeCompare(b.tag);
		});
}

export function getPostsByTag(tag: string): BlogPost[] {
	return getPosts().filter((post) => post.metadata.tags?.includes(tag));
}

export function formatDate(date: string, includeRelative = false) {
	const currentDate = new Date();
	if (!date.includes('T')) {
		date = `${date}T00:00:00`;
	}
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = '';

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${yearsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = 'Today';
	}

	const fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${formattedDate})`;
}

export async function getPostFromSlug(slug: string) {
	const source = await fs.promises.readFile(
		path.join(process.cwd(), 'app/blog/posts', `${slug}.mdx`),
		'utf-8',
	);

	const { content, frontmatter } = await compileMDX<Metadata>({
		source,
		options: {
			parseFrontmatter: true,
			scope: {},
			mdxOptions: {
				remarkPlugins: [remarkGfm, remarkMath],
				rehypePlugins: [
					rehypeKatex,
					[
						rehypePrettyCode,
						{
							theme: 'dracula',
						},
					],
				],
				format: 'mdx',
			},
		},
		components: components,
	});

	return {
		metadata: frontmatter,
		content,
	};
}
