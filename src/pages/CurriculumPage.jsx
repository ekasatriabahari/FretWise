import { useState } from 'react'
import { Check, ChevronDown, Clock3, LockKeyhole, PlayCircle, Sparkles, Target, Lightbulb } from 'lucide-react'
import { curriculumWeeks } from '../data/curriculumData'
import { getAssessmentInsights } from '../utils/assessmentInsights'

const PILLAR_WEEK = {
  'Fretboard connection': '01',
  'Chord-tone awareness': '02',
  'Modal understanding': '03',
  'Ear & intervals': '04',
}

export default function CurriculumPage({ assessmentResult }) {
  const [expanded, setExpanded] = useState('01')
  const insights = assessmentResult?.pillars ? getAssessmentInsights(assessmentResult.pillars) : null
  const priorityWeek = insights?.weakest ? PILLAR_WEEK[insights.weakest.key] : null

  return <div className="space-y-7">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Sparkles size={14}/> Your learning path</div><h1 className="mt-3 text-3xl font-semibold tracking-tight">Four weeks to a more connected sound.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">A progressive plan that moves from fretboard navigation to musical expression. Your assessment helps decide where to put extra attention.</p></div><div className="rounded-xl border border-white/[.07] bg-white/[.03] px-4 py-3"><div className="text-[10px] uppercase tracking-wider text-zinc-600">Latest assessment</div><div className="mt-1 text-lg font-semibold">{assessmentResult ? `${assessmentResult.percentage}%` : 'Not taken'}</div></div></div>

    {insights?.weakest && <section className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[.07] to-transparent p-5 sm:p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-amber-300"><Target size={14}/> Your priority focus</div>
      <div className="mt-3 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div><h2 className="text-xl font-semibold">{insights.weakest.label}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{insights.weakest.focus}</p><div className="mt-4 flex items-start gap-2 rounded-xl bg-black/20 p-3"><Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-300"/><p className="text-xs leading-5 text-zinc-300">{insights.weakest.exercise}</p></div></div>
        <div className="rounded-xl border border-white/[.07] bg-black/20 px-4 py-3 md:min-w-36"><div className="text-[10px] uppercase tracking-wider text-zinc-600">Assessment score</div><div className="mt-1 text-2xl font-semibold tabular-nums">{insights.weakest.percentage}%</div><div className="mt-1 text-[10px] text-zinc-500">Week {priorityWeek ?? '—'} gets extra focus</div></div>
      </div>
    </section>}

    <div className="grid gap-4 sm:grid-cols-2">{curriculumWeeks.map((week, i) => {
      const isPriority = priorityWeek === week.week
      return <section key={week.week} className={`panel rounded-2xl p-5 ${isPriority ? 'border-amber-400/40 ring-1 ring-amber-400/10' : i === 0 ? 'border-amber-400/20' : ''}`}>
        <button onClick={() => setExpanded(expanded === week.week ? '' : week.week)} className="flex w-full items-start gap-4 text-left"><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-semibold ${isPriority || i === 0 ? 'bg-amber-400 text-[#17130a]' : 'bg-white/[.06] text-zinc-400'}`}>W{week.week}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] uppercase tracking-[.16em] text-zinc-600">{week.focus}</span>{isPriority && <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-300">Priority</span>}</div><h2 className="mt-1 font-semibold">{week.title}</h2><p className="mt-1 text-xs text-zinc-500">{week.subtitle}</p></div><ChevronDown size={17} className={`mt-1 shrink-0 text-zinc-500 transition ${expanded === week.week ? 'rotate-180' : ''}`}/></button>
        {expanded === week.week && <div className="mt-5 space-y-2 border-t border-white/[.06] pt-4">{week.sessions.map((session) => <div key={session.day} className="flex items-center gap-3 rounded-lg bg-white/[.025] px-3 py-3"><div className="w-9 text-[10px] font-semibold text-zinc-600">{session.day}</div><div className="min-w-0 flex-1 text-sm text-zinc-300">{session.name}</div><span className="flex items-center gap-1 text-[10px] text-zinc-600"><Clock3 size={11}/>{session.time}</span><PlayCircle size={16} className="text-zinc-600"/></div>)}</div>}
        {i > 0 && !isPriority && <div className="mt-4 flex items-center gap-1 text-[10px] text-zinc-600"><LockKeyhole size={11}/> Suggested next stage</div>}
      </section>
    })}</div>
    <div className="panel rounded-2xl p-5"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300"><Check size={18}/></div><div><h3 className="text-sm font-semibold">Keep it musical</h3><p className="mt-1 text-xs text-zinc-500">Finish each session by making a short phrase with what you learned.</p></div></div></div>
  </div>
}
