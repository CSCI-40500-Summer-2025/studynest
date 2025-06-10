export const TIME_CONSTRAINTS = {
  MIN_HOUR: 7,
  MAX_HOUR: 22,
  MIN_DURATION: 15,
  MAX_DURATION: 240
}

export const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  if (isNaN(hours) || isNaN(minutes)) return null
  return hours * 60 + minutes
}

export const formatTimeForDisplay = (time) => {
  if (!time || typeof time !== 'string') return 'Invalid time'
  
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const minute = parseInt(minutes)
  
  if (isNaN(hour) || hour < 0 || hour > 23 || isNaN(minute) || minute < 0 || minute > 59) {
    return 'Invalid time'
  }
  
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes.padStart(2, '0')} ${ampm}`
}

export const formatDueDate = (dateStr, timeStr) => {
  const dueDate = new Date(`${dateStr}T${timeStr}`)
  const now = new Date()
  const diffDays = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24))
  
  const timeDisplay = formatTimeForDisplay(timeStr)
  
  if (diffDays < 0) return `Overdue (${dueDate.toLocaleDateString()})`
  if (diffDays === 0) return `Today at ${timeDisplay}`
  if (diffDays === 1) return `Tomorrow at ${timeDisplay}`
  return `${dueDate.toLocaleDateString()} at ${timeDisplay}`
}

export const getWeekDates = (date) => {
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(start)
    current.setDate(start.getDate() + i)
    return current
  })
}

export const formatWeekRange = (dates) => {
  const [start, end] = [dates[0], dates[6]]
  const dateOptions = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', dateOptions)} - ${end.toLocaleDateString('en-US', dateOptions)}`
}

export const validateTimeRange = (startTime, endTime) => {
  const startMinutes = convertTimeToMinutes(startTime)
  const endMinutes = convertTimeToMinutes(endTime)
  
  if (startMinutes === null || endMinutes === null) {
    return 'Invalid time format'
  }

  const { MIN_HOUR, MAX_HOUR, MIN_DURATION, MAX_DURATION } = TIME_CONSTRAINTS
  const minMinutes = MIN_HOUR * 60
  const maxMinutes = MAX_HOUR * 60

  if (startMinutes < minMinutes || startMinutes > maxMinutes || 
      endMinutes < minMinutes || endMinutes > maxMinutes) {
    return `Times must be between ${MIN_HOUR}:00 AM and ${MAX_HOUR}:00 PM`
  }

  if (endMinutes <= startMinutes) {
    return 'End time must be after start time'
  }

  const duration = endMinutes - startMinutes
  if (duration < MIN_DURATION) {
    return `Sessions must be at least ${MIN_DURATION} minutes long`
  }

  if (duration > MAX_DURATION) {
    return `Sessions cannot exceed ${MAX_DURATION / 60} hours`
  }

  return null
} 