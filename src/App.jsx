import { useState } from 'react'
import { useStudyNest } from './hooks/useStudyNest'
import { formatWeekRange, formatTimeForDisplay, formatDueDate, getWeekDates } from './utils/dateUtils'
import Schedule from './components/Schedule'
import CreateTaskModal from './components/CreateTaskModal'
import CreateClassModal from './components/CreateClassModal'
import CreateSessionModal from './components/CreateSessionModal'
import VirtualStudyRoom from './components/VirtualStudyRoom'
import LMSIntegration from './components/LMSIntegration'
import ScheduleUploader from './components/ScheduleUploader'
import NotificationCenter from './components/NotificationCenter'
import AttendanceTracking from './components/AttendanceTracking'

const tabs = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'classes', label: 'Classes' },
  { id: 'groups', label: 'Study Groups' },
  { id: 'features', label: 'Features' }
]

const featureButtons = [
  { id: 'virtual-room', label: '👩‍💻 Virtual Study Room', description: 'Real-time collaboration' },
  { id: 'lms-integration', label: '📚 LMS Integration', description: 'Sync with your institution' },
  { id: 'schedule-uploader', label: '📆 Automated Group Scheduler', description: 'Automatically coordinate group study times' },
  { id: 'notifications', label: '🔔 Notifications', description: 'Smart reminders & alerts' }
]

