# Blog Page - Troubleshooting Guide

## 🔧 Common Issues and Solutions

This guide covers common issues you might encounter with the blog page implementation and their solutions.

---

## ⚠️ Error: Event handlers cannot be passed to Client Component props

### Problem
```
Error: Event handlers cannot be passed to Client Component props.
  <... tags={[...]} onTagClick={function onTagClick}>
                               ^^^^^^^^^^^^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
```

### Cause
In Next.js 13+ with the App Router, **server components cannot pass functions as props to client components**. This is because server components run on the server and functions cannot be serialized to send to the client.

### Solution
The components have been updated to handle this properly:

#### ✅ HashtagPills Component
**Before (causing error):**
```tsx
// In page.tsx (Server Component)
<HashtagPills
  tags={popularTags}
  onTagClick={(tag) => {
    console.log(tag);
  }}
/>
```

**After (fixed):**
```tsx
// In page.tsx (Server Component)
<HashtagPills tags={popularTags} />

// In HashtagPills.tsx (Client Component)
// Handles navigation internally
const handleTagClick = (tag: string) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("search", tag);
  router.push(`/blog?${params.toString()}`);
};
```

#### ✅ NewsletterSignup Component
**Before (causing error):**
```tsx
// In page.tsx (Server Component)
const handleNewsletterSubmit = async (email: string) => {
  "use server";
  console.log("Newsletter signup:", email);
};

<NewsletterSignup onSubmit={handleNewsletterSubmit} />
```

**After (fixed):**
```tsx
// In page.tsx (Server Component)
<NewsletterSignup />

// In NewsletterSignup.tsx (Client Component)
// Has default behavior, optional prop only for client component usage
const handleFormSubmit = async (data) => {
  if (onSubmit) {
    await onSubmit(data.email);
  } else {
    // Default behavior
    console.log("Newsletter signup:", data.email);
  }
};
```

---

## 🐛 Blog Images Not Loading

### Problem
Blog card images show broken image icon or don't load.

### Possible Causes & Solutions

#### 1. Incorrect LESAN_URL
**Check:**
```tsx
// In page.tsx
const lesanUrl = process.env.LESAN_URL || "http://localhost:1382";
```

**Solution:**
- Verify `.env.local` has correct `LESAN_URL`
- Check backend server is running
- Test URL in browser: `http://localhost:1382/uploads/images/`

#### 2. Missing Image Name
**Check:**
```tsx
src={`${lesanUrl}/uploads/images/${blog.pic?.name}`}
```

**Solution:**
Add fallback:
```tsx
src={`${lesanUrl}/uploads/images/${blog.pic?.name || "placeholder.jpg"}`}
```

#### 3. Next.js Image Domain Not Configured
**Check `next.config.js`:**
```js
module.exports = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1382',
        pathname: '/uploads/images/**',
      },
    ],
  },
}
```

---

## 🔍 Search Not Working

### Problem
Search input doesn't filter results or URL doesn't update.

### Solutions

#### 1. Check Form Submission
Verify search filter component is submitting correctly:
```tsx
// In NewBlogSearchFilter.tsx
const onSubmit = (data) => {
  const searchParamsObj = new URLSearchParams();
  if (data.search?.trim()) {
    searchParamsObj.append("search", data.search.trim());
  }
  router.push(`/blog?${searchParamsObj.toString()}`);
};
```

#### 2. Check Server-Side Search Params
Verify page.tsx receives and processes search params:
```tsx
const getSearchParams = await searchParams;

if (getSearchParams.search) {
  set.search = getSearchParams.search;
}
```

#### 3. Check Backend Support
Ensure backend `getBlogs` action supports search:
```tsx
// Backend should handle:
set: {
  search: "معماری",  // Search term
  categoryIds: ["cat1", "cat2"],  // Filter categories
}
```

---

## 📄 Pagination Not Working

### Problem
Clicking pagination buttons doesn't navigate or update content.

### Solutions

#### 1. Check Page Parameter
Verify URL updates with page parameter:
```tsx
// Should navigate to: /blog?page=2
const currentPage = parseInt(getSearchParams.page) || 1;
```

#### 2. Check Pagination Component Props
```tsx
<Pagination
  countPage={totalBlogs}      // Total number of items
  initialPage={currentPage}    // Current page (1-based)
  limit={6}                    // Items per page
/>
```

#### 3. Verify Total Count
Make sure `totalBlogs` is the total count, not just current page items:
```tsx
// If backend returns metadata with total:
const totalBlogs = blogs.success ? blogs.body.metadata?.total : 0;

// Or if backend returns all items on page 1:
const totalBlogs = blogs.success ? blogs.body.length : 0;
```

---

