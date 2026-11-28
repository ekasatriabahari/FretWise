const STORAGE_KEY = 'fretwise.practiceHistory.v1'
const MAX_HISTORY = 50

export function readPracticeHistory() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

export function savePracticeResult(result) {
  const history = readPracticeHistory()
  const next = [{ ...result, completedAt: new Date().toISOString() }, ...history].slice(0, MAX_HISTORY)
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* Storage may be unavailable. */ }
  return next
}
