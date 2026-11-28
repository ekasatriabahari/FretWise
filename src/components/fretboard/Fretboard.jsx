import { useMemo, useState } from 'react'
import { getFretboardNotes, STANDARD_TUNING } from '../../utils/guitarTheory'

const STRING_COLORS = ['#d4a574', '#c6a16c', '#b8a36f', '#a9a9a9', '#9da5b4', '#b9c1cc']
const MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
export default function Fretboard({ frets = 24, tuning = STANDARD_TUNING, highlightedNotes = ['A', 'C', 'D', 'E', 'G'], rootNote = 'A', onNoteSelect, ariaLabel = `Interactive guitar fretboard, ${frets} frets` }) {
  const [selected, setSelected] = useState(null)
  const rows = useMemo(() => getFretboardNotes(tuning, frets), [tuning, frets])
  const width = 1040, left = 48, right = 18, top = 30, bottom = 34
  const fretWidth = (width - left - right) / frets
  const height = 260, stringGap = (height - top - bottom) / (tuning.length - 1)
  const isHighlighted = (note) => highlightedNotes.includes(note)
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-[#0b0d12] p-2">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel} className="min-w-[760px] w-full">
        <defs><linearGradient id="fretwise-wood" x1="0" x2="1"><stop offset="0" stopColor="#33261e"/><stop offset=".5" stopColor="#211b19"/><stop offset="1" stopColor="#30241d"/></linearGradient></defs>
        <rect x={left} y={top - 12} width={width - left - right} height={height - top - bottom + 24} rx="7" fill="url(#fretwise-wood)" stroke="#665044" strokeWidth="1"/>
        {Array.from({ length: frets + 1 }, (_, fret) => <g key={fret}>
          <line x1={left + fret * fretWidth} x2={left + fret * fretWidth} y1={top - 12} y2={height - bottom + 12} stroke={fret === 0 ? '#e4d4c3' : '#82766c'} strokeWidth={fret === 0 ? 5 : fret % 12 === 0 ? 2.2 : 1}/>
          {fret > 0 && <text x={left + (fret - .5) * fretWidth} y={height - 8} fill="#7f756d" fontSize="10" textAnchor="middle">{fret}</text>}
          {MARKERS.includes(fret) && <g fill="#c9b49b" opacity=".65">{(fret === 12 || fret === 24 ? [-.5, .5] : [0]).map((offset) => <circle key={offset} cx={left + (fret - .5) * fretWidth} cy={height / 2 + offset * 25} r="5"/>)}</g>}
        </g>)}
        {rows.map((row, stringIndex) => {
          const y = top + stringIndex * stringGap
          return <g key={row.string}>
            <text x="28" y={y + 4} fill="#a1a1aa" fontSize="12" textAnchor="middle">{tuning[stringIndex]}</text>
            <line x1={left} x2={width - right} y1={y} y2={y} stroke={STRING_COLORS[stringIndex % STRING_COLORS.length]} strokeWidth={1 + (stringIndex / 5) * 1.3} opacity=".9"/>
            {row.notes.map(({ fret, note }) => {
              const active = isHighlighted(note), isRoot = note === rootNote
              const x = fret === 0 ? left - 13 : left + (fret - .5) * fretWidth
              const chosen = selected?.string === tuning.length - stringIndex && selected?.fret === fret
              return <g key={fret} onClick={() => { const point = { string: tuning.length - stringIndex, fret, note }; setSelected(point); onNoteSelect?.(point) }} className="cursor-pointer">
                {chosen && <circle cx={x} cy={y} r="12" fill="none" stroke="#fff" strokeWidth="1.5"/>}
                {active && <circle cx={x} cy={y} r="9.5" fill={isRoot ? '#f59e0b' : '#60a5fa'} stroke={isRoot ? '#fcd34d' : '#93c5fd'} strokeWidth="1"/>}
                {active && <text x={x} y={y + 3.5} textAnchor="middle" fill={isRoot ? '#211506' : '#071321'} fontSize="9" fontWeight="700">{note}</text>}
                {!active && fret === 0 && <circle cx={x} cy={y} r="3" fill="#6b625b"/>}
              </g>
            })}
          </g>
        })}
      </svg>
    </div>
  )
}
