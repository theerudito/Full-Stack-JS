FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Servir la aplicación con http-server
FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/dist /app

RUN npm install -g http-server

EXPOSE 3000

CMD ["http-server", "dist", "-p", "3000"]

