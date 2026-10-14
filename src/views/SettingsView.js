// Readify IELTS - Settings & Preferences View Component
import { store } from '../state/store.js';
import { StorageService } from '../services/storageService.js';
import { t } from '../state/i18n.js';

export function renderSettingsView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  const state = store.getState();
  const prefs = state.preferences;
  const goals = state.goals;

  container.innerHTML = `
    <div style="margin-bottom: var(--space-6);">
      <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
        ⚙️ ${t('settings.title')}
      </h1>
      <p style="font-size: var(--text-sm); color: var(--text-muted);">
        Customize your reading environment, learning goals, theme, language, and data backups.
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-6);">
      <!-- Card 1: Appearance & Theme -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
          🎨 ${t('settings.appearance')}
        </h2>

        <div class="form-group">
          <label class="form-label">${t('settings.theme')}</label>
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn ${prefs.theme === 'light' ? 'btn-primary' : 'btn-secondary'} btn-sm theme-btn" data-theme="light">
              ☀️ ${t('settings.lightTheme')}
            </button>
            <button class="btn ${prefs.theme === 'dark' ? 'btn-primary' : 'btn-secondary'} btn-sm theme-btn" data-theme="dark">
              🌙 ${t('settings.darkTheme')}
            </button>
            <button class="btn ${prefs.theme === 'system' ? 'btn-primary' : 'btn-secondary'} btn-sm theme-btn" data-theme="system">
              💻 ${t('settings.systemTheme')}
            </button>
          </div>
        </div>

        <div class="form-group" style="margin-top: var(--space-5);">
          <label class="form-label">${t('settings.language')}</label>
          <div style="display: flex; gap: var(--space-2);">
            <button class="btn ${prefs.language === 'en' ? 'btn-primary' : 'btn-secondary'} btn-sm lang-btn" data-lang="en">
              🇬🇧 English
            </button>
            <button class="btn ${prefs.language === 'vi' ? 'btn-primary' : 'btn-secondary'} btn-sm lang-btn" data-lang="vi">
              🇻🇳 Tiếng Việt
            </button>
          </div>
        </div>
      </div>

      <!-- Card 2: Reading Passage Defaults -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
          📖 ${t('settings.readingPreferences')}
        </h2>

        <div class="form-group">
          <label class="form-label">${t('settings.defaultFont')}</label>
          <select id="setting_font_family" class="form-select">
            <option value="serif" ${prefs.fontFamily === 'serif' ? 'selected' : ''}>${t('settings.serif')}</option>
            <option value="sans" ${prefs.fontFamily === 'sans' ? 'selected' : ''}>${t('settings.sans')}</option>
          </select>
          <div class="form-helper">Editorial serif fonts mimic printed IELTS exam test booklets.</div>
        </div>

        <div class="form-group">
          <label class="form-label">${t('settings.defaultSize')}</label>
          <select id="setting_font_size" class="form-select">
            <option value="small" ${prefs.fontSize === 'small' ? 'selected' : ''}>Small (15px)</option>
            <option value="medium" ${prefs.fontSize === 'medium' ? 'selected' : ''}>Standard Medium (17px)</option>
            <option value="large" ${prefs.fontSize === 'large' ? 'selected' : ''}>Comfortable Large (19px)</option>
            <option value="xl" ${prefs.fontSize === 'xl' ? 'selected' : ''}>Extra Large (21px)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Line Spacing</label>
          <select id="setting_line_height" class="form-select">
            <option value="normal" ${prefs.lineHeight === 'normal' ? 'selected' : ''}>Normal (1.5)</option>
            <option value="relaxed" ${prefs.lineHeight === 'relaxed' ? 'selected' : ''}>Relaxed (1.8)</option>
            <option value="loose" ${prefs.lineHeight === 'loose' ? 'selected' : ''}>Loose (2.0)</option>
          </select>
        </div>
      </div>

      <!-- Card 3: Learning Goals -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
          🎯 ${t('settings.learningGoals')}
        </h2>

        <div class="form-group">
          <label class="form-label">${t('settings.targetBandScore')}</label>
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <input type="number" id="setting_target_band" class="form-control" style="max-width: 120px;" step="0.5" min="4.0" max="9.0" value="${goals.targetBand}"/>
            <span style="font-size: var(--text-sm); font-weight: 600; color: var(--color-primary);">Band ${goals.targetBand.toFixed(1)}</span>
          </div>
          <div class="form-helper">Common university thresholds range between Band 6.5 and 7.5.</div>
        </div>

        <div class="form-group">
          <label class="form-label">${t('settings.weeklyGoal')}</label>
          <input type="number" id="setting_weekly_tests" class="form-control" style="max-width: 120px;" min="1" max="14" value="${goals.weeklyTests}"/>
          <div class="form-helper">Target number of practice reading tests per week.</div>
        </div>

        <button id="save_goals_btn" class="btn btn-primary btn-sm">Save Learning Goals</button>
      </div>

      <!-- Card 4: Data Management & Backup -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-4);">
          💾 ${t('settings.dataManagement')}
        </h2>
        <p style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.6; margin-bottom: var(--space-4);">
          Your progress, vocabulary items, and test history are stored locally in your browser. You can export a JSON backup to transfer data to another device or restore your learning archive.
        </p>

        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <button id="export_data_btn" class="btn btn-secondary btn-sm" style="justify-content: flex-start;">
            📥 ${t('settings.exportData')}
          </button>

          <label class="btn btn-secondary btn-sm" style="justify-content: flex-start; cursor: pointer; margin: 0;">
            📤 ${t('settings.importData')}
            <input type="file" id="import_file_input" accept=".json" style="display: none;"/>
          </label>

          <div style="border-top: 1px solid var(--border-light); padding-top: var(--space-3); margin-top: var(--space-2);">
            <button id="reset_all_data_btn" class="btn btn-danger btn-sm" style="width: 100%;">
              ⚠️ ${t('settings.resetData')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  // Theme Toggle
  container.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.theme;
      store.updatePreferences({ theme: selected });
      container.querySelectorAll('.theme-btn').forEach(b => {
        b.className = `btn ${b.dataset.theme === selected ? 'btn-primary' : 'btn-secondary'} btn-sm theme-btn`;
      });
      store.showToast(`Theme updated to ${selected} mode.`, 'info');
    });
  });

  // Language Toggle
  container.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lang;
      store.updatePreferences({ language: selected });
      window.location.reload();
    });
  });

  // Reading Defaults
  container.querySelector('#setting_font_family').addEventListener('change', (e) => {
    store.updatePreferences({ fontFamily: e.target.value });
    store.showToast('Default reading font updated.', 'info');
  });

  container.querySelector('#setting_font_size').addEventListener('change', (e) => {
    store.updatePreferences({ fontSize: e.target.value });
    store.showToast('Default text size updated.', 'info');
  });

  container.querySelector('#setting_line_height').addEventListener('change', (e) => {
    store.updatePreferences({ lineHeight: e.target.value });
    store.showToast('Default line height updated.', 'info');
  });

  // Goals Save
  container.querySelector('#save_goals_btn').addEventListener('click', () => {
    const band = parseFloat(container.querySelector('#setting_target_band').value) || 7.0;
    const weekly = parseInt(container.querySelector('#setting_weekly_tests').value, 10) || 3;
    store.updateGoals({ targetBand: band, weeklyTests: weekly });
    store.showToast('Learning goals saved successfully! 🎯', 'success');
  });

  // Data Export
  container.querySelector('#export_data_btn').addEventListener('click', () => {
    const data = StorageService.exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `readify_ielts_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    store.showToast('Backup JSON exported successfully! 📥', 'success');
  });

  // Data Import
  const fileInput = container.querySelector('#import_file_input');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = StorageService.importBackupData(event.target.result);
      if (res.success) {
        store.showToast('Backup restored successfully! Refreshing...', 'success');
        setTimeout(() => window.location.reload(), 1200);
      } else {
        store.showToast(`Import error: ${res.error}`, 'error');
      }
    };
    reader.readAsText(file);
  });

  // Reset / Clear Data
  container.querySelector('#reset_all_data_btn').addEventListener('click', () => {
    store.openModal({
      title: t('settings.resetConfirmTitle'),
      message: t('settings.resetConfirmMsg'),
      confirmText: 'Yes, Delete Everything',
      confirmVariant: 'danger',
      onConfirm: () => {
        StorageService.clearAllData();
        store.showToast('All local data cleared.', 'info');
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  });

  return container;
}
