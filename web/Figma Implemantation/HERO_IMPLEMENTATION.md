# Hero Section Implementation - Figma Design

This document describes the new Hero section implementation based on the Figma design from "Paygah-Danesh UI/UX".

## Overview

The Hero section has been completely redesigned based on the Figma design specifications. It replaces the previous `Header` component with a more visually appealing and feature-rich `Hero` component.

## Design Source

- **Figma File**: Paygah-Danesh UI/UX
- **Node ID**: 20484-247 (Hero section)
- **Design Link**: https://www.figma.com/design/VUaTQlV409u2HvwoG2AqYk/Paygah-Danesh-UI-UX?node-id=20484-247

## Key Features

### 1. Visual Design
- **Gradient Background**: Linear gradient from `#3DB4BA` to `#00B5BE` (cyan to teal)
- **Pattern Overlay**: SVG pattern with 14% opacity for visual depth
- **Responsive Layout**: Fully responsive design that adapts to mobile, tablet, and desktop screens

### 2. Header Section
- **Logo**: SVG logo for "پایگاه دانش معماری و شهرسازی ایرانی اسلامی"
- **Navigation Menu**: 
  - صفحه اصلی (Home)
  - وبلاگ (Blog)
  - نمودار (Graph)
  - چت بات (Chat Bot) - with "جدید" (New) badge
  - سیاست ها (Policies) - with dropdown indicator
- **Login Button**: Prominent login/register button with user icon
- **Mobile Menu**: Hamburger menu for mobile devices with slide-in navigation

### 3. Main Content Area
- **Headline**: Large, bold text "مقالات مرتبط را در یک نمودار بصری کاوش کنید"
- **Subtitle**: Descriptive text about the comprehensive database
- **Search Bar**: 
  - White rounded search input with search icon
  - Primary search button (yellow/gold `#D2A634`)
  - Advanced search button (white background)
- **Advanced Search Panel**: Collapsible advanced search options

### 4. Statistics Section
- **Article Count**: "+700 تعداد کل مقالات منتشر شده"
- **Topics Count**: "+۶۵۰ موضوعات کلیدی دسته بندی"
- Large, bold numbers with descriptive text

### 5. Trending Searches
- **Section Title**: "جستجو ها ترند محبوب این ماه"
- **Tags**: Interactive pill-shaped buttons with trending search terms
  - فروشگاه برتر
  - خرید آمازون
  - پرینتر سه بعدی
  - راهنمای خرید

## Technical Implementation

### Files Created/Modified

1. **`/src/components/organisms/Hero.tsx`** (NEW)
   - Main Hero component implementation
   - Responsive design with mobile menu
   - Integrated search functionality
   - Advanced search toggle

2. **`/src/app/page.tsx`** (MODIFIED)
   - Replaced `Header` component with `Hero` component
   - Maintains existing search functionality

3. **`/public/images/hero/`** (NEW DIRECTORY)
   - `hero-pattern.svg` - Background pattern (1600x867)
   - `logo.svg` - Main logo (162x52)
   - `user-icon.svg` - User/login icon (24x24)
   - `filter-icon.svg` - Filter/advanced search icon (24x24)
   - `search-icon.svg` - Search icon (24x24)

### Component Structure

```tsx
<Hero>
  └── <section> // Main container with gradient background
      ├── Background Pattern (Image overlay)
      ├── <header> // Navigation header
      │   ├── Logo
      │   ├── Desktop Navigation Menu
      │   ├── Desktop Login Button
      │   ├── Mobile Menu Button
      │   └── Mobile Menu (Collapsible)
      ├── Main Content
      │   ├── Title & Subtitle
      │   ├── Search Form
      │   │   ├── Search Input
      │   │   ├── Search Button
      │   │   └── Advanced Search Button
      │   └── Advanced Search Panel (Collapsible)
      └── Bottom Section
          ├── Statistics (2 stat boxes)
          └── Trending Searches
```

### Responsive Breakpoints

The design uses Tailwind CSS responsive utilities:

- **Mobile**: < 768px
  - Vertical layout
  - Hamburger menu
  - Stacked search buttons
  - Smaller text sizes
  
- **Tablet**: 768px - 1024px
  - Partial horizontal layout
  - Larger text sizes
  - Better spacing

- **Desktop**: > 1024px
  - Full horizontal layout
  - Original Figma design specifications
  - All spacing as per design (px-[104px], gap-[42px], etc.)

### Color Palette

