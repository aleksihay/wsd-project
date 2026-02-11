FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173
CMD ["sh", "-lc", "npx svelte-kit sync && npm run dev -- --host 0.0.0.0"]
