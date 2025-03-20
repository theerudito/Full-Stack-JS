# Usar la imagen base de Node.js para construir la aplicación
FROM node:lts-alpine AS build

WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Imagen base de Node.js para producción 
FROM node:lts-alpine

# Copiar la aplicación construida
WORKDIR /app
COPY --from=build /app/dist /app

# Exponer el puerto para el frontend
EXPOSE 3000

# Comando para iniciar el servidor (puedes usar un servidor simple como http-server)
CMD ["npx", "http-server", "dist", "-p", "3000"]



