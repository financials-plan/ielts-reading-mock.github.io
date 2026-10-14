// Readify IELTS - Main Application Bootstrap
import { store } from './state/store.js';
import { renderSidebar } from './components/navigation/Sidebar.js';
import { renderHeader } from './components/navigation/Header.js';
import { renderMobileNav } from './components/navigation/MobileNav.js';
import { initToastSystem } from './components/common/Toast.js';
import { initModalSystem } from './components/common/Modal.js';
import { AppRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  if (!root) return;

  root.className = 'app-root';

  // 1. Mount Sidebar Drawer Overlay (for mobile)
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.addEventListener('click', () => {
    document.body.classList.remove('sidebar-open');
  });
  root.appendChild(overlay);

  // 2. Mount Sidebar
  const sidebar = renderSidebar();
  root.appendChild(sidebar);

  // 3. Mount Main App Shell
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'app-main';
  mainWrapper.id = 'app_main_wrapper';

  // Mount Header
  const header = renderHeader();
  mainWrapper.appendChild(header);

  // Mount Dynamic View Container
  const viewContainer = document.createElement('main');
  viewContainer.id = 'app_view_container';
  viewContainer.style.flex = '1 1 auto';
  mainWrapper.appendChild(viewContainer);

  root.appendChild(mainWrapper);

  // 4. Mount Mobile Bottom Navigation
  const mobileNav = renderMobileNav();
  root.appendChild(mobileNav);

  // 5. Initialize Notification Systems
  initToastSystem();
  initModalSystem();

  // 6. Initialize Router
  const router = new AppRouter(viewContainer);
  router.init();

  // 7. Subscribe to global store changes if needed
  store.subscribe((state, event) => {
    if (event === 'route') {
      router.handleRoute();
    }
  });

  console.log('Readify IELTS Application initialized successfully.');
});
