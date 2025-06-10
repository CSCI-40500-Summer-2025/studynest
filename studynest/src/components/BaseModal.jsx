import { TIME_CONSTRAINTS } from '../utils/dateUtils'

const BaseModal = ({
  show,
  onClose,
  title,
  children,
  submitLabel,
  onSubmit,
  showTimeConstraints = false
}) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          {showTimeConstraints && (
            <div className="text-sm text-gray-500 mt-2">
              Must be scheduled between {TIME_CONSTRAINTS.MIN_HOUR}:00 and {TIME_CONSTRAINTS.MAX_HOUR}:00.
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BaseModal 