# Blog Detail Page Implementation Documentation

## Overview

This document describes the implementation of the blog detail page based on the Figma design (node ID: 20484-2985). The page displays a full blog article with hero image, metadata, content sections, action buttons, consultation CTA, and related articles.

## Design Reference

- **Figma File**: Paygah-Danesh UI/UX (VUaTQlV409u2HvwoG2AqYk)
- **Node ID**: 20484-2985
- **Page Name**: Blog Details

## File Structure

```
web/src/
├── app/(common)/blog/[id]/
│   └── page.tsx                                    # Main blog detail page
├── components/
│   ├── molecules/
│   │   ├── ShareButton.tsx                         # Share functionality with fallback menu
│   │   ├── DownloadButton.tsx                      # Download blog as text file
│   │   └── LikeButton.tsx                          # Like/favorite blog post
│   └── organisms/blog/
│       └── RelatedBlogCard.tsx                     # Card for related articles
└── public/images/blog/
    ├── share-icon.svg                              # 24x24 share icon
    ├── download-icon.svg                           # 24x24 download icon
    ├── heart-icon.svg                              # 24x24 heart/like icon
    └── arrow-left-icon.svg                         # 108x49 arrow for navigation
```

## Page Layout & Components

### 1. Hero Image Section
- **Dimensions**: Full width × 409px height
- **Image**: Blog featured image (object-cover)
- **Background**: #F8F8F9 fallback color

### 2. Title Section
- **Container**: White background with rounded top corners (20px)
- **Layout**: Flex column with 20px gap
- **Content**:
  - Meta information row (date, category, author, badge)
  - Main title (32px font, bold)

