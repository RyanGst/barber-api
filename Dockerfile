FROM oven/bun AS development

WORKDIR /app

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

FROM development AS build
ENV NODE_ENV=production


COPY . .

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
    ./src/app.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
