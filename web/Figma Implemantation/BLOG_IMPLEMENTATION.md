# Blog Page Implementation - Figma Design

## 🎯 Overview

This document details the implementation of the new blog page design from Figma (Node ID: 20484-3616). The design features a clean, modern layout with improved search functionality, featured article section, and organized content structure.

---

## 📋 Design Source

- **Figma File**: VUaTQlV409u2HvwoG2AqYk (Paygah-Danesh UI/UX)
- **Node ID**: 20484-3616 (Blogs)
- **Figma Link**: https://www.figma.com/design/VUaTQlV409u2HvwoG2AqYk/Paygah-Danesh-UI-UX?node-id=20484-3616

---

## 🎨 Component Breakdown

### 1. Page Structure

The blog page consists of the following main sections:

```
├── Header (Already implemented)
├── Hero Section (Featured Article Card)
├── Page Title & Description
├── Search & Filter Section
│   ├── Search Input
│   ├── Search Button
│   ├── Advanced Search Toggle
│   └── Category Filter Pills
├── Main Content Layout
│   ├── Article Grid (Left Column - 2 columns)
│   │   ├── Blog Cards (6 items)
│   │   └── Pagination
│   └── Sidebar (Right Column)
│       ├── Most Popular Section (3 mini cards)
│       ├── Popular Hashtags Section
│       └── Newsletter Signup
└── Footer (Already implemented)
```

---

## 🎨 Design Specifications

### Color Palette

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| Primary Button | Teal | `#08A6AE` | Search, CTA buttons |
| Active State | Gold | `#D2A634` | Active category pills |
| Background Light | Light Gray | `#F8F8F9` | Page background, cards |
| White | White | `#FFFFFF` | Card backgrounds |
| Text Primary | Black | `#000000` | Headings, titles |
| Text Secondary | Gray | `#9A9AA1` | Body text, metadata |
| Border | Light Gray | `#F0F0F2` | Borders, dividers |

### Typography

| Element | Font | Weight | Size | Line Height | Usage |
|---------|------|--------|------|-------------|-------|
| Page Title | Estedad | 800 | 48px | 1em | Main heading |
| Section Title | Estedad-FD | 700 | 28px | 1.76em | Section headings |
| Card Title | Estedad | 700 | 22px | 1.55em | Blog card titles |
| Body Text | Estedad | 400 | 16px | 1.75em | Descriptions, abstracts |
| Metadata | Estedad | 600 | 16px | 1.5em | Author, category, date |
| Button Text | Estedad-FD | 600 | 16px | 1.76em | Button labels |
| Tag Pills | Estedad | 500 | 16px | 1.5em | Category pills |

---

## 📐 Layout Dimensions

### Hero Section (Featured Article)

- **Container Width**: 1242px (max-width)
- **Layout**: Row (horizontal)
- **Gap**: 68px
- **Image Size**: 688x428px
- **Border Radius**: 20px
- **Content Width**: 486px

**Structure**:
```
┌─────────────────────────────────────────────────────┐
│  [Image: 688x428]  │  [Content: 486px width]        │
│                    │  - Category & Author tags      │
│                    │  - Title (36px, bold)          │
│                    │  - Description (18px)          │
│                    │  - "View Full Article" button  │
└─────────────────────────────────────────────────────┘
```

### Page Title Section

- **Alignment**: Center
- **Title**: 48px font, 800 weight
- **Description**: 18px font, 500 weight, max-width 446px
- **Gap**: 18px between title and description
- **Margin Bottom**: 39px

### Search & Filter Section

- **Container Width**: 793px (centered)
- **Layout**: Column
- **Gap**: 22px

**Search Row**:
- Height: 68px
- Border Radius: 18px
- Border: 1px solid #F0F0F2
- Gap between elements: 12px

