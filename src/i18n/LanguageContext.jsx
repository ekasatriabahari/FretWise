import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'fretwise.language.v1'

const messages = {
  en: {
    language: 'Language', english: 'English', indonesian: 'Bahasa Indonesia', search: 'Search', notifications: 'Notifications', brandTagline: 'Play beyond the patterns',
    overview: 'Overview', assessment: 'Skill assessment', curriculum: 'My curriculum', practice: 'Fretboard lab', learn: 'Learn',
    workspace: 'Your workspace', findBreakthrough: 'Find your next breakthrough', focusedPractice: 'A little focused practice beats another hour of noodling.', checkSkills: 'Check your skills', prototype: 'Prototype · v0.2',
    home: 'Home', assess: 'Assess', plan: 'Plan',
    workspaceLabel: 'YOUR PERSONAL GUITAR WORKSPACE', heroTitle1: 'Good players practice.', heroTitle2: 'Great players connect.',
    heroDescription: 'Stop collecting scale shapes. Start hearing how notes, chords, and melodies fit together.',
    findNextStep: 'Find my next step', retake: 'Retake skill check', exploreFretboard: 'Explore fretboard',
    practiceStreak: 'Practice streak', days: 'days', momentum: 'Small steps, real momentum', timeWeek: 'Time this week', goal: 'Of your 2 hour weekly goal',
    currentFocus: 'Current focus', basedAssessment: 'Based on your latest assessment', makeChangesAudible: 'Make the changes audible',
    skillLevel: 'Skill level', discover: 'Discover it', latestScore: 'Latest assessment score', takeFirst: 'Take your first skill check',
    interactiveTool: 'Interactive tool', fretboardSnapshot: 'Fretboard snapshot', openLab: 'Open lab', rootNote: 'Root note', scaleTones: 'Scale tones', preview: 'preview',
    todaysFocus: "Today's focus", targetThird: 'Target the 3rd.', focusCopy: 'Over a Dm7 chord, find F. When the harmony moves to G7, move to B. Hear how two notes can tell the listener where the music is going.',
    miniChallenge: 'MINI CHALLENGE', tryFretboard: 'Try this on the fretboard',
    pathTitle: 'A learning path built around you', pathCopy: 'A quick skill check helps identify what to work on next.', viewCurriculum: 'View curriculum',
    history: 'Assessment history', latestSaved: 'Your latest saved skill checks', correct: 'correct',
    backOverview: 'Back to overview', findBlindSpots: 'Find your blind spots', assessmentTitle: 'Your guitar skills, mapped.',
    assessmentCopy: 'Eight questions across four pillars: fretboard connection, chord-tone awareness, modal understanding, and ear training. No pressure — this is a starting point, not a grade.',
    about: 'About', minutes: 'minutes', questions: 'questions', skillCheck: 'Skill check', back: 'Back', next: 'Next question', seeResults: 'See results',
    report: 'Assessment report', got: 'You got', outOf: 'out of', questionsRight: 'questions right.', strongFoundation: 'Strong foundation', developing: 'Developing', needsPractice: 'Needs focused practice',
    bestStart: 'Best place to start', strongestArea: 'Your strongest area is', keepSharp: 'Keep it sharp while focusing on your next growth area.',
    buildPath: 'Build my learning path', answerReview: 'Answer review', takeAway: 'What to take away', question: 'Question', correctAnswer: 'Correct answer', retakeAssessment: 'Retake assessment',
    learningPath: 'Your learning path', curriculumTitle: 'Four weeks to a more connected sound.',
    curriculumCopy: 'A progressive plan that moves from fretboard navigation to musical expression. Your assessment helps decide where to put extra attention.',
    latestAssessment: 'Latest assessment', notTaken: 'Not taken', priorityFocus: 'Your priority focus', assessmentScore: 'Assessment score', priority: 'Priority', suggestedStage: 'Suggested next stage',
    keepMusical: 'Keep it musical', keepMusicalCopy: 'Finish each session by making a short phrase with what you learned.',
    fretboardLab: 'Fretboard lab', practiceTitle: 'See the notes. Hear the connections.', practiceCopy: 'Explore scale tones across the neck. Select any highlighted note to inspect its string and fret.',
    scaleMode: 'Scale / mode', reset: 'Reset', root: 'Root note', scaleTone: 'Scale tone', string: 'String', fret: 'Fret',
    noteChallenge: 'NOTE CHALLENGE', findAndPlayTarget: 'Find and play the target note', targetChallengeCopy: 'Use the reference tone, then play the same pitch on your guitar. The input can be your microphone or USB audio interface.', targetNote: 'Target note', secondString: '2nd string', thirdFret: '3rd fret', playReference: 'Play reference tone', startChallenge: 'Start challenge', targetCorrect: 'Correct! You found the target.', targetTooSharp: 'A little too sharp', targetTooFlat: 'A little too flat', waitingForTarget: 'Waiting for your note', targetInstruction: 'Play and hold the target note so FretWise can compare it.', centsFromTarget: 'cents from target',
    livePitch: 'LIVE PITCH', playAndCheck: 'Play a note and check it', audioInputHelp: 'Choose your laptop microphone or a USB audio interface. Play one clean note to see its detected pitch and tuning accuracy.', audioInput: 'Audio input', findDevices: 'Find devices', findDevicesFirst: 'Find audio devices first', startListening: 'Start listening', stopListening: 'Stop listening', detectedNote: 'Detected note', playSingleNote: 'Play a single sustained note', inTune: 'In tune', cents: 'cents', usbTip: 'USB tip: connect your guitar processor/interface before finding devices. It must expose a USB audio input to the operating system.', audioIdle: 'Ready', audioRequesting: 'Requesting access…', audioListening: 'Listening', audioDenied: 'Microphone access denied', audioUnsupported: 'Audio input is not supported', audioMissing: 'Audio input not found', audioError: 'Audio input error',
    listenColor: 'Listen for the color', listenCopy: 'Compare the 3rd and 7th of each mode. Those color tones are what make one mode feel different from another.',
    practicePrompt: 'Practice prompt', practiceCopy2: 'Play a short phrase using only three notes. Move it to a new string set without changing the melody.',
    learnEyebrow: 'THE FRETWISE METHOD', learnTitle: 'Learn the sound, not just the shape.',
    learnIntro: 'Every concept moves through five connected stages. Understand the idea, see it on the neck, hear its character, play it with intention, then make music with it.',
    method: 'The learning loop', understand: 'Understand', visualize: 'Visualize', hear: 'Hear', play: 'Play', create: 'Create',
    understandCopy: 'Get a clear explanation of the musical idea and why it matters.', visualizeCopy: 'Map notes, intervals, and chord tones onto the fretboard.', hearCopy: 'Listen for the sound and emotional color of the concept.', playCopy: 'Practice slowly with a focused, measurable task.', createCopy: 'Use the idea to make your own phrase or improvisation.',
    sampleLesson: 'Sample lesson', lessonTitle: 'Make chord changes audible', lessonIntro: 'A scale gives you a collection of notes. Chord tones show you where the harmony is. This lesson trains you to aim for those notes as chords move.',
    lessonGoal: 'Lesson goal', lessonGoalCopy: 'Land on the 3rd of each chord when the harmony changes.',
    step: 'Step', concept: 'Understand the idea', conceptCopy: 'The 3rd tells us whether a chord sounds major or minor. Dm7 contains F; G7 contains B. Moving from F to B makes the chord change clear.',
    seeNeck: 'Visualize it on the neck', neckCopy: 'Find F and B in more than one position. Use the fretboard lab to locate each note, then connect the closest pair with a small movement.',
    listen: 'Hear the movement', listenCopy2: 'Sing F, then B, then resolve to C. Notice how B feels like it wants to rise by a half-step to C.',
    playTask: 'Play with intention', playCopy2: 'Loop Dm7 for four beats, then G7 for four beats. Play F on the first chord and B on the second. Keep the rhythm simple and leave space.',
    createTask: 'Create a musical phrase', createCopy: 'Make a two-bar phrase using F and B as landing notes. Add one or two nearby passing notes, vary the rhythm, and finish by resolving to C.',
    markComplete: 'Mark lesson complete', completed: 'Lesson completed', lessonProgress: 'Lesson progress', methodNote: 'FretWise does not reward speed over understanding. Move on when you can explain, hear, and use the idea in your own playing.',
    priorityBadge: 'Recommended next lesson', noAssessment: 'Take the skill assessment to personalize your next lessons.',
  },
  id: {
    language: 'Bahasa', english: 'English', indonesian: 'Bahasa Indonesia', search: 'Cari', notifications: 'Notifikasi', brandTagline: 'Bermain melampaui pola',
    overview: 'Ringkasan', assessment: 'Evaluasi kemampuan', curriculum: 'Kurikulum saya', practice: 'Peta fretboard', learn: 'Belajar',
    workspace: 'Ruang belajar', findBreakthrough: 'Temukan perkembangan berikutnya', focusedPractice: 'Latihan yang terarah lebih bermanfaat daripada bermain tanpa tujuan berjam-jam.', checkSkills: 'Evaluasi kemampuan', prototype: 'Prototipe · v0.2',
    home: 'Beranda', assess: 'Evaluasi', plan: 'Rencana',
    workspaceLabel: 'RUANG BELAJAR GITAR PRIBADIMU', heroTitle1: 'Pemain hebat berlatih.', heroTitle2: 'Pemain luar biasa memahami hubungan nada.',
    heroDescription: 'Jangan hanya mengumpulkan bentuk scale. Mulailah memahami hubungan nada, chord, dan melodi.',
    findNextStep: 'Temukan langkah berikutnya', retake: 'Ulangi evaluasi', exploreFretboard: 'Jelajahi fretboard',
    practiceStreak: 'Konsistensi latihan', days: 'hari', momentum: 'Kemajuan dimulai dari langkah kecil', timeWeek: 'Waktu latihan minggu ini', goal: 'Dari target 2 jam per minggu',
    currentFocus: 'Fokus saat ini', basedAssessment: 'Berdasarkan evaluasi terakhirmu', makeChangesAudible: 'Buat perpindahan chord terdengar jelas',
    skillLevel: 'Tingkat kemampuan', discover: 'Cari tahu', latestScore: 'Nilai evaluasi terakhir', takeFirst: 'Mulai evaluasi pertamamu',
    interactiveTool: 'Alat interaktif', fretboardSnapshot: 'Cuplikan fretboard', openLab: 'Buka alat', rootNote: 'Nada dasar', scaleTones: 'Nada scale', preview: 'pratinjau',
    todaysFocus: 'Fokus hari ini', targetThird: 'Sasar nada ke-3.', focusCopy: 'Pada chord Dm7, cari nada F. Saat harmoni berpindah ke G7, pindah ke B. Dengarkan bagaimana dua nada ini memperjelas arah musik.',
    miniChallenge: 'TANTANGAN SINGKAT', tryFretboard: 'Coba pada fretboard',
    pathTitle: 'Rencana belajar yang disesuaikan untukmu', pathCopy: 'Evaluasi singkat membantu menentukan hal yang perlu kamu latih berikutnya.', viewCurriculum: 'Lihat kurikulum',
    history: 'Riwayat evaluasi', latestSaved: 'Hasil evaluasi terakhirmu', correct: 'benar',
    backOverview: 'Kembali ke ringkasan', findBlindSpots: 'Temukan bagian yang perlu ditingkatkan', assessmentTitle: 'Peta kemampuan gitarmu.',
    assessmentCopy: 'Delapan pertanyaan dalam empat pilar: keterhubungan fretboard, pemahaman nada chord, pemahaman mode, dan pendengaran interval. Ini titik awal belajar, bukan ujian untuk menghakimi kemampuanmu.',
    about: 'Sekitar', minutes: 'menit', questions: 'pertanyaan', skillCheck: 'Evaluasi kemampuan', back: 'Kembali', next: 'Pertanyaan berikutnya', seeResults: 'Lihat hasil',
    report: 'Hasil evaluasi', got: 'Kamu menjawab', outOf: 'dari', questionsRight: 'pertanyaan dengan benar.', strongFoundation: 'Fondasi kuat', developing: 'Sedang berkembang', needsPractice: 'Perlu latihan terarah',
    bestStart: 'Prioritas latihan', strongestArea: 'Area terkuatmu adalah', keepSharp: 'Pertahankan kemampuan ini sambil mengembangkan area yang masih lemah.',
    buildPath: 'Susun rencana belajarku', answerReview: 'Pembahasan jawaban', takeAway: 'Hal yang perlu dipahami', question: 'Pertanyaan', correctAnswer: 'Jawaban benar', retakeAssessment: 'Ulangi evaluasi',
    learningPath: 'Jalur belajarmu', curriculumTitle: 'Empat minggu untuk bermain lebih musikal.',
    curriculumCopy: 'Rencana bertahap dari mengenali seluruh fretboard hingga mengekspresikan ide musikal. Hasil evaluasi membantu menentukan fokus latihan tambahan.',
    latestAssessment: 'Evaluasi terakhir', notTaken: 'Belum dilakukan', priorityFocus: 'Fokus latihan utama', assessmentScore: 'Nilai evaluasi', priority: 'Prioritas', suggestedStage: 'Tahap berikutnya',
    keepMusical: 'Tetap bermain musikal', keepMusicalCopy: 'Akhiri setiap sesi dengan membuat frase pendek dari hal yang baru dipelajari.',
    fretboardLab: 'Peta fretboard', practiceTitle: 'Lihat nadanya. Pahami hubungannya.', practiceCopy: 'Jelajahi nada-nada scale di seluruh leher gitar. Pilih nada yang disorot untuk melihat senar dan fret-nya.',
    scaleMode: 'Scale / mode', reset: 'Atur ulang', root: 'Nada dasar', scaleTone: 'Nada scale', string: 'Senar', fret: 'Fret',
    noteChallenge: 'TANTANGAN NADA', findAndPlayTarget: 'Temukan dan mainkan nada target', targetChallengeCopy: 'Dengarkan nada referensi, lalu mainkan nada yang sama pada gitarmu. Input bisa dari mikrofon atau USB audio interface.', targetNote: 'Nada target', secondString: 'Senar ke-2', thirdFret: 'Fret ke-3', playReference: 'Putar nada referensi', startChallenge: 'Mulai tantangan', targetCorrect: 'Benar! Kamu menemukan nadanya.', targetTooSharp: 'Nadamu sedikit terlalu tinggi', targetTooFlat: 'Nadamu sedikit terlalu rendah', waitingForTarget: 'Menunggu nada yang kamu mainkan', targetInstruction: 'Mainkan dan tahan nada target agar FretWise dapat membandingkannya.', centsFromTarget: 'sen dari target',
    livePitch: 'PITCH LANGSUNG', playAndCheck: 'Mainkan nada dan periksa', audioInputHelp: 'Pilih mikrofon laptop atau USB audio interface. Mainkan satu nada yang bersih untuk melihat nada yang terdeteksi dan akurasi tuning.', audioInput: 'Input audio', findDevices: 'Cari perangkat', findDevicesFirst: 'Cari perangkat audio terlebih dahulu', startListening: 'Mulai mendengarkan', stopListening: 'Berhenti mendengarkan', detectedNote: 'Nada terdeteksi', playSingleNote: 'Mainkan satu nada panjang', inTune: 'Tepat', cents: 'sen', usbTip: 'Tips USB: hubungkan efek gitar/interface sebelum mencari perangkat. Perangkat harus dikenali sistem operasi sebagai USB audio input.', audioIdle: 'Siap', audioRequesting: 'Meminta akses…', audioListening: 'Mendengarkan', audioDenied: 'Akses mikrofon ditolak', audioUnsupported: 'Input audio tidak didukung', audioMissing: 'Input audio tidak ditemukan', audioError: 'Terjadi kesalahan input audio',
    listenColor: 'Dengarkan karakter nadanya', listenCopy: 'Bandingkan nada ke-3 dan ke-7 dari setiap mode. Nada-nada inilah yang memberi karakter berbeda pada masing-masing mode.',
    practicePrompt: 'Petunjuk latihan', practiceCopy2: 'Buat frase pendek hanya dengan tiga nada. Pindahkan ke kelompok senar lain tanpa mengubah melodinya.',
    learnEyebrow: 'METODE BELAJAR FRETWISE', learnTitle: 'Pahami bunyinya, bukan hanya bentuknya.',
    learnIntro: 'Setiap konsep dipelajari melalui lima tahap yang saling terhubung. Pahami idenya, lihat posisinya di fretboard, dengarkan karakternya, mainkan dengan tujuan, lalu gunakan untuk membuat musik.',
    method: 'Siklus pembelajaran', understand: 'Pahami', visualize: 'Visualisasikan', hear: 'Dengarkan', play: 'Mainkan', create: 'Ciptakan',
    understandCopy: 'Pelajari konsep musikal dengan penjelasan yang jelas dan alasan mengapa konsep itu penting.', visualizeCopy: 'Petakan nada, interval, dan nada chord pada fretboard.', hearCopy: 'Dengarkan karakter bunyi dan warna musikal dari konsep tersebut.', playCopy: 'Latih secara perlahan dengan tugas yang terarah dan terukur.', createCopy: 'Gunakan konsep itu untuk membuat frase atau improvisasimu sendiri.',
    sampleLesson: 'Contoh materi', lessonTitle: 'Buat perpindahan chord terdengar jelas', lessonIntro: 'Scale memberimu kumpulan nada. Nada chord menunjukkan titik penting harmoni. Materi ini melatihmu menyasar nada-nada tersebut saat chord berubah.',
    lessonGoal: 'Tujuan materi', lessonGoalCopy: 'Mendarat pada nada ke-3 dari setiap chord saat harmoni berubah.',
    step: 'Tahap', concept: 'Pahami konsepnya', conceptCopy: 'Nada ke-3 menentukan apakah chord terdengar mayor atau minor. Dm7 memiliki nada F, sedangkan G7 memiliki nada B. Perpindahan F ke B memperjelas perubahan chord.',
    seeNeck: 'Visualisasikan di fretboard', neckCopy: 'Cari nada F dan B di lebih dari satu posisi. Gunakan peta fretboard untuk menemukan masing-masing nada, lalu hubungkan pasangan terdekat dengan perpindahan kecil.',
    listen: 'Dengarkan pergerakannya', listenCopy2: 'Nyanyikan F, lalu B, kemudian selesaikan ke C. Rasakan bagaimana nada B seperti ingin naik setengah nada menuju C.',
    playTask: 'Mainkan dengan tujuan', playCopy2: 'Ulangi Dm7 selama empat ketukan, lalu G7 selama empat ketukan. Mainkan F pada chord pertama dan B pada chord kedua. Gunakan ritme sederhana dan beri ruang jeda.',
    createTask: 'Ciptakan frase musikal', createCopy: 'Buat frase dua bar dengan F dan B sebagai nada tujuan. Tambahkan satu atau dua nada penghubung, variasikan ritmenya, lalu akhiri dengan resolusi ke C.',
    markComplete: 'Tandai materi selesai', completed: 'Materi selesai', lessonProgress: 'Progres materi', methodNote: 'FretWise tidak mengutamakan kecepatan daripada pemahaman. Lanjutkan ketika kamu mampu menjelaskan, mendengar, dan menggunakan konsep tersebut saat bermain.',
    priorityBadge: 'Materi yang disarankan berikutnya', noAssessment: 'Ikuti evaluasi kemampuan agar materi berikutnya dapat disesuaikan dengan kebutuhanmu.',
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { const saved = window.localStorage.getItem(STORAGE_KEY); return saved === 'en' || saved === 'id' ? saved : 'id' } catch { return 'id' }
  })

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'id' ? 'FretWise — Belajar Gitar Lebih Musikal' : 'FretWise — Play beyond the patterns.'
  }, [language])

  const changeLanguage = (next) => {
    setLanguage(next)
    try { window.localStorage.setItem(STORAGE_KEY, next) } catch { /* storage optional */ }
  }

  const value = useMemo(() => ({
    language,
    setLanguage: changeLanguage,
    t: (key) => messages[language][key] ?? messages.en[key] ?? key,
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
