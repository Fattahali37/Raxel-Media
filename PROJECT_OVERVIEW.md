# 🎨 Raxel Media - Visual Project Overview

## Project Tree

```
raxel-media/
├── 📄 .env.example              (Environment variables template)
├── 📄 .eslintrc.json            (ESLint configuration)
├── 📄 .gitignore                (Git ignore rules)
├── 📄 next-env.d.ts             (Auto-generated Next.js types)
├── 📄 next.config.js            (Next.js config - CommonJS)
├── 📄 package.json              (Dependencies & scripts)
├── 📄 package-lock.json         (Dependency lock file)
├── 📄 postcss.config.js         (PostCSS + Tailwind)
├── 📄 tailwind.config.ts        (Custom colors & fonts)
├── 📄 tsconfig.json             (TypeScript strict mode)
├── 📄 README.md                 (Project documentation)
├── 📄 SETUP_SUMMARY.md          (Complete setup details)
├── 📄 DEVELOPER_REFERENCE.md    (Quick reference guide)
│
├── 📁 app/
│   ├── 🎨 globals.css           (Global styles + design tokens)
│   ├── 📄 layout.tsx            (Root layout + metadata)
│   └── 📄 page.tsx              (Home page placeholder)
│
├── 📁 lib/
│   └── 🔧 utils.ts              (cn() utility function)
│
├── 📁 node_modules/             (Dependencies - auto-generated)
├── 📁 .next/                    (Next.js build output)
└── 📁 .git/                     (Git repository)
```

## 🎯 Design System at a Glance

### Color Palette

```
🟫 Background    #0A0A0A
🟪 Surface       #121212
🟢 Primary       #0FBF6A (Emerald Green)
🟢 Primary-Dim   #0A8F4F (Dark Green)
⚪ Foreground    #F5F5F5
🔘 Muted         #8A8A8A
⬜ Border        #262626
```

### Typography System

```
Headings (h1-h6):   Space Grotesk
Body & UI:          Inter
All Responsive:     Uses clamp() for fluid scaling
```

### Key Features Implemented

```
✨ Grain Texture Overlay       (Fixed position, low opacity)
🎨 CSS Custom Properties       (Color tokens)
📱 Responsive Typography       (clamp() sizing)
🔤 Font Optimization           (next/font/google)
♿ Accessibility Focus         (States, scrollbar, etc.)
🎯 Metadata & SEO              (Full OG tags)
🔧 Class Merging Utility       (cn() function)
🌙 Dark Mode First             (Optimized design)
```

## 📝 Key Files Explained

### `tailwind.config.ts`

Extends Tailwind with custom color palette and font families. Colors are available as Tailwind classes:

```tsx
<div className="bg-primary text-foreground">Color from config</div>
```

### `app/globals.css`

Master stylesheet containing:

- CSS variables for all design tokens
- Grain texture overlay effect
- Responsive typography scale
- Base styling and resets
- Focus states and accessibility
- Custom scrollbar styling

### `app/layout.tsx`

Root layout with:

- Metadata (title, description, OG tags, etc.)
- Font injection (Space Grotesk + Inter)
- Grain texture wrapper div
- Complete viewport configuration

### `lib/utils.ts`

Utility function for safe Tailwind class merging:

```tsx
cn("base-class", condition && "conditional-class");
```

## 🚀 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Run production server
npm run lint     # Run ESLint
```

## 🔗 Path Aliases

Configure in `tsconfig.json`:

```json
"@/*": ["./*"]
```

Usage:

```tsx
import { cn } from "@/lib/utils";
import { MyComponent } from "@/app/components/MyComponent";
```

## 🎬 Pre-installed Libraries

| Library           | Purpose              | Version |
| ----------------- | -------------------- | ------- |
| `framer-motion`   | Component animations | 12.40.0 |
| `gsap`            | Advanced animations  | 3.15.0  |
| `react-hook-form` | Form handling        | 7.79.0  |
| `zod`             | Schema validation    | 4.4.3   |
| `lucide-react`    | Icons                | 1.18.0  |
| `lenis`           | Smooth scroll        | 1.3.23  |
| `clsx`            | Conditional classes  | 2.1.1   |
| `tailwind-merge`  | Class merging        | 2.4.0   |

## 🎯 Quick Start Guide

### 1. Start Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### 2. Create a New Component

```tsx
import { cn } from "@/lib/utils";

export function Button({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded bg-primary text-background hover:bg-primary-dim",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 3. Create a New Page

```bash
# Create directory structure
app/about/page.tsx
```

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Raxel Media",
};

export default function About() {
  return (
    <main className="bg-background text-foreground">
      <h1>About Raxel Media</h1>
    </main>
  );
}
```

### 4. Use Colors from Design System

```tsx
// Text colors
className = "text-foreground"; // Main text
className = "text-muted"; // Secondary text
className = "text-primary"; // Accent color

// Background colors
className = "bg-background"; // Main background
className = "bg-surface"; // Cards

// Border colors
className = "border border-border";
```

## 📚 Documentation Files

| File                     | Purpose                               |
| ------------------------ | ------------------------------------- |
| `README.md`              | Project overview & setup instructions |
| `SETUP_SUMMARY.md`       | Complete configuration documentation  |
| `DEVELOPER_REFERENCE.md` | Code patterns & quick reference       |
| `PROJECT_OVERVIEW.md`    | This file                             |

## ✅ Setup Checklist

- [x] TypeScript configuration
- [x] Next.js 14 setup
- [x] Tailwind CSS with custom colors
- [x] Google Fonts integration
- [x] Global styles with design tokens
- [x] Root layout with metadata
- [x] Utility functions
- [x] ESLint configuration
- [x] Dependencies installed
- [x] Dev server tested
- [x] Production build verified
- [x] Documentation complete

## 🎨 Design Principles

1. **Dark-First**: Optimized for dark mode with premium black background
2. **Premium Feel**: Emerald green accent on near-black for sophistication
3. **Responsive**: All typography and layouts scale smoothly
4. **Performant**: Optimized fonts, minimal CSS, efficient imagery
5. **Accessible**: Focus states, contrast, semantic HTML
6. **Scalable**: Component-based architecture for growth

## 🚀 Ready for Features

This foundation is ready for:

- ✅ Hero sections
- ✅ Service cards
- ✅ Portfolio galleries
- ✅ Testimonial sections
- ✅ Contact forms
- ✅ Navigation & header
- ✅ Footer
- ✅ Dynamic content
- ✅ API integration

---

**Foundation Status**: Complete ✅
**Ready to Build**: Yes 🚀
**Last Updated**: June 13, 2026