## ❤️ Favorite Toggle Not Working

### Problem
Clicking heart icon doesn't toggle favorite state or requires login.

### Solutions

#### 1. Check Authentication
Component should redirect if not logged in:
```tsx
const handleFavoriteClick = async () => {
  if (!isLogedIn) {
    router.push("/login");
    return;
  }
  // ... toggle logic
};
```

#### 2. Check Server Action
Verify `toggleFavBlog` action is working:
```tsx
const isAddedFavorite = await toggleFavBlog({
  set: { blogId: blog._id! },
  get: {},
});

if (isAddedFavorite.success) {
  setIsFavorite(!isFavorite);
}
```

#### 3. Check Initial State
Verify favorite IDs are passed correctly:
```tsx
const favoriteIds = me.success
  ? new Set(me.body.favBlogs?.map((fav) => fav._id))
  : new Set();

// In component:
isLiked={favoriteIds.has(blog._id!)}
```

---

## 🎨 Styling Issues

### Problem
Components don't match Figma design or spacing is off.

### Solutions

#### 1. Check RTL Direction
Always include `dir="rtl"` on parent containers:
```tsx
<div className="..." dir="rtl">
  {/* Persian content */}
</div>
```

#### 2. Verify Container Widths
Check max-width values match design:
```tsx
// Page container
<div className="max-w-[1600px] mx-auto px-[104px]">

// Hero section
<div className="max-w-[1242px] mx-auto">

// Search section
<div className="max-w-[793px] mx-auto">
```

#### 3. Check Tailwind Config
Ensure Tailwind is configured to scan all files:
```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

#### 4. Verify Font Loading
Check font is loaded in layout or globals.css:
```css
@font-face {
  font-family: 'Estedad';
  src: url('/fonts/Estedad-Regular.woff2') format('woff2');
}
```

---

## 📱 Responsive Issues

### Problem
Layout breaks on mobile or tablet devices.

### Current Status
**Desktop layout is fully implemented. Mobile/tablet responsive design is pending.**

### Temporary Solution
For now, the page is optimized for desktop (>1024px). For mobile development:

```tsx
// Add responsive classes
<div className="flex flex-col lg:flex-row gap-6">
  {/* Article Grid */}
  <div className="w-full lg:w-[923px]">
    {/* ... */}
  </div>
  
  {/* Sidebar */}
  <div className="w-full lg:w-[445px]">
    {/* ... */}
  </div>
</div>
```

---

## 🔢 Category Filtering Not Working

### Problem
Clicking category pills doesn't filter results.

### Solutions

#### 1. Check Category IDs
Verify categories have valid IDs:
```tsx
{categories.map((category) => (
  <button
    key={category._id}
    onClick={() => toggleCategory(category._id!)}
  >
    {category.name}
  </button>
))}
```

#### 2. Check URL Parameters
Verify categories are passed as comma-separated IDs:
```tsx
// Should be: /blog?categories=cat1,cat2,cat3
if (data.categories?.length) {
  searchParamsObj.append("categories", data.categories.join(","));
}
```

#### 3. Check Backend Processing
Ensure backend receives categoryIds array:
```tsx
if (getSearchParams.categories) {
  set.categoryIds = getSearchParams.categories.split(",");
}
```

---

## 📧 Newsletter Form Issues

### Problem
Newsletter form doesn't submit or shows validation errors.

### Solutions

#### 1. Email Validation Error
Make sure email is in correct format:
```tsx
// Zod schema validates email format
email: z.string().email("لطفا یک ایمیل معتبر وارد کنید")
```

**Valid formats:**
- ✅ `user@example.com`
- ✅ `name.surname@domain.co.ir`
- ❌ `invalid-email`
- ❌ `@example.com`

#### 2. Toast Notifications Not Showing
Verify react-hot-toast is configured in layout:
```tsx
// In layout.tsx
import { Toaster } from 'react-hot-toast';

<body>
  <Toaster position="top-center" />
  {children}
</body>
```

#### 3. Backend Integration
To add actual newsletter subscription:
```tsx
// Create server action
// web/src/app/actions/newsletter/subscribe.ts
export async function subscribeNewsletter(email: string) {
  // Call your backend API
  const response = await fetch(`${process.env.LESAN_URL}/api/newsletter`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return response.json();
}

// Use in component (from client component only)
<NewsletterSignup
  onSubmit={async (email) => {
    await subscribeNewsletter(email);
  }}
/>
```

---

## 🏷️ Hashtags Not Navigating

### Problem
Clicking hashtag pills doesn't navigate or filter.

### Solution
HashtagPills component now handles navigation internally:

```tsx
// In HashtagPills.tsx
const handleTagClick = (tag: string) => {
  const newSelectedTag = tag === selectedTag ? null : tag;
  setSelectedTag(newSelectedTag);

  if (newSelectedTag) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", newSelectedTag);
    router.push(`/blog?${params.toString()}`);
  } else {
    router.push("/blog");
  }
};
```

**Behavior:**
- First click: Navigates to `/blog?search=tagName`
- Second click (same tag): Clears filter, returns to `/blog`

---

## 🚨 TypeScript Errors

### Problem
TypeScript shows errors about missing types or properties.

### Solutions

#### 1. Blog Schema Missing Properties
If you see errors about missing properties on `blog` object:

```tsx
// Check if property exists before using
{blog.categories && blog.categories.length > 0 && (
  <span>{blog.categories[0].name}</span>
)}

