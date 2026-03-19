/*
 * LÓGICA DEL CARRUSEL DE GALERÍA
 * Permite desplazar las imágenes lateralmente mediante botones.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Selección de elementos necesarios del DOM
    const imgCarousel = document.querySelector(".img-carousel");
    const miniaturas = document.querySelectorAll(".miniatura");
    const nextButton = document.querySelector("#nextBtn");
    const prevButton = document.querySelector("#prevBtn");

    // Índice que controla en qué posición/foto estamos (empieza en 0)
    let index = 0;

    /*
     * Función que ejecuta el movimiento.
     * Calcula cuánto mide una foto y desplaza el contenedor hacia la izquierda.
     */
    const moverCarrusel = () => {
        // Calculamos el ancho real incluyendo el gap de 20px
        const estilo = window.getComputedStyle(imgCarousel);
        const gap = parseInt(estilo.columnGap) || 20;
        const anchoDesplazamiento = miniaturas[0].offsetWidth + gap;

        const maxFotos = Math.floor(document.querySelector('.galeria-carousel').offsetWidth / anchoDesplazamiento);
        const maxIndex = miniaturas.length - maxFotos;

        if (index > maxIndex) {
            index = maxIndex;
        }

        if (index < 0) {
            index = 0;
        }
        imgCarousel.style.transform = `translateX(-${index * anchoDesplazamiento}px)`;
    };

    /*
     * Aumenta el índice hasta un máximo de 4 (ajustar según número de fotos)
     */
    nextButton.addEventListener("click", () => {
        if (index < miniaturas.length - 1) {
            index++;
            moverCarrusel();
        }
    });

    /*
     * Disminuye el índice hasta llegar a 0 (el inicio)
     */
    prevButton.addEventListener("click", () => {
        if (index > 0) { // No permite ir a números negativos
            index--;
            moverCarrusel();
        }
    });

    /*
     * Si el usuario cambia el tamaño del navegador o gira el móvil, 
     * recalculamos el ancho para que la imagen actual quede bien encuadrada.
     */
    window.addEventListener("resize", moverCarrusel);
});