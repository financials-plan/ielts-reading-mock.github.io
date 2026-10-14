// Readify IELTS - Accessible Toast Notification Manager
import { store } from '../../state/store.js';

let toastContainer = null;

export function initToastSystem() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }

  store.subscribe((state, event) => {
    if (event === 'toast_added' || event === 'toast_removed') {
      renderToasts(state.toasts);
    }
  });
}

function renderToasts(toasts) {
  if (!toastContainer) return;
  toastContainer.innerHTML = '';

  toasts.forEach(toast => {
    const el = document.createElement('div');
    el.className = `toast toast-${toast.type || 'info'}`;
    el.setAttribute('role', 'alert');

    el.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span>${getToastIcon(toast.type)}</span>
        <span>${toast.message}</span>
      </div>
      <button class="btn btn-ghost btn-sm" aria-label="Dismiss notification" style="padding:0; width:20px; height:20px;">
        &times;
      </button>
    `;

    el.querySelector('button').addEventListener('click', () => {
      store.removeToast(toast.id);
    });

    toastContainer.appendChild(el);
  });
}

function getToastIcon(type) {
  switch (type) {
    case 'success': return '✅';
    case 'error': return '❌';
    case 'warning': return '⚠️';
    default: return 'ℹ️';
  }
}
