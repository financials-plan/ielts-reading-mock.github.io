// Readify IELTS - Scoring Engine & Official Band Score Conversion

/**
 * Standardize text input for IELTS completion / short answer comparisons.
 * Trims whitespace, removes excessive spaces, strips punctuation marks.
 */
export function normalizeTextAnswer(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')            // remove apostrophes for words like don't -> dont
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ') // replace punctuation with space
    .replace(/\s+/g, ' ')            // collapse multiple spaces
    .trim();
}

/**
 * Standardize True/False/Not Given and Yes/No/Not Given answers.
 */
export function normalizeTrueFalseAnswer(val) {
  if (!val) return '';
  const s = String(val).trim().toUpperCase();
  if (s === 'T' || s === 'TRUE') return 'TRUE';
  if (s === 'F' || s === 'FALSE') return 'FALSE';
  if (s === 'NG' || s === 'NOT GIVEN' || s === 'NOTGIVEN') return 'NOT GIVEN';
  if (s === 'Y' || s === 'YES') return 'YES';
  if (s === 'N' || s === 'NO') return 'NO';
  return s;
}

/**
 * Evaluates a single question answer against its key.
 * Supports strings, arrays of acceptable alternatives, or multi-select arrays.
 */
export function evaluateAnswer(userAnswer, correctKey, questionType) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    return {
      status: 'unanswered',
      isCorrect: false,
      userAnswer: '',
      correctAnswer: Array.isArray(correctKey) ? correctKey[0] : correctKey
    };
  }

  // Type: True/False/Not Given or Yes/No/Not Given
  if (questionType === 'tfng' || questionType === 'ynng') {
    const normUser = normalizeTrueFalseAnswer(userAnswer);
    const normCorrect = normalizeTrueFalseAnswer(Array.isArray(correctKey) ? correctKey[0] : correctKey);
    const isCorrect = normUser === normCorrect;
    return {
      status: isCorrect ? 'correct' : 'incorrect',
      isCorrect,
      userAnswer: normUser,
      correctAnswer: normCorrect
    };
  }

  // Type: Multi-select MCQ (e.g. user selects 2 options: ["B", "D"])
  if (Array.isArray(userAnswer)) {
    const userSorted = userAnswer.map(a => String(a).trim().toUpperCase()).sort();
    const correctSorted = (Array.isArray(correctKey) ? correctKey : [correctKey])
      .map(a => String(a).trim().toUpperCase())
      .sort();
    const isCorrect = userSorted.length === correctSorted.length &&
      userSorted.every((val, idx) => val === correctSorted[idx]);
    return {
      status: isCorrect ? 'correct' : 'incorrect',
      isCorrect,
      userAnswer: userSorted.join(', '),
      correctAnswer: correctSorted.join(', ')
    };
  }

  // Type: Single Choice MCQ or Matching Headings / Info / Features
  if (questionType === 'mcq' || questionType === 'matching_headings' || 
      questionType === 'matching_info' || questionType === 'matching_features' || 
      questionType === 'matching_endings') {
    const normUser = String(userAnswer).trim().toUpperCase();
    const allowed = Array.isArray(correctKey) ? correctKey.map(k => String(k).trim().toUpperCase()) : [String(correctKey).trim().toUpperCase()];
    const isCorrect = allowed.includes(normUser);
    return {
      status: isCorrect ? 'correct' : 'incorrect',
      isCorrect,
      userAnswer: normUser,
      correctAnswer: allowed[0]
    };
  }

  // Text Completion & Short Answer (Sentence, Summary, Note, Table, Flow, Diagram, Short-answer)
  const normUser = normalizeTextAnswer(userAnswer);
  const acceptableList = Array.isArray(correctKey) 
    ? correctKey.map(k => normalizeTextAnswer(k))
    : [normalizeTextAnswer(correctKey)];

  const isCorrect = acceptableList.some(valid => valid === normUser);

  return {
    status: isCorrect ? 'correct' : 'incorrect',
    isCorrect,
    userAnswer: String(userAnswer).trim(),
    correctAnswer: Array.isArray(correctKey) ? correctKey.join(' / ') : correctKey
  };
}

