FROM node:17.0.1-slim

WORKDIR /app

COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm install

COPY tsconfig.json tsconfig.json
COPY src src
COPY schema schema

RUN npm run build

CMD ["node", "dst/index.js"]
