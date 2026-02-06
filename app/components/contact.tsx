export default function Contact() {
	return (
		<section className='relative h-screen w-screen py-10 px-12 md:px-32 xl:px-36 dark:bg-black dark:text-white bg-white text-black'>
			<div className='flex flex-col justify-center h-5/6 gap-10 md:gap-16'>
				<h2 className='text-3xl md:text-6xl xl:text-8xl'>
					Let&apos;s make something <br /> great together
				</h2>
				<a
					href='mailto:yunshen123456@qq.com'
					className='group self-end text-xl md:text-3xl xl:text-4xl text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors duration-300'
				>
					<span className='border-b border-current pb-0.5'>
						yunshen123456@qq.com
					</span>
					<span className='inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1'>
						&#8599;
					</span>
				</a>
			</div>
		</section>
	);
}
