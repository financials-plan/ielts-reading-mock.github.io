// Readify IELTS - Saved Questions View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { t } from '../state/i18n.js';

export function renderSavedQuestionsView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  let savedQuestions = StorageService.getSavedQuestions();
  let searchQuery = '';

  function updateView() {
    savedQuestions = StorageService.getSavedQuestions();
    const filtered = savedQuestions.filter(q => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesPrompt = q.prompt.toLowerCase().includes(query);
        const matchesTest = (q.testTitle || '').toLowerCase().includes(query);
        return matchesPrompt || matchesTest;
      }
      return true;
    });

    container.innerHTML = `
      <div style="margin-bottom: var(--space-6);">
        <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
          ⭐ ${t('nav.savedQuestions')}
        </h1>
        <p style="font-size: var(--text-sm); color: var(--text-muted);">
          Your curated collection of challenging questions, saved for revision and personal note-taking.
        </p>
      </div>

      <!-- Search Toolbar -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-3) var(--space-4);">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); flex-wrap: wrap;">
          <input type="text" id="saved_search" class="form-control" style="max-width: 300px;" placeholder="Search saved questions..." value="${searchQuery}"/>
          <span style="font-size: var(--text-xs); color: var(--text-muted);">
            Total Saved: <strong>${savedQuestions.length}</strong>
          </span>
        </div>
      </div>

      <!-- Cards Grid -->
      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">⭐</div>
          <div class="empty-state-title">
            ${savedQuestions.length === 0 ? 'No Saved Questions Yet' : 'No questions match your search'}
          </div>
          <div class="empty-state-text">
            While taking practice tests or reviewing answers, click the "Save Question" button to bookmark difficult questions here for revision.
          </div>
          <a href="#/library" class="btn btn-primary btn-sm">Explore Practice Library</a>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${filtered.map(q => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-2); gap: var(--space-2);">
                <div>
                  <span class="badge badge-accent">Question ${q.number || ''}</span>
                  <span class="badge badge-subtle">${q.testTitle || 'IELTS Test'}</span>
                </div>
                <button class="btn btn-ghost btn-sm remove-saved-btn" data-id="${q.id}" title="Remove from saved">
                  ✕ Remove
                </button>
              </div>

              <div style="font-size: var(--text-base); font-weight: 600; color: var(--text-main); margin-bottom: var(--space-3); line-height: 1.5;">
                ${q.prompt}
              </div>

              <div class="answers-comparison-box">
                <div class="comparison-col">
                  <div class="comparison-label">Correct Answer:</div>
                  <div class="comparison-val correct-val">${q.correctAnswer}</div>
                </div>
              </div>

              ${q.evidence ? `
                <div class="evidence-callout">
                  <strong>Evidence in Passage (${q.evidenceParagraph || ''}):</strong> "${q.evidence}"
                </div>
              ` : ''}

              ${q.explanation ? `
                <div style="font-size: var(--text-xs); color: var(--text-body); margin-top: var(--space-2);">
                  <strong>Explanation:</strong> ${q.explanation}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}
    `;

    // Search input handler
    const searchInp = container.querySelector('#saved_search');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updateView();
        const newInp = container.querySelector('#saved_search');
        if (newInp) {
          newInp.focus();
          newInp.selectionStart = newInp.selectionEnd = newInp.value.length;
        }
      });
    }

    // Remove buttons
    container.querySelectorAll('.remove-saved-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const qItem = savedQuestions.find(q => q.id === id);
        if (qItem) {
          StorageService.toggleSaveQuestion(qItem);
          store.showToast('Question removed from saved list.', 'info');
          updateView();
        }
      });
    });
  }

  updateView();
  return container;
}
