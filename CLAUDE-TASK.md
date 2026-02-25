# Claude Code Task - Hevy Web Version 2

## Overview
Build a complete, fully-functional workout tracking app that matches or exceeds Version 1 (Hevy Web v1) in features and quality.

## Requirements

### 1. Project Setup
- Initialize React + TypeScript project with Vite
- Install dependencies: React, React Router, Tailwind CSS, Zustand, Framer Motion, Lucide React, date-fns, uuid
- Configure Tailwind CSS with custom Hevy-inspired theme (matching Version 1's design)
- Set up project structure with components, pages, store, hooks, types, data directories

### 2. Core Components
Create reusable UI components:

**Button Component**
- Variants: primary, secondary, ghost, danger
- Sizes: sm, md, lg
- Support for icon and loading state
- Full-width option

**Card Component**
- Hover effects
- Padding options (none, sm, md, lg)
- Border styling

**Input Component**
- With label and error states
- Icon support
- Focus ring effects

**Modal Component**
- Backdrop overlay
- Title and content areas
- Close button
- Animation on mount/unmount

**Select Component**
- Native select styling
- Dark mode support

**Exercise Card Component**
- Displays exercise name, muscle group, equipment
- Hover effects
- Action buttons (add to workout, view details)

**Set Row Component**
- Weight input
- Reps input
- Completion checkbox
- Delete button
- Warmup/failure markers

**Rest Timer Component**
- Circular progress indicator
- Skip button
- Sound and vibration alerts
- Auto-advance to next set

### 3. Data Layer

**Exercise Database**
- Create comprehensive exercise database (300+ exercises)
- Organize by muscle group: chest, back, shoulders, biceps, triceps, abs, quads, hamstrings, glutes, calves, cardio, full body
- Include exercise details: name, muscle group, equipment, is compound, description
- Export as TypeScript types

**Data Models**
- Define all TypeScript interfaces (Workout, WorkoutExercise, WorkoutSet, Exercise, Routine, UserSettings, PersonalRecord)
- Ensure type safety throughout the application

### 4. State Management

**Zustand Store**
- Create store with these slices:
  - Active workout (current workout being logged)
  - Workouts (completed workout history)
  - Routines (workout templates)
  - Personal records (PRs by exercise)
  - Settings (user preferences)
  - UI state (rest timer active, time remaining)

- Implement all actions:
  - Workout actions (start, add exercise, update set, complete set, complete workout, cancel)
  - Routine actions (create, delete)
  - Settings actions (update preferences)
  - Timer actions (start, stop, tick)

- Add persistence with Zustand persist middleware (localStorage)

### 5. Pages

**Dashboard Page**
- Greeting based on time of day
- Quick start workout button (when no active workout)
- Continue workout button (when workout in progress)
- Stats cards: workouts this week, volume, routines, streak
- Recent workouts list
- Quick-start routine cards

**Workout Page**
- Workout header with name and elapsed time
- Cancel workout button
- Rest timer overlay (when active)
- Exercise list with drag-and-drop ordering
- Set rows for each exercise
- Add exercise button (opens exercise picker modal)
- Add set button
- Complete set button (with animation)
- Complete workout button
- Real-time workout duration tracking

**Exercises Page**
- Search bar with icon
- Muscle group filter buttons (horizontal scroll)
- Equipment filter buttons
- Exercise cards grouped by muscle group
- "View all" button when showing limited results
- Click to add to workout (when active workout)

**History Page**
- Workout list sorted by date (newest first)
- Calendar view (optional)
- Workout detail view with exercises and sets
- Filter by date range
- Delete workout option

**Routines Page**
- List of routines with exercise count
- Create new routine button
- Routine cards with start and delete buttons
- Create routine modal with exercise selection
- Quick-start from routine to workout page

**Settings Page**
- Profile settings (name)
- Preferences:
  - Units (metric/imperial)
  - Theme (light/dark/system)
  - Default rest time (selectable: 60s, 90s, 120s, 180s, 300s)
  - Sound effects toggle
- Statistics display (total workouts, total routines)
- Data management (clear all data - with confirmation)

### 6. Features

**Workout Logging**
- Start new workout from scratch or routine
- Add exercises from library
- Add/remove sets
- Update weight and reps
- Mark sets as warmup, dropset, or failure
- Auto-start rest timer on set completion
- Exercise notes
- Workout notes

**Progress Tracking**
- Personal records tracking (by exercise)
- Volume tracking
- Workout frequency
- Streak calculation

**UI/UX**
- Smooth animations using Framer Motion
- Responsive design (mobile-first)
- Dark mode toggle
- Apple-inspired minimalist design
- SF Pro-like typography (using Inter as web alternative)
- Subtle shadows and rounded corners
- Loading states and error handling

**Data Persistence**
- LocalStorage for all app data
- No data loss on page refresh
- Workouts automatically save on completion

## Technical Requirements

**Build Tools**
- Vite for fast development
- TypeScript for type safety
- Tailwind CSS for styling
- React 18+ for UI

**Key Dependencies**
- React 18+
- React Router DOM
- Zustand (with persist middleware)
- Framer Motion (for animations)
- Lucide React (for icons)
- date-fns (for date formatting)
- uuid (for unique IDs)
- clsx (for Tailwind class management, optional)

**Performance**
- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s

## Design Tokens

**Colors**
- Primary: blue (#0ea5e9)
- Accent green: green (#22c55e)
- Accent orange: orange (#f97316)
- Accent purple: purple (#8b5cf6)
- Surface light: white (#ffffff)
- Surface dark: #0f0f0f
- Background light: #f5f5f7
- Background dark: #000000
- Text light: #1d1d1f
- Text dark: #f5f5f7
- Text muted: #86868b
- Border light: #d2d2d7
- Border dark: #333336

**Typography**
- Font family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700
- Line heights: tight, normal, relaxed

**Spacing**
- xs: 2px
- sm: 4px
- md: 8px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

**Border Radius**
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 32px

## Success Criteria

- ✅ Can start and complete a workout in under 60 seconds
- ✅ All data persists on page refresh
- ✅ Dark mode works perfectly
- ✅ Responsive on mobile, tablet, and desktop
- ✅ Lighthouse score > 90
- ✅ Zero console errors
- ✅ Matches or exceeds Version 1 in features

## Development Guidelines

1. **Use TypeScript** - All files should be properly typed
2. **Follow existing design** - Match Version 1's Apple-inspired aesthetic
3. **Keep it simple** - Avoid over-engineering
4. **Test as you build** - Check each feature works before moving on
5. **Write clean code** - Follow React best practices and hooks
6. **Use Tailwind utility classes** - Don't write custom CSS unless necessary
7. **Mobile-first** - Design for mobile screens first, then expand for larger screens
8. **Performance matters** - Optimize re-renders, use React.memo where needed
9. **Accessibility** - Use semantic HTML, ARIA labels, and keyboard navigation
10. **Error handling** - Handle errors gracefully with user-friendly messages

## Deliverables

- Complete React + TypeScript application
- 300+ exercise database
- All core features implemented
- Beautiful Apple-inspired UI with dark mode
- Comprehensive state management with persistence
- README.md with setup and running instructions
- Git repository with all code

---

**Remember:** This is Version 2 - you should aim to match or exceed Version 1 in quality and features. Take inspiration from Hevy mobile app and Version 1 that I built myself. Focus on creating a polished, production-ready application that users will love.

**Start building!** Create the best workout tracking app for the web. 🚀
