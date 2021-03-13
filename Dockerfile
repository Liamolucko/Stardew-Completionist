FROM node:current-slim

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY src src
COPY static static
COPY rollup.config.js .
COPY tsconfig.json .

RUN pnpm build

CMD ["pnpm", "start"]
