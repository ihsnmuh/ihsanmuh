# Ihsan Muh's Personal Website

Welcome to my digital garden 🌱 - A place where I share my thoughts, experiences, and journey in technology and beyond.

## About This Site

This is my personal corner of the internet, built with modern web technologies and a passion for clean, efficient code. Here, I share my insights, projects, and the occasional tech tutorial. The site is designed to be fast, accessible, and a pleasure to read.

## Features

- 📝 **Blog**: Articles about technology, development, and personal experiences
- 🎯 **Projects**: Showcase of my work and side projects
- 🎨 **Modern Design**: Clean, responsive interface with dark mode support
- ⚡ **Performance**: Built for speed and optimal user experience
- 📱 **Mobile First**: Perfect experience across all devices

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 - For blazing fast performance
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type-safe code
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - For beautiful, responsive design
- **Content**: MDX with syntax highlighting - For beautiful code snippets
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) - For efficient data fetching
- **Database**: [Prisma](https://www.prisma.io/) - For robust data management

## Development

This site is built with developer experience in mind:

- 🛠 **Code Quality**: ESLint + Prettier for consistent code style
- 🔍 **Type Safety**: TypeScript for catching errors early
- 📦 **Modern Tooling**: Husky + Commitlint for clean git history
- 🚀 **Fast Development**: Hot reloading and efficient build process

## Getting Started

Want to run this site locally? Here's how:

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Set up your environment:

```bash
# create your own .env based on .env.example
cp .env.example .env
```

4. Generate Prisma client:

```bash
yarn generate
```

5. Start the development server:

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the magic happen!

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn generate` - Generate Prisma client

## Project Structure

```
src/
├── components/     # Reusable UI components
├── containers/     # Page-specific components
├── contents/       # Blog posts and MDX content
├── constant/       # Site configuration
├── helpers/        # Utility functions
├── lib/           # Core functionality
├── pages/         # Next.js pages
├── queries/       # Data fetching logic
├── services/      # API services
├── styles/        # Global styles
└── types/         # TypeScript definitions
```

## License

This project is private and not licensed for public use. All rights reserved.
