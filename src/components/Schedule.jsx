import { convertTimeToMinutes } from '../utils/dateUtils'

const Schedule = ({ 
  currentWeek, 
  onNavigateWeek, 
  formatWeekRange, 
  getWeekDates, 
  classes, 
  joinedGroups, 
  tasks, 
  formatTimeForDisplay 
}) => {
  const weekDates = getWeekDates(currentWeek)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getTimeSlotContent = (hour, day, dateStr) => {
    const hourStartMinutes = hour * 60
    const hourEndMinutes = (hour + 1) * 60

    const classItem = classes.find(c => {
      if (c.day !== day) return false
      const [classStart, classEnd] = c.time.split('-')
      const classStartMinutes = convertTimeToMinutes(classStart)
      const classEndMinutes = convertTimeToMinutes(classEnd)
      return classStartMinutes < hourEndMinutes && classEndMinutes > hourStartMinutes
    })

    const group = joinedGroups.find(g => {
      if (g.day !== day) return false
      const [groupStart, groupEnd] = g.time.split('-')
      const groupStartMinutes = convertTimeToMinutes(groupStart)
      const groupEndMinutes = convertTimeToMinutes(groupEnd)
      return groupStartMinutes < hourEndMinutes && groupEndMinutes > hourStartMinutes
    })

    const task = tasks.find(t => {
      const taskDate = new Date(t.dueDate)
      return taskDate.toISOString().split('T')[0] === dateStr && parseInt(t.dueTime) === hour
    })

    if (classItem) return { type: 'class', data: classItem }
    if (group) return { type: 'group', data: group }
    if (task) return { type: 'task', data: task }
    return null
  }

  const renderTimeSlot = (hour, day, dateStr) => {
    const content = getTimeSlotContent(hour, day, dateStr)
    if (!content) return null

    const styles = {
      class: 'bg-blue-100',
      group: 'bg-green-100',
      task: 'bg-yellow-100'
    }

    return (
      <div className={`${styles[content.type]} p-1 rounded text-xs`}>
        <div className="font-semibold">{content.data.name}</div>
        {content.type === 'class' && <div>{content.data.location}</div>}
        {content.type === 'group' && <div>
          {formatTimeForDisplay(content.data.time.split('-')[0])} - {formatTimeForDisplay(content.data.time.split('-')[1])}
        </div>}
        {content.type === 'task' && <div>Due: {formatTimeForDisplay(content.data.dueTime)}</div>}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>
        <div className="flex gap-2">
          <button onClick={() => onNavigateWeek(-1)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
            Previous
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded">{formatWeekRange(currentWeek)}</span>
          <button onClick={() => onNavigateWeek(1)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-50">Time</th>
              {days.map((day, index) => (
                <th key={day} className="border p-2 bg-gray-50">
                  {day}
                  <div className="text-xs text-gray-500">
                    {weekDates[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour}>
                <td className="border p-2 text-sm text-gray-600">
                  {formatTimeForDisplay(`${hour}:00`)}
                </td>
                {days.map((day, index) => (
                  <td key={`${day}-${hour}`} className="border p-1 min-h-[60px]">
                    {renderTimeSlot(hour, day, weekDates[index].toISOString().split('T')[0])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Schedule 