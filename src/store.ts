import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Set {
  id: string
  weight: number | null
  reps: number
  completed: boolean
  isWarmup?: boolean
  isDropset?: boolean
  isFailure?: boolean
}

export interface Exercise {
  id: string
  name: string
  sets: Set[]
}

export interface Workout {
  id: string
  name: string
  startedAt: string
  completedAt?: string
  duration?: number
  exercises: Exercise[]
}

export interface Routine {
  id: string
  name: string
  exercises: Exercise[]
  createdAt: string
}

export interface Settings {
  darkMode: boolean
  units: 'metric' | 'imperial'
  defaultRestTime: number
}

interface AppState {
  // Active workout
  activeWorkout: Workout | null
  startWorkout: (name?: string) => void
  addExercise: (exercise: Omit<Exercise, 'id'>) => void
  addSet: (exerciseId: string) => void
  updateSet: (exerciseId: string, setId: string, updates: Partial<Set>) => void
  removeSet: (exerciseId: string, setId: string) => void
  completeWorkout: () => void
  cancelWorkout: () => void

  // Workouts history
  workouts: Workout[]
  deleteWorkout: (id: string) => void

  // Routines
  routines: Routine[]
  createRoutine: (name: string) => void
  deleteRoutine: (id: string) => void
  addExerciseToRoutine: (routineId: string, exercise: Omit<Exercise, 'id'>) => void
  startFromRoutine: (routineId: string) => void

  // Settings
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void

  // Stats
  getWeeklyWorkouts: () => Workout[]
  getTotalWorkouts: () => number
  getStreak: () => number
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Active workout
      activeWorkout: null,

      startWorkout: (name = 'Quick Workout') => {
        const workout: Workout = {
          id: crypto.randomUUID(),
          name,
          startedAt: new Date().toISOString(),
          exercises: [],
        }
        set({ activeWorkout: workout })
      },

      addExercise: (exercise) => {
        const { activeWorkout } = get()
        if (!activeWorkout) return

        const newExercise: Exercise = {
          ...exercise,
          id: crypto.randomUUID(),
        }

        set({
          activeWorkout: {
            ...activeWorkout,
            exercises: [...activeWorkout.exercises, newExercise],
          },
        })
      },

      addSet: (exerciseId) => {
        const { activeWorkout } = get()
        if (!activeWorkout) return

        const exercise = activeWorkout.exercises.find((e) => e.id === exerciseId)
        if (!exercise) return

        const lastSet = exercise.sets[exercise.sets.length - 1]
        const newSet: Set = {
          id: crypto.randomUUID(),
          weight: lastSet?.weight ?? null,
          reps: lastSet?.reps ?? 8,
          completed: false,
        }

        set({
          activeWorkout: {
            ...activeWorkout,
            exercises: activeWorkout.exercises.map((e) =>
              e.id === exerciseId ? { ...e, sets: [...e.sets, newSet] } : e
            ),
          },
        })
      },

      updateSet: (exerciseId, setId, updates) => {
        const { activeWorkout } = get()
        if (!activeWorkout) return

        set({
          activeWorkout: {
            ...activeWorkout,
            exercises: activeWorkout.exercises.map((e) =>
              e.id === exerciseId
                ? {
                    ...e,
                    sets: e.sets.map((s) => (s.id === setId ? { ...s, ...updates } : s)),
                  }
                : e
            ),
          },
        })
      },

      removeSet: (exerciseId, setId) => {
        const { activeWorkout } = get()
        if (!activeWorkout) return

        set({
          activeWorkout: {
            ...activeWorkout,
            exercises: activeWorkout.exercises.map((e) =>
              e.id === exerciseId
                ? { ...e, sets: e.sets.filter((s) => s.id !== setId) }
                : e
            ),
          },
        })
      },

      completeWorkout: () => {
        const { activeWorkout, workouts } = get()
        if (!activeWorkout) return

        const start = new Date(activeWorkout.startedAt).getTime()
        const duration = Math.floor((Date.now() - start) / 1000)

        const completedWorkout: Workout = {
          ...activeWorkout,
          completedAt: new Date().toISOString(),
          duration,
        }

        set({
          workouts: [completedWorkout, ...workouts],
          activeWorkout: null,
        })
      },

      cancelWorkout: () => {
        set({ activeWorkout: null })
      },

      // Workouts history
      workouts: [],

      deleteWorkout: (id) => {
        const { workouts } = get()
        set({ workouts: workouts.filter((w) => w.id !== id) })
      },

      // Routines
      routines: [],

      createRoutine: (name) => {
        const routine: Routine = {
          id: crypto.randomUUID(),
          name,
          exercises: [],
          createdAt: new Date().toISOString(),
        }
        const { routines } = get()
        set({ routines: [...routines, routine] })
      },

      deleteRoutine: (id) => {
        const { routines } = get()
        set({ routines: routines.filter((r) => r.id !== id) })
      },

      addExerciseToRoutine: (routineId, exercise) => {
        const { routines } = get()
        const newExercise: Exercise = {
          ...exercise,
          id: crypto.randomUUID(),
        }
        set({
          routines: routines.map((r) =>
            r.id === routineId
              ? { ...r, exercises: [...r.exercises, newExercise] }
              : r
          ),
        })
      },

      startFromRoutine: (routineId) => {
        const { routines } = get()
        const routine = routines.find((r) => r.id === routineId)
        if (!routine) return

        const workout: Workout = {
          id: crypto.randomUUID(),
          name: routine.name,
          startedAt: new Date().toISOString(),
          exercises: routine.exercises.map((e) => ({
            ...e,
            id: crypto.randomUUID(),
            sets: e.sets.map((s) => ({ ...s, id: crypto.randomUUID(), completed: false })),
          })),
        }
        set({ activeWorkout: workout })
      },

      // Settings
      settings: {
        darkMode: false,
        units: 'metric',
        defaultRestTime: 90,
      },

      updateSettings: (updates) => {
        const { settings } = get()
        set({ settings: { ...settings, ...updates } })
      },

      // Stats
      getWeeklyWorkouts: () => {
        const { workouts } = get()
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return workouts.filter((w) => new Date(w.startedAt) >= weekAgo)
      },

      getTotalWorkouts: () => {
        const { workouts } = get()
        return workouts.length
      },

      getStreak: () => {
        const { workouts } = get()
        if (workouts.length === 0) return 0

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let streak = 0
        let checkDate = new Date(today)

        while (true) {
          const dateStr = checkDate.toISOString().split('T')[0]
          const hasWorkout = workouts.some((w) =>
            w.startedAt.startsWith(dateStr)
          )

          if (hasWorkout) {
            streak++
            checkDate.setDate(checkDate.getDate() - 1)
          } else if (checkDate.getTime() === today.getTime()) {
            // Today hasn't had a workout yet, check yesterday
            checkDate.setDate(checkDate.getDate() - 1)
          } else {
            break
          }
        }

        return streak
      },
    }),
    {
      name: 'hevy-storage',
    }
  )
)
