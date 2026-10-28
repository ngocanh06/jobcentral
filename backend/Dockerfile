FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY config ./config
COPY src ./src

USER node

EXPOSE 5000

CMD ["node", "src/server.js"]
