// Readify IELTS - Progress Analytics View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { t } from '../state/i18n.js';

export function renderAnalyticsView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  const attempts = StorageService.getAttempts();
  const goals = store.getState().goals;

  const totalAttempts = attempts.length;
  const avgAccuracy = totalAttempts > 0
    ? Math.round(attempts.reduce((sum, a) => sum + (a.accuracy || 0), 0) / totalAttempts)
    : 0;
  const avgBand = totalAttempts > 0
    ? (attempts.reduce((sum, a) => sum + (a.estimatedBand || 6.0), 0) / totalAttempts).toFixed(1)
    : '0.0';

  // Aggregate stats by Question Type across all attempts
  const typeStats = {};
  attempts.forEach(att => {
    if (att.typeBreakdown) {
      Object.values(att.typeBreakdown).forEach(tb => {
        if (!typeStats[tb.type]) {
          typeStats[tb.type] = { total: 0, correct: 0 };
        }
        typeStats[tb.type].total += tb.total;
        typeStats[tb.type].correct += tb.correct;
      });
    }
  });

  const sortedTypes = Object.entries(typeStats).map(([type, stats]) => {
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return { type, total: stats.total, correct: stats.correct, pct };
  }).sort((a, b) => b.pct - a.pct);

  const bestType = sortedTypes.length > 0 ? sortedTypes[0] : null;
  const weakType = sortedTypes.length > 1 ? sortedTypes[sortedTypes.length - 1] : null;

  container.innerHTML = `
    <div style="margin-bottom: var(--space-6);">
      <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
        📈 ${t('nav.analytics')}
      </h1>
      <p style="font-size: var(--text-sm); color: var(--text-muted);">
        Comprehensive diagnostic metrics, question type breakdowns, and band progress trajectories.
      </p>
    </div>

    <!-- Analytics Hero Metrics -->
    <div class="results-meta-stats" style="margin-bottom: var(--space-6);">
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-primary);">${avgBand}</div>
        <div class="stat-label">Average Band</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-success);">${avgAccuracy}%</div>
        <div class="stat-label">Average Accuracy</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-accent-hover);">${goals.targetBand.toFixed(1)}</div>
        <div class="stat-label">Target Band Goal</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-info);">${totalAttempts}</div>
        <div class="stat-label">Tests Completed</div>
      </div>
    </div>

    ${totalAttempts === 0 ? `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div class="empty-state-title">No Performance Data Yet</div>
        <div class="empty-state-text">
          Once you complete practice tests, interactive charts and strength/weakness evaluations by question type will automatically populate here.
        </div>
        <a href="#/library" class="btn btn-primary btn-sm">Start a Practice Test</a>
      </div>
    ` : `
      <!-- Charts & Breakdown Grid -->
      <div class="breakdown-grid" style="margin-bottom: var(--space-6);">
        <!-- Band Score Trajectory SVG Chart -->
        <div class="card">
          <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
            Band Score Trajectory (Past Attempts)
          </h2>
          <div style="width: 100%; height: 200px; display: flex; align-items: flex-end; gap: var(--space-3); padding-top: var(--space-4); border-bottom: 2px solid var(--border-light); position: relative;">
            ${attempts.slice(0, 10).reverse().map((att, idx) => {
              const bandVal = att.estimatedBand || 6.0;
              const heightPct = Math.min(100, Math.max(15, (bandVal / 9.0) * 100));
              return `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;" title="${att.testTitle}: Band ${bandVal.toFixed(1)}">
                  <span style="font-size: 10px; font-weight: 700; color: var(--color-primary); margin-bottom: 4px;">
                    ${bandVal.toFixed(1)}
                  </span>
                  <div style="width: 100%; max-width: 36px; height: ${heightPct}%; background: linear-gradient(180deg, var(--color-primary), var(--color-primary-hover)); border-top-left-radius: 4px; border-top-right-radius: 4px;"></div>
                  <span style="font-size: 9px; color: var(--text-subtle); margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 36px;">
                    #${idx + 1}
                  </span>
                </div>
              `;
            }).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 8px;">
            <span>Oldest Attempt</span>
            <span>Target Goal: Band ${goals.targetBand.toFixed(1)}</span>
            <span>Latest Attempt</span>
          </div>
        </div>

        <!-- Strongest & Weakest Diagnostic Summary -->
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
              Skill Diagnostic Overview
            </h2>

            ${bestType ? `
              <div style="padding: var(--space-3) var(--space-4); background-color: var(--color-success-subtle); border-radius: var(--radius-md); border-left: 4px solid var(--color-success); margin-bottom: var(--space-4);">
                <div style="font-size: 11px; font-weight: 700; color: var(--color-success-hover); text-transform: uppercase;">
                  🏆 Strongest Question Type
                </div>
                <div style="font-size: var(--text-base); font-weight: 700; color: var(--text-main); margin: 2px 0;">
                  ${formatTypeName(bestType.type)}
                </div>
                <div style="font-size: var(--text-xs); color: var(--text-body);">
                  ${bestType.correct} of ${bestType.total} correct (<strong>${bestType.pct}%</strong> accuracy)
                </div>
              </div>
            ` : ''}

            ${weakType ? `
              <div style="padding: var(--space-3) var(--space-4); background-color: var(--color-danger-subtle); border-radius: var(--radius-md); border-left: 4px solid var(--color-danger);">
                <div style="font-size: 11px; font-weight: 700; color: var(--color-danger); text-transform: uppercase;">
                  🎯 Primary Area for Improvement
                </div>
                <div style="font-size: var(--text-base); font-weight: 700; color: var(--text-main); margin: 2px 0;">
                  ${formatTypeName(weakType.type)}
                </div>
                <div style="font-size: var(--text-xs); color: var(--text-body);">
                  ${weakType.correct} of ${weakType.total} correct (<strong>${weakType.pct}%</strong> accuracy)
                </div>
              </div>
            ` : ''}
          </div>

          <div style="margin-top: var(--space-4); padding-top: var(--space-3); border-top: 1px solid var(--border-light);">
            <a href="#/mistakes" class="btn btn-primary btn-sm" style="width: 100%;">
              Practice Weak Areas in Mistakes Bank &rarr;
            </a>
          </div>
        </div>
      </div>

      <!-- Question Type Performance List -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
          Cumulative Accuracy Across Question Types
        </h2>

        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          ${sortedTypes.map(st => `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: var(--text-sm); font-weight: 600; margin-bottom: 4px;">
                <span>${formatTypeName(st.type)}</span>
                <span>${st.correct}/${st.total} (${st.pct}%)</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill ${st.pct >= 70 ? 'success' : (st.pct < 50 ? 'danger' : '')}" style="width: ${st.pct}%; ${st.pct < 50 ? 'background-color: var(--color-danger);' : ''}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `}
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