- **Primary Gradient**: `#3DB4BA` → `#00B5BE`
- **Accent Button**: `#D2A634` (Gold/Yellow)
- **Secondary Button**: `#08A6AE` (Teal)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#9A9AA1` (Gray)
- **Badge**: `#D2A634` (Gold)

### Typography

- **Font Family**: Estedad-FD (Persian font)
- **Headline**: 54px (desktop), 800 weight
- **Subtitle**: 18px, 600 weight
- **Body**: 16px, 600 weight
- **Button Text**: 16px, 600 weight
- **Stats Numbers**: 58px, 800 weight

## Integration Points

### Search Functionality
The Hero component maintains full compatibility with the existing search system:
- Uses React Hook Form for form management
- Integrates with `DefaultSearchArrayValues` type
- Supports both simple and advanced search
- Maintains URL-based search parameters

### Advanced Search
- Uses existing `AdvancedSearch` component
- Toggle functionality with smooth transitions
- Preserves all filter options

### Authentication
- Login button links to `/login` route
- Can be extended to show user info when authenticated
- Mobile menu includes login option

## Design Specifications from Figma

### Layout Dimensions
- **Section Height**: 799px (minimum)
- **Header Padding**: 104px horizontal, 50px top
- **Content Width**: 707px (search area)
- **Navigation Gap**: 42px between items
- **Stats Position**: 80px from bottom

### Border Radius
- **Primary Buttons**: 18px
- **Search Input**: 18px
- **Tag Pills**: 360px (fully rounded)
- **Badge**: 12px

### Spacing
- **Navigation to Logo**: 199px gap
- **Stats to Trending**: 132px gap
- **Stat Items**: 59px gap
- **Title to Subtitle**: 20px gap
- **Content to Search**: 36px gap

## Browser Compatibility

The implementation uses modern CSS features and Next.js:
- CSS Grid and Flexbox
- Tailwind CSS utilities
- CSS Gradients
- CSS Transitions
- Next.js Image component for optimization

Supported browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

1. **Image Optimization**: All images use Next.js `Image` component for automatic optimization
2. **SVG Usage**: Icons and patterns use SVG for scalability and performance
3. **Lazy Loading**: Images are loaded with priority for hero section
4. **CSS Transitions**: Smooth transitions for interactive elements

## Accessibility

- Semantic HTML structure
- ARIA labels for mobile menu button
- Keyboard navigation support
- Focus states on interactive elements
- High contrast text (white on colored background)
- RTL layout support for Persian content

## Future Enhancements

Potential improvements that could be added:

1. **Authentication Integration**: Show user profile when logged in
2. **Search Suggestions**: Auto-complete for search input
3. **Trending Search Data**: Fetch real trending searches from API
4. **Animation**: Add subtle entrance animations
5. **Dark Mode**: Support for dark theme
6. **Policies Dropdown**: Implement actual dropdown menu for policies link
7. **Stats API**: Connect to real-time statistics from backend

## Testing Recommendations

1. **Responsive Testing**: Test on various screen sizes (320px - 1920px)
2. **Browser Testing**: Verify across different browsers
3. **RTL Testing**: Ensure proper RTL layout rendering
4. **Search Testing**: Verify search functionality works correctly
5. **Mobile Menu**: Test menu open/close on mobile devices
6. **Form Validation**: Test search input validation

## Notes

- The design follows Persian (Farsi) language conventions with RTL layout
- All text is in Persian and should be managed through i18n if multilingual support is needed
- The component is client-side rendered ("use client") for interactive features
- Pattern overlay uses 14% opacity as per Figma design
- Font loading should be handled at the application level (already configured)

## Migration Guide

If upgrading from the old `Header` component:

1. Replace `<Header>` import with `<Hero>` in page components
2. Remove `userLevel` prop if passed (not currently used)
3. Keep `defaultSearchArrayValues` prop (required)
4. Keep `pageAddress` prop (optional, for custom routing)
5. Ensure hero images are in `/public/images/hero/` directory

Example:
```tsx
// Old
import { Header } from "@/components/organisms/Header";
<Header defaultSearchArrayValues={defaultSearchArrayValues} />

// New
import { Hero } from "@/components/organisms/Hero";
<Hero defaultSearchArrayValues={defaultSearchArrayValues} />
```

## Support

For questions or issues related to the Hero section implementation:
- Check Figma design for visual reference
- Review component props and TypeScript types
- Test responsive behavior at different breakpoints
- Verify all hero images are properly loaded
