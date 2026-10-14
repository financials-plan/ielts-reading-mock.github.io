// Readify IELTS - Bottom Mobile Navigation Component
import { store } from '../../state/store.js';

export function renderMobileNav() {
  const nav = document.createElement('nav');
  nav.className = 'mobile-bottom-nav';

  const currentRoute = store.getState().currentRoute;

  nav.innerHTML = `
    <a href="#/dashboard" class="mobile-nav-item ${currentRoute === 'dashboard' ? 'active' : ''}">
      <span class="mobile-nav-icon">📊</span>
      <span>Home</span>
    </a>
    <a href="#/library" class="mobile-nav-item ${currentRoute === 'library' ? 'active' : ''}">
      <span class="mobile-nav-icon">📚</span>
      <span>Library</span>
    </a>
    <a href="#/mistakes" class="mobile-nav-item ${currentRoute === 'mistakes' ? 'active' : ''}">
      <span class="mobile-nav-icon">🎯</span>
      <span>Mistakes</span>
    </a>
    <a href="#/vocab" class="mobile-nav-item ${currentRoute === 'vocab' ? 'active' : ''}">
      <span class="mobile-nav-icon">📖</span>
      <span>Vocab</span>
    </a>
    <a href="#/settings" class="mobile-nav-item ${currentRoute === 'settings' ? 'active' : ''}">
      <span class="mobile-nav-icon">⚙️</span>
      <span>Settings</span>
    </a>
  `;

  return nav;
}
