# Usa una imagen base de Node.js
FROM node:alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Exponer el puerto 3050
EXPOSE 3050

# Ejecuta la API
CMD ["node", "app.js"]
