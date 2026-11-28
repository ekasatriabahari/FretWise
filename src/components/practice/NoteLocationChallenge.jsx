import { useMemo, useState } from 'react'
import { CheckCircle2, CircleHelp, Mic, RotateCcw, Target } from 'lucide-react'
import Fretboard from '../fretboard/Fretboard'
import { NOTES } from '../../utils/guitarTheory'
import { useLanguage } from '../../i18n/LanguageContext'

const OPEN_MIDI_BY_STRING = [64, 59, 55, 50, 45, 40]

function makeTarget(previous) {
  let target
  do {
    const string = Math.floor(Math.random() * 6) + 1
    const fret = Math.floor(Math.random() * 13)
    const midi = OPEN_MIDI_BY_STRING[string - 1] + fret
    target = {
      string,
      fret,
      note: NOTES[midi % 12],
      octave: Math.floor(midi / 12) - 1,
      frequency: 440 * (2 ** ((midi - 69) / 12)),
    }
  } while (previous && target.string === previous.string && target.fret === previous.fret)
  return target
}

export default function NoteLocationChallenge({ frequency, level, status, onStartListening, onStopListening }) {
  const { language, t } = useLanguage()
  const [target, setTarget] = useState(() => makeTarget(null))
  const [stage, setStage] = useState('locate')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [attempts, setAttempts] = useState(0)
  const [locationCorrect, setLocationCorrect] = useState(false)
  const [locationWrong, setLocationWrong] = useState(false)
  const targetCents = frequency && level > 5 ? Math.round(1200 * Math.log2(frequency / target.frequency)) : null
  const pitchCorrect = targetCents !== null && Math.abs(targetCents) <= 35
  const highlightedNotes = useMemo(() => [target.note], [target.note])

  const handleSelect = (point) => {
    if (stage !== 'locate') return
    setAttempts((value) => value + 1)
    const correct = point.string === target.string && point.fret === target.fret
    setLocationCorrect(correct)
    setLocationWrong(!correct)
    if (correct) setStage('play')
  }

  const nextRound = () => {
    if (round >= 5) {
      setStage('finished')
      return
    }
    setTarget((previous) => makeTarget(previous))
    setRound((value) => value + 1)
    setStage('locate')
    setLocationCorrect(false)
    setLocationWrong(false)
    if (status === 'listening') onStopListening()
  }

  const restart = () => {
    setTarget((previous) => makeTarget(previous))
    setStage('locate')
    setScore(0)
    setRound(1)
    setAttempts(0)
    setLocationCorrect(false)
    setLocationWrong(false)
    if (status === 'listening') onStopListening()
  }

  const completeRound = () => {
    if (!pitchCorrect || stage !== 'play') return
    setScore((value) => value + 1)
    setStage('passed')
    onStopListening()
  }

  const targetLabel = `${target.note}${target.octave}`
  const locationMessage = locationCorrect
    ? t('locationCorrect')
    : locationWrong ? t('locationWrong') : t('locationInstruction')
  const pitchMessage = targetCents === null
    ? t('challengeWaitingPitch')
    : pitchCorrect ? t('challengePitchCorrect')
      : targetCents > 0 ? t('challengePitchSharp') : t('challengePitchFlat')

  return <section className="panel rounded-2xl p-5 sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-amber-300"><Target size={14}/>{t('practicalAssessment')}</div><h2 className="mt-2 text-lg font-semibold">{t('findNoteOnNeck')}</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">{t('practicalAssessmentCopy')}</p></div>
      <div className="rounded-lg border border-white/[.08] px-3 py-2 text-right"><div className="text-[10px] uppercase tracking-wider text-zinc-500">{t('round')}</div><div className="text-sm font-semibold tabular-nums">{Math.min(round, 5)} / 5</div></div>
    </div>

    {stage === 'finished' ? <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[.05] p-5 text-center">
      <CheckCircle2 className="mx-auto text-emerald-300" size={28}/><h3 className="mt-2 text-lg font-semibold">{t('assessmentFinished')}</h3><p className="mt-1 text-sm text-zinc-400">{t('assessmentResult')}: {score} / 5</p><p className="mt-1 text-xs text-zinc-500">{t('attempts')}: {attempts}</p><button onClick={restart} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-xs font-semibold text-[#17130a]"><RotateCcw size={13}/>{t('tryAgain')}</button>
    </div> : <>
      <div className="mt-5 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-xl border border-white/[.07] bg-[#0b0d13] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{t('targetNote')}</div>
          <div className="mt-1 text-4xl font-semibold text-amber-300">{targetLabel}</div>
          <p className="mt-2 text-xs leading-5 text-zinc-400">{t('locateTargetCopy')}</p>
          <div className="mt-4 flex items-center gap-2 text-xs"><span className={locationCorrect ? 'text-emerald-300' : locationWrong ? 'text-amber-300' : 'text-zinc-500'}>{locationMessage}</span></div>
          {stage === 'play' && <div className="mt-4 border-t border-white/[.07] pt-4">
            <p className="text-xs leading-5 text-zinc-400">{t('playTargetOnGuitar')}</p>
            {status === 'listening'
              ? <button onClick={onStopListening} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300">{t('stopListening')}</button>
              : <button onClick={onStartListening} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a]"><Mic size={13}/>{t('startListening')}</button>}
            <div className="mt-3 rounded-lg bg-white/[.035] p-3 text-xs text-zinc-400">{pitchMessage}{targetCents !== null && <span className="ml-2 tabular-nums">({targetCents > 0 ? '+' : ''}{targetCents} {t('cents')})</span>}</div>
            <button onClick={completeRound} disabled={!pitchCorrect} className="mt-3 w-full rounded-lg bg-emerald-400 px-3 py-2.5 text-xs font-semibold text-[#07140d] disabled:cursor-not-allowed disabled:opacity-30">{t('confirmNote')}</button>
          </div>}
          {stage === 'passed' && <div className="mt-4 border-t border-white/[.07] pt-4"><p className="text-sm font-semibold text-emerald-300">{t('roundPassed')}</p><button onClick={nextRound} className="mt-3 w-full rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a]">{round >= 5 ? t('seeResult') : t('nextRound')}</button></div>}
        </div>
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs text-zinc-500"><CircleHelp size={13}/>{stage === 'locate' ? t('clickTargetPosition') : t('targetPositionShown')}</p>
          <Fretboard frets={12} highlightedNotes={highlightedNotes} rootNote={target.note} onNoteSelect={handleSelect} ariaLabel={language === 'id' ? 'Pilih posisi nada pada fretboard' : 'Select a note position on the fretboard'}/>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-zinc-500"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-400"/>{t('targetNote')}</span><span>{t('attempts')}: {attempts}</span><span className="ml-auto">{t('score')}: {score}</span></div>
        </div>
      </div>
    </>}
  </section>
}
