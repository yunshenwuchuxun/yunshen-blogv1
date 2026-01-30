import classNames from 'classnames';
import { merryWeather } from '../../fonts';
import Footer from '../layouts/footer/footer';
import SplashCursor from '../splash-cursor';
import ArrowDown from './arrow-down';

export default function Hero() {
	return (
		<main className='relative min-h-svh w-screen overflow-hidden'>
			<SplashCursor
				containerClassName='min-h-svh w-screen'
				usePrimaryColors={true}
			>
				<div
					className={classNames('relative min-h-svh', merryWeather.className)}
				>
					<div className='absolute bottom-16 left-0 right-0 z-10'>
						<Footer variant='hero' />
					</div>
					<ArrowDown />
					<div className='absolute top-[20%] md:top-[40%] max-w-5xl flex-col space-y-4 justify-center px-8 md:px-24 lg:ml-14'>
						<h1 className='text-2xl font-medium md:mr-4 md:text-4xl'>
							Welcome to my{' '}
							<span className='font-bold'>personal portfolio — </span> or, as I
							like to call it, my{' '}
							<span className='italic border-b'>playground</span> on the web.
						</h1>
						<section className='relative z-10'>
							<p className='text-base text-justify'>
								I&apos;m Dale Larroder — a Software Engineer and forever a
								student of the craft. I love building things for the web and am
								always on the lookout for new challenges and opportunities to
								learn. I&apos;m passionate about creating beautiful and
								functional user experiences. Right now, I&apos;m building cool
								things at{' '}
								<a
									href='https://www.aphex.co/'
									className='underline-magical'
									target='_blank'
									rel='noreferrer'
									data-skip-splash-cursor
								>
									Aphex
								</a>
								.
							</p>
						</section>
					</div>
				</div>
			</SplashCursor>
		</main>
	);
}
