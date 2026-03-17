FROM denoland/deno:latest AS builder

WORKDIR /app

COPY . .

RUN deno task build

FROM joseluisq/static-web-server:2-debian

COPY --from=builder /app/_site ./public
