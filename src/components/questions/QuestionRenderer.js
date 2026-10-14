// Readify IELTS - Central Question Renderer Component Dispatcher
import { store } from '../../state/store.js';
import { t } from '../../state/i18n.js';

export function renderQuestionGroup(group, passageIndex) {
  const groupEl = document.createElement('div');
  groupEl.className = 'question-group';
  groupEl.id = group.id;

  // Header with title and instruction
  const headerEl = document.createElement('div');
  headerEl.className = 'question-group-header';
  headerEl.innerHTML = `
    <div class="question-group-title">${group.title}</div>
    <div class="question-instruction">${formatInstruction(group.instruction)}</div>
  `;
  groupEl.appendChild(headerEl);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'question-group-body';

  // Headings box for Matching Headings
  if (group.questionType === 'matching_headings' && group.headingsList) {
    const headingsBox = document.createElement('div');
    headingsBox.className = 'headings-box';
    headingsBox.innerHTML = `
      <div class="headings-box-title">List of Headings</div>
      ${group.headingsList.map(h => `
        <div class="heading-list-item" id="heading_item_${h.roman}">
          <span class="heading-roman">${h.roman}</span>
          <span class="heading-text">${h.text}</span>
        </div>
      `).join('')}
    `;
    bodyEl.appendChild(headingsBox);
  }

  // Summary Word Box for Summary Completion with word bank
  if (group.questionType === 'completion_summary' && group.summaryWordBox) {
    const wordBox = document.createElement('div');
    wordBox.className = 'headings-box';
    wordBox.innerHTML = `
      <div class="headings-box-title">Word Box</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${group.summaryWordBox.map(w => `
          <span class="badge badge-subtle" style="font-size:12px; padding:3px 8px;">
            <strong>${w.letter}</strong>: ${w.word}
          </span>
        `).join('')}
      </div>
    `;
    bodyEl.appendChild(wordBox);
  }

  // Matching Endings Box
  if (group.questionType === 'matching_endings' && group.endingsList) {
    const endingsBox = document.createElement('div');
    endingsBox.className = 'headings-box';
    endingsBox.innerHTML = `
      <div class="headings-box-title">Sentence Endings</div>
      ${group.endingsList.map(e => `
        <div class="heading-list-item">
          <span class="heading-roman">${e.letter}</span>
          <span class="heading-text">${e.text}</span>
        </div>
      `).join('')}
    `;
    bodyEl.appendChild(endingsBox);
  }

  // Diagram SVG for Diagram Label Completion
  if (group.questionType === 'diagram_label' && group.diagramSvg) {
    const diagramBox = document.createElement('div');
    diagramBox.className = 'diagram-container';
    diagramBox.innerHTML = group.diagramSvg;
    bodyEl.appendChild(diagramBox);
  }

  // Render individual questions
  group.questions.forEach(q => {
    const qEl = renderSingleQuestion(q, group);
    bodyEl.appendChild(qEl);
  });

  groupEl.appendChild(bodyEl);
  return groupEl;
}

function formatInstruction(text) {
  if (!text) return '';
  return text.replace(/(NO MORE THAN [A-Z\s]+|TRUE|FALSE|NOT GIVEN|YES|NO|ONE WORD ONLY|TWO WORDS|THREE WORDS)/g, '<span class="instruction-highlight">$1</span>');
}

