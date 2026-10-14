// Readify IELTS - Detailed Answer Review View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { TestService } from '../data/index.js';
import { t } from '../state/i18n.js';

export function renderAnswerReviewView(testId, initialFilter = 'all') {
  const container = document.createElement('div');
  container.className = 'content-container';

  let attempt = store.getState().lastSubmissionResult;
  if (!attempt) {
    const attempts = StorageService.getAttempts();
    attempt = attempts.find(a => a.testId === testId || a.id === testId);
  }

  if (!attempt || !attempt.questionsResults) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-title">No Review Data Found</div>
        <div class="empty-state-text">Please complete and submit the test first to unlock detailed explanations.</div>
        <a href="#/library" class="btn btn-primary">${t('common.backToLibrary')}</a>
      </div>
    `;
    return container;
  }

  let activeFilter = initialFilter; // 'all' | 'incorrect' | 'unanswered' | 'saved'

  function updateList() {
    const questions = Object.values(attempt.questionsResults);
    const saved = StorageService.getSavedQuestions();

    const filtered = questions.filter(q => {
      if (activeFilter === 'incorrect') return q.status === 'incorrect';
      if (activeFilter === 'unanswered') return q.status === 'unanswered';
      if (activeFilter === 'saved') return saved.some(s => s.id === q.id);
      return true;
    });

    container.innerHTML = `
      <!-- Review Header & Breadcrumb -->
      <div style="margin-bottom: var(--space-6);">
        <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-2);">
          <a href="#/results/${attempt.testId}" class="btn btn-ghost btn-sm" style="padding-left: 0;">
            &larr; Back to Results
          </a>
        </div>
        <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
          ${t('review.title')}
        </h1>
        <p style="font-size: var(--text-sm); color: var(--text-muted);">
          ${attempt.testTitle} • Total ${questions.length} questions
        </p>
      </div>

      <!-- Filter Tabs Bar -->
      <div class="tab-list" style="margin-bottom: var(--space-6);">
        <button class="tab-item ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
          All Questions (${questions.length})
        </button>
        <button class="tab-item ${activeFilter === 'incorrect' ? 'active' : ''}" data-filter="incorrect">
          Incorrect Only (${attempt.incorrectCount})
        </button>
        <button class="tab-item ${activeFilter === 'unanswered' ? 'active' : ''}" data-filter="unanswered">
          Unanswered (${attempt.unansweredCount})
        </button>
        <button class="tab-item ${activeFilter === 'saved' ? 'active' : ''}" data-filter="saved">
          Saved Questions (${saved.length})
        </button>
      </div>

      <!-- Question Cards List -->
      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div class="empty-state-title">No questions in this filter</div>
          <div class="empty-state-text">You have no questions matching the current review filter.</div>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${filtered.map(q => {
            const isCorrect = q.status === 'correct';
            const isUnanswered = q.status === 'unanswered';
            const isSaved = saved.some(s => s.id === q.id);

            return `
              <div class="review-item-card ${isCorrect ? 'is-correct' : (isUnanswered ? 'is-unanswered' : 'is-incorrect')}">
                <!-- Review Card Header -->
                <div class="review-header-bar">
                  <div style="display: flex; align-items: center; gap: var(--space-2);">
                    <span class="question-number-badge ${isCorrect ? 'answered' : ''}">
                      ${q.number}
                    </span>
                    <span class="badge ${isCorrect ? 'badge-success' : (isUnanswered ? 'badge-warning' : 'badge-danger')}">
                      ${isCorrect ? '✓ Correct' : (isUnanswered ? '○ Unanswered' : '✗ Incorrect')}
                    </span>
                    <span class="badge badge-subtle" style="font-size: 11px;">
                      ${q.passageTitle || `Passage ${q.passageIndex + 1}`}
                    </span>
                  </div>

                  <div style="display: flex; gap: var(--space-2);">
                    <!-- Bookmark Question -->
                    <button class="btn btn-ghost btn-sm save-q-btn" data-qid="${q.id}" title="${isSaved ? 'Remove from Saved' : 'Save Question'}">
                      <span>${isSaved ? '⭐ Saved' : '☆ Save'}</span>
                    </button>
                    <!-- Add to Vocab -->
                    <button class="btn btn-ghost btn-sm add-vocab-btn" data-qid="${q.id}" title="Add term to Vocabulary Notebook">
                      <span>📖 Vocab</span>
                    </button>
                  </div>
                </div>

                <!-- Question Prompt -->
                <div style="font-size: var(--text-base); font-weight: 600; color: var(--text-main); margin-bottom: var(--space-3); line-height: 1.5;">
                  ${q.prompt}
                </div>

                <!-- Answer Comparison Box -->
                <div class="answers-comparison-box">
                  <div class="comparison-col">
                    <div class="comparison-label">${t('review.yourAnswer')}</div>
                    <div class="comparison-val ${isCorrect ? 'correct-val' : 'wrong-val'}">
                      ${q.userAnswer ? q.userAnswer : '<em style="color:var(--text-subtle);">No answer entered</em>'}
                    </div>
                  </div>
                  <div class="comparison-col">
                    <div class="comparison-label">${t('review.correctAnswer')}</div>
                    <div class="comparison-val correct-val">
                      ${q.correctAnswer}
                    </div>
                  </div>
                </div>

                <!-- Evidence in Passage Callout -->
                ${q.evidence ? `
                  <div class="evidence-callout">
                    <div class="evidence-header">
                      <span>📍 ${t('common.evidence')} (${q.evidenceParagraph || 'In Passage'})</span>
                    </div>
                    <div class="evidence-quote">
                      "${q.evidence}"
                    </div>
                  </div>
                ` : ''}

                <!-- Rationale & Explanation -->
                ${q.explanation ? `
                  <div class="explanation-box">
                    <strong>💡 ${t('common.explanation')}:</strong> ${q.explanation}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;

    // Attach Event Handlers
    container.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        activeFilter = tab.dataset.filter;
        updateList();
      });
    });

    // Save Question Button
    container.querySelectorAll('.save-q-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.qid;
        const qData = attempt.questionsResults[qId];
        if (qData) {
          const added = StorageService.toggleSaveQuestion({
            id: qData.id,
            testId: attempt.testId,
            testTitle: attempt.testTitle,
            number: qData.number,
            prompt: qData.prompt,
            correctAnswer: qData.correctAnswer,
            explanation: qData.explanation,
            evidence: qData.evidence,
            evidenceParagraph: qData.evidenceParagraph
          });

          store.showToast(added ? 'Question saved to your collection! ⭐' : 'Question removed from saved list.', 'info');
          updateList();
        }
      });
    });

    // Add to Vocab Button
    container.querySelectorAll('.add-vocab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.qid;
        const qData = attempt.questionsResults[qId];
        openAddVocabModal(qData);
      });
    });
  }

  function openAddVocabModal(qData) {
    store.openModal({
      title: 'Add Term to Vocabulary Notebook',
      bodyHtml: `
        <div class="form-group">
          <label class="form-label">Word / Academic Collocation</label>
          <input type="text" id="vocab_word_input" class="form-control" placeholder="e.g. Syntactic Displacement" value=""/>
        </div>
        <div class="form-group">
          <label class="form-label">Phonetic / Pronunciation (Optional)</label>
          <input type="text" id="vocab_pronounce_input" class="form-control" placeholder="/.../"/>
        </div>
        <div class="form-group">
          <label class="form-label">Vietnamese Meaning (Nghĩa tiếng Việt)</label>
          <input type="text" id="vocab_vi_input" class="form-control" placeholder="e.g. Tính tách rời về cú pháp"/>
        </div>
        <div class="form-group">
          <label class="form-label">English Definition</label>
          <textarea id="vocab_en_input" class="form-control" rows="2" placeholder="Definition in English..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Context Sentence (Trích đoạn)</label>
          <textarea id="vocab_context_input" class="form-control" rows="2">${qData ? qData.evidence || '' : ''}</textarea>
        </div>
      `,
      confirmText: 'Save Word',
      confirmVariant: 'primary',
      onConfirm: () => {
        const word = document.querySelector('#vocab_word_input')?.value.trim();
        const pronunciation = document.querySelector('#vocab_pronounce_input')?.value.trim();
        const definitionVi = document.querySelector('#vocab_vi_input')?.value.trim();
        const definitionEn = document.querySelector('#vocab_en_input')?.value.trim();
        const contextSentence = document.querySelector('#vocab_context_input')?.value.trim();

        if (word) {
          StorageService.saveVocabularyItem({
            word,
            pronunciation,
            definitionVi,
            definitionEn,
            contextSentence,
            sourceTest: attempt.testTitle
          });
          store.showToast(`Saved "${word}" to Vocabulary Notebook! 📖`, 'success');
        }
      }
    });
  }

  updateList();
  return container;
}
