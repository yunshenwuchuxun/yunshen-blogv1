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
