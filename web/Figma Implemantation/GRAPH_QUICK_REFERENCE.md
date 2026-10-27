# Graph Page - Quick Reference Guide

## 🎯 Quick Links
- **Page:** `/src/app/(common)/graph/page.tsx`
- **Component:** `/src/components/template/GraphVisualization.tsx`
- **Assets:** `/public/images/graph/`
- **Figma Nodes:** 20484-2204, 20484-2603

---

## 🎨 Color Palette

```css
/* Primary Colors */
--teal-primary: #08A6AE;      /* Keywords, buttons */
--gold-accent: #D2A634;        /* Tags, badges, active states */

/* Backgrounds */
--bg-white: #FFFFFF;
--bg-light: #F8F8F9;
--bg-badge: #EDFEFF;
--bg-neutral: #F5F5F5;

/* Borders & Dividers */
--border-light: #F0F0F2;
--border-hover: #9FDDE0;

/* Text Colors */
--text-primary: #000000;
--text-secondary: #9A9AA1;
```

---

## 📐 Layout Dimensions

```
Container Width: 1392px (max-width)
Page Padding: px-4 sm:px-6 lg:px-8

Hero Section:
- Top/Bottom: 36px (pt-9 pb-9)
- Title: 42px / 800 / 1.31 lh
- Subtitle: 18px / 600 / 1.76 lh

Graph Container:
- Border Radius: 32px
- Canvas Height: 571px
- Padding: 42px (sides/top), 72px (bottom)

Buttons:
- Height: 68px (search), 72px (actions)
- Border Radius: 18px
- Horizontal Padding: 87px

Info Panel:
- Width: 400px
- Gap: 26px

Related Articles:
- Grid: 2 columns
- Gap X: 24px
- Gap Y: 335px
```

---

## 🔧 Component Props

### GraphVisualization
```typescript
interface GraphPageProps {
  articles: articleSchema[];
  nodes: NodeData[];
  edges: EdgeData[];
}

interface NodeData {
  id: string;
  label: string;
  size: number;
  value: number;
  title?: string;
  color: { background, border, highlight };
  font: { face, size, color };
  group?: "tag" | "keyword";
}

interface EdgeData {
  id: string;
  from: string;
  to: string;
  width: number;
  value?: number;
  color: { color, highlight };
}
```

---

## 🎯 Key Features Checklist

### Interactive Elements
- [x] Node click → Show info panel
- [x] Help button → Toggle modal
- [x] Reset button → Animate to center
- [x] Chatbot button → Navigation
- [x] Search input → Filter articles
- [x] Advanced search → Modal/page
- [x] Pagination → Navigate pages

### Visual States
- [x] Loading spinner with progress
- [x] Node hover effects
- [x] Button hover states
- [x] Active pagination button
- [x] Selected node highlight
- [x] Help modal overlay

### Responsive Behavior
- [x] Mobile: 1 column, reduced padding
- [x] Tablet: 2 columns, medium padding
- [x] Desktop: Full layout, all features

---

## 🖼️ Assets Reference

```
/public/images/graph/
├── advanced-search-icon.svg  (24x24) - Teal button
├── search-icon.svg           (24x24) - Input field
├── reset-icon.svg            (24x24) - Reset button
├── chatbot-icon.svg          (24x24) - Chatbot button
├── arrow-next.svg            (5x9)   - Pagination
├── arrow-prev.svg            (5x9)   - Pagination
└── graph-help-icon.svg       (40x73) - Reserved
```

---

## 📝 Common Code Snippets

### Graph Node Styling
```javascript
const nodeColor = node.type === "tag" 
  ? (node.count > 3 ? "#08A6AE" : "#F8F8F9")
  : (node.count > 3 ? "#D2A634" : "#F8F8F9");

const textColor = node.count > 3 ? "#FFFFFF" : "#9A9AA1";
```

### Button Component
```jsx
<button className="flex items-center justify-center gap-2.5 px-[87px] py-5 h-[72px] bg-[#08A6AE] rounded-[18px] text-white font-semibold text-base leading-[1.76] hover:bg-[#067980] transition-colors font-['Estedad-FD']">
  <Image src="/images/graph/icon.svg" alt="" width={24} height={24} />
  <span>Button Text</span>
</button>
```

