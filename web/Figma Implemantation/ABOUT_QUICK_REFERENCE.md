# About Page - Quick Reference Guide

## 🎯 Overview
Complete redesign of the About page with hero section, team showcase, and contact form.

## 📍 Location
- **File**: `/src/app/(common)/about/page.tsx`
- **Route**: `/about`
- **Figma Node**: 20484-1336

## 🎨 Color Palette

```css
/* Primary Colors */
--cyan: #08A6AE;          /* Badge, decorative lines */
--teal: #129AA1;          /* Buttons, CTAs */
--gold: #D2A634;          /* Required indicators, featured pill */
--black: #000000;         /* Headings */
--white: #FFFFFF;         /* Backgrounds */

/* Secondary Colors */
--gray-text: #9A9AA1;     /* Secondary text */
--border-gray: #F0F0F2;   /* Borders, dividers */
--light-yellow: #FAF6EB;  /* Featured pill bg */
--yellow-border: #EDDBAE; /* Featured pill border */
```

## 📐 Layout Structure

```
┌─────────────────────────────────────────────┐
│          Navbar (from layout)               │
├─────────────────────────────────────────────┤
│                                             │
│        Hero Section (799px height)          │
│  - Multi-gradient background                │
│  - Text content (right side)                │
│  - Image card with hashtag pills (left)     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│     Privacy/Info Text (centered)            │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│     Team Members Section                    │
│  - Title + Subtitle                         │
│  - 10-member grid (flex-wrap)               │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│     Contact Form Section                    │
│  - Title + Subtitle                         │
│  - Name + Phone (2 columns)                 │
│  - Message (textarea)                       │
│  - Submit button                            │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│     Contact Info Cards                      │
│  - Location | Hours | Phone                 │
│  (with vertical dividers)                   │
│                                             │
├─────────────────────────────────────────────┤
│          Footer (from layout)               │
└─────────────────────────────────────────────┘
```

## 🖼️ Assets

### Images (11 PNG files)
```
/public/images/about/
├── about-hero-image.png      (4096x2944) - Hero section
├── team-member-1.png          (2342x2928) - همایون آرون
├── team-member-2.png          (4096x2730) - همایون آرون
├── team-member-3.png          (2731x4096) - شاهین بیانی ⭐
├── team-member-4.png          (4096x2731) - همایون آرون
├── team-member-5.png          (4096x2732) - همایون آرون
├── team-member-6.png          (4096x2731) - سپیده صیاد
├── team-member-7.png          (4096x2732) - مجتبی فهیمده
├── team-member-8.png          (4096x2730) - علی محتشم
├── team-member-9.png          (2731x4096) - ناهید موکل
└── team-member-10.png         (2731x4096) - سامیار ارجمند
```

### Icons (5 SVG files)
```
/public/images/about/
├── icon-button.svg       (78x78)   - Hero badge icon
├── icon-arrow-left.svg   (24x24)   - CTA button arrow
├── icon-send.svg         (24x24)   - Form submit icon
├── icon-location.svg     (110x110) - Address card
└── icon-phone.svg        (110x110) - Phone card
```

## 🎭 Typography

### Headings
```typescript
// Hero Heading (H1)
className="text-[54px] font-extrabold leading-[1.37] text-right text-black"

// Section Headings (H2)
className="text-[32px] font-extrabold leading-[1.76] text-center text-black"

// Team Member Name (H3)
className="text-[20px] font-bold leading-[1.4] text-center text-black"
```

### Body Text
```typescript
// Large Body (18px)
className="text-[18px] font-medium leading-[1.76] text-right text-[#9A9AA1]"

// Medium Body (16px)
className="text-[16px] font-semibold leading-[1.76] text-right text-black"

// Small Body (15px)
className="text-[15px] font-medium leading-[1.76] text-center text-[#9A9AA1]"
```

### Special Text
```typescript
// Badge Text
className="text-[16px] font-semibold leading-[1.76] text-right text-[#08A6AE]"

// Button Text
className="text-[16px] font-semibold leading-[1.76] text-white"

// Hashtag Text
className="text-[20px] font-medium leading-[1.76] text-center text-[#D2A634]"
```

## 📦 Component Breakdown

