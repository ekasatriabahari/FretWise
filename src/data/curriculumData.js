const weeks = [
  {
    week: '01',
    title: { en: 'See the whole neck', id: 'Kenali seluruh fretboard' },
    subtitle: { en: 'Connect positions into one map', id: 'Hubungkan berbagai posisi menjadi satu peta' },
    focus: { en: 'Fretboard interconnection', id: 'Keterhubungan fretboard' },
    sessions: [
      { day: 'MON', name: { en: 'Octave landmarks', id: 'Penanda nada oktaf' }, time: '15 min' },
      { day: 'WED', name: { en: 'Pentatonic pathways', id: 'Jalur pentatonik' }, time: '20 min' },
      { day: 'FRI', name: { en: 'One-string melody routes', id: 'Jalur melodi satu senar' }, time: '15 min' },
    ],
  },
  {
    week: '02',
    title: { en: 'Follow the harmony', id: 'Ikuti pergerakan harmoni' },
    subtitle: { en: 'Make chord changes audible', id: 'Perjelas perubahan chord melalui melodi' },
    focus: { en: 'Chord-tone awareness', id: 'Pemahaman nada chord' },
    sessions: [
      { day: 'MON', name: { en: 'Triad tones on 3 strings', id: 'Nada triad pada 3 senar' }, time: '15 min' },
      { day: 'WED', name: { en: 'Guide-tone movement', id: 'Pergerakan guide tone' }, time: '20 min' },
      { day: 'FRI', name: { en: 'Target-note solo study', id: 'Latihan solo dengan nada tujuan' }, time: '20 min' },
    ],
  },
  {
    week: '03',
    title: { en: 'Color your sound', id: 'Warnai karakter permainanmu' },
    subtitle: { en: 'Hear modes as musical moods', id: 'Kenali karakter musikal setiap mode' },
    focus: { en: 'Modal understanding', id: 'Pemahaman mode' },
    sessions: [
      { day: 'MON', name: { en: 'Dorian vs Aeolian', id: 'Dorian dibanding Aeolian' }, time: '15 min' },
      { day: 'WED', name: { en: 'Mixolydian over a vamp', id: 'Mixolydian di atas vamp chord' }, time: '20 min' },
      { day: 'FRI', name: { en: 'Modal phrase building', id: 'Membangun frase modal' }, time: '20 min' },
    ],
  },
  {
    week: '04',
    title: { en: 'Hear it. Play it.', id: 'Dengarkan. Mainkan.' },
    subtitle: { en: 'Turn interval knowledge into instinct', id: 'Ubah pemahaman interval menjadi intuisi' },
    focus: { en: 'Ear & musical application', id: 'Pendengaran dan penerapan musikal' },
    sessions: [
      { day: 'MON', name: { en: 'Sing before you play', id: 'Nyanyikan sebelum dimainkan' }, time: '15 min' },
      { day: 'WED', name: { en: 'Tension and release', id: 'Ketegangan dan resolusi' }, time: '20 min' },
      { day: 'FRI', name: { en: 'Record a 60-second solo', id: 'Rekam solo selama 60 detik' }, time: '25 min' },
    ],
  },
]

export function getCurriculumWeeks(language = 'en') {
  return weeks.map((week) => ({
    ...week,
    title: week.title[language],
    subtitle: week.subtitle[language],
    focus: week.focus[language],
    sessions: week.sessions.map((session) => ({ ...session, name: session.name[language] })),
  }))
}
