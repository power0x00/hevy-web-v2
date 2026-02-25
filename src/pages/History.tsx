import { useState } from 'react'

export default function History() {
  const [workouts] = useState(() => {
    const saved = localStorage.getItem('hevy_workouts')
    return saved ? JSON.parse(saved) : []
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold dark:text-white">Workout History</h1>

      {workouts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-gray-500">No workouts logged yet</p>
          <p className="text-sm text-gray-400 mt-1">Complete a workout to see it here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {workouts.map((workout: any) => (
            <div
              key={workout.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium dark:text-white">{workout.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(workout.startedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>{workout.exercises?.length || 0} exercises</span>
                <span>{Math.floor((workout.duration || 0) / 60)} min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
