FROM node:17.0.1-slim

WORKDIR /app

COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm install

COPY tsconfig.json tsconfig.json
COPY src src

RUN npm run generate-sdk
RUN npm run build

RUN  chown -R node:node /app
ENV  HOME /home/node
USER node

CMD ["node", "dst/index.js"]