// Add optional chaining
{blog.pic?.name}
{blog.author?.first_name}
```

#### 2. Implicit Any Types
If you see "implicitly has 'any' type" errors:

```tsx
// Add explicit types
{blogs.body.map((blog: blogSchema) => (
  <NewBlogCard key={blog._id} blog={blog} />
))}

// Or declare variable type
const filteredBlogs: blogSchema[] = blogs.body.filter(...);
```

#### 3. Missing Import Types
Ensure you import types from declarations:
```tsx
import { blogSchema, categorySchema } from "@/types/declarations/selectInp";
```

---

## 🔐 Authentication Issues

### Problem
User favorites not loading or login redirect not working.

### Solutions

#### 1. Check getMe Action
Verify user data is fetched correctly:
```tsx
const me = await getMe({ _id: 1, favBlogs: { _id: 1 } });
```

#### 2. Check Cookie/Token
Ensure authentication token is present:
- Check browser cookies for `token`
- Verify token is valid (not expired)
- Check backend authentication middleware

#### 3. Check isLogedIn Flag
Verify flag is passed correctly to components:
```tsx
isLogedIn={me.success}  // true if user is authenticated
```

---

## 📊 Performance Issues

### Problem
Page loads slowly or images take long to load.

### Solutions

#### 1. Optimize Images
Use Next.js Image component (already implemented):
```tsx
<Image
  src={imageUrl}
  alt={title}
  fill
  sizes="448px"  // Specify sizes for better optimization
  priority={isFeatured}  // Priority for above-fold images
/>
```

#### 2. Limit Data Fetching
Reduce number of items per request:
```tsx
// For blog grid: 6 items (2x3 grid)
set: { limit: 6, page: currentPage }

// For sidebar: 3 items only
set: { limit: 3, sortByLikes: true }
```

#### 3. Add Loading States
Show loading indicators while fetching:
```tsx
// Add suspense boundaries
<Suspense fallback={<LoadingSkeleton />}>
  <BlogGrid />
</Suspense>
```

---

## 🔍 Debug Checklist

When encountering issues, check these in order:

### 1. Browser Console
- [ ] Check for JavaScript errors
- [ ] Check for network errors (failed requests)
- [ ] Verify API responses in Network tab

### 2. Server Logs
- [ ] Check Next.js server logs
- [ ] Check backend API logs
- [ ] Verify no server-side errors

### 3. Environment Variables
- [ ] `.env.local` exists and has correct values
- [ ] `LESAN_URL` is correct
- [ ] Server is restarted after env changes

### 4. Build & Cache
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Rebuild
pnpm build
```

### 5. TypeScript Check
```bash
# Run type checking
pnpm type-check

# Or use tsc directly
npx tsc --noEmit
```

---

## 📞 Getting Help

### Documentation References
1. **BLOG_IMPLEMENTATION.md** - Complete design specifications
2. **BLOG_IMPLEMENTATION_SUMMARY.md** - Implementation overview
3. **BLOG_QUICK_REFERENCE.md** - Quick reference guide
4. **FIGMA_IMPLEMENTATION_COMPLETE.md** - Overall project status

### Useful Commands
```bash
# Start development server
pnpm dev

# Check for linting errors
pnpm lint

# Type checking
pnpm type-check

# Build for production
pnpm build

# Start production server
pnpm start
```

### Common Debugging Steps
1. Check browser console for errors
2. Verify environment variables
3. Check server logs
4. Test API endpoints manually
5. Clear cache and rebuild
6. Check TypeScript errors
7. Verify component props
8. Test with different data

---

## ✅ Verification Steps

After fixing an issue, verify:

- [ ] No errors in browser console
- [ ] No TypeScript errors
- [ ] Page renders correctly
- [ ] All interactions work
- [ ] Images load properly
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] Styling matches design
- [ ] RTL layout is correct
- [ ] Responsive on different screens

---

**Last Updated**: December 2024  
**Status**: ✅ All known issues documented and resolved
