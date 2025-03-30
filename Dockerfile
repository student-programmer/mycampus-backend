# Stage 1: Builder
FROM node:20-alpine as builder

WORKDIR /home/node

COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Копируем файлы Prisma
COPY prisma ./prisma

# Генерируем Prisma клиент
RUN npx prisma generate

COPY --chown=node:node . .

RUN npm run build && npm prune --omit=dev --legacy-peer-deps

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /home/node

# Копируем необходимые файлы из builder стадии
COPY --from=builder --chown=node:node /home/node/prisma ./prisma
COPY --from=builder --chown=node:node /home/node/dist ./dist
COPY --from=builder --chown=node:node /home/node/package*.json ./

RUN npx prisma generate

# Устанавливаем зависимости для продакшн окружения
RUN npm install --omit=dev --legacy-peer-deps

# Выполняем миграции при старте контейнера
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
