import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { Thoughts } from '../components/thoughts';
import { getPosts } from './utils';

export const metadata = {
	title: 'Blog',
	description: 'My Blog - Dale Larroder',
};

export default function ThoughtsPage() {
	const posts = getPosts();

	return (
		<PageContainer>
			<Header title='Blog' />
			<Thoughts posts={posts} />
		</PageContainer>
	);
}
