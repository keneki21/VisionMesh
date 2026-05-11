const express = require('express');
const router  = express.Router();
const OpenAI  = require('openai');
const authMiddleware = require('../middleware/auth');

// Ollama is OpenAI-compatible at /v1
// Uses Railway internal networking — free, no internet required
const ollama = new OpenAI({
  apiKey:  'ollama',
  baseURL: `${process.env.OLLAMA_URL || 'http://localhost:11434'}/v1`,
});

const MODEL = process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b';

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
    const filename     = report.filename || 'website';
    const elements     = report.elements || [];
    const elementTypes = [...new Set(elements.map(e => e.class || e.label).filter(Boolean))].slice(0, 6).join(', ');

    const prompt = `You are an expert React 18 + Tailwind CSS developer. Generate a complete website fixing all UX issues.

Site: "${filename}"${elementTypes ? `. UI elements: ${elementTypes}` : ''}. Score: ${score}/100 (${grade}).

FIXES REQUIRED:
${issues || 'Maximize quality across all usability heuristics.'}

Generate exactly 5 files. Make each COMPLETE and production-ready.

CRITICAL LAYOUT RULE: Navbar must be fixed (fixed top-0 z-50). All page content must have pt-20 to clear the navbar.

1. src/App.jsx — React Router v6, routes "/" and "/contact", Navbar + Footer on all pages, main content in <main className="pt-20">
2. src/components/Navbar.jsx — fixed top navbar, mobile hamburger, active links, aria labels
3. src/components/Footer.jsx — full footer, grouped links, copyright
4. src/pages/Home.jsx — complete landing page: hero, 6 feature cards, 4 stats, 3 testimonials, CTA. Tailwind only. Real content. Fix ALL issues above.
5. preview.html — standalone HTML with these CDNs only:
   <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
   <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
   <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
   <script src="https://cdn.tailwindcss.com"></script>
   One <script type="text/babel"> with all components inline. Body has pt-20. ReactDOM.createRoot renders full homepage.

Respond ONLY with valid JSON (no markdown):
{"files":[{"path":"src/App.jsx","language":"jsx","code":"..."},{"path":"src/components/Navbar.jsx","language":"jsx","code":"..."},{"path":"src/components/Footer.jsx","language":"jsx","code":"..."},{"path":"src/pages/Home.jsx","language":"jsx","code":"..."},{"path":"preview.html","language":"html","code":"..."}],"summary":"what was improved and why"}`;

    const completion = await ollama.chat.completions.create({
      model:       MODEL,
      messages: [
        {
          role:    'system',
          content: 'You are an expert React and Tailwind CSS developer. Respond ONLY with a valid JSON object. No markdown fences. No text outside JSON.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.65,
      // Ollama does not enforce max_tokens the same way — set num_predict via options
      options: { num_predict: 8000 },
    });

    const text  = completion.choices[0]?.message?.content?.trim() || '';
    const clean = text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      const match = clean.match(/\{[\s\S]*\}/);
      if (match) {
        try { parsed = JSON.parse(match[0]); }
        catch { return res.status(500).json({ error: 'Could not parse response', raw: text.slice(0, 500) }); }
      } else {
        return res.status(500).json({ error: 'Invalid response format', raw: text.slice(0, 500) });
      }
    }

    res.json(parsed);
  } catch (err) {
    console.error('[code-generation] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
