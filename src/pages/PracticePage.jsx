import { useState } from 'react'
import { AudioLines, CircleHelp, Guitar, RotateCcw } from 'lucide-react'
import Fretboard from '../components/fretboard/Fretboard'
const scaleNotes = { 'A minor pentatonic': ['A', 'C', 'D', 'E', 'G'], 'C major': ['C', 'D', 'E', 'F', 'G', 'A', 'B'], 'D Dorian': ['D', 'E', 'F', 'G', 'A', 'B', 'C'], 'D Mixolydian': ['D', 'E', 'F#', 'G', 'A', 'B', 'C'] }
export default function PracticePage() {
  const [scale, setScale] = useState('A minor pentatonic')
  const [root, setRoot] = useState('A')
  const [selected, setSelected] = useState(null)
  const notes = scaleNotes[scale]
  return <div className="space-y-7">
    <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-amber-300"><Guitar size={15}/> Fretboard lab</div><h1 className="mt-3 text-3xl font-semibold tracking-tight">See the notes. Hear the connections.</h1><p className="mt-2 text-sm text-zinc-500">Explore scale tones across the neck. Select any highlighted note to inspect its string and fret.</p></div>
    <div className="panel rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end gap-4"><label className="flex flex-col gap-2 text-xs text-zinc-500">Scale / mode<select value={scale} onChange={(e) => { setScale(e.target.value); setSelected(null) }} className="min-w-48 rounded-lg border border-white/10 bg-[#11141c] px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-amber-400/50">{Object.keys(scaleNotes).map((name) => <option key={name}>{name}</option>)}</select></label><label className="flex flex-col gap-2 text-xs text-zinc-500">Root note<select value={root} onChange={(e) => setRoot(e.target.value)} className="rounded-lg border border-white/10 bg-[#11141c] px-3 py-2.5 text-sm text-zinc-200 outline-none focus:border-amber-400/50">{['A','C','D','E','G'].map((name) => <option key={name}>{name}</option>)}</select></label><button onClick={() => setSelected(null)} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs text-zinc-400 hover:text-white"><RotateCcw size={13}/> Reset selection</button></div>
      <Fretboard frets={24} highlightedNotes={notes} rootNote={root} onNoteSelect={setSelected}/>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-zinc-500"><span><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-amber-400"/> Root</span><span><i className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-blue-400"/> Scale tone</span><span className="ml-auto">{notes.join(' · ')}</span></div>
      {selected && <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[.06] p-4"><div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-400 text-lg font-bold text-[#17130a]">{selected.note}</div><div><div className="text-sm font-semibold">String {selected.string} · Fret {selected.fret}</div><div className="mt-1 text-xs text-zinc-500">{selected.note} note in {scale}</div></div></div>}
    </div>
    <div className="grid gap-4 sm:grid-cols-2"><div className="panel rounded-2xl p-5"><AudioLines className="text-blue-300" size={19}/><h3 className="mt-3 font-semibold">Listen for the color</h3><p className="mt-1 text-xs leading-5 text-zinc-500">Compare the 3rd and 7th of each mode. Those color tones are what make one mode feel different from another.</p></div><div className="panel rounded-2xl p-5"><CircleHelp className="text-amber-300" size={19}/><h3 className="mt-3 font-semibold">Practice prompt</h3><p className="mt-1 text-xs leading-5 text-zinc-500">Play a short phrase using only three notes. Move it to a new string set without changing the melody.</p></div></div>
  </div>
}
