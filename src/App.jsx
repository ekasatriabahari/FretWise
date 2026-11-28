import { useState } from 'react'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import AssessmentPage from './pages/AssessmentPage'
import CurriculumPage from './pages/CurriculumPage'
import PracticePage from './pages/PracticePage'
import LearnPage from './pages/LearnPage'
import { LanguageProvider } from './i18n/LanguageContext'
import { readAssessmentHistory, saveAssessmentResult } from './utils/assessmentStorage'
import { readPracticeHistory, savePracticeResult } from './utils/practiceStorage'

function FretWiseApp() {
  const [page, setPage] = useState('home')
  const [assessmentHistory, setAssessmentHistory] = useState(() => readAssessmentHistory())
  const [practiceHistory, setPracticeHistory] = useState(() => readPracticeHistory())
  const assessmentResult = assessmentHistory[0] ?? null

  const completePractice = (result) => {
    setPracticeHistory(savePracticeResult(result))
  }

  const completeAssessment = (result) => {
    const savedResult = { ...result, completedAt: new Date().toISOString() }
    setAssessmentHistory(saveAssessmentResult(savedResult))
    setPage('curriculum')
  }

  return (
    <AppLayout page={page} onNavigate={setPage}>
      {page === 'home' && <HomePage onNavigate={setPage} assessmentResult={assessmentResult} assessmentHistory={assessmentHistory} practiceHistory={practiceHistory} />}
      {page === 'assessment' && <AssessmentPage onComplete={completeAssessment} onNavigate={setPage} />}
      {page === 'curriculum' && <CurriculumPage assessmentResult={assessmentResult} />}
      {page === 'practice' && <PracticePage onPracticeComplete={completePractice} />}
      {page === 'learn' && <LearnPage onNavigate={setPage} />}
    </AppLayout>
  )
}

export default function App() {
  return <LanguageProvider><FretWiseApp /></LanguageProvider>
}
