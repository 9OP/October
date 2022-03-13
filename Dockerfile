# Stage 1
FROM node as builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g typescript && npm install

COPY . ./

RUN npm run build


# Stage 2
FROM buildkite/puppeteer

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8080

USER node

CMD ["node", "dist/index.js"]
