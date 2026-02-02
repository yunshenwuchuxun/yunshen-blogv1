import Link from 'next/link';
import { BilibiliIcon } from '../icons/bilibili-icon';
import { GithubIcon } from '../icons/github-icon';
import { LinuxDoIcon } from '../icons/linuxdo-icon';
import { MailIcon } from '../icons/mail-icon';

export default function Footer({
	variant = 'default',
}: {
	variant?: 'default' | 'hero';
}) {
	const isHero = variant === 'hero';

	return (
		<footer
			className={`w-full ${isHero ? 'py-4 px-4' : 'py-12 px-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-black'}`}
		>
			<div className='max-w-7xl mx-auto flex flex-col items-center gap-4'>
				<div className='flex gap-3'>
					<Link
						href='https://github.com/yunshenwuchuxun'
						target='_blank'
						rel='noreferrer'
						aria-label='github'
						className='transition-transform hover:scale-110'
					>
						<GithubIcon className='h-10 w-10' />
					</Link>
					<Link
						href='https://linux.do/u/yunshen123/summary'
						target='_blank'
						rel='noreferrer'
						aria-label='linux do'
						className='transition-transform hover:scale-110'
					>
						<LinuxDoIcon className='h-10 w-10' />
					</Link>
					<Link
						href='https://space.bilibili.com/1607409698'
						target='_blank'
						rel='noreferrer'
						aria-label='bilibili'
						className='transition-transform hover:scale-110'
					>
						<BilibiliIcon className='h-10 w-10' />
					</Link>
					<Link
						href='mailto:yunshen123456@qq.com'
						aria-label='email'
						rel='noreferrer'
						className='transition-transform hover:scale-110'
					>
						<MailIcon className='h-10 w-10' />
					</Link>
				</div>

				{!isHero && (
					<>
						<div className='text-center text-sm text-gray-600 dark:text-gray-400'>
							<p>© 2025 • Yun Shen | Blog • RSS</p>
						</div>

						<div className='text-center text-xs text-gray-500 dark:text-gray-500 opacity-70'>
							<p>Built with Next.js & Tailwind CSS</p>
						</div>
					</>
				)}
			</div>
		</footer>
	);
}
