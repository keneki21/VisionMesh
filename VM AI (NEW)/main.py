"""
Usage:
    python main.py <path/to/screenshot.png>

Evaluates a web UI screenshot against Nielsen's 10 usability heuristics
using UIClip (AI scoring) + WebUI element detection + rule-based checks.
Outputs a formatted report to the console and saves a JSON report alongside
the input image.
"""

import sys
from pathlib import Path
from PIL import Image

from evaluator.scorer     import UIClipScorer
from evaluator.detector   import WebUIDetector
from evaluator.captioner  import UICaptioner
from evaluator.heuristics import check as heuristic_check
from evaluator.report     import generate, save_json


def evaluate(image_path: str) -> None:
    path = Path(image_path)
    if not path.exists():
        print(f"Error: file not found — {image_path}")
        sys.exit(1)

    print(f"\n{'─'*60}")
    print(f"  Evaluating: {path.name}")
    print(f"{'─'*60}")

    image = Image.open(path).convert("RGB")
    print(f"  Image size : {image.width} x {image.height} px")

    # --- Step 1: UIClip scoring ---
    print("\n[1/3] Scoring heuristics with UIClip...")
    scorer = UIClipScorer()
    clip_scores = scorer.score(image)

    # --- Step 2: Element detection + captioning ---
    print("\n[2/3] Running WebUI element detection...")
    detector  = WebUIDetector()
    captioner = UICaptioner()
    if not detector.available:
        print("  Skipped — model not downloaded yet.")
        print("  Run:  python download_models.py")
    elements = detector.detect(image)
    if elements:
        print(f"  {len(elements)} elements detected.")
        elements = captioner.enrich(image, elements)
        captioned = sum(1 for e in elements if e.get("caption"))
        if captioned:
            print(f"  {captioned} elements captioned with Florence-2.")

    # --- Step 3: Rule-based heuristic checks ---
    print("\n[3/3] Applying rule-based heuristic checks...")
    extra_issues = heuristic_check(elements, clip_scores)

    # --- Report ---
    report, report_text = generate(clip_scores, extra_issues, str(path), elements)
    print("\n" + report_text)

    out_json = path.with_suffix(".report.json")
    save_json(report, str(out_json))
    print(f"\n  JSON report saved → {out_json}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py <screenshot.png>")
        sys.exit(1)
    evaluate(sys.argv[1])
