// Readify IELTS - Top Header Component
import { store } from '../../state/store.js';
import { getLanguage } from '../../state/i18n.js';

export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'app-header';

  const state = store.getState();
  const currentTheme = state.preferences.theme;
  const currentLang = getLanguage();

  header.innerHTML = `
    <div class="header-left">
      <button class="btn btn-ghost btn-icon" id="sidebar_toggle_btn" aria-label="Toggle Navigation Drawer" style="display: none;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div id="header_breadcrumb" style="font-weight: 600; font-size: var(--text-base); color: var(--text-main);">
        ${getPageTitle(state.currentRoute)}
      </div>
    </div>

    <div class="header-right">
      <div class="streak-pill" title="Continuous practice streak">
        <span>🔥</span>
        <span class="header-streak-label">Streak:</span>
        <span>1 Day</span>
      </div>

      <!-- Language Toggle -->
      <button class="btn btn-secondary btn-sm" id="lang_toggle_btn" title="Switch Language (English / Tiếng Việt)">
        <strong>${currentLang.toUpperCase()}</strong>
      </button>

      <!-- Theme Toggle -->
      <button class="btn btn-ghost btn-icon" id="theme_toggle_btn" title="Toggle Light / Dark Mode" aria-label="Toggle Light or Dark Mode">
        ${currentTheme === 'dark' ? `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ` : `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `}
      </button>
    </div>
  `;

  // Attach event handlers
  const sidebarBtn = header.querySelector('#sidebar_toggle_btn');
  if (window.innerWidth <= 1024) {
    sidebarBtn.style.display = 'inline-flex';
  }

  sidebarBtn.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
  });

  header.querySelector('#lang_toggle_btn').addEventListener('click', () => {
    const nextLang = currentLang === 'en' ? 'vi' : 'en';
    store.updatePreferences({ language: nextLang });
    window.location.reload();
  });

  header.querySelector('#theme_toggle_btn').addEventListener('click', () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    store.updatePreferences({ theme: nextTheme });
  });

  return header;
}

function getPageTitle(route) {
  switch (route) {
    case 'dashboard': return 'Dashboard';
    case 'library': return 'Practice Library';
    case 'mistakes': return 'Mistakes Bank';
    case 'saved': return 'Saved Questions';
    case 'vocab': return 'Vocabulary Notebook';
    case 'history': return 'Practice History';
    case 'analytics': return 'Progress Analytics';
    case 'settings': return 'Settings';
    case 'help': return 'Help & Guide';
    case 'details': return 'Test Overview';
    case 'results': return 'Test Results';
    case 'review': return 'Answer Review';
    default: return 'Readify IELTS';
  }
}
