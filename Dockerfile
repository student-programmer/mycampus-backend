# Stage 1: Builder
FROM node:20-alpine as builder

WORKDIR /home/node

COPY package*.json ./
RUN npm ci

# Копируем файлы Prisma
COPY prisma ./prisma

# Генерируем Prisma клиент
RUN npx prisma generate

COPY --chown=node:node . .

RUN npm run build && npm prune --omit=dev

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /home/node

# Копируем необходимые файлы из builder стадии
COPY --from=builder --chown=node:node /home/node/prisma ./prisma
COPY --from=builder --chown=node:node /home/node/dist ./dist
COPY --from=builder --chown=node:node /home/node/package*.json ./

RUN npx prisma generate


RUN npm install --omit=dev

# Запуск приложения
CMD ["node", "dist/server.js"]
