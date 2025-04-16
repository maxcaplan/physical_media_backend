FROM oven/bun:1.2.8-alpine AS base

WORKDIR /usr/src/app

COPY package*.json bun.lock ./
RUN bun install
COPY . .

ENV NODE_ENV production

EXPOSE 3000

CMD ["bun", "run", "start"]
