// Readify IELTS - Central Reactive State Store
import { StorageService } from '../services/storageService.js';
import { setLanguage } from './i18n.js';

class StateStore {
  constructor() {
    this.listeners = new Set();
    const prefs = StorageService.getPreferences();
    const goals = StorageService.getGoals();

    this.state = {
      currentRoute: 'dashboard',
      routeParams: {},
      currentTest: null,
      activePassageIndex: 0,
      userAnswers: {},
      markedQuestions: new Set(),
      testMode: 'timed', // 'practice', 'timed', 'full_test'
      timer: {
        remainingSeconds: 3600,
        formatted: '60:00',
        isPaused: false
      },
      lastSubmissionResult: null,
      preferences: prefs,
      goals: goals,
      toasts: [],
      modal: null
    };

    // Apply loaded theme and language
    this.applyTheme(prefs.theme);
    setLanguage(prefs.language);
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(eventKey = null) {
    for (const listener of this.listeners) {
      listener(this.state, eventKey);
    }
  }

  // --- Routing ---
  navigate(route, params = {}) {
    this.state.currentRoute = route;
    this.state.routeParams = params;
    window.location.hash = `#/${route}${params.testId ? `/${params.testId}` : ''}`;
    this.notify('route');
  }

  // --- Workspace Actions ---
  startTest(test, mode = 'timed', initialAnswers = {}, initialMarked = []) {
    this.state.currentTest = test;
    this.state.testMode = mode;
    this.state.activePassageIndex = 0;
    this.state.userAnswers = { ...initialAnswers };
    this.state.markedQuestions = new Set(initialMarked);
    this.state.lastSubmissionResult = null;

    // Persist active session
    StorageService.saveActiveSession({
      testId: test.id,
      mode,
      answers: this.state.userAnswers,
      marked: Array.from(this.state.markedQuestions),
      activePassageIndex: 0
    });

    this.notify('test_started');
  }

  setAnswer(questionId, value) {
    this.state.userAnswers[questionId] = value;
    // Autosave to storage
    if (this.state.currentTest) {
      StorageService.saveActiveSession({
        testId: this.state.currentTest.id,
        mode: this.state.testMode,
        answers: this.state.userAnswers,
        marked: Array.from(this.state.markedQuestions),
        activePassageIndex: this.state.activePassageIndex
      });
    }
    this.notify('answer_updated');
  }

  toggleMarkQuestion(questionId) {
    if (this.state.markedQuestions.has(questionId)) {
      this.state.markedQuestions.delete(questionId);
    } else {
      this.state.markedQuestions.add(questionId);
    }

    if (this.state.currentTest) {
      StorageService.saveActiveSession({
        testId: this.state.currentTest.id,
        mode: this.state.testMode,
        answers: this.state.userAnswers,
        marked: Array.from(this.state.markedQuestions),
        activePassageIndex: this.state.activePassageIndex
      });
    }
    this.notify('question_marked');
  }

  setActivePassage(index) {
    this.state.activePassageIndex = index;
    if (this.state.currentTest) {
      StorageService.saveActiveSession({
        testId: this.state.currentTest.id,
        mode: this.state.testMode,
        answers: this.state.userAnswers,
        marked: Array.from(this.state.markedQuestions),
        activePassageIndex: index
      });
    }
    this.notify('passage_changed');
  }

  updateTimer(remainingSeconds, formatted, isPaused = false) {
    this.state.timer.remainingSeconds = remainingSeconds;
    this.state.timer.formatted = formatted;
    this.state.timer.isPaused = isPaused;
    this.notify('timer_tick');
  }

  setSubmissionResult(result) {
    this.state.lastSubmissionResult = result;
    this.notify('test_submitted');
  }

  // --- Preferences & Theme ---
  updatePreferences(prefs) {
    this.state.preferences = { ...this.state.preferences, ...prefs };
    StorageService.setPreferences(this.state.preferences);

    if (prefs.theme) {
      this.applyTheme(prefs.theme);
    }
    if (prefs.language) {
      setLanguage(prefs.language);
    }

    this.notify('preferences_changed');
  }

  applyTheme(theme) {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  updateGoals(goals) {
    this.state.goals = { ...this.state.goals, ...goals };
    StorageService.setGoals(this.state.goals);
    this.notify('goals_changed');
  }

  // --- Toast Notifications ---
  showToast(message, type = 'info', duration = 3500) {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substr(2, 4);
    const toast = { id, message, type };
    this.state.toasts.push(toast);
    this.notify('toast_added');

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id) {
    this.state.toasts = this.state.toasts.filter(t => t.id !== id);
    this.notify('toast_removed');
  }

  // --- Modals ---
  openModal(modalConfig) {
    this.state.modal = modalConfig;
    this.notify('modal_opened');
  }

  closeModal() {
    this.state.modal = null;
    this.notify('modal_closed');
  }
}

export const store = new StateStore();
