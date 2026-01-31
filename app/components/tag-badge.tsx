'use client';

import Link from 'next/link';

interface TagBadgeProps {
	tag: string;
	size?: 'sm' | 'md' | 'lg';
	clickable?: boolean;
}

const sizeClasses = {
	sm: 'text-xs px-2 py-0.5',
	md: 'text-sm px-3 py-1',
	lg: 'text-base px-4 py-1.5',
};

export function TagBadge({
	tag,
	size = 'md',
	clickable = false,
}: TagBadgeProps) {
	const baseClasses = `
		inline-block rounded-full
		border-2 border-primary-500
		text-primary-500
		transition-colors duration-200
		${sizeClasses[size]}
	`;

	if (clickable) {
		return (
			<Link
				href={`/tags/${encodeURIComponent(tag)}`}
				className={`${baseClasses} hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
			>
				{tag}
			</Link>
		);
	}

	return <span className={baseClasses}>{tag}</span>;
}
