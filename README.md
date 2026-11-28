# FretWise
**Play beyond the patterns.**

FretWise is a bilingual (Bahasa Indonesia and English) guitar-learning workspace for intermediate players. It helps players connect fretboard knowledge, chord tones, modes, ear training, and musical phrasing.

## Current prototype
- Responsive dark dashboard with Bahasa Indonesia and English language switching.
- Interactive 24-fret SVG fretboard (standard tuning, note labels, selectable strings/frets).
- Eight-question assessment across four skill pillars, with local scoring and answer explanations in both languages.
- Assessment insights, recommended exercises, and up to ten locally saved assessment results.
- Four-week curriculum with assessment-based priority focus.
- Guided lesson prototype using the FretWise five-stage learning method: Understand, Visualize, Hear, Play, Create.
- One complete sample lesson: making chord changes audible through chord-tone targeting.

## Teaching method
Every lesson follows five connected stages:
1. **Understand** — learn the musical concept and why it matters.
2. **Visualize** — locate notes, intervals, and chord tones on the fretboard.
3. **Hear** — sing and recognize the sound and tension of the concept.
4. **Play** — practice with a focused, measurable task.
5. **Create** — use the concept to make an original phrase or improvisation.

The aim is musical understanding and application, not memorizing shapes or maximizing speed.

## Stack
- React + Vite
- Tailwind CSS v4
- lucide-react
- Web Audio API foundation (pitch detection is not yet an active feature)

## Getting started
```bash
npm install
npm run dev
```

## Project structure
```
src/
  components/
    assessment/  AssessmentQuiz.jsx
    fretboard/   Fretboard.jsx
    layout/      AppLayout.jsx, Sidebar.jsx
  data/          quizData.js, curriculumData.js, lessonData.js
  i18n/          LanguageContext.jsx
  pages/         HomePage.jsx, AssessmentPage.jsx, CurriculumPage.jsx,
                 PracticePage.jsx, LearnPage.jsx
  hooks/         usePitchDetection.js
  utils/         guitarTheory.js, quizScoring.js, assessmentInsights.js,
                 assessmentStorage.js
  App.jsx
  index.css
  main.jsx
```

## Product principles
- Teach musical connections, not isolated shapes.
- Assessment scoring is deterministic and local.
- Language preference and assessment history are stored in browser localStorage.
- AI credentials must remain on a future server; never expose secret API keys in Vite client variables.
- Voice tutoring and instrument pitch analysis are separate future features.

## Roadmap
1. Bilingual core learning experience and guided lesson foundation (current).
2. Practical assessment: fretboard identification, chord-tone challenges, and ear training.
3. Interactive theory and lesson practice engine.
4. Personalized AI curriculum generation.
5. Voice tutor with lesson-aware context.
6. Guitar audio analysis and feedback.
