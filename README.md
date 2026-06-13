# Raxel Media

Premium direct-response creative agency website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Design System

### Color Palette

- **Background**: `#0A0A0A` - Near-black primary background
- **Surface**: `#121212` - Card and elevated surfaces
- **Primary (Accent)**: `#0FBF6A` - Royal emerald green
- **Primary Dim**: `#0A8F4F` - Darker green for hover states
- **Foreground**: `#F5F5F5` - Off-white text
- **Muted**: `#8A8A8A` - Secondary/disabled text
- **Border**: `#262626` - Border colors

### Typography

- **Headings**: Space Grotesk (weights: 400, 500, 600, 700)
- **Body**: Inter (weights: 400, 500, 600)

All heading sizes use responsive `clamp()` for fluid scaling across viewport sizes.

## 📁 Project Structure

```
raxel-media/
├── app/
│   ├── layout.tsx          # Root layout with metadata and font configuration
│   ├── page.tsx            # Home page (minimal placeholder)
│   └── globals.css         # Global styles with CSS variables, grain texture, typography
├── lib/
│   └── utils.ts            # Utility functions (cn() helper)
├── public/                 # Static assets (to be created)
├── tailwind.config.ts      # Tailwind configuration with custom colors
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── .eslintrc.json          # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## ✨ Features

### Global Styles (`app/globals.css`)

- CSS custom properties for all colors
- Subtle grain texture overlay (fixed, low opacity, mix-blend-mode: overlay)
- Smooth font rendering with `-webkit-font-smoothing` and `-moz-osx-font-smoothing`
- Responsive typography scale using `clamp()`
- Selection color styling (accent green)
- Focus state styling with outline
- Custom scrollbar styling

### Font Configuration

- Configured with `next/font/google` for optimal performance
- Font variables injected into HTML element
- Used throughout the design system

### Tailwind Integration

- Extended color palette as custom colors
- Font family variables for Space Grotesk and Inter
- Typography plugin configuration
- Path aliases configured in `tsconfig.json` (`@/*`)

### Utility Functions

- `cn()` - Combines `clsx` and `tailwind-merge` for safe className merging

## 📝 Notes

- The grain texture overlay is applied both in CSS (`body::before`) and in the layout wrapper (`div.grain-overlay`) for optimal performance
- All colors are available as Tailwind classes (e.g., `bg-primary`, `text-foreground`)
- The project uses strict TypeScript configuration for maximum type safety
- ESLint extends Next.js core-web-vitals configuration

## 🎯 Next Steps

1. Create page sections (hero, services, portfolio, testimonials, etc.)
2. Build reusable components
3. Set up API routes if needed
4. Add SEO optimization for individual pages
5. Implement animations with Framer Motion and GSAP
6. Set up form handling with React Hook Form

---

**Built with ❤️ for creative excellence**
