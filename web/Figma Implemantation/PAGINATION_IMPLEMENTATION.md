# Pagination Component Implementation

## Overview
This document describes the implementation of the Pagination component based on the Figma design (node-id: 20484:801) from the Paygah-Danesh UI/UX design file.

## Design Specifications

### Layout
- **Container**: Horizontal flex layout with 32px gap between elements
- **Height**: Fixed 56px height for all interactive elements
- **Alignment**: Center-aligned horizontally and vertically

### Components

#### 1. Next Button (بعدی) - Right side in RTL
- **Size**: Height 56px, padding: 24px 36px (hug width)
- **Background**: #F8F8F9 (light gray)
- **Text**: "بعدی" in black (#000000)
- **Font**: Estedad-FD, 16px, weight 600, line-height 1.76
- **Icon**: Arrow pointing right (4x7px), black stroke 1.5px
- **Gap**: 8px between icon and text
- **Border-radius**: 100px (fully rounded)
- **Disabled state**: Opacity 0.5, not-allowed cursor, gray text (#9A9AA1)

#### 2. Page Numbers Container
- **Layout**: Horizontal flex with 8px gap
- **Elements**: 
  - Active page button
  - Regular page buttons
  - Ellipsis indicator

##### Active Page Button
- **Size**: 56x56px (square)
- **Background**: #D2A634 (gold)
- **Text color**: #FFFFFF (white)
- **Font**: Estedad-FD, 16px, weight 600
- **Border-radius**: 100px

##### Regular Page Button
- **Size**: 56x56px (square)
- **Background**: Transparent
- **Border**: 1px solid #F0F0F2
- **Text color**: #000000 (black)
- **Font**: Estedad-FD, 16px, weight 600
- **Border-radius**: 100px

##### Ellipsis (...)
- **Size**: 67x56px
- **Background**: #F5F5F5 (light gray)
- **Text color**: #9A9AA1 (medium gray)
- **Font**: Estedad-FD, 16px, weight 500
- **Border-radius**: 100px
- **Padding**: 24px 36px

#### 3. Previous Button (قبلی) - Left side in RTL
- **Size**: Height 56px, padding: 24px 36px (hug width)
- **Background**: Transparent
- **Border**: 1px solid #F0F0F2
- **Text**: "قبلی" in gray (#9A9AA1)
- **Font**: Estedad-FD, 16px, weight 600, line-height 1.76
- **Icon**: Arrow pointing left (4x7px), gray stroke 1.5px
- **Gap**: 8px between text and icon
- **Border-radius**: 100px (fully rounded)
- **Disabled state**: Opacity 0.5, not-allowed cursor

## Implementation Details

### File Location
`web/src/components/molecules/Pagination.tsx`

### Props Interface
```typescript
interface PaginationProps {
  initialPage: number;    // Current active page
  countPage: number;      // Total number of items in database
  limit?: number;         // Items per page (default: 20)
}
```

### Key Features
1. **RTL Support**: Button order matches RTL layout (Next on right, Previous on left)
2. **Smart Page Display**: Shows first page, current page, last page, with ellipsis for gaps
3. **URL Integration**: Updates URL search params on page change
4. **Accessibility**: ARIA labels and current page indicators
5. **Disabled States**: Proper visual feedback for disabled buttons
6. **Responsive**: Maintains design consistency across screen sizes

### Assets
Downloaded SVG icons stored in `/public/images/pagination/`:
- `arrow-right.svg` - 5x9px arrow for Next button
- `arrow-left.svg` - 5x9px arrow for Previous button

### Logic
- Calculates total pages: `Math.ceil(countPage / limit)`
- Generates smart page number array with ellipsis when needed
- Maximum of 3 page buttons visible at once (configurable via `maxVisible`)
- Hides pagination when only 1 page exists

### Navigation
Uses Next.js navigation hooks:
- `useRouter()` - For programmatic navigation
- `useSearchParams()` - For reading current URL params
- Updates `page` query parameter while preserving other search params

## Usage Example

```tsx
<Pagination
  countPage={countDataArticle ? countDataArticle.qty : 0}
  initialPage={+actualSearchParams.page || 1}
  limit={+actualSearchParams.limit || 20}
/>
```

## Color Palette
- **Gold (Active)**: #D2A634
- **Black (Primary text)**: #000000
- **White**: #FFFFFF
- **Gray borders**: #F0F0F2
- **Light gray bg**: #F5F5F5, #F8F8F9
- **Medium gray text**: #9A9AA1

## Typography
- **Font Family**: Estedad-FD (Persian font)
- **Size**: 16px
- **Weights**: 500 (ellipsis), 600 (buttons and numbers)
- **Line Height**: ~28px (1.76em)

## Figma Reference
- **File**: VUaTQlV409u2HvwoG2AqYk (Paygah-Danesh UI/UX)
- **Node ID**: 20484:801
- **Frame Name**: Frame 1695580510