function renderSingleQuestion(q, group) {
  const qEl = document.createElement('div');
  qEl.className = 'question-item';
  qEl.id = `q_item_${q.id}`;

  const state = store.getState();
  const currentAnswer = state.userAnswers[q.id];
  const isMarked = state.markedQuestions.has(q.id);
  const isAnswered = currentAnswer !== undefined && currentAnswer !== '' && (!Array.isArray(currentAnswer) || currentAnswer.length > 0);

  // Question Header (Number badge, prompt text, mark for review button)
  const header = document.createElement('div');
  header.className = 'question-header';
  header.innerHTML = `
    <div class="question-number-badge ${isAnswered ? 'answered' : ''}" id="badge_${q.id}">
      ${q.number}
    </div>
    <div class="question-text">
      ${q.prompt}
    </div>
    <button class="mark-btn ${isMarked ? 'marked' : ''}" id="mark_btn_${q.id}" title="${t('common.markForReview')}" aria-label="${t('common.markForReview')}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="${isMarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  `;

  // Attach Mark toggle handler
  header.querySelector(`#mark_btn_${q.id}`).addEventListener('click', (e) => {
    e.stopPropagation();
    store.toggleMarkQuestion(q.id);
    const updatedMarked = store.getState().markedQuestions.has(q.id);
    const btn = header.querySelector(`#mark_btn_${q.id}`);
    btn.classList.toggle('marked', updatedMarked);
    btn.querySelector('svg').setAttribute('fill', updatedMarked ? 'currentColor' : 'none');
  });

  qEl.appendChild(header);

  // Render Inputs according to Question Type
  const inputContainer = document.createElement('div');
  inputContainer.className = 'question-inputs';

  switch (group.questionType) {
    case 'mcq':
      inputContainer.appendChild(renderMCQ(q, currentAnswer));
      break;

    case 'mcq_multi':
      inputContainer.appendChild(renderMCQMulti(q, group.options, currentAnswer));
      break;

    case 'tfng':
      inputContainer.appendChild(renderSegmentedPills(q, ['TRUE', 'FALSE', 'NOT GIVEN'], currentAnswer));
      break;

    case 'ynng':
      inputContainer.appendChild(renderSegmentedPills(q, ['YES', 'NO', 'NOT GIVEN'], currentAnswer));
      break;

    case 'matching_headings':
      inputContainer.appendChild(renderMatchingHeadings(q, group.headingsList, currentAnswer));
      break;

    case 'matching_info':
      inputContainer.appendChild(renderMatchingOptions(q, ['A', 'B', 'C', 'D', 'E', 'F', 'G'], currentAnswer));
      break;

    case 'matching_features':
      inputContainer.appendChild(renderMatchingFeatures(q, currentAnswer));
      break;

    case 'matching_endings':
      inputContainer.appendChild(renderMatchingEndings(q, group.endingsList, currentAnswer));
      break;

    case 'completion_summary':
      if (group.summaryWordBox) {
        inputContainer.appendChild(renderWordBoxSelect(q, group.summaryWordBox, currentAnswer));
      } else {
        inputContainer.appendChild(renderTextInput(q, currentAnswer, group.instruction));
      }
      break;

    case 'completion_sentence':
    case 'completion_note':
    case 'completion_table':
    case 'completion_flowchart':
    case 'diagram_label':
    case 'short_answer':
    default:
      inputContainer.appendChild(renderTextInput(q, currentAnswer, group.instruction));
      break;
  }

  qEl.appendChild(inputContainer);
  return qEl;
}

// 1. Single Choice MCQ
function renderMCQ(q, currentVal) {
  const container = document.createElement('div');
  container.className = 'mcq-options';

  q.options.forEach(opt => {
    const label = document.createElement('label');
    label.className = `mcq-option-label ${currentVal === opt.letter ? 'selected' : ''}`;
    label.innerHTML = `
      <input type="radio" name="radio_${q.id}" value="${opt.letter}" class="sr-only" ${currentVal === opt.letter ? 'checked' : ''}/>
      <span class="mcq-letter">${opt.letter}</span>
      <span class="mcq-text">${opt.text}</span>
    `;

    label.addEventListener('click', () => {
      container.querySelectorAll('.mcq-option-label').forEach(l => l.classList.remove('selected'));
      label.classList.add('selected');
      store.setAnswer(q.id, opt.letter);
      updateQuestionBadge(q.id, true);
    });

    container.appendChild(label);
  });

  return container;
}

// 2. Multi Choice MCQ (e.g. choose 2 of 5)
function renderMCQMulti(q, options, currentVal) {
  const container = document.createElement('div');
  container.className = 'mcq-options';
  const selected = Array.isArray(currentVal) ? [...currentVal] : (currentVal ? [currentVal] : []);

  options.forEach(opt => {
    const isChecked = selected.includes(opt.letter);
    const label = document.createElement('label');
    label.className = `mcq-option-label ${isChecked ? 'selected' : ''}`;
    label.innerHTML = `
      <input type="checkbox" value="${opt.letter}" class="sr-only" ${isChecked ? 'checked' : ''}/>
      <span class="mcq-letter">${opt.letter}</span>
      <span class="mcq-text">${opt.text}</span>
    `;

    label.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = selected.indexOf(opt.letter);
      if (idx >= 0) {
        selected.splice(idx, 1);
        label.classList.remove('selected');
      } else {
        selected.push(opt.letter);
        label.classList.add('selected');
      }
      store.setAnswer(q.id, selected);
      updateQuestionBadge(q.id, selected.length > 0);
    });

    container.appendChild(label);
  });

  return container;
}

