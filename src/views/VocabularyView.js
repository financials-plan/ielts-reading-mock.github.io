// Readify IELTS - Vocabulary Notebook View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { vocabularySeeds } from '../data/vocabulary-seeds.js';
import { t } from '../state/i18n.js';

export function renderVocabularyView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  // Seed default academic vocabulary if empty
  let vocabList = StorageService.getVocabulary();
  if (vocabList.length === 0) {
    vocabularySeeds.forEach(item => StorageService.saveVocabularyItem(item));
    vocabList = StorageService.getVocabulary();
  }

  let searchQuery = '';
  let activeFilter = 'all'; // 'all' | 'new' | 'learning' | 'mastered'

  function updateView() {
    vocabList = StorageService.getVocabulary();

    const filtered = vocabList.filter(item => {
      if (activeFilter !== 'all' && item.masteryLevel !== activeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = item.word.toLowerCase().includes(q);
        const matchesVi = (item.definitionVi || '').toLowerCase().includes(q);
        const matchesEn = (item.definitionEn || '').toLowerCase().includes(q);
        if (!matchesWord && !matchesVi && !matchesEn) return false;
      }
      return true;
    });

    container.innerHTML = `
      <div style="margin-bottom: var(--space-6); display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-3);">
        <div>
          <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
            📖 ${t('vocab.title')}
          </h1>
          <p style="font-size: var(--text-sm); color: var(--text-muted);">
            ${t('vocab.subtitle')}
          </p>
        </div>
        <button id="add_word_btn" class="btn btn-primary btn-sm">
          ➕ ${t('vocab.addWordBtn')}
        </button>
      </div>

      <!-- Search & Mastery Filter Toolbar -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-3) var(--space-4);">
        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-vocab-btn" data-filter="all">
              All Words (${vocabList.length})
            </button>
            <button class="btn ${activeFilter === 'new' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-vocab-btn" data-filter="new">
              New (${vocabList.filter(v => v.masteryLevel === 'new').length})
            </button>
            <button class="btn ${activeFilter === 'learning' ? 'btn-accent' : 'btn-secondary'} btn-sm filter-vocab-btn" data-filter="learning">
              Learning (${vocabList.filter(v => v.masteryLevel === 'learning').length})
            </button>
            <button class="btn ${activeFilter === 'mastered' ? 'btn-success' : 'btn-secondary'} btn-sm filter-vocab-btn" data-filter="mastered">
              Mastered (${vocabList.filter(v => v.masteryLevel === 'mastered').length})
            </button>
          </div>

          <input type="text" id="vocab_search_inp" class="form-control" style="max-width: 260px;" placeholder="${t('vocab.searchPlaceholder')}" value="${searchQuery}"/>
        </div>
      </div>

      <!-- Vocabulary Word Cards Grid -->
      ${filtered.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">📖</div>
          <div class="empty-state-title">No vocabulary words found</div>
          <div class="empty-state-text">Try modifying your search or add a new academic word to your notebook.</div>
          <button id="empty_add_word_btn" class="btn btn-primary btn-sm">Add Word</button>
        </div>
      ` : `
        <div class="vocab-grid">
          ${filtered.map(item => `
            <div class="vocab-card">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                  <div>
                    <div class="vocab-word">${item.word}</div>
                    ${item.pronunciation ? `<div class="vocab-pronounce">${item.pronunciation}</div>` : ''}
                  </div>
                  <!-- Mastery Badge (Clickable to cycle) -->
                  <button class="badge ${item.masteryLevel === 'mastered' ? 'badge-success' : (item.masteryLevel === 'learning' ? 'badge-accent' : 'badge-subtle')} cycle-mastery-btn" data-id="${item.id}" style="cursor: pointer; border: none;" title="Click to cycle mastery state">
                    ${item.masteryLevel === 'mastered' ? '✓ Mastered' : (item.masteryLevel === 'learning' ? '⏳ Learning' : '★ New')}
                  </button>
                </div>

                ${item.definitionVi ? `
                  <div class="vocab-vi">
                    🇻🇳 ${item.definitionVi}
                  </div>
                ` : ''}

                ${item.definitionEn ? `
                  <div class="vocab-en">
                    🇬🇧 ${item.definitionEn}
                  </div>
                ` : ''}

                ${item.contextSentence ? `
                  <div class="vocab-context">
                    "${item.contextSentence}"
                  </div>
                ` : ''}
              </div>

              <!-- Footer with source & delete -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-4); padding-top: var(--space-2); border-top: 1px solid var(--border-light); font-size: 11px; color: var(--text-subtle);">
                <span>${item.sourceTest || 'IELTS Reading'}</span>
                <div style="display: flex; gap: var(--space-2);">
                  <button class="btn btn-ghost btn-sm delete-vocab-btn" data-id="${item.id}" style="padding: 0; color: var(--color-danger);" title="Delete word">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;

    // Rebind Events
    container.querySelectorAll('.filter-vocab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        updateView();
      });
    });

    const searchInp = container.querySelector('#vocab_search_inp');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updateView();
        const newInp = container.querySelector('#vocab_search_inp');
        if (newInp) {
          newInp.focus();
          newInp.selectionStart = newInp.selectionEnd = newInp.value.length;
        }
      });
    }

    // Cycle Mastery Button
    container.querySelectorAll('.cycle-mastery-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = vocabList.find(v => v.id === id);
        if (item) {
          const nextLevel = item.masteryLevel === 'new' ? 'learning' : (item.masteryLevel === 'learning' ? 'mastered' : 'new');
          item.masteryLevel = nextLevel;
          StorageService.saveVocabularyItem(item);
          updateView();
        }
      });
    });

    // Delete Button
    container.querySelectorAll('.delete-vocab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        StorageService.deleteVocabularyItem(id);
        store.showToast('Word removed from notebook.', 'info');
        updateView();
      });
    });

    // Add Word Modal
    const openAddModal = () => {
      store.openModal({
        title: 'Add New Vocabulary Word',
        bodyHtml: `
          <div class="form-group">
            <label class="form-label">Word or Phrasal Collocation</label>
            <input type="text" id="new_word_input" class="form-control" placeholder="e.g. Ephemeral" required/>
          </div>
          <div class="form-group">
            <label class="form-label">Pronunciation (Optional)</label>
            <input type="text" id="new_pronounce_input" class="form-control" placeholder="/ɪˈfem.ər.əl/"/>
          </div>
          <div class="form-group">
            <label class="form-label">Vietnamese Meaning (Nghĩa tiếng Việt)</label>
            <input type="text" id="new_vi_input" class="form-control" placeholder="e.g. Phù du, chóng tàn, ngắn ngủi"/>
          </div>
          <div class="form-group">
            <label class="form-label">English Academic Definition</label>
            <textarea id="new_en_input" class="form-control" rows="2" placeholder="Lasting for a very short time..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Context Sentence from Passage</label>
            <textarea id="new_context_input" class="form-control" rows="2" placeholder="Example usage in a sentence..."></textarea>
          </div>
        `,
        confirmText: 'Save Word',
        onConfirm: () => {
          const word = document.querySelector('#new_word_input')?.value.trim();
          const pronunciation = document.querySelector('#new_pronounce_input')?.value.trim();
          const definitionVi = document.querySelector('#new_vi_input')?.value.trim();
          const definitionEn = document.querySelector('#new_en_input')?.value.trim();
          const contextSentence = document.querySelector('#new_context_input')?.value.trim();

          if (word) {
            StorageService.saveVocabularyItem({
              word,
              pronunciation,
              definitionVi,
              definitionEn,
              contextSentence,
              sourceTest: 'Personal Addition',
              masteryLevel: 'new'
            });
            store.showToast(`Saved "${word}" to Vocabulary Notebook! 📖`, 'success');
            updateView();
          }
        }
      });
    };

    container.querySelector('#add_word_btn')?.addEventListener('click', openAddModal);
    container.querySelector('#empty_add_word_btn')?.addEventListener('click', openAddModal);
  }

  updateView();
  return container;
}
