# save as download_models.py

from huggingface_hub import snapshot_download
import os
os.environ["HF_HUB_DOWNLOAD_TIMEOUT"] = "120"

print("\nDownloading WebUI ScreenRecognition...")
webui_path = snapshot_download(
    repo_id="biglab/webui-screenrecognition-web350k-vins",
    local_dir="./models/webui-screenrecognition"
)
print(f"WebUI model saved to: {webui_path}")