import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, Check, Ear, Eye, Lightbulb, Music2, Play, RotateCcw, Sparkles, Target } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { chordToneLesson, lessonStages } from '../data/lessonData'

const icons = { understand: Lightbulb, visualize: Eye, hear: Ear, play: Play, create: Music2 }
const STORAGE_KEY = 'fretwise.lesson.chord-tone.v1'

export default function LearnPage({ onNavigate }) {
  const { language, t } = useLanguage()
  const [activeStage, setActiveStage] = useState('understand')
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const stage = chordToneLesson.stages[activeStage]
  const stageIndex = lessonStages.findIndex((item) => item.id === activeStage)
  const isComplete = completed.length === lessonStages.length

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)) } catch { /* storage optional */ }
  }, [completed])

  const markStageComplete = () => {
    const nextCompleted = completed.includes(activeStage) ? completed : [...completed, activeStage]
    setCompleted(nextCompleted)
    if (stageIndex < lessonStages.length - 1) setActiveStage(lessonStages[stageIndex + 1].id)
  }

  const resetLesson = () => {
    setCompleted([])
    setActiveStage('understand')
  }

  const stageLabels = {
    understand: t('understand'),
    visualize: t('visualize'),
    hear: t('hear'),
    play: t('play'),
    create: t('create'),
  }

  return <div className="mx-auto max-w-5xl space-y-7">
    <header>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Sparkles size={14}/>{t('learnEyebrow')}</div>
      <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{t('learnTitle')}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">{t('learnIntro')}</p>
    </header>

    <section className="panel rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div><div className="text-xs font-semibold uppercase tracking-[.16em] text-zinc-500">{t('method')}</div><h2 className="mt-1 text-lg font-semibold">{t('lessonProgress')}</h2></div>
        <div className="text-sm tabular-nums text-amber-300">{completed.length}/{lessonStages.length} {language === 'id' ? 'tahap selesai' : 'stages complete'}</div>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/[.07]"><div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${(completed.length / lessonStages.length) * 100}%` }}/></div>
      <div className="grid gap-2 sm:grid-cols-5">
        {lessonStages.map((item, index) => {
          const Icon = icons[item.id]
          const done = completed.includes(item.id)
          const active = activeStage === item.id
          const descriptions = {
            understand: t('understandCopy'),
            visualize: t('visualizeCopy'),
            hear: t('hearCopy'),
            play: t('playCopy'),
            create: t('createCopy'),
          }
          return <button key={item.id} onClick={() => setActiveStage(item.id)} className={`rounded-xl border p-3 text-left transition ${active ? 'border-amber-400/50 bg-amber-400/[.08]' : done ? 'border-emerald-400/20 bg-emerald-400/[.04]' : 'border-white/[.07] bg-white/[.02] hover:bg-white/[.05]'}`}>
            <div className="flex items-center justify-between"><span className="text-[10px] text-zinc-600">0{index + 1}</span>{done ? <Check size={14} className="text-emerald-400"/> : <Icon size={15} className={active ? 'text-amber-300' : 'text-zinc-500'}/>}</div>
            <div className={`mt-3 text-sm font-semibold ${active ? 'text-amber-200' : 'text-zinc-200'}`}>{stageLabels[item.id]}</div>
            <p className="mt-1 hidden text-[10px] leading-4 text-zinc-500 sm:block">{descriptions[item.id]}</p>
            <div className="mt-2 text-[10px] text-zinc-600">{item.duration.replace('min', language === 'id' ? 'menit' : 'min')}</div>
          </button>
        })}
      </div>
    </section>

    <section className="panel overflow-hidden rounded-2xl">
      <div className="border-b border-white/[.06] bg-white/[.02] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-amber-300"><BookOpen size={14}/>{t('sampleLesson')}</div><span className="rounded-full border border-white/[.08] px-3 py-1 text-[10px] text-zinc-500">{language === 'id' ? 'Menengah' : 'Intermediate'} · {language === 'id' ? '20 menit' : '20 min'}</span></div>
        <h2 className="mt-3 text-2xl font-semibold">{chordToneLesson.title[language]}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{t('lessonIntro')}</p>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[.04] p-4"><Target size={17} className="mt-0.5 shrink-0 text-amber-300"/><div><div className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">{t('lessonGoal')}</div><p className="mt-1 text-sm text-zinc-300">{chordToneLesson.goal[language]}</p></div></div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-zinc-500">{t('step')} {stageIndex + 1} / 5 <span className="text-zinc-700">·</span>{stageLabels[activeStage]}</div>
        <h3 className="text-xl font-semibold">{stage.title[language]}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">{stage.body[language]}</p>
        <div className="mt-5 rounded-xl border border-white/[.07] bg-white/[.025] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[.15em] text-zinc-500">{language === 'id' ? 'Tugas tahap ini' : 'Your task'}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{stage.task[language]}</p>
        </div>
        {activeStage === 'visualize' && <button onClick={() => onNavigate('practice')} className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200">{language === 'id' ? 'Buka peta fretboard' : 'Open fretboard lab'} <ArrowRight size={14}/></button>}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/[.06] pt-5">
          <button onClick={() => setActiveStage(lessonStages[Math.max(0, stageIndex - 1)].id)} disabled={stageIndex === 0} className="text-sm text-zinc-500 hover:text-white disabled:opacity-30">{language === 'id' ? 'Tahap sebelumnya' : 'Previous stage'}</button>
          <div className="flex flex-wrap gap-2">
            <button onClick={resetLesson} className="flex items-center gap-2 rounded-xl border border-white/[.08] px-3 py-2.5 text-xs text-zinc-400 hover:text-white"><RotateCcw size={13}/>{language === 'id' ? 'Ulangi materi' : 'Reset lesson'}</button>
            <button onClick={markStageComplete} disabled={completed.includes(activeStage)} className="rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-semibold text-[#17130a] hover:bg-amber-300 disabled:cursor-default disabled:bg-emerald-400/15 disabled:text-emerald-300">{completed.includes(activeStage) ? t('completed') : stageIndex === lessonStages.length - 1 ? t('markComplete') : language === 'id' ? 'Selesaikan tahap' : 'Complete stage'} <Check className="ml-1 inline" size={14}/></button>
          </div>
        </div>
        {isComplete && <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[.05] p-4 text-sm text-emerald-200">{t('completed')}! {language === 'id' ? 'Sekarang gunakan ide ini dalam improvisasi bebas.' : 'Now use this idea in a free improvisation.'}</div>}
      </div>
    </section>

    <p className="text-xs leading-6 text-zinc-600">{t('methodNote')}</p>
  </div>
}
