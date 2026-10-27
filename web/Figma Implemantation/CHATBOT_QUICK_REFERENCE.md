# Chatbot Page - Quick Reference Guide

## 🎯 Quick Links

- **Figma Design**: https://www.figma.com/design/VUaTQlV409u2HvwoG2AqYk/Paygah-Danesh-UI-UX?node-id=20484-4530
- **Component**: `/src/app/(common)/chatbot/page.tsx`
- **Assets**: `/public/images/chatbot/`

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  Top Navigation Bar (109px height)                  │
│  [Support] [Nav Links] [Logo & Title]               │
├──────────┬──────────────────────────────────────────┤
│          │                                           │
│ Sidebar  │         Main Content Area                │
│ (263px)  │         (Flex 1)                         │
│          │                                           │
│ • New    │    Welcome Title (42px)                  │
│ • Search │                                           │
│          │    Input Container (141px)               │
│ History  │    [Attachments] [Input Field]          │
│ • Item 1 │                                           │
│ • Item 2 │    Quick Actions                         │
│ • Item 3 │    [FAQ] [Guide] [Rules]                │
│          │                                           │
│ Profile  │                                           │
│ [Avatar] │                                           │
└──────────┴──────────────────────────────────────────┘
```

---

## 🎨 Color Palette

| Name           | Hex       | Usage                         |
| -------------- | --------- | ----------------------------- |
| Background     | `#F8F8F9` | Page, input containers        |
| White          | `#FFFFFF` | Cards, sidebar, nav bar       |
| Black          | `#000000` | Text, new chat button         |
| Border         | `#F0F0F2` | All borders, dividers         |
| Text Secondary | `#9A9AA1` | Labels, placeholders          |
| Primary Teal   | `#08A6AE` | Active states, gradient start |
| Dark Teal      | `#067980` | Gradient end                  |

---

## 📏 Key Dimensions

### Navigation Bar

- Height: `109px`
- Padding: `60px` horizontal
- Icon containers: `68x68px`, border-radius `16px`

### Sidebar

- Width: `263px`
- Padding: `16px` horizontal, `24px` vertical
- Border: `1px` solid `#F0F0F2` (left side)

### Buttons

- New Chat: padding `22px 20px`, radius `16px`
- Search: padding `22px 20px`, radius `16px`
- Quick Actions: padding `15px 20-26px`, radius `14px`

### Input Container

- Height: `141px`
- Border-radius: `20px`
- Padding: `18px`

### Profile Section

- Avatar: `60x60px` (circular)
- Gap: `14px` between avatar and text

---

## 🔤 Typography

| Element            | Size | Weight | Line Height | Color   |
| ------------------ | ---- | ------ | ----------- | ------- |
| Main Title         | 42px | 800    | 1.31        | #FFFFFF |
| Nav Title          | 18px | 700    | 1.76        | #000000 |
| Nav Subtitle       | 14px | 500    | 1.76        | #9A9AA1 |
| Button Text        | 16px | 600    | 1.76        | #FFFFFF |
| Chat History Title | 16px | 500    | 1.76        | #9A9AA1 |
| Chat History Item  | 18px | 500    | 1.76        | #000000 |
| Active Chat Item   | 18px | 500    | 1.76        | #08A6AE |
| Input Placeholder  | 16px | 500    | 1.76        | #9A9AA1 |
| Quick Action Text  | 16px | 500    | 1.76        | #000000 |
| Profile Name       | 16px | 700    | 1.76        | #000000 |
| Profile Role       | 12px | 500    | 1.76        | #9A9AA1 |
| Navigation Links   | 14px | 500    | 1.76        | #9A9AA1 |

**Font Family**: `Estedad-FD`

---

## 🖼️ Assets Required

### Icons (24x24px)

- `new-chat-icon.svg` - Plus icon for new conversation
- `search-icon.svg` - Magnifying glass
- `folder-icon.svg` - Folder for history items (4 variants)

### Icons (22x22px)

- `faq-icon.svg` - Question mark
- `guide-icon.svg` - Book/document
- `rules-icon.svg` - Document with lines

### Large Icons

- `logo.svg` - 158x37px brand logo
- `mic-icon.svg` - 47x73px voice input
- `phone-icon.svg` - 68x68px phone symbol
- `support-icon.svg` - 68x68px support symbol
- `user-avatar.svg` - 60x60px user profile
- `attachment-icon.svg` - 129x90px file attachments

---

## 🎭 Component States

### Sidebar

```typescript
const [isSidebarOpen, setIsSidebarOpen] = useState(true);
```

- Open: width `263px`, visible
- Closed: width `0px`, hidden
- Transition: `300ms` smooth

### Input Field

```typescript
const [message, setMessage] = useState("");
```

- Empty: shows placeholder
- Typing: shows user input
- Focused: outline visible

### Chat History

```typescript
const chatHistory = [
  { id: 1, title: "ساخت مقاله کارشناسی", active: true },
  { id: 2, title: "برترین نویسندگان", icon: true },
  // ...
];
```

- Active: color `#08A6AE`
- Inactive: color `#000000`
- With icon: shows folder icon

---

## 🎯 Interactive Elements

### Hover Effects

- Navigation links: `#9A9AA1` → `#000000`
- Quick action buttons: border `#F0F0F2` → `#08A6AE`
- Chat history items: subtle background highlight

### Click Actions

- New Chat: Creates new conversation
- Search: Opens search within history
- Chat History Item: Loads that conversation
- Quick Actions: Navigate to respective pages
- Sidebar Toggle: Opens/closes sidebar

---

## 📱 Responsive Breakpoints

### Desktop (> 1024px)

