"""
Downloads UIClip and its CLIP processor from private HuggingFace repos.
Requires HF_TOKEN environment variable for private repo access.
"""
import os
from huggingface_hub import login
from transformers import CLIPModel, CLIPProcessor

token = os.environ.get("HF_TOKEN")
if token:
    login(token=token)
    print("Logged in to HuggingFace Hub.")

print("Downloading UIClip model...")
CLIPModel.from_pretrained("keneki21/visionmesh-uiclip")
CLIPProcessor.from_pretrained("keneki21/visionmesh-clip-processor")
print("UIClip ready.")
