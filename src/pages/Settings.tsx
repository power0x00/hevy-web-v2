interface SettingsProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function Settings({ darkMode, setDarkMode }: SettingsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold dark:text-white">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-4 flex items-center justify-between">
          <div>
            <div className="font-medium dark:text-white">Dark Mode</div>
            <div className="text-sm text-gray-500">Toggle dark theme</div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="font-medium dark:text-white">Units</div>
          <div className="text-sm text-gray-500 mt-2">
            <select className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 dark:text-white">
              <option value="metric">Metric (kg)</option>
              <option value="imperial">Imperial (lbs)</option>
            </select>
          </div>
        </div>

        <div className="p-4">
          <div className="font-medium dark:text-white">Rest Timer</div>
          <div className="text-sm text-gray-500 mt-2">
            <select className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 dark:text-white">
              <option value="60">1 minute</option>
              <option value="90">1.5 minutes</option>
              <option value="120">2 minutes</option>
              <option value="180">3 minutes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-500 mb-1">Hevy Web v2</div>
          <p className="text-sm text-gray-500">Built with ❤️ by Claude Code</p>
          <p className="text-xs text-gray-400 mt-2">
            A beautiful workout tracking app for the web
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          if (confirm('Clear all data? This cannot be undone.')) {
            localStorage.clear()
            window.location.reload()
          }
        }}
        className="w-full bg-red-500 text-white py-3 rounded-xl font-medium"
      >
        Clear All Data
      </button>
    </div>
  )
}
