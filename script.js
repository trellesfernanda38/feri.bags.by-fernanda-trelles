// ==========================================================================
// CONTROL DE INTERACTIVIDAD Y NAVEGACIÓN - FERI BAGS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("home-screen");
    const mainContent = document.getElementById("main-content");
    const mainLogo = document.getElementById("main-logo");
    const enterStoreBtn = document.getElementById("enter-store-btn");
    const sparklesCanvas = document.getElementById("sparkles-canvas");
    const navButtons = document.querySelectorAll(".nav-btn");
    const subPages = document.querySelectorAll(".sub-page");

    // 1. EFECTO DE ENTRADA: Generador automático de brillitos
    function createSparkle() {
        if (!welcomeScreen || !welcomeScreen.classList.contains("active")) return;

        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");

        if (sparklesCanvas) {
            const rect = sparklesCanvas.getBoundingClientRect();
            const xInside = Math.random() * rect.width;
            const yInside = Math.random() * rect.height;
            
            sparkle.style.left = `${xInside}px`;
            sparkle.style.top = `${yInside}px`;

            const moveX = (Math.random() - 0.5) * 150; 
            const moveY = (Math.random() - 0.5) * 150;
            const scale = Math.random() * 0.6 + 0.4;

            sparkle.style.setProperty('--x', `${moveX}px`);
            sparkle.style.setProperty('--y', `${moveY}px`);
            sparkle.style.setProperty('--s', scale);

            sparklesCanvas.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }
    }

    // Activar ráfaga de brillos iniciales
    const sparkleInterval = setInterval(createSparkle, 120);

    // 2. FUNCIÓN PRINCIPAL: Transición fluida hacia el catálogo de compras
    function irAlCatalogo() {
        // Detener los brillos para mejorar rendimiento
        clearInterval(sparkleInterval);
        
        // Animación de salida de la pantalla azul de bienvenida
        welcomeScreen.classList.add("fade-out");

        setTimeout(() => {
            welcomeScreen.classList.add("hidden");
            welcomeScreen.classList.remove("active");
            
            // Mostrar la tienda principal
            mainContent.classList.remove("hidden");
            setTimeout(() => {
                mainContent.classList.add("fade-in");
            }, 50);

            // Forzar que la subpágina visible sea la del Catálogo
            subPages.forEach(page => {
                if (page.id === "catalogo-page") {
                    page.classList.remove("hidden");
                    page.classList.add("active");
                } else {
                    page.classList.add("hidden");
                    page.classList.remove("active");
                }
            });

            // Marcar el botón "Catálogo" del menú superior como activo
            navButtons.forEach(btn => {
                if (btn.getAttribute("data-target") === "catalogo-page") {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });

        }, 600); // Tiempo asignado para la transición visual
    }

    // CONECTAR CLICS: Activa la transición tanto al presionar el logo como el botón
    if (mainLogo) {
        mainLogo.addEventListener("click", irAlCatalogo);
    }
    
    if (enterStoreBtn) {
        enterStoreBtn.addEventListener("click", irAlCatalogo);
    }

    // 3. NAVEGACIÓN MANUAL DEL MENÚ SUPERIOR (Navegar entre Catálogo y Feedback)
    navButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetPageId = btn.getAttribute("data-target");

            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            subPages.forEach(page => {
                if (page.id === targetPageId) {
                    page.classList.remove("hidden");
                    page.classList.add("active");
                } else {
                    page.classList.add("hidden");
                    page.classList.remove("active");
                }
            });
        });
    });

    // 4. SISTEMA DE COMENTARIOS DE LA SECCIÓN DE FEEDBACK
    const feedbackForm = document.getElementById("feedback-form");
    const commentsContainer = document.getElementById("comments-container");

    if (feedbackForm && commentsContainer) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("user-name").value;
            const comment = document.getElementById("user-comment").value;

            const newComment = document.createElement("div");
            newComment.classList.add("comment-item");
            newComment.innerHTML = `
                <div class="comment-header">
                    <strong>${name}</strong>
                    <span class="comment-stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p>"${comment}"</p>
            `;

            commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
            feedbackForm.reset();
        });
    }
});