# FretWise
**Play beyond the patterns.**

FretWise is a dark, modern guitar-learning workspace for intermediate players who want to connect fretboard knowledge, chord tones, modes, and ear training into real musical phrasing.

## Current prototype
- Responsive dashboard with a guided practice overview.
- Interactive 24-fret SVG fretboard (standard tuning, note labels, selectable strings/frets).
- Five-question intermediate assessment with local scoring and a skill breakdown.
- Four-week sample curriculum view.
- Practice focus cards and a lightweight mentor panel.

## Stack
- React + Vite
- Tailwind CSS v4
- lucide-react
- Web Audio API foundation (pitch detection is intentionally not presented as active yet)

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
    dashboard/   Dashboard.jsx
    fretboard/   Fretboard.jsx
    layout/      AppLayout.jsx, Sidebar.jsx
    curriculum/  CurriculumView.jsx
  data/          quizData.js, curriculumData.js
  hooks/         usePitchDetection.js
  pages/         HomePage.jsx, AssessmentPage.jsx, CurriculumPage.jsx, PracticePage.jsx
  utils/         guitarTheory.js, quizScoring.js
  App.jsx
  index.css
  main.jsx
```

## Product principles
- Teach musical connections, not isolated shapes.
- Keep assessment scoring deterministic and local.
- Keep AI credentials on a future server; never expose secret API keys in Vite client variables.
- Voice tutoring and instrument pitch analysis are separate features and will be integrated in later phases.

## Roadmap
1. Core learning experience and assessment (current).
2. Fretboard and guitar-theory practice engine.
3. Personalized AI curriculum generation.
4. Voice tutor with lesson-aware context.
5. Guitar audio analysis and feedback.
