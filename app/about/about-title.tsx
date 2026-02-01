'use client';

import Image from 'next/image';
import { BilibiliIcon } from '../components/layouts/icons/bilibili-icon';
import { GithubIcon } from '../components/layouts/icons/github-icon';
import { LinuxDoIcon } from '../components/layouts/icons/linuxdo-icon';
import { MailIcon } from '../components/layouts/icons/mail-icon';

export default function AboutTitle() {
	return (
		<article className='max-w-2xl mx-auto'>
			{/* Profile Image */}
			<div className='flex justify-center mb-8'>
				<div className='w-32 h-32 rounded-full overflow-hidden ring-2 ring-neutral-200 dark:ring-neutral-700'>
					<Image
						src='/static/images/avatar.webp'
						alt='Yun Shen'
						width={128}
						height={128}
						className='w-full h-full object-cover'
						priority
						unoptimized
					/>
				</div>
			</div>

			{/* Greeting & Introduction */}
			<section className='text-center mb-8'>
				<h1 className='text-2xl font-bold mb-4'>Hi, there 👋</h1>
				<p className='text-neutral-700 dark:text-neutral-300 leading-relaxed'>
					我是 <span className='whitespace-nowrap'>Yun Shen</span>
					，一名就读于电子科技大学的人工智能硕士研究生。这个博客诞生于我的学生时代，是我与时间对话的一种方式。在这里，我记录自己的思考、感悟与成长。
				</p>
			</section>

			{/* Social Links */}
			<div className='flex justify-center gap-2 mb-10'>
				<a
					href='https://github.com/yunshenwuchuxun'
					target='_blank'
					rel='noreferrer'
					aria-label='GitHub'
				>
					<GithubIcon size={22} />
				</a>
				<a
					href='https://space.bilibili.com/1607409698'
					target='_blank'
					rel='noreferrer'
					aria-label='Bilibili'
				>
					<BilibiliIcon size={22} />
				</a>
				<a
					href='https://linux.do/u/yunshen123/summary'
					target='_blank'
					rel='noreferrer'
					aria-label='Linux DO'
				>
					<LinuxDoIcon size={22} />
				</a>
				<a href='mailto:yunshen123456@qq.com' aria-label='Email'>
					<MailIcon size={22} />
				</a>
			</div>

			{/* About Me Section */}
			<section className='mb-10'>
				<h2 className='text-lg font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4'>
					About Me
				</h2>
				<ul className='space-y-3 text-neutral-700 dark:text-neutral-300'>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>
							<strong>GitHub:</strong>{' '}
							<a
								href='https://github.com/yunshenwuchuxun'
								target='_blank'
								rel='noreferrer'
								className='underline-magical'
							>
								@yunshenwuchuxun
							</a>
						</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>
							<strong>Linux DO:</strong>{' '}
							<a
								href='https://linux.do/u/yunshen123/summary'
								target='_blank'
								rel='noreferrer'
								className='underline-magical'
							>
								@yunshen123
							</a>
						</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>
							<strong>Tech Stack:</strong> Python, PyTorch, LangChain, Deep
							Learning, Reinforcement Learning, Multimodal AI
						</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>
							<strong>Location:</strong> Chengdu, China
						</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>
							<strong>Languages:</strong> 中文 / English
						</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>
							<strong>Interests:</strong> AI, Open Source, Writing
						</span>
					</li>
				</ul>
			</section>

			{/* What am I doing now */}
			<section className='mb-10'>
				<h2 className='text-lg font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4'>
					What am I doing now
				</h2>
				<ul className='space-y-3 text-neutral-700 dark:text-neutral-300'>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>专注于人工智能领域的研究与学习</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>持续提升英语能力，阅读技术文献与论文</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>维护个人博客，记录学习与成长</span>
					</li>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>探索开源项目，贡献社区</span>
					</li>
				</ul>
			</section>

			{/* Blog History */}
			<section>
				<h2 className='text-lg font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4'>
					Blog History
				</h2>
				<ul className='space-y-3 text-neutral-700 dark:text-neutral-300'>
					<li className='flex items-start gap-2'>
						<span className='text-neutral-400 select-none'>•</span>
						<span>
							<strong>2026.02.01:</strong> 博客正式上线，基于 Next.js 16 + React
							19 + Tailwind CSS v4 构建，使用 MDX 编写内容，GSAP & Motion
							实现动画，部署于 Vercel
						</span>
					</li>
				</ul>
			</section>
		</article>
	);
}
