Configuracion de Nginx para el backend con docker, nodejs, express, postgresql, docker-compose y certbot

1. Tener instalado docker y docker-compose
2. Crear un archivo docker-compose.yml
3. Crear un archivo Dockerfile
4. Crear un archivo .env
5. Crear un archivo .env.db
6. Crear un archivo .env.prod.db
7. Tener un dominio y configurar certbot
8. Configurar Nginx
9. Tener Un servidor VPS + instalar Nginx + Certbot + Docker + Docker-compose

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

crear un enlace simbolico en la carpeta /etc/nginx/sites-enabled

```bash
sudo ln -s /etc/nginx/sites-available/tu-sitio.com /etc/nginx/sites-enabled/
```

# primero se configura el servidor HTTP y luego el servidor HTTPS

server {
listen 443 ssl;
server_name api.between-bytes.tech;

    ssl_certificate /etc/letsencrypt/live/api.between-bytes.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.between-bytes.tech/privkey.pem;

    location / {
        proxy_pass http://localhost:3050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}

```

```
