/*
====================================

    Carga de Regiones y Comunas.

====================================
*/

// Muestra de datos de regiones con sus comunas.
// Fuente: https://gist.github.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd
const regionesChile = {
    arica: [
        "Arica", "Camarones", "Putre", "General Lagos"
    ],
    coquimbo: [
        "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"
    ],
    metropolitana: [
        "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
    ],
    losRios: [
        "Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"
    ],
    magallanes: [
"Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"
    ]
}

// Cada vez que se elija una region, apareceran sus comunas correspondientes.
const selectRegiones = document.querySelector("select[name='regiones']");
const selectComunas = document.querySelector("select[name='comunas']");

selectRegiones.addEventListener(
    "change",
    () => {
        const regionElegida = selectRegiones.value;

        // Limpieza de select de comunas: Se quitan todas las que estan en segundo lugar, menos la primera.
        while(selectComunas.options.length > 1) {
            selectComunas.remove(1);
        }

        if(regionElegida) {
            const comunasList = regionesChile[regionElegida];

            comunasList.forEach(
                (comuna) => {
                    const opcionComuna = document.createElement("option");
                    opcionComuna.value = comuna;
                    opcionComuna.textContent = comuna;

                    selectComunas.appendChild(opcionComuna);
                }
            );

            selectComunas.disabled = false;
        } 
    }
);

// Cantidad en el carrito del navbar.
const actualizarCarritoNavbar = () => {
    const cantPedido = document.querySelector(".cant-pedido");

    let peliculasCarrito = JSON.parse(localStorage.getItem("carritoProductos"));

    if(peliculasCarrito === null) {
        peliculasCarrito = [];
    }

    cantPedido.textContent = `${peliculasCarrito.length}`;
}

actualizarCarritoNavbar(); // Para actualizarlo al refrescar la pagina



/*
================================

    Validacion de Formulario

================================
*/

// Inputs obligatorios: Se excluyen los selects (Se veran por separado)
const inputsObligatorios = document.querySelectorAll("input[required]");

const btnRegistrar = document.querySelector(".btn-container button");

// Mensajes de error: Se excluyen los de los selects (se veran por separado)
const msgsError = document.querySelectorAll(".msg-error:not(label[for='telefono'] + .msg-error):not(fieldset[name='ubicacion'] span:nth-child(4))");
const msgsErrorOriginales = Array.from(msgsError).map(msg => msg.textContent);


// **** Funciones para validar inputs. *****
// 1. Evalua si los inputs obligatorios estan vacios o no
const estaVacio = (input) => {
    input.value = input.value.trim(); // Se quitan los espacios en blanco al inicio y al final del string

    return input.validity.valueMissing; // Si esta vacio, devuelve 'true'
}

// 2. Evalua validez del RUN:
//------------------------------
// - Si contiene puntos o guiones
// - Si su longitud es mayor o igual a 7
// - Si primer caracter numerico mayor a 0
// - Si ultimo caracter es un numero o la letra 'k'
// - Si resto de caracteres son numericos
const runValido = (input) => {
    input.value = input.value.trim();
    input.value = input.value.toLowerCase();

    // Evalua si la cadena contiene puntos o guion
    const tienePuntos = input.value.includes(".");
    const tieneGuion = input.value.includes("-");

    if(tienePuntos || tieneGuion) {
        return false;
    }

    // Evalua si el largo de la cadena no es mayor o igual a 7
    if(input.value.length < 7 || input.value.length > 9) {
        return false;
    }

    // Evaluacion del primer caracter: Si no es un numero mayor o igual a 1, devuelve 'false'.
    // Como son caracteres, la comparacion se hace por el sistema
    // Unicode. Las letras son mayores a los numeros, por lo que si es una letra,
    // la segunda condicion es verdadera, por lo que toda la expresion es verdadera
    if(input.value[0] < "1" || input.value[0] > "9") {
        return false;
    }

    // Evaluacion de los caracteres posteriores al primero.
    for(let i = 1; i < input.value.length; i++) {
        // Evalua el ultimo caracter
        if(i === input.value.length - 1) {
            // Si el ultimo caracter no es 'k' o un numero entre el 1 y el 9, devuelve 'false' (es decir, RUN es invalido)
            if(input.value[i] !== "k" && (input.value[i] < "1" || input.value[i] > "9")) {
                return false;
            }
        }
        
        // Evaluacion desde el 2do al penultimo caracter
        else {
            if(input.value[i] < "0" || input.value[i] > "9") {
                return false;
            }
        }
    }

    return true; // Si pasa todas las evaluaciones, se regresa 'true'
}

// 3. Evalua correo: Si contiene los dominios validos.
const validaCorreo = (input) => {
    input.value = input.value.trim();
    input.value = input.value.toLowerCase();
    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    return dominiosValidos.some(elem => input.value.includes(elem));

}

// 4. Evalua cantidad maxima de caracteres permitida.
const superaMaxCaracteres = (input, cantMax) => {
    if(input.value.length > cantMax) {
        return true;
    }

    return false;
}

// 5. Evalua telefono valido: Solo numeros. Debe comenzar con un numero mayor o igual 2 y de largo 9.
const validaTelefono = (input) => {
    input.value = input.value.trim();
 
    // Expresion regular que contiene requerimiento.
    // El '|' es un operador OR: Si el caracter esta vacio o si cumple con lo solicitado [2-9]\d{8}
    const regex = /^(|[2-9]\d{8})$/;

    return regex.test(input.value); // Si es valido, devuelve 'true'
}

