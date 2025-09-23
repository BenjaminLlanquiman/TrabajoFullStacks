
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

// Inputs obligatorios: Se excluyen el select (Se vera por separado)
const inputsObligatorios = document.querySelectorAll("input[required]");

const btnRegistrar = document.querySelector(".btn-container button");

// Mensajes de error: Se excluye el select (se vera por separado)
const msgsError = document.querySelectorAll(".msg-error:not(.msg-t-usuario)");
const msgsErrorOriginales = Array.from(msgsError).map(msg => msg.textContent);


// Funciones de validacion
// 1. Evalua si los inputs obligatorios estan vacios o no
const estaVacio = (input) => {
    input.value = input.value.trim(); // Se quitan los espacios en blanco al inicio y al final del string

    return input.validity.valueMissing; // Si esta vacio, devuelve 'true'
}

// 2. Evalua correo: Si contiene los dominios validos.
const validaCorreo = (input) => {
    input.value = input.value.trim();
    input.value = input.value.toLowerCase();
    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    return dominiosValidos.some(elem => input.value.includes(elem));

}

// 3. Evalua cantidad maxima de caracteres permitida.
const superaMaxCaracteres = (input, cantMax) => {
    if(input.value.length > cantMax) {
        return true;
    }

    return false;
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
        }

        // Se separa validacion especifica de password
        const passwordInput = document.querySelector("input[type='password']");
        const msgErrorPass = document.querySelector(".msg-pass");

        msgErrorPass.classList.remove("activo");

        if(passwordInput.value.length < 4 || passwordInput.value.length > 10) {
            msgErrorPass.classList.add("activo");
            hayErrores = true;
        }

        // Validacion select 'tipo de usuario'
        const selectTipoUsuario = document.querySelector("#tipo-usuario");
        const msgErrorTUsuario = document.querySelector(".msg-t-usuario");

        msgErrorTUsuario.classList.remove("activo");

        if(selectTipoUsuario.validity.valueMissing) {
            msgErrorTUsuario.classList.add("activo");
            hayErrores = true;
        }

        // Si no se encuentran errores, se ejecuta este bloque
        if(!hayErrores) {
            const formulario = document.querySelector(".formulario-login");

            const msgExitoToast = document.querySelector(".msg-toast");

            msgExitoToast.classList.add("exito");

            // Despues de 3 segundos (3000 ms), el mensaje de exito desaparece
            setTimeout(
                () => {
                    msgExitoToast.classList.remove("exito");
                },
                2000
            );

            // Redirección a página segun tipo de usuario elegido.
            const tUsuarioElegido = selectTipoUsuario.value;
            let direccion = "";

            if(tUsuarioElegido === "administrador") {
                direccion += "../administrador/home_admin.html";
            }

            else if (tUsuarioElegido === "vendedor") {
                direccion += "../administrador/home_vendedor.html";
            }

            else if (tUsuarioElegido === "cliente") {
                direccion += "./home_usuario.html";
            }

            setTimeout(
                () => {
                    window.location.href = direccion;
                    formulario.reset(); // Se limpia el formulario

                },                
                1000
            );

            return;

        }

        return;
    }
);

