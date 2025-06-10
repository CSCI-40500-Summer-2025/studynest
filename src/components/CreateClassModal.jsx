import { TIME_CONSTRAINTS } from '../utils/dateUtils'
import BaseModal from './BaseModal'

const CreateClassModal = ({ 
  show, 
  onClose, 
  newClass, 
  onNewClassChange, 
  onSubmit 
}) => {
  const minTime = `${TIME_CONSTRAINTS.MIN_HOUR.toString().padStart(2, '0')}:00`
  const maxTime = `${TIME_CONSTRAINTS.MAX_HOUR.toString().padStart(2, '0')}:00`

  return (
    <BaseModal
      show={show}
      onClose={onClose}
      title="Add New Class"
      submitLabel="Add Class"
      onSubmit={onSubmit}
      showTimeConstraints
    >
      <div>
        <label className="block text-sm font-medium mb-1">Class Name</label>
        <input
          type="text"
          value={newClass.name}
          onChange={(e) => onNewClassChange({...newClass, name: e.target.value})}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Day</label>
        <select
          value={newClass.day}
          onChange={(e) => onNewClassChange({...newClass, day: e.target.value})}
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
            value={newClass.startTime}
            onChange={(e) => onNewClassChange({...newClass, startTime: e.target.value})}
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
            value={newClass.endTime}
            onChange={(e) => onNewClassChange({...newClass, endTime: e.target.value})}
            className="w-full border rounded px-3 py-2"
            required
            min={minTime}
            max={maxTime}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={newClass.location}
          onChange={(e) => onNewClassChange({...newClass, location: e.target.value})}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Instructor</label>
        <input
          type="text"
          value={newClass.instructor}
          onChange={(e) => onNewClassChange({...newClass, instructor: e.target.value})}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
    </BaseModal>
  )
}

export default CreateClassModal 