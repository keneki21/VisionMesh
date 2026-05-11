#!/bin/bash
set -e

MODEL="${OLLAMA_MODEL:-qwen2.5-coder:7b}"

echo "Starting Ollama server..."
ollama serve &
OLLAMA_PID=$!

# Wait until Ollama is ready
echo "Waiting for Ollama to be ready..."
until curl -sf http://localhost:11434/api/tags > /dev/null 2>&1; do
    sleep 2
done
echo "Ollama is ready."

# Pull model only if not already downloaded
if ollama list | grep -q "${MODEL%%:*}"; then
    echo "Model $MODEL already present. Skipping download."
else
    echo "Pulling $MODEL (this takes a few minutes on first run)..."
    ollama pull "$MODEL"
    echo "Model $MODEL ready."
fi

echo "Ollama serving $MODEL on port 11434."
wait $OLLAMA_PID
