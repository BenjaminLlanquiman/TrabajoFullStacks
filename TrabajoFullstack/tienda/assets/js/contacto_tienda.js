const inputsObligatorios = document.querySelectorAll("input[required]");

const btnEnviar = document.querySelector(".btn-container button");

const msgsError = document.querySelectorAll(".msg-error");

const estaVacio = (input) => {
    input.value = input.value.trim(); // Se quitan los espacios en blanco al inicio y al final del string

    return input.validity.valueMissing; // Si esta vacio, devuelve 'true'
}


//  Evalua correo: Si contiene los dominios validos.
const validaCorreo = (input) => {
    input.value = input.value.trim();
    input.value = input.value.toLowerCase();
    const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    return dominiosValidos.some(elem => input.value.includes(elem));

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

     
        // Si no se encuentran errores, se ejecuta este bloque
        if(!hayErrores) {
            const formulario = document.querySelector(".formulario-contacto");

            const msgExitoToast = document.querySelector(".msg-toast");

            msgExitoToast.classList.add("exito");

            // Despues de 3 segundos (3000 ms), el mensaje de exito desaparece
            setTimeout(
                () => {
                    msgExitoToast.classList.remove("exito");
                },
                2000
            );




        }

        return;
    }
);