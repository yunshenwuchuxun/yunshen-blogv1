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
					<div className='absolute bottom-20 left-0 right-0 z-10'>
						<Footer variant='hero' />
					</div>
					<ArrowDown />
					<div className='absolute top-[12%] md:top-[20%] max-w-4xl flex-col space-y-8 md:space-y-10 justify-center px-8 md:px-24 lg:ml-14'>
						<header className='space-y-3'>
							<h1 className='text-3xl font-bold md:text-5xl tracking-tight'>
								我是 Yun Shen
							</h1>
							<p className='text-lg md:text-xl text-neutral-600 dark:text-neutral-400'>
								一名就读于 UESTC 的研究生，正在探索学术与生活交织的无限可能。
							</p>
						</header>
						<section className='relative z-10 space-y-6'>
							<div>
								<h2 className='text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-3'>
									关于这里
								</h2>
								<p className='text-base leading-relaxed text-justify text-neutral-700 dark:text-neutral-300'>
									博客诞生于我的学生时代，是我与时间对话的一种方式。这里，我记录自己的思考、感悟与成长。每篇文章都凝聚了我对生活的观察与体验——它们或许稚嫩，却真诚；或许零散，却饱含热忱。
								</p>
							</div>
							<div>
								<h2 className='text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-3'>
									写给你
								</h2>
								<p className='text-base leading-relaxed text-justify text-neutral-700 dark:text-neutral-300'>
									如果你恰好路过，并愿意在这里停留片刻，我由衷地感到高兴。希望这些文字能为你带来一丝温度，或一点共鸣。
								</p>
							</div>
							<p className='text-base italic text-neutral-600 dark:text-neutral-400 pt-2'>
								欢迎来到我的
								<span className='border-b border-neutral-400 dark:border-neutral-500'>
									小小世界
								</span>
								。
							</p>
						</section>
					</div>
				</div>
			</SplashCursor>
		</main>
	);
}
