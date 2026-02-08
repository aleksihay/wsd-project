FROM denoland/deno:alpine-2.4.3

WORKDIR /app

COPY package.json .

RUN DENO_FUTURE=1 deno install

COPY . .

RUN DENO_FUTURE=1 deno run -A npm:svelte-kit sync

CMD [ "run", "dev", "--host"]
