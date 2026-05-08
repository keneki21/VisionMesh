"""
Downloads the WebUI ScreenRecognition model files directly from the
public Hugging Face Space (no HF token required).

Source:  https://huggingface.co/spaces/biglab/webui-screenrecognition
Files:   res/screenrecognition-web350k-vins.torchscript  (~129 MB)
         res/class_map_vins_manual.json                  (~614 B)
Output:  models/webui-screenrecognition/

Models already present (no download needed):
  - UIClip          → CLIP processor/models/uiclip/
  - CLIP processor  → CLIP processor/models/clip-processor/
"""

import urllib.request
from pathlib import Path

BASE_URL = "https://huggingface.co/spaces/biglab/webui-screenrecognition/resolve/main/res"
OUT_DIR  = Path(__file__).parent / "models" / "webui-screenrecognition"

FILES = [
    ("class_map_vins_manual.json",                "Class map  (~614 B)"),
    ("screenrecognition-web350k-vins.torchscript", "Model      (~129 MB)"),
]


def _progress(desc: str):
    def hook(count, block_size, total_size):
        if total_size > 0:
            pct  = min(count * block_size / total_size * 100, 100)
            done = int(pct / 5)
            bar  = "█" * done + "░" * (20 - done)
            print(f"\r  [{bar}] {pct:5.1f}%  {desc}", end="", flush=True)
    return hook


def download():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Check existing models
    clip_dir = Path(__file__).parent / "CLIP processor" / "models"
    for name, sub in [("UIClip", "uiclip"), ("CLIP processor", "clip-processor")]:
        status = "FOUND  " if (clip_dir / sub).exists() else "MISSING"
        print(f"  {status}  {name}")

    print()

    for filename, desc in FILES:
        dest = OUT_DIR / filename
        if dest.exists():
            print(f"  SKIP   {desc}  (already downloaded)")
            continue
        url = f"{BASE_URL}/{filename}"
        print(f"  Downloading {desc}")
        try:
            urllib.request.urlretrieve(url, str(dest), reporthook=_progress(desc))
            print()  # newline after progress bar
            print(f"  Saved → {dest}")
        except Exception as e:
            print(f"\n  ERROR: {e}")
            if dest.exists():
                dest.unlink()  # remove partial file
            return

    print()
    print("All models ready.  Run:  python main.py <screenshot.png>")


if __name__ == "__main__":
    download()
