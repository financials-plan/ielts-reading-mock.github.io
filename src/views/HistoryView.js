// Readify IELTS - Practice History View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { t } from '../state/i18n.js';

export function renderHistoryView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  const attempts = StorageService.getAttempts();

  container.innerHTML = `
    <div style="margin-bottom: var(--space-6);">
      <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
        🕒 ${t('nav.history')}
      </h1>
      <p style="font-size: var(--text-sm); color: var(--text-muted);">
        Review your complete record of IELTS Reading practice sessions and score trajectories.
      </p>
    </div>

    ${attempts.length === 0 ? `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-title">No Practice Attempts Recorded</div>
        <div class="empty-state-text">
          Once you complete and submit an IELTS reading practice test, your scores, completion times, and answer reviews will be safely archived here.
        </div>
        <a href="#/library" class="btn btn-primary btn-sm">Take Your First Test</a>
      </div>
    ` : `
      <div class="card" style="padding: 0; overflow-x: auto;">
        <table class="ielts-table" style="margin: 0; min-width: 600px;">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Test Type</th>
              <th>Date</th>
              <th>Time Taken</th>
              <th>Raw Score</th>
              <th>Accuracy</th>
              <th>Band</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${attempts.map(att => `
              <tr>
                <td><strong>${att.testTitle}</strong></td>
                <td>
                  <span class="badge ${att.testType === 'academic' ? 'badge-primary' : 'badge-accent'}" style="font-size: 10px;">
                    ${att.testType === 'academic' ? 'Academic' : 'General'}
                  </span>
                </td>
                <td>${new Date(att.timestamp).toLocaleDateString()} ${new Date(att.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>${att.formattedTimeSpent || '35m 00s'}</td>
                <td>${att.correctCount} / ${att.totalQuestions}</td>
                <td>
                  <span class="badge ${att.accuracy >= 75 ? 'badge-success' : (att.accuracy >= 50 ? 'badge-warning' : 'badge-danger')}">
                    ${att.accuracy}%
                  </span>
                </td>
                <td>
                  <strong style="color: var(--color-primary); font-size: var(--text-base);">
                    ${att.estimatedBand ? att.estimatedBand.toFixed(1) : '-'}
                  </strong>
                </td>
                <td style="text-align: right; white-space: nowrap;">
                  <a href="#/results/${att.id || att.testId}" class="btn btn-primary btn-sm" style="font-size: 11px;">
                    Results
                  </a>
                  <a href="#/review/${att.testId}" class="btn btn-ghost btn-sm" style="font-size: 11px;">
                    Review
                  </a>
                  <a href="#/workspace/${att.testId}" class="btn btn-secondary btn-sm" style="font-size: 11px;">
                    Retake
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;

  return container;
}
