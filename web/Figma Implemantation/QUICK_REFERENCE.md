# Quick Reference Guide - Figma Implementation

## 🎯 Overview

This guide provides quick access to all implemented components from the Paygah-Danesh Figma design.

---

## 📂 Component Locations

### Hero Section
```tsx
import { Hero } from "@/components/organisms/Hero";

<Hero defaultSearchArrayValues={searchValues} />
```
- **File**: `web/src/components/organisms/Hero.tsx`
- **Figma**: Node 20484-247
- **Docs**: `HERO_IMPLEMENTATION.md`

### Card Component
```tsx
import { Card } from "@/components/organisms/Card";

<Card article={articleData} isFavorite={false} />
```
- **File**: `web/src/components/organisms/Card.tsx`
- **Figma**: Node 20484-449
- **Docs**: `CARD_IMPLEMENTATION.md`

### Pagination
```tsx
import Pagination from "@/components/molecules/Pagination";

<Pagination countPage={100} initialPage={1} limit={20} />
```
- **File**: `web/src/components/molecules/Pagination.tsx`
- **Figma**: Node 20484-801
- **Docs**: `PAGINATION_IMPLEMENTATION.md`

### Footer
```tsx
import { Footer } from "@/components/organisms/NewFooter";

<Footer />
```
- **File**: `web/src/components/organisms/NewFooter.tsx`
- **Figma**: Node 20484-817
- **Docs**: `FOOTER_IMPLEMENTATION.md`

---

## 🎨 Color Palette

### Primary Colors
| Name          | Hex       | Usage                    |
|---------------|-----------|--------------------------|
| Teal Primary  | `#08A6AE` | Card accents, buttons    |
| Teal Start    | `#3DB4BA` | Hero gradient start      |
| Teal End      | `#00B5BE` | Hero gradient end        |
| Gold          | `#D2A634` | Primary buttons, active  |

### Neutral Colors
| Name          | Hex       | Usage                    |
|---------------|-----------|--------------------------|
| Black         | `#000000` | Primary text, titles     |
| Dark Gray     | `#9A9AA1` | Secondary text, meta     |
| Light Gray    | `#F0F0F2` | Borders, dividers        |
| BG Light      | `#F8F8F9` | Footer, pagination       |
| BG Cream      | `#FAF6EB` | Card icon backgrounds    |
| White         | `#FFFFFF` | Card backgrounds         |

### Accent Colors
| Name          | Hex       | Usage                    |
|---------------|-----------|--------------------------|
| Cyan Light    | `#EDFEFF` | Badges, buttons          |
| Gray Light    | `#F5F5F5` | Pagination ellipsis      |

---

## 📐 Typography

### Font Family
- **Primary**: Estedad-FD (Persian)
- **Branding**: Kamand (Footer logo text)

### Common Sizes
| Size  | Weight | Usage                        |
|-------|--------|------------------------------|
| 58px  | 700    | Hero stats numbers           |
| 54px  | 700    | Hero main title              |
| 20px  | 700    | Card title, Footer social    |
| 18px  | 500    | Hero subtitle                |
| 16px  | 600/700| Section titles, body text    |
| 14px  | 500/600| Card meta, Footer links      |
| 13px  | 500    | Footer copyright, card badge |

### Line Heights
- **Standard**: 1.76 (28px) - Most text
- **Titles**: 1.4 - Card titles
- **Body**: 1.5 - Card abstract

---

## 📏 Common Spacing

### Gaps
- **8px**: Tight spacing (pills, small gaps)
- **16px**: Medium spacing (section internals)
- **24px**: Card padding, section gaps
- **32px**: Large gaps (pagination, card grid)
- **48px**: Footer column gaps
- **140px**: Footer section gaps

### Border Radius
- **13px**: Keyword pills
- **14px**: Article type badges
- **20px**: Card buttons
- **32px**: Card component
- **100px**: Fully rounded (pagination, hero buttons)

---

## 🖼️ Assets Directory

```
/public/images/
├── hero/
│   ├── hero-pattern.svg
│   ├── logo.svg
│   ├── user-icon.svg
│   ├── search-icon.svg
│   └── filter-icon.svg
├── card/
│   ├── article-type-icon.svg
│   ├── journal-icon.svg
│   ├── authors-icon.svg
│   ├── keywords-icon.svg
│   └── view-icon.svg
├── pagination/
│   ├── arrow-right.svg
│   └── arrow-left.svg
└── footer/
    ├── logo-footer.svg
    └── social-icons.svg
```

