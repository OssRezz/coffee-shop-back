# Etapa 1: build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

# Etapa 2: producción
FROM node:20-alpine
WORKDIR /app

# Copiar archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Crear carpetas de runtime
RUN mkdir -p ./uploads ./logs

# Instalar solo dependencias de producción
RUN npm install --omit=dev

ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "dist/src/main"]
