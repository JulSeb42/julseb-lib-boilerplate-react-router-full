# julseb-lib-boilerplate-fullstack

A fullstack React boilerplate using Vite, TypeScript, React Router, and Tailwind CSS, with plop generators for rapid component and page scaffolding.

## Features

- ⚡️ Vite for fast development
- 🦾 TypeScript for type safety
- 🧩 Modular React components
- 🗂 Plop generators for components and pages
- 🛣 React Router for routing
- 🎨 Tailwind CSS for styling
- 🔒 Auth context and protected routes
- 📦 API service layer

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Copy `template.env` to `.env` and update values as needed.

```bash
cp template.env .env
```

### 3. Run the development server

```bash
pnpm dev
```

### 4. Build for production

```bash
pnpm build
```

### 5. Preview production build

```bash
pnpm preview
```

## Project Structure

```
src/
  api/           # API service layer
  components/    # Reusable React components
  context/       # React context (auth, etc.)
  data/          # Static data
  pages/         # Page components
  routes/        # Route definitions
  styles/        # Global styles
  types/         # TypeScript types
  utils/         # Utility functions
plop/            # Plop generators and templates
public/          # Static assets
```

## Plop Generators

Generate a new component:

```bash
pnpm plop component
```

## Customization

- Update `tailwind.config.js` for custom Tailwind settings.
- Edit `vite.config.ts` for Vite configuration.
- Add or modify plop generators in `plop/generators/`.
- See the full documentation for [@julseb-lib](https://julseb-lib.vercel.app/).

## License

MIT

## Author

[Julien Sebag](https://julien-sebag.com)