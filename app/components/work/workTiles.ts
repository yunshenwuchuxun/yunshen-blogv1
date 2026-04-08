export type WorkTile = {
	title: string;
	description: string;
	image: {
		src: string;
		width: number;
		height: number;
	};
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
	},
	{
		description: 'AI Research Tooling Developer',
		title: 'latex-paper-skills',
		image: {
			src: '/static/images/project/latex-paper-skills-review.png',
			width: 1426,
			height: 843,
		},
	},
	{
		description: 'Full Stack Developer',
		title: 'Dynamical System Analyzer',
		image: {
			src: '/static/images/project/dynamical-system.png',
			width: 1283,
			height: 669,
		},
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
