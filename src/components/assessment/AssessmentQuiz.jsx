import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Lightbulb, Sparkles, Target, XCircle } from 'lucide-react'
import { quizQuestions } from '../../data/quizData'
import { scoreAssessment } from '../../utils/quizScoring'
import { getAssessmentInsights } from '../../utils/assessmentInsights'

export default function AssessmentQuiz({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const question = quizQuestions[index]
  const answered = answers[question.id] !== undefined
  const result = scoreAssessment(quizQuestions, answers)
  const insights = getAssessmentInsights(result.pillars)

  const restart = () => {
    setIndex(0)
    setAnswers({})
    setShowResult(false)
  }

  if (showResult) return (
    <div className="space-y-5">
      <section className="panel rounded-2xl p-6 sm:p-9">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-amber-400/10 text-amber-300"><Sparkles size={26}/></div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300">Assessment report</p>
          <div className="mt-3 text-6xl font-semibold tracking-tight">{result.percentage}<span className="text-3xl text-zinc-500">%</span></div>
          <p className="mt-2 text-zinc-400">You got {result.correct} out of {result.total} questions right.</p>
          <div className="mt-3 inline-flex rounded-full border border-white/[.08] bg-white/[.03] px-3 py-1 text-xs text-zinc-300">{insights.level}</div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {insights.pillars.map((pillar) => <div key={pillar.key} className="rounded-xl border border-white/[.07] bg-white/[.025] p-4">
            <div className="flex items-center justify-between gap-3"><span className="text-sm font-medium text-zinc-200">{pillar.label}</span><span className="text-sm font-semibold tabular-nums text-amber-300">{pillar.percentage}%</span></div>
            <div className="mt-3 h-1.5 rounded-full bg-white/[.08]"><div className="h-full rounded-full bg-amber-400" style={{ width: `${pillar.percentage}%` }}/></div>
            <p className="mt-2 text-[11px] text-zinc-500">{pillar.correct} of {pillar.total} correct</p>
          </div>)}
        </div>
        {insights.weakest && <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/[.05] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-amber-300"><Target size={14}/> Best place to start</div>
          <h3 className="mt-2 text-lg font-semibold">{insights.weakest.label}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-400">{insights.weakest.focus}</p>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-black/20 p-3"><Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-300"/><p className="text-xs leading-5 text-zinc-300">{insights.weakest.exercise}</p></div>
        </div>}
        {insights.strongest && insights.strongest.key !== insights.weakest?.key && <p className="mt-4 text-xs text-zinc-500">Your strongest area is <span className="font-medium text-zinc-300">{insights.strongest.label}</span>. Keep it sharp while focusing on your next growth area.</p>}
        <button onClick={() => onComplete(result)} className="mt-7 w-full rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-[#17130a] transition hover:bg-amber-300">Build my learning path <ArrowRight className="ml-2 inline" size={16}/></button>
      </section>

      <section className="panel rounded-2xl p-5 sm:p-7">
        <div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[.16em] text-zinc-500">Answer review</p><h3 className="mt-1 text-lg font-semibold">What to take away</h3></div>
        <div className="space-y-3">
          {result.questionReview.map((item, i) => {
            const source = quizQuestions.find((entry) => entry.id === item.id)
            return <div key={item.id} className="rounded-xl border border-white/[.06] bg-white/[.02] p-4">
              <div className="flex items-start gap-3">
                {item.isCorrect ? <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400"/> : <XCircle size={17} className="mt-0.5 shrink-0 text-rose-400"/>}
                <div className="min-w-0 flex-1"><div className="text-[10px] uppercase tracking-wider text-zinc-600">Question {i + 1} · {item.pillar}</div><h4 className="mt-1 text-sm font-medium text-zinc-200">{item.title}</h4>
                  {!item.isCorrect && <p className="mt-2 text-xs text-zinc-500">Correct answer: <span className="text-zinc-300">{source.options[item.correctAnswer]}</span></p>}
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{item.explanation}</p>
                </div>
              </div>
            </div>
          })}
        </div>
        <button onClick={restart} className="mt-5 flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white"><ArrowLeft size={14}/> Retake assessment</button>
      </section>
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
