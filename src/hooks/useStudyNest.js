import { useState } from 'react'
import { initialTasks, initialClasses, exampleSessions } from '../data/initialData'
import { validateTimeRange, convertTimeToMinutes, TIME_CONSTRAINTS } from '../utils/dateUtils'

const initialSessionState = {
  name: '',
  day: 'Mon',
  startTime: '09:00',
  endTime: '10:00'
}

const initialClassState = {
  name: '',
  day: 'Mon',
  startTime: '09:00',
  endTime: '10:00',
  location: '',
  instructor: ''
}

const initialTaskState = {
  name: '',
  description: '',
  dueDate: '',
  dueTime: '23:59',
  progress: 0
}

export const useStudyNest = () => {
  const [activeTab, setActiveTab] = useState('tasks')
  const [notification, setNotification] = useState(null)
  const [joinedGroups, setJoinedGroups] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showCreateClassModal, setShowCreateClassModal] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(new Date('2025-06-01'))
  const [tasks, setTasks] = useState(initialTasks)
  const [classes, setClasses] = useState(initialClasses)
  const [newSession, setNewSession] = useState(initialSessionState)
  const [newClass, setNewClass] = useState(initialClassState)
  const [newTask, setNewTask] = useState(initialTaskState)

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const updateTaskProgress = (taskId, newProgress) => {
    if (!taskId || typeof taskId !== 'number' || typeof newProgress !== 'number' || isNaN(newProgress)) {
      showNotification('Invalid input', 'error')
      return
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId)
    if (taskIndex === -1) {
      showNotification('Task not found', 'error')
      return
    }

    const updatedTasks = [...tasks]
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      progress: Math.min(100, Math.max(0, newProgress))
    }
    setTasks(updatedTasks)
    showNotification(`Progress updated for ${updatedTasks[taskIndex].name}`, 'success')
  }

  const handleJoinGroup = (groupName, time, day) => {
    if (joinedGroups.some(group => group.name === groupName)) {
      showNotification(`You're already part of ${groupName}!`, 'warning')
      return
    }
    
    setJoinedGroups([...joinedGroups, { name: groupName, time, day }])
    showNotification(`Successfully joined ${groupName}!`, 'success')
  }

  const checkTimeConflict = (day, startTime, endTime) => {
    const timeError = validateTimeRange(startTime, endTime)
    if (timeError) return timeError

    const newStartMinutes = convertTimeToMinutes(startTime)
    const newEndMinutes = convertTimeToMinutes(endTime)

    const checkOverlap = (start, end, name) => 
      newStartMinutes < end && newEndMinutes > start ? `Conflicts with ${name}` : null

    // Check classes and study groups
    const items = [...classes, ...joinedGroups]
    for (const item of items) {
      if (item.day === day) {
        const [itemStart, itemEnd] = item.time.split('-')
        const conflict = checkOverlap(
          convertTimeToMinutes(itemStart),
          convertTimeToMinutes(itemEnd),
          item.name
        )
        if (conflict) return conflict
      }
    }

    return null
  }

  const handleCreateSession = (e) => {
    e.preventDefault()
    
    if (!newSession.name.trim()) {
      showNotification('Session name cannot be empty', 'error')
      return
    }

    const conflict = checkTimeConflict(newSession.day, newSession.startTime, newSession.endTime)
    if (conflict) {
      showNotification(conflict, 'warning')
      return
    }

    const timeString = `${newSession.startTime}-${newSession.endTime}`
    setJoinedGroups([...joinedGroups, {
      name: newSession.name.trim(),
      time: timeString,
      day: newSession.day
    }])

    showNotification(`Successfully created ${newSession.name}!`, 'success')
    setShowCreateModal(false)
    setNewSession(initialSessionState)
  }

  const handleCreateTask = (e) => {
    e.preventDefault()
    
    if (!newTask.name.trim() || !newTask.dueDate) {
      showNotification('Please fill in all required fields', 'error')
      return
    }

    const [dueHour] = newTask.dueTime.split(':').map(Number)
    if (dueHour < TIME_CONSTRAINTS.MIN_HOUR || dueHour > TIME_CONSTRAINTS.MAX_HOUR) {
      showNotification(`Due time must be between ${TIME_CONSTRAINTS.MIN_HOUR}:00 AM and ${TIME_CONSTRAINTS.MAX_HOUR}:00 PM`, 'error')
      return
    }

    const dueDateTime = new Date(`${newTask.dueDate}T${newTask.dueTime}`)
    if (dueDateTime < new Date()) {
      showNotification('Due date cannot be in the past', 'error')
      return
    }

    const newTaskWithId = {
      ...newTask,
      id: tasks.length + 1,
      name: newTask.name.trim(),
      description: newTask.description.trim()
    }

    setTasks([...tasks, newTaskWithId])
    setShowCreateTaskModal(false)
    setNewTask(initialTaskState)
    showNotification(`Successfully created task: ${newTask.name}`, 'success')
  }

  const handleCreateClass = (e) => {
    e.preventDefault()
    
    if (!newClass.name.trim() || !newClass.location.trim() || !newClass.instructor.trim()) {
      showNotification('Please fill in all required fields', 'error')
      return
    }

    const conflict = checkTimeConflict(newClass.day, newClass.startTime, newClass.endTime)
    if (conflict) {
      showNotification(conflict, 'warning')
      return
    }

    const newClassWithId = {
      ...newClass,
      id: classes.length + 1,
      name: newClass.name.trim(),
      location: newClass.location.trim(),
      instructor: newClass.instructor.trim(),
      time: `${newClass.startTime}-${newClass.endTime}`
    }

    setClasses([...classes, newClassWithId])
    setShowCreateClassModal(false)
    setNewClass(initialClassState)
    showNotification(`Successfully created class: ${newClass.name}`, 'success')
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek)
    newDate.setDate(newDate.getDate() + (direction * 7))
    setCurrentWeek(newDate)
  }

  return {
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
  }
} 