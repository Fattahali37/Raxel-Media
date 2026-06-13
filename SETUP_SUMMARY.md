# Raxel Media - Foundation Setup Summary

## ✅ Completed Setup

### 1. Project Configuration Files

#### `tsconfig.json`

- TypeScript with strict mode
- Path alias configured: `@/*` for root imports
- JSX preserved for Next.js handling
- ES2020 target with DOM typings

#### `next.config.js`

- React Strict Mode enabled
- SWC minification enabled
- CommonJS export for compatibility

#### `postcss.config.js`

- Tailwind CSS integration
- Autoprefixer for vendor prefixes

#### `.eslintrc.json`

- Extends Next.js core web vitals config

### 2. Tailwind CSS Configuration (`tailwind.config.ts`)

#### Custom Color Palette

```typescript
background: '#0A0A0A'      // Near-black primary
surface: '#121212'          // Cards & elevated
primary: '#0FBF6A'          // Royal emerald green (accent)
primary-dim: '#0A8F4F'      // Darker green hover states
foreground: '#F5F5F5'       // Off-white text
muted: '#8A8A8A'            // Secondary/disabled text
border: '#262626'           // Border colors
```

#### Font Families

```typescript
fontFamily: {
  'space-grotesk': 'var(--font-space-grotesk)'  // Headings
  'inter': 'var(--font-inter)'                  // Body
}
```

### 3. Google Fonts Configuration (`app/layout.tsx`)

#### Space Grotesk

- Weights: 400, 500, 600, 700
- Used for all headings (h1-h6)
- Variable: `--font-space-grotesk`

#### Inter

- Weights: 400, 500, 600
- Used for body text and UI
- Variable: `--font-inter`

Both fonts use `display: 'swap'` for optimal performance.

### 4. Global Styles (`app/globals.css`)

#### CSS Custom Properties

- All colors mapped to CSS variables
- Accessible throughout the app
- Example: `var(--color-background)`, `var(--color-primary)`

#### Grain Texture Overlay

- SVG-based noise filter (fractal noise)
- Fixed position covering full viewport
- Opacity: 0.4
- Mix-blend-mode: overlay
- Implemented in two places:
  - CSS `body::before` pseudo-element
  - React component in layout wrapper (for consistency)
- Pointer events: none (doesn't interfere with interactions)

#### Responsive Typography Scale

Using CSS `clamp()` for fluid sizing:

```css
h1: clamp(2rem, 5vw, 3.5rem)
h2: clamp(1.75rem, 4vw, 2.5rem)
h3: clamp(1.5rem, 3vw, 1.875rem)
h4: clamp(1.25rem, 2.5vw, 1.5rem)
h5: clamp(1.1rem, 2vw, 1.25rem)
h6: clamp(1rem, 1.5vw, 1.125rem)
p:  clamp(0.95rem, 1.2vw, 1.05rem)
```

#### Base Typography

- Smooth font rendering: `-webkit-font-smoothing: antialiased`
- Line heights optimized for readability
- Letter spacing adjusted per element
- Selection color: Primary green with black background

#### Focus States

- 2px outline in primary green
- 2px outline offset
- Applied to buttons, links, inputs, textareas, selects

#### Custom Scrollbar

- Width: 10px
- Track: background color
- Thumb: border color with hover to muted color

### 5. Root Layout (`app/layout.tsx`)

#### Metadata Configuration

- **Title**: "Raxel Media | Creative That Converts"
- **Description**: Comprehensive brand description
- **Keywords**: creative agency, direct response, digital marketing, etc.
- **Author**: Raxel Media
- **Robots**: Indexed and followable

#### Open Graph Tags

- Type: website
- Full URL, siteName, images configured
- Optimal image size: 1200x630px

#### Twitter Card

- Card type: summary_large_image
- Custom title and description
- Image configured

#### Favicon & Manifest

- Favicon, shortcut icon, apple-touch-icon paths
- Web manifest configuration

#### Viewport Configuration

- Device-width initial scale
- No user scaling
- Dark color scheme
- No zoom allowed

#### Font Variable Injection

```tsx
className={`${spaceGrotesk.variable} ${inter.variable}`}
```

Applied to `<html>` element for availability throughout app.

#### Grain Texture Wrapper

```tsx
<div className="fixed inset-0 pointer-events-none z-50 opacity-40 mix-blend-overlay">
  {/* SVG noise background image */}
</div>
```

### 6. Utility Functions (`lib/utils.ts`)

#### `cn()` Helper

Safely merges Tailwind CSS classes:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Usage:

```tsx
cn("px-4 py-2", isActive && "bg-primary"); // Safely handles both
```

### 7. Home Page (`app/page.tsx`)

Minimal placeholder page using:

- Server component with 'use client' directive
- Tailwind color classes: `bg-background`, `text-foreground`, `text-muted`
- Standard semantic HTML structure

### 8. Dependencies

#### Core Dependencies

- `react@^18.3.1`
- `react-dom@^18.3.1`
- `next@^14.2.0`

#### UI & Animation Libraries

- `framer-motion@^12.40.0` - Animations
- `gsap@^3.15.0` - Advanced animations
- `lucide-react@^1.18.0` - Icons
- `lenis@^1.3.23` - Smooth scrolling

#### Form & Validation

- `react-hook-form@^7.79.0`
- `@hookform/resolvers@^5.4.0`
- `zod@^4.4.3`

#### Styling Utilities

- `clsx@^2.1.1` - Conditional classnames
- `tailwind-merge@^2.4.0` - Class merging

#### Dev Dependencies

- `typescript@^5.5.0`
- `tailwindcss@^3.4.3`
- `@tailwindcss/typography@^0.5.15`
- `postcss@^8.4.38`
- `autoprefixer@^10.4.18`
- `eslint@^8.57.0`
- `eslint-config-next@^14.2.0`
- Type definitions for Node, React, React-DOM

## 📁 Project Structure

```
raxel-media/
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Minimal home page placeholder
│   └── globals.css         # Global styles & design tokens
├── lib/
│   └── utils.ts            # cn() utility function
├── .env.example            # Environment variables template
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🎯 Key Features Implemented

✅ Dark mode design system fully configured
✅ Premium color palette (emerald green accent on near-black)
✅ Custom typography with responsive scaling
✅ Grain texture overlay effect
✅ Font optimization with next/font/google
✅ Smooth font rendering configured
✅ Metadata & SEO tags configured
✅ TypeScript strict mode enabled
✅ Path alias configuration (@/\*)
✅ Utility functions for safe className merging
✅ Focus state accessibility
✅ Custom scrollbar styling

## 🚀 Ready to Build

The foundation is complete and fully functional:

- Dev server tested and working
- Production build successful
- All configurations validated
- Ready for page section development

## Next Steps

1. Create page sections (hero, services, portfolio, etc.)
2. Build reusable components
3. Set up routing for additional pages
4. Implement animations with Framer Motion & GSAP
5. Set up form components with React Hook Form
6. Add API routes if needed
7. Implement dynamic content

---

**Foundation Version**: 1.0.0
**Next.js**: 14.2.0
**TypeScript**: 5.5.0
**Tailwind CSS**: 3.4.3
**Status**: ✅ Ready for Development