### Info Panel Structure
```jsx
<div className="absolute top-[42px] left-[42px] w-[400px] space-y-[26px]">
  {/* Title + Badge */}
  <div className="flex items-center gap-[182px]">
    <h3 className="text-lg font-bold">{label}</h3>
    <span className="badge">{count} مقاله</span>
  </div>
  
  {/* Article Details */}
  <div className="space-y-3.5">
    <p className="text-base font-semibold text-[#9A9AA1]">درباره مقاله:</p>
    <p className="text-base font-medium text-black">{title}</p>
    <p className="text-base font-medium text-[#9A9AA1]">{authors}</p>
  </div>
  
  {/* Tags & Keywords */}
  <div className="space-y-2.5">
    <div className="flex flex-wrap gap-1.5">{tags}</div>
    <div className="flex flex-wrap gap-1.5">{keywords}</div>
  </div>
</div>
```

### Article Card
```jsx
<div className="bg-white border border-[#F0F0F2] rounded-[20px] p-8 hover:border-[#9FDDE0] transition-all">
  <div className="flex items-center justify-center gap-[402px]">
    <h3 className="text-lg font-bold">{title}</h3>
    <span className="badge">{count} مقاله</span>
  </div>
  
  <div className="space-y-6 pr-6 border-r border-[#F0F0F2]">
    {/* Article content */}
  </div>
</div>
```

---

## 🎨 Typography Classes

```css
/* Headings */
.hero-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.31;
  font-family: 'Estedad';
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.76;
  font-family: 'Estedad';
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.56;
  font-family: 'Estedad';
}

/* Body Text */
.body-large {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.76;
  font-family: 'Estedad-FD';
}

.body-regular {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.76;
  font-family: 'Estedad-FD';
}

.body-medium {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.76;
  font-family: 'Estedad-FD';
}

.body-small {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.76;
  font-family: 'Estedad-FD';
}
```

---

## ⚡ Performance Tips

### Graph Optimization
```javascript
// Disable physics after stabilization
networkRef.current.on("stabilizationIterationsDone", () => {
  networkRef.current?.setOptions({ physics: { enabled: false } });
});

// Hide edges while dragging
interaction: {
  hideEdgesOnDrag: true,
}

// Reduce shadow effects for performance
shadow: { enabled: false }
```

### Image Optimization
```jsx
// Use Next.js Image component
<Image 
  src="/images/graph/icon.svg" 
  alt="" 
  width={24} 
  height={24}
  loading="lazy"
/>
```

---

## 🐛 Troubleshooting

### Graph not loading
```javascript
// Check network initialization
if (!containerRef.current) return;

// Verify nodes and edges data
console.log('Nodes:', nodes.length);
console.log('Edges:', edges.length);
```

### Info panel not showing
```javascript
// Ensure selectedNode state is set
networkRef.current.on("selectNode", (params) => {
  const nodeId = params.nodes[0];
  setSelectedNode(/* node data */);
});
```

### Styling issues
```javascript
// Check font loading
font: {
  face: "Estedad, Vazirmatn, system-ui",
}

// Verify Tailwind classes are compiled
className="font-['Estedad']"
```

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints
sm:   640px  // Mobile landscape
md:   768px  // Tablet
lg:   1024px // Desktop
xl:   1280px // Large desktop
2xl:  1536px // Extra large

// Usage
<div className="px-4 sm:px-6 lg:px-8">
  {/* Responsive padding */}
</div>
```

---

## ✅ Testing Checklist

### Visual
- [ ] Colors match Figma (#08A6AE, #D2A634)
- [ ] Fonts render correctly (Estedad)
- [ ] Spacing is precise
- [ ] Borders and shadows accurate
- [ ] Responsive layouts work

### Functional
- [ ] Graph loads and stabilizes
- [ ] Nodes are clickable
- [ ] Info panel displays
- [ ] Help modal toggles
- [ ] Reset button animates
- [ ] Pagination works
- [ ] Search integration

### Performance
- [ ] Initial load < 3s
- [ ] Graph stabilizes < 5s
- [ ] Smooth interactions (60fps)
- [ ] No console errors
- [ ] Images optimized

### Accessibility
- [ ] Keyboard navigation
- [ ] ARIA labels present
- [ ] Color contrast WCAG AA
- [ ] Focus indicators visible
- [ ] Screen reader compatible

---

## 🔗 Related Files

```
/src/app/(common)/graph/
├── page.tsx              (Server component, data processing)
└── loading.tsx           (Optional loading state)

/src/components/template/
└── GraphVisualization.tsx (Client component, vis-network)

/public/images/graph/
└── *.svg                  (7 icon files)

/Figma Implemantation/
├── GRAPH_IMPLEMENTATION.md      (Full documentation)
└── GRAPH_QUICK_REFERENCE.md     (This file)
```

---

## 📚 External Resources

- **vis-network Docs:** https://visjs.github.io/vis-network/
- **Next.js Image:** https://nextjs.org/docs/api-reference/next/image
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**Last Updated:** 2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
