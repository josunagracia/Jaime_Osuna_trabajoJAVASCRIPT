
/*
* SECCIÓN 1: CÁLCULO DINÁMICO DEL PRESUPUESTO
 * Gestiona el precio base de destinos, extras y descuentos por tiempo.
 */

// Captura de elementos del DOM para mostrar resultados

const formulario = document.getElementById('formulario');
const precioFinal = document.getElementById('precio-final');
const precioExtras = document.getElementById('precio-extras');

/*
 * Función que valida si el plazo está entre 1 y 12 meses.
 * Cambia el color del borde del input según el resultado.
 */
function validarPlazo() {
    const plazo = parseInt(plazoInput.value);
    if (plazo > 0 && plazo <= 12) {
        plazoInput.classList.add('valido');
        plazoInput.classList.remove('invalido');
        return true;
    } else {
        plazoInput.classList.add('invalido');
        plazoInput.classList.remove('valido');
        return false;
    }
}

/*
 * Función principal que suma todos los valores del formulario.
 * Incluye la lógica de descuento del 10% por plazos largos.
 */
function calcularPresupuesto() {
    let totalFinal = 0;
    let totalExtras = 0;

    // Busca el destino seleccionado y obtiene su precio desde el atributo data-price
    const precioDestino = document.querySelector('input[name="destino"]:checked');
    if (precioDestino) {
        totalFinal = Number(precioDestino.getAttribute('data-price'));
    }
    // Recorre todos los extras marcados y suma sus precios
    const extras = document.querySelectorAll('input[name="extra"]:checked');
    extras.forEach(extra => {
        totalExtras += Number(extra.getAttribute('data-price'));
    });

    // Calcula el presupuesto total y aplica un descuento del 10% si el plazo es mayor a 6 meses
    let presupuestoTotal = totalFinal + totalExtras;
    const meses = parseInt(plazoInput.value) || 1;

    if (meses >= 6 && meses <= 12) {
        presupuestoTotal = presupuestoTotal * 0.90; // Descuento del 10%
    }
    // Actualiza los textos en el HTML con los valores calculados
    if (precioExtras) precioExtras.textContent = `Total Extras: ${totalExtras} €`;
    if (precioFinal) precioFinal.textContent = `Presupuesto total: ${presupuestoTotal} €`;
}

// Escucha cualquier cambio en el formulario para actualizar el precio al instante
formulario.addEventListener('change', calcularPresupuesto);



/*
* SECCIÓN 2: VALIDACIÓN DE CAMPOS DEL FORMULARIO
* Uso de Expresiones Regulares (RegEx) para asegurar datos correctos.
*/

const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
const privacidadInput = document.getElementById('privacidad');
const plazoInput = document.getElementById('plazo');



// Valida el nombre: solo letras y más de 3 caracteres

function validarNombre() {
    const nombre = nombreInput.value
    const nombrePatron = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (nombre.length > 3 && nombrePatron.test(nombre)) {
        nombreInput.classList.add('valido');
        nombreInput.classList.remove('invalido');
        document.getElementById('errorNombre').textContent = "";
    } else {
        nombreInput.classList.add('invalido');
        nombreInput.classList.remove('valido');
        document.getElementById('errorNombre').textContent = "El nombre debe tener al menos 3 caracteres";
    }

}

// Valida el apellido: igual que el nombre (letras y longitud)

function validarApellido() {

    const apellido = apellidoInput.value
    const nombrePatron = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

    if (apellido.length > 3 && nombrePatron.test(apellido)) {
        apellidoInput.classList.add('valido');
        apellidoInput.classList.remove('invalido');
        document.getElementById('errorApellido').textContent = "";
    } else {
        apellidoInput.classList.add('invalido');
        apellidoInput.classList.remove('valido')
        document.getElementById('errorApellido').textContent = "El apellido debe tener al menos 3 caracteres";
    }
}

// Valida teléfono: exactamente 9 dígitos numéricos

function validarTelefono() {
    const telefono = telefonoInput.value
    const telefonoPatron = /^\d{9}$/;

    if (telefono.length > 3 && telefonoPatron.test(telefono)) {
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        document.getElementById('errorTelefono').textContent = "";
    } else {
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido')
        document.getElementById('errorTelefono').textContent = "El teléfono debe tener 9 dígitos";
    }

}

// Valida email: estructura básica de correo electrónico

function validarEmail() {
    const email = emailInput.value
    const emailPatron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 3 && emailPatron.test(email)) {
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        document.getElementById('errorEmail').textContent = "";
    } else {
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        document.getElementById('errorEmail').textContent = "Correo incompleto";
    }

}





// Valida que el checkbox de privacidad esté marcado

function validarPrivacidad() {
    const errorMsg = document.getElementById('errorCheckbox');

    if (privacidadInput.checked) {
        privacidadInput.classList.add('valido');
        privacidadInput.classList.remove('invalido');
        errorMsg.textContent = ""; // Borra el texto si está marcado
        return true;
    } else {
        privacidadInput.classList.add('invalido');
        privacidadInput.classList.remove('valido');
        errorMsg.textContent = "¡Debes marcar esta casilla!"; // Aquí el texto que pediste
        return false;
    }
}


/*
* SECCIÓN 3: GESTIÓN DE BOTONES (ENVIAR Y BORRAR)
*/

const btnEnviar = document.querySelector('.btnEnviar');
const miForm = document.getElementById('formulario');

if (btnEnviar) {
    btnEnviar.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que se envíe sin validar

        // Ejecutamos todas tus funciones
        validarNombre();
        validarApellido();
        validarTelefono();
        validarEmail();
        validarPrivacidad();
        validarPlazo();
        calcularPresupuesto();


        // Comprobamos si hay algún input con la clase 'invalido'
        const checkEsValido = validarPrivacidad();
        const errores = document.querySelectorAll('.invalido');

        if (errores.length === 0 && checkEsValido) {
            alert("Formulario enviado correctamente");
            miForm.submit(); // Envía el formulario
        } else {
            console.log("Aún hay errores en el formulario");
        }

    });
}

// Lógica para el botón de resetear: limpia inputs y contadores de precio

const btnBorrar = document.querySelector('.btnBorrar');

if (btnBorrar) {
    btnBorrar.addEventListener('click', () => {
        precioFinal.textContent = "Presupuesto total: 0 €";
        precioExtras.textContent = "Total Extras: 0 €";
        miForm.reset();
    });
}






/*
* SECCIÓN 4: INICIALIZACIÓN (DOMContentLoaded)
* Configura los escuchadores de eventos una vez cargada la página.
*/
document.addEventListener("DOMContentLoaded", () => {
    if (miForm) miForm.reset(); // Limpia el formulario al recargar
    if (nombreInput) nombreInput.addEventListener('input', validarNombre);
    if (apellidoInput) apellidoInput.addEventListener('input', validarApellido);
    if (telefonoInput) telefonoInput.addEventListener('input', validarTelefono);
    if (emailInput) emailInput.addEventListener('input', validarEmail);
    if (privacidadInput) { privacidadInput.addEventListener('change', validarPrivacidad); }
    if (plazoInput) {
        plazoInput.addEventListener('input', () => {
            validarPlazo();
            calcularPresupuesto();
        });
    }
});


