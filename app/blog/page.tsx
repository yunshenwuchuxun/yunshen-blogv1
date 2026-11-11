import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { Thoughts } from '../components/thoughts';
import { createPageMetadata } from '../lib/seo';
import { getPosts } from './utils';

export const metadata = createPageMetadata({
	path: '/blog',
	title: 'Blog',
	description: 'My Blog - Yun Shen',
});

export default function ThoughtsPage() {
	const posts = getPosts();

	return (
		<PageContainer>
			<Header title='Blog' />
			<Thoughts posts={posts} />
		</PageContainer>
	);
}
