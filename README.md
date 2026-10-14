# Readify IELTS — Comprehensive IELTS Reading Practice Platform

> **Modern, accessible, editorial, and production-ready IELTS Reading learning experience.**

**Readify IELTS** is a complete front-end IELTS Reading practice platform engineered to simulate official exam conditions while delivering an empowering learning experience. It implements the complete user journey:

$$\text{Discover Tests} \longrightarrow \text{Select Mode} \longrightarrow \text{Read \& Answer} \longrightarrow \text{Submit} \longrightarrow \text{Accurate Results} \longrightarrow \text{Detailed Review} \longrightarrow \text{Mistakes Bank} \longrightarrow \text{Practice Again}$$

---

## 🌟 Key Features & Highlights

### 1. Authentic Split-Screen Test Workspace
- **Two-Column Split Layout**: Smoothly scrollable reading passage on the left and interactive questions on the right.
- **Reading Toolbar**:
  - Text Size Scaler ($A^-$ / $A^+$: Small, Medium, Large, Extra Large).
  - Editorial Serif vs. Modern Sans font family switch.
  - Line height adjustments (Normal, Relaxed, Loose).
  - 4-Color Highlighting System (Yellow, Green, Blue, Pink) with text persistence across sessions.
  - **Focus Mode**: One-click distraction-free reading immersion.
- **Question Navigator**: Interactive 40-question grid tracking unanswered, answered, and bookmarked questions.
- **Resilient Deadline-Based Timer**:
  - Calculated against target timestamp deadlines, remaining accurate across tab switching and page refreshes.
  - Visual and audio-accessible alerts at 10 minutes and 5 minutes remaining.
  - Autosubmission on expiry in full test mode.
- **Continuous Autosave**: Debounced client-side session saving with instant recovery on page reload.

### 2. Comprehensive Support for All 14 IELTS Question Types
1. **Multiple Choice** (Single-choice radio cards).
2. **Multiple Choice (Multi-select)** (Checkboxes with maximum choice validation).
3. **True / False / Not Given** (Segmented pills).
4. **Yes / No / Not Given** (Segmented pills).
5. **Matching Headings** (Heading list with Roman numerals $i$ to $viii$ and duplicate prevention).
6. **Matching Information** (Paragraph letters $A$ to $G$).
7. **Matching Features** (Classifications & options).
8. **Matching Sentence Endings** (Sentence stems paired with endings).
9. **Sentence Completion** (Inline blanks with word limit helpers).
10. **Summary Completion** (Fill-in-the-blank & interactive word box bank).
11. **Note Completion** (Formatted outline notes).
12. **Table Completion** (Responsive multi-column tables).
13. **Flow-chart Completion** (Sequential process diagram with directional indicators).
14. **Diagram Label Completion** (Interactive SVG schematics with numbered input fields).
15. **Short-answer Questions** (Text input with character and word count helpers).

### 3. Rigorous Official Band Scoring Engine
- Accurate raw score to band score calculation adhering to official Cambridge IELTS assessment standards:
  - **IELTS Academic**: $30-32 \rightarrow 7.0$, $33-34 \rightarrow 7.5$, $35-36 \rightarrow 8.0$, $37-38 \rightarrow 8.5$, $39-40 \rightarrow 9.0$.
  - **IELTS General Training**: $34-35 \rightarrow 7.0$, $36 \rightarrow 7.5$, $37-38 \rightarrow 8.0$, $39 \rightarrow 8.5$, $40 \rightarrow 9.0$.
- Passage-by-passage diagnostic accuracy breakdown.
- Performance breakdown by individual question type.

### 4. In-Depth Answer Review & Passage Evidence Locator
- Detailed rationale for why the correct answer is right and why distractors are wrong.
- Exact quotation of passage evidence with paragraph tags (e.g., `[Paragraph B]`).
- Quick actions: "Save Question" to bookmark bank and "Add to Vocab" to notebook.

### 5. Mistakes Bank & Saved Questions
- **Mistakes Bank**: Automatically catalogs all missed questions from every submitted attempt. Features an interactive **"Quick Re-test"** input to verify concept mastery before marking questions as resolved.
- **Saved Questions**: Bookmarked challenging questions with personal notes.

