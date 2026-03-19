/*
 * LÓGICA DE CARGA DINÁMICA - INDEX (PÁGINA PRINCIPAL)
 * Este script lee el archivo datos.json y rellena cada sección de la home.
 */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Selección de todos los contenedores vacíos del HTML
    const container1 = document.querySelector(".container1");
    const container2 = document.querySelector(".container2");
    const container3 = document.querySelector(".container3");
    const tituloDestinos = document.querySelector(".titulo-destinos");
    const destinos = document.querySelector(".container-destinos");
    const viajesGrupo = document.querySelector(".viajes1");
    const viajesGrupo22 = document.querySelector(".viajes2");

    // 2. Petición al archivo JSON
    fetch("./assets/data/datos.json")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar el JSON");
            return response.json();
        })
        .then(data => {

            /*
             * SECCIÓN 1: PORTADA
             */
            const portada = data.seccion1;
            const informacionhtml = portada.map(item => {
                return `
                <div class="seccion1">
                    <h1>${item.titulo}</h1>
                    <p>${item.descripcion}</p>
                    <div class="botones-portada">
                        <button class="btnReservar" onclick="window.location.href='./views/presupuesto.html'">Reservar</button>
                        <button class="btnGaleria" onclick="window.location.href='./views/galeria.html'">Galeria</button>
                    </div>
                </div>
                `;
            }).join("");
            container1.innerHTML = informacionhtml;

            /*
             * SECCIÓN 2: TÍTULO DE SERVICIOS
             */
            const servicios = data.seccion2;
            const serviciosHtml = servicios.map(item => {
                return `
                <div class="servicios">
                    <h2>${item.titulo}</h2>
                </div>
                `;
            }).join("");
            container2.innerHTML = serviciosHtml;

            /*
             * SECCIÓN 3: DESTINOS (Título y Cuadrícula)
             * Genera las tarjetas con el nombre del destino sobre la imagen.
             */
            const destinosTit = data.tituloDestinos;
            const htmlTitulosDestinos = destinosTit.map(item => {
                return `<h2 class="item-destinos">${item.tit}</h2>`;
            }).join("");
            tituloDestinos.innerHTML = htmlTitulosDestinos;

            const destinosImg = data.imgDestinos;
            const destinoHtml = destinosImg.map(item => {
                return `
                    <div class="card-destinos">
                        <div class="imgDestinos">
                            <img src="${item.imagen}" alt="${item.destino}">
                        </div>
                        <div class="subtituloDestinos">
                            <h3>${item.destino}</h3>
                        </div>
                    </div>`;
            }).join("");
            destinos.innerHTML = destinoHtml;

            /*
             * SECCIÓN 4: INFO DE SERVICIOS (Iconos/Fotos y descripción)
             */
            const navItems = data.imgSeccion2;
            const navItemsHtml = navItems.map(item => {
                return `
                <div class="containerInfo">
                    <div class="info-imagenes">
                        <div class="imagen-servicio">
                            <img src="${item.foto}">
                        </div>
                        <div class="titulo-servicio">
                            <h3>${item.titulo2}</h3>
                        </div>
                        <div class="subtitulo-servicio">
                            <p>${item.subtitulo}</p>
                        </div>
                    </div>
                </div>
                `;
            }).join("");
            container3.innerHTML = navItemsHtml;

            /*
             * SECCIÓN 5: VIAJES EN GRUPO
             */

            // Imagen grande de cabecera de grupo
            const viajesGrupo1 = data.viajesGrupo.viajes1;
            const viajes1Html = viajesGrupo1.map(item => {
                return `
                   <div class="row justify-content-center">
                        <div class="itemsViajes1"> 
                            <img src="${item.imgGrupo}">
                            <div class="subtituloGrupo">
                                <h1>${item.tituloGrupo}</h1>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");
            viajesGrupo.innerHTML = viajes1Html;

            // Grid de imágenes secundarias de grupo
            const viajesGrupo2 = data.viajesGrupo.viajes2;
            const viajes2Html = viajesGrupo2.map(item => {
                return `
                    <div class="itemsViajes2">
                        <img src="${item.imgGrupo2}" alt="${item.tituloGrupo2}">
                        <div class="subtituloGrupo2">
                            <h1>${item.tituloGrupo2}</h1>
                        </div>
                    </div>
                `;
            }).join("");
            viajesGrupo22.innerHTML = viajes2Html;

        })
        // Captura de errores en caso de que el JSON falte o esté mal escrito
        .catch(error => console.error("Error al cargar el JSON:", error));
});