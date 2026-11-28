import { useState } from 'react'
import { AudioLines, CircleHelp, Guitar, RotateCcw } from 'lucide-react'
import Fretboard from '../components/fretboard/Fretboard'
import { NOTES } from '../utils/guitarTheory'
import { useLanguage } from '../i18n/LanguageContext'

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
  const rootIndex = NOTES.indexOf(root)
  const notes = modes[mode].map((interval) => NOTES[(rootIndex + interval) % 12])
  const modeLabels = {
    'Minor pentatonic': language === 'id' ? 'Minor pentatonic' : 'Minor pentatonic',
    Major: language === 'id' ? 'Mayor' : 'Major',
    Dorian: 'Dorian',
    Mixolydian: 'Mixolydian',
  }

  return <div className="space-y-7">
    <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Guitar size={15}/>{t('fretboardLab')}</div><h1 className="mt-3 text-3xl font-semibold tracking-tight">{t('practiceTitle')}</h1><p className="mt-2 text-sm text-zinc-500">{t('practiceCopy')}</p></div>
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
