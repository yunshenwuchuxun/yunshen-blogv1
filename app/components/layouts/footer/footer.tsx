import Link from 'next/link';
import { AtSignIcon } from '../icons/at-sign-icon';
import { GithubIcon } from '../icons/github-icon';
import { LinkedinIcon } from '../icons/linkedin-icon';
import { XIcon } from '../icons/x-icon';

export default function Footer({ variant = 'default' }: { variant?: 'default' | 'hero' }) {
	const isHero = variant === 'hero';

	return (
		<footer className={`w-full ${isHero ? 'py-4 px-4' : 'py-12 px-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-black'}`}>
			<div className='max-w-7xl mx-auto flex flex-col items-center gap-4'>
				<div className='flex gap-3'>
					<Link
						href='https://www.linkedin.com/in/dale-larroder/'
						target='_blank'
						rel='noreferrer'
						aria-label='linkedin'
						className='transition-transform hover:scale-110'
					>
						<LinkedinIcon className='h-10 w-10' />
					</Link>
					<Link
						href='https://github.com/dlarroder'
						target='_blank'
						rel='noreferrer'
						aria-label='github'
						className='transition-transform hover:scale-110'
					>
						<GithubIcon className='h-10 w-10' />
					</Link>
					<Link
						href='https://x.com/dalelarroder'
						target='_blank'
						rel='noreferrer'
						aria-label='twitter'
						className='transition-transform hover:scale-110'
					>
						<XIcon className='h-10 w-10' />
					</Link>
					<Link
						href='mailto:hi@dalelarroder.com'
						aria-label='email'
						rel='noreferrer'
						className='transition-transform hover:scale-110'
					>
						<AtSignIcon className='h-10 w-10' />
					</Link>
				</div>

				{!isHero && (
					<>
						<div className='text-center text-sm text-gray-600 dark:text-gray-400'>
							<p>© 2025 • Dale Larroder | Blog • RSS</p>
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
