// Readify IELTS - Tests Content & Integrity Suite
import { allTests, TestService } from '../src/data/index.js';

export function runIntegrityTests() {
  console.log('--- Running Tests Content & Integrity Suite ---');
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

  assert(allTests.length >= 5, `Contains at least 5 curated tests (Found: ${allTests.length})`);

  // 1. Verify Academic Full Test 1
  const acadTest = allTests.find(t => t.id === 'academic-full-1');
  assert(Boolean(acadTest), 'Academic Full Test 1 exists');
  assert(acadTest.passages.length === 3, 'Academic Full Test 1 has exactly 3 passages');
  const acadTotal = TestService.getTotalQuestions(acadTest);
  assert(acadTotal === 40, `Academic Full Test 1 has exactly 40 questions (Found: ${acadTotal})`);

  // Verify sequential numbers 1 to 40 in Academic Test 1
  const acadNumbers = [];
  acadTest.passages.forEach(p => p.questionGroups.forEach(g => g.questions.forEach(q => acadNumbers.push(q.number))));
  assert(acadNumbers.length === 40, '40 question numbers extracted');
  assert(acadNumbers[0] === 1 && acadNumbers[39] === 40, 'Questions sequentially numbered 1 to 40');

  // 2. Verify General Training Full Test 1
  const genTest = allTests.find(t => t.id === 'general-full-1');
  assert(Boolean(genTest), 'General Training Full Test 1 exists');
  assert(genTest.passages.length === 3, 'General Training Full Test 1 has exactly 3 sections');
  const genTotal = TestService.getTotalQuestions(genTest);
  assert(genTotal === 40, `General Training Full Test 1 has exactly 40 questions (Found: ${genTotal})`);

  // Verify sequential numbers 1 to 40 in General Test 1
  const genNumbers = [];
  genTest.passages.forEach(p => p.questionGroups.forEach(g => g.questions.forEach(q => genNumbers.push(q.number))));
  assert(genNumbers.length === 40, '40 question numbers extracted');
  assert(genNumbers[0] === 1 && genNumbers[39] === 40, 'Questions sequentially numbered 1 to 40');

  // 3. Verify Every Question Has Valid Key, Evidence & Explanation
  let questionsWithMissingFields = 0;
  allTests.forEach(test => {
    test.passages.forEach(passage => {
      passage.questionGroups.forEach(group => {
        group.questions.forEach(q => {
          if (!q.id || !q.number || !q.prompt || q.answerKey === undefined || !q.explanation || !q.evidence) {
            questionsWithMissingFields++;
            console.error(`Missing field in question: ${test.id} - ${q.id}`);
          }
        });
      });
    });
  });

  assert(questionsWithMissingFields === 0, 'Every question across all tests has valid id, prompt, answerKey, evidence and explanation');

  return { passed, failed };
}
