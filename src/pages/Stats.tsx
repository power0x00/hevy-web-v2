import { useState, useEffect } from 'react'

export default function Stats() {
  const [workouts] = useState(() => {
    const saved = localStorage.getItem('hevy_workouts')
    return saved ? JSON.parse(saved) : []
  })

  const totalWorkouts = workouts.length
  const totalExercises = workouts.reduce((sum: number, w: any) => 
    sum + (w.exercises?.length || 0), 0
  )
  
  const thisMonth = workouts.filter((w: any) => {
    const date = new Date(w.startedAt)
    const now = new Date()
    return date.getMonth() === now.getMonth() && 
           date.getFullYear() === now.getFullYear()
  }).length

  const avgDuration = workouts.length > 0
    ? Math.round(workouts.reduce((sum: number, w: any) => 
        sum + (w.duration || 0), 0) / workouts.length / 60)
    : 0

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold dark:text-white">Statistics</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-primary-500">{totalWorkouts}</div>
          <div className="text-sm text-gray-500 mt-1">Total Workouts</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-500">{totalExercises}</div>
          <div className="text-sm text-gray-500 mt-1">Total Exercises</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-purple-500">{thisMonth}</div>
          <div className="text-sm text-gray-500 mt-1">This Month</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-orange-500">{avgDuration}</div>
          <div className="text-sm text-gray-500 mt-1">Avg Duration (min)</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold dark:text-white mb-4">Weekly Activity</h2>
        <div className="grid grid-cols-7 gap-2">
          {getLast7Days().map((day, i) => {
            const count = workouts.filter((w: any) => {
              const date = new Date(w.startedAt).toDateString()
              return date === day.toDateString()
            }).length
            
            return (
              <div key={i} className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div
                  className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                    count > 0
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {count}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getLast7Days(): Date[] {
  const days: Date[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(date)
  }
  return days
}
