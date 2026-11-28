import { useState } from 'react'
import { CheckCircle2, Headphones, Music2, RotateCcw } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const INTERVALS = [
  { semitones: 2, name: 'Major 2nd', id: 'major2', notes: 'C–D' },
  { semitones: 3, name: 'Minor 3rd', id: 'minor3', notes: 'C–Eb' },
  { semitones: 4, name: 'Major 3rd', id: 'major3', notes: 'C–E' },
  { semitones: 5, name: 'Perfect 4th', id: 'perfect4', notes: 'C–F' },
  { semitones: 7, name: 'Perfect 5th', id: 'perfect5', notes: 'C–G' },
  { semitones: 12, name: 'Octave', id: 'octave', notes: 'C–C' },
]

function makeRounds() {
  return [...INTERVALS].sort(() => Math.random() - 0.5).slice(0, 5)
}

function playInterval(semitones) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return
  const context = new AudioContextClass()
  context.resume().then(() => {
    const start = context.currentTime + 0.08
    const notes = [60, 60 + semitones]
    notes.forEach((midi, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const noteStart = start + index * 0.82
      oscillator.type = 'sine'
      oscillator.frequency.value = 440 * (2 ** ((midi - 69) / 12))
      gain.gain.setValueAtTime(0.0001, noteStart)
      gain.gain.exponentialRampToValueAtTime(0.18, noteStart + 0.025)
      gain.gain.setValueAtTime(0.18, noteStart + 0.48)
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.58)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(noteStart)
      oscillator.stop(noteStart + 0.6)
      if (index === 1) oscillator.onended = () => context.close()
    })
  }).catch(() => context.close())
}

export default function EarTrainingChallenge() {
  const { t, language } = useLanguage()
  const [rounds, setRounds] = useState(makeRounds)
  const [round, setRound] = useState(0)
  const [stage, setStage] = useState('listen')
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const task = rounds[round]
  const currentNumber = round + 1

  const answer = (interval) => {
    if (stage !== 'listen') return
    setSelected(interval.id)
    if (interval.id === task.id) setScore((value) => value + 1)
    setStage('answered')
  }

  const next = () => {
    if (round === rounds.length - 1) {
      setStage('finished')
      return
    }
    setRound((value) => value + 1)
    setSelected(null)
    setStage('listen')
  }

  const restart = () => {
    setRounds(makeRounds())
    setRound(0)
    setScore(0)
    setSelected(null)
    setStage('listen')
  }

  const label = (interval) => language === 'id' ? t(interval.id) : interval.name
  const isCorrect = selected === task.id

  return <section className="panel rounded-2xl p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-amber-300"><Headphones size={14}/>{t('earTraining')}</div>
        <h2 className="mt-2 text-lg font-semibold">{t('identifyInterval')}</h2>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">{t('earTrainingCopy')}</p>
      </div>
      <div className="rounded-lg border border-white/[.08] px-3 py-2 text-right"><div className="text-[10px] uppercase tracking-wider text-zinc-500">{t('round')}</div><div className="text-sm font-semibold tabular-nums">{stage === 'finished' ? rounds.length : currentNumber} / {rounds.length}</div></div>
    </div>

    {stage === 'finished' ? <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[.05] p-5 text-center">
      <CheckCircle2 className="mx-auto text-emerald-300" size={28}/>
      <h3 className="mt-2 text-lg font-semibold">{t('earTrainingFinished')}</h3>
      <p className="mt-1 text-sm text-zinc-400">{t('assessmentResult')}: {score} / {rounds.length}</p>
      <button onClick={restart} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-xs font-semibold text-[#17130a]"><RotateCcw size={13}/>{t('tryAgain')}</button>
    </div> : <>
      <div className="mt-5 rounded-xl border border-white/[.07] bg-[#0b0d13] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{t('listenCarefully')}</div><div className="mt-1 text-sm text-zinc-300">{t('twoNotesAscending')}</div></div>
          <button onClick={() => playInterval(task.semitones)} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs font-medium text-zinc-200 hover:border-amber-300/40"><Music2 size={14}/>{t('playInterval')}</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[t('firstNote'), t('secondNote')].map((item, index) => <div key={item} className="rounded-lg bg-white/[.035] p-3 text-center"><div className="text-[10px] text-zinc-500">{item}</div><div className="mt-1 text-2xl font-semibold text-amber-300">{index === 0 ? '♪' : '♫'}</div></div>)}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-3 text-xs font-medium text-zinc-400">{t('chooseInterval')}</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {INTERVALS.map((interval) => {
            const chosen = selected === interval.id
            const correct = interval.id === task.id
            const style = stage === 'answered' && correct
              ? 'border-emerald-400/40 bg-emerald-400/[.07] text-emerald-300'
              : stage === 'answered' && chosen
                ? 'border-red-400/30 bg-red-400/[.05] text-red-300'
                : 'border-white/[.08] bg-white/[.025] text-zinc-300 hover:border-amber-300/30'
            return <button key={interval.id} disabled={stage !== 'listen'} onClick={() => answer(interval)} className={`rounded-lg border px-3 py-3 text-left text-xs font-medium transition-colors disabled:cursor-default ${style}`}>
              <span className="block">{label(interval)}</span>
              <span className="mt-1 block text-[10px] opacity-60">{interval.semitones} {t('semitones')}</span>
            </button>
          })}
        </div>
      </div>

      {stage === 'answered' && <div className={`mt-4 rounded-xl border p-4 ${isCorrect ? 'border-emerald-400/25 bg-emerald-400/[.05]' : 'border-amber-400/20 bg-amber-400/[.04]'}`}>
        <div className={`text-sm font-semibold ${isCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>{isCorrect ? t('intervalCorrect') : t('intervalNotQuite')}</div>
        <p className="mt-1 text-xs leading-5 text-zinc-400">{t('correctIntervalIs')} <strong className="text-zinc-200">{label(task)}</strong> · {task.semitones} {t('semitones')}. {t('intervalExplanation')}</p>
        <button onClick={next} className="mt-3 w-full rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a]">{round === rounds.length - 1 ? t('seeResult') : t('nextRound')}</button>
      </div>}
    </>}
  </section>
}
