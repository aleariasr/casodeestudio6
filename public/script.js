// Clase para manejar el Blog
class Blog {
    constructor() {
        this.posts = [];
        this.apiUrl = '/api/posts';
        this.init();
    }

    // Inicializar el blog
    async init() {
        await this.loadPosts();
        this.renderPosts();
        this.setupEventListeners();
    }

    // Configurar event listeners
    setupEventListeners() {
        const postForm = document.getElementById('post-form');
        postForm.addEventListener('submit', (e) => this.handlePostSubmit(e));
    }

    // Manejar envío de nuevo post
    async handlePostSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value.trim();
        const author = document.getElementById('post-author').value.trim();
        const content = document.getElementById('post-content').value.trim();

        if (!title || !author || !content) {
            alert('Por favor completa todos los campos');
            return;
        }

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, content })
            });

            if (!response.ok) {
                throw new Error('Error al publicar la noticia');
            }

            await this.loadPosts();
            this.renderPosts();

            // Limpiar formulario
            e.target.reset();
            
            alert('¡Noticia publicada exitosamente!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al publicar la noticia. Por favor, intenta de nuevo.');
        }
    }

    // Renderizar todos los posts
    renderPosts() {
        const container = document.getElementById('posts-container');
        
        if (this.posts.length === 0) {
            container.innerHTML = '<div class="no-posts">No hay noticias publicadas aún. ¡Sé el primero en publicar!</div>';
            return;
        }

        container.innerHTML = this.posts.map(post => this.createPostHTML(post)).join('');
        
        // Agregar event listeners a los botones
        this.posts.forEach(post => {
            this.setupPostEventListeners(post.id);
        });
    }

    // Crear HTML para un post
    createPostHTML(post) {
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const commentsCount = post.comments.length;
        const commentsHTML = post.comments.length > 0
            ? post.comments.map(comment => this.createCommentHTML(comment, post.id)).join('')
            : '<div class="no-comments">No hay comentarios aún. ¡Sé el primero en comentar!</div>';

        return `
            <article class="post" data-post-id="${post.id}">
                <div class="post-header">
                    <h3 class="post-title">${this.escapeHTML(post.title)}</h3>
                    <div class="post-meta">
                        <span>👤 ${this.escapeHTML(post.author)}</span>
                        <span>📅 ${formattedDate}</span>
                        <span>💬 ${commentsCount} comentario${commentsCount !== 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div class="post-content">${this.escapeHTML(post.content)}</div>
                <div class="post-actions">
                    <button class="btn btn-secondary toggle-comments-btn" data-post-id="${post.id}">
                        ${commentsCount > 0 ? 'Ver' : 'Añadir'} comentarios
                    </button>
                    <button class="btn btn-danger delete-post-btn" data-post-id="${post.id}">
                        Eliminar noticia
                    </button>
                </div>
                <div class="comments-section" id="comments-${post.id}" style="display: none;">
                    <div class="comments-header">
                        <h3>Comentarios</h3>
                        <button class="btn btn-secondary add-comment-btn" data-post-id="${post.id}">
                            + Añadir comentario
                        </button>
                    </div>
                    <div class="comment-form" id="comment-form-${post.id}">
                        <input type="text" 
                               class="comment-name-input" 
                               placeholder="Tu nombre" 
                               data-post-id="${post.id}">
                        <textarea class="comment-text-input" 
                                  rows="3" 
                                  placeholder="Escribe tu comentario..." 
                                  data-post-id="${post.id}"></textarea>
                        <button class="btn btn-primary submit-comment-btn" data-post-id="${post.id}">
                            Publicar comentario
                        </button>
                    </div>
                    <div class="comments-list" id="comments-list-${post.id}">
                        ${commentsHTML}
                    </div>
                </div>
            </article>
        `;
    }

    // Crear HTML para un comentario
    createCommentHTML(comment, postId) {
        const date = new Date(comment.date);
        const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${this.escapeHTML(comment.author)}</span>
                    <span class="comment-date">${formattedDate}</span>
                </div>
                <div class="comment-text">${this.escapeHTML(comment.text)}</div>
            </div>
        `;
    }

    // Configurar event listeners para un post específico
    setupPostEventListeners(postId) {
        // Toggle comments
        const toggleBtn = document.querySelector(`.toggle-comments-btn[data-post-id="${postId}"]`);
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleComments(postId));
        }

        // Add comment button
        const addCommentBtn = document.querySelector(`.add-comment-btn[data-post-id="${postId}"]`);
        if (addCommentBtn) {
            addCommentBtn.addEventListener('click', () => this.showCommentForm(postId));
        }

        // Submit comment
        const submitCommentBtn = document.querySelector(`.submit-comment-btn[data-post-id="${postId}"]`);
        if (submitCommentBtn) {
            submitCommentBtn.addEventListener('click', () => this.handleCommentSubmit(postId));
        }

        // Delete post
        const deleteBtn = document.querySelector(`.delete-post-btn[data-post-id="${postId}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deletePost(postId));
        }
    }

    // Toggle sección de comentarios
    toggleComments(postId) {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection.style.display === 'none') {
            commentsSection.style.display = 'block';
        } else {
            commentsSection.style.display = 'none';
        }
    }

    // Mostrar formulario de comentario
    showCommentForm(postId) {
        const form = document.getElementById(`comment-form-${postId}`);
        form.classList.toggle('active');
    }

    // Manejar envío de comentario
    async handleCommentSubmit(postId) {
        const nameInput = document.querySelector(`.comment-name-input[data-post-id="${postId}"]`);
        const textInput = document.querySelector(`.comment-text-input[data-post-id="${postId}"]`);

        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !text) {
            alert('Por favor completa todos los campos del comentario');
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author: name, text })
            });

            if (!response.ok) {
                throw new Error('Error al publicar el comentario');
            }

            await this.loadPosts();
            this.renderPosts();
            
            // Mantener la sección de comentarios abierta
            setTimeout(() => {
                const commentsSection = document.getElementById(`comments-${postId}`);
                if (commentsSection) {
                    commentsSection.style.display = 'block';
                }
            }, 0);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al publicar el comentario. Por favor, intenta de nuevo.');
        }
    }

    // Eliminar un post
    async deletePost(postId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
            try {
                const response = await fetch(`${this.apiUrl}/${postId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar la noticia');
                }

                await this.loadPosts();
                this.renderPosts();
                alert('Noticia eliminada');
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar la noticia. Por favor, intenta de nuevo.');
            }
        }
    }

    // Cargar posts desde el servidor
    async loadPosts() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Error al cargar posts');
            }
            this.posts = await response.json();
        } catch (error) {
            console.error('Error al cargar posts:', error);
            this.posts = [];
        }
    }

    // Escapar HTML para prevenir XSS
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar el blog cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Blog();
});
