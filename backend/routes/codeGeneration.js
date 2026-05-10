const express = require('express');
const router  = express.Router();
const OpenAI  = require('openai');
const authMiddleware = require('../middleware/auth');

const together = new OpenAI({
  apiKey:  process.env.CEREBRAS_API_KEY,
  baseURL: 'https://api.cerebras.ai/v1',
});

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
    const elementTypes = [...new Set(elements.map(e => e.class || e.label).filter(Boolean))].slice(0, 8).join(', ');

    const prompt = `You are an expert React 18 + Tailwind CSS developer. Generate a complete website fixing all UX issues.

Site: "${filename}"${elementTypes ? `. Detected UI elements: ${elementTypes}` : ''}.
Score: ${score}/100 (${grade}).

FIXES REQUIRED:
${issues || 'Maximize quality across all usability heuristics.'}

Generate exactly these 5 files as a single JSON object. Each must be COMPLETE and production-ready.

1. src/App.jsx — React Router v6, routes "/" and "/contact", Navbar + Footer on every page
2. src/components/Navbar.jsx — responsive, mobile hamburger, active links, accessible
3. src/components/Footer.jsx — full footer, links, social icons, copyright
4. src/pages/Home.jsx — FULL landing page: hero, 6 feature cards, 4 stats, 3 testimonials, CTA. Tailwind only. Real content. Fix ALL issues above.
5. preview.html — Self-contained using ONLY these CDNs:
   <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
   <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
   <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
   <script src="https://cdn.tailwindcss.com"></script>
   All JSX in one <script type="text/babel">. ReactDOM.createRoot renders full homepage with Navbar + Footer.

Respond ONLY with valid JSON, no markdown:
{"files":[{"path":"src/App.jsx","language":"jsx","code":"..."},{"path":"src/components/Navbar.jsx","language":"jsx","code":"..."},{"path":"src/components/Footer.jsx","language":"jsx","code":"..."},{"path":"src/pages/Home.jsx","language":"jsx","code":"..."},{"path":"preview.html","language":"html","code":"..."}],"summary":"what was improved and why"}`;

    const completion = await together.chat.completions.create({
      model: 'llama3.3-70b',
      messages: [
        {
          role: 'system',
          content: 'You are an expert React and Tailwind CSS developer. Respond ONLY with a valid JSON object. No markdown fences. No text outside JSON.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.65,
      max_tokens: 16000,
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
