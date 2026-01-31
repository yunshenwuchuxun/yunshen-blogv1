'use client';

import classNames from 'classnames';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { mukta } from '../../../fonts';
import { MoonIcon } from '../icons/moon-icon';
import { SearchIcon } from '../icons/search-icon';
import { SunMediumIcon } from '../icons/sun-icon';
import SearchModal from '../search-modal/search-modal';

const navItems = [
	{ href: '/blog', label: 'Blog' },
	{ href: '/tags', label: 'Tags' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/about', label: 'About' },
];

export default function TopNav() {
	const [mounted, setMounted] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();
	const pathname = usePathname();

	useEffect(() => setMounted(true), []);

	const toggleTheme = () => {
		const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

		if (typeof document !== 'undefined' && 'startViewTransition' in document) {
			document.startViewTransition(() => {
				setTheme(newTheme);
			});
		} else {
			setTheme(newTheme);
		}
	};

	const isActive = (href: string) => {
		if (href === '/blog') {
			return pathname.startsWith('/blog');
		}
		if (href === '/tags') {
			return pathname.startsWith('/tags');
		}
		return pathname === href;
	};

	return (
		<>
			<nav
				className={classNames(
					'fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50',
					mukta.className,
				)}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-end h-16'>
						<div className='hidden md:flex items-center gap-1'>
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={classNames(
										'px-3 py-2 text-base font-medium rounded-md transition-colors relative',
										isActive(item.href)
											? 'text-primary-500'
											: 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500',
									)}
								>
									{item.label}
									{isActive(item.href) && (
										<motion.div
											className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500'
											layoutId='activeNav'
											transition={{ duration: 0.2 }}
										/>
									)}
								</Link>
							))}

							<div className='ml-2 flex items-center gap-1'>
								<button
									type='button'
									onClick={() => setSearchOpen(true)}
									aria-label='Search'
									className='text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500'
								>
									<SearchIcon size={20} />
								</button>

								<motion.button
									aria-label='Toggle Dark Mode'
									type='button'
									whileTap={{
										scale: 0.7,
										rotate: 360,
										transition: { duration: 0.2 },
									}}
									whileHover={{ scale: 1.1 }}
									onClick={toggleTheme}
									className='text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500'
								>
									{mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
										<SunMediumIcon size={20} />
									) : (
										<MoonIcon size={20} />
									)}
								</motion.button>
							</div>
						</div>

						<div className='md:hidden flex items-center gap-1'>
							<button
								type='button'
								onClick={() => setSearchOpen(true)}
								aria-label='Search'
								className='text-gray-700 dark:text-gray-300'
							>
								<SearchIcon size={20} />
							</button>

							<motion.button
								aria-label='Toggle Dark Mode'
								type='button'
								whileTap={{
									scale: 0.7,
									rotate: 360,
									transition: { duration: 0.2 },
								}}
								onClick={toggleTheme}
								className='text-gray-700 dark:text-gray-300'
							>
								{mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
									<SunMediumIcon size={20} />
								) : (
									<MoonIcon size={20} />
								)}
							</motion.button>
						</div>
					</div>

					<div className='md:hidden pb-3 flex gap-4 overflow-x-auto'>
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={classNames(
									'text-sm font-medium whitespace-nowrap px-2 py-1 rounded transition-colors',
									isActive(item.href)
										? 'text-primary-500 bg-primary-500/10'
										: 'text-gray-700 dark:text-gray-300',
								)}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</nav>

			<SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
		</>
	);
}
