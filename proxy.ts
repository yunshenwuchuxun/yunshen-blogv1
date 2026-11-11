import { type NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
	let tag: string;
	try {
		tag = decodeURIComponent(request.nextUrl.pathname.slice('/tags/'.length));
	} catch {
		return new NextResponse('Bad Request', { status: 400 });
	}

	// Next 16.1.5 decodes literal percent signs again in dynamic route matching.
	// No published tag uses a percent sign; reject ambiguous URLs before routing.
	if (tag.includes('%')) {
		return new NextResponse('Not Found', {
			status: 404,
			headers: { 'X-Robots-Tag': 'noindex' },
		});
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/tags/:tag+'],
};
