import { TIME_CONSTRAINTS } from '../utils/dateUtils'
import BaseModal from './BaseModal'

const CreateSessionModal = ({ 
  show, 
  onClose, 
  newSession, 
  onNewSessionChange, 
  onSubmit 
}) => {
  const minTime = `${TIME_CONSTRAINTS.MIN_HOUR.toString().padStart(2, '0')}:00`
  const maxTime = `${TIME_CONSTRAINTS.MAX_HOUR.toString().padStart(2, '0')}:00`

  return (
    <BaseModal
      show={show}
      onClose={onClose}
      title="Create Study Session"
      submitLabel="Create Session"
      onSubmit={onSubmit}
      showTimeConstraints
    >
      <div>
        <label className="block text-sm font-medium mb-1">Session Name</label>
        <input
          type="text"
          value={newSession.name}
          onChange={(e) => onNewSessionChange({...newSession, name: e.target.value})}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Day</label>
        <select
          value={newSession.day}
          onChange={(e) => onNewSessionChange({...newSession, day: e.target.value})}
          className="w-full border rounded px-3 py-2"
        >
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            value={newSession.startTime}
            onChange={(e) => onNewSessionChange({...newSession, startTime: e.target.value})}
            className="w-full border rounded px-3 py-2"
            required
            min={minTime}
            max={maxTime}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            value={newSession.endTime}
            onChange={(e) => onNewSessionChange({...newSession, endTime: e.target.value})}
            className="w-full border rounded px-3 py-2"
            required
            min={minTime}
            max={maxTime}
          />
        </div>
      </div>
    </BaseModal>
  )
}

export default CreateSessionModal 