# Footer Component Implementation

## Overview
This document describes the implementation of the Footer component based on the Figma design (node-id: 20484:817) from the Paygah-Danesh UI/UX design file.

## Design Specifications

### Layout
- **Background**: Light gray (#F8F8F9)
- **Max Width**: 1600px
- **Padding**: 68px top, 222px horizontal, 34px bottom
- **Overall Gap**: 47px between main sections

### Structure

The footer is organized into several main sections:

#### 1. Top Content Area
A horizontal layout containing:
- **Right Section**: About/Description (390px width)
- **Left Section**: Three columns of links

**Gap between sections**: 140px

#### 2. About Section (Right Side)

##### Logo and Title
- **Layout**: Horizontal row with 8px gap
- **Logo**: 160x36px SVG
- **Title Text**: "معماری و شهرسازی ایرانی اسلامی"
- **Font**: Kamand (serif), 12.99px, weight 300
- **Line Height**: 1.55
- **Letter Spacing**: -8%
- **Color**: Black (#000000)
- **Width**: 162px fixed

##### Description Text
- **Width**: 380px fixed
- **Font**: Estedad-FD, 14px, weight 500
- **Line Height**: 1.76 (24.6px)
- **Color**: Gray (#9A9AA1)
- **Text Align**: Justified
- **Content**: Project description about Islamic architecture articles

**Gap between logo and description**: 24px

#### 3. Links Columns (Left Side)

Three columns arranged right-to-left (RTL):

##### Column 1: اطلاعات مجموعه (Information)
**Links** (top to bottom):
- سوالات متداول (FAQ)
- شرایط و قوانین وبسایت (Terms)
- درباره ما (About)
- تماس با ما (Contact)

##### Column 2: تماس با ما (Contact)
**Information** (top to bottom):
- تهران، خیابان ولیعصر، پلاک 123
- 021 1234 5678 (dir="ltr")
- info@islamicarchitecture.com (dir="ltr")

##### Column 3: امکانات (Features)
**Links/Items** (top to bottom):
- جستجوی پیشرفته مقالات
- بلاگ معماری اسلامی
- تحلیل گرافیکی مقالات
- خدمات پس از فروش
- چت‌بات هوش مصنوعی (به زودی)

**Column Specifications**:
- **Gap between columns**: 48px
- **Title font**: Estedad-FD, 16px, weight 700, black (#000000)
- **Link font**: Estedad-FD, 14px, weight 600, gray (#9A9AA1)
- **Line Height**: 1.76 for all text
- **Gap between title and links**: 16px
- **Gap between links**: 8px
- **Hover effect**: Gray text transitions to black

#### 4. Divider Line
- **Width**: Full width
- **Border**: 1px solid #D7D7DA
- **Opacity**: 0.5
- **Margin**: 50px above and below

#### 5. Social Media Section
**Layout**: Horizontal row with space-between

- **Right Side**: Social media icons (147x24px SVG)
- **Left Side**: Text "ما را در دنیای مجازی دنبال کنید!"
  - Font: Estedad-FD, 20px, weight 700
  - Color: Black (#000000)
  - Line Height: 1.76

**Gap between sections**: 72px

#### 6. Copyright Section
- **Text**: "© 2025 شهر سازی اسلامی. توسعه یافته در واحد فناوری اطلاعات حوزه هنری"
- **Width**: 410px fixed
- **Alignment**: Center (mx-auto)
- **Font**: Estedad-FD, 13px, weight 500
- **Line Height**: 1.76
- **Color**: Gray (#9A9AA1)
- **Margin Top**: 47px from social section

## Implementation Details

### File Location
`web/src/components/organisms/NewFooter.tsx`

### Component Type
- Client-side component ("use client")
- Uses Next.js Link for navigation
- Uses Next.js Image for optimized assets

### Assets
Downloaded SVG files stored in `/public/images/footer/`:
- `logo-footer.svg` - 161x37px footer logo
- `social-icons.svg` - 147x24px social media icons

### Color Palette
| Element           | Color     | Usage                    |
|-------------------|-----------|--------------------------|
| Background        | `#F8F8F9` | Footer background        |
| Text Primary      | `#000000` | Titles, logo text        |
| Text Secondary    | `#9A9AA1` | Links, descriptions      |
| Divider           | `#D7D7DA` | Horizontal line          |
| Hover Text        | `#000000` | Link hover state         |

### Typography
| Element         | Font       | Weight | Size  | Line Height |
|-----------------|------------|--------|-------|-------------|
| Logo Title      | Kamand     | 300    | 13px  | 1.55        |
| Section Titles  | Estedad-FD | 700    | 16px  | 1.76        |
| Social Title    | Estedad-FD | 700    | 20px  | 1.76        |
| Description     | Estedad-FD | 500    | 14px  | 1.76        |
| Links           | Estedad-FD | 600    | 14px  | 1.76        |
| Copyright       | Estedad-FD | 500    | 13px  | 1.76        |

### Link Structure
```tsx
// Internal links with hover transition
<Link 
  href="/path"
  className="text-[#9A9AA1] hover:text-black transition-colors font-semibold"
  style={{
    fontSize: "14px",
    lineHeight: "1.76",
  }}
>
  Link Text
</Link>
```

### Responsive Considerations
The current implementation follows the desktop design exactly. For responsive design:
- **Desktop** (> 1024px): Full layout as specified
- **Tablet** (768px - 1024px): Reduce horizontal padding, adjust column gaps
- **Mobile** (< 768px): Stack columns vertically, reduce spacing

## Key Features

1. **RTL Layout**: Proper right-to-left alignment for Persian content
2. **Semantic HTML**: Uses proper footer, nav, and heading tags
3. **Accessibility**: Proper link structure and alt text for images
4. **Performance**: Next.js Image optimization, priority loading for logo
5. **Clean Design**: Light background, clear typography hierarchy
6. **Hover States**: Smooth color transitions on link hover

## Usage Example

```tsx
import { Footer } from "@/components/organisms/NewFooter";

export default function Layout({ children }) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

## Changes from Previous Version

### Removed
- ❌ Dark theme (gray-900 background)
- ❌ 4-column grid layout
- ❌ Newsletter signup form
- ❌ Individual social media icon links
- ❌ Border separators on headings
- ❌ Multiple footer link sections in copyright

### Added
- ✅ Light background (#F8F8F9)
- ✅ Logo with Persian branding text
- ✅ Justified description text
- ✅ 3-column link structure
- ✅ Unified social media icon image
- ✅ Cleaner, more spacious layout
- ✅ Figma-matching exact spacing
- ✅ Simplified copyright text

## Design Fidelity

### Exact Matches
- ✅ Background color: #F8F8F9
- ✅ All text colors match Figma
- ✅ Font sizes and weights exact
- ✅ Line heights: 1.76em throughout
- ✅ Gaps: 48px between columns, 16px title-to-links
- ✅ Logo dimensions: 160x36px
- ✅ Section widths: 390px for about

### Typography System
All text uses consistent line-height of 1.76 (28px) for visual rhythm, except:
- Logo title: 1.55 line-height
- Custom letter-spacing: -8% on logo text

## Maintenance Notes

### Updating Links
Links are organized by column. To add/remove:
1. Navigate to the appropriate column div
2. Add/remove Link components maintaining the gap structure
3. Keep consistent styling (font-size: 14px, line-height: 1.76)

### Updating Contact Information
Contact details are in Column 2. Remember:
- Phone and email use `dir="ltr"` for proper number/email display
- Address text remains RTL

### Updating Social Icons
Replace `/images/footer/social-icons.svg` with new icon set:
- Maintain 147x24px dimensions or adjust Image component
- Icons should be in a single horizontal row

### Updating Copyright
Copyright text is at the bottom. To update:
- Edit the text content
- Keep width: 410px for proper centering
- Maintain font-size: 13px

## Figma Reference
- **File**: VUaTQlV409u2HvwoG2AqYk (Paygah-Danesh UI/UX)
- **Node ID**: 20484:817
- **Frame Name**: Frame 1695580922

## Related Components
- Used in: `web/src/app/layout.tsx`
- Companion components: Hero, Card, Pagination
- Style guide: Matches project-wide Estedad-FD font system
