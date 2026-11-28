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
- Live guitar input monitor with microphone / USB audio-interface selection, signal level, detected note, frequency, and cents deviation.
- First interactive note challenge: play a generated D4 reference tone, then play D4 on the 2nd string, 3rd fret; browser compares the incoming pitch against the target.
- Five-round practical note assessment: identify the exact string/fret for a randomized note, then verify the played pitch through microphone or USB audio input. Results and attempts are shown for the current session.

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
- Web Audio API for live input capture, initial monophonic pitch estimation, and generated reference tones

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

## Audio input prototype\n- Uses the browser MediaDevices API to request audio input and enumerate available input devices after permission is granted.\n- USB guitar processors and audio interfaces can be selected when the operating system exposes them as audio input devices. A USB port alone does not guarantee audio-interface support.\n- Input capture disables browser echo cancellation, noise suppression, and automatic gain control where the browser/device honors those constraints.\n- The current tuner and practical assessment are early monophonic prototypes. The practical assessment scores five note-location and pitch-verification rounds in the current session; results are not yet saved. Polyphonic chords, effects-heavy signals, latency calibration, and chord-tone assessment are not implemented yet.\n- Use HTTPS in deployment (localhost is also treated as a secure context by browsers).\n\n## Product principles
- Teach musical connections, not isolated shapes.
- Assessment scoring is deterministic and local.
- Language preference and assessment history are stored in browser localStorage.
- AI credentials must remain on a future server; never expose secret API keys in Vite client variables.
- Voice tutoring and instrument pitch analysis are separate future features.

## Roadmap
1. Bilingual core learning experience and guided lesson foundation (current).
2. Expand practical assessment with saved progress, chord-tone challenges, and ear training.
3. Interactive theory and lesson practice engine.
4. Personalized AI curriculum generation.
5. Voice tutor with lesson-aware context.
6. Improve guitar audio analysis, calibrate latency, and add scored playing feedback.
