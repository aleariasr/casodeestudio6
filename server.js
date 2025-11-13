const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Asegurar que el directorio de datos existe
async function ensureDataDir() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// Leer posts del archivo
async function readPosts() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe, retornar array vacío
        return [];
    }
}

// Guardar posts al archivo
async function writePosts(posts) {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

// API Endpoints

// Obtener todos los posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await readPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error al leer posts:', error);
        res.status(500).json({ error: 'Error al obtener posts' });
    }
});

// Crear un nuevo post
app.post('/api/posts', async (req, res) => {
    try {
        const posts = await readPosts();
        const newPost = {
            id: Date.now(),
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            date: new Date().toISOString(),
            comments: []
        };
        posts.unshift(newPost);
        await writePosts(posts);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error al crear post:', error);
        res.status(500).json({ error: 'Error al crear post' });
    }
});

// Eliminar un post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const posts = await readPosts();
        const postId = parseInt(req.params.id);
        const filteredPosts = posts.filter(p => p.id !== postId);
        await writePosts(filteredPosts);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al eliminar post:', error);
        res.status(500).json({ error: 'Error al eliminar post' });
    }
});

// Añadir comentario a un post
app.post('/api/posts/:id/comments', async (req, res) => {
    try {
        const posts = await readPosts();
        const postId = parseInt(req.params.id);
        const post = posts.find(p => p.id === postId);
        
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        
        const newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
            date: new Date().toISOString()
        };
        
        post.comments.push(newComment);
        await writePosts(posts);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error al añadir comentario:', error);
        res.status(500).json({ error: 'Error al añadir comentario' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
