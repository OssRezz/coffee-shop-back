# ☕ Coffee Shop Backend - Production Deployment Guide

Este proyecto está dockerizado y listo para producción. Sigue estos pasos para levantarlo en un servidor (como EC2).

---

## 📦 Requisitos del servidor

- Docker
- Docker Compose
- Puerto `4002` libre o configurado a tu gusto

---

## 📁 Estructura esperada

coffee-shop-back/
├── dist/                # Código compilado (NestJS build)
├── logs/                # Carpeta para logs (persistente)
├── uploads/             # Carpeta para imágenes o archivos subidos
├── prisma/
├── Dockerfile
├── docker-compose.yml
├── .env
├── package.json
├── tsconfig.build.json
└── ...


---
## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz:
---

---
## 🐳 Comandos para producción

### 1. Subir contenedor
```bash
docker compose up --build -d
---

## 📁 Persistencia

Los siguientes volúmenes se montan automáticamente:

| Carpeta      | Descripción     |
| ------------ | ---------------- |
| `uploads/` | Archivos subidos |
| `logs/`    | Archivos de logs |
