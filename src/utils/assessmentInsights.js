const PILLAR_INSIGHTS = {
  'Fretboard connection': {
    label: { en: 'Fretboard interconnection', id: 'Keterhubungan fretboard' },
    focus: { en: 'Connect scale positions instead of relying on isolated box shapes.', id: 'Hubungkan posisi scale di seluruh leher gitar, jangan hanya mengandalkan pola box yang terpisah.' },
    exercise: { en: 'Choose one note (for example A), find it on all six strings, then connect nearby pentatonic notes across two positions.', id: 'Pilih satu nada (misalnya A), temukan pada keenam senar, lalu hubungkan nada pentatonik terdekat melalui dua posisi.' },
    nextStep: { en: 'One-string routes and octave landmarks', id: 'Jalur satu senar dan penanda oktaf' },
  },
  'Chord-tone awareness': {
    label: { en: 'Chord-tone awareness', id: 'Pemahaman nada chord' },
    focus: { en: 'Make chord changes audible by targeting the 3rd and 7th of each chord.', id: 'Perjelas perpindahan chord dengan menyasar nada ke-3 dan ke-7 dari setiap chord.' },
    exercise: { en: 'Loop Dm7 → G7. Land on F over Dm7, then B over G7. Sing each target before playing it.', id: 'Ulangi Dm7 → G7. Mendarat pada F saat Dm7, lalu B saat G7. Nyanyikan setiap nada tujuan sebelum memainkannya.' },
    nextStep: { en: 'Guide-tone movement and target-note phrases', id: 'Pergerakan guide tone dan frase nada tujuan' },
  },
  'Modal understanding': {
    label: { en: 'Modal understanding', id: 'Pemahaman mode' },
    focus: { en: 'Hear modes through their characteristic notes, not just as scale fingerings.', id: 'Kenali mode melalui nada karakteristiknya, bukan hanya bentuk jari scale.' },
    exercise: { en: 'Compare D Dorian and D Aeolian over the same Dm vamp. Focus on the B natural versus B♭.', id: 'Bandingkan D Dorian dan D Aeolian di atas vamp Dm yang sama. Fokus pada perbedaan B natural dan B♭.' },
    nextStep: { en: 'Modal color-tone comparison', id: 'Perbandingan nada karakteristik mode' },
  },
  'Ear & intervals': {
    label: { en: 'Ear and interval recognition', id: 'Pendengaran dan pengenalan interval' },
    focus: { en: 'Build a stronger connection between the sound you imagine and the note you play.', id: 'Bangun hubungan yang lebih kuat antara nada yang kamu bayangkan dan nada yang kamu mainkan.' },
    exercise: { en: 'Play C, then B, then resolve to C. Sing the notes first and notice the half-step tension.', id: 'Mainkan C, lalu B, kemudian selesaikan ke C. Nyanyikan nadanya terlebih dahulu dan rasakan ketegangan setengah nada.' },
    nextStep: { en: 'Sing-before-playing and tension-resolution drills', id: 'Latihan menyanyi sebelum bermain dan resolusi ketegangan' },
  },
}

export function getAssessmentInsights(pillars = {}, language = 'en') {
  const entries = Object.entries(pillars).map(([key, value]) => {
    const insight = PILLAR_INSIGHTS[key] ?? {
      label: { en: key, id: key },
      focus: { en: 'Build confidence with focused practice.', id: 'Bangun kepercayaan diri melalui latihan yang terarah.' },
      exercise: { en: 'Review the questions you missed and explain the correct answer aloud.', id: 'Pelajari kembali pertanyaan yang belum tepat dan jelaskan jawaban benarnya dengan suara lantang.' },
      nextStep: { en: 'Focused review', id: 'Pengulangan terarah' },
    }
    return {
      key,
      ...value,
      label: insight.label[language],
      focus: insight.focus[language],
      exercise: insight.exercise[language],
      nextStep: insight.nextStep[language],
    }
  })

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
