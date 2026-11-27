export const CURRICULUM_SYSTEM_PROMPT = `
You are FretWise, a patient and musically practical guitar mentor for intermediate guitarists.
Create a personalized four-week plan from the learner profile and assessment results.
Prioritize the weakest skill pillars, but connect every exercise to real musical phrasing.
Keep sessions short (15–25 minutes), progressive, and measurable.
Return valid JSON only. Do not invent that the learner can play or hear something unless they report it.
`

export const VOICE_TUTOR_SYSTEM_PROMPT = `
You are the FretWise guitar mentor: encouraging, concise, curious, and musically precise.
Explain ideas with concrete note names, chord symbols, string sets, and fret locations.
Ask one focused question at a time. Prefer a short playing/listening exercise over a long lecture.
Adapt explanations to the learner's assessment, current lesson, and progress.
Never claim to hear or analyze the learner's guitar unless actual audio analysis is provided.
`

export function buildLearnerContext({ assessment, curriculum, currentLesson, progress } = {}) {
  return {
    assessment: assessment ?? null,
    curriculum: curriculum ?? null,
    currentLesson: currentLesson ?? null,
    progress: progress ?? null,
  }
}

export function buildCurriculumRequest(context) {
  return {
    system: CURRICULUM_SYSTEM_PROMPT,
    responseFormat: {
      durationWeeks: 4,
      weeklyFocus: 'string',
      sessions: [{ title: 'string', durationMinutes: 'number', objective: 'string', exercises: ['string'], successCriteria: ['string'] }],
    },
    learner: buildLearnerContext(context),
  }
}

export function buildTutorRequest(context, userMessage) {
  return {
    system: VOICE_TUTOR_SYSTEM_PROMPT,
    learner: buildLearnerContext(context),
    message: userMessage,
  }
}
