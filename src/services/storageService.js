// Readify IELTS - Client-side Storage Service

const STORAGE_KEYS = {
  PREFERENCES: 'readify_preferences',
  GOALS: 'readify_goals',
  ACTIVE_SESSION: 'readify_active_session',
  ATTEMPTS: 'readify_test_attempts',
  SAVED_QUESTIONS: 'readify_saved_questions',
  WRONG_ANSWERS: 'readify_wrong_answers',
  VOCABULARY: 'readify_vocab_items'
};

const DEFAULT_PREFERENCES = {
  theme: 'light',
  language: 'en',
  fontFamily: 'serif',
  fontSize: 'medium', // 'small', 'medium', 'large', 'xl'
  lineHeight: 'relaxed' // 'normal', 'relaxed', 'loose'
};

const DEFAULT_GOALS = {
  targetBand: 7.0,
  weeklyTests: 3,
  dailyMinutes: 30
};

export const StorageService = {
  // --- Preferences ---
  getPreferences() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return data ? { ...DEFAULT_PREFERENCES, ...JSON.parse(data) } : DEFAULT_PREFERENCES;
    } catch (e) {
      return DEFAULT_PREFERENCES;
    }
  },

  setPreferences(prefs) {
    try {
      const current = this.getPreferences();
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify({ ...current, ...prefs }));
    } catch (e) {
      console.warn('Failed to save preferences to localStorage', e);
    }
  },

  // --- Learning Goals ---
  getGoals() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GOALS);
      return data ? { ...DEFAULT_GOALS, ...JSON.parse(data) } : DEFAULT_GOALS;
    } catch (e) {
      return DEFAULT_GOALS;
    }
  },

  setGoals(goals) {
    try {
      const current = this.getGoals();
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify({ ...current, ...goals }));
    } catch (e) {
      console.warn('Failed to save goals', e);
    }
  },

  // --- Active Test Session (Autosave & Resume) ---
  getActiveSession() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveActiveSession(sessionData) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify({
        ...sessionData,
        lastSavedAt: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Autosave session failed', e);
    }
  },

  clearActiveSession() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    } catch (e) {}
  },

  // --- Test Attempts History ---
  getAttempts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveAttempt(attemptRecord) {
    try {
      const attempts = this.getAttempts();
      const updated = [
        {
          id: 'attempt_' + Date.now(),
          timestamp: new Date().toISOString(),
          ...attemptRecord
        },
        ...attempts
      ];
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save test attempt', e);
    }
  },

  // --- Saved Questions ---
  getSavedQuestions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_QUESTIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleSaveQuestion(questionData) {
    try {
      const saved = this.getSavedQuestions();
      const existingIndex = saved.findIndex(q => q.id === questionData.id);
      if (existingIndex >= 0) {
        saved.splice(existingIndex, 1);
        localStorage.setItem(STORAGE_KEYS.SAVED_QUESTIONS, JSON.stringify(saved));
        return false; // Removed
      } else {
        saved.unshift({
          ...questionData,
          savedAt: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.SAVED_QUESTIONS, JSON.stringify(saved));
        return true; // Added
      }
    } catch (e) {
      return false;
    }
  },

  // --- Wrong Answers Bank ---
  getWrongAnswers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WRONG_ANSWERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  recordWrongAnswers(resultsArray) {
    try {
      const current = this.getWrongAnswers();
      const wrongList = resultsArray.filter(r => r.status === 'incorrect');
      
      const newEntries = [];
      wrongList.forEach(wrong => {
        const existingIdx = current.findIndex(c => c.id === wrong.id);
        if (existingIdx >= 0) {
          current[existingIdx].attemptCount = (current[existingIdx].attemptCount || 1) + 1;
          current[existingIdx].lastAttemptedAt = new Date().toISOString();
          current[existingIdx].lastUserAnswer = wrong.userAnswer;
        } else {
          newEntries.push({
            id: wrong.id,
            testId: wrong.testId || '',
            passageTitle: wrong.passageTitle || '',
            questionType: wrong.questionType,
            questionNumber: wrong.questionNumber,
            prompt: wrong.prompt || wrong.text,
            correctAnswer: wrong.correctAnswer,
            lastUserAnswer: wrong.userAnswer,
            explanation: wrong.explanation,
            evidence: wrong.evidence,
            attemptCount: 1,
            addedAt: new Date().toISOString(),
            lastAttemptedAt: new Date().toISOString(),
            status: 'unresolved' // 'unresolved' | 'resolved'
          });
        }
      });

      const updated = [...newEntries, ...current];
      localStorage.setItem(STORAGE_KEYS.WRONG_ANSWERS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to update wrong answers', e);
    }
  },

  resolveWrongAnswer(questionId) {
    try {
      const list = this.getWrongAnswers();
      const item = list.find(q => q.id === questionId);
      if (item) {
        item.status = 'resolved';
        item.resolvedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.WRONG_ANSWERS, JSON.stringify(list));
      }
    } catch (e) {}
  },

  // --- Vocabulary Notebook ---
  getVocabulary() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveVocabularyItem(item) {
    try {
      const vocab = this.getVocabulary();
      const existingIdx = vocab.findIndex(v => v.id === item.id || v.word.toLowerCase() === item.word.toLowerCase());
      if (existingIdx >= 0) {
        vocab[existingIdx] = { ...vocab[existingIdx], ...item, updatedAt: new Date().toISOString() };
      } else {
        vocab.unshift({
          id: 'vocab_' + Date.now(),
          word: item.word,
          pronunciation: item.pronunciation || '',
          definitionEn: item.definitionEn || '',
          definitionVi: item.definitionVi || '',
          contextSentence: item.contextSentence || '',
          sourceTest: item.sourceTest || '',
          masteryLevel: item.masteryLevel || 'new', // 'new', 'learning', 'mastered'
          addedAt: new Date().toISOString()
        });
      }
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocab));
      return true;
    } catch (e) {
      return false;
    }
  },

  deleteVocabularyItem(id) {
    try {
      const vocab = this.getVocabulary().filter(v => v.id !== id);
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocab));
      return true;
    } catch (e) {
      return false;
    }
  },

  // --- Full Backup Export & Import ---
  exportAllData() {
    return {
      exportVersion: 1,
      exportedAt: new Date().toISOString(),
      preferences: this.getPreferences(),
      goals: this.getGoals(),
      attempts: this.getAttempts(),
      savedQuestions: this.getSavedQuestions(),
      wrongAnswers: this.getWrongAnswers(),
      vocabulary: this.getVocabulary()
    };
  },

  importBackupData(backupJson) {
    try {
      const data = typeof backupJson === 'string' ? JSON.parse(backupJson) : backupJson;
      if (data.preferences) localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(data.preferences));
      if (data.goals) localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(data.goals));
      if (data.attempts) localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(data.attempts));
      if (data.savedQuestions) localStorage.setItem(STORAGE_KEYS.SAVED_QUESTIONS, JSON.stringify(data.savedQuestions));
      if (data.wrongAnswers) localStorage.setItem(STORAGE_KEYS.WRONG_ANSWERS, JSON.stringify(data.wrongAnswers));
      if (data.vocabulary) localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(data.vocabulary));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // --- Reset All Local Storage ---
  clearAllData() {
    try {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
      // Remove any test answers keys
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('readify_')) {
          localStorage.removeItem(key);
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};
