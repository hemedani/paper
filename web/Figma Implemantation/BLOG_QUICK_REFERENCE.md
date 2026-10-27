# Blog Page - Quick Reference Guide

## 🎯 Overview

Quick reference for the blog page implementation based on Figma design (Node ID: 20484-3616).

---

## 📁 File Locations

### Main Page

```
web/src/app/(common)/blog/page.tsx
```

### New Components

```
web/src/components/organisms/blog/
├── BlogHeroCard.tsx          # Featured article (688x428px)
├── NewBlogCard.tsx            # Grid article card (448px)
├── PopularBlogMiniCard.tsx    # Sidebar mini card (116x116px)
└── NewBlogSearchFilter.tsx    # Search & filters

web/src/components/molecules/
├── HashtagPills.tsx           # Popular hashtags
└── NewsletterSignup.tsx       # Email subscription
```

### Icons

```
web/public/images/blog/
├── category-icon.svg
├── author-icon.svg
├── date-icon.svg
├── email-icon.svg
├── search-advanced-icon.svg
├── search-icon.svg
├── dropdown-icon.svg
└── arrow-right-icon.svg
```

---

## 🎨 Quick Design Specs

### Colors

| Usage          | Hex       | Variable   |
| -------------- | --------- | ---------- |
| Primary Button | `#08A6AE` | Teal       |
| Active/Gold    | `#D2A634` | Gold       |
| Background     | `#F8F8F9` | Light Gray |
| Text Primary   | `#000000` | Black      |
| Text Secondary | `#9A9AA1` | Gray       |
| Border         | `#F0F0F2` | Light Gray |
| White          | `#FFFFFF` | White      |

### Typography

| Element       | Size | Weight | Line Height |
| ------------- | ---- | ------ | ----------- |
| Page Title    | 48px | 800    | 1em         |
| Section Title | 28px | 700    | 1.76em      |
| Hero Title    | 36px | 700    | 1.28em      |
| Card Title    | 22px | 700    | 1.55em      |
| Mini Title    | 18px | 600    | 1.44em      |
| Body          | 16px | 400    | 1.75em      |
| Metadata      | 16px | 600    | 1.5em       |

### Spacing

```css
6px   /* icon-text gap */
9px   /* pill gaps */
18px  /* form elements */
24px  /* card sections, main gap */
30px  /* section gaps */
34px  /* major sections */
56px  /* sidebar sections */
68px  /* hero layout */
84px  /* article grid rows */
```

### Border Radius

```css
18px   /* inputs, buttons */
20px   /* cards, images */
360px  /* pills (fully rounded) */
```

---

## 📐 Layout Structure

### Page Container

```tsx
max-width: 1600px
padding: 0 104px
```

### Hero Section

```tsx
width: 1242px (max)
gap: 68px
image: 688x428px
content: 486px
```

### Search Section

```tsx
width: 793px (centered)
height: 68px (search bar)
gap: 22px (between sections)
```

### Main Grid

```tsx
Left Column (Article Grid): 923px
Right Column (Sidebar): 445px
Gap: 24px
```

### Article Cards

```tsx
width: 448px
2 cards per row
row gap: 84px
card gap: 24px
image height: 300px
```

### Sidebar Cards

```tsx
width: 445px
image: 116x116px (square)
content: 308px
gap: 20px
```

---

## 💻 Component Usage

### BlogHeroCard

```tsx
import { BlogHeroCard } from "@/components/organisms/blog/BlogHeroCard";

<BlogHeroCard
  blog={featuredBlog}
  lesanUrl={lesanUrl}
  isLiked={favoriteIds.has(blog._id)}
  isLogedIn={me.success}
/>;
```

### NewBlogCard

```tsx
import { NewBlogCard } from "@/components/organisms/blog/NewBlogCard";

<NewBlogCard
  blog={blog}
  lesanUrl={lesanUrl}
  isLiked={favoriteIds.has(blog._id)}
  isLogedIn={me.success}
/>;
```

### PopularBlogMiniCard

```tsx
import { PopularBlogMiniCard } from "@/components/organisms/blog/PopularBlogMiniCard";

<PopularBlogMiniCard blog={blog} lesanUrl={lesanUrl} />;
```

### NewBlogSearchFilter

```tsx
import { NewBlogSearchFilter } from "@/components/organisms/blog/NewBlogSearchFilter";

<NewBlogSearchFilter
  categories={categories}
  pageAddress="/blog"
  defaultSearch={searchParams.search}
  defaultCategories={searchParams.categories?.split(",")}
/>;
```

### HashtagPills

```tsx
import { HashtagPills } from "@/components/molecules/HashtagPills";

<HashtagPills tags={["اقتصادان", "هویت", "معماری"]} />;
```

**Note**: Navigation is handled internally - clicking a tag will navigate to `/blog?search=tagName`

### NewsletterSignup

```tsx
import { NewsletterSignup } from "@/components/molecules/NewsletterSignup";

<NewsletterSignup />;
```

**Note**: Has default behavior (console log). Can optionally pass `onSubmit` prop for custom handling (only from client components).

---

## 🔄 Data Fetching

### Featured Blog (Hero)

```tsx
const featuredBlog = await getBlogs({
  set: { limit: 1, page: 1, isInSwipper: true },
  get: {
    /* fields */
  },
});
```

