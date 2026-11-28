const EXERCISES = {
  'note-location': { skill: 'fretboard', title: 'Fretboard navigation', titleId: 'Navigasi fretboard', focus: 'Build faster note recognition across strings and positions.', focusId: 'Perkuat pengenalan nada di berbagai senar dan posisi.', action: 'Repeat the five-round note-location challenge. Say the note name before selecting its position.', actionId: 'Ulangi tantangan pencarian posisi nada. Sebutkan nama nadanya sebelum memilih posisi.' },
  'chord-tone': { skill: 'chordTones', title: 'Chord-tone awareness', titleId: 'Pemahaman nada chord', focus: 'Practice hearing and targeting chord tones as harmony changes.', focusId: 'Latih pendengaran dan penentuan nada chord saat harmoni berubah.', action: 'Repeat the Dm7–G7 chord-tone challenge. Sing each target before playing it.', actionId: 'Ulangi tantangan nada chord Dm7–G7. Nyanyikan setiap nada target sebelum memainkannya.' },
  'ear-training': { skill: 'ear', title: 'Interval recognition', titleId: 'Pengenalan interval', focus: 'Strengthen your ability to recognize the distance between two notes.', focusId: 'Perkuat kemampuan mengenali jarak antara dua nada.', action: 'Replay the interval examples, then complete another five-round listening session.', actionId: 'Dengarkan ulang contoh interval, lalu selesaikan sesi pendengaran lima putaran.' },
}

export function analyzeLearningProgress(history = [], language = 'en') {
  const groups = Object.entries(EXERCISES).map(([type, meta]) => {
    const sessions = history.filter(item => item.type === type).slice(0, 5)
    const scores = sessions.filter(item => Number(item.total) > 0 && Number.isFinite(Number(item.score)))
    const average = scores.length ? Math.round(scores.reduce((sum, item) => sum + item.score / item.total * 100, 0) / scores.length) : null
    return { type, meta, count: scores.length, average }
  }).filter(item => item.count > 0)

  if (!groups.length) return {
    hasData: false, title: language === 'id' ? 'Mulai latihan untuk membuka rekomendasi' : 'Start practicing to unlock recommendations',
    focus: language === 'id' ? 'Selesaikan latihan posisi nada, nada chord, atau pendengaran interval. FretWise akan menggunakan hasilnya untuk menentukan fokus berikutnya.' : 'Complete a note-location, chord-tone, or ear-training exercise. FretWise will use your results to suggest what to work on next.',
    action: language === 'id' ? 'Mulai latihan pertama' : 'Start your first exercise', type: null,
  }

  groups.sort((a, b) => (a.average ?? 100) - (b.average ?? 100))
  const weakest = groups[0]
  const level = weakest.average < 60 && weakest.count >= 2 ? 'needs-focus' : weakest.average >= 80 && weakest.count >= 3 ? 'strong' : 'developing'
  const title = language === 'id' ? weakest.meta.titleId : weakest.meta.title
  const focus = language === 'id' ? weakest.meta.focusId : weakest.meta.focus
  const action = language === 'id' ? weakest.meta.actionId : weakest.meta.action
  const status = language === 'id'
    ? (level === 'needs-focus' ? 'Perlu perhatian' : level === 'strong' ? 'Konsisten kuat' : 'Sedang berkembang')
    : (level === 'needs-focus' ? 'Needs attention' : level === 'strong' ? 'Consistently strong' : 'Developing')
  const evidence = language === 'id'
    ? `Rata-rata ${weakest.average}% dari ${weakest.count} sesi terakhir untuk latihan ini.`
    : `Average ${weakest.average}% across ${weakest.count} recent sessions for this exercise.`
  return { hasData: true, title, focus, action, status, evidence, type: weakest.type, average: weakest.average, count: weakest.count, level }
}
