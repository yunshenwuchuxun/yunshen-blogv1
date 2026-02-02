import Projects from 'app/projects/projects';
import { Fragment } from 'react';
import Header from '../components/header';

export const metadata = {
	title: 'Projects',
	description: '我的项目作品集 - Yun Shen',
};

export default function Page() {
	return (
		<Fragment>
			<Header title='Projects' />
			<div className='space-y-2 md:space-y-5 '>
				<p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
					这里展示了我参与开发的一些项目，点击可查看详情。
				</p>
			</div>
			<Projects />
		</Fragment>
	);
}
