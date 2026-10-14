// Readify IELTS - Accessible Modal Dialog Manager
import { store } from '../../state/store.js';

let modalContainer = null;

export function initModalSystem() {
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal_root';
    document.body.appendChild(modalContainer);
  }

  store.subscribe((state, event) => {
    if (event === 'modal_opened' || event === 'modal_closed') {
      renderModal(state.modal);
    }
  });

  // Global ESC key listener to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && store.getState().modal) {
      store.closeModal();
    }
  });
}

function renderModal(config) {
  if (!modalContainer) return;

  if (!config) {
    modalContainer.innerHTML = '';
    return;
  }

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');

  backdrop.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">${config.title || ''}</h3>
        <button class="btn btn-ghost btn-sm close-modal-btn" aria-label="Close dialog">&times;</button>
      </div>
      <div class="modal-body">
        ${config.bodyHtml || config.message || ''}
      </div>
      <div class="modal-footer">
        ${config.showCancel !== false ? `
          <button class="btn btn-secondary cancel-btn">${config.cancelText || 'Cancel'}</button>
        ` : ''}
        <button class="btn btn-${config.confirmVariant || 'primary'} confirm-btn">
          ${config.confirmText || 'Confirm'}
        </button>
      </div>
    </div>
  `;

  // Attach event handlers
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      store.closeModal();
    }
  });

  backdrop.querySelector('.close-modal-btn').addEventListener('click', () => {
    store.closeModal();
  });

  const cancelBtn = backdrop.querySelector('.cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (config.onCancel) config.onCancel();
      store.closeModal();
    });
  }

  backdrop.querySelector('.confirm-btn').addEventListener('click', () => {
    if (config.onConfirm) config.onConfirm();
    store.closeModal();
  });

  modalContainer.innerHTML = '';
  modalContainer.appendChild(backdrop);
}
