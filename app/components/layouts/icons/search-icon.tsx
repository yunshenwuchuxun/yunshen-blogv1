'use client';

import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { SVGProps } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface SearchIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SearchIconProps extends SVGProps<SVGSVGElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		scale: 1,
	},
	animate: {
		scale: [1, 1.1, 1],
	},
};

const svgTransition: Transition = {
	duration: 0.4,
	ease: 'easeInOut',
};

const SearchIcon = forwardRef<SearchIconHandle, SearchIconProps>(
	({ onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement>) => {
			if (!isControlledRef.current) {
				controls.start('animate');
			} else {
				onMouseEnter?.(e);
			}
		};

		const handleMouseLeave = (e: React.MouseEvent<SVGSVGElement>) => {
			if (!isControlledRef.current) {
				controls.start('normal');
			} else {
				onMouseLeave?.(e);
			}
		};

		return (
			<motion.svg
				xmlns='http://www.w3.org/2000/svg'
				width={size}
				height={size}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				variants={svgVariants}
				animate={controls}
				transition={svgTransition}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				role='img'
				aria-label='Search'
				{...props}
			>
				<title>Search</title>
				<circle cx='11' cy='11' r='8' />
				<path d='m21 21-4.3-4.3' />
			</motion.svg>
		);
	},
);

SearchIcon.displayName = 'SearchIcon';

export { SearchIcon };
