import { useState } from 'react'

const exercises = [
  { id: '1', name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell' },
  { id: '2', name: 'Squat', muscle: 'Legs', equipment: 'Barbell' },
  { id: '3', name: 'Deadlift', muscle: 'Back', equipment: 'Barbell' },
  { id: '4', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell' },
  { id: '5', name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell' },
  { id: '6', name: 'Pull-ups', muscle: 'Back', equipment: 'Bodyweight' },
  { id: '7', name: 'Dips', muscle: 'Chest', equipment: 'Bodyweight' },
  { id: '8', name: 'Lunges', muscle: 'Legs', equipment: 'Bodyweight' },
  { id: '9', name: 'Bicep Curls', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: '10', name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Cable' },
]

const muscles = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms']

export default function Exercises() {
  const [search, setSearch] = useState('')
  const [muscle, setMuscle] = useState('All')

  const filtered = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase())
    const matchesMuscle = muscle === 'All' || ex.muscle === muscle
    return matchesSearch && matchesMuscle
  })

  const addToWorkout = (exercise: any) => {
    const activeWorkout = JSON.parse(localStorage.getItem('hevy_active_workout') || 'null')
    if (!activeWorkout) {
      alert('Start a workout first!')
      return
    }
    
    activeWorkout.exercises.push({
      id: crypto.randomUUID(),
      name: exercise.name,
      sets: [{ weight: null, reps: 8, completed: false }],
    })
    
    localStorage.setItem('hevy_active_workout', JSON.stringify(activeWorkout))
    alert(`Added ${exercise.name} to workout!`)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold dark:text-white">Exercises</h1>

      <input
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white"
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {muscles.map(m => (
          <button
            key={m}
            onClick={() => setMuscle(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              muscle === m
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(exercise => (
          <div
            key={exercise.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium dark:text-white">{exercise.name}</div>
              <div className="text-sm text-gray-500">
                {exercise.muscle} • {exercise.equipment}
              </div>
            </div>
            <button
              onClick={() => addToWorkout(exercise)}
              className="bg-primary-500 text-white px-3 py-1 rounded-lg text-sm"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
