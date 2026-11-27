export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E']

export function noteAtFret(openNote, fret) {
  const index = NOTES.indexOf(openNote)
  if (index < 0) return ''
  return NOTES[(index + fret) % 12]
}

export function getFretboardNotes(tuning = STANDARD_TUNING, frets = 24) {
  return tuning.map((openNote, stringIndex) => ({
    string: stringIndex + 1,
    notes: Array.from({ length: frets + 1 }, (_, fret) => ({ fret, note: noteAtFret(openNote, fret) })),
  }))
}
