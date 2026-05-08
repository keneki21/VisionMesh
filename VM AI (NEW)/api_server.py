"""
VisionMesh AI API Server
REST-only, no HTML UI. Run: python api_server.py
Port: 5001
"""

import uuid
from pathlib import Path

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

from evaluator.scorer     import UIClipScorer
from evaluator.detector   import WebUIDetector
from evaluator.captioner  import UICaptioner
from evaluator.heuristics import check as heuristic_check
from evaluator.report     import generate

app = Flask(__name__)
CORS(app, origins=["http://localhost:5000", "http://localhost:5173"])

UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

print("Loading AI models…")
_scorer    = UIClipScorer()
_detector  = WebUIDetector()
_captioner = UICaptioner()
if not _detector.available:
    print("  WebUI detector not available — run download_models.py first.")
if not _captioner.available:
    print("  BLIP captioner not available — run download_florence.py first.")
print("Ready.\n")


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/evaluate", methods=["POST"])
def evaluate():
    file = request.files.get("screenshot")
    if not file or not file.filename:
        return jsonify({"error": "No screenshot file provided"}), 400

    ext   = Path(file.filename).suffix.lower() or ".png"
    uid   = uuid.uuid4().hex[:8]
    saved = UPLOAD_DIR / f"{uid}{ext}"
    file.save(str(saved))

    try:
        image        = Image.open(saved).convert("RGB")
        clip_scores  = _scorer.score(image)
        elements     = _detector.detect(image)
        elements     = _captioner.enrich(image, elements)
        extra_issues = heuristic_check(elements, clip_scores)
        report, _    = generate(clip_scores, extra_issues, file.filename, elements)
        return jsonify(report)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(debug=False, port=5001, host="0.0.0.0")
