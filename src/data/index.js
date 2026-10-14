// Readify IELTS - Central Test Repository & Data Service
import { academicFullTest1 } from './tests/academic-full-1.js';
import { generalFullTest1 } from './tests/general-full-1.js';
import { drillAiMedicine } from './tests/drill-ai-medicine.js';
import { drillRomanAqueducts } from './tests/drill-roman-aqueducts.js';
import { drillHabitPsychology } from './tests/drill-habit-psychology.js';

export const allTests = [
  academicFullTest1,
  generalFullTest1,
  drillAiMedicine,
  drillRomanAqueducts,
  drillHabitPsychology
];

export const TestService = {
  getAllTests() {
    return allTests;
  },

  getTestById(id) {
    return allTests.find(t => t.id === id) || null;
  },

  getFilterOptions() {
    const types = ['all', 'academic', 'general'];
    const difficulties = ['all', 'easy', 'medium', 'hard'];
    const topics = [
      'all',
      'Science, Nature & Technology',
      'Workplace, Community & Engineering',
      'Technology & Healthcare',
      'History & Engineering',
      'Psychology & Behavioral Science'
    ];
    return { types, difficulties, topics };
  },

  filterTests({ type = 'all', difficulty = 'all', topic = 'all', query = '', status = 'all', attempts = [] } = {}) {
    return allTests.filter(test => {
      // Type filter
      if (type !== 'all' && test.type !== type) return false;

      // Difficulty filter
      if (difficulty !== 'all' && test.difficulty !== difficulty) return false;

      // Topic filter
      if (topic !== 'all' && test.topic !== topic) return false;

      // Search query (title, topic, or description)
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesTitle = test.title.toLowerCase().includes(q);
        const matchesTopic = test.topic.toLowerCase().includes(q);
        const matchesDesc = test.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTopic && !matchesDesc) return false;
      }

      // Status filter
      if (status !== 'all') {
        const hasCompleted = attempts.some(a => a.testId === test.id);
        if (status === 'completed' && !hasCompleted) return false;
        if (status === 'not_started' && hasCompleted) return false;
      }

      return true;
    });
  },

  getTotalQuestions(test) {
    if (!test || !test.passages) return 0;
    return test.passages.reduce((sum, p) => {
      return sum + p.questionGroups.reduce((gSum, g) => gSum + g.questions.length, 0);
    }, 0);
  }
};
