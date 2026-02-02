'use client';

import Link from 'next/link';
import type { ProjectModal } from './types';

interface ProjectProps {
	index: number;
	title: string;
	url?: string;
	slug?: string;
	role: string;
	setModal: (modal: ProjectModal) => void;
}

export default function ProjectItem({
	index,
	title,
	url,
	slug,
	role,
	setModal,
}: ProjectProps) {
	const content = (
		<>
			<h2 className='text-2xl transition-all group-hover:-translate-x-3 group-hover:scale-110 sm:text-6xl'>
				{title}
			</h2>
			<p className='text-sm font-light transition-all group-hover:translate-x-3 group-hover:scale-110 sm:text-lg'>
				{role}
			</p>
		</>
	);

	const className =
		'group flex w-full items-center justify-between border-b px-4 py-10 sm:px-10 sm:py-16';

	const handleMouseEnter = () => setModal({ active: true, index });
	const handleMouseLeave = () => setModal({ active: false, index });

	if (slug) {
		return (
			<Link
				href={`/projects/${slug}`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={className}
			>
				{content}
			</Link>
		);
	}

	return (
		<a
			href={url}
			target='_blank'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={className}
			rel='noreferrer'
		>
			{content}
		</a>
	);
}
