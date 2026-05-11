FROM ollama/ollama:latest

RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV OLLAMA_HOST=0.0.0.0
ENV OLLAMA_MODEL=qwen2.5-coder:7b

EXPOSE 11434

ENTRYPOINT ["/entrypoint.sh"]
