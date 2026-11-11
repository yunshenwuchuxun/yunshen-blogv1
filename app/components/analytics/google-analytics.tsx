'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type GoogleTag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & {
	dataLayer?: unknown[];
	gtag?: GoogleTag;
};

export function isValidGoogleAnalyticsId(value?: string): value is string {
	return typeof value === 'string' && /^G-[A-Z0-9]{6,20}$/.test(value);
}

export default function GoogleAnalytics({
	measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
}: {
	measurementId?: string;
}) {
	const pathname = usePathname();
	const validId = isValidGoogleAnalyticsId(measurementId)
		? measurementId
		: undefined;
	const [readyId, setReadyId] = useState<string | null>(null);
	const initializedId = useRef<string | null>(null);
	const lastPage = useRef<string | null>(null);
	const previousLocation = useRef<string | null>(null);

	useEffect(() => {
		if (!validId || readyId !== validId || !pathname) return;
		const analyticsWindow = window as AnalyticsWindow;
		if (!analyticsWindow.gtag) return;

		const pageLocation = `${window.location.origin}${pathname}${window.location.search}`;
		const pageKey = `${validId}:${pageLocation}`;
		if (lastPage.current === pageKey) return;

		analyticsWindow.gtag('event', 'page_view', {
			page_location: pageLocation,
			page_path: `${pathname}${window.location.search}`,
			page_title: document.title,
			page_referrer: previousLocation.current ?? document.referrer,
			send_to: validId,
		});
		lastPage.current = pageKey;
		previousLocation.current = pageLocation;
	}, [pathname, readyId, validId]);

	if (!validId) return null;

	return (
		<Script
			id={`google-analytics-${validId}`}
			src={`https://www.googletagmanager.com/gtag/js?id=${validId}`}
			strategy='afterInteractive'
			onReady={() => {
				const analyticsWindow = window as AnalyticsWindow;
				analyticsWindow.dataLayer ??= [];
				analyticsWindow.gtag ??= function () {
					// biome-ignore lint/complexity/noArguments: Preserve Google's documented gtag command queue format.
					analyticsWindow.dataLayer?.push(arguments);
				};
				if (initializedId.current !== validId) {
					analyticsWindow.gtag('js', new Date());
					// Also disable history-based Page views in GA4 Enhanced Measurement.
					analyticsWindow.gtag('config', validId, { send_page_view: false });
					initializedId.current = validId;
				}
				setReadyId(validId);
			}}
		/>
	);
}
