'use client';

import { TagBadge } from './tag-badge';

interface TagCloudProps {
	tags: Array<{ tag: string; count: number }>;
	showCount?: boolean;
}

export function TagCloud({ tags, showCount = true }: TagCloudProps) {
	return (
		<div className='flex flex-wrap gap-3'>
			{tags.map(({ tag, count }) => (
				<div key={tag} className='flex items-center gap-2'>
					<TagBadge tag={tag} size='md' clickable />
					{showCount && (
						<span className='text-sm text-gray-500 dark:text-gray-400'>
							({count})
						</span>
					)}
				</div>
			))}
		</div>
	);
}
