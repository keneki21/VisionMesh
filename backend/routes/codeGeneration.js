const express  = require('express');
const router   = express.Router();
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
    const issues       = (report.heuristics || [])
      .filter(h => h.score < 7)
      .map(h => `- ${h.name} (${Math.round(h.score * 10)}/100): ${h.solution}`)
      .join('\n');
    const filename     = report.filename || report.file || 'website';
    const elements     = report.elements || [];
    const elementTypes = [...new Set(elements.map(e => e.class || e.label).filter(Boolean))].slice(0, 6).join(', ');

    const prompt = `You are an expert HTML5 + Tailwind CSS developer. Generate a complete, high-quality website that fixes all the UX issues listed below.

Site: "${filename}"${elementTypes ? `. Detected UI elements: ${elementTypes}` : ''}
Original score: ${score}/100 (${grade})

ISSUES TO FIX:
${issues || 'No specific issues — maximize quality across all usability heuristics.'}

Generate exactly 2 files. Each must be COMPLETE, polished, and production-ready.

TECH STACK: HTML5 + Tailwind CSS via CDN + vanilla JS only.
NO React, NO Vue, NO build tools, NO import/export statements.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 1 — index.html (complete landing page)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Must include:
- <head> with charset, viewport, title, Tailwind CDN script
- Fixed navbar: logo left, nav links right, mobile hamburger (JS toggle), active states, aria-label
- Hero: bold headline, subheadline, primary CTA button, optional secondary CTA
- Features: 6 cards with icon, title, description
- Stats: 4 numbers with labels (e.g. "10K+ Users")
- Testimonials: 3 cards with quote, name, role, avatar initial
- CTA banner: full-width section with headline and button
- Footer: logo, 3 link columns, copyright line
- Smooth scroll, hover transitions, focus rings for accessibility
- Tailwind CDN: <script src="https://cdn.tailwindcss.com"></script>
- All JS inline in a single <script> at bottom of body

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 2 — contact.html (contact page)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Must include:
- Same navbar and footer as index.html (copy exactly)
- Contact form: name, email, subject, message fields
- All fields have visible labels, required markers (*)
- Inline validation on submit — highlight empty/invalid fields in red with error text
- Success state after submit (replace form with thank-you message)
- Company info sidebar: address, email, phone, hours
- Tailwind CDN same as index.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL RULES:
- Navbar links: index.html ↔ contact.html (relative hrefs)
- Real content — no "Lorem ipsum", no placeholder text
- Rich, modern Tailwind design — gradients, shadows, rounded corners
- Fix EVERY issue listed above — each solution must be visibly addressed
- Both files fully self-contained — no external CSS files, no external JS files

Return ONLY a valid JSON object, no markdown fences, no explanation:
{"files":[{"path":"index.html","language":"html","code":"..."},{"path":"contact.html","language":"html","code":"..."}],"summary":"2-3 sentences on what was improved and why"}`;

    const tryParse = (text) => {
      const clean = text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```[\s\S]*$/i, '').trim();
      try { return JSON.parse(clean); } catch {}
      const m = clean.match(/\{[\s\S]*"files"[\s\S]*\}/);
      if (m) { try { return JSON.parse(m[0]); } catch {} }
      return null;
    };

    let parsed   = null;
    let lastText = '';
    const MAX_RETRIES = 2;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) console.log(`[code-generation] retry attempt ${attempt}...`);

      const response = await client.messages.create({
        model:      CODEGEN_MODEL,
        max_tokens: 8192,
        system:     'You are an expert HTML and Tailwind CSS developer. Return only a valid JSON object. No markdown fences. No text outside the JSON.',
        messages: [{ role: 'user', content: prompt }],
      });

      lastText = response.content[0].text.trim();
      console.log(`[code-generation] attempt ${attempt} raw (first 200):`, lastText.slice(0, 200));
      parsed = tryParse(lastText);
      if (parsed?.files?.length) break;
      parsed = null;
    }

    if (!parsed) {
      console.error('[code-generation] all attempts failed. Last raw:', lastText.slice(0, 500));
      return res.status(500).json({ error: 'Could not generate valid code after 3 attempts. Please try again.' });
    }

    res.json(parsed);
  } catch (err) {
    console.error('[code-generation] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
