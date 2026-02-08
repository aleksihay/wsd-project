FROM denoland/deno:alpine-2.4.3

# Add Node + npm so Vite/SvelteKit tooling can run if your Deno dev task uses it
RUN apk add --no-cache nodejs npm

COPY package.json deno.json .

COPY package.json ./
COPY deno.json* ./

# Keep the tutorial step
RUN DENO_FUTURE=1 deno install

COPY . .

RUN DENO_FUTURE=1 deno run -A npm:@sveltejs/kit sync

CMD [ "run", "dev", "--host"]
