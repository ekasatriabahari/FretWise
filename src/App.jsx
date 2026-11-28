import { useState } from 'react'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import AssessmentPage from './pages/AssessmentPage'
import CurriculumPage from './pages/CurriculumPage'
import PracticePage from './pages/PracticePage'
import { readAssessmentHistory, saveAssessmentResult } from './utils/assessmentStorage'

export default function App() {
  const [page, setPage] = useState('home')
  const [assessmentHistory, setAssessmentHistory] = useState(() => readAssessmentHistory())
  const assessmentResult = assessmentHistory[0] ?? null

  const navigate = (next) => setPage(next)

  const completeAssessment = (result) => {
    const savedResult = { ...result, completedAt: new Date().toISOString() }
    setAssessmentHistory(saveAssessmentResult(savedResult))
    setPage('curriculum')
  }

  return (
    <AppLayout page={page} onNavigate={navigate}>
      {page === 'home' && <HomePage onNavigate={navigate} assessmentResult={assessmentResult} assessmentHistory={assessmentHistory} />}
      {page === 'assessment' && <AssessmentPage onComplete={completeAssessment} onNavigate={navigate} />}
      {page === 'curriculum' && <CurriculumPage assessmentResult={assessmentResult} />}
      {page === 'practice' && <PracticePage />}
    </AppLayout>
  )
}
