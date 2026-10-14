// Readify IELTS - Main Test Runner
import { runScoringTests } from './scoring.test.js';
import { runIntegrityTests } from './tests-integrity.test.js';

console.log('========================================================');
console.log('  READIFY IELTS - AUTOMATED TEST SUITE');
console.log('========================================================\n');

const res1 = runScoringTests();
console.log('');
const res2 = runIntegrityTests();

const totalPassed = res1.passed + res2.passed;
const totalFailed = res1.failed + res2.failed;

console.log('\n========================================================');
console.log(`  RESULTS: ${totalPassed} Passed | ${totalFailed} Failed`);
console.log('========================================================');

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED WITH ZERO ERRORS.\n');
  process.exit(0);
}
