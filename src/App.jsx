import { useState } from 'react'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import AssessmentPage from './pages/AssessmentPage'
import CurriculumPage from './pages/CurriculumPage'
import PracticePage from './pages/PracticePage'

export default function App() {
  const [page, setPage] = useState('home')
  const [assessmentResult, setAssessmentResult] = useState(null)

  const navigate = (next) => setPage(next)
  return (
    <AppLayout page={page} onNavigate={navigate}>
      {page === 'home' && <HomePage onNavigate={navigate} assessmentResult={assessmentResult} />}
      {page === 'assessment' && <AssessmentPage onComplete={(result) => { setAssessmentResult(result); setPage('curriculum') }} onNavigate={navigate} />}
      {page === 'curriculum' && <CurriculumPage assessmentResult={assessmentResult} />}
      {page === 'practice' && <PracticePage />}
    </AppLayout>
  )
}
