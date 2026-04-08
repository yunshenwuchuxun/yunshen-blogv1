export type WorkTileImage = {
	src: string;
	width: number;
	height: number;
	alt?: string;
};

export type WorkTilePreviewLayout = 'stacked' | 'feature-bottom';

export type WorkTile = {
	title: string;
	description: string;
	image: WorkTileImage;
	previewImages?: WorkTileImage[];
	previewLayout?: WorkTilePreviewLayout;
};

export const workTiles: WorkTile[] = [
	{
		description: 'I built',
		title: 'Smart Drawio',
		image: {
			src: '/static/images/project/smart-drawio.png',
			width: 1912,
			height: 924,
		},
		previewImages: [
			{
				src: '/static/images/project/smart-drawio-prosst.png',
				width: 1912,
				height: 924,
				alt: 'Smart Drawio ProSST example',
			},
			{
				src: '/static/images/project/smart-drawio-transformer.png',
				width: 1912,
				height: 924,
				alt: 'Smart Drawio transformer architecture example',
			},
			{
				src: '/static/images/project/smart-drawio-tools-business-clean.png',
				width: 1912,
				height: 924,
				alt: 'Smart Drawio style toolkit example',
			},
		],
	},
	{
		description: 'AI Research Tooling Developer',
		title: 'latex-paper-skills',
		image: {
			src: '/static/images/project/latex-paper-skills-review.png',
			width: 1426,
			height: 843,
		},
		previewImages: [
			{
				src: '/static/images/project/latex-paper-skills-review.png',
				width: 1426,
				height: 843,
				alt: 'latex-paper-skills review paper gallery',
			},
			{
				src: '/static/images/project/latex-paper-skills-empirical.png',
				width: 1426,
				height: 843,
				alt: 'latex-paper-skills empirical paper gallery',
			},
		],
	},
	{
		description: 'Full Stack Developer',
		title: 'Dynamical System Analyzer',
		image: {
			src: '/static/images/project/dynamical-system.png',
			width: 1283,
			height: 669,
		},
		previewImages: [
			{
				src: '/static/images/project/dynamical-system-trajectory-new.png',
				width: 1098,
				height: 565,
				alt: 'Dynamical System linear analysis view',
			},
			{
				src: '/static/images/project/dynamical-system-chaos-analysis.png',
				width: 1267,
				height: 578,
				alt: 'Dynamical System chaos analysis view',
			},
			{
				src: '/static/images/project/dynamical-system-main.png',
				width: 1098,
				height: 559,
				alt: 'Dynamical System Analyzer overview',
			},
		],
		previewLayout: 'feature-bottom',
	},
	{
		description: 'Full Stack Developer',
		title: 'Yun Shen Blog',
		image: {
			src: '/static/images/project/yunshen-blog.png',
			width: 1283,
			height: 669,
		},
	},
];
