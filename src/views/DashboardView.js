// Readify IELTS - Dashboard View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { TestService } from '../data/index.js';
import { t } from '../state/i18n.js';

export function renderDashboardView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  const state = store.getState();
  const goals = state.goals;
  const attempts = StorageService.getAttempts();
  const activeSession = StorageService.getActiveSession();
  const wrongAnswers = StorageService.getWrongAnswers();
  const savedQuestions = StorageService.getSavedQuestions();

  // Calculate actual statistics from user's history
  const testsCompleted = attempts.length;
  const totalQuestionsSolved = attempts.reduce((sum, a) => sum + (a.totalQuestions || 0), 0);
  const totalSecondsSpent = attempts.reduce((sum, a) => sum + (a.timeSpentSeconds || 0), 0);
  const totalHoursSpent = (totalSecondsSpent / 3600).toFixed(1);
  const avgAccuracy = testsCompleted > 0
    ? Math.round(attempts.reduce((sum, a) => sum + (a.accuracy || 0), 0) / testsCompleted)
    : 0;

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('dashboard.greetingMorning') : (hour < 18 ? t('dashboard.greetingAfternoon') : t('dashboard.greetingEvening'));

  container.innerHTML = `
    <!-- Greeting & Call to Action Banner -->
    <div class="results-hero" style="margin-bottom: var(--space-6);">
      <div style="max-width: 600px;">
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--space-2); color: var(--text-main);">
          ${greeting}
        </h1>
        <p style="font-size: var(--text-base); color: var(--text-muted); margin-bottom: var(--space-5);">
          ${t('dashboard.subtitle')}
        </p>
        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
          <a href="#/library" class="btn btn-primary btn-lg">
            <span>📚</span>
            <span>${t('dashboard.startTestBtn')}</span>
          </a>
          ${activeSession ? `
            <button id="resume_session_btn" class="btn btn-accent btn-lg">
              <span>⚡</span>
              <span>${t('dashboard.resumeTestBtn')}</span>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Target Band Hero Indicator -->
      <div class="band-score-circle" style="width: 110px; height: 110px;" title="Your Target IELTS Band Score">
        <span class="band-score-value">${goals.targetBand.toFixed(1)}</span>
        <span class="band-score-label">${t('dashboard.targetBand')}</span>
      </div>
    </div>

    <!-- Quick Stat Cards -->
    <div class="results-meta-stats" style="margin-bottom: var(--space-8);">
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-primary);">${testsCompleted}</div>
        <div class="stat-label">${t('dashboard.testsCompleted')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-accent-hover);">${totalHoursSpent} hrs</div>
        <div class="stat-label">${t('dashboard.totalStudyTime')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-success);">${avgAccuracy}%</div>
        <div class="stat-label">${t('dashboard.avgAccuracy')}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: var(--color-info);">${totalQuestionsSolved}</div>
        <div class="stat-label">${t('dashboard.questionsSolved')}</div>
      </div>
    </div>

    <!-- Active Incomplete Test Alert Banner (if exists) -->
    ${activeSession ? `
      <div class="card" style="margin-bottom: var(--space-6); background-color: var(--color-accent-light); border-color: var(--color-accent);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <div style="font-weight: 700; color: var(--color-accent-hover); font-size: var(--text-base);">
              ⚠️ Unfinished Practice Session Detected
            </div>
            <div style="font-size: var(--text-sm); color: var(--text-body); margin-top: 2px;">
              You have an active session for <strong>${activeSession.testId}</strong> (${Object.keys(activeSession.answers || {}).length} questions answered).
            </div>
          </div>
          <div style="display: flex; gap: var(--space-2);">
            <button id="resume_session_banner_btn" class="btn btn-accent btn-sm">Resume Practice</button>
            <button id="discard_session_btn" class="btn btn-secondary btn-sm">Discard</button>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Recommended Tests Grid -->
    <div style="margin-bottom: var(--space-8);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
        <h2 style="font-size: var(--text-xl); font-weight: 700;">${t('dashboard.recommendedTests')}</h2>
        <a href="#/library" class="btn btn-ghost btn-sm">View All &rarr;</a>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-4);">
        ${TestService.getAllTests().slice(0, 3).map(test => `
          <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-2);">
                <span class="badge ${test.type === 'academic' ? 'badge-primary' : 'badge-accent'}">
                  ${test.type === 'academic' ? 'IELTS Academic' : 'General Training'}
                </span>
                <span class="badge badge-subtle">${test.difficulty.toUpperCase()}</span>
              </div>
              <h3 style="font-size: var(--text-base); font-weight: 700; margin-bottom: var(--space-2);">
                ${test.title}
              </h3>
              <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-4); line-height: 1.5;">
                ${test.description}
              </p>
            </div>
            <div class="card-footer" style="padding-top: var(--space-3); margin-top: 0;">
              <span style="font-size: var(--text-xs); color: var(--text-subtle);">
                ⏱️ ${test.durationMinutes} mins • ${TestService.getTotalQuestions(test)} Qs
              </span>
              <a href="#/details/${test.id}" class="btn btn-outline btn-sm">${t('common.viewDetails')}</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Weak Areas / Mistakes Bank Quick Teaser -->
    ${wrongAnswers.length > 0 ? `
      <div class="card" style="margin-bottom: var(--space-8); border-left: 4px solid var(--color-danger);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <h3 style="font-size: var(--text-base); font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              🎯 Review Your Weak Areas (${wrongAnswers.filter(w => w.status === 'unresolved').length} unresolved mistakes)
            </h3>
            <p style="font-size: var(--text-sm); color: var(--text-muted); margin: 0;">
              Target your most frequent incorrect question types to boost your overall IELTS band score.
            </p>
          </div>
          <a href="#/mistakes" class="btn btn-danger btn-sm">Practice Mistakes Now</a>
        </div>
      </div>
    ` : ''}

    <!-- Recent Activity History -->
    <div>
      <h2 style="font-size: var(--text-xl); font-weight: 700; margin-bottom: var(--space-4);">
        ${t('dashboard.recentActivity')}
      </h2>
      
      ${attempts.length === 0 ? `
        <div class="empty-state" style="margin: var(--space-4) auto;">
          <div class="empty-state-icon">📖</div>
          <div class="empty-state-title">${t('dashboard.emptyHistoryTitle')}</div>
          <div class="empty-state-text">${t('dashboard.emptyHistoryDesc')}</div>
          <a href="#/library" class="btn btn-primary">${t('dashboard.startTestBtn')}</a>
        </div>
      ` : `
        <div class="card" style="padding: 0; overflow: hidden;">
          <table class="ielts-table" style="margin: 0;">
            <thead>
              <tr>
                <th>Test Title</th>
                <th>Date</th>
                <th>Raw Score</th>
                <th>Accuracy</th>
                <th>Estimated Band</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${attempts.slice(0, 5).map(att => `
                <tr>
                  <td><strong>${att.testTitle}</strong></td>
                  <td>${new Date(att.timestamp).toLocaleDateString()}</td>
                  <td>${att.correctCount} / ${att.totalQuestions}</td>
                  <td><span class="badge ${att.accuracy >= 75 ? 'badge-success' : (att.accuracy >= 50 ? 'badge-warning' : 'badge-danger')}">${att.accuracy}%</span></td>
                  <td><strong style="color: var(--color-primary);">${att.estimatedBand ? att.estimatedBand.toFixed(1) : '-'}</strong></td>
                  <td style="text-align: right;">
                    <a href="#/results/${att.id}" class="btn btn-ghost btn-sm">View Results</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;

  // Attach Handlers for resume & discard
  const resumeBtn = container.querySelector('#resume_session_btn');
  const resumeBannerBtn = container.querySelector('#resume_session_banner_btn');
  const discardBtn = container.querySelector('#discard_session_btn');

  const resumeAction = () => {
    if (activeSession) {
      const test = TestService.getTestById(activeSession.testId);
      if (test) {
        store.startTest(test, activeSession.mode, activeSession.answers, activeSession.marked);
        store.setActivePassage(activeSession.activePassageIndex || 0);
        window.location.hash = `#/workspace/${test.id}`;
      }
    }
  };

  if (resumeBtn) resumeBtn.addEventListener('click', resumeAction);
  if (resumeBannerBtn) resumeBannerBtn.addEventListener('click', resumeAction);

  if (discardBtn) {
    discardBtn.addEventListener('click', () => {
      StorageService.clearActiveSession();
      store.showToast('Unfinished session discarded.', 'info');
      window.location.reload();
    });
  }

  return container;
}