### 1. Hero Section
```tsx
<div style={{ height: "799px", background: "multi-gradient" }}>
  {/* Text Content - Right Side */}
  <div className="absolute top-[222px] right-[822px] w-[536px]">
    {/* Badge + Title */}
    {/* Description */}
    {/* CTA Button */}
  </div>
  
  {/* Image Card + Pills - Left Side */}
  <div className="absolute top-[181px] left-[242px] w-[566px]">
    {/* White Card with Image */}
    {/* 3 Hashtag Pills (absolute) */}
  </div>
</div>
```

**Key Styles**:
- Background: Triple gradient layer
- Badge icon: 36x36px, cyan with shadow
- CTA button: 284x72px, teal background
- Image card: 383x524px, white with shadow
- Hashtag pills: Floating absolute positioning

### 2. Team Grid
```tsx
<div className="flex flex-wrap gap-[41.75px] justify-center">
  {/* Team Member Card (x10) */}
  <div className="flex flex-col items-center gap-9 w-[215px]">
    <div className="w-[215px] h-[215px] rounded-full">
      <Image src="..." alt="..." fill />
    </div>
    <div className="flex flex-col items-center gap-[10px]">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  </div>
</div>
```

**Special Card** (Team Member 3):
- Has decorative cyan lines on sides
- Indicates leadership position
- Lines: `border-l border-[#08A6AE]`

### 3. Contact Form
```tsx
<form className="flex flex-col gap-6">
  {/* Row: Name + Phone */}
  <div className="flex gap-6">
    <div className="w-[609px] h-[90px] border rounded-[22px]">
      <input type="text" placeholder="اینجا وارد کنید" />
    </div>
    <div className="w-[609px] h-[90px] border rounded-[22px]">
      <input type="text" placeholder="اینجا وارد کنید" />
    </div>
  </div>
  
  {/* Message Textarea */}
  <div className="w-full h-[180px] border rounded-[22px]">
    <textarea placeholder="اینجا وارد کنید..." />
  </div>
  
  {/* Submit Button */}
  <button className="w-[196px] h-[72px] bg-[#129AA1]">
    ارسال پیام
  </button>
</form>
```

### 4. Contact Cards
```tsx
<div className="flex items-center gap-[45px]">
  {/* Location Card */}
  <div className="flex items-center gap-[30px] w-[354px]">
    <Image src="icon-location.svg" />
    <div>
      <span>آدرس مجموعه</span>
      <span>تهران، زعفرانیه 20، پلاک 13</span>
    </div>
  </div>
  
  {/* Divider */}
  <div className="w-0 h-[63px] border-l" />
  
  {/* Working Hours Card (Special Gold) */}
  <div className="flex items-center gap-[30px] w-[355px]">
    <div className="w-[110px] h-[110px] bg-[#D2A634] rounded-full">
      ⏰
    </div>
    <div>
      <span>ساعت کاری</span>
      <span>شنبه تا پنجشنبه از 9 الی 20</span>
    </div>
  </div>
  
  {/* Divider */}
  {/* Phone Card */}
</div>
```

## 🎨 Shadows & Effects

```css
/* Badge Icon Shadow */
box-shadow: 0px 11px 20.6px 0px rgba(8, 166, 174, 0.22)

/* Hero Card Shadow */
box-shadow: -48px 7px 59px 67px rgba(210, 166, 52, 0.03)

/* Featured Hashtag Shadow */
box-shadow: 0px 19px 32.8px -15px rgba(210, 166, 52, 0.33)

/* Regular Hashtag Shadow */
box-shadow: 0px 19px 32.8px -15px rgba(0, 0, 0, 0.13)

/* Working Hours Icon Shadow */
box-shadow: 0px 11px 20.6px 0px rgba(210, 166, 52, 0.22)

/* Play Button Backdrop */
background: rgba(255, 255, 255, 0.2)
backdrop-filter: blur(6.5px)
```

## 📏 Spacing System

```typescript
// Section Gaps
gap-[52px]  // Title to content (team section)
gap-[42px]  // Title to content (contact section)
gap-[39px]  // Hero section elements
gap-[36px]  // Team member photo to info
gap-[30px]  // Contact card icon to text
gap-[24px]  // Form fields
gap-[22px]  // Hero text elements
gap-[10px]  // Inline small elements
gap-[9px]   // Button icon to text
gap-[7px]   // Section title to subtitle
gap-[6px]   // Contact label to value

// Padding
py-12  // Section padding (48px)
py-8   // Medium padding (32px)
px-8   // Form field padding (32px)
p-5    // Button padding (20px)
px-[87px] py-5  // Large button (87px, 20px)
```

