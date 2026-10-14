// Readify IELTS - Practice Library View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { TestService } from '../data/index.js';
import { t } from '../state/i18n.js';

export function renderLibraryView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  let activeFilters = {
    query: '',
    type: 'all',
    difficulty: 'all',
    topic: 'all',
    status: 'all',
    sort: 'default'
  };

  function updateView() {
    const attempts = StorageService.getAttempts();
    let tests = TestService.filterTests({
      type: activeFilters.type,
      difficulty: activeFilters.difficulty,
      topic: activeFilters.topic,
      query: activeFilters.query,
      status: activeFilters.status,
      attempts
    });

    // Sorting
    if (activeFilters.sort === 'duration_asc') {
      tests.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (activeFilters.sort === 'duration_desc') {
      tests.sort((a, b) => b.durationMinutes - a.durationMinutes);
    } else if (activeFilters.sort === 'title') {
      tests.sort((a, b) => a.title.localeCompare(b.title));
    }

    container.innerHTML = `
      <div style="margin-bottom: var(--space-6);">
        <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: var(--space-1);">
          ${t('library.title')}
        </h1>
        <p style="font-size: var(--text-sm); color: var(--text-muted);">
          ${t('library.subtitle')}
        </p>
      </div>

      <!-- Search & Filters Toolbar -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-4);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-3);">
          <!-- Search -->
          <div style="grid-column: 1 / -1;">
            <input type="text" id="lib_search_input" class="form-control" placeholder="${t('library.searchPlaceholder')}" value="${activeFilters.query}"/>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="form-label" style="font-size:11px;">${t('library.filterType')}</label>
            <select id="lib_type_select" class="form-select">
              <option value="all" ${activeFilters.type === 'all' ? 'selected' : ''}>All Types</option>
              <option value="academic" ${activeFilters.type === 'academic' ? 'selected' : ''}>${t('library.academic')}</option>
              <option value="general" ${activeFilters.type === 'general' ? 'selected' : ''}>${t('library.general')}</option>
            </select>
          </div>

          <!-- Difficulty Filter -->
          <div>
            <label class="form-label" style="font-size:11px;">${t('library.filterDifficulty')}</label>
            <select id="lib_diff_select" class="form-select">
              <option value="all" ${activeFilters.difficulty === 'all' ? 'selected' : ''}>All Difficulties</option>
              <option value="easy" ${activeFilters.difficulty === 'easy' ? 'selected' : ''}>${t('library.easy')}</option>
              <option value="medium" ${activeFilters.difficulty === 'medium' ? 'selected' : ''}>${t('library.medium')}</option>
              <option value="hard" ${activeFilters.difficulty === 'hard' ? 'selected' : ''}>${t('library.hard')}</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="form-label" style="font-size:11px;">${t('library.filterStatus')}</label>
            <select id="lib_status_select" class="form-select">
              <option value="all" ${activeFilters.status === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="not_started" ${activeFilters.status === 'not_started' ? 'selected' : ''}>${t('library.notStarted')}</option>
              <option value="completed" ${activeFilters.status === 'completed' ? 'selected' : ''}>${t('library.completed')}</option>
            </select>
          </div>

          <!-- Sort Filter -->
          <div>
            <label class="form-label" style="font-size:11px;">${t('library.sort')}</label>
            <select id="lib_sort_select" class="form-select">
              <option value="default" ${activeFilters.sort === 'default' ? 'selected' : ''}>Recommended</option>
              <option value="duration_asc" ${activeFilters.sort === 'duration_asc' ? 'selected' : ''}>Duration (Shortest first)</option>
              <option value="duration_desc" ${activeFilters.sort === 'duration_desc' ? 'selected' : ''}>Duration (Longest first)</option>
              <option value="title" ${activeFilters.sort === 'title' ? 'selected' : ''}>Title (A–Z)</option>
            </select>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: var(--space-2); margin-top: var(--space-2);">
          <span style="font-size: var(--text-xs); color: var(--text-muted);">
            Showing <strong>${tests.length}</strong> practice tests
          </span>
          <button id="lib_reset_btn" class="btn btn-ghost btn-sm" style="font-size: 11px;">
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Tests Cards Grid -->
      ${tests.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">No tests match your filters</div>
          <div class="empty-state-text">Try adjusting your search query, difficulty, or test type selection.</div>
          <button id="empty_reset_btn" class="btn btn-primary btn-sm">Reset Filters</button>
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: var(--space-5);">
          ${tests.map(test => {
            const hasCompleted = attempts.some(a => a.testId === test.id);
            const totalQuestions = TestService.getTotalQuestions(test);
            return `
              <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
                    <span class="badge ${test.type === 'academic' ? 'badge-primary' : 'badge-accent'}">
                      ${test.type === 'academic' ? 'IELTS Academic' : 'General Training'}
                    </span>
                    <div style="display: flex; gap: 4px;">
                      <span class="badge badge-subtle">${test.difficulty.toUpperCase()}</span>
                      ${hasCompleted ? '<span class="badge badge-success">Completed</span>' : ''}
                    </div>
                  </div>

                  <h3 style="font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-2); color: var(--text-main); line-height: 1.4;">
                    ${test.title}
                  </h3>

                  <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-4); line-height: 1.6;">
                    ${test.description}
                  </p>

                  <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4);">
                    <span class="badge badge-subtle" style="font-size: 11px;">
                      📄 ${test.passages.length} ${test.passages.length === 1 ? 'Passage' : 'Passages'}
                    </span>
                    <span class="badge badge-subtle" style="font-size: 11px;">
                      ❓ ${totalQuestions} Questions
                    </span>
                    <span class="badge badge-subtle" style="font-size: 11px;">
                      ⏱️ ${test.durationMinutes} mins
                    </span>
                  </div>
                </div>

                <div class="card-footer" style="padding-top: var(--space-3); margin-top: 0; gap: var(--space-2);">
                  <a href="#/details/${test.id}" class="btn btn-secondary btn-sm" style="flex: 1;">
                    ${t('common.viewDetails')}
                  </a>
                  <a href="#/workspace/${test.id}" class="btn btn-primary btn-sm" style="flex: 1;">
                    ${hasCompleted ? t('common.retry') : t('common.start')}
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;

    // Rebind event listeners
    const searchInput = container.querySelector('#lib_search_input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeFilters.query = e.target.value;
        updateView();
        // Restore focus to input
        const newInp = container.querySelector('#lib_search_input');
        if (newInp) {
          newInp.focus();
          newInp.selectionStart = newInp.selectionEnd = newInp.value.length;
        }
      });
    }

    container.querySelector('#lib_type_select')?.addEventListener('change', (e) => {
      activeFilters.type = e.target.value;
      updateView();
    });

    container.querySelector('#lib_diff_select')?.addEventListener('change', (e) => {
      activeFilters.difficulty = e.target.value;
      updateView();
    });

    container.querySelector('#lib_status_select')?.addEventListener('change', (e) => {
      activeFilters.status = e.target.value;
      updateView();
    });

    container.querySelector('#lib_sort_select')?.addEventListener('change', (e) => {
      activeFilters.sort = e.target.value;
      updateView();
    });

    const resetAction = () => {
      activeFilters = { query: '', type: 'all', difficulty: 'all', topic: 'all', status: 'all', sort: 'default' };
      updateView();
    };

    container.querySelector('#lib_reset_btn')?.addEventListener('click', resetAction);
    container.querySelector('#empty_reset_btn')?.addEventListener('click', resetAction);
  }

  updateView();
  return container;
}
