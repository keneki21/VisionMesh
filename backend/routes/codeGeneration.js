const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authMiddleware = require('../middleware/auth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { report, imageBase64, imageMimeType } = req.body;

    if (!report) {
      return res.status(400).json({ error: 'Evaluation report is required' });
    }

    // Build heuristic issues summary
    const issues = (report.heuristics || [])
      .filter(h => h.score < 7)
      .map(h => `- ${h.name} (score ${h.score}/10): ${h.issue} → Fix: ${h.solution}`)
      .join('\n');

    const allHeuristics = (report.heuristics || [])
      .map(h => `  • ${h.name}: ${h.score}/10`)
      .join('\n');

    const prompt = `You are an expert UI/UX developer. A web interface was evaluated and received an overall score of ${report.overall_score?.toFixed(1) || 'N/A'}/10 (Grade: ${report.grade || 'N/A'}).

HEURISTIC SCORES:
${allHeuristics}

ISSUES TO FIX:
${issues || 'All heuristics passed — generate an optimized version anyway.'}

TASK:
Generate a complete, production-ready React web page that fixes ALL the issues above. The generated UI should be significantly better than the evaluated one.

REQUIREMENTS:
- Use React functional components with hooks
- Use Tailwind CSS for all styling
- Fix every identified heuristic issue
- Modern, clean, professional design
- Fully responsive (mobile + desktop)
- Include realistic placeholder content
- Good accessibility (aria labels, semantic HTML)

OUTPUT FORMAT (respond with valid JSON only, no markdown, no explanation outside JSON):
{
  "files": [
    {
      "path": "App.jsx",
      "language": "jsx",
      "code": "// full file content here"
    },
    {
      "path": "components/Navbar.jsx",
      "language": "jsx",
      "code": "// full file content here"
    }
  ],
  "summary": "Brief description of what was improved and why"
}

Generate at least 3 files. Make the code complete and runnable.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    let result;
    if (imageBase64 && imageMimeType) {
      // Multimodal — send screenshot + prompt
      result = await model.generateContent([
        {
          inlineData: {
            mimeType: imageMimeType,
            data: imageBase64,
          },
        },
        prompt,
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    const text = result.response.text().trim();

    // Strip markdown code fences if Gemini wraps in ```json
    const clean = text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      return res.status(500).json({ error: 'Gemini returned invalid JSON', raw: text.slice(0, 500) });
    }

    res.json(parsed);
  } catch (err) {
    console.error('[code-generation] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
