import { createPageMetadata } from '../lib/seo';
import AboutTitle from './about-title';

export const metadata = createPageMetadata({
	path: '/about',
	title: 'About',
	description: 'About me',
});

export default function Page() {
	return <AboutTitle />;
}