// Implementacion de validacion de formulario en EventListener 'click'
// Si es valido, muestra mensaje de exito (contenedor 'toast') y limpia formulario.
btnRegistrar.addEventListener(
    "click",
    (evento) => {
        evento.preventDefault();

        let hayErrores = false;

        
        // Validacion si los inputs tienen valores o no.
        for(let i = 0; i < inputsObligatorios.length; i++) {

            msgsError[i].classList.remove("activo");

            const inputVacio = estaVacio(inputsObligatorios[i]);

            if(inputVacio) {
                msgsError[i].classList.add("activo");
                hayErrores = true;
            }

            if(inputsObligatorios[i].name === "run") {
                const esValidoRun = runValido(inputsObligatorios[i]);

                if(!esValidoRun) {
                    msgsError[i].classList.add("activo");
                    hayErrores = true;
                }
            }

            if(inputsObligatorios[i].name === "nombre") {
                const alcanzoMaximo = superaMaxCaracteres(inputsObligatorios[i], 50);

                let msgAntiguo = msgsErrorOriginales[i];

                if(alcanzoMaximo) {
                    msgsError[i].textContent = "Se superaron los 50 caracteres."
                    msgsError[i].classList.add("activo");
                    hayErrores = true;
                } else {
                    msgsError[i].textContent = msgAntiguo;
                }
            }

            if(inputsObligatorios[i].name === "apellidos") {
                const alcanzoMaximo = superaMaxCaracteres(inputsObligatorios[i], 100);

                let msgAntiguo = msgsErrorOriginales[i];

                if(alcanzoMaximo) {
                    msgsError[i].textContent = "Se superaron los 100 caracteres."
                    msgsError[i].classList.add("activo");
                    hayErrores = true;
                } else {
                    msgsError[i].textContent = msgAntiguo;
                }
            }

            if(inputsObligatorios[i].name === "correo") {
                const alcanzoMaximo = superaMaxCaracteres(inputsObligatorios[i], 100);

                let msgAntiguo = msgsErrorOriginales[i];

                let esValido = validaCorreo(inputsObligatorios[i]);

                if(!esValido) {
                    msgsError[i].classList.add("activo");
                    hayErrores = true;
                }

                if(alcanzoMaximo) {
                    msgsError[i].textContent = "Se superaron los 100 caracteres."
                    msgsError[i].classList.add("activo");
                    hayErrores = true;
                } else {
                    msgsError[i].textContent = msgAntiguo;
                }
            }

            if(inputsObligatorios[i].name === "direccion") {
                const alcanzoMaximo = superaMaxCaracteres(inputsObligatorios[i], 300);

                let msgAntiguo = msgsErrorOriginales[i];

                if(alcanzoMaximo) {
                    msgsError[i].textContent = "Se superaron los 300 caracteres."
                    msgsError[i].classList.add("activo");
                    hayErrores = true;
                } else {
                    msgsError[i].textContent = msgAntiguo;
                }
            }
        }

        // Se separa validacion especifica de password
        const passwordsInputs = document.querySelectorAll("input[type='password']");
        const errorMsgsPass = document.querySelectorAll("label[for='password'] + span, label[for='confirm-pass'] + span");

        [password, confirmPass] = passwordsInputs;
        [ msgErrorPass, msgErrorConfirmPass ] = errorMsgsPass;

        msgErrorPass.classList.remove("activo");
        msgErrorConfirmPass.classList.remove("activo");

        if(password.value.length < 4 || password.value.length > 10) {
            msgErrorPass.classList.add("activo");
            hayErrores = true;
        }

        if((confirmPass.value.length < 4 || confirmPass.value.length > 10) || confirmPass.value !== password.value) {
            msgErrorConfirmPass.classList.add("activo");
            hayErrores = true;
        }

        // Validacion de selects (regiones y comunas)
        const msgErrorRegionComuna = document.querySelectorAll("fieldset[name='ubicacion'] span")[1];

        msgErrorRegionComuna.classList.remove("activo");

        if(selectRegiones.validity.valueMissing || selectComunas.validity.valueMissing) {
            msgErrorRegionComuna.classList.add("activo");
            hayErrores = true;
        }

        // Validacion telefono (como no es un campo obligatorio, si esta vacio o si no es valido
        // no se le dara el valor 'true' a la variable 'hayErrores'.
        const inputTel = document.querySelector("input[type='tel']");
        const msgErrorTel = document.querySelector("label[for='telefono'] + span");
        const esTelValido = validaTelefono(inputTel);

        msgErrorTel.classList.remove("activo");

        if(!esTelValido) {
            msgErrorTel.classList.add("activo");
        }
        

        // Si no se encuentran errores, se ejecuta este bloque
        if(!hayErrores) {
            const formulario = document.querySelector(".formulario-registro");

            const msgExitoToast = document.querySelector(".msg-toast");
            const usuarioTag = document.querySelector(".msg-toast p span");

            const usuario = document.querySelectorAll("fieldset[name='nombre-usuario'] input");

            const [ nombre, apellidos ] = usuario;

            usuarioTag.textContent = `${nombre.value} ${apellidos.value}`;

            msgExitoToast.classList.add("exito");

            formulario.reset(); // Se limpia el formulario

            // Despues de 3 segundos (3000 ms), el mensaje de exito desaparece
            setTimeout(
                () => {
                    msgExitoToast.classList.remove("exito");
                    usuarioTag.textContent = "";
                },
                3000
            );

            // Limpieza de formulario
            formulario.reset();

            // Limpieza de selects
            while(selectComunas.options.length > 1) {
                selectComunas.remove(1);
            }

            selectComunas.disabled = true;

            return;

        }

        return;
    }
);
