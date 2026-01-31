import path from 'node:path';
import { Fragment } from 'react';
import { readMDXFile } from '../blog/utils';
import Header from '../components/header';
import { CustomMDX } from '../components/mdx';
import AboutTitle from './about-title';

const contentPath = path.join(process.cwd(), 'app', 'about', 'content.mdx');
const { content } = readMDXFile(contentPath);

export const metadata = {
	title: 'About',
	description: 'About me',
};

export default function Page() {
	return (
		<Fragment>
			<Header title='About' />
			<AboutTitle />
			<CustomMDX source={content} />
		</Fragment>
	);
}
