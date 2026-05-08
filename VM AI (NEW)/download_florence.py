"""
Downloads BLIP-base (image captioning) from Hugging Face (~900 MB).

Output:  models/blip-captioner/

Run:     python download_florence.py
"""

from pathlib import Path

OUT_DIR = Path(__file__).parent / "models" / "blip-captioner"


def download():
    try:
        from huggingface_hub import snapshot_download
    except ImportError:
        print("  ERROR: huggingface_hub not installed.")
        print("  Run:   pip install huggingface_hub")
        return

    if (OUT_DIR / "config.json").exists():
        print("  SKIP   BLIP captioner already downloaded.")
        print(f"         Found at: {OUT_DIR}")
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print("  Downloading BLIP-base captioner (~900 MB) ...")
    print("  This may take a few minutes depending on your connection.\n")

    try:
        snapshot_download(
            repo_id="Salesforce/blip-image-captioning-base",
            local_dir=str(OUT_DIR),
            ignore_patterns=["*.msgpack", "flax_model*", "tf_model*", "rust_model*"],
        )
        print(f"\n  Saved to: {OUT_DIR}")
        print("\nBLIP captioner ready. Captions will be enabled on next evaluation.")
    except Exception as e:
        print(f"\n  ERROR: {e}")
        print("  Try again or check your internet connection.")


if __name__ == "__main__":
    download()
