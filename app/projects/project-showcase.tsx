import type { ProjectShowcase } from './showcase';

export function ProjectHighlights({ project }: { project: ProjectShowcase }) {
	return (
		<>
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold'>
					{project.listings.length > 0 ? '项目影响力' : '项目覆盖'}
				</h2>
				<dl className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
					{project.metrics.map((metric) => (
						<div
							key={metric.label}
							className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'
						>
							<dt className='text-sm text-gray-600 dark:text-gray-400'>
								{metric.label}
							</dt>
							<dd className='mt-2'>
								<a
									href={metric.url}
									title={metric.context}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={`${metric.label} ${metric.value}，查看数据来源`}
									className='inline-flex items-center gap-2 text-3xl font-semibold text-primary-500 transition-colors hover:text-primary-600'
								>
									{metric.value}
									<span aria-hidden='true' className='text-sm'>
										↗
									</span>
								</a>
							</dd>
						</div>
					))}
				</dl>
				<p className='text-xs text-gray-500 dark:text-gray-400'>
					{project.dataNote}
				</p>
				{project.listings.length > 0 ? (
					<div className='flex flex-wrap items-center gap-3 text-sm'>
						<span className='text-gray-600 dark:text-gray-400'>生态收录</span>
						{project.listings.map((listing) => (
							<a
								key={listing.label}
								href={listing.url}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-2 text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-500 dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400'
							>
								{listing.label} <span aria-hidden='true'>↗</span>
							</a>
						))}
					</div>
				) : null}
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold'>项目优势与工程实践</h2>
				<div className='grid gap-4 md:grid-cols-3'>
					{project.advantages.map((item) => (
						<div
							key={item.title}
							className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'
						>
							<h3 className='mb-2 font-semibold text-primary-500'>
								{item.title}
							</h3>
							<p className='text-sm leading-7 text-gray-600 dark:text-gray-400'>
								{item.description}
							</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
