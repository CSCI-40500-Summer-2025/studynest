import React from 'react'

const AttendanceTracking = () => (
  <div className="bg-blue-50 p-4 rounded border">
    <h4 className="font-semibold text-blue-800 mb-2">📊 Attendance Tracking</h4>
    <p className="text-sm text-blue-700 mb-3">
      StudyNest tracks your attendance patterns to help optimize your study schedule and improve group coordination.
    </p>
    <div className="text-sm text-blue-700 space-y-1">
      <p>• Your attendance rate: 85%</p>
      <p>• Most productive study times: 1-4 AM</p>
      <p>• Preferred session duration: 2 hours</p>
    </div>
  </div>
)

export default AttendanceTracking 