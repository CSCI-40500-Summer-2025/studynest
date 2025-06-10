import { TIME_CONSTRAINTS } from '../utils/dateUtils'
import BaseModal from './BaseModal'

const CreateTaskModal = ({ 
  show, 
  onClose, 
  newTask, 
  onNewTaskChange, 
  onSubmit 
}) => {
  const minTime = `${TIME_CONSTRAINTS.MIN_HOUR.toString().padStart(2, '0')}:00`
  const maxTime = `${TIME_CONSTRAINTS.MAX_HOUR.toString().padStart(2, '0')}:00`

  return (
    <BaseModal
      show={show}
      onClose={onClose}
      title="Create New Task"
      submitLabel="Create Task"
      onSubmit={onSubmit}
      showTimeConstraints
    >
      <div>
        <label className="block text-sm font-medium mb-1">Task Name</label>
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => onNewTaskChange({...newTask, name: e.target.value})}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={newTask.description}
          onChange={(e) => onNewTaskChange({...newTask, description: e.target.value})}
          className="w-full border rounded px-3 py-2"
          rows="3"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => onNewTaskChange({...newTask, dueDate: e.target.value})}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Time</label>
          <input
            type="time"
            value={newTask.dueTime}
            onChange={(e) => onNewTaskChange({...newTask, dueTime: e.target.value})}
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

export default CreateTaskModal 