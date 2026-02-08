FROM denoland/deno:alpine-2.4.3

# Add Node + npm so Vite/SvelteKit tooling can run if your Deno dev task uses it
RUN apk add --no-cache nodejs npm

WORKDIR /app/client

COPY package.json ./
COPY deno.json* ./

# Keep the tutorial step
RUN DENO_FUTURE=1 deno install

COPY . .

<<<<<<< HEAD
=======
RUN DENO_FUTURE=1 deno run -A npm:svelte-kit sync

>>>>>>> 4416f9d33ef51c00e8a12e4529e4f397fd0c17c7
CMD [ "run", "dev", "--host"]
