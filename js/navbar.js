/** * SISTEMA DE NAVEGACIÓN DINÁMICA (FETCH JSON)
 * Este script carga los enlaces del menú desde un archivo externo .json
 */

// 1. Identificamos el contenedor donde se insertarán los enlaces
const contenedorNav = document.querySelector(".bar-nav");
// Lee "navItemsPresupuesto" del ID del HTML
const listaNav = contenedorNav.id;

/**
 * 2. GESTIÓN DE RUTAS DINÁMICAS
 * Si estamos dentro de la carpeta /views/, necesitamos subir un nivel (../) para encontrar el JSON.
 * Si estamos en la raíz (index.html), la ruta es directa (./).
 */
const carpetaData = window.location.pathname.includes('views') ? "../assets/data/datos.json" : "./assets/data/datos.json";

// 3. Petición asíncrona para obtener los datos del menú
fetch(carpetaData)
    .then((response) => {
        // Si el archivo no existe o la ruta está mal, lanzamos un error
        if (!response.ok) throw new Error("No se encuentra el archivo JSON en la ruta: " + carpetaData);
        return response.json();
    })
    .then(data => {
        // Buscamos en el JSON la lista que coincida con el ID del contenedor
        const items = data.barNav[listaNav];

        if (!items) {
            console.error("No se encontró la lista '" + listaNav + "' en el JSON");
            return;
        }
        // Obtenemos la URL actual para saber en qué página está el usuario
        const paginaActual = window.location.pathname;
        // 4. GENERACIÓN DEL HTML DINÁMICO
        const menuHtml = items.map((nav) => {
            let rutaLink = nav.link;
            let esActiva = false;

            /*
             * COMPROBACIÓN DE PÁGINA ACTIVA
             * Limpiamos los './' o '../' del enlace del JSON para comparar 
             * si el nombre del archivo coincide con la URL actual.
             */
            if (paginaActual.includes(rutaLink.replace('./', '').replace('../', ''))) {
                esActiva = true;
            }
            // Si coincide, le añadimos la clase CSS 'active' para resaltarlo
            const claseActiva = esActiva ? 'class="active"' : '';
            return `
            <a href="${nav.link}" ${claseActiva}>${nav.name}</a>
        `;
        }).join("");

        // 5. Inyectamos los enlaces generados en el menú del HTML
        contenedorNav.innerHTML = menuHtml;
    })
    .catch(error => console.error("Error detallado:", error));