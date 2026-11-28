export const lessonStages = [
  { id: 'understand', duration: '3 min' },
  { id: 'visualize', duration: '4 min' },
  { id: 'hear', duration: '3 min' },
  { id: 'play', duration: '5 min' },
  { id: 'create', duration: '5 min' },
]

export const chordToneLesson = {
  id: 'chord-tone-targeting',
  title: { en: 'Make chord changes audible', id: 'Buat perpindahan chord terdengar jelas' },
  goal: { en: 'Land on the 3rd of each chord when the harmony changes.', id: 'Mendarat pada nada ke-3 dari setiap chord saat harmoni berubah.' },
  stages: {
    understand: {
      title: { en: 'Understand the idea', id: 'Pahami konsepnya' },
      body: {
        en: 'The 3rd tells us whether a chord sounds major or minor. Dm7 contains F; G7 contains B. Moving from F to B makes the chord change clear.',
        id: 'Nada ke-3 menentukan apakah chord terdengar mayor atau minor. Dm7 memiliki nada F, sedangkan G7 memiliki nada B. Perpindahan F ke B memperjelas perubahan chord.',
      },
      task: { en: 'Say the target notes aloud: F over Dm7, B over G7.', id: 'Sebutkan nada tujuannya: F pada Dm7, B pada G7.' },
    },
    visualize: {
      title: { en: 'Visualize it on the neck', id: 'Visualisasikan di fretboard' },
      body: {
        en: 'Find F and B in more than one position. Use the fretboard lab to locate each note, then connect the closest pair with a small movement.',
        id: 'Cari nada F dan B di lebih dari satu posisi. Gunakan peta fretboard untuk menemukan masing-masing nada, lalu hubungkan pasangan terdekat dengan perpindahan kecil.',
      },
      task: { en: 'Locate at least two F notes and two B notes on your guitar.', id: 'Temukan setidaknya dua posisi nada F dan dua posisi nada B pada gitarmu.' },
    },
    hear: {
      title: { en: 'Hear the movement', id: 'Dengarkan pergerakannya' },
      body: {
        en: 'Sing F, then B, then resolve to C. Notice how B feels like it wants to rise by a half-step to C.',
        id: 'Nyanyikan F, lalu B, kemudian selesaikan ke C. Rasakan bagaimana nada B seperti ingin naik setengah nada menuju C.',
      },
      task: { en: 'Sing each target before touching the guitar. Check whether the note you imagine matches the note you play.', id: 'Nyanyikan setiap nada tujuan sebelum menyentuh gitar. Periksa apakah nada yang kamu bayangkan sesuai dengan nada yang dimainkan.' },
    },
    play: {
      title: { en: 'Play with intention', id: 'Mainkan dengan tujuan' },
      body: {
        en: 'Loop Dm7 for four beats, then G7 for four beats. Play F on the first chord and B on the second. Keep the rhythm simple and leave space.',
        id: 'Ulangi Dm7 selama empat ketukan, lalu G7 selama empat ketukan. Mainkan F pada chord pertama dan B pada chord kedua. Gunakan ritme sederhana dan beri ruang jeda.',
      },
      task: { en: 'Repeat the progression five times without rushing. Make each target note land on beat one.', id: 'Ulangi progresi lima kali tanpa terburu-buru. Pastikan setiap nada tujuan jatuh pada ketukan pertama.' },
    },
    create: {
      title: { en: 'Create a musical phrase', id: 'Ciptakan frase musikal' },
      body: {
        en: 'Make a two-bar phrase using F and B as landing notes. Add one or two nearby passing notes, vary the rhythm, and finish by resolving to C.',
        id: 'Buat frase dua bar dengan F dan B sebagai nada tujuan. Tambahkan satu atau dua nada penghubung, variasikan ritmenya, lalu akhiri dengan resolusi ke C.',
      },
      task: { en: 'Record or remember your phrase. Can someone hear the chord change even without seeing your hands?', id: 'Rekam atau ingat frase buatanmu. Bisakah orang lain mendengar perubahan chord tanpa melihat jari-jarimu?' },
    },
  },
}
