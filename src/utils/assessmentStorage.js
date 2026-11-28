const STORAGE_KEY = 'fretwise.assessmentHistory.v1'
const MAX_HISTORY = 10

export function readAssessmentHistory() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveAssessmentResult(result) {
  const history = readAssessmentHistory()
  const next = [result, ...history].slice(0, MAX_HISTORY)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Keep the in-memory result usable if browser storage is unavailable.
  }
  return next
}
