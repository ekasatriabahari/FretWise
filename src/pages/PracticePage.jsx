import { useCallback, useState } from 'react'
import { AudioLines, CircleHelp, Guitar, RotateCcw, Mic, RefreshCw, Square, Radio, Volume2, Target, CheckCircle2, AlertCircle } from 'lucide-react'
import Fretboard from '../components/fretboard/Fretboard'
import { NOTES } from '../utils/guitarTheory'
import { useLanguage } from '../i18n/LanguageContext'
import { usePitchDetection } from '../hooks/usePitchDetection'

const modes = {
  'Minor pentatonic': [0, 3, 5, 7, 10],
  'Major': [0, 2, 4, 5, 7, 9, 11],
  'Dorian': [0, 2, 3, 5, 7, 9, 10],
  'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
}

export default function PracticePage() {
  const { language, t } = useLanguage()
  const [mode, setMode] = useState('Minor pentatonic')
  const [root, setRoot] = useState('A')
  const [selected, setSelected] = useState(null)
  const targetFrequency = 293.665
  const targetCents = frequency ? Math.round(1200 * Math.log2(frequency / targetFrequency)) : null
  const challengeHeard = status === 'listening' && level > 5 && targetCents !== null
  const challengePassed = challengeHeard && Math.abs(targetCents) <= 35
  const playReference = useCallback(async () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      const audioContext = new AudioContextClass()
      await audioContext.resume()
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()
      oscillator.type = 'triangle'
      oscillator.frequency.value = targetFrequency
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.04)
      gain.gain.setValueAtTime(0.16, audioContext.currentTime + 0.65)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1)
      oscillator.connect(gain).connect(audioContext.destination)
      oscillator.onended = () => audioContext.close()
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 1.02)
    } catch { /* Audio output may be unavailable or blocked by the browser. */ }
  }, [])
  const { status, level, devices, selectedDevice, setSelectedDevice, frequency, note, refreshDevices, start, stop } = usePitchDetection()
  const rootIndex = NOTES.indexOf(root)
  const notes = modes[mode].map((interval) => NOTES[(rootIndex + interval) % 12])
  const modeLabels = {
    'Minor pentatonic': 'Minor pentatonic',
    Major: language === 'id' ? 'Mayor' : 'Major',
    Dorian: 'Dorian',
    Mixolydian: 'Mixolydian',
  }
  const statusText = {
    idle: t('audioIdle'),
    requesting: t('audioRequesting'),
    listening: t('audioListening'),
    denied: t('audioDenied'),
    unsupported: t('audioUnsupported'),
    missing: t('audioMissing'),
    error: t('audioError'),
  }
  const centsLabel = !note ? '—' : note.cents === 0 ? t('inTune') : note.cents > 0 ? `+${note.cents} ${t('cents')}` : `${note.cents} ${t('cents')}`
  const isInTune = note && Math.abs(note.cents) <= 5

  return <div className="space-y-7">
    <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Guitar size={15}/>{t('fretboardLab')}</div><h1 className="mt-3 text-3xl font-semibold tracking-tight">{t('practiceTitle')}</h1><p className="mt-2 text-sm text-zinc-500">{t('practiceCopy')}</p></div>

    <section className="panel rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-amber-300"><Radio size={14}/>{t('livePitch')}</div><h2 className="mt-2 text-lg font-semibold">{t('playAndCheck')}</h2><p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">{t('audioInputHelp')}</p></div>
        <span className={`rounded-full border px-3 py-1.5 text-[10px] ${status === 'listening' ? 'border-emerald-400/25 bg-emerald-400/[.06] text-emerald-300' : 'border-white/[.08] text-zinc-500'}`}>{statusText[status]}</span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-white/[.07] bg-white/[.025] p-4">
          <div className="flex items-center justify-between gap-2"><label htmlFor="audio-input" className="text-xs font-medium text-zinc-400">{t('audioInput')}</label><button onClick={refreshDevices} disabled={status === 'requesting'} className="flex items-center gap-1.5 text-[10px] text-amber-300 hover:text-amber-200 disabled:opacity-40"><RefreshCw size={12}/>{t('findDevices')}</button></div>
          <select id="audio-input" value={selectedDevice} onChange={(event) => { stop(); setSelectedDevice(event.target.value) }} disabled={status === 'listening' || devices.length === 0} className="mt-2 w-full rounded-lg border border-white/10 bg-[#11141c] px-3 py-3 text-xs text-zinc-200 outline-none focus:border-amber-400/50 disabled:opacity-60">
            {devices.length === 0 ? <option value="">{t('findDevicesFirst')}</option> : devices.map((device, index) => <option key={device.deviceId || index} value={device.deviceId}>{device.label || `${t('audioInput')} ${index + 1}`}</option>)}
          </select>
          <div className="mt-3 flex flex-wrap gap-2">
            {status === 'listening'
              ? <button onClick={stop} className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/[.06] px-3 py-2.5 text-xs font-semibold text-red-300"><Square size={12}/>{t('stopListening')}</button>
              : <button onClick={start} disabled={status === 'requesting'} className="flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a] hover:bg-amber-300 disabled:opacity-50"><Mic size={13}/>{t('startListening')}</button>}
          </div>
          <p className="mt-3 text-[10px] leading-5 text-zinc-600">{t('usbTip')}</p>
        </div>

        <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-white/[.07] bg-[#0b0d13] p-4 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-600">{t('detectedNote')}</div>
          <div className={`mt-1 text-6xl font-semibold tabular-nums ${note ? isInTune ? 'text-emerald-300' : 'text-amber-300' : 'text-zinc-700'}`}>{note ? note.name : '—'}</div>
          <div className="mt-1 text-xs text-zinc-500">{note ? ` ${note.octave} · ${frequency?.toFixed(1)} Hz` : t('playSingleNote')}</div>
          <div className="mt-4 w-full max-w-xs">
            <div className="relative h-1.5 rounded-full bg-white/10"><div className="absolute left-1/2 top-[-4px] h-3.5 w-px bg-zinc-500"/>{note && <div className="absolute top-[-3px] h-3 w-1 rounded-full bg-amber-300 transition-all" style={{ left: `${Math.max(2, Math.min(98, 50 + note.cents / 2))}%` }}/>}</div>
            <div className={`mt-2 text-[10px] font-medium ${isInTune ? 'text-emerald-300' : 'text-zinc-500'}`}>{centsLabel}</div>
          </div>
          <div className="mt-3 h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${level}%` }}/></div>
        </div>
      </div>
    </section>

    <section className="panel rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-amber-300"><Target size={14}/>{t('noteChallenge')}</div>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div><h2 className="text-lg font-semibold">{t('findAndPlayTarget')}</h2><p className="mt-1 text-xs leading-5 text-zinc-500">{t('targetChallengeCopy')}</p></div>
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/[.06] px-4 py-3 text-center"><div className="text-[10px] uppercase tracking-wider text-zinc-500">{t('targetNote')}</div><div className="mt-1 text-3xl font-semibold text-amber-300">D4</div><div className="text-[10px] text-zinc-500">{t('secondString')} · {t('thirdFret')}</div></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={playReference} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs font-medium text-zinc-200 hover:border-amber-300/40"><Volume2 size={14}/>{t('playReference')}</button>
        {status !== 'listening' && <button onClick={start} disabled={status === 'requesting'} className="flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-2.5 text-xs font-semibold text-[#17130a] hover:bg-amber-300 disabled:opacity-50"><Mic size={13}/>{t('startChallenge')}</button>}
        {status === 'listening' && <button onClick={stop} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs text-zinc-300 hover:text-white"><Square size={12}/>{t('stopListening')}</button>}
      </div>
      <div className={`mt-4 flex items-center gap-3 rounded-xl border p-3 ${challengePassed ? 'border-emerald-400/25 bg-emerald-400/[.06]' : challengeHeard ? 'border-amber-400/20 bg-amber-400/[.04]' : 'border-white/[.07] bg-white/[.02]'}`}>
        {challengePassed ? <CheckCircle2 className="shrink-0 text-emerald-300" size={19}/> : <AlertCircle className="shrink-0 text-zinc-500" size={19}/>}
        <div className="min-w-0"><div className={`text-sm font-semibold ${challengePassed ? 'text-emerald-300' : 'text-zinc-200'}`}>{challengePassed ? t('targetCorrect') : challengeHeard ? targetCents > 0 ? t('targetTooSharp') : t('targetTooFlat') : t('waitingForTarget')}</div><div className="mt-0.5 text-[11px] text-zinc-500">{challengeHeard ? `${targetCents > 0 ? '+' : ''}${targetCents} ${t('centsFromTarget')}` : t('targetInstruction')}</div></div>
      </div>
    </section>

    <div className="panel rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-2 text-xs text-zinc-500">{t('scaleMode')}<select value={mode} onChange={(e) => { setMode(e.target.value); setSelected(null) }} className="min-w-48 rounded-lg border border-white/10 bg-[#11141c] px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-amber-400/50">{Object.keys(modes).map((name) => <option key={name} value={name}>{modeLabels[name]}</option>)}</select></label>
        <label className="flex flex-col gap-2 text-xs text-zinc-500">{t('root')}<select value={root} onChange={(e) => { setRoot(e.target.value); setSelected(null) }} className="rounded-lg border border-white/10 bg-[#11141c] px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-amber-400/50">{NOTES.map((name) => <option key={name}>{name}</option>)}</select></label>
        <button onClick={() => { setSelected(null); setMode('Minor pentatonic'); setRoot('A') }} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs text-zinc-400 hover:text-white"><RotateCcw size={13}/>{t('reset')}</button>
      </div>
      <Fretboard frets={24} highlightedNotes={notes} rootNote={root} onNoteSelect={setSelected} ariaLabel={language === 'id' ? 'Fretboard gitar interaktif, 24 fret' : 'Interactive guitar fretboard, 24 frets'}/>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-zinc-500"><span><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-amber-400"/>{t('root')}</span><span><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-blue-400"/>{t('scaleTone')}</span><span className="ml-auto">{root} {modeLabels[mode]} · {notes.join(' · ')}</span></div>
      {selected && <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[.06] p-4"><div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-400 text-lg font-bold text-[#17130a]">{selected.note}</div><div><div className="text-sm font-semibold">{t('string')} {selected.string} · {t('fret')} {selected.fret}</div><div className="mt-1 text-xs text-zinc-500">{selected.note} · {root} {modeLabels[mode]}</div></div></div>}
    </div>
    <div className="grid gap-4 sm:grid-cols-2"><div className="panel rounded-2xl p-5"><AudioLines className="text-blue-300" size={19}/><h3 className="mt-3 font-semibold">{t('listenColor')}</h3><p className="mt-1 text-xs leading-5 text-zinc-500">{t('listenCopy')}</p></div><div className="panel rounded-2xl p-5"><CircleHelp className="text-amber-300" size={19}/><h3 className="mt-3 font-semibold">{t('practicePrompt')}</h3><p className="mt-1 text-xs leading-5 text-zinc-500">{t('practiceCopy2')}</p></div></div>
  </div>
}
