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

# Pre-download the CLIP fallback model so first request doesn't stall.
RUN python -c "from transformers import CLIPModel, CLIPProcessor; CLIPModel.from_pretrained('openai/clip-vit-base-patch32'); CLIPProcessor.from_pretrained('openai/clip-vit-base-patch32'); print('CLIP ready.')"

EXPOSE 5001
CMD ["python", "api_server.py"]
