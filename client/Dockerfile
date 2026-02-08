FROM denoland/deno:alpine-2.4.3

# Add Node + npm so Vite/SvelteKit tooling can run if your Deno dev task uses it
RUN apk add --no-cache nodejs npm

WORKDIR /app/client

COPY package.json ./
COPY deno.json* ./

# Keep the tutorial step
RUN DENO_FUTURE=1 deno install

COPY . .

RUN DENO_FUTURE=1 deno run -A npm:svelte-kit sync

CMD [ "run", "dev", "--host"]