function App() {
  const {
    activeTab,
    notification,
    joinedGroups,
    showCreateModal,
    showCreateTaskModal,
    showCreateClassModal,
    currentWeek,
    tasks,
    classes,
    newSession,
    newTask,
    newClass,
    exampleSessions,
    setActiveTab,
    setShowCreateModal,
    setShowCreateTaskModal,
    setShowCreateClassModal,
    setNewSession,
    setNewTask,
    setNewClass,
    updateTaskProgress,
    handleJoinGroup,
    handleCreateSession,
    handleCreateTask,
    handleCreateClass,
    navigateWeek
  } = useStudyNest()

  const [showVirtualRoom, setShowVirtualRoom] = useState(false)
  const [showLMSIntegration, setShowLMSIntegration] = useState(false)
  const [showScheduleUploader, setShowScheduleUploader] = useState(false)
  const [showNotificationCenter, setShowNotificationCenter] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)

  const handleFeatureClick = (featureId) => {
    switch (featureId) {
      case 'virtual-room':
        setSelectedSession({ name: 'CS 405 Study Group', day: 'Tue', time: '16:00-18:00' })
        setShowVirtualRoom(true)
        break
      case 'lms-integration':
        setShowLMSIntegration(true)
        break
      case 'schedule-uploader':
        setShowScheduleUploader(true)
        break
      case 'notifications':
        setShowNotificationCenter(true)
        break
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tasks</h2>
              <button
                onClick={() => setShowCreateTaskModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Task
              </button>
            </div>
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className={`bg-white p-4 rounded shadow ${
                  new Date(`${task.dueDate}T${task.dueTime}`) < new Date() ? 'border-l-4 border-red-500' : ''
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{task.name}</h3>
                      <p className={`text-gray-600 ${
                        new Date(`${task.dueDate}T${task.dueTime}`) < new Date() ? 'text-red-600' : ''
                      }`}>
                        Due: {formatDueDate(task.dueDate, task.dueTime)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateTaskProgress(task.id, task.progress - 10)}
                        className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                        disabled={task.progress <= 0}
                      >
                        -10%
                      </button>
                      <span className="text-sm font-medium">{task.progress}%</span>
                      <button
                        onClick={() => updateTaskProgress(task.id, task.progress + 10)}
                        className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                        disabled={task.progress >= 100}
                      >
                        +10%
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`} 
                        style={{width: `${task.progress}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'classes':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Classes</h2>
              <button
                onClick={() => setShowCreateClassModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Class
              </button>
            </div>
            <div className="space-y-4">
              {classes.map(classItem => (
                <div key={classItem.id} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{classItem.name}</h3>
                      <p className="text-gray-600">
                        {classItem.day}, {formatTimeForDisplay(classItem.time.split('-')[0])} - {formatTimeForDisplay(classItem.time.split('-')[1])}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {classItem.location} • {classItem.instructor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'groups':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Study Groups</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Session
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {exampleSessions.map((session, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{session.name}</h3>
                      <p className="text-gray-600">
                        {session.day}, {formatTimeForDisplay(session.time.split('-')[0])} - {formatTimeForDisplay(session.time.split('-')[1])}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleJoinGroup(session.name, session.time, session.day)}
                        disabled={joinedGroups.some(group => group.name === session.name)}
                        className={`px-4 py-2 rounded ${
                          joinedGroups.some(group => group.name === session.name)
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {joinedGroups.some(group => group.name === session.name) ? 'Joined' : 'Join'}
                      </button>
                      {joinedGroups.some(group => group.name === session.name) && (
                        <button
                          onClick={() => {
                            setSelectedSession(session)
                            setShowVirtualRoom(true)
                          }}
                          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        >
                          Join Room
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'features':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Study Tools</h2>
              <p className="text-gray-600">Prototype features for enhanced study experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featureButtons.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature.id)}
                  className="bg-white p-4 rounded border border-gray-200 text-left hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">{feature.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{feature.description}</div>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <AttendanceTracking />
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded border">
              <h3 className="font-semibold mb-2">Prototype Features</h3>
              <p className="text-sm text-gray-600">
                These are demonstration features showing how StudyNest could integrate advanced study tools. 
                Click any feature to see the prototype interface.
              </p>
            </div>
          </div>
        )
      case 'schedule':
        return (
          <Schedule 
            currentWeek={currentWeek} 
            onNavigateWeek={navigateWeek} 
            formatWeekRange={(week) => formatWeekRange(getWeekDates(week))} 
            getWeekDates={getWeekDates} 
            joinedGroups={joinedGroups} 
            classes={classes} 
            tasks={tasks} 
            formatTimeForDisplay={formatTimeForDisplay} 
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen flex flex-col">
        <div className="bg-white shadow-lg">
          <div className="bg-indigo-600 px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-white">StudyNest</h1>
              <p className="text-indigo-200 text-lg mt-1">Your Academic Success Companion</p>
            </div>
          </div>
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-8">
              <div className="flex space-x-8">
                {tabs.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>
      {showCreateModal && (
        <CreateSessionModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          newSession={newSession}
          onNewSessionChange={setNewSession}
          onSubmit={handleCreateSession}
        />
      )}
      {showCreateTaskModal && (
        <CreateTaskModal
          show={showCreateTaskModal}
          onClose={() => setShowCreateTaskModal(false)}
          newTask={newTask}
          onNewTaskChange={setNewTask}
          onSubmit={handleCreateTask}
        />
      )}
      {showCreateClassModal && (
        <CreateClassModal
          show={showCreateClassModal}
          onClose={() => setShowCreateClassModal(false)}
          newClass={newClass}
          onNewClassChange={setNewClass}
          onSubmit={handleCreateClass}
        />
      )}
      {notification && (
        <div className={`fixed bottom-4 right-4 ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' :
          'bg-yellow-500'
        } text-white px-6 py-3 rounded shadow-lg`}>
          {notification.message}
        </div>
      )}

      {/* New Feature Modals */}
      {showVirtualRoom && selectedSession && (
        <VirtualStudyRoom
          session={selectedSession}
          onClose={() => setShowVirtualRoom(false)}
        />
      )}

      {showLMSIntegration && (
        <LMSIntegration
          onClose={() => setShowLMSIntegration(false)}
        />
      )}

      {showScheduleUploader && (
        <ScheduleUploader
          onClose={() => setShowScheduleUploader(false)}
        />
      )}

      {showNotificationCenter && (
        <NotificationCenter
          onClose={() => setShowNotificationCenter(false)}
        />
      )}
    </div>
  )
}

export default App