**Search Input**:
- Padding: 20px 24px
- Placeholder: "جستجو کنید ..." (font-size: 16px, color: #9A9AA1)
- Icon: 24x24px search icon (right side)

**Search Button**:
- Background: #08A6AE
- Color: White
- Padding: 20px 36px
- Border Radius: 18px
- Text: "جستجو" (Search)

**Advanced Search Button**:
- Background: #000000
- Color: White
- Padding: 20px 36px
- Border Radius: 18px
- Text: "جستجوی پیشرفته" (Advanced Search)
- Icon: 24x24px filter icon

**Category Filter**:
- Title: "دسته‌بندی" (Categories) - 20px, 600 weight
- Pills Layout: Row, wrap
- Pill Gap: 9px
- Pill Border Radius: 360px (fully rounded)
- Pill Padding: 16px 26px
- Height: 48px

**Category Pill States**:
- Default: White background, #F0F0F2 border, black text
- Active/Selected: #F8F8F9 background, #F0F0F2 border, black text
- Hover: Border color changes to teal

### Main Content Grid

- **Layout**: Row (2 columns)
- **Gap**: 24px
- **Left Column**: 923px width (Article Grid)
- **Right Column**: 445px width (Sidebar)

### Article Grid (Left Column)

- **Layout**: Column
- **Gap**: 84px (between rows)

**Row Structure**:
- Layout: Row
- Gap: 24px
- Items per row: 2 cards
- Card Width: 448px

### Blog Card

- **Width**: 448px
- **Layout**: Column
- **Gap**: 24px
- **Border Radius**: 20px

**Image Section**:
- Height: 300px
- Width: 100% (fill)
- Border Radius: 20px
- Object Fit: Cover

**Content Section**:
- Padding: 0 (no internal padding)
- Layout: Column
- Gap: 24px

**Metadata Row**:
- Layout: Row
- Gap: 21px
- Alignment: Center

**Metadata Item**:
- Layout: Row
- Gap: 6px
- Icon: 24x24px
- Text: 16px, 600 weight
- Color: #000000

**Title**:
- Font: Estedad, 700 weight
- Size: 22px
- Line Height: 1.55em
- Margin Bottom: 12px
- Max Lines: 2 (line-clamp-2)

**Abstract**:
- Font: Estedad, 400 weight
- Size: 16px
- Line Height: 1.75em
- Color: #9A9AA1
- Max Lines: 2 (line-clamp-2)

### Pagination

- **Layout**: Row, Center aligned
- **Gap**: 32px
- **Height**: 56px
- **Border Radius**: 100px (fully rounded)

**Next Button (بعدی)**:
- Background: #F8F8F9
- Text Color: #000000
- Padding: 24px 36px
- Border Radius: 100px
- Position: Right side (RTL)
- Arrow Icon: Left arrow (4x7px)

**Page Numbers**:
- Active Page:
  - Background: #D2A634 (Gold)
  - Text Color: White
  - Size: 56x56px
  - Border Radius: 100px
- Inactive Pages:
  - Background: White
  - Border: 1px solid #F0F0F2
  - Text Color: #000000
  - Size: 56x56px
  - Border Radius: 100px
- Ellipsis:
  - Background: #F5F5F5
  - Text: "..." (#9A9AA1)
  - Size: 67x56px (wider)

**Previous Button (قبلی)**:
- Background: White
- Border: 1px solid #F0F0F2
- Text Color: #9A9AA1
- Padding: 24px 36px
- Border Radius: 100px
- Position: Left side (RTL)
- Arrow Icon: Right arrow (4x7px)

### Sidebar (Right Column)

- **Width**: 445px
- **Layout**: Column
- **Gap**: 56px

#### Most Popular Section

**Title**: "محبوب‌ترین ها" (Most Popular)
- Font: Estedad-FD, 700 weight
- Size: 28px
- Line Height: 1.76em
- Margin Bottom: 34px

**Card List**:
- Layout: Column
- Gap: 30px
- Divider: 1px solid #F0F0F2 between cards

**Popular Card**:
- Layout: Row
- Gap: 20px
- Alignment: Center

**Card Image**:
- Size: 116x116px
- Border Radius: 0px (no rounding - square)
- Object Fit: Cover

**Card Content**:
- Width: 308px
- Layout: Column
- Gap: 20px

**Card Title**:
- Font: Estedad, 600 weight
- Size: 18px
- Line Height: 1.44em
- Max Lines: 2
- Color: #000000

**Card Metadata**:
- Layout: Row
- Gap: 21px
- Items: Category, Author
- Icon: 24x24px
- Text: 16px, 600 weight

#### Popular Hashtags Section

**Title**: "هشتگ پر طرفدار" (Popular Hashtags)
- Font: Estedad-FD, 700 weight
- Size: 28px
- Margin Bottom: 26px

**Tags Layout**:
- Layout: Column
- Row Gap: 9px
- Items: Multiple rows of pills
- Pills per row: Auto-wrap

**Tag Pills**:
- Border Radius: 360px
- Padding: 16px 26px
- Height: 48px
- Border: 1px solid #F0F0F2
- Background: White (default) or #F8F8F9 (active)
- Text: 16px, 500 weight

#### Newsletter Section

**Title**: "خبرنامه پایگاه دانش" (Paygah Danesh Newsletter)
- Font: Estedad-FD, 700 weight
- Size: 28px
- Margin Bottom: 4px

**Description**:
- Font: Estedad, 500 weight
- Size: 16px
- Line Height: 1.76em
- Color: #9A9AA1
- Max Width: 362px

**Form Layout**:
- Gap: 18px
- Margin Top: 24px

**Email Input**:
- Width: 100%
- Height: 72px
- Border: 1px solid #F0F0F2
- Border Radius: 18px
- Padding: 27px 30px
- Placeholder: "ایمیل خود را وارد کنید"
- Icon: 24x24px email icon (right side)

**Submit Button**:
- Background: #08A6AE
- Color: White
- Height: 72px
- Width: 193px
- Border Radius: 18px
- Text: "ارسال درخواست" (Send Request)
- Padding: 20px 87px

---

## 🖼️ Assets

### Icons Downloaded (24x24px each)

All icons are located in `/public/images/blog/`:

1. **category-icon.svg** - Category/tag icon
2. **author-icon.svg** - Author/user icon
3. **date-icon.svg** - Calendar/date icon
4. **email-icon.svg** - Email/envelope icon
5. **search-advanced-icon.svg** - Filter/settings icon for advanced search
6. **search-icon.svg** - Magnifying glass for search input
7. **dropdown-icon.svg** - Dropdown arrow for category selector
8. **arrow-right-icon.svg** - Arrow for "View Full Article" button

---

## 💻 Component Implementation Plan

### 1. New Components to Create

#### `BlogHeroCard.tsx`
Featured article card at the top of the page.

**Props**:
```typescript
interface BlogHeroCardProps {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  isLogedIn: boolean;
}
```

**Features**:
- Large image (688x428px)
- Category and author badges
- Large title (36px)
- Description text
- "View Full Article" button with icon

#### `NewBlogCard.tsx`
Regular blog card for grid layout.

**Props**:
```typescript
interface NewBlogCardProps {
  blog: blogSchema;
  lesanUrl: string;
  isLiked: boolean;
  isLogedIn: boolean;
}
```

**Features**:
- Image (300px height)
- Metadata row (category, author, date)
- Title (22px, 2 lines max)
- Abstract (16px, 2 lines max)

#### `PopularBlogMiniCard.tsx`
Small card for sidebar "Most Popular" section.

**Props**:
```typescript
interface PopularBlogMiniCardProps {
  blog: blogSchema;
}
```

**Features**:
- Small square image (116x116px)
- Title (18px, 2 lines max)
- Category and author badges

#### `HashtagPills.tsx`
Popular hashtags display component.

**Props**:
```typescript
interface HashtagPillsProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}
```

**Features**:
- Pill-shaped tags
- Multiple rows with auto-wrap
- Click interaction (optional)

#### `NewsletterSignup.tsx`
Newsletter subscription form component.

**Props**:
```typescript
interface NewsletterSignupProps {
  onSubmit: (email: string) => Promise<void>;
}
```

**Features**:
- Email input with validation
- Submit button
- Loading state
- Success/error messages

#### `NewBlogSearchFilter.tsx`
Updated search and filter section.

**Props**:
```typescript
interface NewBlogSearchFilterProps {
  categories: categorySchema[];
  defaultSearch?: string;
  defaultCategories?: string[];
}
```

**Features**:
- Search input with icon
- Search button
- Advanced search toggle
- Category pills with selection
- Responsive layout

### 2. Update Existing Page

#### `page.tsx` Updates

**Data Fetching**:
- Fetch featured blog (for hero section)
- Keep existing blog fetching
- Add pagination support

**Layout Structure**:
```tsx
<div className="blog-page">
  {/* Hero Section */}
  <BlogHeroCard blog={featuredBlog} />
  
  {/* Page Title */}
  <PageTitle />
  
  {/* Search & Filters */}
  <NewBlogSearchFilter categories={categories} />
  
  {/* Main Layout */}
  <div className="main-layout">
    {/* Article Grid */}
    <div className="article-grid">
      {blogs.map(blog => <NewBlogCard blog={blog} />)}
      <Pagination />
    </div>
    
    {/* Sidebar */}
    <div className="sidebar">
      <PopularSection blogs={mostLikedPosts} />
      <HashtagSection tags={popularTags} />
      <NewsletterSection />
    </div>
  </div>
</div>
```

---

## 🎯 Key Features

### 1. Search Functionality

- **Basic Search**: Text input with instant search
- **Advanced Search**: Toggle for additional filters
- **Category Filtering**: Multi-select category pills
- **URL Parameters**: Search state persisted in URL

### 2. Featured Article

- **Large Hero Card**: Prominent display at top
- **High-Quality Image**: Large format (688x428px)
- **Enhanced Metadata**: Category, author prominently displayed
- **Call-to-Action**: Clear "View Full Article" button

### 3. Article Grid

- **2-Column Layout**: Optimal reading width
- **Pagination**: Navigate through articles
- **Consistent Cards**: Uniform design and spacing
- **Responsive**: Adjusts to screen size

### 4. Sidebar Features

- **Most Popular**: 3 trending articles
- **Popular Hashtags**: Quick topic navigation
- **Newsletter**: Email subscription form
- **Fixed Width**: 445px for consistency

### 5. Responsive Design

- **Desktop** (>1024px): Full layout with sidebar
- **Tablet** (768px-1024px): Adjusted spacing, possible stack
- **Mobile** (<768px): Single column, stacked layout

---

## 🔄 User Interactions

### Search & Filter

1. **Search Input**:
   - Type query → Update URL → Fetch results
   - Clear input → Reset search

2. **Category Pills**:
   - Click pill → Toggle selection
   - Active state → Gold background
   - Multiple selection → Combine filters

3. **Advanced Search**:
   - Toggle button → Show/hide advanced options
   - Additional filters (date range, author, etc.)

### Blog Cards

1. **Hover Effects**:
   - Image zoom (scale 1.1)
   - Shadow increase
   - Title color change to teal

2. **Click Actions**:
   - Card click → Navigate to article
   - Like button → Toggle favorite
   - Category badge → Filter by category
   - Author badge → Filter by author

### Pagination

1. **Navigation**:
   - Next button → Load next page
   - Previous button → Load previous page
   - Page number → Jump to specific page
   - Ellipsis → Indicate more pages

### Newsletter

1. **Form Submission**:
   - Enter email → Validate format
   - Click submit → Send to backend
   - Show loading → Display success/error

---

## 🎨 Styling Guidelines

### Container Widths

```css
.blog-page {
  max-width: 1600px; /* Overall page max */
  margin: 0 auto;
  padding: 0 104px; /* Side padding */
}

.hero-section {
  max-width: 1242px;
  margin: 0 auto;
}

.search-section {
  max-width: 793px;
  margin: 0 auto;
}

.main-content {
  max-width: 1392px; /* 923px + 24px gap + 445px */
  margin: 0 auto;
  display: grid;
  grid-template-columns: 923px 445px;
  gap: 24px;
}
```

### Spacing System

```css
/* Gap values used throughout */
--gap-xs: 6px;   /* Icon-text pairs */
--gap-sm: 9px;   /* Category pills */
--gap-md: 18px;  /* Form elements */
--gap-lg: 24px;  /* Card sections, columns */
--gap-xl: 32px;  /* Pagination elements */
--gap-2xl: 48px; /* Major sections */
--gap-3xl: 56px; /* Sidebar sections */
--gap-4xl: 84px; /* Article rows */
```

### Border Radius

```css
--radius-sm: 13px;   /* Small elements */
--radius-md: 18px;   /* Inputs, buttons */
--radius-lg: 20px;   /* Cards, images */
--radius-xl: 32px;   /* Large containers */
--radius-full: 360px; /* Pills, pagination */
```

### Shadows

```css
/* Card shadow */
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);

/* Card hover shadow */
box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);

/* Button shadow */
box-shadow: 0px 2px 4px rgba(8, 166, 174, 0.2);
```

---

## 📱 Responsive Breakpoints

### Desktop (1440px and above)

- Full 2-column grid layout
- Sidebar visible
- All elements at full width
- Optimal reading experience

### Laptop (1024px - 1439px)

- Maintain 2-column layout
- Reduce side padding
- Adjust card widths proportionally
- Keep sidebar

### Tablet (768px - 1023px)

- Single column for main content
- Sidebar moves below content
- Wider cards (full width)
- Adjusted spacing

### Mobile (< 768px)

- Single column layout
- Stack all elements
- Full-width cards
- Simplified navigation
- Hamburger menu for filters

---

## 🧪 Testing Checklist

### Visual Testing

- [ ] Hero card displays correctly at all breakpoints
- [ ] Search section is properly centered
- [ ] Category pills wrap correctly
- [ ] Article grid maintains 2-column layout
- [ ] Sidebar aligns properly with content
- [ ] Pagination centers correctly
- [ ] All icons display at correct size (24x24px)
- [ ] Fonts render at specified sizes
- [ ] Colors match Figma exactly
- [ ] Spacing matches design specifications

### Functional Testing

- [ ] Search input updates URL parameters
- [ ] Category selection toggles correctly
- [ ] Advanced search toggle works
- [ ] Blog cards link to correct articles
- [ ] Like/favorite button updates state
- [ ] Pagination navigates correctly
- [ ] Newsletter form validates email
- [ ] Newsletter form submits successfully
- [ ] Popular hashtags are clickable
- [ ] Category badges filter content

### Responsive Testing

- [ ] Layout adjusts at 1440px breakpoint
- [ ] Layout adjusts at 1024px breakpoint
- [ ] Layout adjusts at 768px breakpoint
- [ ] Mobile view (< 768px) displays correctly
- [ ] All interactive elements work on touch devices
- [ ] Images load properly on all devices
- [ ] Text remains readable at all sizes

### Performance Testing

- [ ] Images use Next.js Image optimization
- [ ] Lazy loading for below-fold content
- [ ] No layout shift (CLS score < 0.1)
- [ ] Fast page load time (< 3s)
- [ ] Smooth scrolling performance
- [ ] No memory leaks on navigation

### Accessibility Testing

- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have aria-labels where needed
- [ ] Keyboard navigation works throughout
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader announces content correctly

---

## 🚀 Implementation Steps

### Phase 1: Component Creation (Priority: High)

1. Create `BlogHeroCard.tsx` component
2. Create `NewBlogCard.tsx` component
3. Create `PopularBlogMiniCard.tsx` component
4. Create `NewBlogSearchFilter.tsx` component
5. Download and organize all required icons

### Phase 2: Sidebar Components (Priority: Medium)

1. Create `HashtagPills.tsx` component
2. Create `NewsletterSignup.tsx` component
3. Create `MostPopularSection.tsx` wrapper component
4. Style all sidebar components according to design

### Phase 3: Page Layout (Priority: High)

1. Update `page.tsx` with new layout structure
2. Implement hero section
3. Implement search section
4. Implement article grid with pagination
5. Implement sidebar with all sections

### Phase 4: Styling & Polish (Priority: Medium)

1. Apply exact spacing from Figma
2. Match colors precisely
3. Implement hover effects
4. Add transitions and animations
5. Ensure RTL support throughout

### Phase 5: Responsive Design (Priority: High)

1. Implement desktop layout
2. Adjust for laptop screens
3. Create tablet layout
4. Create mobile layout
5. Test all breakpoints

### Phase 6: Testing & Optimization (Priority: High)

1. Run visual QA against Figma
2. Test all interactions
3. Verify responsive behavior
4. Optimize images and performance
5. Test accessibility
6. Cross-browser testing

---

## 📝 Migration Notes

### From Current Implementation

**What to Keep**:
- Server actions for data fetching
- Authentication logic
- Favorite toggle functionality
- Link structure

**What to Update**:
- Page layout structure
- Card component design
- Search filter UI
- Pagination styling

**What to Add**:
- Hero/featured article section
- Popular hashtags section
- Newsletter signup
- New metadata display (date icons, etc.)

---

## 🔗 Related Documentation

- **FIGMA_IMPLEMENTATION_COMPLETE.md** - Overview of all implemented components
- **FIGMA_IMPLEMENTATION_SUMMARY.md** - Summary of Hero, Card, Pagination, Footer
- **QUICK_REFERENCE.md** - Quick reference for colors, typography, spacing

---

## ✅ Success Metrics

### Design Fidelity

- [ ] 100% color palette match
- [ ] 100% typography match
- [ ] 100% spacing match
- [ ] All icons implemented correctly
- [ ] Hover states match design

### Code Quality

- [ ] Zero TypeScript errors
- [ ] Zero ESLint warnings
- [ ] Proper component structure
- [ ] Reusable components
- [ ] Clean, maintainable code

### Performance

- [ ] Page load < 3s
- [ ] Images optimized
- [ ] No unnecessary re-renders
- [ ] Smooth animations (60fps)
- [ ] Good Lighthouse scores (>90)

### User Experience

- [ ] Intuitive navigation
- [ ] Fast search results
- [ ] Smooth interactions
- [ ] Accessible to all users
- [ ] Works on all devices

---

**Implementation Date**: December 2024  
**Design Version**: Figma VUaTQlV409u2HvwoG2AqYk  
**Status**: 📝 Documentation Complete - Ready for Implementation
