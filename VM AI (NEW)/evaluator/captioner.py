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

_MIN_SIDE  = 20   # skip crops smaller than this (px)
_MAX_TOKENS = 30  # keep captions brief
_MAX_ELEMENTS = 8   # only caption the N largest elements for speed
_BATCH_SIZE = 8     # process crops in batches


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
        """Return elements with a 'caption' field, using batched inference on the largest elements."""
        if not self.available or not elements:
            return elements

        img = image.convert("RGB")

        # Pick the _MAX_ELEMENTS largest valid crops to caption
        def _area(e):
            x1, y1, x2, y2 = [int(v) for v in e["box"]]
            return (x2 - x1) * (y2 - y1)

        ranked = sorted(range(len(elements)), key=lambda i: _area(elements[i]), reverse=True)
        to_caption = {}
        for i in ranked:
            if len(to_caption) >= _MAX_ELEMENTS:
                break
            x1, y1, x2, y2 = [int(v) for v in elements[i]["box"]]
            if (x2 - x1) >= _MIN_SIDE and (y2 - y1) >= _MIN_SIDE:
                to_caption[i] = img.crop((x1, y1, x2, y2))

        # Batched BLIP inference
        captions = {}
        items = list(to_caption.items())
        for start in range(0, len(items), _BATCH_SIZE):
            batch = items[start:start + _BATCH_SIZE]
            idxs  = [b[0] for b in batch]
            crops = [b[1] for b in batch]
            inputs = self.processor(images=crops, return_tensors="pt", padding=True)
            with torch.no_grad():
                ids = self.model.generate(
                    **inputs,
                    max_new_tokens=_MAX_TOKENS,
                    num_beams=1,
                    do_sample=False,
                )
            for i, id_seq in zip(idxs, ids):
                captions[i] = self.processor.decode(id_seq, skip_special_tokens=True).strip()

        return [{**elem, "caption": captions.get(i, "")} for i, elem in enumerate(elements)]

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