// 3. TFNG / YNNG Segmented Pills
function renderSegmentedPills(q, pillOptions, currentVal) {
  const container = document.createElement('div');
  container.className = 'tfng-options';

  pillOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tfng-btn ${currentVal === opt ? 'selected' : ''}`;
    btn.textContent = opt;

    btn.addEventListener('click', () => {
      container.querySelectorAll('.tfng-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      store.setAnswer(q.id, opt);
      updateQuestionBadge(q.id, true);
    });

    container.appendChild(btn);
  });

  return container;
}

// 4. Matching Headings Dropdown
function renderMatchingHeadings(q, headingsList, currentVal) {
  const container = document.createElement('div');
  container.style.marginTop = 'var(--space-2)';

  const select = document.createElement('select');
  select.className = 'form-select';
  select.style.maxWidth = '360px';
  select.innerHTML = `
    <option value="">-- Select Heading for this paragraph --</option>
    ${headingsList.map(h => `
      <option value="${h.roman}" ${currentVal === h.roman ? 'selected' : ''}>
        ${h.roman} - ${h.text}
      </option>
    `).join('')}
  `;

  select.addEventListener('change', () => {
    const val = select.value;
    store.setAnswer(q.id, val);
    updateQuestionBadge(q.id, Boolean(val));
  });

  container.appendChild(select);
  return container;
}

// 5. Matching Options (A, B, C...)
function renderMatchingOptions(q, letters, currentVal) {
  const container = document.createElement('div');
  container.className = 'tfng-options';

  letters.forEach(letter => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tfng-btn ${currentVal === letter ? 'selected' : ''}`;
    btn.style.flex = '0 1 45px';
    btn.textContent = letter;

    btn.addEventListener('click', () => {
      container.querySelectorAll('.tfng-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      store.setAnswer(q.id, letter);
      updateQuestionBadge(q.id, true);
    });

    container.appendChild(btn);
  });

  return container;
}

// 6. Matching Features
function renderMatchingFeatures(q, currentVal) {
  const container = document.createElement('div');
  container.style.marginTop = 'var(--space-2)';

  if (q.options) {
    const optionsWrapper = document.createElement('div');
    optionsWrapper.className = 'tfng-options';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tfng-btn ${currentVal === opt.letter ? 'selected' : ''}`;
      btn.textContent = `${opt.letter}. ${opt.text}`;
      btn.addEventListener('click', () => {
        optionsWrapper.querySelectorAll('.tfng-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        store.setAnswer(q.id, opt.letter);
        updateQuestionBadge(q.id, true);
      });
      optionsWrapper.appendChild(btn);
    });
    container.appendChild(optionsWrapper);
  } else {
    return renderMatchingOptions(q, ['A', 'B', 'C', 'D'], currentVal);
  }

  return container;
}

// 7. Matching Endings
function renderMatchingEndings(q, endingsList, currentVal) {
  const container = document.createElement('div');
  container.style.marginTop = 'var(--space-2)';

  const select = document.createElement('select');
  select.className = 'form-select';
  select.style.maxWidth = '420px';
  select.innerHTML = `
    <option value="">-- Select Sentence Ending --</option>
    ${endingsList.map(e => `
      <option value="${e.letter}" ${currentVal === e.letter ? 'selected' : ''}>
        ${e.letter}. ${e.text}
      </option>
    `).join('')}
  `;

  select.addEventListener('change', () => {
    const val = select.value;
    store.setAnswer(q.id, val);
    updateQuestionBadge(q.id, Boolean(val));
  });

  container.appendChild(select);
  return container;
}

// 8. Word Box Select for Summary Completion
function renderWordBoxSelect(q, wordBox, currentVal) {
  const container = document.createElement('div');
  container.style.marginTop = 'var(--space-2)';

  const select = document.createElement('select');
  select.className = 'form-select';
  select.style.maxWidth = '260px';
  select.innerHTML = `
    <option value="">-- Choose Word --</option>
    ${wordBox.map(w => `
      <option value="${w.letter}" ${currentVal === w.letter ? 'selected' : ''}>
        ${w.letter} (${w.word})
      </option>
    `).join('')}
  `;

  select.addEventListener('change', () => {
    const val = select.value;
    store.setAnswer(q.id, val);
    updateQuestionBadge(q.id, Boolean(val));
  });

  container.appendChild(select);
  return container;
}

// 9. Text Input for Completion / Short Answer
function renderTextInput(q, currentVal, instruction) {
  const container = document.createElement('div');
  container.style.marginTop = 'var(--space-2)';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = `form-control ${currentVal ? 'has-value' : ''}`;
  input.style.maxWidth = '300px';
  input.placeholder = 'Type your answer here...';
  input.value = currentVal || '';
  input.autocomplete = 'off';
  input.spellcheck = false;

  input.addEventListener('input', () => {
    const val = input.value.trim();
    input.classList.toggle('has-value', Boolean(val));
    store.setAnswer(q.id, val);
    updateQuestionBadge(q.id, Boolean(val));
  });

  container.appendChild(input);
  return container;
}

function updateQuestionBadge(qId, isAnswered) {
  const badge = document.querySelector(`#badge_${qId}`);
  if (badge) {
    badge.classList.toggle('answered', isAnswered);
  }
}