### Main Blogs (Grid)

```tsx
const blogs = await getBlogs({
  set: {
    limit: 6, // 2x3 grid
    page: currentPage,
    search: searchParams.search,
    categoryIds: searchParams.categories?.split(","),
  },
  get: {
    /* fields */
  },
});
```

### Most Popular (Sidebar)

```tsx
const mostLikedPosts = await getBlogs({
  set: { limit: 3, page: 1, sortByLikes: true },
  get: {
    /* fields */
  },
});
```

### Categories (Filters)

```tsx
const categories = await gets({
  set: { page: 1, limit: 30 },
  get: { _id: 1, name: 1 },
});
```

---

## 🎯 Key Features

### Search & Filter

- ✅ Text search input
- ✅ Category multi-select pills
- ✅ Advanced search toggle (expandable)
- ✅ URL parameter persistence
- ✅ Form validation (React Hook Form + Zod)

### Article Display

- ✅ Featured hero card (large format)
- ✅ 2-column grid (6 items per page)
- ✅ Hover effects (zoom, color change)
- ✅ Favorite toggle
- ✅ Metadata icons (date, category, author)

### Sidebar

- ✅ Most popular (3 mini cards)
- ✅ Popular hashtags (interactive pills with auto-navigation)
- ✅ Newsletter signup (email validation with default handling)
- ✅ Dividers between sections

### Pagination

- ✅ 6 items per page
- ✅ URL parameter integration
- ✅ Uses existing Pagination component

---

## 🔗 URL Parameters

```
/blog?search=معماری&categories=cat1,cat2&page=2
```

| Parameter    | Type   | Description                  |
| ------------ | ------ | ---------------------------- |
| `search`     | string | Search query                 |
| `categories` | string | Comma-separated category IDs |
| `page`       | number | Page number (1-based)        |

---

## 🎨 Styling Classes

### Common Patterns

**RTL Container**

```tsx
<div className="..." dir="rtl">
```

**Centered Section**

```tsx
<div className="max-w-[793px] mx-auto">
```

**2-Column Grid**

```tsx
<div className="flex flex-row gap-6">
  <div className="w-[923px]">...</div>
  <div className="w-[445px]">...</div>
</div>
```

**Card Hover**

```tsx
className = "group";
// Image:
className = "group-hover:scale-110 transition-transform";
// Title:
className = "group-hover:text-[#08A6AE] transition-colors";
```

**Pill Button**

```tsx
className =
  "flex flex-row justify-center items-center gap-2.5 px-[26px] py-4 border rounded-[360px] h-12";
```

---

## 🧪 Testing Checklist

### Visual

- [ ] Hero card displays correctly
- [ ] Search bar centered (793px)
- [ ] 2-column grid aligned
- [ ] Sidebar width correct (445px)
- [ ] All icons 24x24px
- [ ] Colors match Figma
- [ ] Fonts match specs

### Functional

- [ ] Search updates URL
- [ ] Category pills toggle
- [ ] Favorite button works
- [ ] Pagination navigates
- [ ] Newsletter validates email
- [ ] All links work
- [ ] Hover effects smooth

### Responsive

- [ ] Desktop (>1024px) - Full layout
- [ ] Tablet (768-1024px) - Adjusted
- [ ] Mobile (<768px) - Single column

---

## 🐛 Common Issues

### Image Not Loading

```tsx
// Check lesanUrl is correct
src={`${lesanUrl}/uploads/images/${blog.pic?.name}`}

// Add fallback
src={`${lesanUrl}/uploads/images/${blog.pic?.name || "placeholder.jpg"}`}
```

### RTL Alignment

```tsx
// Always add dir="rtl" to parent
<div dir="rtl">{/* Content */}</div>;

// Use text-right for alignment
className = "text-right";
```

### Category Not Filtering

```tsx
// Check categories exist in blog schema
if (blog.categories && blog.categories.length > 0) {
  // Display category
}
```

### Date Formatting

```tsx
// Use Persian locale
new Date(blog.createdAt).toLocaleDateString("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
```

---

## 📚 Related Documentation

- **BLOG_IMPLEMENTATION.md** - Complete design specs
- **BLOG_IMPLEMENTATION_SUMMARY.md** - Implementation summary
- **FIGMA_IMPLEMENTATION_COMPLETE.md** - Overall project status
- **QUICK_REFERENCE.md** - General quick reference

---

## 🚀 Quick Start

### Run Development Server

```bash
pnpm dev
```

### Navigate to Blog Page

```
http://localhost:3000/blog
```

### Test Features

1. Search for articles
2. Select categories
3. Click favorite icons
4. Navigate pages
5. Subscribe to newsletter

---

## 📞 Need Help?

### Check These Files

1. `BLOG_IMPLEMENTATION.md` - Detailed specs
2. `page.tsx` - Main page logic
3. Component files - Individual components

### Common Commands

```bash
# Run development server
pnpm dev

# Check for errors
pnpm lint

# Type check
pnpm type-check

# Build
pnpm build
```

### Important Notes

- **HashtagPills**: Handles navigation internally (server component compatible)
- **NewsletterSignup**: Has default submission behavior (server component compatible)
- Both components are client components but don't require function props from server

---

**Last Updated**: December 2024  
**Status**: ✅ Complete and Ready for Use
