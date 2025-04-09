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
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/logs ./logs
RUN npm install --omit=dev
ENV NODE_ENV production
EXPOSE 3000
CMD ["node", "dist/src/main"]