## 🔧 Border Radius

```typescript
rounded-[30px]  // Hero card
rounded-[23px]  // Play button overlay
rounded-[22px]  // Form inputs
rounded-[18px]  // Buttons
rounded-[13px]  // Hashtag pills
rounded-[11px]  // Badge icon
rounded-[20px]  // Hero image container
rounded-full    // Team member photos, working hours icon
```

## 📱 Responsive Notes

**Current Implementation**: Desktop-only (1600px)

**Recommended Breakpoints**:
```typescript
// Desktop: 1600px+
// Laptop:  1200-1599px (scale down)
// Tablet:  768-1199px (2-column team grid)
// Mobile:  <768px (stack everything)
```

**Mobile Adaptations Needed**:
1. Hero: Stack text above image, remove absolute positioning
2. Team: Single column grid
3. Contact Form: Stack name/phone fields vertically
4. Contact Cards: Stack vertically, remove dividers
5. Typography: Scale down (54px → 32px for hero)

## ⚠️ Current Limitations

### Not Implemented
- ❌ Form validation logic
- ❌ Form submission endpoint
- ❌ Play button functionality
- ❌ CTA button navigation
- ❌ Mobile responsiveness
- ❌ Hover animations
- ❌ Loading states

### Needs Improvement
- ⚠️ Absolute positioning (breaks on mobile)
- ⚠️ Duplicate team member names
- ⚠️ Form accessibility (no proper labels)
- ⚠️ Image optimization needed
- ⚠️ Focus indicators missing

## 🎯 Quick Copy Patterns

### Team Member Card Template
```tsx
<div className="flex flex-col items-center gap-9 w-[215px]">
  <div className="w-[215px] h-[215px] rounded-full overflow-hidden relative">
    <Image
      src="/images/about/team-member-X.png"
      alt="نام عضو"
      fill
      className="object-cover"
    />
  </div>
  <div className="flex flex-col items-center gap-[10px] w-[109px]">
    <h3 className="text-[20px] font-bold leading-[1.4] text-center text-black">
      نام عضو
    </h3>
    <p className="text-[15px] font-medium leading-[1.76] text-center text-[#9A9AA1]">
      سمت
    </p>
  </div>
</div>
```

### Form Input Template
```tsx
<div className="flex items-center justify-end gap-5 px-8 py-8 border-[1.5px] border-[#F0F0F2] rounded-[22px] w-[609px] h-[90px]">
  <div className="flex items-end gap-[19px]">
    <input
      type="text"
      placeholder="اینجا وارد کنید"
      className="text-[16px] font-normal leading-[1.76] text-right text-[#9A9AA1] bg-transparent outline-none border-none"
    />
    <div className="w-0 h-[22.5px] border-l-[1.5px] border-[#F0F0F2] rounded-[10px]" />
  </div>
  <div className="flex items-center gap-2">
    <span className="text-[16px] font-semibold text-[#D2A634]">*</span>
    <span className="text-[16px] font-semibold leading-[1.76] text-right text-black">
      برچسب فیلد
    </span>
  </div>
</div>
```

### Button Template
```tsx
<button className="flex items-center justify-center gap-[9px] px-[87px] py-5 bg-[#129AA1] rounded-[18px] w-[284px] h-[72px]">
  <Image src="/images/about/icon-arrow-left.svg" alt="آیکون" width={24} height={24} />
  <span className="text-[16px] font-semibold leading-[1.76] text-white">
    متن دکمه
  </span>
</button>
```

## 📚 Related Documentation
- Full Implementation: `ABOUT_IMPLEMENTATION.md`
- Main Summary: `FIGMA_IMPLEMENTATION_COMPLETE.md`
- Figma Design: Node 20484-1336

## 🚀 Next Steps
1. Implement responsive design
2. Add form validation with react-hook-form
3. Connect form to backend
4. Add hover/focus states
5. Optimize images
6. Test accessibility

---

**Last Updated**: December 2024
**Status**: ✅ Design Complete | ⚠️ Functionality Pending
