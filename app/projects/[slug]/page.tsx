import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackNavigation from '../../components/layouts/back-navigation';
import { projectDetails, projects } from '../constants';

function GithubMarkIcon() {
	return (
		<svg
			aria-hidden='true'
			viewBox='0 0 24 24'
			fill='currentColor'
			className='size-4'
		>
			<path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.343-3.369-1.343-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z' />
		</svg>
	);
}

function ExternalLinkIcon() {
	return (
		<svg
			aria-hidden='true'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='size-4'
		>
			<path d='M7 17 17 7' />
			<path d='M7 7h10v10' />
		</svg>
	);
}

export async function generateStaticParams() {
	return projects
		.filter((p) => p.slug)
		.map((project) => ({
			slug: project.slug,
		}));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	const detail = projectDetails[params.slug];

	if (!detail) {
		return { title: 'Project Not Found' };
	}

	return {
		title: detail.title,
		description: detail.subtitle,
	};
}

export default async function ProjectDetailPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const detail = projectDetails[params.slug];
	const project = projects.find((p) => p.slug === params.slug);

	if (!detail || !project) {
		notFound();
	}

	return (
		<>
			<BackNavigation href='/projects' label='Projects' />

			<div className='space-y-12'>
				<header className='space-y-4'>
					<div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
						<h1 className='text-4xl font-bold md:text-5xl'>{detail.title}</h1>
						{detail.links?.length ? (
							<div className='flex flex-wrap items-center gap-3 md:justify-end'>
								{detail.links.map((link) => {
									const isGithub = link.label === 'GitHub';

									return (
										<Link
											key={link.url}
											href={link.url}
											target='_blank'
											rel='noopener noreferrer'
											aria-label={link.label}
											className='inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-500 dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400'
										>
											{isGithub ? <GithubMarkIcon /> : <ExternalLinkIcon />}
											<span>{link.label}</span>
										</Link>
									);
								})}
							</div>
						) : null}
					</div>
					<p className='text-xl text-gray-600 dark:text-gray-400'>
						{detail.subtitle}
					</p>
				</header>

				<section className='space-y-6'>
					<h2 className='text-2xl font-semibold'>项目简介</h2>
					<div className='whitespace-pre-line text-gray-600 dark:text-gray-400'>
						{detail.description}
					</div>
					{detail.overviewSections?.map((section) => (
						<div
							key={section.title}
							className='space-y-4 rounded-xl border border-gray-200 p-5 dark:border-gray-700'
						>
							<h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
								{section.title}
							</h3>
							{section.image ? (
								<div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
									<Image
										src={section.image}
										alt={section.imageAlt ?? section.title}
										width={1400}
										height={900}
										className='w-full'
									/>
								</div>
							) : null}
							<div className='whitespace-pre-line text-gray-600 dark:text-gray-400'>
								{section.body}
							</div>
						</div>
					))}
				</section>

				<section className='space-y-6'>
					<h2 className='text-2xl font-semibold'>功能亮点</h2>
					<div className='grid gap-4 md:grid-cols-2'>
						{detail.features.map((feature) => (
							<div
								key={feature.title}
								className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'
							>
								<h3 className='mb-2 font-semibold text-primary-500'>
									{feature.title}
								</h3>
								<p className='text-sm text-gray-600 dark:text-gray-400'>
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</section>

				<section className='space-y-6'>
					<h2 className='text-2xl font-semibold'>技术栈</h2>
					<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{detail.techStack.map((stack) => (
							<div key={stack.category} className='space-y-2'>
								<h3 className='font-medium text-gray-900 dark:text-gray-100'>
									{stack.category}
								</h3>
								<ul className='space-y-1'>
									{stack.items.map((item) => (
										<li
											key={item}
											className='text-sm text-gray-600 dark:text-gray-400'
										>
											• {item}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>

				{detail.deployedProjects?.length ? (
					<section className='space-y-6'>
						<h2 className='text-2xl font-semibold'>已部署项目</h2>
						<div className='space-y-4'>
							{detail.deployedProjects.map((item) => (
								<div
									key={item.title}
									className='overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700'
								>
									<div className='p-5'>
										<div className='flex flex-wrap items-start justify-between gap-3'>
											<div>
												<h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
													{item.title}
												</h3>
												<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
													{item.role}
												</p>
											</div>
											<div className='flex flex-wrap gap-3'>
												<Link
													href={item.url}
													target='_blank'
													rel='noopener noreferrer'
													className='inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600'
												>
													在线访问
												</Link>
												<Link
													href={item.githubUrl}
													target='_blank'
													rel='noopener noreferrer'
													className='inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
												>
													GitHub
												</Link>
											</div>
										</div>
										<p className='mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400'>
											{item.summary}
										</p>
									</div>
									{item.image ? (
										<div className='border-t border-gray-200 dark:border-gray-700'>
											<Image
												src={item.image}
												alt={item.imageAlt ?? item.title}
												width={1600}
												height={900}
												className='h-auto w-full'
												loading='eager'
											/>
										</div>
									) : null}
								</div>
							))}
						</div>
					</section>
				) : null}

				<section className='rounded-lg border border-gray-200 p-4 dark:border-gray-700'>
					<h2 className='mb-2 text-lg font-semibold'>开源许可</h2>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						{detail.license}
					</p>
				</section>
			</div>
		</>
	);
}
