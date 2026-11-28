const questions = [
  {
    id: 1, pillar: 'Fretboard connection',
    title: { en: 'Breaking out of the box', id: 'Keluar dari pola box' },
    prompt: { en: 'You are playing A minor pentatonic in the 5th-position box. What is the most useful next step to connect your phrases across the neck?', id: 'Kamu memainkan A minor pentatonic pada pola box posisi ke-5. Langkah apa yang paling berguna agar frase dapat tersambung ke area lain di fretboard?' },
    options: { en: ['Memorize the same box one octave higher only', 'Find the next A, C, and E notes on adjacent strings and connect the positions', 'Play the shape faster until it feels natural', 'Stay on the low three strings'], id: ['Hafalkan box yang sama satu oktaf lebih tinggi saja', 'Temukan nada A, C, dan E berikutnya pada senar berdekatan lalu hubungkan posisinya', 'Mainkan pola tersebut lebih cepat sampai terasa nyaman', 'Tetap bermain hanya pada tiga senar bawah'] },
    answer: 1,
    explanation: { en: 'Connecting the same chord and scale tones across adjacent strings builds a continuous map instead of isolated shapes.', id: 'Menghubungkan nada chord dan scale yang sama pada senar berdekatan membangun peta fretboard yang menyatu, bukan sekadar menghafal bentuk-bentuk terpisah.' },
  },
  {
    id: 2, pillar: 'Chord-tone awareness',
    title: { en: 'Landing on the changes', id: 'Mendarat tepat saat chord berubah' },
    prompt: { en: 'A progression moves from Dm7 to G7. Which target-note pair most clearly outlines the change?', id: 'Sebuah progresi berpindah dari Dm7 ke G7. Pasangan nada tujuan mana yang paling jelas menunjukkan perubahan tersebut?' },
    options: { en: ['F over both chords', 'A over both chords', 'F over Dm7, then B over G7', 'C over both chords'], id: ['F pada kedua chord', 'A pada kedua chord', 'F pada Dm7, lalu B pada G7', 'C pada kedua chord'] },
    answer: 2,
    explanation: { en: 'The 3rd of Dm7 is F; the 3rd of G7 is B. Hearing and targeting those notes makes the harmony audible in your lines.', id: 'Nada ke-3 dari Dm7 adalah F, sedangkan nada ke-3 dari G7 adalah B. Menyasar kedua nada ini membuat perubahan harmoni terdengar jelas dalam permainanmu.' },
  },
  {
    id: 3, pillar: 'Modal understanding',
    title: { en: 'A different kind of major', id: 'Warna mayor yang berbeda' },
    prompt: { en: 'You are improvising over a static D7 vamp and want a bluesy, dominant sound. Which mode is a strong starting point?', id: 'Kamu berimprovisasi di atas chord D7 yang terus berulang dan menginginkan karakter dominan bernuansa blues. Mode mana yang tepat untuk memulai?' },
    options: { en: ['D Dorian', 'D Mixolydian', 'D Aeolian', 'D Locrian'], id: ['D Dorian', 'D Mixolydian', 'D Aeolian', 'D Locrian'] },
    answer: 1,
    explanation: { en: 'Mixolydian contains a major 3rd and flat 7th, the defining color tones of a dominant seventh sound.', id: 'Mixolydian memiliki nada ke-3 mayor dan nada ke-7 minor (♭7), dua karakter penting dari bunyi dominant seventh.' },
  },
  {
    id: 4, pillar: 'Ear & intervals',
    title: { en: 'Hearing resolution', id: 'Mendengar resolusi nada' },
    prompt: { en: 'In the key of C major, which note creates the strongest leading-tone pull toward C?', id: 'Dalam tangga nada C mayor, nada mana yang memiliki tarikan paling kuat untuk kembali menuju C?' },
    options: { en: ['D', 'E', 'F', 'B'], id: ['D', 'E', 'F', 'B'] },
    answer: 3,
    explanation: { en: 'B is a semitone below C. That half-step creates a strong sense of tension that wants to resolve upward.', id: 'B berjarak satu semitone di bawah C. Jarak setengah nada ini menciptakan ketegangan yang kuat dan terasa ingin diselesaikan naik ke C.' },
  },
  {
    id: 5, pillar: 'Chord-tone awareness',
    title: { en: 'Make the melody tell a story', id: 'Buat melodi memiliki arah' },
    prompt: { en: 'Your solo sounds like a scale exercise over a changing chord progression. What should you try first?', id: 'Solo gitarmu terdengar seperti latihan scale di atas progresi chord yang berubah. Apa yang sebaiknya kamu coba terlebih dahulu?' },
    options: { en: ['Add more notes per beat', 'Use one scale shape for the whole progression', 'Aim for a chord tone on strong beats, then connect with nearby notes', 'Avoid rests so the line stays continuous'], id: ['Tambahkan lebih banyak nada pada setiap ketukan', 'Gunakan satu bentuk scale untuk seluruh progresi', 'Sasar nada chord pada ketukan kuat, lalu hubungkan dengan nada di sekitarnya', 'Hindari jeda agar permainan terus berjalan'] },
    answer: 2,
    explanation: { en: 'Strong-beat chord tones establish the harmony. Passing notes and rests help turn those targets into a musical phrase.', id: 'Nada chord pada ketukan kuat memperjelas harmoni. Nada penghubung dan jeda membantu mengubah target nada tersebut menjadi frase musikal.' },
  },
  {
    id: 6, pillar: 'Fretboard connection',
    title: { en: 'Find the same note elsewhere', id: 'Temukan nada yang sama di posisi lain' },
    prompt: { en: 'In standard tuning, where can you find another A note on the D string?', id: 'Dengan tuning standar, di fret berapa kamu dapat menemukan nada A pada senar D?' },
    options: { en: ['Open string', '2nd fret', '5th fret', '7th fret'], id: ['Senar terbuka', 'Fret ke-2', 'Fret ke-5', 'Fret ke-7'] },
    answer: 3,
    explanation: { en: 'The D string rises by semitones. Its 7th fret is A, giving you another nearby landmark for connecting positions.', id: 'Nada pada senar D naik satu semitone setiap fret. Fret ke-7 adalah A, salah satu penanda penting untuk menghubungkan posisi.' },
  },
  {
    id: 7, pillar: 'Modal understanding',
    title: { en: 'Spot the Dorian color', id: 'Kenali karakter Dorian' },
    prompt: { en: 'What note most clearly separates D Dorian from D natural minor (D Aeolian)?', id: 'Nada apa yang paling jelas membedakan D Dorian dari D natural minor (D Aeolian)?' },
    options: { en: ['F', 'G', 'A', 'B natural'], id: ['F', 'G', 'A', 'B natural'] },
    answer: 3,
    explanation: { en: 'D Dorian has a natural 6th (B), while D Aeolian has a flat 6th (B♭). Hearing this note reveals the modal color.', id: 'D Dorian memiliki nada ke-6 natural (B), sedangkan D Aeolian memiliki nada ke-6 flat (B♭). Perbedaan ini memberi karakter khas pada mode tersebut.' },
  },
  {
    id: 8, pillar: 'Ear & intervals',
    title: { en: 'Recognize a familiar interval', id: 'Kenali jarak antar nada' },
    prompt: { en: 'You play C, then E. What is the interval between those notes?', id: 'Kamu memainkan nada C, lalu E. Apa nama jarak interval antara kedua nada tersebut?' },
    options: { en: ['Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th'], id: ['Minor 3rd (terts kecil)', 'Major 3rd (terts besar)', 'Perfect 4th (kwart murni)', 'Perfect 5th (kwint murni)'] },
    answer: 1,
    explanation: { en: 'C to E spans four semitones: a major 3rd. Singing this sound helps connect interval recognition to fretboard movement.', id: 'Jarak C ke E adalah empat semitone, yaitu major 3rd (terts besar). Menyanyikan bunyi interval ini membantu menghubungkan pendengaran dengan posisi nada di fretboard.' },
  },
]

export function getQuizQuestions(language = 'en') {
  return questions.map((question) => ({
    ...question,
    title: question.title[language],
    prompt: question.prompt[language],
    options: question.options[language],
    explanation: question.explanation[language],
  }))
}
