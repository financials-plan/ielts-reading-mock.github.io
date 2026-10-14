// Readify IELTS - Test Details View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { TestService } from '../data/index.js';
import { t } from '../state/i18n.js';

export function renderTestDetailsView(testId) {
  const container = document.createElement('div');
  container.className = 'content-container';

  const test = TestService.getTestById(testId);
  if (!test) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div class="empty-state-title">Test Not Found</div>
        <div class="empty-state-text">The requested IELTS practice test could not be located in our repository.</div>
        <a href="#/library" class="btn btn-primary">${t('common.backToLibrary')}</a>
      </div>
    `;
    return container;
  }

  const activeSession = StorageService.getActiveSession();
  const isThisSessionActive = activeSession && activeSession.testId === test.id;
  const totalQuestions = TestService.getTotalQuestions(test);

  // Collect unique question types
  const qTypes = new Set();
  test.passages.forEach(p => p.questionGroups.forEach(g => qTypes.add(g.questionType)));

  let selectedMode = test.isFullTest ? 'full_test' : 'timed';

  container.innerHTML = `
    <div style="margin-bottom: var(--space-4);">
      <a href="#/library" class="btn btn-ghost btn-sm" style="margin-bottom: var(--space-3); padding-left: 0;">
        &larr; ${t('common.backToLibrary')}
      </a>
      <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-2); align-items: center;">
        <span class="badge ${test.type === 'academic' ? 'badge-primary' : 'badge-accent'}">
          ${test.type === 'academic' ? 'IELTS Academic' : 'IELTS General Training'}
        </span>
        <span class="badge badge-subtle">${test.difficulty.toUpperCase()}</span>
        <span class="badge badge-subtle">⏱️ ${test.durationMinutes} mins</span>
        <span class="badge badge-subtle">❓ ${totalQuestions} Questions</span>
      </div>
      <h1 style="font-size: var(--text-3xl); font-weight: 700; color: var(--text-main); margin-bottom: var(--space-2);">
        ${test.title}
      </h1>
      <p style="font-size: var(--text-base); color: var(--text-muted); max-width: 800px; line-height: 1.6;">
        ${test.description}
      </p>
    </div>

    ${isThisSessionActive ? `
      <div class="card" style="margin-bottom: var(--space-6); background-color: var(--color-accent-light); border-color: var(--color-accent);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <strong>Incomplete Attempt in Progress</strong>
            <div style="font-size: var(--text-xs); color: var(--text-body); margin-top: 2px;">
              You have previously saved ${Object.keys(activeSession.answers || {}).length} answers for this test.
            </div>
          </div>
          <button id="resume_details_btn" class="btn btn-accent btn-sm">Resume This Attempt</button>
        </div>
      </div>
    ` : ''}

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); align-items: start;">
      <!-- Left Column: Test Structure & Passages -->
      <div>
        <!-- Passages Breakdown Card -->
        <div class="card" style="margin-bottom: var(--space-6);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
            Test Structure & Reading Passages
          </h2>

          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${test.passages.map((p, idx) => {
              const pQuestions = p.questionGroups.reduce((sum, g) => sum + g.questions.length, 0);
              return `
                <div style="padding: var(--space-3) var(--space-4); background-color: var(--bg-surface-subtle); border-radius: var(--radius-md); border-left: 4px solid var(--color-primary);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-weight: 700; font-size: var(--text-sm); color: var(--text-main);">
                      Passage ${idx + 1}: ${p.title}
                    </span>
                    <span class="badge badge-subtle">${pQuestions} Qs</span>
                  </div>
                  <div style="font-size: var(--text-xs); color: var(--text-muted); font-style: italic;">
                    ${p.subtitle || ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Question Types Included -->
        <div class="card" style="margin-bottom: var(--space-6);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-3);">
            Question Types Tested
          </h2>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
            ${Array.from(qTypes).map(type => `
              <span class="badge badge-primary" style="font-size: 12px; padding: 4px 10px;">
                ✓ ${formatQuestionTypeName(type)}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Instructions & Tips -->
        <div class="card">
          <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-3);">
            IELTS Reading Guidelines
          </h2>
          <ul style="font-size: var(--text-sm); color: var(--text-body); padding-left: var(--space-5); line-height: 1.8;">
            <li>You will read the passages and answer questions on the split workspace.</li>
            <li>You can highlight text in 4 contrasting colors and attach personal notes.</li>
            <li>Your answers and progress are continuously saved to your browser.</li>
            <li>Detailed answer explanations and exact passage evidence citations will be unlocked immediately upon submission.</li>
          </ul>
        </div>
      </div>

      <!-- Right Column: Mode Selector & Start CTA -->
      <div>
        <div class="card" style="position: sticky; top: 80px; box-shadow: var(--shadow-md);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
            Select Practice Mode
          </h2>

          <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-5);">
            <!-- Mode 1: Practice Mode -->
            <label class="card" style="padding: var(--space-3); cursor: pointer; border: 2px solid var(--border-light);" id="mode_label_practice">
              <div style="display: flex; align-items: flex-start; gap: var(--space-3);">
                <input type="radio" name="practice_mode" value="practice" ${selectedMode === 'practice' ? 'checked' : ''} style="margin-top: 3px;"/>
                <div>
                  <div style="font-weight: 700; font-size: var(--text-sm); color: var(--text-main);">
                    Practice Mode (Untimed)
                  </div>
                  <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">
                    Read at your own pace with pause controls. Ideal for deep learning.
                  </div>
                </div>
              </div>
            </label>

            <!-- Mode 2: Timed Practice -->
            <label class="card" style="padding: var(--space-3); cursor: pointer; border: 2px solid var(--border-light);" id="mode_label_timed">
              <div style="display: flex; align-items: flex-start; gap: var(--space-3);">
                <input type="radio" name="practice_mode" value="timed" ${selectedMode === 'timed' ? 'checked' : ''} style="margin-top: 3px;"/>
                <div>
                  <div style="font-weight: 700; font-size: var(--text-sm); color: var(--text-main);">
                    Timed Practice (${test.durationMinutes} mins)
                  </div>
                  <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">
                    Countdown timer with warning alerts to train reading pacing.
                  </div>
                </div>
              </div>
            </label>

            <!-- Mode 3: Full Test Simulation -->
            <label class="card" style="padding: var(--space-3); cursor: pointer; border: 2px solid var(--border-light);" id="mode_label_full">
              <div style="display: flex; align-items: flex-start; gap: var(--space-3);">
                <input type="radio" name="practice_mode" value="full_test" ${selectedMode === 'full_test' ? 'checked' : ''} style="margin-top: 3px;"/>
                <div>
                  <div style="font-weight: 700; font-size: var(--text-sm); color: var(--text-main);">
                    Full Exam Simulation (Strict 60m)
                  </div>
                  <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">
                    No pausing allowed. Automatic submission when time reaches 00:00.
                  </div>
                </div>
              </div>
            </label>
          </div>

          <button id="start_test_btn" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: var(--space-2);">
            🚀 Start Practice Now
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  const radios = container.querySelectorAll('input[name="practice_mode"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      selectedMode = radio.value;
      container.querySelectorAll('input[name="practice_mode"]').forEach(r => {
        const parentCard = r.closest('.card');
        if (parentCard) {
          parentCard.style.borderColor = r.checked ? 'var(--color-primary)' : 'var(--border-light)';
          parentCard.style.backgroundColor = r.checked ? 'var(--color-primary-subtle)' : 'var(--bg-surface)';
        }
      });
    });
  });

  // Initial highlight of selected mode card
  radios.forEach(r => {
    if (r.checked) {
      const parent = r.closest('.card');
      if (parent) {
        parent.style.borderColor = 'var(--color-primary)';
        parent.style.backgroundColor = 'var(--color-primary-subtle)';
      }
    }
  });

  const startAction = () => {
    store.startTest(test, selectedMode);
    window.location.hash = `#/workspace/${test.id}`;
  };

  container.querySelector('#start_test_btn').addEventListener('click', startAction);

  const resumeBtn = container.querySelector('#resume_details_btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      store.startTest(test, activeSession.mode, activeSession.answers, activeSession.marked);
      store.setActivePassage(activeSession.activePassageIndex || 0);
      window.location.hash = `#/workspace/${test.id}`;
    });
  }

  return container;
}

function formatQuestionTypeName(type) {
  switch (type) {
    case 'mcq': return 'Multiple Choice';
    case 'mcq_multi': return 'Multiple Choice (Multi-select)';
    case 'tfng': return 'True / False / Not Given';
    case 'ynng': return 'Yes / No / Not Given';
    case 'matching_headings': return 'Matching Headings';
    case 'matching_info': return 'Matching Information';
    case 'matching_features': return 'Matching Features';
    case 'matching_endings': return 'Matching Sentence Endings';
    case 'completion_sentence': return 'Sentence Completion';
    case 'completion_summary': return 'Summary Completion';
    case 'completion_note': return 'Note Completion';
    case 'completion_table': return 'Table Completion';
    case 'completion_flowchart': return 'Flow-chart Completion';
    case 'diagram_label': return 'Diagram Label Completion';
    case 'short_answer': return 'Short-answer Questions';
    default: return type;
  }
}
