# Mi Blog de Noticias 📰

Un sitio web de blog completamente funcional creado con HTML, CSS y JavaScript puro. Permite publicar noticias y que los visitantes comenten en cada publicación.

## 🌟 Características

- ✅ **Publicación de Noticias**: Formulario completo para crear noticias con título, autor y contenido
- ✅ **Sistema de Comentarios**: Los usuarios pueden comentar en cada noticia
- ✅ **Persistencia de Datos**: Utiliza un servidor backend con almacenamiento en archivo JSON para guardar todas las noticias y comentarios
- ✅ **Acceso Multi-Dispositivo**: Las noticias se guardan en el servidor y son accesibles desde cualquier dispositivo
- ✅ **Interfaz Moderna**: Diseño atractivo con gradientes y animaciones
- ✅ **Responsive**: Compatible con dispositivos móviles y tablets
- ✅ **Gestión de Contenido**: Eliminar noticias, mostrar/ocultar comentarios
- ✅ **Seguridad**: Protección contra XSS con escape de HTML

## 🚀 Cómo Usar

### Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar el servidor**:
   ```bash
   npm start
   ```
   El servidor se iniciará en `http://localhost:3000`

3. **Abrir el sitio**: Abre tu navegador y ve a `http://localhost:3000`

### Uso del Blog

1. **Publicar una noticia**: 
   - Completa el formulario "Escribir Nueva Noticia"
   - Ingresa título, tu nombre y el contenido
   - Click en "Publicar Noticia"
2. **Añadir comentarios**:
   - Click en "Añadir comentarios" o "Ver comentarios" en cualquier noticia
   - Click en "+ Añadir comentario"
   - Completa el formulario y click en "Publicar comentario"
3. **Eliminar noticias**: Click en "Eliminar noticia" para borrar una publicación
4. **Acceso desde otros dispositivos**: Las noticias se guardan en el servidor, por lo que puedes acceder desde cualquier dispositivo conectado al mismo servidor

## 📁 Estructura del Proyecto

```
casodeestudio6/
├── index.html      # Estructura HTML del blog
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript del cliente
├── server.js       # Servidor backend Node.js/Express
├── package.json    # Dependencias del proyecto
├── data/           # Directorio para almacenar posts.json (generado automáticamente)
└── README.md       # Este archivo
```

## 💻 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica del sitio
- **CSS3**: Estilos modernos con gradientes y animaciones
- **JavaScript ES6**: Lógica del cliente con async/await y Fetch API

### Backend
- **Node.js**: Entorno de ejecución
- **Express**: Framework web para el servidor
- **CORS**: Soporte para peticiones cross-origin
- **File System**: Almacenamiento de datos en archivo JSON

## 🎨 Capturas de Pantalla

### Estado Inicial
![Estado Inicial](https://github.com/user-attachments/assets/ddeff85f-ce7c-4c3c-99e4-4b34971ea243)

### Con Noticia Publicada
![Con Noticia](https://github.com/user-attachments/assets/fcb93524-5b57-4531-85b0-5866c6d16079)

### Con Comentarios
![Con Comentarios](https://github.com/user-attachments/assets/40ef6baa-3fff-4b90-81ca-c0e5a7da0596)

### Múltiples Publicaciones
![Múltiples Posts](https://github.com/user-attachments/assets/21a93d13-46ba-4006-9380-5378700c55bc)

## 🔧 Características Técnicas

- **Arquitectura Cliente-Servidor**: Frontend separado del backend para mejor escalabilidad
- **API RESTful**: Endpoints para gestión de posts y comentarios
- **Almacenamiento Persistente**: Datos guardados en archivo JSON en el servidor
- **Programación Orientada a Objetos**: Clase `Blog` que gestiona la UI del cliente
- **Async/Await**: Manejo moderno de operaciones asíncronas
- **Escape de HTML**: Prevención de ataques XSS
- **Responsive Design**: Media queries para diferentes tamaños de pantalla
- **Acceso Multi-Dispositivo**: Las noticias son accesibles desde cualquier dispositivo conectado al servidor

## 📝 Funcionalidades Destacadas

1. **Almacenamiento Centralizado**: Todos los datos se guardan en el servidor, permitiendo acceso desde múltiples dispositivos
2. **API REST**: Comunicación cliente-servidor mediante endpoints HTTP
3. **Timestamps Automáticos**: Cada noticia y comentario incluye fecha y hora
4. **Contador de Comentarios**: Muestra el número de comentarios por noticia
5. **Interfaz Intuitiva**: Botones claramente identificados con acciones específicas
6. **Mensajes de Estado**: Alertas de confirmación para acciones importantes
7. **Formularios Validados**: Verificación de campos requeridos antes de enviar

## 🌐 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles (iOS/Android)

## 📄 Licencia

© 2025 Mi Blog de Noticias. Todos los derechos reservados.