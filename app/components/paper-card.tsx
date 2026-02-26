import Link from 'next/link';

interface PaperCardProps {
	title: string;
	description?: string;
	links?: { label: string; url: string }[];
}

export function PaperCard({ title, description, links }: PaperCardProps) {
	return (
		<div className='my-8 rounded-xl border border-gray-200 p-6 dark:border-gray-700'>
			<h3 className='text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100'>
				{title}
			</h3>
			{description && (
				<p className='mt-2 text-gray-600 dark:text-gray-400'>{description}</p>
			)}
			{links && links.length > 0 && (
				<div className='mt-4 flex flex-wrap gap-3'>
					{links.map((link) => {
						const isAnchor = link.url.startsWith('#');
						return (
							<Link
								key={link.url}
								href={link.url}
								{...(isAnchor
									? {}
									: { target: '_blank', rel: 'noopener noreferrer' })}
								className='inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600'
							>
								{link.label}
								<svg
									aria-hidden='true'
									className='h-4 w-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d={
											isAnchor
												? 'M19 9l-7 7-7-7'
												: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
										}
									/>
								</svg>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
