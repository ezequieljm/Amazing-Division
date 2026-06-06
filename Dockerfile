# === ETAPA 1: Construcción (Build) ===
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos los archivos de configuración de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instalamos TODAS las dependencias (incluyendo TypeScript y compiladores)
RUN npm install

# Copiamos el código fuente
COPY src/ ./src

# Compilamos el proyecto de TypeScript a JavaScript (genera la carpeta dist/)
RUN npm run build

# === ETAPA 2: Producción ===
FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# 1. Copiamos el backend compilado
COPY --from=builder /app/dist ./dist

# 2. ¡NUEVO! Copiamos también el frontend estático al contenedor
COPY public/ ./public

EXPOSE 3000
CMD ["node", "dist/app.js"]