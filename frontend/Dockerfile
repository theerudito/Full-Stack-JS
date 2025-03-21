# Etapa de construcción
FROM node:lts-alpine AS build

WORKDIR /app

# Copiar los archivos de dependencias primero para aprovechar el cache de Docker
COPY frontend/package.json frontend/package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código (asegurándote de que el package.json está en el lugar correcto)
COPY frontend/ ./

# Construir la aplicación para producción
RUN npm run build

# Imagen base de Node.js para producción 
FROM node:lts-alpine

WORKDIR /app

# Copiar la aplicación construida
COPY --from=build /app/dist /app

# Instalar http-server para servir los archivos estáticos
RUN npm install -g http-server

EXPOSE 3000

# Iniciar la aplicación con http-server
CMD ["http-server", "dist", "-p", "3000"]


