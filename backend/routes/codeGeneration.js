const express   = require('express');
const router    = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const authMiddleware = require('../middleware/auth');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CODEGEN_MODEL = process.env.CODEGEN_MODEL || 'claude-sonnet-4-6';

// Shared context built from the evaluation report
function buildContext(report) {
  const score        = Math.round((report.overall_score || 0) * 10);
  const grade        = report.grade || 'N/A';
  const filename     = report.filename || report.file || 'website';
  const elements     = report.elements || [];
  const elementTypes = [...new Set(elements.map(e => e.class || e.label).filter(Boolean))].slice(0, 6).join(', ');
  const issues       = (report.heuristics || [])
    .filter(h => h.score < 7)
    .map(h => `- ${h.name} (${Math.round(h.score * 10)}/100): ${h.solution}`)
    .join('\n') || 'No specific issues — maximize quality across all usability heuristics.';

  return { score, grade, filename, elementTypes, issues };
}

// Generate one file per call to avoid token truncation
async function generateFile(fileSpec, ctx, sharedNav) {
  const { score, grade, filename, elementTypes, issues } = ctx;

  const isIndex = fileSpec === 'index';

  const prompt = isIndex
    ? `You are an expert HTML5 + Tailwind CSS developer.

Generate index.html — a COMPLETE, production-ready landing page.

Site: "${filename}"${elementTypes ? `. UI elements: ${elementTypes}` : ''}
Score: ${score}/100 (${grade})

ISSUES TO FIX:
${issues}

REQUIREMENTS:
- Fixed navbar: logo left, nav links right (Home, Contact), mobile hamburger with JS toggle, aria-labels
- Hero: bold headline, subheadline, prominent CTA button, optional secondary CTA
- Features section: 6 cards each with an SVG icon, title, and 2-sentence description
- Stats section: 4 numbers with labels (e.g. "10K+ Users", "99% Uptime")
- Testimonials: 3 cards with quote, name, role, and avatar (initials in a colored circle)
- CTA banner: full-width with headline and button
- Footer: logo, 3 columns of links, copyright
- Smooth scroll, hover transitions, visible focus rings
- Tailwind CDN: <script src="https://cdn.tailwindcss.com"></script>
- All JS inline in ONE <script> at end of body
- Link to contact.html in navbar and CTA buttons where appropriate

DESIGN: Rich modern Tailwind — gradients, shadows, rounded-xl, real content, NO Lorem ipsum.
Fix EVERY issue listed. Each solution must be visibly addressed in the page.

Return ONLY the raw HTML. No JSON. No markdown. Just the complete HTML file starting with <!DOCTYPE html>.`

    : `You are an expert HTML5 + Tailwind CSS developer.

Generate contact.html — a COMPLETE, production-ready contact page.

Site: "${filename}"
Score: ${score}/100 (${grade})

USE THIS EXACT NAVBAR AND FOOTER (copy verbatim):
${sharedNav}

REQUIREMENTS:
- Same fixed navbar and footer as above (copy exactly, links: index.html and contact.html)
- Contact form with fields: Full Name*, Email*, Subject*, Message*
- Visible labels above every field, red asterisk for required
- On submit: validate all fields — highlight invalid ones in red with error text below
- On success: replace form with a styled thank-you message
- Sidebar with company info: address, email, phone, business hours
- Tailwind CDN: <script src="https://cdn.tailwindcss.com"></script>
- All JS inline in ONE <script> at end of body

DESIGN: Match the style of index.html. Real content, NO Lorem ipsum.

Return ONLY the raw HTML. No JSON. No markdown. Just the complete HTML file starting with <!DOCTYPE html>.`;

  const response = await client.messages.create({
    model:      CODEGEN_MODEL,
    max_tokens: 8000,
    system:     'You are an expert HTML and Tailwind CSS developer. Return only raw HTML. No markdown. No explanation. Start directly with <!DOCTYPE html>.',
    messages:   [{ role: 'user', content: prompt }],
  });

  let html = response.content[0].text.trim();
  // Strip any accidental markdown fences
  html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();
  return html;
}

// Extract navbar + footer block from generated index.html so contact.html matches exactly
function extractNavAndFooter(indexHtml) {
  const navMatch    = indexHtml.match(/<nav[\s\S]*?<\/nav>/i);
  const footerMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/i);
  const nav    = navMatch    ? navMatch[0]    : '';
  const footer = footerMatch ? footerMatch[0] : '';
  return nav && footer ? `NAVBAR:\n${nav}\n\nFOOTER:\n${footer}` : '';
}

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { report } = req.body;
    if (!report) return res.status(400).json({ error: 'Evaluation report is required' });

    const ctx = buildContext(report);

    // Step 1: generate index.html
    console.log('[code-generation] generating index.html...');
    const indexHtml = await generateFile('index', ctx, null);
    console.log('[code-generation] index.html done, length:', indexHtml.length);

    // Step 2: extract nav/footer, generate contact.html
    const sharedNav = extractNavAndFooter(indexHtml);
    console.log('[code-generation] generating contact.html...');
    const contactHtml = await generateFile('contact', ctx, sharedNav);
    console.log('[code-generation] contact.html done, length:', contactHtml.length);

    // Step 3: build summary
    const summaryResponse = await client.messages.create({
      model:      CODEGEN_MODEL,
      max_tokens: 200,
      system:     'You are a UX expert. Be concise.',
      messages:   [{
        role:    'user',
        content: `In 2-3 sentences, summarize what UX improvements were made to fix these issues:\n${ctx.issues}`,
      }],
    });
    const summary = summaryResponse.content[0].text.trim();

    res.json({
      files: [
        { path: 'index.html',   language: 'html', code: indexHtml   },
        { path: 'contact.html', language: 'html', code: contactHtml },
      ],
      summary,
    });

  } catch (err) {
    console.error('[code-generation] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