### 6. Academic Vocabulary Notebook
- Curated high-yield academic words (e.g. *Anthropogenic*, *Evapotranspiration*, *Monoculture*, *Syntactic Displacement*, *Ergonomics*, *Hydraulic Setting*).
- Bilingual definitions (English & Vietnamese), pronunciation IPA, and context sentences extracted from reading passages.
- Mastery tracking: **New**, **Learning**, **Mastered**.
- Add custom vocabulary entries, edit, and search.

### 7. Progress Analytics & Learning Goals
- Target Band Goal tracker (customizable from Band 4.0 to 9.0).
- Band score evolution trajectory chart across practice attempts.
- Cumulative accuracy across all 14 question types, pinpointing strongest areas and primary targets for improvement.

### 8. Full Bilingual Support & Theme Switcher
- **Interface Language**: Instant toggle between **English** and **Tiếng Việt**.
- **Appearance**: Light Mode, Dark Mode, and System Theme preference with accessible contrast ratios.

### 9. Data Portability & Safety
- Full export of all personal attempts, wrong answers, saved questions, and vocabulary items to a single JSON backup file.
- Instant JSON import and data restoration.
- Safe factory reset with confirmation dialog.

---

## 📁 Project Architecture & File Structure

```text
ielts-reading-mock.github.io-main/
├── index.html                   # Main Single Page Application entry point
├── 404.html                     # GitHub Pages fallback redirect
├── package.json                 # Project configuration & npm test/start scripts
├── server.js                    # Zero-dependency Node.js HTTP server
├── README.md                    # Project documentation
├── css/
│   ├── variables.css            # Design tokens, color palettes, dark/light themes
│   ├── base.css                 # Reset, typography, accessibility, animations
│   ├── components.css           # Buttons, inputs, modals, cards, tabs, toasts, navigator
│   ├── layouts.css              # App shell, responsive sidebar, topbar, mobile nav
│   ├── workspace.css            # Split 2-column workspace, reading tools, highlighters
│   ├── questions.css            # Styling for all 14 IELTS question types, tables, SVG diagrams
│   └── review.css               # Results hero, review cards, vocab grid, analytics charts
├── src/
│   ├── app.js                   # Main application bootstrap & shell mounting
│   ├── router.js                # Hash-based SPA client router
│   ├── state/
│   │   ├── store.js             # Central reactive state store & actions
│   │   └── i18n.js              # English & Vietnamese translation dictionary & switcher
│   ├── services/
│   │   ├── storageService.js    # LocalStorage manager, backup export/import & migrations
│   │   ├── scoringService.js    # IELTS evaluation engine & official Band score conversion
│   │   ├── timerService.js      # Deadline-based resilient countdown timer
│   │   └── textHighlighter.js   # Reading passage text selection & highlighter engine
│   ├── data/
│   │   ├── index.js             # Test catalog service & filtering engine
│   │   ├── vocabulary-seeds.js  # Curated academic vocabulary items with bilingual definitions
│   │   └── tests/
│   │       ├── academic-full-1.js    # Full Academic Test (3 Passages, 40 Questions)
│   │       ├── general-full-1.js     # Full General Training Test (3 Sections, 40 Questions)
│   │       ├── drill-ai-medicine.js  # Targeted Drill: AI in Medicine (13 Questions)
│   │       ├── drill-roman-aqueducts.js # Targeted Drill: Roman Aqueducts (14 Questions)
│   │       └── drill-habit-psychology.js# Targeted Drill: Habit Psychology (10 Questions)
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── Sidebar.js       # Desktop & mobile drawer navigation
│   │   │   ├── Header.js        # Header with streak, language, theme, breadcrumb
│   │   │   └── MobileNav.js     # Bottom navigation for mobile viewports
│   │   ├── common/
│   │   │   ├── Toast.js         # Accessible toast notification system
│   │   │   └── Modal.js         # Accessible modal dialog with focus trap
│   │   └── questions/
│   │       └── QuestionRenderer.js # Central question rendering dispatcher
│   └── views/
│       ├── DashboardView.js     # Greeting, key stats, resume test, recommendations
│       ├── LibraryView.js       # Test search, multi-condition filters, test cards
│       ├── TestDetailsView.js   # Test preview, structure, mode selector (Practice/Timed/Full)
│       ├── WorkspaceView.js     # Split 2-pane test workspace, timer, autosave, highlighter
│       ├── ResultsView.js       # Band score circle, raw score, passage & type breakdown
│       ├── AnswerReviewView.js  # Explanations, passage evidence quotes, save/vocab CTAs
│       ├── WrongAnswersView.js  # Mistakes bank with interactive re-test feature
│       ├── SavedQuestionsView.js# Bookmarked questions with personal notes
│       ├── VocabularyView.js    # Academic vocabulary notebook with mastery flashcards
│       ├── HistoryView.js       # Historical attempt log & score records
│       ├── AnalyticsView.js     # Band score trajectory chart, skill diagnostic breakdown
│       ├── SettingsView.js      # Theme, language, font size, goals, JSON backup/restore
│       └── HelpView.js          # IELTS reading strategy guide & question type tips
└── tests/
    ├── scoring.test.js          # Unit tests for text normalization, answer evaluation & band score
    ├── tests-integrity.test.js  # Content integrity verification (all 40 questions, answer keys, explanations)
    └── run-tests.js             # Automated test runner executable via Node.js
```

