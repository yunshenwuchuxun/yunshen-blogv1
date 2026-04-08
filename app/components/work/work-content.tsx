import Image from 'next/image';
import { WorkContainer } from './work-container';
import { WorkLeft } from './work-left';
import { WorkRight } from './work-right';
import type {
	WorkTile,
	WorkTileImage,
	WorkTilePreviewLayout,
} from './workTiles';

const TRIPLE_PREVIEW_POSITIONS: Record<
	WorkTilePreviewLayout,
	readonly string[]
> = {
	stacked: [
		'right-0 top-0 z-10 w-[78%] rotate-[7deg]',
		'left-0 top-[22%] z-20 w-[58%] -rotate-[8deg]',
		'right-[4%] bottom-0 z-30 w-[68%] -rotate-[2deg]',
	],
	'feature-bottom': [
		'left-[3%] top-[2%] z-20 w-[46%] -rotate-[6deg]',
		'right-[1%] top-[9%] z-10 w-[48%] rotate-[6deg]',
		'left-[12%] bottom-0 z-30 w-[76%] -rotate-[1deg]',
	],
};

const DOUBLE_PREVIEW_POSITIONS = [
	TRIPLE_PREVIEW_POSITIONS.stacked[0],
	TRIPLE_PREVIEW_POSITIONS.stacked[2],
] as const;

function PreviewCard({
	preview,
	title,
	className,
}: {
	preview: WorkTileImage;
	title: string;
	className?: string;
}) {
	return (
		<div
			className={`overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] ring-1 ring-black/5 ${className ?? ''}`}
			style={{ aspectRatio: `${preview.width} / ${preview.height}` }}
		>
			<div className='relative h-full w-full'>
				<Image
					src={preview.src}
					alt={preview.alt ?? title}
					fill
					className='object-cover'
					sizes='(min-width: 1280px) 34vw, (min-width: 768px) 42vw, 86vw'
				/>
			</div>
		</div>
	);
}

interface WorkContentProps {
	work: WorkTile;
	progress?: number;
}

export default function WorkContent({ work, progress = 0 }: WorkContentProps) {
	const {
		title,
		description,
		image,
		previewImages,
		previewLayout = 'stacked',
	} = work;
	const previews = previewImages?.length ? previewImages.slice(0, 3) : [image];
	const isStacked = previews.length > 1;
	const positions =
		previews.length === 2
			? DOUBLE_PREVIEW_POSITIONS
			: TRIPLE_PREVIEW_POSITIONS[previewLayout];

	return (
		<WorkContainer>
			<WorkLeft progress={progress}>
				<div className='text-2xl font-medium md:text-3xl xl:text-4xl'>
					{description}
				</div>
				<span className='text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl'>
					{title}
				</span>
			</WorkLeft>
			<WorkRight progress={progress}>
				{isStacked ? (
					<div className='relative mx-auto mt-10 aspect-[11/9] w-full max-w-[42rem] sm:mt-12 lg:mt-0'>
						{previews.map((preview, index) => (
							<div
								className={`absolute ${positions[index] ?? TRIPLE_PREVIEW_POSITIONS.stacked[TRIPLE_PREVIEW_POSITIONS.stacked.length - 1]}`}
								key={preview.src}
							>
								<PreviewCard preview={preview} title={title} />
							</div>
						))}
					</div>
				) : (
					<div className='mx-auto mt-10 w-full max-w-[42rem] drop-shadow-2xl sm:mt-12 lg:mt-0'>
						<PreviewCard preview={previews[0]} title={title} />
					</div>
				)}
			</WorkRight>
		</WorkContainer>
	);
}
