# Card Component Implementation - Figma Design

This document describes the new Card component implementation based on the Figma design from "Paygah-Danesh UI/UX".

## Overview

The Card component has been completely redesigned based on the Figma design specifications. It displays article information in a clean, modern card layout with improved visual hierarchy and user interaction.

## Design Source

- **Figma File**: Paygah-Danesh UI/UX
- **Node ID**: 20484-449 (Card component)
- **Design Link**: https://www.figma.com/design/VUaTQlV409u2HvwoG2AqYk/Paygah-Danesh-UI-UX?node-id=20484-449

## Key Features

### 1. Visual Design
- **White Background**: Clean `#FFFFFF` background with subtle border
- **Border**: 1px solid `#F0F0F2` with 32px border radius
- **Padding**: 24px all around for consistent spacing
- **Max Width**: 398px for optimal readability
- **Hover Effect**: Shadow transition on hover

### 2. Card Structure

#### Top Section
- **Article Type Badge**: Light cyan background (`#EDFEFF`) with teal text (`#08A6AE`)
- **Article Type Icon**: Yellow/cream background (`#FAF6EB`) with 14px rounded corners
- **Favorite Button**: Heart icon that toggles between outlined and filled states

#### Content Section
- **Title**: 20px bold text in black, line-clamped to 3 lines (86px height)
- **Abstract**: 16px medium weight text in gray (`#9A9AA1`), truncated to 250 characters
- **Visual Separation**: 1.5px divider line in light gray (`#F0F0F2`)

#### Metadata Section
- **Journal/Publication**: Display with journal icon
- **Authors**: Shows first 2 authors in bordered pills (13px border radius)
- **Keywords**: Shows first 4 keywords in gray pills (`#F8F8F9` background)
- Each metadata row has icon (24x24) and label in gray text

#### Action Button
- **Full Width Button**: Light cyan background (`#EDFEFF`)
- **Text**: "مشاهده کامل مقاله" in teal (`#08A6AE`)
- **Icon**: View/eye icon (24x24)
- **Hover Effect**: Slightly darker background

### 3. Typography

- **Title**: Estedad-FD, 700 weight, 20px, 1.4 line-height
- **Abstract**: Estedad-FD, 500 weight, 16px, 1.5 line-height
- **Metadata Labels**: Estedad-FD, 500 weight, 16px, 1.76 line-height
- **Badge Text**: Estedad-FD, 600 weight, 14px, 1.76 line-height
- **Button Text**: Estedad-FD, 600 weight, 16px, 1.76 line-height

## Technical Implementation

### Files Modified

1. **`/src/components/organisms/Card.tsx`** (UPDATED)
   - Complete redesign based on Figma specifications
   - Removed complex hover animations and expand functionality
   - Simplified to clean, static card with hover shadow
   - Improved metadata display with icons
   - Limited display to essential information (first 2 authors, first 4 keywords)

2. **`/src/components/template/WraperCard.tsx`** (UPDATED)
   - Updated grid layout for better card spacing
   - Changed from 4-column to 3-column max grid
   - Added `justify-items-center` for proper card alignment
   - Increased gap from 5 to 6 for better spacing

3. **`/public/images/card/`** (NEW DIRECTORY)
   - `article-type-icon.svg` - Article type indicator (38x38)
   - `journal-icon.svg` - Journal/publication icon (24x24)
   - `authors-icon.svg` - Authors icon (24x24)
   - `keywords-icon.svg` - Keywords icon (24x24)
   - `view-icon.svg` - View article icon (24x24)

### Component Props

```tsx
{
  _id: string;                    // Article ID
  title: string;                  // Article title
  abstract: string;               // Article abstract
  authors: Array<{                // Author objects
    _id: string;
    first_name: string;
    last_name: string;
  }>;
  isFavorite: boolean;            // Initial favorite state
  level: "Editor" | "Manager" | "Ghost" | "Normal"; // User access level
  articleType: string;            // Type of article (journalArticle, book, etc.)
  keywords: Array<{               // Keyword objects
    _id: string;
    name: string;
  }>;
  publication: {                  // Publication information
    title: string;
  };
}
```

### State Management

```tsx
const [isFavorite, setIsFavorite] = useState(initialFavorite);
```

- Simple favorite toggle state
- No expand/collapse state (removed from previous version)
- No hover state tracking (uses CSS only)

### Key Functions

1. **handleFavoriteClick**: Toggles favorite status and updates backend
2. **handleQuery**: Navigates to filtered search with specific parameter
3. **fullAbstract**: Truncates abstract to 250 characters with ellipsis

## Design Specifications from Figma

### Card Dimensions
- **Width**: 398px (max-width)
- **Height**: Auto (hug content)
- **Padding**: 24px all sides
- **Gap**: 24px between major sections

### Border Radius Values
- **Card**: 32px
- **Article Type Badge**: 14px
- **Article Type Icon Container**: 14px
- **Author Pills**: 13px
- **Keyword Pills**: 13px
- **View Button**: 20px

### Color Palette
- **Background**: `#FFFFFF` (White)
- **Border**: `#F0F0F2` (Light Gray)
- **Primary Accent**: `#08A6AE` (Teal)
- **Secondary Background**: `#EDFEFF` (Light Cyan)
- **Badge Background**: `#FAF6EB` (Cream/Yellow)
- **Text Primary**: `#000000` (Black)
- **Text Secondary**: `#9A9AA1` (Gray)
- **Keyword Background**: `#F8F8F9` (Light Gray)
- **Favorite Active**: `#EF4444` (Red)

