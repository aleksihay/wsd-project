FROM denoland/deno:alpine-2.4.3

WORKDIR /app

COPY package.json deno.json .

RUN DENO_FUTURE=1 deno install

COPY . .

RUN DENO_FUTURE=1 deno run -A npm:@sveltejs/kit sync

CMD [ "run", "dev", "--host"]
