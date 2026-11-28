import { ArrowLeft, Brain, Clock3 } from 'lucide-react'
import AssessmentQuiz from '../components/assessment/AssessmentQuiz'
import { useLanguage } from '../i18n/LanguageContext'

export default function AssessmentPage({ onComplete, onNavigate }) {
  const { t } = useLanguage()
  return <div className="mx-auto max-w-3xl space-y-6">
    <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white"><ArrowLeft size={14}/>{t('backOverview')}</button>
    <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Brain size={15}/>{t('findBlindSpots')}</div><h1 className="mt-3 text-3xl font-semibold tracking-tight">{t('assessmentTitle')}</h1><p className="mt-2 text-sm leading-6 text-zinc-500">{t('assessmentCopy')}</p><div className="mt-4 flex items-center gap-2 text-xs text-zinc-600"><Clock3 size={13}/>{t('about')} 4 {t('minutes')} <span className="mx-1">·</span> 8 {t('questions')}</div></div>
    <AssessmentQuiz onComplete={onComplete}/>
  </div>
}
