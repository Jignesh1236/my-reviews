# Design Guidelines: Personal Review Collection Platform

## Design Approach

**Reference-Based: GitHub-Inspired Interface**

This application follows GitHub's design language with its characteristic dark theme, precise spacing, and developer-focused aesthetics. The design prioritizes clarity, consistency, and functional elegance over decorative elements.

**Core Design Principles:**
- Information hierarchy through typography and spacing, not color
- Minimalist interface with purposeful interactions
- Dark-first color strategy with strategic accent usage
- Clean, card-based layouts for content organization

---

## Typography

**Font Stack:**
```
Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif
```

**Type Scale:**
- **Page Titles**: 32px, font-weight 600
- **Profile Name**: 24px, font-weight 600  
- **Section Headers**: 20px, font-weight 600
- **Review Names**: 16px, font-weight 600
- **Body Text**: 14px, font-weight 400
- **Meta Text** (dates, usernames): 12-14px, font-weight 400

**Line Height**: 1.5 for body text, 1.3 for headings

---

## Layout System

**Spacing Primitives (Tailwind Units):**
- **Micro spacing**: 2, 4 (gaps, padding within components)
- **Standard spacing**: 8, 12, 16 (component padding, margins)
- **Generous spacing**: 24, 32 (section separation, container padding)

**Container Strategy:**
- Maximum width: 900px for main content container
- Full-width sections with centered max-width content
- Consistent 32px padding on desktop, 20px on mobile

**Grid Patterns:**
- Single column layout (no multi-column needed for this app)
- Vertical stacking with clear spacing hierarchy
- Review cards in vertical list formation

---

## Component Library

### Navigation Components

**Profile Header:**
- Horizontal flex layout with 16px gap
- 80px circular avatar with 2px border
- Profile info stacked vertically with 4px gap
- Bottom border separator (1px)

**Navigation Tabs:**
- Horizontal tab bar with bottom border
- Active state indicated by 2px bottom border accent
- 8px horizontal padding, 16px internal padding per tab
- Hover state with subtle background change
- Position tabs flush against separator line

### Form Components

**Input Fields:**
- 8-12px padding, 6px border-radius
- 1px borders with focus state (3px glow effect)
- Consistent height across text inputs
- Minimum 60-100px height for textareas

**Star Rating System:**
- Interactive 5-star selector
- Individual star size: 18-20px
- Inline display with 2px gaps
- Visual feedback on hover and selection
- Container with subtle border and background

**Submit Button:**
- 8px vertical, 16-20px horizontal padding
- 6px border-radius
- Medium font-weight (500)
- Distinct hover and active states (scale 0.98 on active)

### Content Display Components

**Review Cards:**
- Full-width cards with 16px padding
- 1px borders with 6px border-radius
- Hover effect with border color change and subtle glow
- Header section with space-between layout
- 12-16px gap between internal sections

**Star Display:**
- Read-only 5-star visualization
- 16px star size for display
- Rating text accompaniment in smaller font
- Inline flex layout with 4px gaps

**Empty States:**
- Centered text with 48px vertical padding
- Subtle background with border
- Clear messaging for "no reviews yet"

---

## Interaction Patterns

**Star Rating Interaction:**
- Click to select rating
- Visual highlight for all stars up to selected value
- Immediate visual feedback (no animation delays)
- Clear selected state differentiation

**Form Submission:**
- Standard form submission with validation
- Alert confirmation on success
- Form reset after successful submission
- Error handling with user-friendly messages

**Navigation:**
- Client-side routing (no page refresh)
- Active state persistence
- Browser back/forward button support

**Card Interactions:**
- Subtle hover state on review cards
- Border color change with matching glow effect
- No complex animations or transitions

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 600px
- Desktop: 600px+

**Mobile Adaptations:**
- Reduce container padding to 20px
- Stack review header elements vertically
- Reduce title font size to 24px
- Maintain single-column layout
- Adjust star rating gaps to 8px

**Desktop Enhancements:**
- Full 32px container padding
- Horizontal review header layout
- Consistent spacing throughout

---

## Special Considerations

**Form Layout Strategy:**
- Top row: Name input + inline star rating
- Bottom row: Textarea + submit button aligned to bottom
- Flexible textarea that grows with content
- Button positioned at flex-end for natural flow

**Content Ordering:**
- Newest reviews display first (reverse chronological)
- Clear date stamps on each review
- Reviewer name prominently displayed

**Accessibility:**
- Proper label associations for form inputs
- Hidden radio inputs with visible star labels
- Keyboard-navigable star rating
- Sufficient color contrast ratios
- Focus states clearly visible

---

## Images

**Profile Avatar:**
- Single circular profile image (80px diameter)
- Positioned in header section
- 2px border treatment
- Use actual user avatar/placeholder

**No Hero Images:** This application does not use hero imagery - it's a functional web app focused on review submission and display.