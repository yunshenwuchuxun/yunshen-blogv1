'use client';

import classNames from 'classnames';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface LinuxDoIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LinuxDoIconProps extends HTMLAttributes<HTMLButtonElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		scale: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		scale: [0.9, 1.05, 1],
		transition: {
			duration: 0.4,
		},
	},
};

const LinuxDoIcon = forwardRef<LinuxDoIconHandle, LinuxDoIconProps>(
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
				<motion.svg
					xmlns='http://www.w3.org/2000/svg'
					width={size}
					height={size}
					viewBox='0 0 24 24'
					aria-label='Linux DO icon'
					variants={pathVariants}
					initial='normal'
					animate={controls}
				>
					<title>Linux DO icon</title>
					<defs>
						<clipPath id='linuxdo-circle'>
							<circle cx='12' cy='12' r='11' />
						</clipPath>
					</defs>
					<g clipPath='url(#linuxdo-circle)'>
						{/* Black stripe */}
						<rect x='0' y='0' width='24' height='8' fill='#2b2b2b' />
						{/* White stripe */}
						<rect x='0' y='8' width='24' height='8' fill='#f5f5f5' />
						{/* Yellow/Orange stripe */}
						<rect x='0' y='16' width='24' height='8' fill='#f5a623' />
					</g>
					{/* Circle border */}
					<circle
						cx='12'
						cy='12'
						r='11'
						fill='none'
						stroke='currentColor'
						strokeWidth='0.5'
						opacity='0.3'
					/>
				</motion.svg>
			</button>
		);
	},
);

LinuxDoIcon.displayName = 'LinuxDoIcon';

export { LinuxDoIcon };
