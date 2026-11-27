import { ArrowLeft, Brain, Clock3 } from 'lucide-react'
import AssessmentQuiz from '../components/assessment/AssessmentQuiz'
export default function AssessmentPage({ onComplete, onNavigate }) {
  return <div className="mx-auto max-w-3xl space-y-6">
    <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white"><ArrowLeft size={14}/> Back to overview</button>
    <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Brain size={15}/> Find your blind spots</div><h1 className="mt-3 text-3xl font-semibold tracking-tight">Your guitar skills, mapped.</h1><p className="mt-2 text-sm leading-6 text-zinc-500">Five quick questions across fretboard knowledge, harmony, modes, and ear training. No pressure — this is a starting point, not a grade.</p><div className="mt-4 flex items-center gap-2 text-xs text-zinc-600"><Clock3 size={13}/> About 3 minutes <span className="mx-1">·</span> 5 questions</div></div>
    <AssessmentQuiz onComplete={onComplete}/>
  </div>
}