#### Meta Information
- **Date**: Icon (27×27) + Persian formatted date (20px font, semibold)
- **Category**: Icon (27×27) + category name (20px font, semibold)
- **Author**: Icon (27×27) + full name (20px font, semibold)
- **Badge**: "مقاله ژورنالی" badge with teal background (#EDFEFF)

### 3. Content Section
- **Container**: White background with 48px padding
- **Sections**:

#### Abstract Section
- **Background**: Transparent
- **Title**: 24px, semibold, golden color (#D2A634)
- **Text**: 16px, justified, gray-500
- **Gap**: 12px between title and text

#### Regular Paragraph Sections
- **Title**: 24px, semibold, black
- **Text**: 16px, justified, gray-500
- **Gap**: 12px between title and text
- **Section Gap**: 48px between sections

#### Highlighted Box Section
- **Background**: White
- **Border**: 1px solid #F0F0F2
- **Radius**: 20px
- **Padding**: 32-36px
- **Title**: 24px, semibold, black
- **Text**: 16px, justified, gray-500

### 4. Action Buttons Section
- **Layout**: Horizontal flex with 32px gap
- **Buttons**:
  - Share Button (white, rounded-full, 36px padding-x, 24px padding-y)
  - Download Button (white, rounded-full, 36px padding-x, 24px padding-y)
  - Like Button (white, rounded-full, 36px padding-x, 24px padding-y)
- **Icon**: 24×24 SVG icons
- **Text**: 16px, semibold

### 5. Consultation CTA Box
- **Dimensions**: Full width × 283px height
- **Background**: Multi-layer gradient
  - Layer 1: Gray gradient (opacity varies)
  - Layer 2: Primary/teal gradients
  - Base: #F8F8F9
- **Decorative Element**: Large white circle (1242×1242, 20% opacity)
- **Content**:
  - Phone icon with backdrop blur
  - Text: "مشاوره آنلاین" (20px, semibold)
  - Phone number: "+98 912 574 0085" (22px, extrabold)
  - Mission statement (32px, extrabold, primary color)

### 6. Related Articles Section
- **Layout**: 3-column grid on desktop
- **Gap**: 24px between cards
- **Section Title**: 32px, extrabold, with arrow navigation
- **Cards**: Use `RelatedBlogCard` component

## Components Details

### ShareButton Component

**Location**: `web/src/components/molecules/ShareButton.tsx`

**Features**:
- Uses Web Share API when available (mobile devices)
- Fallback menu for desktop with:
  - Copy link to clipboard
  - Share on Twitter
  - Share on Telegram
- Client component with state management

**Props**:
```typescript
interface ShareButtonProps {
  url?: string;        // Default: current page URL
  title?: string;      // Default: document title
  className?: string;
}
```

**Usage**:
```tsx
<ShareButton title={blog.title} />
```

### DownloadButton Component

**Location**: `web/src/components/molecules/DownloadButton.tsx`

**Features**:
- Downloads blog content as plain text file
- Filename: `{blogTitle}.txt`
- Client-side file generation using Blob API

**Props**:
```typescript
interface DownloadButtonProps {
  blogTitle: string;
  blogContent: string;
  className?: string;
}
```

**Usage**:
```tsx
<DownloadButton 
  blogTitle={body.title} 
  blogContent={body.content} 
/>
```

### LikeButton Component

**Location**: `web/src/components/molecules/LikeButton.tsx`

**Features**:
- Toggles favorite status via API
- Requires authentication (shows alert if not logged in)
- Optimistic UI update
- Loading state during API call
- Client component with state management

**Props**:
```typescript
interface LikeButtonProps {
  blogId: string;
  initialIsLiked: boolean;
  isLoggedIn: boolean;
  className?: string;
}
```

**Usage**:
```tsx
<LikeButton
  blogId={blogId}
  initialIsLiked={favoriteIds.has(blogId)}
  isLoggedIn={me.success}
/>
```

**API Integration**:
```typescript
import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";

const result = await toggleFavBlog({
  set: { blogId },
  get: {},
});
```

### RelatedBlogCard Component

**Location**: `web/src/components/organisms/blog/RelatedBlogCard.tsx`

**Features**:
- Displays related blog article with image and metadata
- Hover effects (opacity change, image scale)
- Responsive image loading
- Text truncation (line-clamp)

**Props**:
```typescript
interface RelatedBlogCardProps {
  _id?: string;
  title: string;
  abstract: string;
  pic: { name: string };
  author: { first_name: string; last_name: string };
  categories?: { name: string }[];
  createdAt?: Date;
}
```

**Layout**:
- Image: 300px height, rounded corners (20px)
- Content: Title (22px, 2-line clamp) + Abstract (16px, 2-line clamp)
- Meta: Date, Category, Author with icons

**Usage**:
```tsx
{relatedArticles.map((article: blogSchema) => (
  <RelatedBlogCard key={article._id} {...article} />
))}
```

## Main Page Implementation

**Location**: `web/src/app/(common)/blog/[id]/page.tsx`

### Data Fetching

```typescript
// Get main blog
const { body, success } = await getBlog(blogId);

// Get user favorites
const me = await getMe({ _id: 1, favBlogs: { _id: 1 } });

// Get related articles
const relatedArticlesResult = await getBlogs({
  set: { limit: 3, page: 1 },
  get: {
    _id: 1,
    title: 1,
    abstract: 1,
    pic: { name: 1 },
    author: { first_name: 1, last_name: 1 },
    categories: { name: 1 },
    createdAt: 1,
  },
});
```

### Content Processing

```typescript
// Format dates
const persianCreatedDate = body.createdAt 
  ? format(new Date(body.createdAt), "dd MMMM yyyy") 
  : "";

// Format author name
const authorFullName = `${body.author.first_name} ${body.author.last_name}`;

// Get category
const categoryName = body.categories?.[0]?.name || "معماری اسلامی";

// Split content into paragraphs
const contentParagraphs = body.content
  .split("\n\n")
  .filter((p: string) => p.trim());
```

### Error Handling

If blog is not found:
- Display error message centered
- Show "پست مورد نظر یافت نشد" heading
- Provide back button to blog list page

## Styling & Design Tokens

### Colors
- Primary: `#08A6AE` (Teal)
- Golden/Warning: `#D2A634`
- Background: `#F8F8F9`
- Text Primary: `#000000`
- Text Secondary: `#9A9AA1`
- Border: `#F0F0F2`
- Badge Background: `#EDFEFF`
- White: `#FFFFFF`

### Typography
- **Font Family**: Estedad (Persian font)
- **Title (H1)**: 32px, font-bold, line-height 47px
- **Section Title (H2)**: 24px, font-semibold, line-height 42px
- **Body Text**: 16px, font-normal, line-height 28px (1.75)
- **Meta Info**: 20px, font-semibold, line-height 24px
- **Button Text**: 16px, font-semibold

### Spacing
- Container max-width: 1242px
- Section gap: 48px
- Card gap: 24px
- Button gap: 32px
- Inner padding: 48px (desktop)
- Border radius: 20px (large), 12px (small), 60px (buttons)

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md - lg)
- Desktop: > 1024px (lg)

## Icons & Assets

All icons are located in `/public/images/blog/`:

| Icon | Size | Usage |
|------|------|-------|
| `date-icon.svg` | 27×27 | Date/calendar indicator |
| `category-icon.svg` | 27×27 | Category indicator |
| `author-icon.svg` | 24×24 | Author indicator |
| `share-icon.svg` | 24×24 | Share button |
| `download-icon.svg` | 24×24 | Download button |
| `heart-icon.svg` | 24×24 | Like/favorite button |
| `arrow-left-icon.svg` | 108×49 | Navigation arrows |

## API Integration

### Get Blog
```typescript
import { getBlog } from "@/app/actions/blog/getBlog";

const { body, success } = await getBlog(blogId);
```

### Get Related Blogs
```typescript
import { getBlogs } from "@/app/actions/blog/getBlogs";

const result = await getBlogs({
  set: { limit: 3, page: 1 },
  get: { /* fields */ },
});
```

### Toggle Favorite
```typescript
import { toggleFavBlog } from "@/app/actions/blog/toggleFavBlog";

const result = await toggleFavBlog({
  set: { blogId },
  get: {},
});
```

### Get User Info
```typescript
import { getMe } from "@/app/actions/user/getMe";

const me = await getMe({ 
  _id: 1, 
  favBlogs: { _id: 1 } 
});
```

## Features & Functionality

### 1. Social Sharing
- **Web Share API**: Uses native share on mobile
- **Fallback Menu**: Custom share menu for desktop
- **Platforms**: Copy link, Twitter, Telegram

### 2. Download Content
- **Format**: Plain text (.txt)
- **Content**: Title + full content
- **Method**: Client-side Blob generation

### 3. Like/Favorite
- **Authentication**: Required (redirects if not logged in)
- **Toggle**: Add/remove from favorites
- **State**: Persisted in user profile
- **UI**: Heart icon with state indication

### 4. Related Articles
- **Algorithm**: Same category or recent (configurable)
- **Limit**: 3 articles
- **Display**: Grid layout with cards
- **Filtering**: Excludes current article

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Stack meta information vertically
- Reduce padding (24px)
- Stack action buttons vertically
- Single column related articles

### Tablet (640px - 1024px)
- 2-column layout for related articles
- Moderate padding (32px)
- Wrap meta information as needed

### Desktop (> 1024px)
- 3-column layout for related articles
- Full padding (48px)
- Horizontal meta information layout
- Side-by-side action buttons

## Performance Optimizations

1. **Image Loading**:
   - Priority loading for hero image
   - Lazy loading for related articles
   - Next.js Image component with automatic optimization

2. **Code Splitting**:
   - Client components marked with `"use client"`
   - Server components for data fetching

3. **Caching**:
   - Server-side data fetching cached by Next.js
   - Static generation when possible

## Accessibility

- Semantic HTML structure (`<article>`, `<section>`, etc.)
- Alt text for all images
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels where appropriate
- RTL text direction support

## Testing Checklist

- [ ] Page loads with valid blog ID
- [ ] 404 handling for invalid blog ID
- [ ] Hero image displays correctly
- [ ] All meta information shows properly
- [ ] Content paragraphs render with proper spacing
- [ ] Share button opens native share or menu
- [ ] Download button creates text file
- [ ] Like button toggles favorite status
- [ ] Like button shows alert when not logged in
- [ ] Related articles load and display
- [ ] Related articles link to correct pages
- [ ] Responsive layout works on all breakpoints
- [ ] RTL text displays correctly
- [ ] Persian date formatting works
- [ ] Images load from backend URL

## Known Issues & Limitations

1. **Content Structure**: Currently splits by `\n\n` - may need more sophisticated parsing for complex content (HTML, markdown, etc.)

2. **Related Articles**: Uses simple query (recent or by category) - could be enhanced with recommendation algorithm

3. **Download Format**: Only plain text - could add PDF or formatted document export

4. **Print Functionality**: Not implemented - could add print-optimized styles

5. **Reading Time**: Not calculated - could add estimated reading time

## Future Enhancements

1. **Content Features**:
   - Table of contents with anchor links
   - Reading progress indicator
   - Text-to-speech functionality
   - Adjustable font size and reading mode

2. **Social Features**:
   - Comments section
   - Author follow button
   - Share count display
   - Social proof (views, shares)

3. **SEO & Metadata**:
   - Open Graph tags
   - Twitter Cards
   - JSON-LD structured data
   - Canonical URLs

4. **Engagement**:
   - Reading time estimation
   - Related articles by tags/topics
   - "More from this author" section
   - Email newsletter subscription

5. **Accessibility**:
   - Keyboard shortcuts
   - Screen reader optimization
   - High contrast mode
   - Dyslexia-friendly font option

## Maintenance Notes

- Update Figma reference if design changes
- Keep icon set consistent with design system
- Monitor API response times for data fetching
- Review and optimize image sizes regularly
- Update content parsing logic as needed

## References

- Figma Design: `https://www.figma.com/design/VUaTQlV409u2HvwoG2AqYk/Paygah-Danesh-UI-UX?node-id=20484-2985`
- Next.js Image Docs: https://nextjs.org/docs/app/api-reference/components/image
- Web Share API: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
- date-fns-jalali: Persian date formatting library

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Production Ready
