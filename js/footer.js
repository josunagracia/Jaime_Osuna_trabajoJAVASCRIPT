document.addEventListener("DOMContentLoaded", function () {

    const redes = document.querySelector(".redes");
    const avisoFooter = document.querySelector(".avisoLegal");
    const direccion = document.querySelector(".direccion");


    const vista = window.location.pathname.includes("views")
    const carpetaData = vista ? "../assets/data/datos.json" : "./assets/data/datos.json";

    fetch(carpetaData)
        .then(response => {
            if (!response.ok) throw new Error("No se encuentra el archivo JSON en la ruta: " + carpetaData);
            return response.json();
        })
        .then(data => {

            //footer aviso legal

            const avisoLegal = data.footer.avisoLegal;
            const avisoLegalHtml = avisoLegal.map(item => {
                return `
                    <p class="aviso">${item.aviso}</p>
                    `
            }).join("");

            avisoFooter.innerHTML = avisoLegalHtml;

            //Footer redes sociales
            const redesSociales = data.footer.redes;
            const redesHtml = redesSociales.map(item => {

                let rutaImagen = item.img;
                if (vista) {
                    rutaImagen = item.img.replace("./", "../");
                }
                return `
                    <a href="${item.link}" target="_blank">
                        <img src="${rutaImagen}" alt="Red Social">
                    </a>
                    `
            }).join("");

            redes.innerHTML = redesHtml;



            //footer dirección de contacto
            const direccionContacto = data.footer.direccion;
            const direccionHtml = direccionContacto.map(item => {

                return `
                    <a href="${item.link}" target="_blank">
                        <p>${item.nombre}</p>
                    </a>
                    `
            }).join("");

            direccion.innerHTML = direccionHtml;



        })


        .catch(error => console.error("Error detallado:", error));




});