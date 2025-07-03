import { useState } from 'react'

const LMSIntegration = ({ onClose }) => {
  const [selectedLMS, setSelectedLMS] = useState('canvas')
  const [isConnected, setIsConnected] = useState(false)
  const [syncStatus, setSyncStatus] = useState('idle')
  const [syncedData, setSyncedData] = useState({
    assignments: [],
    courses: [],
    grades: [],
    announcements: []
  })

  const lmsOptions = [
    { id: 'canvas', name: 'Canvas', icon: '🎨' },
    { id: 'blackboard', name: 'Blackboard', icon: '📚' },
    { id: 'brightspace', name: 'Brightspace', icon: '☀️' },
    { id: 'moodle', name: 'Moodle', icon: '🌱' }
  ]

  const mockSyncedData = {
    assignments: [
      { id: 1, title: 'CS 405 Final Project', course: 'CS 405', dueDate: '2025-06-15', status: 'pending' },
      { id: 2, title: 'Math 101 Quiz 3', course: 'Math 101', dueDate: '2025-06-12', status: 'completed' },
      { id: 3, title: 'Physics Lab Report', course: 'Physics 201', dueDate: '2025-06-20', status: 'pending' }
    ],
    courses: [
      { id: 1, name: 'CS 405 - Advanced Algorithms', instructor: 'Prof. Khatchadourian', credits: 3 },
      { id: 2, name: 'Math 101 - Calculus I', instructor: 'Prof. Johnson', credits: 4 },
      { id: 3, name: 'Physics 201 - Mechanics', instructor: 'Dr. Brown', credits: 4 }
    ],
    grades: [
      { course: 'CS 405', assignment: 'Midterm', grade: 'A-', percentage: 88 },
      { course: 'Math 101', assignment: 'Quiz 2', grade: 'B+', percentage: 85 },
      { course: 'Physics 201', assignment: 'Lab 1', grade: 'A', percentage: 92 }
    ],
    announcements: [
      { id: 1, course: 'CS 405', title: 'Office Hours Changed', content: 'Office hours moved to Tuesday 2-4 PM', date: '2025-06-08' },
      { id: 2, course: 'Math 101', title: 'Quiz 3 Reminder', content: 'Quiz 3 will cover chapters 5-7', date: '2025-06-07' }
    ]
  }

  const handleConnect = () => {
    setSyncStatus('connecting')
    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true)
      setSyncStatus('syncing')
      // Simulate data sync
      setTimeout(() => {
        setSyncedData(mockSyncedData)
        setSyncStatus('completed')
      }, 2000)
    }, 1500)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setSyncStatus('idle')
    setSyncedData({ assignments: [], courses: [], grades: [], announcements: [] })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'connecting': return 'text-yellow-600'
      case 'syncing': return 'text-blue-600'
      case 'completed': return 'text-green-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connecting': return '⏳'
      case 'syncing': return '🔄'
      case 'completed': return '✅'
      case 'error': return '❌'
      default: return '⏸️'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded w-11/12 h-5/6 flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">LMS Integration</h2>
            <p className="text-gray-300">Connect your institutions' learning management system</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Left Panel - Connection */}
          <div className="w-1/3 bg-gray-50 p-6 border-r">
            <div className="space-y-6">
              {/* LMS Selection */}
              <div>
                <h3 className="font-semibold mb-3">Select Your LMS</h3>
                <div className="space-y-2">
                  {lmsOptions.map(lms => (
                    <label key={lms.id} className="flex items-center p-3 bg-white rounded border cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="lms"
                        value={lms.id}
                        checked={selectedLMS === lms.id}
                        onChange={(e) => setSelectedLMS(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-xl mr-2">{lms.icon}</span>
                      <span className="font-medium">{lms.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Connection Status */}
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold mb-3">Connection Status</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`text-sm font-medium ${getStatusColor(syncStatus)}`}>
                    {getStatusIcon(syncStatus)} {syncStatus.charAt(0).toUpperCase() + syncStatus.slice(1)}
                  </span>
                </div>
                
                {!isConnected ? (
                  <button
                    onClick={handleConnect}
                    disabled={syncStatus === 'connecting' || syncStatus === 'syncing'}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    {syncStatus === 'connecting' ? 'Connecting...' : 'Connect to LMS'}
                  </button>
                ) : (
                  <button
                    onClick={handleDisconnect}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Disconnect
                  </button>
                )}
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 p-4 rounded border">
                <h3 className="font-semibold mb-2 text-blue-800">🔒 Secure Connection</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• OAuth 2.0 authentication</li>
                  <li>• Encrypted data transmission</li>
                  <li>• Read-only access to your data</li>
                  <li>• No password storage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Panel - Synced Data */}
          <div className="flex-1 p-6 overflow-y-auto h-full">
            {!isConnected ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">Connect to get started</h3>
                  <p>Select your LMS and connect to automatically sync your academic data</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Assignments */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    📝 Assignments ({syncedData.assignments.length})
                  </h3>
                  <div className="space-y-2">
                    {syncedData.assignments.map(assignment => (
                      <div key={assignment.id} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-gray-600">{assignment.course}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              assignment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {assignment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    🎓 Courses ({syncedData.courses.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {syncedData.courses.map(course => (
                      <div key={course.id} className="bg-white p-3 rounded border">
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                        <p className="text-xs text-gray-500">{course.credits} credits</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grades */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    📊 Recent Grades ({syncedData.grades.length})
                  </h3>
                  <div className="space-y-2">
                    {syncedData.grades.map((grade, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{grade.assignment}</p>
                            <p className="text-sm text-gray-600">{grade.course}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{grade.grade}</p>
                            <p className="text-sm text-gray-600">{grade.percentage}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Announcements */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    📢 Announcements ({syncedData.announcements.length})
                  </h3>
                  <div className="space-y-2">
                    {syncedData.announcements.map(announcement => (
                      <div key={announcement.id} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium">{announcement.title}</p>
                          <span className="text-xs text-gray-500">{announcement.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{announcement.course}</p>
                        <p className="text-sm mt-1">{announcement.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LMSIntegration 