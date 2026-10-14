// Readify IELTS - Mistakes Bank (Wrong Answers) View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { evaluateAnswer } from '../services/scoringService.js';
import { t } from '../state/i18n.js';

export function renderWrongAnswersView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  let wrongAnswers = StorageService.getWrongAnswers();
  let filterStatus = 'unresolved'; // 'all' | 'unresolved' | 'resolved'
  let searchQuery = '';

  function updateView() {
    wrongAnswers = StorageService.getWrongAnswers();
    const filtered = wrongAnswers.filter(item => {
      if (filterStatus === 'unresolved' && item.status === 'resolved') return false;
      if (filterStatus === 'resolved' && item.status !== 'resolved') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesPrompt = item.prompt.toLowerCase().includes(q);
        const matchesTest = item.testId.toLowerCase().includes(q);
        if (!matchesPrompt && !matchesTest) return false;
      }
      return true;
    });

    const unresolvedCount = wrongAnswers.filter(w => w.status === 'unresolved').length;
    const resolvedCount = wrongAnswers.filter(w => w.status === 'resolved').length;

    container.innerHTML = `
      <div style="margin-bottom: var(--space-6);">
        <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
          🎯 ${t('nav.wrongAnswers')}
        </h1>
        <p style="font-size: var(--text-sm); color: var(--text-muted);">
          Automatically collected incorrect questions from your test attempts to help eliminate repeating errors.
        </p>
      </div>

      <!-- Filter Controls & Search -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-4);">
        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn ${filterStatus === 'unresolved' ? 'btn-danger' : 'btn-secondary'} btn-sm filter-btn" data-status="unresolved">
              Unresolved (${unresolvedCount})
            </button>
            <button class="btn ${filterStatus === 'resolved' ? 'btn-success' : 'btn-secondary'} btn-sm filter-btn" data-status="resolved">
              Resolved (${resolvedCount})
            </button>
            <button class="btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-btn" data-status="all">
              All Mistakes (${wrongAnswers.length})
            </button>
          </div>

          <input type="text" id="mistakes_search" class="form-control" style="max-width: 260px;" placeholder="Search in mistakes..." value="${searchQuery}"/>
        </div>
      </div>

      <!-- Mistakes List -->
      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div class="empty-state-title">
            ${wrongAnswers.length === 0 ? 'No mistakes recorded yet!' : 'No questions in this filter.'}
          </div>
          <div class="empty-state-text">
            ${wrongAnswers.length === 0 ? 'Whenever you take an IELTS practice test, any incorrect answers will be stored here automatically for targeted revision.' : 'Great job! Try taking another test from the library to test your progress.'}
          </div>
          <a href="#/library" class="btn btn-primary btn-sm">Explore Practice Tests</a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${filtered.map(item => `
            <div class="card" style="border-left: 5px solid ${item.status === 'resolved' ? 'var(--color-success)' : 'var(--color-danger)'};">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-2); flex-wrap: wrap; gap: var(--space-2);">
                <div>
                  <span class="badge ${item.status === 'resolved' ? 'badge-success' : 'badge-danger'}">
                    ${item.status === 'resolved' ? '✓ Mastered & Resolved' : '✗ Needs Practice'}
                  </span>
                  <span class="badge badge-subtle" style="font-size: 11px;">
                    Question ${item.questionNumber || ''} • ${item.questionType || 'IELTS Question'}
                  </span>
                  <span class="badge badge-subtle" style="font-size: 11px;">
                    ${item.passageTitle || item.testId}
                  </span>
                </div>

                <div style="display: flex; gap: var(--space-2);">
                  ${item.status !== 'resolved' ? `
                    <button class="btn btn-success btn-sm resolve-btn" data-id="${item.id}">
                      Mark as Resolved
                    </button>
                  ` : ''}
                </div>
              </div>

              <!-- Question Text -->
              <div style="font-size: var(--text-base); font-weight: 600; color: var(--text-main); margin-bottom: var(--space-3); line-height: 1.5;">
                ${item.prompt}
              </div>

              <!-- Comparison -->
              <div class="answers-comparison-box">
                <div class="comparison-col">
                  <div class="comparison-label">Your Previous Answer:</div>
                  <div class="comparison-val wrong-val">${item.lastUserAnswer || 'Skipped'}</div>
                </div>
                <div class="comparison-col">
                  <div class="comparison-label">Correct Answer:</div>
                  <div class="comparison-val correct-val">${item.correctAnswer}</div>
                </div>
              </div>

              <!-- Evidence & Explanation -->
              ${item.evidence ? `
                <div class="evidence-callout" style="margin-top: var(--space-2);">
                  <strong>Evidence:</strong> "${item.evidence}"
                </div>
              ` : ''}

              ${item.explanation ? `
                <div style="font-size: var(--text-xs); color: var(--text-body); margin-top: var(--space-2);">
                  <strong>Explanation:</strong> ${item.explanation}
                </div>
              ` : ''}

              <!-- Interactive Retake Drill Box -->
              <div style="margin-top: var(--space-4); padding-top: var(--space-3); border-top: 1px dashed var(--border-light); display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap;">
                <span style="font-size: var(--text-xs); font-weight: 600; color: var(--text-muted);">
                  Quick Re-test:
                </span>
                <input type="text" class="form-control retest-input" id="retest_${item.id}" style="max-width: 220px;" placeholder="Type answer to test yourself..."/>
                <button class="btn btn-primary btn-sm check-retest-btn" data-id="${item.id}">Check</button>
                <span id="retest_result_${item.id}" style="font-size: var(--text-xs); font-weight: 700;"></span>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    // Rebind Events
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterStatus = btn.dataset.status;
        updateView();
      });
    });

    const searchInp = container.querySelector('#mistakes_search');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updateView();
        const newInp = container.querySelector('#mistakes_search');
        if (newInp) {
          newInp.focus();
          newInp.selectionStart = newInp.selectionEnd = newInp.value.length;
        }
      });
    }

    container.querySelectorAll('.resolve-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        StorageService.resolveWrongAnswer(id);
        store.showToast('Question marked as resolved! Great job! 🎉', 'success');
        updateView();
      });
    });

    // Quick Re-test Verification
    container.querySelectorAll('.check-retest-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const input = container.querySelector(`#retest_${id}`);
        const resultSpan = container.querySelector(`#retest_result_${id}`);
        const item = wrongAnswers.find(w => w.id === id);

        if (input && item && resultSpan) {
          const userVal = input.value.trim();
          const evalRes = evaluateAnswer(userVal, item.correctAnswer, item.questionType || 'short_answer');

          if (evalRes.isCorrect) {
            resultSpan.style.color = 'var(--color-success)';
            resultSpan.textContent = '✓ Correct! You mastered this!';
            StorageService.resolveWrongAnswer(id);
            setTimeout(() => updateView(), 1500);
          } else {
            resultSpan.style.color = 'var(--color-danger)';
            resultSpan.textContent = '✗ Not quite. Try reviewing the evidence again.';
          }
        }
      });
    });
  }

  updateView();
  return container;
}
