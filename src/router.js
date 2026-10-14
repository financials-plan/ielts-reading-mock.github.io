// Readify IELTS - Client-side Hash Router
import { store } from './state/store.js';
import { renderDashboardView } from './views/DashboardView.js';
import { renderLibraryView } from './views/LibraryView.js';
import { renderTestDetailsView } from './views/TestDetailsView.js';
import { renderWorkspaceView } from './views/WorkspaceView.js';
import { renderResultsView } from './views/ResultsView.js';
import { renderAnswerReviewView } from './views/AnswerReviewView.js';
import { renderWrongAnswersView } from './views/WrongAnswersView.js';
import { renderSavedQuestionsView } from './views/SavedQuestionsView.js';
import { renderVocabularyView } from './views/VocabularyView.js';
import { renderHistoryView } from './views/HistoryView.js';
import { renderAnalyticsView } from './views/AnalyticsView.js';
import { renderSettingsView } from './views/SettingsView.js';
import { renderHelpView } from './views/HelpView.js';

export class AppRouter {
  constructor(mainContainerElement) {
    this.container = mainContainerElement;
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  handleRoute() {
    const rawHash = window.location.hash || '#/dashboard';
    const [pathPart, queryPart] = rawHash.replace(/^#\/?/, '').split('?');
    const segments = pathPart.split('/').filter(Boolean);
    const route = segments[0] || 'dashboard';
    const param = segments[1] || null;

    // Parse query params
    const queryParams = new URLSearchParams(queryPart || '');
    const filterParam = queryParams.get('filter') || 'all';

    // Update Store Route State
    store.state.currentRoute = route;
    store.state.routeParams = { id: param, filter: filterParam };

    // Toggle Workspace Active Layout Class
    if (route === 'workspace') {
      document.body.classList.add('workspace-active');
    } else {
      document.body.classList.remove('workspace-active');
      document.body.classList.remove('focus-reading-active');
      document.body.classList.remove('sidebar-open');
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Render corresponding view
    this.container.innerHTML = '';

    switch (route) {
      case 'dashboard':
        this.container.appendChild(renderDashboardView());
        break;

      case 'library':
        this.container.appendChild(renderLibraryView());
        break;

      case 'details':
        this.container.appendChild(renderTestDetailsView(param));
        break;

      case 'workspace':
        this.container.appendChild(renderWorkspaceView(param));
        break;

      case 'results':
        this.container.appendChild(renderResultsView(param));
        break;

      case 'review':
        this.container.appendChild(renderAnswerReviewView(param, filterParam));
        break;

      case 'mistakes':
        this.container.appendChild(renderWrongAnswersView());
        break;

      case 'saved':
        this.container.appendChild(renderSavedQuestionsView());
        break;

      case 'vocab':
        this.container.appendChild(renderVocabularyView());
        break;

      case 'history':
        this.container.appendChild(renderHistoryView());
        break;

      case 'analytics':
        this.container.appendChild(renderAnalyticsView());
        break;

      case 'settings':
        this.container.appendChild(renderSettingsView());
        break;

      case 'help':
        this.container.appendChild(renderHelpView());
        break;

      default:
        this.renderNotFound();
        break;
    }

    // Update Header Breadcrumb & Active nav links
    this.updateNavigationUI(route);
  }

  renderNotFound() {
    const notFoundEl = document.createElement('div');
    notFoundEl.className = 'content-container';
    notFoundEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">404</div>
        <div class="empty-state-title">Page Not Found</div>
        <div class="empty-state-text">The section you are trying to visit does not exist.</div>
        <a href="#/dashboard" class="btn btn-primary">Go to Dashboard</a>
      </div>
    `;
    this.container.appendChild(notFoundEl);
  }

  updateNavigationUI(activeRoute) {
    // Update Sidebar links active states
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `"#/${activeRoute}"` || href === `#/${activeRoute}`);
    });

    // Update Mobile bottom navigation active states
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `"#/${activeRoute}"` || href === `#/${activeRoute}`);
    });

    // Update Header Breadcrumb Title
    const breadcrumb = document.querySelector('#header_breadcrumb');
    if (breadcrumb) {
      breadcrumb.textContent = this.formatBreadcrumb(activeRoute);
    }
  }

  formatBreadcrumb(route) {
    switch (route) {
      case 'dashboard': return 'Dashboard';
      case 'library': return 'Practice Library';
      case 'details': return 'Test Overview';
      case 'workspace': return 'Test Workspace';
      case 'results': return 'Test Results';
      case 'review': return 'Answer Review';
      case 'mistakes': return 'Mistakes Bank';
      case 'saved': return 'Saved Questions';
      case 'vocab': return 'Vocabulary Notebook';
      case 'history': return 'Practice History';
      case 'analytics': return 'Progress Analytics';
      case 'settings': return 'Settings';
      case 'help': return 'IELTS Reading Guide';
      default: return 'Readify IELTS';
    }
  }
}
