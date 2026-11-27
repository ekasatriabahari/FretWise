import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Sparkles } from 'lucide-react'
import { quizQuestions } from '../../data/quizData'
import { scoreAssessment } from '../../utils/quizScoring'

export default function AssessmentQuiz({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const question = quizQuestions[index]
  const answered = answers[question.id] !== undefined
  const result = scoreAssessment(quizQuestions, answers)
  if (showResult) return (
    <div className="panel rounded-2xl p-7 sm:p-10">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-amber-400/10 text-amber-300"><Sparkles size={26}/></div>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300">Assessment complete</p>
        <div className="mt-3 text-6xl font-semibold tracking-tight">{result.percentage}<span className="text-3xl text-zinc-500">%</span></div>
        <p className="mt-2 text-zinc-400">You got {result.correct} out of {result.total} questions right.</p>
        <div className="mt-8 space-y-3 text-left">{Object.entries(result.pillars).map(([pillar, value]) => <div key={pillar}><div className="mb-1.5 flex justify-between text-xs"><span className="text-zinc-300">{pillar}</span><span className="text-zinc-500">{value.correct}/{value.total}</span></div><div className="h-1.5 rounded-full bg-white/[.07]"><div className="h-full rounded-full bg-amber-400" style={{ width: `${value.percentage}%` }}/></div></div>)}</div>
        <button onClick={() => onComplete(result)} className="mt-8 w-full rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-[#17130a] transition hover:bg-amber-300">Build my learning path <ArrowRight className="ml-2 inline" size={16}/></button>
      </div>
    </div>
  )
  return (
    <div className="panel rounded-2xl p-6 sm:p-9">
      <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[.16em] text-amber-300">Skill check · {question.pillar}</span><span className="text-xs tabular-nums text-zinc-500">{index + 1} / {quizQuestions.length}</span></div>
      <div className="mt-4 h-1 rounded-full bg-white/[.07]"><div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }}/></div>
      <h2 className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">{question.title}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">{question.prompt}</p>
      <div className="mt-7 grid gap-3">{question.options.map((option, i) => {
        const selected = answers[question.id] === i
        return <button key={option} onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: i }))} className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${selected ? 'border-amber-400/60 bg-amber-400/[.08] text-amber-100' : 'border-white/[.07] bg-white/[.02] text-zinc-300 hover:border-white/20 hover:bg-white/[.04]'}`}><span className={selected ? 'text-amber-300' : 'text-zinc-600'}>{selected ? <CheckCircle2 size={19}/> : <Circle size={19}/>}</span>{option}</button>
      })}</div>
      <div className="mt-8 flex items-center justify-between border-t border-white/[.06] pt-5">
        <button disabled={index === 0} onClick={() => setIndex((v) => v - 1)} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white disabled:opacity-30"><ArrowLeft size={16}/> Back</button>
        <button disabled={!answered} onClick={() => index === quizQuestions.length - 1 ? setShowResult(true) : setIndex((v) => v + 1)} className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#17130a] hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40">{index === quizQuestions.length - 1 ? 'See results' : 'Next question'} <ArrowRight className="ml-2 inline" size={15}/></button>
      </div>
    </div>
  )
}
