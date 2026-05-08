from pathlib import Path
import json
import torch
import torchvision.transforms as T
from PIL import Image

BASE_DIR       = Path(__file__).parent.parent
MODEL_PATH     = BASE_DIR / "models" / "webui-screenrecognition" / "screenrecognition-web350k-vins.torchscript"
CLASS_MAP_PATH = BASE_DIR / "models" / "webui-screenrecognition" / "class_map_vins_manual.json"

CONFIDENCE_THRESHOLD = 0.4  # matches app.py default

# app.py uses ONLY ToTensor — no ImageNet normalization
_TRANSFORM = T.ToTensor()


class WebUIDetector:
    def __init__(self):
        self.available = False
        if not MODEL_PATH.exists() or not CLASS_MAP_PATH.exists():
            return
        try:
            self.model = torch.jit.load(str(MODEL_PATH)).eval()
            with open(CLASS_MAP_PATH) as f:
                raw = json.load(f)
            # JSON format: {"idx2Label": {"0": "BACKGROUND", ...}, "label2Idx": {...}}
            self.classes = {int(k): v for k, v in raw["idx2Label"].items()}
            self.available = True
        except Exception as e:
            print(f"  Warning: could not load WebUI detector — {e}")

    def detect(self, image: Image.Image) -> list:
        if not self.available:
            return []
        # app.py passes a list: model([tensor]), not model(tensor.unsqueeze(0))
        img_tensor = _TRANSFORM(image.convert("RGB"))
        with torch.no_grad():
            _, pred = self.model([img_tensor])
        return self._parse(pred)

    def _parse(self, pred) -> list:
        detections = []
        try:
            result = pred[0]  # pred is a list of per-image dicts
            boxes  = result["boxes"]
            scores = result["scores"]
            labels = result["labels"]
            for box, score, label in zip(boxes, scores, labels):
                if float(score) >= CONFIDENCE_THRESHOLD:
                    detections.append({
                        "class":      self.classes.get(int(label), f"class_{int(label)}"),
                        "confidence": round(float(score), 3),
                        "box":        [round(float(x), 1) for x in box],
                    })
        except Exception:
            pass
        return detections
