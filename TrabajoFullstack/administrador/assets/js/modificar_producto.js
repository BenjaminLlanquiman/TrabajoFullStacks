/*
================================

    Validacion de Formulario

================================
*/

// Inputs obligatorios: Se excluyen los selects (Se veran por separado)
const inputsObligatorios = document.querySelectorAll("input[required]");

const btnRegistrar = document.querySelector(".btn-container button");

const msgsErrorObl = document.querySelectorAll(".msg-error:not(.no-obligatorio):not(.msg-select)");
const msgsErrorOriginales = Array.from(msgsErrorObl).map(msg => msg.textContent);

// Funciones para validaciones.
const alcanzaCantCaracteres = (input, cant, max = true) => {
    input.value = input.value.trim();

    if(max && (input.value.length > cant)) {
        return false;
    }

    else if(!max && (input.value.length < cant)) {
        return false;
    }

    return true;
}



const validarNumPositivo = (input, conDecimales = true) => {
    input.value = input.value.trim();

    if(conDecimales) {
        const numDecimal = parseFloat(input.value);

        if(numDecimal >= 0.0) {
            return true;
        }
    } else {
        const numEntero = parseInt(input.value);

        if(numEntero >= 0) {
            return true;
        }
    }

    return false;
}


const validarNumEntero = (input) => {
    input.value = input.value.trim();

    const exprReg = /^\d+$/ // Expresion regular que evalua si una cadena contiene solo numeros enteros.

    return exprReg.test(input.value); // Si la cadena contiene uno o mas caracteres que no sean numeros enteros, devuelve 'false'.
}

// 1. Evalua si los inputs obligatorios estan vacios o no
const estaVacio = (input) => {
    input.value = input.value.trim(); // Se quitan los espacios en blanco al inicio y al final del string

    return input.validity.valueMissing; // Si esta vacio, devuelve 'true'
}


    /*
    const stockInput = document.querySelector("input[name='stock']");
    const stockCriticoInput = document.querySelector("input[name='stock-critico']");

    stockInput.value = "01";
    stockCriticoInput.value = "02";

    const stocks = [stockCriticoInput, stockInput];

    //console.log(stocks[0].value.length);
    
    for(let i = 0; i < stocks.length; i++) {
        console.log(stocks[i].value.length);
    }
*/



// Funcion para disparar alerta por alcanzar stock critico
const alcanzaStockCritico = (input) => {
    input.value = input.value.trim();
    const stockInput = document.querySelector("input[name='stock']");

    const stocks = [input, stockInput];

    for(let i = 0; i < stocks.length; i++) {
        if(stocks[i].value.length === 0) {
            return;
        }

        const stockNumEntero = validarNumEntero(stocks[i]);
        const stockNumPositivo = validarNumPositivo(stocks[i], false);

        if(!stockNumEntero || !stockNumPositivo) {
            return;
        }
    }

    if(stockInput.value <= input.value) {
        alert("El stock de este producto alcanzó al stock crítico o es menor a este.");
        return;
    }

    return;
}

// Implementacion de validacion de formulario en EventListener 'click'
// Si es valido, muestra mensaje de exito (contenedor 'toast') y limpia formulario.
btnRegistrar.addEventListener(
    "click",
    (evento) => {
        evento.preventDefault();

        let hayErrores = false;


        for(let i = 0; i < inputsObligatorios.length; i++) {
            msgsErrorObl[i].classList.remove("activo");

            const inputVacio = estaVacio(inputsObligatorios[i]);

            if(inputVacio) {
                msgsErrorObl[i].classList.add("activo");
                hayErrores = true;
            }

            if(inputsObligatorios[i].name === "codigo-prod") {
                const cumpleMinCaracteres = alcanzaCantCaracteres(inputsObligatorios[i], 3, false);

                if(!cumpleMinCaracteres) {
                    msgsErrorObl[i].classList.add("activo");
                    hayErrores = true;
                }
            }

            if(inputsObligatorios[i].name === "nombre") {
                const cumpleMinCaracteres = alcanzaCantCaracteres(inputsObligatorios[i], 100);

                const msgAntiguo = msgsErrorOriginales[i];

                if(!cumpleMinCaracteres) {
                    msgsErrorObl[i].classList.add("activo");
                    msgsErrorObl[i].textContent = "Se superaron los 100 caracteres.";
                    hayErrores = true;
                } else {
                    msgsErrorObl[i].textContent = msgAntiguo;
                }
            }

            if(inputsObligatorios[i].name === "precio") {
                const esPositivo = validarNumPositivo(inputsObligatorios[i]);

                if(!esPositivo) {
                    msgsErrorObl[i].classList.add("activo");
                    hayErrores = true;
                }
            }

            if(inputsObligatorios[i].name === "stock") {
                const esPositivo = validarNumPositivo(inputsObligatorios[i], false);
                const esEntero = validarNumEntero(inputsObligatorios[i]);

                if(!esPositivo || !esEntero) {
                    msgsErrorObl[i].classList.add("activo");
                    hayErrores = true;
                }
            }
        }


        // Inputs no obligatorios que requieren una validacion
        const inputsNoObligatorios = document.querySelectorAll("input:not(input[required]):not(input[type='file'])");
        const [ descripcion, stockCritico ] = inputsNoObligatorios;

        const msgsNoObligatorios = document.querySelectorAll(".no-obligatorio");
        const [ msgErrorDescr, msgStockCritico ] = msgsNoObligatorios;

        msgErrorDescr.classList.remove("activo");
        msgStockCritico.classList.remove("activo");

        const descrCumpleCant = alcanzaCantCaracteres(descripcion, 500);

        if(!descrCumpleCant) {
            msgErrorDescr.classList.add("activo");
            msgErrorDescr.textContent = "Ha superado los 500 caracteres.";
            hayErrores = true;
        } else {
            msgErrorDescr.textContent = "";
        }


        const stockCriticoPositivo = validarNumPositivo(stockCritico, false);
        const stockCriticoEntero = validarNumEntero(stockCritico);

        if((!stockCriticoPositivo || !stockCriticoEntero) && !(stockCritico.value === "")) {
            msgStockCritico.classList.add("activo");
            hayErrores = true;
        }
        
        alcanzaStockCritico(stockCritico);

        // Validacion select (categoria).
        const selectCategoria = document.querySelector("#categoria");
        const msgErrorCategoria = document.querySelector(".msg-select");

        msgErrorCategoria.classList.remove("activo");

        if(selectCategoria.validity.valueMissing) {
            msgErrorCategoria.classList.add("activo");
            hayErrores = true;
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

            return;

        }

        return;
    }
);
