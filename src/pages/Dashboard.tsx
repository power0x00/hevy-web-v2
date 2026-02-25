import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('hevy_workouts')
    return saved ? JSON.parse(saved) : []
  })

  const thisWeek = workouts.filter((w: any) => {
    const date = new Date(w.startedAt)
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return date >= weekAgo
  }).length

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white">{getGreeting()}!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Ready to crush it?</p>
      </div>

      <Link
        to="/workout"
        className="block bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Start Workout</h2>
            <p className="text-primary-100 text-sm mt-1">Begin your training session</p>
          </div>
          <div className="text-3xl">💪</div>
        </div>
      </Link>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
          <div className="text-2xl font-bold text-primary-500">{thisWeek}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">This Week</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
          <div className="text-2xl font-bold text-green-500">{workouts.length}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
          <div className="text-2xl font-bold text-purple-500">0</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Streak</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold dark:text-white mb-3">Recent Workouts</h2>
        {workouts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center text-gray-500">
            No workouts yet. Start your first one!
          </div>
        ) : (
          <div className="space-y-2">
            {workouts.slice(0, 5).map((workout: any) => (
              <div
                key={workout.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium dark:text-white">{workout.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(workout.startedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {workout.exercises?.length || 0} exercises
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
