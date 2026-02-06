'use client';

import { format } from 'date-fns';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { BlogPost } from '../blog/utils';
import { TagBadge } from './tag-badge';

export function Thoughts({ posts }: { posts: BlogPost[] }) {
	return (
		<ul>
			{posts.map((post, index) => (
				<ThoughtItem key={post.slug} post={post} index={index} />
			))}
		</ul>
	);
}

function ThoughtItem({ post, index }: { post: BlogPost; index: number }) {
	const [hideImage, setHideImage] = useState(false);
	const { title, publishedAt, summary, image, tags } = post.metadata;

	return (
		<motion.li
			className='border-b border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 hover:border-gray-400 transition-colors duration-500'
			initial={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
			animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
			transition={{ duration: 0.6, delay: index / 10 }}
		>
			<Link href={`/blog/${post.slug}`} aria-label={`Read "${title}"`}>
				<article className='py-5'>
					<div className='flex flex-col md:flex-row gap-6 items-start'>
						<div className='flex-1 space-y-3 min-w-0'>
							<div className='flex flex-col gap-1 md:flex-row md:w-full md:items-center'>
								<h2 className='text-md font-medium text-black dark:text-white md:max-w-2xl md:truncate md:whitespace-nowrap md:pr-2 md:text-xl'>
									{title}
								</h2>
								<div className='hidden md:flex mx-1 flex-1 border-b border-primary-500' />
								<time className='whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
									{format(new Date(publishedAt), 'MMMM dd, yyyy')}
								</time>
							</div>

							{tags && tags.length > 0 && (
								<div className='flex flex-wrap gap-2'>
									{tags.map((tag) => (
										<TagBadge key={tag} tag={tag} size='sm' clickable={false} />
									))}
								</div>
							)}

							<p className='text-gray-500 dark:text-gray-400'>{summary}</p>
						</div>

						{image && !hideImage && (
							<div className='hidden md:block shrink-0'>
								<Image
									src={image}
									alt={title}
									width={200}
									height={200}
									priority={true}
									quality={85}
									className='rounded-lg object-cover'
									onError={() => setHideImage(true)}
								/>
							</div>
						)}
					</div>
				</article>
			</Link>
		</motion.li>
	);
}
