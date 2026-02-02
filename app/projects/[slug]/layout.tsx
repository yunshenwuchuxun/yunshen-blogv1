import type React from 'react';
import PageContainer from '../../components/layouts/page-container';

export default function ProjectDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <PageContainer>{children}</PageContainer>;
}
