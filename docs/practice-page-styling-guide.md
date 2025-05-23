# Practice Page Styling Guide

## Overview

The Practice page components have been updated to match the organic, nature-themed design system of the landing page. This guide documents the styling patterns and design tokens used.

## Design System

### Color Palette

- **Primary Colors**:
  - `sage` - Green tones for primary actions and success states
  - `lavender` - Purple tones for accents and secondary elements
  - `earth` - Brown tones for text and grounding elements
  - `mist` - Light gray for backgrounds and input fields
  - `storm` - Dark gray for overlays and strong contrast

### Typography

- **Primary Font**: `font-primary` (Inter) - Used for body text, inputs, and UI elements
- **Secondary Font**: `font-secondary` (Playfair Display) - Used for headings and emphasis

### Component Patterns

#### 1. **Buttons**
```jsx
// Primary Button
<motion.button
  className="px-8 py-3 bg-sage text-white rounded-full font-primary font-semibold hover:bg-sage-dark transition-colors shadow-soft hover:shadow-medium"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

#### 2. **Cards**
```jsx
// Card Container
<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-medium p-8">
```

#### 3. **Inputs**
```jsx
// Text Input
<input className="w-full px-4 py-3 bg-mist rounded-xl text-earth-dark placeholder-earth/50 font-primary focus:outline-none focus:ring-2 focus:ring-sage" />
```

#### 4. **Modals**
```jsx
// Modal with backdrop
<motion.div className="fixed inset-0 z-50 bg-storm/50 backdrop-blur-sm">
  <motion.div className="bg-white rounded-3xl shadow-medium p-8">
```

## Component Updates

### 1. **Practice.tsx**
- Background: Gradient from mist to lavender/sage
- Header: White with sage accents and soft shadow
- Container: White cards with rounded corners and shadows
- Animations: Smooth transitions with framer-motion

### 2. **PracticeHeader**
- Fixed header with backdrop blur
- Rounded buttons with hover states
- Icon-based navigation
- Responsive text hiding on mobile

### 3. **ClientSelectorModal**
- Full-screen overlay with backdrop blur
- Search input with icon
- Grid layout for persona cards
- Persona cards with color indicators
- Smooth spring animations

### 4. **PersonaButton**
- Card design with hover effects
- Color dot indicator for persona
- Two-column responsive grid
- Soft shadows and transitions

### 5. **PracticeErrorBoundary**
- Centered error card
- Friendly error messaging
- Lavender accent colors
- Development mode error details

### 6. **UserSettings & AgentEdit**
- Consistent modal styling
- Form inputs with mist background
- Rounded corners throughout
- Clear visual hierarchy

## Animation Patterns

### Entry Animations
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Hover Effects
```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Modal Transitions
```jsx
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
transition={{ type: "spring", duration: 0.5 }}
```

## Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly targets (min 44px)
- Adaptive text sizing
- Collapsible navigation text

## Accessibility

- ARIA labels on all interactive elements
- Focus states with ring indicators
- Keyboard navigation support
- Screen reader announcements
- High contrast text on backgrounds

## Best Practices

1. **Consistency**: Use design tokens from Tailwind config
2. **Performance**: Lazy load heavy components
3. **Animation**: Keep animations smooth (60fps)
4. **Spacing**: Use consistent padding/margins (4, 6, 8, etc.)
5. **Shadows**: Use `shadow-soft` for subtle, `shadow-medium` for emphasis

## Future Enhancements

1. Add organic shape SVGs (leaves, waves) to Practice page
2. Implement theme switching (light/dark/nature themes)
3. Add micro-interactions for better feedback
4. Create loading skeletons for better perceived performance
5. Add haptic feedback for mobile interactions 