import { getAllTags } from '../blog/utils';
import Header from '../components/header';
import PageContainer from '../components/layouts/page-container';
import { TagCloud } from '../components/tag-cloud';

export const metadata = {
	title: 'Tags',
	description: 'Browse articles by tags - Dale Larroder',
};

export default function TagsPage() {
	const tags = getAllTags();

	return (
		<PageContainer>
			<Header title='Tags' />
			<div className='space-y-6'>
				<p className='text-lg text-gray-500 dark:text-gray-400'>
					Browse {tags.length} tags across all articles
				</p>
				<TagCloud tags={tags} showCount />
			</div>
		</PageContainer>
	);
}
