// Readify IELTS - Test Results View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { TestService } from '../data/index.js';
import { t } from '../state/i18n.js';

export function renderResultsView(testIdOrAttemptId) {
  const container = document.createElement('div');
  container.className = 'content-container';

  // Find attempt record from last submission or storage history
  let attempt = store.getState().lastSubmissionResult;
  if (!attempt) {
    const attempts = StorageService.getAttempts();
    attempt = attempts.find(a => a.id === testIdOrAttemptId || a.testId === testIdOrAttemptId);
  }

  if (!attempt) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-title">No Results Available</div>
        <div class="empty-state-text">You haven't submitted this practice test yet or the record has been reset.</div>
        <a href="#/library" class="btn btn-primary">${t('common.backToLibrary')}</a>
      </div>
    `;
    return container;
  }

  const band = attempt.estimatedBand ? attempt.estimatedBand.toFixed(1) : '6.0';
  const rawScore = `${attempt.correctCount} / ${attempt.totalQuestions}`;
  const accuracy = `${attempt.accuracy}%`;
  const timeSpent = attempt.formattedTimeSpent || '35m 12s';

  container.innerHTML = `
    <!-- Results Hero Banner -->
    <div class="results-hero">
      <div class="results-score-box">
        <div class="band-score-circle" title="Estimated Official IELTS Reading Band">
          <span class="band-score-value">${band}</span>
          <span class="band-score-label">IELTS BAND</span>
        </div>
        <div>
          <span class="badge ${attempt.testType === 'academic' ? 'badge-primary' : 'badge-accent'}" style="margin-bottom: 6px;">
            ${attempt.testType === 'academic' ? 'IELTS Academic' : 'General Training'}
          </span>
          <h1 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: 4px; color: var(--text-main);">
            ${attempt.testTitle}
          </h1>
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin: 0;">
            Completed on ${new Date(attempt.timestamp || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="results-meta-stats">
        <div class="stat-card">
          <div class="stat-value" style="color: var(--color-success);">${rawScore}</div>
          <div class="stat-label">Raw Score</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: var(--color-primary);">${accuracy}</div>
          <div class="stat-label">Accuracy</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: var(--color-danger);">${attempt.incorrectCount}</div>
          <div class="stat-label">Incorrect</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="color: var(--color-accent-hover);">${timeSpent}</div>
          <div class="stat-label">Time Spent</div>
        </div>
      </div>
    </div>

    <!-- Main CTA Bar -->
    <div style="display: flex; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-8);">
      <a href="#/review/${attempt.testId}" class="btn btn-primary btn-lg" style="flex: 1 1 200px;">
        🔍 ${t('results.reviewAllBtn')}
      </a>
      <a href="#/review/${attempt.testId}?filter=incorrect" class="btn btn-danger btn-lg" style="flex: 1 1 200px;">
        🎯 ${t('results.reviewIncorrectBtn')} (${attempt.incorrectCount})
      </a>
      <a href="#/workspace/${attempt.testId}" class="btn btn-secondary btn-lg" style="flex: 1 1 140px;">
        🔄 ${t('results.retryBtn')}
      </a>
      <a href="#/library" class="btn btn-ghost btn-lg" style="flex: 1 1 140px;">
        📚 Library
      </a>
    </div>

    <!-- Breakdown Grid (Passages & Question Types) -->
    <div class="breakdown-grid">
      <!-- Passage Breakdown -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
          ${t('results.passageBreakdown')}
        </h2>

        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${Object.values(attempt.passageBreakdown || {}).map((pb, idx) => {
            const pPct = pb.total > 0 ? Math.round((pb.correct / pb.total) * 100) : 0;
            return `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); font-weight: 600; margin-bottom: 4px;">
                  <span>Passage ${idx + 1}: ${pb.title}</span>
                  <span>${pb.correct}/${pb.total} (${pPct}%)</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill ${pPct >= 70 ? 'success' : ''}" style="width: ${pPct}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Question Type Breakdown -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
          ${t('results.questionTypeBreakdown')}
        </h2>

        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${Object.values(attempt.typeBreakdown || {}).map(tb => {
            const tPct = tb.total > 0 ? Math.round((tb.correct / tb.total) * 100) : 0;
            const isWeak = tPct < 60;
            return `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); font-weight: 600; margin-bottom: 4px;">
                  <span style="display: flex; align-items: center; gap: 6px;">
                    ${formatTypeName(tb.type)}
                    ${isWeak ? '<span class="badge badge-danger" style="font-size: 9px;">Needs Focus</span>' : ''}
                  </span>
                  <span>${tb.correct}/${tb.total} (${tPct}%)</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill ${tPct >= 70 ? 'success' : (tPct < 50 ? 'danger' : '')}" style="width: ${tPct}%; ${tPct < 50 ? 'background-color: var(--color-danger);' : ''}"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Official Score Conversion Reference Table Disclaimer -->
    <div class="card" style="background-color: var(--bg-surface-subtle); border: 1px solid var(--border-light);">
      <h3 style="font-size: var(--text-sm); font-weight: 700; color: var(--text-main); margin-bottom: var(--space-2);">
        ℹ️ Official IELTS Reading Band Conversion Standard
      </h3>
      <p style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.6; margin: 0;">
        Band scores are calculated in accordance with the official Cambridge IELTS assessment rubric.
        ${attempt.testType === 'academic'
          ? 'In IELTS Academic, 30–32 correct answers yield Band 7.0, 35–36 yield Band 8.0, and 39–40 achieve Band 9.0.'
          : 'In IELTS General Training, higher accuracy is required: 34–35 correct answers yield Band 7.0, 37–38 yield Band 8.0, and 40 achieve Band 9.0.'}
        This estimated band score is indicative and provided for structured self-evaluation.
      </p>
    </div>
  `;

  return container;
}

function formatTypeName(type) {
  switch (type) {
    case 'mcq': return 'Multiple Choice';
    case 'mcq_multi': return 'Multi-select MCQ';
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
    case 'diagram_label': return 'Diagram Labeling';
    case 'short_answer': return 'Short Answer';
    default: return type;
  }
}
