// Readify IELTS - Scoring Service Unit Tests
import {
  normalizeTextAnswer,
  normalizeTrueFalseAnswer,
  evaluateAnswer,
  calculateBandScore
} from '../src/services/scoringService.js';

export function runScoringTests() {
  console.log('--- Running Scoring Service Tests ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Text Normalization
  assert(normalizeTextAnswer('  Urban Heat   Islands. ') === 'urban heat islands', 'Normalizes casing and trims whitespace');
  assert(normalizeTextAnswer("don't") === 'dont', 'Strips apostrophes');
  assert(normalizeTextAnswer('50 to 70 centimeters') === '50 to 70 centimeters', 'Preserves numbers and words');

  // 2. TFNG Normalization
  assert(normalizeTrueFalseAnswer('true') === 'TRUE', 'Normalizes true to TRUE');
  assert(normalizeTrueFalseAnswer('T') === 'TRUE', 'Normalizes T to TRUE');
  assert(normalizeTrueFalseAnswer('ng') === 'NOT GIVEN', 'Normalizes ng to NOT GIVEN');
  assert(normalizeTrueFalseAnswer('No') === 'NO', 'Normalizes No to NO');

  // 3. Evaluation - TFNG
  const tf1 = evaluateAnswer('True', 'TRUE', 'tfng');
  assert(tf1.isCorrect && tf1.status === 'correct', 'Evaluates True correctly for TFNG');

  const tf2 = evaluateAnswer('False', 'TRUE', 'tfng');
  assert(!tf2.isCorrect && tf2.status === 'incorrect', 'Evaluates False as incorrect when answer is TRUE');

  const tf3 = evaluateAnswer('', 'TRUE', 'tfng');
  assert(!tf3.isCorrect && tf3.status === 'unanswered', 'Flags empty answer as unanswered');

  // 4. Evaluation - MCQ Single & Multi
  const mcq1 = evaluateAnswer('b', 'B', 'mcq');
  assert(mcq1.isCorrect, 'Evaluates single MCQ case-insensitively');

  const mcqMulti1 = evaluateAnswer(['D', 'B'], ['B', 'D'], 'mcq_multi');
  assert(mcqMulti1.isCorrect, 'Evaluates multi-select MCQ regardless of selection order');

  // 5. Evaluation - Text Completion
  const comp1 = evaluateAnswer('urban heat islands', ['urban heat islands', 'heat islands'], 'completion_note');
  assert(comp1.isCorrect, 'Evaluates matching option from alternative list');

  const comp2 = evaluateAnswer('heat islands', ['urban heat islands', 'heat islands'], 'completion_note');
  assert(comp2.isCorrect, 'Evaluates second alternative from list');

  // 6. Band Score Conversion
  // Academic
  assert(calculateBandScore(40, 40, 'academic') === 9.0, 'Academic: 40/40 is Band 9.0');
  assert(calculateBandScore(35, 40, 'academic') === 8.0, 'Academic: 35/40 is Band 8.0');
  assert(calculateBandScore(30, 40, 'academic') === 7.0, 'Academic: 30/40 is Band 7.0');
  assert(calculateBandScore(23, 40, 'academic') === 6.0, 'Academic: 23/40 is Band 6.0');

  // General Training
  assert(calculateBandScore(40, 40, 'general') === 9.0, 'General: 40/40 is Band 9.0');
  assert(calculateBandScore(37, 40, 'general') === 8.0, 'General: 37/40 is Band 8.0');
  assert(calculateBandScore(34, 40, 'general') === 7.0, 'General: 34/40 is Band 7.0');
  assert(calculateBandScore(30, 40, 'general') === 6.0, 'General: 30/40 is Band 6.0');

  return { passed, failed };
}
