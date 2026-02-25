# Project Plan - Hevy Web v2

## Overview
A beautiful, Apple-like workout tracking web application built with React, TypeScript, and Tailwind CSS.

**Reference:** `CLAUDE.md`

---

## Task List

```json
[
  {
    "category": "setup",
    "description": "Initialize project with Vite + React + TypeScript",
    "steps": [
      "Create project structure",
      "Install dependencies",
      "Set up Tailwind CSS",
      "Verify dev server runs"
    ],
    "passes": false
  },
  {
    "category": "feature",
    "description": "Create Dashboard page",
    "steps": [
      "Display greeting",
      "Show stats cards",
      "Recent workouts list",
      "Start workout button"
    ],
    "passes": false
  },
  {
    "category": "feature",
    "description": "Create Workout logging page",
    "steps": [
      "Start/complete/cancel workout",
      "Add exercises",
      "Log sets with weight and reps",
      "Track elapsed time"
    ],
    "passes": false
  },
  {
    "category": "feature",
    "description": "Create Exercise library page",
    "steps": [
      "Display exercise list",
      "Add search functionality",
      "Filter by muscle group",
      "Add to workout button"
    ],
    "passes": false
  },
  {
    "category": "feature",
    "description": "Create History page",
    "steps": [
      "List past workouts",
      "Show workout details",
      "Display stats"
    ],
    "passes": false
  },
  {
    "category": "feature",
    "description": "Create Routines page",
    "steps": [
      "Create/edit/delete routines",
      "Quick start from routine",
      "Display routine list"
    ],
    "passes": false
  },
  {
    "category": "feature",
    "description": "Create Settings page",
    "steps": [
      "Dark mode toggle",
      "Unit preferences",
      "Default rest time",
      "Clear data option"
    ],
    "passes": false
  },
  {
    "category": "feature",
    "description": "Implement state management with Zustand",
    "steps": [
      "Create store",
      "Persist to localStorage",
      "Workout actions",
      "Settings actions"
    ],
    "passes": false
  },
  {
    "category": "polish",
    "description": "Add dark mode support",
    "steps": [
      "Configure Tailwind dark mode",
      "Add toggle to settings",
      "Test all pages in dark mode"
    ],
    "passes": false
  },
  {
    "category": "testing",
    "description": "Verify all features work",
    "steps": [
      "Test workout flow end-to-end",
      "Verify data persistence",
      "Check responsive design",
      "Fix any bugs"
    ],
    "passes": false
  }
]
```

---

## Agent Instructions

1. Read `activity.md` first to understand current state
2. Find next task with `"passes": false`
3. Complete all steps for that task
4. Verify in browser if applicable
5. Update task to `"passes": true`
6. Log completion in `activity.md`
7. Make one git commit for that task
8. Repeat until all tasks pass

**Important:** Only modify the `passes` field. Do not remove or rewrite tasks.

---

## Completion Criteria
All tasks marked with `"passes": true`
