import { useState } from 'react'

const NotificationCenter = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'CS 405 Study Group',
      message: 'Your study session starts in 30 minutes',
      time: '2:30 PM',
      date: 'Today',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Math 101 Review',
      message: 'Study session reminder: 2 hours until start',
      time: '4:00 PM',
      date: 'Today',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'update',
      title: 'New Group Member',
      message: 'Sarah Chen joined your CS 405 study group',
      time: '1:15 PM',
      date: 'Today',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Physics Lab Report Due',
      message: 'Assignment due in 24 hours',
      time: '11:30 AM',
      date: 'Yesterday',
      isRead: true,
      priority: 'high'
    }
  ])

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    floridaPanthers: false,
    reminderTiming: '30', // minutes before
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    },
    notificationTypes: {
      studyReminders: true,
      groupUpdates: true,
      assignmentDue: true,
      gradeUpdates: false
    }
  })

  const [activeTab, setActiveTab] = useState('notifications')

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-blue-500 bg-blue-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'reminder': return '⏰'
      case 'update': return '📢'
      case 'assignment': return '📝'
      case 'grade': return '📊'
      default: return '📌'
    }
  }

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const handleNotificationTypeChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      notificationTypes: {
        ...prev.notificationTypes,
        [type]: value
      }
    }))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded w-11/12 h-5/6 flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold">Notification Center</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {unreadCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="bg-gray-50 border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'notifications' ? 'bg-white border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🔔 Notifications ({notifications.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'settings' ? 'bg-white border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  ⚙️ Settings
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  {notifications.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <div className="text-4xl mb-4">🔕</div>
                      <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                      <p>You're all caught up!</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded border-l-4 ${getPriorityColor(notification.priority)} ${
                          !notification.isRead ? 'ring-2 ring-indigo-200' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <span className="text-xl">{getTypeIcon(notification.type)}</span>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold">{notification.title}</h4>
                                {!notification.isRead && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.date} at {notification.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Mark read
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* General Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">Push notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.floridaPanthers}
                          onChange={(e) => handleSettingChange('floridaPanthers', e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">Send the Florida Panthers</span>
                      </label>
                    </div>
                  </div>

                  {/* Reminder Timing */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Reminder Timing</h3>
                    <div className="flex items-center space-x-2">
                      <span>Remind me</span>
                      <select
                        value={settings.reminderTiming}
                        onChange={(e) => handleSettingChange('reminderTiming', e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="15">15 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">1 hour before</option>
                        <option value="120">2 hours before</option>
                        <option value="1440">1 day before</option>
                      </select>
                      <span>study sessions start</span>
                    </div>
                  </div>

                  {/* Quiet Hours */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quiet Hours</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.quietHours.enabled}
                          onChange={(e) => handleSettingChange('quietHours', {
                            ...settings.quietHours,
                            enabled: e.target.checked
                          })}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="ml-2">Enable quiet hours</span>
                      </label>
                      {settings.quietHours.enabled && (
                        <div className="flex items-center space-x-2 ml-6">
                          <span>From</span>
                          <input
                            type="time"
                            value={settings.quietHours.start}
                            onChange={(e) => handleSettingChange('quietHours', {
                              ...settings.quietHours,
                              start: e.target.value
                            })}
                            className="border rounded px-2 py-1"
                          />
                          <span>to</span>
                          <input
                            type="time"
                            value={settings.quietHours.end}
                            onChange={(e) => handleSettingChange('quietHours', {
                              ...settings.quietHours,
                              end: e.target.value
                            })}
                            className="border rounded px-2 py-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notification Types */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
                    <div className="space-y-3">
                      {Object.entries(settings.notificationTypes).map(([type, enabled]) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => handleNotificationTypeChange(type, e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 capitalize">
                            {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationCenter 