const defaultSiteUrl = 'https://uestc.de5.net';

function resolveSiteUrl(value: string): string {
	let url: URL;
	try {
		url = new URL(value);
	} catch {
		throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin.');
	}

	if (
		!['http:', 'https:'].includes(url.protocol) ||
		url.username ||
		url.password ||
		url.pathname !== '/' ||
		url.search ||
		url.hash
	) {
		throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin.');
	}

	return url.origin;
}

export const siteUrl = resolveSiteUrl(
	process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl,
);

export function absoluteUrl(path: string): string {
	const url = new URL(path, `${siteUrl}/`);
	if (url.origin !== siteUrl) {
		throw new Error('Site URLs must use NEXT_PUBLIC_SITE_URL as their origin.');
	}
	return url.toString();
}
