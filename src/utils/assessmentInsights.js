const PILLAR_INSIGHTS = {
  'Fretboard connection': {
    label: 'Fretboard interconnection',
    focus: 'Connect scale positions instead of relying on isolated box shapes.',
    exercise: 'Choose one note (for example A), find it on all six strings, then connect nearby pentatonic notes across two positions.',
    nextStep: 'One-string routes and octave landmarks',
  },
  'Chord-tone awareness': {
    label: 'Chord-tone awareness',
    focus: 'Make chord changes audible by targeting the 3rd and 7th of each chord.',
    exercise: 'Loop Dm7 → G7. Land on F over Dm7, then B over G7. Sing each target before playing it.',
    nextStep: 'Guide-tone movement and target-note phrases',
  },
  'Modal understanding': {
    label: 'Modal understanding',
    focus: 'Hear modes through their characteristic notes, not just as scale fingerings.',
    exercise: 'Compare D Dorian and D Aeolian over the same Dm vamp. Focus on the B natural versus B♭.',
    nextStep: 'Modal color-tone comparison',
  },
  'Ear & intervals': {
    label: 'Ear and interval recognition',
    focus: 'Build a stronger connection between the sound you imagine and the note you play.',
    exercise: 'Play C, then B, then resolve to C. Sing the notes first and notice the half-step tension.',
    nextStep: 'Sing-before-playing and tension-resolution drills',
  },
}

export function getAssessmentInsights(pillars = {}) {
  const entries = Object.entries(pillars).map(([key, value]) => ({
    key,
    ...value,
    ...(PILLAR_INSIGHTS[key] ?? {
      label: key,
      focus: 'Build confidence with focused practice.',
      exercise: 'Review the questions you missed and explain the correct answer aloud.',
      nextStep: 'Focused review',
    }),
  }))

  const weakest = [...entries].sort((a, b) => a.percentage - b.percentage)
  const strongest = [...entries].sort((a, b) => b.percentage - a.percentage)

  return {
    pillars: entries,
    weakest: weakest[0] ?? null,
    strongest: strongest[0] ?? null,
    level: entries.length === 0
      ? 'Not assessed'
      : weakest[0].percentage >= 80
        ? 'Strong foundation'
        : weakest[0].percentage >= 50
          ? 'Developing'
          : 'Needs focused practice',
  }
}
