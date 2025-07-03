import { useState } from 'react'

const ScheduleUploader = ({ onClose }) => {
  const [uploadedSchedules, setUploadedSchedules] = useState([
    { id: 1, name: 'Sarah Chen', availability: 'Mon 2-4pm, Wed 3-5pm, Fri 1-3pm' },
    { id: 2, name: 'Eleanor Williams', availability: 'Mon 1-3pm, Tue 2-4pm, Thu 3-5pm' },
    { id: 3, name: 'Alex Rodriguez', availability: 'Tue 1-3pm, Wed 2-4pm, Fri 2-4pm' }
  ])

  const [suggestedTimes, setSuggestedTimes] = useState([
    { day: 'Monday', time: '2:00 PM - 4:00 PM', participants: 3, confidence: 'High' },
    { day: 'Wednesday', time: '2:00 PM - 4:00 PM', participants: 3, confidence: 'High' },
    { day: 'Friday', time: '2:00 PM - 4:00 PM', participants: 2, confidence: 'Medium' }
  ])
  const [activeTab, setActiveTab] = useState('coordination')



  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'High': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded w-11/12 h-5/6 flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Automated Group Scheduler</h2>
            <p className="text-gray-300">Automatically coordinate study times with your group</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-gray-50 border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('coordination')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'coordination' ? 'bg-white border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🤝 Group Coordination
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'suggestions' ? 'bg-white border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              💡 Suggested Times
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'coordination' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Group Member Schedules</h3>
                <div className="space-y-3">
                  {uploadedSchedules.map(schedule => (
                    <div key={schedule.id} className="bg-white p-4 rounded border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{schedule.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{schedule.availability}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Uploaded
                          </span>
                          {schedule.name === 'You' && (
                            <button className="text-xs text-blue-600 hover:text-blue-800">
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded border">
                <h4 className="font-semibold text-blue-800 mb-2">📊 Coordination Summary</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {uploadedSchedules.length} members have uploaded schedules</li>
                  <li>• 3 optimal study times identified</li>
                  <li>• Average availability overlap: 75%</li>
                  <li>• Next suggested session: Monday 2:00 PM</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Suggested Study Times</h3>
                <p className="text-gray-600 mb-4">Based on everyone's availability, here are the best times for group study sessions</p>
                
                <div className="space-y-4">
                  {suggestedTimes.map((suggestion, index) => (
                    <div key={index} className="bg-white p-4 rounded border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{suggestion.day}</h4>
                          <p className="text-gray-600">{suggestion.time}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {suggestion.participants} members available
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`text-xs px-2 py-1 rounded ${getConfidenceColor(suggestion.confidence)}`}>
                            {suggestion.confidence} Match
                          </span>
                          <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm">
                            Schedule Session
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded border">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Smart Scheduling</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Algorithm considers everyone's preferences</li>
                  <li>• Prioritizes times with maximum participation</li>
                  <li>• Accounts for study session duration</li>
                  <li>• Updates automatically when schedules change</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScheduleUploader 