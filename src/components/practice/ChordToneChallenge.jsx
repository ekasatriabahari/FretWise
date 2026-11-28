import { useState } from 'react'
import { CheckCircle2, Headphones, Mic, Music2, RotateCcw, Target } from 'lucide-react'
import Fretboard from '../fretboard/Fretboard'
import { NOTES } from '../../utils/guitarTheory'
import { useLanguage } from '../../i18n/LanguageContext'

const OPEN_MIDI = [64, 59, 55, 50, 45, 40]
const TASKS = [
  { chord: 'Dm7', chordNotes: [50, 53, 57, 60], note: 'F', octave: 3, midi: 53, string: 4, fret: 3, role: '3rd' },
  { chord: 'G7', chordNotes: [43, 47, 50, 53], note: 'B', octave: 3, midi: 59, string: 3, fret: 4, role: '3rd' },
  { chord: 'Dm7', chordNotes: [50, 53, 57, 60], note: 'C', octave: 4, midi: 60, string: 2, fret: 1, role: '7th' },
  { chord: 'G7', chordNotes: [43, 47, 50, 53], note: 'F', octave: 4, midi: 65, string: 1, fret: 1, role: '7th' },
]

function midiFrequency(midi) {
  return 440 * (2 ** ((midi - 69) / 12))
}

function playChordProgression() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return
  const context = new AudioContextClass()
  context.resume().then(() => {
    let lastOscillator = null
    const startAt = context.currentTime + 0.08
    const chordDuration = 1.05
    const gap = 0.12
    const progression = [TASKS[0].chordNotes, TASKS[1].chordNotes, TASKS[0].chordNotes, TASKS[1].chordNotes]
    progression.forEach((chord, index) => {
      const start = startAt + index * (chordDuration + gap)
      chord.forEach((midi) => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = 'triangle'
        oscillator.frequency.value = midiFrequency(midi)
        gain.gain.setValueAtTime(0.0001, start)
        gain.gain.exponentialRampToValueAtTime(0.055, start + 0.035)
        gain.gain.setValueAtTime(0.055, start + chordDuration - 0.08)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + chordDuration)
        oscillator.connect(gain).connect(context.destination)
        oscillator.start(start)
        oscillator.stop(start + chordDuration + 0.02)
        lastOscillator = oscillator
      })
    })
    if (lastOscillator) lastOscillator.onended = () => context.close()
  }).catch(() => context.close())
}

export default function ChordToneChallenge({ frequency, level, status, onStartListening, onStopListening }) {
  const { t, language } = useLanguage()
  const [round, setRound] = useState(0)
  const [stage, setStage] = useState('listen')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [wrong, setWrong] = useState(false)
  const task = TASKS[round]
  const targetCents = frequency && level > 5 ? Math.round(1200 * Math.log2(frequency / midiFrequency(task.midi))) : null
  const pitchCorrect = targetCents !== null && Math.abs(targetCents) <= 35
  const noteName = NOTES[task.midi % 12]
  const targetLabel = `${noteName}${task.octave}`

  const handleSelect = (point) => {
    if (stage !== 'locate') return
    setAttempts((value) => value + 1)
    const midi = OPEN_MIDI[point.string - 1] + point.fret
    if (point.string === task.string && point.fret === task.fret && midi === task.midi) {
      setWrong(false)
      setStage('play')
    } else {
      setWrong(true)
    }
  }

  const next = () => {
    if (round === TASKS.length - 1) {
      setStage('finished')
      onStopListening()
      return
    }
    setRound((value) => value + 1)
    setStage('listen')
    setWrong(false)
    onStopListening()
  }

  const restart = () => {
    setRound(0)
    setScore(0)
    setAttempts(0)
    setWrong(false)
    setStage('listen')
    onStopListening()
  }

  const confirm = () => {
    if (!pitchCorrect || stage !== 'play') return
    setScore((value) => value + 1)
    setStage('passed')
    onStopListening()
  }

  return <section className="panel rounded-2xl p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-amber-300"><Music2 size={14}/>{t('chordToneAssessment')}</div>
        <h2 className="mt-2 text-lg font-semibold">{t('targetChordTones')}</h2>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">{t('chordToneAssessmentCopy')}</p>
      </div>
      <div className="rounded-lg border border-white/[.08] px-3 py-2 text-right"><div className="text-[10px] uppercase tracking-wider text-zinc-500">{t('round')}</div><div className="text-sm font-semibold tabular-nums">{stage === 'finished' ? TASKS.length : round + 1} / {TASKS.length}</div></div>
    </div>

    {stage === 'finished' ? <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[.05] p-5 text-center">
      <CheckCircle2 className="mx-auto text-emerald-300" size={28}/>
      <h3 className="mt-2 text-lg font-semibold">{t('chordToneFinished')}</h3>
      <p className="mt-1 text-sm text-zinc-400">{t('assessmentResult')}: {score} / {TASKS.length}</p>
      <p className="mt-1 text-xs text-zinc-500">{t('attempts')}: {attempts}</p>
      <button onClick={restart} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-xs font-semibold text-[#17130a]"><RotateCcw size={13}/>{t('tryAgain')}</button>
    </div> : <>
      <div className="mt-5 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-xl border border-white/[.07] bg-[#0b0d13] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{t('currentChord')}</div>
          <div className="mt-1 text-4xl font-semibold text-amber-300">{task.chord}</div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-xs text-zinc-500">{t('targetChordTone')}</span>
            <span className="rounded-md bg-blue-400/10 px-2 py-1 text-xs font-semibold text-blue-300">{targetLabel} · {task.role}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-zinc-400">{t('chordToneTaskCopy')}</p>

          {stage === 'listen' && <>
            <button onClick={playChordProgression} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs font-medium text-zinc-200 hover:border-amber-300/40"><Headphones size={14}/>{t('playProgression')}</button>
            <button onClick={() => setStage('locate')} className="mt-3 block w-full rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a]">{t('readyFindTone')}</button>
          </>}
          {stage === 'locate' && <div className="mt-4">
            <p className={wrong ? 'text-xs text-amber-300' : 'text-xs text-zinc-400'}>{wrong ? t('chordToneWrongPosition') : t('chordToneLocatePrompt')}</p>
            <button onClick={playChordProgression} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300"><Headphones size={13}/>{t('replayProgression')}</button>
          </div>}
          {stage === 'play' && <div className="mt-4 border-t border-white/[.07] pt-4">
            <p className="text-xs leading-5 text-zinc-400">{t('playChordTonePrompt')}</p>
            {status === 'listening'
              ? <button onClick={onStopListening} className="mt-3 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300">{t('stopListening')}</button>
              : <button onClick={onStartListening} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a]"><Mic size={13}/>{t('startListening')}</button>}
            <div className="mt-3 rounded-lg bg-white/[.035] p-3 text-xs text-zinc-400">
              {targetCents === null ? t('challengeWaitingPitch') : pitchCorrect ? t('challengePitchCorrect') : targetCents > 0 ? t('challengePitchSharp') : t('challengePitchFlat')}
              {targetCents !== null && <span className="ml-2 tabular-nums">({targetCents > 0 ? '+' : ''}{targetCents} {t('cents')})</span>}
            </div>
            <button onClick={confirm} disabled={!pitchCorrect} className="mt-3 w-full rounded-lg bg-emerald-400 px-3 py-2.5 text-xs font-semibold text-[#07140d] disabled:cursor-not-allowed disabled:opacity-30">{t('confirmNote')}</button>
          </div>}
          {stage === 'passed' && <div className="mt-4 border-t border-white/[.07] pt-4">
            <p className="text-sm font-semibold text-emerald-300">{t('chordToneRoundPassed')}</p>
            <button onClick={next} className="mt-3 w-full rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a]">{round === TASKS.length - 1 ? t('seeResult') : t('nextRound')}</button>
          </div>}
          <div className="mt-4 flex items-center justify-between border-t border-white/[.07] pt-3 text-[10px] text-zinc-500"><span>{t('attempts')}: {attempts}</span><span>{t('score')}: {score}</span></div>
        </div>
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs text-zinc-500"><Target size={13}/>{stage === 'listen' ? t('listenBeforeFind') : stage === 'locate' ? t('selectChordTonePosition') : t('chordTonePositionFound')}</p>
          <Fretboard frets={12} highlightedNotes={[noteName]} rootNote={noteName} onNoteSelect={handleSelect} ariaLabel={language === 'id' ? 'Pilih posisi nada chord pada fretboard' : 'Select chord tone position on the fretboard'}/>
          <p className="mt-2 text-[10px] text-zinc-500">{t('chordToneHint')}</p>
        </div>
      </div>
    </>}
  </section>
}
