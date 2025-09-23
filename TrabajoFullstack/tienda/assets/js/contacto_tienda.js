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

const textarea = document.querySelector("#contenido");
const maxContenido = 500;

const inputsObligatorios = document.querySelectorAll("input[required]");
const btnEnviar = document.querySelector(".btn-container button");

const msgsError = document.querySelectorAll(".msg-error");
const msgsErrorOriginales = Array.from(msgsError).map(msg => msg.textContent);

const correoInput = document.querySelector("input[name='correo']");
const msgErrorCorreo = document.querySelector(".msg-correo");
const msgCorreoOriginal = msgErrorCorreo.textContent;

const msgErrorTextarea = document.querySelector(".msg-pass");
const msgErrorTextareaOriginal = msgErrorTextarea.textContent;

const estaVacio = (input) => {
    input.value = input.value.trim(); // Se quitan los espacios en blanco al inicio y al final del string

    return input.validity.valueMissing; // Si esta vacio, devuelve 'true'
}


//  Evalua correo: Si contiene los dominios validos.
const validaCorreo = (input) => {
    input.value = input.value.trim();
    input.value = input.value.toLowerCase();
    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    return dominiosValidos.some(Element => input.value.includes(Element));

}

const superaMaxCaracteres = (input, cantMax) => {
    if(input.value.length > cantMax) {
        return true;
    }

    return false;
}

btnEnviar.addEventListener(
    "click",
    (evento) => {
        evento.preventDefault();

        let hayErrores = false;

         // Limpiar errores antes de validar
            msgsError.forEach(msg => msg.classList.remove("activo"));
            msgErrorTextarea.classList.remove("activo");
            msgErrorCorreo.classList.remove("activo");

        
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

	// Validacion correo
	let esCorreoValido = validaCorreo(correoInput);
        const correoAlcanzoMaximo = superaMaxCaracteres(correoInput, 100);

	msgErrorCorreo.classList.remove("activo");

	if(!esCorreoValido) {
	    msgErrorCorreo.classList.add("activo");
        
            hayErrores = true;
	}

	if(correoAlcanzoMaximo) {
            msgErrorCorreo.textContent = "Se superaron los 100 caracteres.";
            hayErrores = true;
        } else {
            msgErrorCorreo.textContent = msgCorreoOriginal;
        }

	

         // --- ValidaciÃ³n del textarea ---
         msgErrorTextarea.classList.remove("activo");

        if (textarea.value.trim().length === 0) {
            msgErrorTextarea.textContent = "Debe ingresar un contenido.";
            msgErrorTextarea.classList.add("activo");
            hayErrores = true;
            
        } else if (textarea.value.length > maxContenido) {
            msgErrorTextarea.textContent = "No puede superar los 500 caracteres.";
            msgErrorTextarea.classList.add("activo");
            hayErrores = true;

        } else {
            msgErrorTextarea.textContent = msgsErrorTextareaOriginal; // restaura el mensaje original
        }

     
        // Si no se encuentran errores, se ejecuta este bloque
        if(!hayErrores) {
            const formulario = document.querySelector(".formulario-contacto");

            const msgExitoToast = document.querySelector(".msg-toast");

            msgExitoToast.classList.add("exito");
            formulario.reset();

            // Despues de 3 segundos (3000 ms), el mensaje de exito desaparece
            alert("El mensaje ha sido enviado exitosamente");
            
            setTimeout(
                () => {
                    msgExitoToast.classList.remove("exito");
                },
                2000);






        }

        return;
});