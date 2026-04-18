'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mukta } from '../../fonts';

interface BackNavigationProps {
	href?: string;
	label?: string;
}

export default function BackNavigation({
	href,
	label = 'Back',
}: BackNavigationProps) {
	const router = useRouter();

	const content = (
		<div className='flex w-full items-center'>
			<span className='flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-200 hover:bg-accent'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='20'
					height='20'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					aria-hidden='true'
				>
					<rect width='18' height='18' x='3' y='3' rx='2' />
					<path d='m12 8-4 4 4 4' />
					<path d='M16 12H8' />
				</svg>
			</span>
			<span className='font-bold'>{label}</span>
			<div className='mx-1 w-full border-b border-primary-500' />
		</div>
	);

	const baseClasses = classNames(
		'flex w-full cursor-pointer text-primary-500 mb-12',
		mukta.className,
	);

	if (href) {
		return (
			<Link href={href} className={baseClasses}>
				{content}
			</Link>
		);
	}

	return (
		<button type='button' onClick={() => router.back()} className={baseClasses}>
			{content}
		</button>
	);
}
