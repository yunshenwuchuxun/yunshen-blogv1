import Contact from './components/contact';
import Hero from './components/hero/hero';
import Intro from './components/intro';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Works from './components/work/works';
import { createPageMetadata } from './lib/seo';

export const metadata = {
	...createPageMetadata({
		path: '/',
		title: 'Yun Shen',
		description: '记录思考、感悟与成长',
	}),
	title: { absolute: 'Yun Shen' },
};

export default function Home() {
	return (
		<ScrollProvider>
			<Hero />
			<Intro />
			<Works />
			<Contact />
		</ScrollProvider>
	);
}
