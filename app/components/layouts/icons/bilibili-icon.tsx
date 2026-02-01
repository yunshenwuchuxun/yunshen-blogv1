'use client';

import classNames from 'classnames';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface BilibiliIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BilibiliIconProps extends HTMLAttributes<HTMLButtonElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			duration: 0.5,
		},
	},
};

const BilibiliIcon = forwardRef<BilibiliIconHandle, BilibiliIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					controls.start('animate');
				},
				stopAnimation: () => {
					controls.start('normal');
				},
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				controls.start('animate');
			} else {
				onMouseEnter?.(e);
			}
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				controls.start('normal');
			} else {
				onMouseLeave?.(e);
			}
		};

		return (
			<button
				type='button'
				className={classNames(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className,
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width={size}
					height={size}
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					aria-label='Bilibili icon'
				>
					<title>Bilibili icon</title>
					{/* TV screen frame */}
					<motion.rect
						variants={pathVariants}
						initial='normal'
						animate={controls}
						x='2'
						y='6'
						width='20'
						height='14'
						rx='2'
					/>
					{/* Left antenna */}
					<motion.path
						variants={pathVariants}
						initial='normal'
						animate={controls}
						d='M6 6L4 2'
					/>
					{/* Right antenna */}
					<motion.path
						variants={pathVariants}
						initial='normal'
						animate={controls}
						d='M18 6L20 2'
					/>
					{/* Left eye */}
					<motion.line
						variants={pathVariants}
						initial='normal'
						animate={controls}
						x1='8'
						y1='11'
						x2='8'
						y2='14'
					/>
					{/* Right eye */}
					<motion.line
						variants={pathVariants}
						initial='normal'
						animate={controls}
						x1='16'
						y1='11'
						x2='16'
						y2='14'
					/>
				</svg>
			</button>
		);
	},
);

BilibiliIcon.displayName = 'BilibiliIcon';

export { BilibiliIcon };
