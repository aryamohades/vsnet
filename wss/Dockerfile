FROM node:13.5.0-alpine

RUN apk update && apk add --no-cache git
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

WORKDIR /app/

COPY package.json .
COPY package-lock.json .
COPY src src

RUN npm install --production

EXPOSE 8000

CMD ["node", "src/server.js"]