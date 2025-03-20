# Usar la imagen base de Node.js
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

# Imagen de Nginx para servir el contenido
FROM nginx:alpine

# Copiar los archivos construidos al contenedor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# No es necesario copiar el archivo nginx.conf aquí, lo gestionaremos en docker-compose.yml

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



