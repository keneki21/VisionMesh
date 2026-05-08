const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const EvaluationHistory = require("../models/EvaluationHistory");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", (req, res) => {
  upload.single("screenshot")(req, res, async (multerErr) => {
    if (multerErr) {
      console.error("[evaluate] multer error:", multerErr.message);
      return res.status(400).json({ error: `File upload error: ${multerErr.message}` });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No screenshot file provided" });
    }

    const form = new FormData();
    form.append("screenshot", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    try {
      const response = await axios.post("http://localhost:5001/evaluate", form, {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000,
      });

      const report = response.data;

      // Persist full evaluation to history (fire-and-forget)
      EvaluationHistory.create({
        filename:      req.file.originalname,
        score:         Math.round((report.overall_score || 0) * 10),
        grade:         report.grade || 'N/A',
        report,
        imageData:     req.file.buffer.toString('base64'),
        imageMimeType: req.file.mimetype,
      }).catch(err => console.error('[history] save error:', err.message));

      res.json(report);
    } catch (err) {
      console.error("[evaluate] python error:", err.message, err.response?.data);
      const status = err.response?.status || 500;
      const data = err.response?.data || { error: err.message };
      res.status(status).json(data);
    }
  });
});

module.exports = router;
