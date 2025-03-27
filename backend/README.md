configuracion de Nginx para el backend con docker, nodejs, express, postgresql, docker-compose y certbot

1. Tener instalado docker y docker-compose
2. Crear un archivo docker-compose.yml
3. Crear un archivo Dockerfile
4. Crear un archivo .env
5. Crear un archivo .env.db
6. Crear un archivo .env.prod.db
7. Tener un dominio y configurar certbot
8. Configurar Nginx
9. Tener Un servidor VPS + instalar Nginx + Certbot + Docker + Docker-compose

crear el archivo Dockerfile

```bash
FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3050
CMD ["npm", "start"]
```

crear el archvo docker-compose.yml

```bash
services:

  backend:
    build: .
    container_name: backend
    ports:
      - "3050:3050"
    restart: always
```

crear el archivo .env

```bash
PORT=3050
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
```

levantar el contenedor

```bash
docker-compose up -d
```

detener el contenedor

```bash
docker-compose down
```

crear un archivo de configuracion de nginx en la carpeta /etc/nginx/sites-available

```bash
sudo nano /etc/nginx/sites-available/tu-sitio.com
```

Verificar la configuración de Nginx

```bash
sudo nginx -t
```

mensaje de salida:

```bash
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

contenido del archivo de configuracion de nginx

```bash
server {
listen 80;
server_name tu-sitio.com;

    location / {
        proxy_pass http://localhost:puerto; # ip y puerto del servidor
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Redirige tráfico HTTP a HTTPS
    return 301 https://$server_name$request_uri;

}
```

Verificar la configuración de Nginx

```bash
sudo nginx -t
```

mensaje de salida:

```bash
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

crear un enlace simbolico en la carpeta /etc/nginx/sites-enabled

```bash
sudo ln -s /etc/nginx/sites-available/tu-sitio.com /etc/nginx/sites-enabled/
```

```bash
sudo nginx -t
```

mensaje de salida:

```bash
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Usar Certbot para obtener los certificados SSL

```bash
sudo certbot --nginx -d tu-dominio.com
```

llenar los datos solicitados

Verificar la configuración de Nginx

```bash
sudo nginx -t
```

mensaje de salida:

```bash
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Reiniciar Nginx

```bash
sudo systemctl restart nginx
```

Renovar los certificados automáticamente

```bash
sudo certbot renew
```

Verifica que la renovación se haya realizado correctamente:

```bash
sudo systemctl reload nginx
```

Configura la renovación automáticamente:

```bash
sudo systemctl enable certbot.timer
```

primero se configura el servidor HTTP y luego el servidor HTTPS

```bash
server {
listen 443 ssl;
server_name tu-sitio.com;

    ssl_certificate /etc/letsencrypt/live/tu-sitio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-sitio.com/privkey.pem;

    location / {
        proxy_pass http://localhost:puerto; # ip y puerto del servidor
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}
```
