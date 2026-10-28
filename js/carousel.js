console.log("CAROUSEL JS FUNCIONANDO!");

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-track");

    if (!carousel || !track) {
        console.error("Carrossel não encontrado!");
        return;
    }

    // Impede que as imagens sejam arrastadas pelo navegador
    const images = track.querySelectorAll("img");

    images.forEach((img) => {
        img.draggable = false;
    });

    // Guarda os itens originais
    const originalItems = Array.from(track.children);

    // Espera as imagens carregarem antes de calcular os tamanhos
    const imagensCarregadas = Array.from(images).map((img) => {
        if (img.complete) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
        });
    });

    Promise.all(imagensCarregadas).then(() => {
        iniciarCarousel();
    });

    function iniciarCarousel() {

        // Remove possíveis clones anteriores
        track.querySelectorAll(".clone").forEach((clone) => {
            clone.remove();
        });

        // Clona os itens até termos conteúdo suficiente
        let larguraAtual = track.scrollWidth;

        while (larguraAtual < carousel.clientWidth * 3) {
            originalItems.forEach((item) => {
                const clone = item.cloneNode(true);
                clone.classList.add("clone");

                const img = clone.querySelector("img");

                if (img) {
                    img.draggable = false;
                }

                track.appendChild(clone);
            });

            larguraAtual = track.scrollWidth;
        }

        // Guarda exatamente a largura dos itens originais
        const larguraOriginal = originalItems.reduce((total, item) => {
            return total + item.getBoundingClientRect().width;
        }, 0) + (originalItems.length - 1) * 40;

        let velocidade = 0.5;
        let pausado = false;

        // =========================
        // ANIMAÇÃO AUTOMÁTICA
        // =========================

        function animar() {
            if (!pausado) {
                carousel.scrollLeft += velocidade;

                if (carousel.scrollLeft >= larguraOriginal) {
                    carousel.scrollLeft -= larguraOriginal;
                }
            }

            requestAnimationFrame(animar);
        }

        requestAnimationFrame(animar);

        // =========================
        // PAUSAR AO PASSAR O MOUSE
        // =========================

        carousel.addEventListener("mouseenter", () => {
            pausado = true;
        });

        carousel.addEventListener("mouseleave", () => {
            pausado = false;
        });

        // =========================
        // ARRASTAR COM MOUSE
        // =========================

        let arrastando = false;
        let inicioX = 0;
        let scrollInicial = 0;

        carousel.addEventListener("mousedown", (e) => {
            arrastando = true;
            pausado = true;

            inicioX = e.pageX;
            scrollInicial = carousel.scrollLeft;

            carousel.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (!arrastando) return;

            const distancia = e.pageX - inicioX;

            carousel.scrollLeft = scrollInicial - distancia;
        });

        document.addEventListener("mouseup", () => {
            if (!arrastando) return;

            arrastando = false;
            pausado = false;

            carousel.style.cursor = "grab";
        });

        // =========================
        // TOUCH / CELULAR
        // =========================

        let touchStartX = 0;
        let touchScrollInicial = 0;

        carousel.addEventListener("touchstart", (e) => {
            pausado = true;

            touchStartX = e.touches[0].pageX;
            touchScrollInicial = carousel.scrollLeft;
        }, { passive: true });

        carousel.addEventListener("touchmove", (e) => {
            const distancia = e.touches[0].pageX - touchStartX;

            carousel.scrollLeft = touchScrollInicial - distancia;
        }, { passive: true });

        carousel.addEventListener("touchend", () => {
            pausado = false;
        });
    }
});
