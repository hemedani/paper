# Blog Detail Page - Quick Reference

## 🚀 Quick Start

```tsx
// Access the page
http://localhost:3000/blog/{blogId}
```

## 📁 Key Files

```
web/src/app/(common)/blog/[id]/page.tsx          # Main page
web/src/components/molecules/ShareButton.tsx     # Share functionality
web/src/components/molecules/DownloadButton.tsx  # Download as text
web/src/components/molecules/LikeButton.tsx      # Like/favorite toggle
web/src/components/organisms/blog/RelatedBlogCard.tsx  # Related articles
```

## 🎨 Page Sections

1. **Hero Image** - 409px height, full width
2. **Title Section** - Meta info (date, category, author, badge) + title
3. **Content** - Abstract + paragraphs (with highlighted box)
4. **Actions** - Share, Download, Like buttons
5. **CTA Box** - Consultation contact info with gradient
6. **Related** - 3 related articles in grid

## 🔧 Components Usage

### ShareButton
```tsx
<ShareButton title={blog.title} />
```
- Auto-detects Web Share API support
- Fallback menu: Copy, Twitter, Telegram

### DownloadButton
```tsx
<DownloadButton 
  blogTitle={body.title} 
  blogContent={body.content} 
/>
```
- Downloads as `.txt` file

### LikeButton
```tsx
<LikeButton
  blogId={blogId}
  initialIsLiked={favoriteIds.has(blogId)}
  isLoggedIn={me.success}
/>
```
- Requires authentication
- Toggles favorite status via API

### RelatedBlogCard
```tsx
<RelatedBlogCard 
  _id={article._id}
  title={article.title}
  abstract={article.abstract}
  pic={article.pic}
  author={article.author}
  categories={article.categories}
  createdAt={article.createdAt}
/>
```

## 📊 Data Flow

```typescript
// 1. Fetch blog
const { body, success } = await getBlog(blogId);

// 2. Get user favorites
const me = await getMe({ _id: 1, favBlogs: { _id: 1 } });

// 3. Get related articles
const related = await getBlogs({
  set: { limit: 3, page: 1 },
  get: { _id: 1, title: 1, abstract: 1, ... }
});

// 4. Process content
const paragraphs = body.content.split("\n\n").filter(p => p.trim());
```

## 🎯 Key Features

- ✅ Responsive design (mobile/tablet/desktop)
- ✅ RTL layout support
- ✅ Persian date formatting
- ✅ Social sharing (native + fallback)
- ✅ Download as text file
- ✅ Like/favorite with authentication
- ✅ Related articles recommendation
- ✅ Consultation CTA with gradient
- ✅ SEO-friendly structure

## 🖼️ Icons Used

| Icon | Path | Size |
|------|------|------|
| Date | `/images/blog/date-icon.svg` | 27×27 |
| Category | `/images/blog/category-icon.svg` | 27×27 |
| Author | `/images/blog/author-icon.svg` | 24×24 |
| Share | `/images/blog/share-icon.svg` | 24×24 |
| Download | `/images/blog/download-icon.svg` | 24×24 |
| Heart | `/images/blog/heart-icon.svg` | 24×24 |
| Arrow | `/images/blog/arrow-left-icon.svg` | 108×49 |

## 🎨 Design Tokens

```css
/* Colors */
--primary: #08A6AE;
--golden: #D2A634;
--background: #F8F8F9;
--border: #F0F0F2;
--badge-bg: #EDFEFF;

/* Typography */
--title: 32px bold;
--section-title: 24px semibold;
--body: 16px normal;
--meta: 20px semibold;

/* Spacing */
--container: 1242px;
--section-gap: 48px;
--card-gap: 24px;
--radius: 20px;
```

## 📱 Responsive

- **Mobile** (< 640px): Single column, reduced padding
- **Tablet** (640-1024px): 2 columns for related
- **Desktop** (> 1024px): 3 columns for related, full layout

## 🔍 Error Handling

```typescript
if (!success) {
  return (
    <ErrorView>
      <h1>پست مورد نظر یافت نشد</h1>
      <Link href="/blog">بازگشت به صفحه مقالات</Link>
    </ErrorView>
  );
}
```

## 🧪 Testing URLs

```bash
# Valid blog
http://localhost:3000/blog/507f1f77bcf86cd799439011

# Invalid blog (triggers 404)
http://localhost:3000/blog/invalid-id
```

## 📋 Common Tasks

### Add new action button
1. Create component in `components/molecules/`
2. Mark as `"use client"` if interactive
3. Add icon to `/public/images/blog/`
4. Import and use in page.tsx action section

### Modify content layout
1. Edit `page.tsx` content section
2. Adjust paragraph mapping logic
3. Update styling classes

### Change related articles logic
1. Modify `getBlogs` query in page.tsx
2. Update filter/sort parameters
3. Adjust limit/pagination

## 🐛 Common Issues

**Issue**: Icons not showing
- **Fix**: Check file path in `/public/images/blog/`

**Issue**: Date format wrong
- **Fix**: Verify `date-fns-jalali` import and format string

**Issue**: Like button not working
- **Fix**: Check user authentication status

**Issue**: Related articles not loading
- **Fix**: Verify API response and blog count

## 📚 Related Docs

- Full Implementation: `BLOG_DETAIL_IMPLEMENTATION.md`
- Blog List Page: `BLOG_IMPLEMENTATION.md`
- Design Reference: Figma node 20484-2985

---

**Quick Help**: For detailed information, see `BLOG_DETAIL_IMPLEMENTATION.md`
