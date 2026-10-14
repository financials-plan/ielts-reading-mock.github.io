// Readify IELTS - Responsive Desktop/Drawer Sidebar Component
import { store } from '../../state/store.js';
import { t } from '../../state/i18n.js';

export function renderSidebar() {
  const sidebar = document.createElement('aside');
  sidebar.className = 'app-sidebar';
  sidebar.id = 'app_sidebar';

  const state = store.getState();
  const currentRoute = state.currentRoute;

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <a href="#/dashboard" class="brand-logo">
        <div class="brand-icon">R</div>
        <span class="brand-name">Readify</span>
        <span class="brand-badge">IELTS</span>
      </a>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">Practice</div>
      
      <a href="#/dashboard" class="nav-link ${currentRoute === 'dashboard' ? 'active' : ''}">
        <span class="nav-link-icon">📊</span>
        <span>${t('nav.dashboard')}</span>
      </a>

      <a href="#/library" class="nav-link ${currentRoute === 'library' ? 'active' : ''}">
        <span class="nav-link-icon">📚</span>
        <span>${t('nav.library')}</span>
      </a>

      <div class="nav-section-label">Learning Tools</div>

      <a href="#/mistakes" class="nav-link ${currentRoute === 'mistakes' ? 'active' : ''}">
        <span class="nav-link-icon">🎯</span>
        <span>${t('nav.wrongAnswers')}</span>
      </a>

      <a href="#/saved" class="nav-link ${currentRoute === 'saved' ? 'active' : ''}">
        <span class="nav-link-icon">⭐</span>
        <span>${t('nav.savedQuestions')}</span>
      </a>

      <a href="#/vocab" class="nav-link ${currentRoute === 'vocab' ? 'active' : ''}">
        <span class="nav-link-icon">📖</span>
        <span>${t('nav.vocabulary')}</span>
      </a>

      <div class="nav-section-label">Analytics & History</div>

      <a href="#/history" class="nav-link ${currentRoute === 'history' ? 'active' : ''}">
        <span class="nav-link-icon">🕒</span>
        <span>${t('nav.history')}</span>
      </a>

      <a href="#/analytics" class="nav-link ${currentRoute === 'analytics' ? 'active' : ''}">
        <span class="nav-link-icon">📈</span>
        <span>${t('nav.analytics')}</span>
      </a>

      <div class="nav-section-label">Preferences</div>

      <a href="#/settings" class="nav-link ${currentRoute === 'settings' ? 'active' : ''}">
        <span class="nav-link-icon">⚙️</span>
        <span>${t('nav.settings')}</span>
      </a>

      <a href="#/help" class="nav-link ${currentRoute === 'help' ? 'active' : ''}">
        <span class="nav-link-icon">💡</span>
        <span>${t('nav.help')}</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <div style="font-size: 11px; color: var(--text-subtle); text-align: center;">
        Readify IELTS v1.0 • Client-side SPA
      </div>
    </div>
  `;

  return sidebar;
}
