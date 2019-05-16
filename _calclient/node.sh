sudo docker run --rm -v $(pwd):/pwd -w /pwd --env-file .env node:11.11-alpine node $@

