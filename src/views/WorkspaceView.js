// Readify IELTS - Core Test Workspace View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { TestService } from '../data/index.js';
import { TimerService } from '../services/timerService.js';
import { scoreTestSubmission } from '../services/scoringService.js';
import { TextHighlighter } from '../services/textHighlighter.js';
import { renderQuestionGroup } from '../components/questions/QuestionRenderer.js';
import { t } from '../state/i18n.js';

export function renderWorkspaceView(testId) {
  const container = document.createElement('div');
  container.className = 'workspace-container';

  let test = store.getState().currentTest;
  if (!test || test.id !== testId) {
    test = TestService.getTestById(testId);
    if (!test) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">Test Not Found</div>
          <a href="#/library" class="btn btn-primary">${t('common.backToLibrary')}</a>
        </div>
      `;
      return container;
    }
    store.startTest(test, 'timed');
  }

  const totalQuestions = TestService.getTotalQuestions(test);
  let activePassageIndex = store.getState().activePassageIndex || 0;
  let activeViewMobile = 'passage'; // 'passage' | 'questions'
  let isFocusMode = false;
  let timerService = null;
  let textHighlighter = null;

  // Reading Preferences
  const prefs = store.getState().preferences;
  let currentFontSize = prefs.fontSize || 'medium';
  let currentFontFamily = prefs.fontFamily || 'serif';
  let currentLineHeight = prefs.lineHeight || 'relaxed';
  let currentHighlightColor = 'yellow';

  // Build Workspace Shell HTML
  container.innerHTML = `
    <!-- Top Control Bar -->
    <header class="workspace-topbar">
      <div class="workspace-title-box">
        <a href="#/library" class="btn btn-ghost btn-sm" id="exit_workspace_btn" title="Save & Exit">
          &larr; Exit
        </a>
        <div class="workspace-test-title" title="${test.title}">${test.title}</div>
        <span class="badge ${test.type === 'academic' ? 'badge-primary' : 'badge-accent'}" style="font-size: 10px;">
          ${test.type === 'academic' ? 'AC' : 'GT'}
        </span>
      </div>

      <!-- Passage Switcher Tabs -->
      <nav class="passage-tabs" role="tablist">
        ${test.passages.map((p, idx) => `
          <button class="passage-tab-btn ${idx === activePassageIndex ? 'active' : ''}" data-passage-index="${idx}" role="tab">
            <span>Passage ${idx + 1}</span>
          </button>
        `).join('')}
      </nav>

      <!-- Right Header Actions (Timer, Progress, Navigator, Submit) -->
      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <!-- Timer -->
        <div class="timer-pill" id="timer_display" title="Countdown Timer">
          <span id="timer_text">60:00</span>
          ${store.getState().testMode === 'practice' ? `
            <button id="pause_timer_btn" class="btn btn-ghost btn-sm" style="padding: 0 4px; font-size: 11px;">⏸️</button>
          ` : ''}
        </div>

        <!-- Answered Counter -->
        <span id="answered_counter" style="font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); display: none;">
          0/${totalQuestions}
        </span>

        <!-- Navigator Button -->
        <button id="toggle_navigator_btn" class="btn btn-secondary btn-sm" title="Open Question Navigator">
          📋 <span class="hide-mobile">Navigator</span>
        </button>

        <!-- Submit Button -->
        <button id="submit_test_btn" class="btn btn-primary btn-sm">
          ${t('common.submit')}
        </button>
      </div>
    </header>

    <!-- Mobile Passage/Questions Tab Switcher -->
    <div class="mobile-view-tabs show-mobile">
      <button class="mobile-view-tab ${activeViewMobile === 'passage' ? 'active' : ''}" id="mobile_tab_passage">
        📖 Reading Passage
      </button>
      <button class="mobile-view-tab ${activeViewMobile === 'questions' ? 'active' : ''}" id="mobile_tab_questions">
        📝 Questions
      </button>
    </div>

    <!-- Workspace Body (Split 2-Columns) -->
    <div class="workspace-body show-passage" id="workspace_split_body">
      <!-- Left Column: Reading Passage -->
      <div class="workspace-left-pane" id="left_reading_pane">
        <!-- Reading Toolbar -->
        <div class="reading-toolbar">
          <div class="reading-tool-group">
            <span style="font-size: 11px; font-weight: 600; color: var(--text-muted); margin-right: 4px;">Text:</span>
            <button class="btn btn-secondary btn-sm btn-icon-sm" id="btn_font_decrease" title="Smaller font">A-</button>
            <button class="btn btn-secondary btn-sm btn-icon-sm" id="btn_font_increase" title="Larger font">A+</button>
            <button class="btn btn-secondary btn-sm btn-icon-sm" id="btn_font_family" title="Toggle Serif / Sans font" style="font-size: 11px; width: 44px;">
              ${currentFontFamily === 'serif' ? 'Serif' : 'Sans'}
            </button>
          </div>

          <!-- Highlighter Palette -->
          <div class="reading-tool-group">
            <span style="font-size: 11px; font-weight: 600; color: var(--text-muted); margin-right: 4px;">Highlight:</span>
            <button class="hl-btn hl-btn-yellow ${currentHighlightColor === 'yellow' ? 'active' : ''}" data-color="yellow" title="Yellow highlighter"></button>
            <button class="hl-btn hl-btn-green ${currentHighlightColor === 'green' ? 'active' : ''}" data-color="green" title="Green highlighter"></button>
            <button class="hl-btn hl-btn-blue ${currentHighlightColor === 'blue' ? 'active' : ''}" data-color="blue" title="Blue highlighter"></button>
            <button class="hl-btn hl-btn-pink ${currentHighlightColor === 'pink' ? 'active' : ''}" data-color="pink" title="Pink highlighter"></button>
            <button class="btn btn-ghost btn-sm" id="btn_clear_hl" title="Clear All Highlights" style="font-size: 11px; padding: 2px 6px;">
              Clear
            </button>
          </div>

          <!-- Focus Mode Toggle -->
          <div class="reading-tool-group">
            <button class="btn btn-ghost btn-sm" id="btn_focus_mode" title="Toggle Focus Reading Mode" style="font-size: 11px;">
              🔍 Focus Mode
            </button>
          </div>
        </div>

        <!-- Scrollable Passage Content -->
        <div class="passage-scroll-area" id="passage_scroll_area">
          <div class="passage-content" id="passage_content_box">
            <!-- Populated dynamically -->
          </div>
        </div>
      </div>

      <!-- Right Column: Questions & Answer Inputs -->
      <div class="workspace-right-pane" id="right_questions_pane">
        <div class="questions-scroll-area" id="questions_scroll_area">
          <div class="questions-container" id="questions_content_box">
            <!-- Populated dynamically -->
          </div>
        </div>

        <!-- Bottom Navigation Footer -->
        <footer class="workspace-footer">
          <button class="btn btn-secondary btn-sm" id="prev_passage_btn" ${activePassageIndex === 0 ? 'disabled' : ''}>
            &larr; Previous Passage
          </button>
          <div class="autosave-status" id="autosave_status">
            <span>💾</span> <span>Saved</span>
          </div>
          <button class="btn btn-secondary btn-sm" id="next_passage_btn" ${activePassageIndex >= test.passages.length - 1 ? 'disabled' : ''}>
            Next Passage &rarr;
          </button>
        </footer>
      </div>
    </div>
  `;

  // Apply Fullscreen Workspace layout classes to body
  document.body.classList.add('workspace-active');

  // Load Active Passage Content
  function loadPassage(index) {
    activePassageIndex = index;
    store.setActivePassage(index);

    const passage = test.passages[index];
    const passageBox = container.querySelector('#passage_content_box');
    const questionsBox = container.querySelector('#questions_content_box');

    // Update Tab UI
    container.querySelectorAll('.passage-tab-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });

    // Update Prev / Next buttons
    container.querySelector('#prev_passage_btn').disabled = index === 0;
    container.querySelector('#next_passage_btn').disabled = index >= test.passages.length - 1;

    // Apply Typography Preferences
    passageBox.style.fontFamily = currentFontFamily === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)';
    passageBox.style.fontSize = getFontSizeValue(currentFontSize);
    passageBox.style.lineHeight = getLineHeightValue(currentLineHeight);

    // Render Passage Text with Paragraph Tags
    passageBox.innerHTML = `
      <h2 class="passage-title">${passage.title}</h2>
      ${passage.subtitle ? `<div class="passage-subtitle">${passage.subtitle}</div>` : ''}
      ${passage.paragraphs.map(p => `
        <div class="passage-paragraph" id="para_${p.tag}">
          <span class="paragraph-tag">[${p.tag}]</span>
          <span>${p.text}</span>
        </div>
      `).join('')}
    `;

    // Initialize Text Highlighter on the rendered passage
    textHighlighter = new TextHighlighter(passageBox, test.id, index);
    textHighlighter.setColor(currentHighlightColor);

    // Render Questions for this Passage
    questionsBox.innerHTML = '';
    passage.questionGroups.forEach(group => {
      const groupEl = renderQuestionGroup(group, index);
      questionsBox.appendChild(groupEl);
    });

    updateCounters();
  }

  // Update Answered Counters and Badges
  function updateCounters() {
    const state = store.getState();
    const answeredCount = Object.keys(state.userAnswers).filter(k => {
      const val = state.userAnswers[k];
      return val !== undefined && val !== '' && (!Array.isArray(val) || val.length > 0);
    }).length;

    const counter = container.querySelector('#answered_counter');
    if (counter) {
      counter.style.display = 'inline';
      counter.textContent = `${answeredCount}/${totalQuestions} Answered`;
    }
  }

  // Font Size helpers
  function getFontSizeValue(size) {
    switch (size) {
      case 'small': return '0.9375rem';
      case 'large': return '1.1875rem';
      case 'xl': return '1.3125rem';
      default: return '1.0625rem'; // medium
    }
  }

  function getLineHeightValue(lh) {
    switch (lh) {
      case 'normal': return '1.5';
      case 'loose': return '2';
      default: return '1.8'; // relaxed
    }
  }

  // Timer Initialization
  const timerDuration = test.durationMinutes * 60;
  timerService = new TimerService({
    totalSeconds: timerDuration,
    mode: store.getState().testMode,
    storageKey: `readify_timer_${test.id}`,
    onTick: (remaining, formatted) => {
      const timerEl = container.querySelector('#timer_display');
      const textEl = container.querySelector('#timer_text');
      if (textEl) textEl.textContent = formatted;

      if (timerEl) {
        timerEl.classList.toggle('warning', remaining <= 600 && remaining > 300);
        timerEl.classList.toggle('danger', remaining <= 300);
      }
      store.updateTimer(remaining, formatted, timerService.isPaused);
    },
    onWarning: (minsLeft) => {
      store.showToast(`⚠️ Attention: ${minsLeft} minutes remaining!`, 'warning', 5000);
    },
    onExpire: () => {
      store.showToast('⏰ Time is up! Automatically submitting your test.', 'error', 4000);
      submitTest();
    }
  });

  timerService.start();

  // Test Submission Engine
  function submitTest() {
    timerService.stop();
    timerService.clearStorage();

    const answers = store.getState().userAnswers;
    const timeSpent = timerService.getTimeSpent();
    const result = scoreTestSubmission(test, answers);

    // Save Attempt
    const attemptRecord = {
      testId: test.id,
      testTitle: test.title,
      testType: test.type,
      timeSpentSeconds: timeSpent,
      formattedTimeSpent: timerService.formatTimeSpent(),
      totalQuestions: result.totalQuestions,
      correctCount: result.correctCount,
      incorrectCount: result.incorrectCount,
      unansweredCount: result.unansweredCount,
      accuracy: result.accuracy,
      estimatedBand: result.estimatedBand,
      passageBreakdown: result.passageBreakdown,
      typeBreakdown: result.typeBreakdown,
      questionsResults: result.questionsResults
    };

    StorageService.saveAttempt(attemptRecord);
    StorageService.recordWrongAnswers(Object.values(result.questionsResults));
    StorageService.clearActiveSession();

    // Store in state and navigate to Results
    store.setSubmissionResult(attemptRecord);
    cleanup();
    window.location.hash = `#/results/${test.id}`;
  }

  // Confirm Submit Dialog
  function confirmSubmit() {
    const answers = store.getState().userAnswers;
    const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== '' && (!Array.isArray(answers[k]) || answers[k].length > 0)).length;
    const unansweredCount = totalQuestions - answeredCount;

    store.openModal({
      title: t('workspace.confirmSubmitTitle'),
      message: t('workspace.confirmSubmitMsg', { unanswered: unansweredCount }),
      confirmText: 'Yes, Submit Test',
      cancelText: 'Continue Practicing',
      confirmVariant: 'primary',
      onConfirm: () => submitTest()
    });
  }

  // Question Navigator Modal Drawer
  function openNavigatorModal() {
    const answers = store.getState().userAnswers;
    const marked = store.getState().markedQuestions;

    let gridHtml = '';
    test.passages.forEach((p, pIdx) => {
      gridHtml += `<div class="navigator-section-title">Passage ${pIdx + 1}: ${p.title}</div>`;
      gridHtml += '<div class="navigator-grid" style="margin-bottom: var(--space-4);">';

      p.questionGroups.forEach(g => {
        g.questions.forEach(q => {
          const ans = answers[q.id];
          const hasAnswer = ans !== undefined && ans !== '' && (!Array.isArray(ans) || ans.length > 0);
          const isMarked = marked.has(q.id);

          gridHtml += `
            <button class="nav-item ${hasAnswer ? 'answered' : ''} ${isMarked ? 'marked' : ''}" data-nav-passage="${pIdx}" data-nav-qid="${q.id}">
              ${q.number}
            </button>
          `;
        });
      });

      gridHtml += '</div>';
    });

    const legendHtml = `
      <div style="display: flex; gap: var(--space-4); margin-top: var(--space-4); font-size: 11px; color: var(--text-muted); justify-content: center; border-top: 1px solid var(--border-light); padding-top: var(--space-3);">
        <span style="display:flex; align-items:center; gap:4px;">
          <span style="width:10px; height:10px; border-radius:2px; background:var(--status-answered);"></span> Answered
        </span>
        <span style="display:flex; align-items:center; gap:4px;">
          <span style="width:10px; height:10px; border-radius:2px; border:1px solid var(--border-main);"></span> Unanswered
        </span>
        <span style="display:flex; align-items:center; gap:4px;">
          <span style="width:10px; height:10px; border-radius:50%; background:var(--status-marked);"></span> Marked
        </span>
      </div>
    `;

    store.openModal({
      title: 'Question Navigator',
      bodyHtml: gridHtml + legendHtml,
      confirmText: 'Close',
      showCancel: false
    });

    // Attach click listeners to grid items
    setTimeout(() => {
      document.querySelectorAll('[data-nav-qid]').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetPassage = parseInt(btn.dataset.navPassage, 10);
          const targetQId = btn.dataset.navQid;
          store.closeModal();

          if (targetPassage !== activePassageIndex) {
            loadPassage(targetPassage);
          }

          // Switch mobile view to questions if on mobile
          if (window.innerWidth <= 900) {
            activeViewMobile = 'questions';
            container.querySelector('#workspace_split_body').classList.remove('show-passage');
            container.querySelector('#workspace_split_body').classList.add('show-questions');
            container.querySelector('#mobile_tab_passage').classList.remove('active');
            container.querySelector('#mobile_tab_questions').classList.add('active');
          }

          setTimeout(() => {
            const targetEl = document.querySelector(`#q_item_${targetQId}`);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              targetEl.style.backgroundColor = 'var(--color-primary-subtle)';
              setTimeout(() => { targetEl.style.backgroundColor = ''; }, 1500);
            }
          }, 150);
        });
      });
    }, 50);
  }

  // Cleanup helper when leaving Workspace
  function cleanup() {
    if (timerService) timerService.stop();
    document.body.classList.remove('workspace-active');
    document.body.classList.remove('focus-reading-active');
  }

  // --- Attach Workspace Events ---
  // Passage Tabs
  container.querySelectorAll('.passage-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.passageIndex, 10);
      loadPassage(idx);
    });
  });

  // Prev / Next Passage
  container.querySelector('#prev_passage_btn').addEventListener('click', () => {
    if (activePassageIndex > 0) loadPassage(activePassageIndex - 1);
  });
  container.querySelector('#next_passage_btn').addEventListener('click', () => {
    if (activePassageIndex < test.passages.length - 1) loadPassage(activePassageIndex + 1);
  });

  // Submit Button
  container.querySelector('#submit_test_btn').addEventListener('click', confirmSubmit);

  // Navigator Button
  container.querySelector('#toggle_navigator_btn').addEventListener('click', openNavigatorModal);

  // Exit Button
  container.querySelector('#exit_workspace_btn').addEventListener('click', (e) => {
    e.preventDefault();
    store.openModal({
      title: 'Exit Practice Session?',
      message: 'Your answers and progress are automatically saved. You can resume this session anytime from the Dashboard.',
      confirmText: 'Save & Exit',
      cancelText: 'Keep Practicing',
      onConfirm: () => {
        cleanup();
        window.location.hash = '#/dashboard';
      }
    });
  });

  // Pause Button (Practice Mode only)
  const pauseBtn = container.querySelector('#pause_timer_btn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (timerService.isPaused) {
        timerService.resume();
        pauseBtn.textContent = '⏸️';
        store.showToast('Practice resumed', 'info');
      } else {
        timerService.pause();
        pauseBtn.textContent = '▶️';
        store.showToast('Practice paused', 'warning');
      }
    });
  }

  // Mobile View Tabs (Passage vs Questions)
  const mobPassageTab = container.querySelector('#mobile_tab_passage');
  const mobQuestionsTab = container.querySelector('#mobile_tab_questions');
  const splitBody = container.querySelector('#workspace_split_body');

  mobPassageTab?.addEventListener('click', () => {
    activeViewMobile = 'passage';
    mobPassageTab.classList.add('active');
    mobQuestionsTab.classList.remove('active');
    splitBody.classList.remove('show-questions');
    splitBody.classList.add('show-passage');
  });

  mobQuestionsTab?.addEventListener('click', () => {
    activeViewMobile = 'questions';
    mobQuestionsTab.classList.add('active');
    mobPassageTab.classList.remove('active');
    splitBody.classList.remove('show-passage');
    splitBody.classList.add('show-questions');
  });

  // Reading Toolbar Actions: Font size, Family, Highlights, Focus Mode
  container.querySelector('#btn_font_decrease').addEventListener('click', () => {
    if (currentFontSize === 'xl') currentFontSize = 'large';
    else if (currentFontSize === 'large') currentFontSize = 'medium';
    else if (currentFontSize === 'medium') currentFontSize = 'small';
    store.updatePreferences({ fontSize: currentFontSize });
    loadPassage(activePassageIndex);
  });

  container.querySelector('#btn_font_increase').addEventListener('click', () => {
    if (currentFontSize === 'small') currentFontSize = 'medium';
    else if (currentFontSize === 'medium') currentFontSize = 'large';
    else if (currentFontSize === 'large') currentFontSize = 'xl';
    store.updatePreferences({ fontSize: currentFontSize });
    loadPassage(activePassageIndex);
  });

  container.querySelector('#btn_font_family').addEventListener('click', () => {
    currentFontFamily = currentFontFamily === 'serif' ? 'sans' : 'serif';
    container.querySelector('#btn_font_family').textContent = currentFontFamily === 'serif' ? 'Serif' : 'Sans';
    store.updatePreferences({ fontFamily: currentFontFamily });
    loadPassage(activePassageIndex);
  });

  // Highlighting Palette Buttons
  container.querySelectorAll('.hl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHighlightColor = btn.dataset.color;
      if (textHighlighter) textHighlighter.setColor(currentHighlightColor);
    });
  });

  // Clear Highlights
  container.querySelector('#btn_clear_hl').addEventListener('click', () => {
    if (textHighlighter) textHighlighter.clearAllHighlights();
    store.showToast('Highlights cleared', 'info');
  });

  // Mouseup on passage to auto-highlight selected text
  container.querySelector('#passage_scroll_area').addEventListener('mouseup', () => {
    if (textHighlighter) {
      textHighlighter.highlightSelection();
    }
  });

  // Focus Reading Mode
  container.querySelector('#btn_focus_mode').addEventListener('click', () => {
    isFocusMode = !isFocusMode;
    document.body.classList.toggle('focus-reading-active', isFocusMode);
    container.querySelector('#btn_focus_mode').classList.toggle('btn-primary', isFocusMode);
  });

  // Subscribe store changes for counter updates
  store.subscribe((state, event) => {
    if (event === 'answer_updated' || event === 'question_marked') {
      updateCounters();
    }
  });

  // Initial passage render
  loadPassage(activePassageIndex);

  return container;
}
