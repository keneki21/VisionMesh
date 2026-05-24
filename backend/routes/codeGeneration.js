const express   = require('express');
const router    = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const authMiddleware = require('../middleware/auth');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CODEGEN_MODEL = process.env.CODEGEN_MODEL || 'claude-sonnet-4-6';

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { report } = req.body;
    if (!report) return res.status(400).json({ error: 'Evaluation report is required' });

    const score        = Math.round((report.overall_score || 0) * 10);
    const grade        = report.grade || 'N/A';
    const filename     = report.filename || report.file || 'website';
    const elements     = report.elements || [];
    const elementTypes = [...new Set(elements.map(e => e.class || e.label).filter(Boolean))].slice(0, 6).join(', ');
    const issues       = (report.heuristics || [])
      .filter(h => h.score < 7)
      .map(h => `- ${h.name} (${Math.round(h.score * 10)}/100): ${h.solution}`)
      .join('\n') || 'No specific issues — maximize quality across all usability heuristics.';

    const prompt = `You are an expert HTML5 + Tailwind CSS developer and UX designer.

A user submitted a UI screenshot for evaluation. Here is what we know about it:

Filename: "${filename}"
${elementTypes ? `Detected UI elements: ${elementTypes}` : ''}
UX Score: ${score}/100 (${grade})

UX ISSUES TO FIX:
${issues}

YOUR TASK:
Infer the type and purpose of the original UI from the filename and detected elements above.
Then generate a SINGLE complete, polished index.html that is an improved version of that same UI — same type, same purpose, but with all UX issues fixed and the design significantly elevated.

Examples:
- If the original was a login page → generate a better login page
- If it was a dashboard → generate a better dashboard
- If it was an e-commerce product page → generate a better product page
- If it was a landing page → generate a better landing page
- Match the domain/context too (e.g. a medical app should look medical, not generic SaaS)

TECH STACK: HTML5 + Tailwind CSS (CDN only) + vanilla JS. No frameworks, no imports.

REQUIREMENTS:
- <head> with charset, viewport, title, Tailwind CDN: <script src="https://cdn.tailwindcss.com"></script>
- Fixed navbar appropriate to the UI type with mobile hamburger (JS toggle) and aria-labels
- All sections relevant to the inferred UI type — rich, complete, real content
- Every UX issue listed above must be visibly addressed in the generated page
- Smooth interactions, hover states, visible focus rings for accessibility
- All JS inline in a single <script> at end of body
- Real content — no "Lorem ipsum", no placeholder text
- Modern Tailwind design: gradients, shadows, rounded corners, good typography

Return ONLY the raw HTML. No JSON wrapper. No markdown fences. No explanation.
Start directly with <!DOCTYPE html> and end with </html>.`;

    console.log('[code-generation] generating index.html...');

    const response = await client.messages.create({
      model:      CODEGEN_MODEL,
      max_tokens: 8000,
      system:     'You are an expert HTML and Tailwind CSS developer. Return only raw HTML. No markdown. No explanation. Start directly with <!DOCTYPE html>.',
      messages:   [{ role: 'user', content: prompt }],
    });

    let html = response.content[0].text.trim();
    html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();

    if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
      console.error('[code-generation] response does not look like HTML:', html.slice(0, 200));
      return res.status(500).json({ error: 'Generated output was not valid HTML. Please try again.' });
    }

    console.log('[code-generation] done, length:', html.length);

    // Short summary
    const summaryResponse = await client.messages.create({
      model:      CODEGEN_MODEL,
      max_tokens: 150,
      system:     'Be concise.',
      messages:   [{
        role:    'user',
        content: `In 2 sentences, summarize the UX improvements made to fix these issues:\n${issues}`,
      }],
    });
    const summary = summaryResponse.content[0].text.trim();

    res.json({
      files:   [{ path: 'index.html', language: 'html', code: html }],
      summary,
    });

  } catch (err) {
    console.error('[code-generation] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
