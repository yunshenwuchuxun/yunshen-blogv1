'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mukta } from '../../fonts';
import { SquareArrowLeftIcon } from './icons/square-arrow-left';

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
			<SquareArrowLeftIcon size={20} className='h-9 w-9' />
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
