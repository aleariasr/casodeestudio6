# Instrucciones de Despliegue

## Requisitos Previos
- Node.js v14 o superior
- npm (incluido con Node.js)

## Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/aleariasr/casodeestudio6.git
   cd casodeestudio6
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor**
   ```bash
   npm start
   ```

4. **Acceder al blog**
   - Abrir el navegador en `http://localhost:3000`

## Despliegue en Producción

### Opción 1: Servidor VPS (DigitalOcean, AWS, etc.)

1. Subir los archivos al servidor
2. Instalar Node.js en el servidor
3. Ejecutar:
   ```bash
   npm install --production
   npm start
   ```

### Opción 2: Heroku

1. Crear cuenta en Heroku
2. Instalar Heroku CLI
3. Ejecutar:
   ```bash
   heroku login
   heroku create mi-blog-noticias
   git push heroku main
   ```

### Opción 3: Render.com (Recomendado - Gratis)

1. Conectar el repositorio de GitHub a Render
2. Configurar:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Desplegar

## Acceso desde Múltiples Dispositivos

Una vez desplegado en un servidor accesible públicamente, cualquier persona puede:
- Ver las noticias desde cualquier dispositivo
- Publicar nuevas noticias
- Comentar en las publicaciones

## Notas Importantes

- Los datos se guardan en `data/posts.json`
- Para producción, considerar usar una base de datos real (MongoDB, PostgreSQL)
- Agregar autenticación para controlar quién puede publicar noticias
- Configurar HTTPS para seguridad

## Variables de Entorno

Puedes configurar el puerto con:
```bash
PORT=8080 npm start
```

## Mantenimiento

### Backup de datos
```bash
cp data/posts.json data/posts-backup-$(date +%Y%m%d).json
```

### Ver logs
Los logs aparecen en la consola del servidor.
