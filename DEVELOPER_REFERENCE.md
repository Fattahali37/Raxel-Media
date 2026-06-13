# Raxel Media - Developer Quick Reference

## 🎨 Design Tokens (Always Available)

### Colors

Use these Tailwind classes throughout your components:

```tsx
// Primary Background
className = "bg-background"; // #0A0A0A
className = "bg-surface"; // #121212 (cards, elevated)

// Text Colors
className = "text-foreground"; // #F5F5F5 (main text)
className = "text-muted"; // #8A8A8A (secondary)

// Accent
className = "text-primary"; // #0FBF6A (links, highlights)
className = "hover:text-primary-dim"; // #0A8F4F

// Borders
className = "border border-border"; // #262626
```

### CSS Variables

Access directly in CSS/style props:

```css
background-color: var(--color-background);
color: var(--color-primary);
border-color: var(--color-border);
```

## 🔤 Typography

### Font Families

Already configured and available globally:

```tsx
// Space Grotesk - Headings
<h1>Large Title</h1>           // clamp(2rem, 5vw, 3.5rem)
<h2>Section Title</h2>         // clamp(1.75rem, 4vw, 2.5rem)
<h3>Subsection</h3>           // clamp(1.5rem, 3vw, 1.875rem)

// Inter - Body (default)
<p>Body text paragraph</p>     // clamp(0.95rem, 1.2vw, 1.05rem)
```

## 🛠️ Utility Functions

### cn() - Safe Class Merging

```tsx
import { cn } from "@/lib/utils";

// Safely merge classes
const buttonClass = cn(
  "px-4 py-2 rounded",
  isActive && "bg-primary text-background",
  isDisabled && "opacity-50 cursor-not-allowed",
);

<button className={buttonClass} />;
```

## 📂 File Organization

```
app/
├── layout.tsx              # Never modify directly
├── globals.css             # Global styles only
├── page.tsx                # Home page
├── (routes)/
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   └── contact/page.tsx
└── api/
    └── route.ts            # API endpoints
```

## 🎯 Common Patterns

### Page Template

```tsx
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Page Title | Raxel Media",
  description: "Page description",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-20">
        <h1 className="text-5xl font-bold text-primary mb-4">Section Title</h1>
        <p className="text-muted mb-8">Secondary text content</p>
      </section>
    </main>
  );
}
```

### Component Template

```tsx
"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: "primary" | "secondary";
}

export function MyComponent({ className, variant = "primary" }: Props) {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded transition-colors",
        variant === "primary" && "bg-primary text-background",
        variant === "secondary" &&
          "bg-surface text-foreground border border-border",
        className,
      )}
    >
      Component content
    </div>
  );
}
```

## 🎬 Animation Setup

### Framer Motion (Pre-installed)

```tsx
import { motion } from "framer-motion";

export function AnimatedElement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-foreground"
    >
      Animated content
    </motion.div>
  );
}
```

### GSAP (Pre-installed)

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GSAPAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 1,
      duration: 1,
    });
  }, []);

  return (
    <div ref={ref} className="opacity-0">
      Content
    </div>
  );
}
```

## 📝 Forms

### React Hook Form (Pre-installed)

```tsx
"use client";

import { useForm } from "react-hook-form";

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: "Email required" })}
        className="bg-surface border border-border text-foreground px-4 py-2 rounded"
        placeholder="your@email.com"
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
    </form>
  );
}
```

### Zod Validation (Pre-installed)

```tsx
import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactForm = z.infer<typeof contactSchema>;
```

## 🔍 SEO Best Practices

### Page Metadata

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | Raxel Media",
  description: "Compelling page description (155-160 chars)",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    title: "Page Title | Raxel Media",
    description: "Description for social sharing",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};
```

## 🚀 Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Check for lint errors

# Type Checking
npx tsc --noEmit         # Check TypeScript errors
```

## 💡 Pro Tips

1. **Use `cn()` for all conditional classes** - Never mix Tailwind with raw classes
2. **Keep components small** - Easier to test and reuse
3. **Use CSS variables for dynamic theming** - Already set up in globals.css
4. **Image optimization** - Use Next.js `<Image>` component
5. **Responsive design** - Use Tailwind breakpoints (sm, md, lg, xl, 2xl)
6. **Performance** - Keep animation heavy components `'use client'`

## 🎨 Color Usage Examples

```tsx
// Hero Section
<section className="bg-background text-foreground">

// Card
<div className="bg-surface border border-border rounded">

// Button
<button className="bg-primary text-background hover:bg-primary-dim">

// Link
<a href="#" className="text-primary hover:text-primary-dim">

// Text Hierarchy
<h1 className="text-foreground">Main</h1>
<p className="text-muted">Secondary</p>
```

---

**Last Updated**: June 2026
**Framework**: Next.js 14
**Ready to Ship**: ✅