---

## 🚀 Getting Started

### 1. Run with Node.js Local Server
```bash
# Start the built-in zero-dependency local dev server
npm start
# or: node server.js
```
Open your browser and navigate to:
```text
http://localhost:3000
```

### 2. Run Automated Tests
```bash
# Run unit and content integrity tests
npm test
# or: node tests/run-tests.js
```
Expected output:
```text
========================================================
  READIFY IELTS - AUTOMATED TEST SUITE
========================================================

--- Running Scoring Service Tests ---
  ✓ PASS: Normalizes casing and trims whitespace
  ✓ PASS: Strips apostrophes
  ✓ PASS: Preserves numbers and words
  ✓ PASS: Normalizes true to TRUE
  ✓ PASS: Evaluates True correctly for TFNG
  ✓ PASS: Evaluates single MCQ case-insensitively
  ✓ PASS: Evaluates multi-select MCQ regardless of selection order
  ✓ PASS: Evaluates matching option from alternative list
  ✓ PASS: Academic: 40/40 is Band 9.0
  ✓ PASS: Academic: 30/40 is Band 7.0
  ✓ PASS: General: 40/40 is Band 9.0
  ✓ PASS: General: 34/40 is Band 7.0

--- Running Tests Content & Integrity Suite ---
  ✓ PASS: Contains at least 5 curated tests
  ✓ PASS: Academic Full Test 1 exists
  ✓ PASS: Academic Full Test 1 has exactly 3 passages
  ✓ PASS: Academic Full Test 1 has exactly 40 questions
  ✓ PASS: Questions sequentially numbered 1 to 40
  ✓ PASS: General Training Full Test 1 exists
  ✓ PASS: General Training Full Test 1 has exactly 3 sections
  ✓ PASS: General Training Full Test 1 has exactly 40 questions
  ✓ PASS: Every question across all tests has valid id, prompt, answerKey, evidence and explanation

========================================================
  RESULTS: 34 Passed | 0 Failed
========================================================
ALL TESTS PASSED WITH ZERO ERRORS.
```

### 3. Deploying to GitHub Pages
Because Readify IELTS uses native modern ECMAScript modules (`<script type="module">`) and standard CSS tokens without any build step required:
1. Push the repository to GitHub.
2. In your repository settings under **Pages**, set the source to deploy from the `main` branch root (`/`).
3. Your site will immediately be live at `https://<username>.github.io/<repo-name>/`.

---

## 🔌 Future Backend Integration Guide

Readify IELTS was architected with a decoupled service layer. When integrating with a real backend or REST/GraphQL API:

1. **Answer Keys & Sensitive Scoring**:
   - Currently, `scoringService.js` performs client-side evaluation.
   - For secure, official testing environments, move the evaluation logic and `answerKey` objects to a secure backend endpoint (e.g. `POST /api/tests/{id}/submit`), returning only the scored `TestAttempt` and results JSON to the client.

2. **Persistence Layer**:
   - `StorageService.js` provides centralized getter and setter methods (`getAttempts`, `saveAttempt`, `getSavedQuestions`, `getVocabulary`, etc.).
   - Replace the internal `localStorage` calls inside `StorageService.js` with `fetch('/api/...')` asynchronous calls without changing any UI view code.

3. **User Authentication**:
   - Add an `AuthService.js` and inject authentication headers (e.g. `Bearer <jwt>`) into the service layer.

---

## 📄 License
MIT License. Built for education and learning excellence.
