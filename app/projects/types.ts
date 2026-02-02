export interface Project {
	title: string;
	src: string;
	color: string;
	url?: string;
	slug?: string;
	role: string;
	summary?: string;
}

export interface ProjectModal {
	active: boolean;
	index: number;
}
