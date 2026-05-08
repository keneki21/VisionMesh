"""
UICaptioner: captions each detected UI element crop using BLIP-base.

Enriches the element list from WebUIDetector by adding a 'caption' field to
each element, turning generic class names like "Icon" into descriptions like
"magnifying glass search icon" or "blue sign in button".

Requires:  python download_florence.py
"""

from pathlib import Path
from PIL import Image
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration

BASE_DIR   = Path(__file__).parent.parent
BLIP_PATH  = BASE_DIR / "models" / "blip-captioner"

_MIN_SIDE  = 20   # skip crops smaller than this (px) — too small to caption reliably
_MAX_TOKENS = 30  # keep captions brief


class UICaptioner:
    def __init__(self):
        self.available = False
        if not (BLIP_PATH / "config.json").exists():
            return
        try:
            print("  Loading BLIP captioner...")
            self.processor = BlipProcessor.from_pretrained(str(BLIP_PATH))
            self.model = BlipForConditionalGeneration.from_pretrained(
                str(BLIP_PATH)
            ).eval()
            self.available = True
        except Exception as e:
            print(f"  Warning: could not load captioner — {e}")

    def enrich(self, image: Image.Image, elements: list) -> list:
        """Return elements with an added 'caption' field for each detected region."""
        if not self.available:
            return elements

        img = image.convert("RGB")
        enriched = []
        for elem in elements:
            x1, y1, x2, y2 = [int(v) for v in elem["box"]]
            w, h = x2 - x1, y2 - y1
            if w < _MIN_SIDE or h < _MIN_SIDE:
                enriched.append({**elem, "caption": ""})
                continue
            crop = img.crop((x1, y1, x2, y2))
            enriched.append({**elem, "caption": self._caption(crop)})
        return enriched

    def _caption(self, crop: Image.Image) -> str:
        inputs = self.processor(images=crop, return_tensors="pt")
        with torch.no_grad():
            ids = self.model.generate(
                **inputs,
                max_new_tokens=_MAX_TOKENS,
                num_beams=1,
                do_sample=False,
            )
        return self.processor.decode(ids[0], skip_special_tokens=True).strip()
