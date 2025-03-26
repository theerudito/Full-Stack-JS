´´´ bash
´´´
server {
listen 80;
server_name api.between-bytes.tech;

    location / {
        proxy_pass http://localhost:3050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Redirige tráfico HTTP a HTTPS
    return 301 https://$server_name$request_uri;

}

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
