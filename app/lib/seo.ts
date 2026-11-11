import type { Metadata } from 'next';
import { absoluteUrl } from './site';

interface PageMetadataOptions {
	path: string;
	title: string;
	description: string;
}

export function createPageMetadata({
	path,
	title,
	description,
}: PageMetadataOptions): Metadata {
	const pathname = path.split(/[?#]/, 1)[0] || '/';
	const canonical = absoluteUrl(pathname);
	const image = absoluteUrl('/static/og-image.png');

	return {
		title,
		description,
		alternates: {
			canonical,
		},
		openGraph: {
			title,
			description,
			url: canonical,
			siteName: 'Yun Shen',
			type: 'website',
			locale: 'zh_CN',
			images: [{ url: image, width: 1200, height: 630, alt: title }],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
		},
	};
}
