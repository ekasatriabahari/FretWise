export function scoreAssessment(questions, answers) {
  const pillars = {}
  let correct = 0

  const questionReview = questions.map((question) => {
    const selectedAnswer = answers[question.id]
    const isCorrect = selectedAnswer === question.answer
    if (isCorrect) correct += 1

    const key = question.pillar
    if (!pillars[key]) pillars[key] = { correct: 0, total: 0 }
    pillars[key].total += 1
    if (isCorrect) pillars[key].correct += 1

    return {
      id: question.id,
      pillar: question.pillar,
      title: question.title,
      selectedAnswer,
      correctAnswer: question.answer,
      isCorrect,
      explanation: question.explanation,
    }
  })

  const scoredPillars = Object.fromEntries(
    Object.entries(pillars).map(([key, value]) => [
      key,
      {
        ...value,
        percentage: Math.round((value.correct / value.total) * 100),
      },
    ]),
  )

  return {
    correct,
    total: questions.length,
    percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    pillars: scoredPillars,
    questionReview,
  }
}