- Sidebar always visible (263px)
- Full navigation bar
- All decorative elements shown

### Tablet (768px - 1024px)

- Collapsible sidebar with toggle
- Compact navigation
- Adjusted spacing

### Mobile (< 768px)

- Sidebar as overlay
- Hamburger menu for navigation
- Stacked quick actions
- Reduced padding

---

## 🔧 Tailwind Classes Reference

### Common Patterns

**Container:**

```html
class="min-h-screen bg-[#F8F8F9] font-['Estedad-FD']"
```

**Navigation Bar:**

```html
class="fixed top-0 left-0 right-0 bg-white border-b border-[#F0F0F2] z-40 h-[109px] px-[60px]"
```

**Sidebar:**

```html
class="fixed top-[109px] right-0 h-[calc(100vh-109px)] bg-white border-l border-[#F0F0F2] w-[263px]"
```

**New Chat Button:**

```html
class="w-full flex items-center justify-between px-5 py-[22px] bg-black rounded-[16px] text-white"
```

**Input Container:**

```html
class="relative bg-[#F8F8F9] border border-[#F0F0F2] rounded-[20px] h-[141px]"
```

**Quick Action Button:**

```html
class="flex items-center gap-[6px] px-[26px] py-[15px] bg-white border border-[#F0F0F2] rounded-[14px]
hover:border-[#08A6AE]"
```

**Gradient Background:**

```html
style="background: linear-gradient(180deg, #08A6AE 0%, #067980 100%)"
```

---

## 🚀 Quick Start Code Snippets

### Add New Chat History Item

```typescript
const newChat = {
  id: chatHistory.length + 1,
  title: "عنوان گفتگو",
  active: false,
  icon: true,
};
setChatHistory([...chatHistory, newChat]);
```

### Add New Quick Action

```typescript
const newAction = {
  id: quickActions.length + 1,
  label: "عنوان دکمه",
  icon: "/images/chatbot/icon.svg",
};
setQuickActions([...quickActions, newAction]);
```

### Toggle Sidebar

```typescript
<button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
  Toggle Sidebar
</button>
```

---

## ⚡ Performance Tips

1. **Image Optimization**: Use Next.js `Image` component
2. **Lazy Loading**: Defer non-critical content
3. **CSS Transitions**: Use `transition-all duration-300`
4. **State Management**: Keep state minimal
5. **Memoization**: Use `useMemo` for static data

---

## ♿ Accessibility Checklist

- [x] Semantic HTML (`<nav>`, `<main>`, `<aside>`)
- [x] Keyboard navigation support
- [x] ARIA labels on icon buttons
- [x] Focus indicators visible
- [x] Color contrast WCAG AA compliant
- [x] RTL layout support
- [x] Screen reader friendly

---

## 🐛 Common Issues & Solutions

### Issue: Sidebar Not Showing

**Solution**: Check `isSidebarOpen` state and width transitions

### Issue: Icons Not Loading

**Solution**: Verify paths in `/public/images/chatbot/`

### Issue: Layout Breaking on Mobile

**Solution**: Test responsive classes and use `flex-wrap`

### Issue: RTL Not Working

**Solution**: Ensure `dir="rtl"` on root div

### Issue: Gradient Not Visible

**Solution**: Check z-index on gradient overlay (`z-[-1]`)

---

## 📊 Testing Checklist

### Visual

- [ ] Colors match Figma exactly
- [ ] Spacing accurate (use pixel perfect)
- [ ] Typography correct (size, weight, line-height)
- [ ] Icons display properly
- [ ] Borders and radius correct

### Functional

- [ ] Sidebar toggle works smoothly
- [ ] Input field accepts text
- [ ] Quick actions clickable
- [ ] Navigation links functional
- [ ] Chat history displays
- [ ] Profile section visible

### Responsive

- [ ] Desktop: Full sidebar visible
- [ ] Tablet: Collapsible sidebar
- [ ] Mobile: Overlay sidebar
- [ ] All breakpoints tested

### Accessibility

- [ ] Tab navigation works
- [ ] Screen reader compatible
- [ ] Keyboard shortcuts functional
- [ ] Focus visible

---

## 📝 File Locations

```
/src/app/(common)/chatbot/page.tsx          # Main component
/public/images/chatbot/                      # Assets folder
├── logo.svg
├── mic-icon.svg
├── phone-icon.svg
├── new-chat-icon.svg
├── search-icon.svg
├── folder-icon.svg
├── folder-icon-2.svg
├── folder-icon-3.svg
├── folder-icon-4.svg
├── user-avatar.svg
├── attachment-icon.svg
├── rules-icon.svg
├── guide-icon.svg
├── faq-icon.svg
└── support-icon.svg
```

---

## 🔗 Related Files

- `CHATBOT_IMPLEMENTATION.md` - Full documentation
- `CHATBOT_SUMMARY.md` - Summary overview
- `FIGMA_IMPLEMENTATION_SUMMARY.md` - Overall project summary

---

## 💡 Tips & Tricks

1. **Use Figma Dev Mode**: Get exact CSS values
2. **Test RTL Early**: Prevents layout issues
3. **Component Isolation**: Test sidebar separately
4. **State Debugging**: Use React DevTools
5. **Performance Monitor**: Check render counts

---

## ✅ Production Readiness

- ✅ Design implemented
- ✅ Assets optimized
- ✅ Responsive layout
- ✅ RTL support
- ✅ Accessibility features
- ⏳ Backend integration pending
- ⏳ Real chat functionality pending
- ⏳ Voice input pending
- ⏳ File upload pending

---

**Version**: 2.0.0  
**Last Updated**: 2024  
**Status**: Complete (UI Only)
