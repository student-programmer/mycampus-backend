# Используем образ Node.js
FROM node:20-alpine

# Устанавливаем необходимые зависимости, включая OpenSSL
RUN apk update && apk add --no-cache openssl build-base

# Создаем рабочую директорию
WORKDIR /home/node

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь исходный код в контейнер
COPY . .

# Генерируем Prisma клиент и собираем проект
RUN npx prisma generate && npm run build && npm prune --omit=dev

# Запускаем приложение
CMD ["npm", "run", "start"]
