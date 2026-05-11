#!/bin/bash
set -e

MODEL="${OLLAMA_MODEL:-qwen2.5-coder:7b}"
PORT="${PORT:-11434}"

# Tell Ollama to listen on Railway's dynamic port
export OLLAMA_HOST="0.0.0.0:${PORT}"

echo "Starting Ollama on port $PORT..."
ollama serve &
OLLAMA_PID=$!

# Wait until Ollama responds
echo "Waiting for Ollama to be ready..."
until curl -sf "http://localhost:${PORT}/api/tags" > /dev/null 2>&1; do
    sleep 2
done
echo "Ollama ready on port $PORT."

# Pull model if not already present
if ollama list 2>/dev/null | grep -q "${MODEL%%:*}"; then
    echo "Model $MODEL already present — skipping download."
else
    echo "Pulling $MODEL (first run — this takes 10-15 min)..."
    ollama pull "$MODEL"
    echo "Model $MODEL ready."
fi

echo "Serving $MODEL on port $PORT."
wait $OLLAMA_PID
