FROM python:3.12-slim
WORKDIR /app

# System deps for OpenCV / PIL / torch
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p uploads

# Download model weights at build time so the image is self-contained.
# This avoids the Git LFS pointer problem — Railway clones the repo without
# LFS, so any large files in git are just pointer stubs at runtime.
RUN python download_models.py && python download_florence.py

# Pre-download UIClip from private HuggingFace repo (requires HF_TOKEN build arg)
ARG HF_TOKEN
ENV HF_TOKEN=${HF_TOKEN}
RUN python -c "
from huggingface_hub import login
import os
token = os.environ.get('HF_TOKEN')
if token:
    login(token=token)
from transformers import CLIPModel, CLIPProcessor
CLIPModel.from_pretrained('keneki21/visionmesh-uiclip')
CLIPProcessor.from_pretrained('keneki21/visionmesh-clip-processor')
print('UIClip ready.')
"

EXPOSE 5001
CMD ["python", "api_server.py"]
