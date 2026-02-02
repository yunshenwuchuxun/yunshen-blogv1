import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackNavigation from '../../components/layouts/back-navigation';
import { projectDetails, projects } from '../constants';

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
					<h1 className='text-4xl font-bold md:text-5xl'>{detail.title}</h1>
					<p className='text-xl text-gray-600 dark:text-gray-400'>
						{detail.subtitle}
					</p>
					<div className='flex flex-wrap gap-3'>
						{detail.links.map((link) => (
							<Link
								key={link.url}
								href={link.url}
								target='_blank'
								rel='noopener noreferrer'
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
										d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
									/>
								</svg>
							</Link>
						))}
					</div>
				</header>

				<div className='overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700'>
					<Image
						src={`/static/images/project/${project.src}`}
						alt={detail.title}
						width={1200}
						height={675}
						className='w-full'
						priority
					/>
				</div>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold'>项目简介</h2>
					<div className='whitespace-pre-line text-gray-600 dark:text-gray-400'>
						{detail.description}
					</div>
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

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold'>快速开始</h2>
					<div className='space-y-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
						{detail.usage.map((step, index) => (
							<div
								key={step}
								className='font-mono text-sm text-gray-700 dark:text-gray-300'
							>
								<span className='mr-2 text-primary-500'>{index + 1}.</span>
								{step}
							</div>
						))}
					</div>
				</section>

				<section className='space-y-4'>
					<h2 className='text-2xl font-semibold'>适用人群</h2>
					<ul className='space-y-2'>
						{detail.targetUsers.map((user) => (
							<li
								key={user}
								className='flex items-start gap-2 text-gray-600 dark:text-gray-400'
							>
								<span className='text-primary-500'>→</span>
								{user}
							</li>
						))}
					</ul>
				</section>

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
