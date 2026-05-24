const express = require('express');
const router  = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authMiddleware = require('../middleware/auth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

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
5. preview.html — A self-contained HTML file. Follow this EXACT structure:
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Preview</title>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
// ALL components defined here inline — NO import/export statements
const Navbar = () => ( ... );
const Footer = () => ( ... );
const Home = () => ( ... );
const App = () => (
  <div>
    <Navbar />
    <main className="pt-20"><Home /></main>
    <Footer />
  </div>
);
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
</script>
</body>
</html>
CRITICAL RULES for preview.html:
- NO import or export statements anywhere
- NO React Router — no BrowserRouter, Routes, Route, Link — preview has no routing
- ALL components in ONE <script type="text/babel"> block
- App component renders Navbar + Home content + Footer directly, no router wrapper
- Last line MUST be: ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App))
- Only CDNs available: React, ReactDOM, Babel, Tailwind — nothing else

Return a JSON object with this exact shape:
{"files":[{"path":"src/App.jsx","language":"jsx","code":"..."},{"path":"src/components/Navbar.jsx","language":"jsx","code":"..."},{"path":"src/components/Footer.jsx","language":"jsx","code":"..."},{"path":"src/pages/Home.jsx","language":"jsx","code":"..."},{"path":"preview.html","language":"html","code":"..."}],"summary":"what was improved and why"}`;

    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: 'You are an expert React and Tailwind CSS developer. Return only valid JSON matching the requested schema.',
      generationConfig: {
        temperature:      0.65,
        maxOutputTokens:  8192,
        responseMimeType: 'application/json',
      },
    });

    let parsed = null;
    const MAX_RETRIES = 2;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) console.log(`[code-generation] retry attempt ${attempt}...`);
      try {
        const result = await model.generateContent(prompt);
        const text   = result.response.text().trim();
        console.log(`[code-generation] attempt ${attempt} raw (first 200):`, text.slice(0, 200));
        parsed = JSON.parse(text);
        if (parsed?.files?.length) break;
        parsed = null;
      } catch (parseErr) {
        console.warn(`[code-generation] attempt ${attempt} parse error:`, parseErr.message);
      }
    }

    if (!parsed) {
      return res.status(500).json({ error: 'Could not generate valid code after 3 attempts. Please try again.' });
    }

    // Post-process preview.html to fix common model mistakes
    if (parsed.files) {
      parsed.files = parsed.files.map(file => {
        if (file.path !== 'preview.html') return file;

        let html = file.code || '';

        // Fix "X as Y" destructuring → "X: Y" (ES module syntax invalid in browser script)
        html = html.replace(/\{([^}]*)\}/g, (match) =>
          match.replace(/(\w+)\s+as\s+(\w+)/g, '$1: $2')
        );

        return { ...file, code: html };
      });
    }

    res.json(parsed);
  } catch (err) {
    console.error('[code-generation] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
