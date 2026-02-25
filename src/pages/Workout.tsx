import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Workout() {
  const navigate = useNavigate()
  const [activeWorkout, setActiveWorkout] = useState(() => {
    const saved = localStorage.getItem('hevy_active_workout')
    return saved ? JSON.parse(saved) : null
  })
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (activeWorkout) {
      const start = new Date(activeWorkout.startedAt).getTime()
      const interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - start) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activeWorkout])

  useEffect(() => {
    if (activeWorkout) {
      localStorage.setItem('hevy_active_workout', JSON.stringify(activeWorkout))
    }
  }, [activeWorkout])

  const startWorkout = () => {
    const workout = {
      id: crypto.randomUUID(),
      name: 'Quick Workout',
      startedAt: new Date().toISOString(),
      exercises: [],
    }
    setActiveWorkout(workout)
  }

  const completeWorkout = () => {
    if (!activeWorkout) return
    
    const completed = {
      ...activeWorkout,
      completedAt: new Date().toISOString(),
      duration: elapsed,
    }
    
    const workouts = JSON.parse(localStorage.getItem('hevy_workouts') || '[]')
    localStorage.setItem('hevy_workouts', JSON.stringify([completed, ...workouts]))
    localStorage.removeItem('hevy_active_workout')
    
    setActiveWorkout(null)
    navigate('/history')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!activeWorkout) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🏋️</div>
        <h1 className="text-2xl font-bold dark:text-white mb-2">Ready to Train?</h1>
        <p className="text-gray-500 mb-6">Start tracking your workout</p>
        <button
          onClick={startWorkout}
          className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          Start Workout
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold dark:text-white">{activeWorkout.name}</h1>
          <p className="text-sm text-gray-500">{formatTime(elapsed)}</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('hevy_active_workout')
            setActiveWorkout(null)
          }}
          className="text-red-500 text-sm font-medium"
        >
          Cancel
        </button>
      </div>

      {activeWorkout.exercises.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-500 mb-4">Add your first exercise</p>
          <button
            onClick={() => navigate('/exercises')}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg"
          >
            Browse Exercises
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {activeWorkout.exercises.map((ex: any, i: number) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="font-medium dark:text-white">{ex.name}</div>
              <div className="text-sm text-gray-500">{ex.sets?.length || 0} sets</div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/exercises')}
        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium"
      >
        + Add Exercise
      </button>

      <button
        onClick={completeWorkout}
        className="w-full bg-green-500 text-white py-3 rounded-xl font-medium"
      >
        Complete Workout
      </button>
    </div>
  )
}
