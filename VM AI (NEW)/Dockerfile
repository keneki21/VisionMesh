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

EXPOSE 5001
CMD ["python", "api_server.py"]