---

## 🔗 Common Props

### Hero Props
```typescript
interface HeroProps {
  defaultSearchArrayValues: Array<{
    key: string;
    value: string;
    label: string;
  }>;
}
```

### Card Props
```typescript
interface CardProps {
  article: {
    _id: string;
    title: string;
    abstract: string;
    type: string;
    keywords: Array<{ _id: string; name: string }>;
    authors: Array<{ _id: string; name: string }>;
    publication?: { name: string };
    viewed: number;
    doi?: string;
  };
  isFavorite: boolean;
}
```

### Pagination Props
```typescript
interface PaginationProps {
  initialPage: number;    // Current page (1-based)
  countPage: number;      // Total item count
  limit?: number;         // Items per page (default: 20)
}
```

---

## 🎭 Interactive States

### Hover Effects
- **Links**: Gray (#9A9AA1) → Black (#000000)
- **Card Button**: Teal light (#EDFEFF) → Teal (#08A6AE)
- **Pills**: Border (#F0F0F2) → Teal (#08A6AE)

### Active States
- **Favorite**: Empty heart → Red (#EF4444) filled
- **Pagination**: White → Gold (#D2A634) background
- **Search Input**: Focus ring in teal

### Disabled States
- **Pagination Buttons**: Opacity 0.5, cursor not-allowed
- **Previous on page 1**: Gray, disabled
- **Next on last page**: Gray, disabled

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  - Single column cards
  - Stacked footer sections
  - Hamburger menu
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  - 2-column cards
  - Adjusted spacing
}

/* Desktop */
@media (min-width: 1024px) {
  - 3-column cards
  - Full Figma design
  - All features visible
}
```

---

## 🔧 Common Tasks

### Update Hero Search
```tsx
// In page.tsx
const defaultSearchArrayValues = [
  { key: "query", value: searchQuery, label: "جستجو" }
];

<Hero defaultSearchArrayValues={defaultSearchArrayValues} />
```

### Update Card Data
```tsx
// Map articles to cards
{articles.map((article) => (
  <Card
    key={article._id}
    article={article}
    isFavorite={favorites.includes(article._id)}
  />
))}
```

### Update Pagination
```tsx
const totalItems = countResult.qty;
const currentPage = Number(searchParams.page) || 1;
const itemsPerPage = Number(searchParams.limit) || 20;

<Pagination
  countPage={totalItems}
  initialPage={currentPage}
  limit={itemsPerPage}
/>
```

---

## 🐛 Troubleshooting

### Component Not Showing
1. Check import path is correct
2. Verify file location exists
3. Check for TypeScript errors
4. Ensure proper props passed

### Styling Issues
1. Verify Tailwind classes are correct
2. Check inline styles for px values
3. Ensure RTL direction (`dir="rtl"`)
4. Check container widths and padding

### Image Not Loading
1. Verify file exists in `/public/images/`
2. Check file name and extension
3. Ensure correct path in `src` prop
4. Check Next.js Image component usage

### Pagination Not Working
1. Verify URL params are updating
2. Check totalPages calculation
3. Ensure limit and countPage are numbers
4. Check router.push is called correctly

---

## 📚 Full Documentation

For detailed information, see:
- **HERO_IMPLEMENTATION.md** - Hero section details
- **CARD_IMPLEMENTATION.md** - Card component details
- **PAGINATION_IMPLEMENTATION.md** - Pagination details
- **FOOTER_IMPLEMENTATION.md** - Footer details
- **FIGMA_IMPLEMENTATION_SUMMARY.md** - Complete overview
- **FIGMA_IMPLEMENTATION_COMPLETE.md** - Project summary

---

## 🌐 Links

- **Figma File**: [Paygah-Danesh UI/UX](https://www.figma.com/design/VUaTQlV409u2HvwoG2AqYk/Paygah-Danesh-UI-UX)
- **Hero**: Node 20484-247
- **Card**: Node 20484-449
- **Pagination**: Node 20484-801
- **Footer**: Node 20484-817

---

## ✅ Checklist for New Pages

When adding components to a new page:

- [ ] Import required components
- [ ] Add component to JSX
- [ ] Pass correct props
- [ ] Check responsive layout
- [ ] Test RTL alignment
- [ ] Verify hover states
- [ ] Test on mobile
- [ ] Check accessibility
- [ ] Review documentation
- [ ] Test functionality

---

**Last Updated**: December 2024  
**Status**: ✅ All components implemented and documented
