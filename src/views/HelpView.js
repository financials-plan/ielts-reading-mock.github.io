// Readify IELTS - Help & Practice Guide View Component
import { t } from '../state/i18n.js';

export function renderHelpView() {
  const container = document.createElement('div');
  container.className = 'content-container';

  container.innerHTML = `
    <div style="margin-bottom: var(--space-6);">
      <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
        💡 IELTS Reading Mastery Guide
      </h1>
      <p style="font-size: var(--text-sm); color: var(--text-muted);">
        Essential test strategies, pacing formulas, and question-type tactics for Band 7.0–9.0.
      </p>
    </div>

    <div style="display: flex; flex-direction: column; gap: var(--space-6);">
      <!-- Section 1: Test Overview & Formats -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-3); color: var(--color-primary);">
          1. IELTS Reading Format & Structure
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-3);">
          <div style="padding: var(--space-4); background-color: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <h3 style="font-size: var(--text-base); font-weight: 700; margin-bottom: 4px;">IELTS Academic</h3>
            <p style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.6; margin: 0;">
              Features 3 long academic texts sourced from journals, scientific books, and research magazines. Requires high lexical complexity, understanding of discursive arguments, and academic prose synthesis.
            </p>
          </div>
          <div style="padding: var(--space-4); background-color: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <h3 style="font-size: var(--text-base); font-weight: 700; margin-bottom: 4px;">IELTS General Training</h3>
            <p style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.6; margin: 0;">
              Section 1 tests everyday social survival (notices, timetables, volunteer adverts); Section 2 focuses on workplace training and employee handbooks; Section 3 features one extended descriptive passage.
            </p>
          </div>
        </div>
        <p style="font-size: var(--text-sm); color: var(--text-body); line-height: 1.6; margin: 0;">
          Both formats contain <strong>40 questions</strong> to be completed in <strong>60 minutes</strong>. Note that in paper-based IELTS Reading, unlike Listening, there is NO extra transfer time at the end: answers must be entered directly.
        </p>
      </div>

      <!-- Section 2: Pacing & Time Management (The 17-20-23 Rule) -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-3); color: var(--color-primary);">
          2. The 17–20–23 Minute Pacing Strategy
        </h2>
        <p style="font-size: var(--text-sm); color: var(--text-body); line-height: 1.6; margin-bottom: var(--space-3);">
          Because passages increase progressively in difficulty, spending exactly 20 minutes per passage often leaves candidates starved of time for the dense arguments in Passage 3.
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); text-align: center;">
          <div style="padding: var(--space-3); background-color: var(--color-primary-subtle); border-radius: var(--radius-md);">
            <div style="font-weight: 800; font-size: var(--text-lg); color: var(--color-primary);">17 Mins</div>
            <div style="font-size: var(--text-xs); color: var(--text-body); margin-top: 2px;">Passage 1 (Easiest)</div>
          </div>
          <div style="padding: var(--space-3); background-color: var(--color-accent-light); border-radius: var(--radius-md);">
            <div style="font-weight: 800; font-size: var(--text-lg); color: var(--color-accent-hover);">20 Mins</div>
            <div style="font-size: var(--text-xs); color: var(--text-body); margin-top: 2px;">Passage 2 (Moderate)</div>
          </div>
          <div style="padding: var(--space-3); background-color: var(--color-danger-light); border-radius: var(--radius-md);">
            <div style="font-weight: 800; font-size: var(--text-lg); color: var(--color-danger);">23 Mins</div>
            <div style="font-size: var(--text-xs); color: var(--text-body); margin-top: 2px;">Passage 3 (Dense/Abstract)</div>
          </div>
        </div>
      </div>

      <!-- Section 3: Essential Reading Skills -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-3); color: var(--color-primary);">
          3. Core Methodologies: Skim, Scan & Close Read
        </h2>
        <div style="display: flex; flex-direction: column; gap: var(--space-3); font-size: var(--text-sm); line-height: 1.6;">
          <div>
            <strong>1. Skimming (2–3 minutes):</strong> Read the title, subtitle, first sentence of every paragraph, and final concluding sentence to map out the text's architecture and general conceptual flow.
          </div>
          <div>
            <strong>2. Scanning (Targeted Search):</strong> When reading a question prompt, identify 'anchor keywords'—proper nouns, numbers, technical terminology, and dates that cannot be easily paraphrased in the text.
          </div>
          <div>
            <strong>3. Close Intensive Reading:</strong> Once your anchor keywords lead you to the exact sentence and paragraph, read 1–2 sentences before and after to verify subtle qualifiers (e.g. <em>some, all, frequently, solely, unlikely</em>).
          </div>
        </div>
      </div>

      <!-- Section 4: Tackling High-Stakes Question Types -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-3); color: var(--color-primary);">
          4. High-Stakes Question Types Guide
        </h2>
        <div style="display: flex; flex-direction: column; gap: var(--space-4); font-size: var(--text-sm); line-height: 1.6;">
          <div style="padding-left: var(--space-3); border-left: 3px solid var(--color-warning);">
            <strong>True / False / Not Given vs Yes / No / Not Given:</strong>
            <ul style="margin-top: 4px; padding-left: var(--space-4);">
              <li><strong>TRUE / YES:</strong> The passage explicitly asserts the same fact or view (using exact paraphrasing).</li>
              <li><strong>FALSE / NO:</strong> The passage explicitly contradicts the statement (the opposite is stated as true).</li>
              <li><strong>NOT GIVEN:</strong> The text neither confirms nor contradicts the statement. Do not import personal world knowledge!</li>
            </ul>
          </div>

          <div style="padding-left: var(--space-3); border-left: 3px solid var(--color-primary);">
            <strong>Matching Headings:</strong>
            <p style="margin: 4px 0 0;">
              Always do Matching Headings FIRST before answering detailed questions for that passage. Watch out for headings that merely repeat words found in a single example sentence rather than capturing the paragraph's overarching core theme.
            </p>
          </div>

          <div style="padding-left: var(--space-3); border-left: 3px solid var(--color-success);">
            <strong>Completion & Short Answer:</strong>
            <p style="margin: 4px 0 0;">
              Strictly heed word count limits (e.g. "NO MORE THAN TWO WORDS"). Words taken from the text must be spelled identically without alteration. Hyphenated words (e.g. <em>well-known</em>) count as a single word.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 5: Using Readify IELTS Features -->
      <div class="card">
        <h2 style="font-size: var(--text-lg); font-weight: 700; margin-bottom: var(--space-3); color: var(--color-primary);">
          5. Getting the Most Out of Readify IELTS
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-3); font-size: var(--text-xs); color: var(--text-body);">
          <div style="padding: var(--space-3); background-color: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <strong>🖍️ Reading Highlighter</strong>
            <div style="margin-top: 2px;">Select any sentence in the passage to highlight it with yellow, green, blue, or pink marker. Highlights persist across your sessions.</div>
          </div>
          <div style="padding: var(--space-3); background-color: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <strong>🔍 Focus Mode</strong>
            <div style="margin-top: 2px;">Click "Focus Mode" in the reading toolbar to expand the reading pane to 100% width for undisturbed deep reading.</div>
          </div>
          <div style="padding: var(--space-3); background-color: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <strong>🎯 Mistakes Bank</strong>
            <div style="margin-top: 2px;">All missed questions are automatically archived under "Mistakes Bank". Use the interactive re-test feature to verify mastery.</div>
          </div>
          <div style="padding: var(--space-3); background-color: var(--bg-surface-subtle); border-radius: var(--radius-md);">
            <strong>📖 Vocab Notebook</strong>
            <div style="margin-top: 2px;">Save difficult academic words with English and Vietnamese translations. Track your mastery level from New to Mastered.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
}
