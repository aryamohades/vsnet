FROM node:13.5.0-alpine

WORKDIR /app/

COPY package.json .
COPY package-lock.json .
COPY src src

RUN npm install --production

CMD ["node_modules/forever/bin/forever", "src/client.js"]