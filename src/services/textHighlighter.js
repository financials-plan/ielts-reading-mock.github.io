// Readify IELTS - Reading Passage Text Highlighting & Annotations Engine

export class TextHighlighter {
  constructor(passageContainerElement, testId, passageIndex) {
    this.container = passageContainerElement;
    this.testId = testId;
    this.passageIndex = passageIndex;
    this.storageKey = `readify_highlights_${testId}_${passageIndex}`;
    this.activeColor = 'yellow'; // 'yellow', 'green', 'blue', 'pink'
    this.highlights = this.loadHighlights();
  }

  loadHighlights() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveHighlights() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.highlights));
    } catch (e) {}
  }

  setColor(color) {
    this.activeColor = color;
  }

  /**
   * Applies highlight to current browser text selection.
   */
  highlightSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();
    if (!selectedText || selectedText.length < 2) return null;

    // Check if within our passage container
    if (!this.container.contains(range.commonAncestorContainer)) return null;

    const highlightId = 'hl_' + Date.now();
    const span = document.createElement('span');
    span.className = `hl-span ${this.activeColor}`;
    span.id = highlightId;
    span.title = 'Click to remove or add note';
    span.dataset.color = this.activeColor;

    try {
      range.surroundContents(span);
      this.highlights.push({
        id: highlightId,
        text: selectedText,
        color: this.activeColor,
        note: ''
      });
      this.saveHighlights();
      selection.removeAllRanges();
      return highlightId;
    } catch (e) {
      // Range crosses multiple nodes or elements
      console.warn('Could not wrap selection cleanly', e);
      return null;
    }
  }

  clearAllHighlights() {
    this.highlights = [];
    this.saveHighlights();
    const spans = this.container.querySelectorAll('.hl-span');
    spans.forEach(span => {
      const text = document.createTextNode(span.textContent);
      span.parentNode.replaceChild(text, span);
    });
  }

  removeHighlight(id) {
    this.highlights = this.highlights.filter(h => h.id !== id);
    this.saveHighlights();
    const span = this.container.querySelector(`#${id}`);
    if (span) {
      const text = document.createTextNode(span.textContent);
      span.parentNode.replaceChild(text, span);
    }
  }

  attachListeners(onHighlightClick) {
    this.container.addEventListener('click', (e) => {
      const hlSpan = e.target.closest('.hl-span');
      if (hlSpan && onHighlightClick) {
        const id = hlSpan.id;
        const hlData = this.highlights.find(h => h.id === id) || { id, color: hlSpan.dataset.color };
        onHighlightClick(hlData, hlSpan);
      }
    });
  }
}
