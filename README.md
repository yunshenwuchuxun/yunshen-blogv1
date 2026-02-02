# Yun Shen Blog

A personal blog built with Next.js 16, React 19, and Tailwind CSS v4.

🌐 **Live Demo**: [https://uestc.de5.net/](https://uestc.de5.net/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yunshenwuchuxun/yunshen-blogv1)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [Motion](https://motion.dev/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Deployment**: [Vercel](https://vercel.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Features

- Smooth scrolling with Lenis
- Dark/Light theme toggle with View Transition API
- MDX blog posts with syntax highlighting
- Responsive design
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or Bun

### Installation

1. Clone this repo

```bash
git clone https://github.com/yunshenwuchuxun/yunshen-blogv1.git
```

2. Install dependencies

```bash
yarn install
# or
bun install
```

3. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
yarn dev      # Start development server
yarn build    # Production build
yarn serve    # Start production server
yarn lint     # Run linter
yarn format   # Format code
```

## Project Structure

```
app/
├── blog/           # Blog pages and posts
├── about/          # About page
├── projects/       # Projects showcase
├── components/     # Reusable components
└── layout.tsx      # Root layout
```

## License

[MIT](LICENSE) © [Yun Shen](https://uestc.de5.net)
