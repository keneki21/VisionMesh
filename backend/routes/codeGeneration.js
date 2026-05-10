const express = require('express');
const router  = express.Router();
const Groq    = require('groq-sdk');
const authMiddleware = require('../middleware/auth');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { report } = req.body;
    if (!report) return res.status(400).json({ error: 'Evaluation report is required' });

    const score = Math.round((report.overall_score || 0) * 10);
    const grade = report.grade || 'N/A';

    const issues = (report.heuristics || [])
      .filter(h => h.score < 7)
      .map(h => `• ${h.name} (${Math.round(h.score * 10)}/100)\n  Problem: ${h.issue}\n  Fix: ${h.solution}`)
      .join('\n\n');

    const passing = (report.heuristics || [])
      .filter(h => h.score >= 7)
      .map(h => `• ${h.name}: ${Math.round(h.score * 10)}/100`)
      .join('\n');

    // Infer website type from filename and elements
    const filename = (report.filename || '').toLowerCase();
    const elements = report.elements || [];
    const elementTypes = [...new Set(elements.map(e => e.class || e.label).filter(Boolean))].join(', ');

    const siteContext = filename
      ? `The evaluated website file was named "${report.filename}".`
      : 'The website type was inferred from the evaluation.';

    const elementsContext = elementTypes
      ? `Detected UI elements include: ${elementTypes}.`
      : '';

    const prompt = `You are a world-class UI/UX engineer building with React 18 + Tailwind CSS.

EVALUATION CONTEXT:
${siteContext} ${elementsContext}
Overall Score: ${score}/100 (Grade: ${grade})

HEURISTIC ISSUES TO FIX:
${issues || 'No critical issues — generate an exceptional design that maximizes all scores.'}

PASSING HEURISTICS (maintain these):
${passing || 'None'}

YOUR TASK:
Generate a COMPLETE, FULL-FLEDGED, PRODUCTION-QUALITY website that:
1. Fixes every single issue listed above
2. Maintains all passing heuristics
3. Looks visually stunning and modern
4. Has real, meaningful content (no Lorem Ipsum)
5. Includes all major website sections

GENERATE EXACTLY THESE FILES:

FILE 1 — src/App.jsx
React app with react-router-dom v6. Routes: /, /about, /contact. Includes Navbar + Footer on all pages.

FILE 2 — src/components/Navbar.jsx
Responsive navbar with: logo, nav links, mobile hamburger menu, active link highlighting, smooth scroll, accessible.

FILE 3 — src/components/Footer.jsx
Full footer with: logo, description, links grouped by category, social icons, copyright.

FILE 4 — src/pages/Home.jsx
Complete landing page with ALL these sections:
- Hero section with compelling headline, subtext, CTA buttons
- Features/Benefits section (6 feature cards with icons)
- Stats/Numbers section (4 impressive metrics)
- How it works section (3-4 steps)
- Testimonials section (3 cards)
- Call-to-action section
- All sections fix the identified heuristic issues

FILE 5 — src/pages/About.jsx
Full about page: mission statement, team section (4 members with roles), company values, timeline.

FILE 6 — src/pages/Contact.jsx
Contact page with: form (name, email, subject, message) with FULL validation, error messages, success state, contact info sidebar.

FILE 7 — preview.html
CRITICAL: A completely self-contained HTML file for live browser preview. Requirements:
- Uses React 18 UMD from CDN
- Uses ReactDOM 18 UMD from CDN
- Uses Babel Standalone from CDN for JSX compilation
- Uses Tailwind CSS from CDN
- ALL components written inline in a single <script type="text/babel"> block
- Renders the FULL homepage (Hero + Features + Stats + How It Works + Testimonials + CTA + Navbar + Footer)
- No external file imports — everything inline
- Must actually work when opened in a browser
- Use this exact CDN structure:
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>

DESIGN REQUIREMENTS:
- Color scheme: pick ONE cohesive palette that fits the site type
- Typography: clear hierarchy (display → heading → body → caption)
- Spacing: generous whitespace, 8px grid system
- Icons: use Unicode symbols/emoji or simple SVG inline (no icon libraries)
- Animations: CSS transitions on hover/focus states
- Dark mode support optional but encouraged
- Every interactive element has clear hover + focus states
- Form inputs have placeholder text and validation feedback

RESPOND WITH ONLY THIS JSON (no markdown, no code fences, no explanation):
{
  "files": [
    {"path": "src/App.jsx", "language": "jsx", "code": "..."},
    {"path": "src/components/Navbar.jsx", "language": "jsx", "code": "..."},
    {"path": "src/components/Footer.jsx", "language": "jsx", "code": "..."},
    {"path": "src/pages/Home.jsx", "language": "jsx", "code": "..."},
    {"path": "src/pages/About.jsx", "language": "jsx", "code": "..."},
    {"path": "src/pages/Contact.jsx", "language": "jsx", "code": "..."},
    {"path": "preview.html", "language": "html", "code": "..."}
  ],
  "summary": "What was improved and why, referencing the specific heuristic fixes"
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert React and Tailwind CSS developer. You ONLY respond with a single valid JSON object. Never use markdown code fences. Never add explanation outside the JSON. Your code must be complete and production-ready.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.65,
      max_tokens: 32000,
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
        catch { return res.status(500).json({ error: 'Could not parse response', raw: text.slice(0, 800) }); }
      } else {
        return res.status(500).json({ error: 'Invalid response format', raw: text.slice(0, 800) });
      }
    }

    res.json(parsed);
  } catch (err) {
    console.error('[code-generation] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
