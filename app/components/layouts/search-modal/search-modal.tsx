'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
	const [query, setQuery] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
			inputRef.current?.focus();
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<>
			<motion.div
				className='fixed inset-0 bg-black/50 z-50'
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			/>
			<div className='fixed inset-0 z-50 flex items-start justify-center pt-[20vh]'>
				<motion.div
					className='bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-2xl w-full max-w-2xl mx-4'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.2 }}
					onClick={(e) => e.stopPropagation()}
				>
					<div className='p-4 border-b border-gray-200 dark:border-gray-800'>
						<input
							ref={inputRef}
							type='text'
							placeholder='搜索文章...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className='w-full bg-transparent text-lg outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600'
						/>
					</div>
					<div className='p-8 text-center'>
						<div className='text-6xl mb-4'>🚧</div>
						<p className='text-gray-500 dark:text-gray-400'>
							搜索功能正在建设中
						</p>
						<p className='text-sm text-gray-400 dark:text-gray-600 mt-2'>
							敬请期待
						</p>
					</div>
				</motion.div>
			</div>
		</>
	);
}