### Spacing
- **Card Internal Gap**: 24px
- **Top Section Gap**: 20px (219px flex gap for space-between)
- **Content Section Gap**: 12px
- **Metadata Section Gap**: 12px
- **Icon to Text Gap**: 5px
- **Pills Gap**: 8px (authors), 2px (keywords)

### Layout Structure

```
Card (398px max-width)
├── Top Section (gap: 20px)
│   ├── Left: Article Type Badge + Icon
│   └── Right: Favorite Button
├── Content Section (gap: 12px)
│   ├── Title (3 lines max, 86px height)
│   └── Abstract (truncated to 250 chars)
├── Divider (1.5px, #F0F0F2)
├── Metadata Section (gap: 12px)
│   ├── Journal/Publication
│   ├── Authors (2 max)
│   └── Keywords (4 max)
└── View Button
```

## Responsive Behavior

The card maintains its structure across different screen sizes:

- **Mobile** (< 640px): Single column, cards centered
- **Tablet** (640px - 1024px): 2-column grid
- **Desktop** (> 1024px): 3-column grid

Cards always maintain their max-width of 398px and are centered within their grid cell.

## Comparison with Previous Version

### Removed Features
- Complex hover expand/collapse animation
- Gradient colored top border
- Full abstract expansion
- Publication year and DOI inline display
- Tags section (kept only keywords)
- Custom article type icons (replaced with single icon)
- Multi-color gradients based on article type

### Added Features
- Cleaner, more spacious layout
- Icon-based metadata display
- Consistent teal color theme
- Simplified favorite button design
- Fixed height title section (3 lines)
- Limited display of authors and keywords for consistency

### Improved Features
- Better visual hierarchy
- More consistent spacing
- Cleaner color palette
- Better touch targets for mobile
- Improved readability with line-clamping
- More predictable card heights

## User Interactions

1. **Favorite Button**: Click to toggle favorite status
   - Requires login if user not authenticated
   - Updates backend and local state
   - Visual feedback with filled/outlined heart

2. **Author Pills**: Click to filter by author
   - Navigates to search page with authorIds filter

3. **Keyword Pills**: Click to filter by keyword
   - Navigates to search page with keywordIds filter

4. **View Button**: Navigate to full article page
   - Links to `/article/[_id]`

## Accessibility

- Semantic HTML structure
- ARIA label for favorite button
- Keyboard navigation support
- High contrast text colors
- Touch-friendly targets (minimum 44px)
- RTL layout support for Persian content

## Performance Optimizations

1. **Image Optimization**: Uses Next.js Image component for icons
2. **Simplified State**: Removed unnecessary state management
3. **CSS Transitions**: Uses CSS for hover effects instead of React state
4. **Truncation**: Text truncation done once on render, not dynamically

## Browser Compatibility

- Modern CSS features (Grid, Flexbox)
- CSS line-clamping for title
- Tailwind CSS utilities
- Next.js Image component

Supported browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Integration with Page

Cards are displayed in a grid layout via the `ListCard` wrapper component:

```tsx
<ListCard>
  {articles.body.map((item) => (
    <Card
      key={item._id}
      {...item}
      isFavorite={favoriteIds.has(item._id!)}
      level={me.success ? me.body.level : undefined}
    />
  ))}
</ListCard>
```

The grid automatically adjusts to show:
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

## Future Enhancements

Potential improvements that could be added:

1. **Lazy Loading**: Implement intersection observer for cards
2. **Skeleton Loading**: Add loading state placeholders
3. **Animation**: Subtle entrance animations on scroll
4. **More Metadata**: Toggle to show full authors/keywords list
5. **Quick Preview**: Hover modal with more details
6. **Share Button**: Social sharing functionality
7. **Bookmark Collections**: Organize favorites into collections
8. **Reading Progress**: Track and display reading progress

## Testing Recommendations

1. **Layout Testing**: Verify card display at different screen sizes
2. **Interaction Testing**: Test all click handlers work correctly
3. **Favorite Testing**: Verify favorite toggle with/without auth
4. **Navigation Testing**: Test all filter links work correctly
5. **Truncation Testing**: Test with various text lengths
6. **RTL Testing**: Ensure proper RTL layout rendering

## Notes

- The design follows Persian (Farsi) language conventions with RTL layout
- Text is truncated client-side for consistent card heights
- Only essential metadata is shown (2 authors, 4 keywords) to maintain clean design
- Abstract is limited to 250 characters to prevent overly tall cards
- Title is clamped to 3 lines (86px) for visual consistency
- Icons are SVG for scalability and performance

## Migration Guide

If upgrading from the previous Card component:

### Key Changes
1. Removed `tags` prop (using only `keywords`)
2. Removed `publicationYear` and `DOI` from main display
3. Simplified hover effects (no expand/collapse)
4. Fixed title height (3 lines max)
5. Limited authors to 2 and keywords to 4

### Props Comparison
```tsx
// Removed props
tags?: Array<{ _id: string; name: string }>;
publicationYear?: number;
DOI?: string;

// Kept props remain the same
_id, title, abstract, authors, isFavorite, level, 
articleType, keywords, publication
```

### Visual Changes
- Card width: Fixed at 398px max-width
- Border radius: Increased from 12px to 32px
- Color scheme: Changed to consistent teal theme
- Typography: Updated font sizes and weights
- Layout: More spacious with larger gaps

## Support

For questions or issues related to the Card component:
- Check Figma design for visual reference
- Review component props and TypeScript types
- Test responsive behavior at different breakpoints
- Verify all card images are properly loaded
- Check that favorite functionality works with authentication