/**
 * Official IELTS Reading Band Score Conversion Tables
 */
const ACADEMIC_BAND_TABLE = [
  { min: 39, band: 9.0 },
  { min: 37, band: 8.5 },
  { min: 35, band: 8.0 },
  { min: 33, band: 7.5 },
  { min: 30, band: 7.0 },
  { min: 27, band: 6.5 },
  { min: 23, band: 6.0 },
  { min: 19, band: 5.5 },
  { min: 15, band: 5.0 },
  { min: 13, band: 4.5 },
  { min: 10, band: 4.0 },
  { min: 8,  band: 3.5 },
  { min: 6,  band: 3.0 },
  { min: 4,  band: 2.5 },
  { min: 0,  band: 2.0 }
];

const GENERAL_BAND_TABLE = [
  { min: 40, band: 9.0 },
  { min: 39, band: 8.5 },
  { min: 37, band: 8.0 },
  { min: 36, band: 7.5 },
  { min: 34, band: 7.0 },
  { min: 32, band: 6.5 },
  { min: 30, band: 6.0 },
  { min: 27, band: 5.5 },
  { min: 23, band: 5.0 },
  { min: 19, band: 4.5 },
  { min: 15, band: 4.0 },
  { min: 12, band: 3.5 },
  { min: 8,  band: 3.0 },
  { min: 0,  band: 2.5 }
];

/**
 * Calculates Band Score based on test type and raw score.
 * Scales correctly if the test has fewer than 40 questions (e.g. single passage drills).
 */
export function calculateBandScore(rawScore, totalQuestions = 40, testType = 'academic') {
  if (totalQuestions <= 0) return 0;
  
  // Normalize raw score to a 40-question scale if taking a partial test
  const normalizedRaw = Math.round((rawScore / totalQuestions) * 40);
  const table = testType === 'general' ? GENERAL_BAND_TABLE : ACADEMIC_BAND_TABLE;

  for (const entry of table) {
    if (normalizedRaw >= entry.min) {
      return entry.band;
    }
  }
  return 2.0;
}

/**
 * Evaluates an entire test submission.
 * Returns comprehensive statistics, breakdown by passage and question type.
 */
export function scoreTestSubmission(test, userAnswers) {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  let totalQuestions = 0;

  const questionsResults = {};
  const passageBreakdown = {};
  const typeBreakdown = {};

  test.passages.forEach((passage, pIndex) => {
    passageBreakdown[pIndex] = {
      passageId: passage.id,
      title: passage.title,
      total: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0
    };

    passage.questionGroups.forEach(group => {
      const qType = group.questionType;
      if (!typeBreakdown[qType]) {
        typeBreakdown[qType] = {
          type: qType,
          total: 0,
          correct: 0,
          incorrect: 0,
          unanswered: 0
        };
      }

      group.questions.forEach(q => {
        totalQuestions++;
        passageBreakdown[pIndex].total++;
        typeBreakdown[qType].total++;

        const userAns = userAnswers[q.id];
        const evaluation = evaluateAnswer(userAns, q.answerKey, qType);

        questionsResults[q.id] = {
          ...q,
          questionType: qType,
          passageIndex: pIndex,
          passageTitle: passage.title,
          ...evaluation
        };

        if (evaluation.status === 'correct') {
          correctCount++;
          passageBreakdown[pIndex].correct++;
          typeBreakdown[qType].correct++;
        } else if (evaluation.status === 'unanswered') {
          unansweredCount++;
          passageBreakdown[pIndex].unanswered++;
          typeBreakdown[qType].unanswered++;
        } else {
          incorrectCount++;
          passageBreakdown[pIndex].incorrect++;
          typeBreakdown[qType].incorrect++;
        }
      });
    });
  });

  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const estimatedBand = calculateBandScore(correctCount, totalQuestions, test.type);

  return {
    testId: test.id,
    testTitle: test.title,
    testType: test.type,
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    accuracy,
    estimatedBand,
    questionsResults,
    passageBreakdown,
    typeBreakdown
  };
}
