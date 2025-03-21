FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production && \
  rm -rf /root/.npm
COPY . .
EXPOSE 3050
CMD ["node", "app.js"]
