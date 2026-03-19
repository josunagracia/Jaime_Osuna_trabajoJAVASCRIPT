/*
 * SISTEMA DE MAPA Y GEOLOCALIZACIÓN
 * Utiliza Leaflet para mostrar la ubicación y trazar rutas.
 */

// 1. Coordenadas de destino
const destino = [37.491319, -5.939248];

// 2. Configuración de precisión para la geolocalización del navegador
let options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};

// 3. Inicialización del mapa en el contenedor HTML con ID 'mapa-contacto'
const map = L.map('mapa-contacto').setView(destino, 13);

// 4. Carga de las imágenes del mapa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mapa creado por Jaime'
}).addTo(map);

/*
 * 5. SOLICITUD DE GEOLOCALIZACIÓN
 * Si el navegador soporta geolocalización, intenta obtener la posición del usuario.
 */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
}

/*
 * CASO ÉXITO: El usuario permitió compartir su ubicación
 */
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Centra el mapa en la posición actual del usuario
    map.setView([latitude, longitude], 13);

    // 6. TRAZADO DE RUTA 
    L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),    // Punto A: Usuario
            L.latLng(destino[0], destino[1])  // Punto B: Agencia
        ],
        language: 'es',
        show: false,
    }).addTo(map);
}

/*
 * CASO ERROR: No se pudo obtener la ubicación
 */
function error(err) {
    console.warn(`No se pudo obtener la ubicación: ${err.message}`);

    // Si falla la geolocalización, simplemente ponemos un marcador en nuestra oficina
    L.marker(destino).addTo(map).bindPopup('Estamos aquí').openPopup();
}