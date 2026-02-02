import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `https://uestc.de5.net/sitemap.xml`,
		host: `https://uestc.de5.net`,
	};
}
