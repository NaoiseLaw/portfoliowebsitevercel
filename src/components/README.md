# AnaphorShowcase Component

## Overview
The `AnaphorShowcase` component provides an interactive preview of the Anaphor Analytics website with responsive device views and fallback handling.

## Features
- ✅ Responsive device preview (Desktop/Tablet/Mobile)
- ✅ Browser chrome mockup for realistic look
- ✅ Automatic fallback if iframe is blocked
- ✅ Loading animation
- ✅ Professional styling with Tailwind CSS
- ✅ Project details section
- ✅ External link buttons
- ✅ Technology tags

## Installation

1. **Install required dependency:**
```bash
npm install lucide-react
```

2. **Import and use in your MDX file:**
```jsx
import AnaphorShowcase from '@/components/AnaphorShowcase';

// In your MDX content:
<AnaphorShowcase />
```

## Usage in Project Pages

The component is designed to be embedded directly in MDX project pages. It's currently used in:
- `content/projects/anaphor-analytics-website.mdx`

## Component Structure

```tsx
<AnaphorShowcase />
```

The component is self-contained and doesn't require any props. It includes:

1. **Device Toggle Buttons** - Switch between desktop, tablet, and mobile views
2. **Interactive Iframe** - Live preview of the website with browser chrome
3. **Fallback UI** - Elegant fallback when iframe is blocked
4. **Project Details** - Overview and key features sections
5. **External Links** - Direct links to visit the live site

## Styling

The component uses Tailwind CSS classes and is fully responsive. It includes:
- Professional color scheme
- Smooth transitions and hover effects
- Loading states and error handling
- Mobile-optimized layouts

## Browser Compatibility

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Handles iframe security restrictions gracefully
