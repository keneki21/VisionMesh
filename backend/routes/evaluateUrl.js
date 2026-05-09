const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const os = require('os');
const EvaluationHistory = require('../models/EvaluationHistory');
const authMiddleware = require('../middleware/auth');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

router.post('/', authMiddleware, async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Validate and normalize URL
  let parsedUrl;
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    parsedUrl = new URL(fullUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  let browser;
  let tempFile;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
             '--disable-gpu', '--disable-extensions', '--disable-background-networking'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(parsedUrl.href, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });

    // Brief wait for above-the-fold rendering
    await new Promise(r => setTimeout(r, 1000));

    // Take viewport-only screenshot as JPEG for smaller payload
    const screenshotBuffer = await page.screenshot({
      fullPage: false,
      type: 'jpeg',
      quality: 75,
    });

    await browser.close();
    browser = null;

    // Save to temp file for form-data
    tempFile = path.join(os.tmpdir(), `screenshot-${Date.now()}.png`);
    fs.writeFileSync(tempFile, screenshotBuffer);

    // Send to Python evaluator
    const form = new FormData();
    const hostname = parsedUrl.hostname.replace('www.', '');
    const filename = `${hostname}-screenshot.png`;

    form.append('screenshot', fs.createReadStream(tempFile), {
      filename,
      contentType: 'image/png',
    });

    const response = await axios.post(`${AI_SERVICE_URL}/evaluate`, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 120000,
    });

    const report = response.data;

    // Save to history (fire-and-forget)
    const historyEntry = await EvaluationHistory.create({
      userId:        req.user?.id,
      filename,
      score:         Math.round((report.overall_score || 0) * 10),
      grade:         report.grade || 'N/A',
      report,
      imageData:     Buffer.from(screenshotBuffer),
      imageMimeType: 'image/jpeg',
    });

    res.json({
      report,
      historyId: historyEntry._id,
      imageBase64: screenshotBuffer.toString('base64'),
      imageMimeType: 'image/jpeg',
    });

  } catch (err) {
    if (browser) {
      await browser.close().catch(() => {});
    }

    console.error('[evaluate-url] error:', err.message);

    if (err.name === 'TimeoutError') {
      return res.status(504).json({ error: 'Page took too long to load. Try a different URL or check your internet connection.' });
    }

    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'Cannot reach that website. Check the URL and your internet connection.' });
    }

    if (err.response?.status) {
      return res.status(err.response.status).json({ error: `Python service error: ${err.response.data?.error || err.message}` });
    }

    const errMsg = err.message || 'Failed to capture screenshot';
    res.status(500).json({ error: errMsg });

  } finally {
    // Cleanup temp file
    if (tempFile) {
      fs.unlink(tempFile, () => {});
    }
  }
});

module.exports = router;


