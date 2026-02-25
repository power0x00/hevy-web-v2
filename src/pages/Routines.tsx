import { useState } from 'react'

export default function Routines() {
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem('hevy_routines')
    return saved ? JSON.parse(saved) : []
  })

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')

  const createRoutine = () => {
    if (!name.trim()) return
    
    const routine = {
      id: crypto.randomUUID(),
      name: name.trim(),
      exercises: [],
      createdAt: new Date().toISOString(),
    }
    
    const updated = [...routines, routine]
    setRoutines(updated)
    localStorage.setItem('hevy_routines', JSON.stringify(updated))
    setName('')
    setShowForm(false)
  }

  const deleteRoutine = (id: string) => {
    const updated = routines.filter((r: any) => r.id !== id)
    setRoutines(updated)
    localStorage.setItem('hevy_routines', JSON.stringify(updated))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Routines</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + New
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3">
          <input
            type="text"
            placeholder="Routine name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={createRoutine}
            className="w-full bg-primary-500 text-white py-2 rounded-lg font-medium"
          >
            Create
          </button>
        </div>
      )}

      {routines.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-gray-500">No routines yet</p>
          <p className="text-sm text-gray-400 mt-1">Create reusable workout templates</p>
        </div>
      ) : (
        <div className="space-y-2">
          {routines.map((routine: any) => (
            <div
              key={routine.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium dark:text-white">{routine.name}</div>
                <div className="text-sm text-gray-500">
                  {routine.exercises?.length || 0} exercises
                </div>
              </div>
              <button
                onClick={() => deleteRoutine(routine.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
