import { useState } from 'react'

const VirtualStudyRoom = ({ session, onClose }) => {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', isOnline: true, isSpeaking: false },
    { id: 2, name: 'Sarah Chen', isOnline: true, isSpeaking: true },
    { id: 3, name: 'Eleanor Williams', isOnline: true, isSpeaking: false },
    { id: 4, name: 'Travis Kelce', isOnline: false, isSpeaking: false }
  ])
  
  const [whiteboardContent, setWhiteboardContent] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Sarah Chen', message: 'Can someone explain the algorithm we discussed?', time: '2:30 PM' },
    { id: 2, user: 'You', message: 'I have the notes from last class', time: '2:31 PM' },
    { id: 3, user: 'Eleanor Williams', message: 'Wait, why is Travis Kelce here??', time: '2:35 PM' },
    { id: 4, user: 'You', message: 'He\'s emotionally recovering', time: '2:36 PM' },
    { id: 5, user: 'Eleanor Williams', message: 'Understandable', time: '2:36 PM' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: chatMessages.length + 1,
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  const toggleAudio = () => setIsAudioEnabled(!isAudioEnabled)
  const toggleVideo = () => setIsVideoEnabled(!isVideoEnabled)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded w-11/12 h-5/6 flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{session.name}</h2>
            <p className="text-gray-300">{session.day}, {session.time}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Video/Audio Grid */}
            <div className="flex-1 bg-gray-100 p-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                {participants.map(participant => (
                  <div key={participant.id} className={`bg-white p-4 flex flex-col items-center justify-center border ${
                    participant.isSpeaking ? 'border-green-500' : 'border-gray-200'
                  }`}>
                    <div className={`w-12 h-12 rounded flex items-center justify-center text-white font-bold ${
                      participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}>
                      {participant.name.charAt(0)}
                    </div>
                    <p className="mt-2 font-medium">{participant.name}</p>
                    <span className="text-xs text-gray-500">
                      {participant.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-100 p-4 flex justify-center space-x-4">
              <button
                onClick={toggleAudio}
                className={`p-2 border ${
                  isAudioEnabled ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {isAudioEnabled ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleVideo}
                className={`p-2 border ${
                  isVideoEnabled ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 border bg-red-500 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-l flex flex-col">
            {/* Whiteboard */}
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-2">Collaborative Whiteboard</h3>
              <textarea
                value={whiteboardContent}
                onChange={(e) => setWhiteboardContent(e.target.value)}
                placeholder="Start writing notes together..."
                className="w-full h-32 p-2 border rounded resize-none"
              />
            </div>

            {/* Chat */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold mb-2">Chat</h3>
              <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`p-2 rounded ${
                    msg.user === 'You' ? 'bg-blue-100 ml-4' : 'bg-gray-100 mr-4'
                  }`}>
                    <p className="text-xs text-gray-500">{msg.user} • {msg.time}</p>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VirtualStudyRoom 