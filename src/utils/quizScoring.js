export function scoreAssessment(questions, answers) {
  const pillars = {}
  let correct = 0
  questions.forEach((question) => {
    const isCorrect = answers[question.id] === question.answer
    if (isCorrect) correct += 1
    const key = question.pillar
    if (!pillars[key]) pillars[key] = { correct: 0, total: 0 }
    pillars[key].total += 1
    if (isCorrect) pillars[key].correct += 1
  })
  return {
    correct,
    total: questions.length,
    percentage: Math.round((correct / questions.length) * 100),
    pillars: Object.fromEntries(Object.entries(pillars).map(([key, value]) => [key, { ...value, percentage: Math.round((value.correct / value.total) * 100) }])),
  }
}
