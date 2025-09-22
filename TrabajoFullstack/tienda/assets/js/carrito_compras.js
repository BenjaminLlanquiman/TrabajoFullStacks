
// Se obtiene localStorage.
let peliculasCarrito = JSON.parse(localStorage.getItem("carritoProductos"));

console.log(peliculasCarrito);

if(peliculasCarrito === null) {
    peliculasCarrito = [];
}

// No es recomendado hacer esto (riesgo de XSS, por ej), pero por el fin academico del trabajo, se hace.
const crearProdContainer = (id, titulo, descripcion, precio, imgSrc, imgAlt) => {

    const plantillaProd = `<div class="producto-container producto-0${id}">
                    <img src="${imgSrc}" alt="${imgAlt}">

                    <div class="descr-producto">
                        <h2>${titulo}</h2>

                        <p class="descripcion">${descripcion}</p>

                        <div class="btn-eliminar-container">
                            <button>Eliminar</button>
                        </div>
                    </div>

                    <div class="precio-prod">
                        <p class="precio">$<span class="num-precio">${precio}</span></p>

                        <div class="cantidad-container">
                            <button class="restar">-</button>
                            <input class="num-cantidad" type="number" name="num-cantidad" min="1" value="1" readonly>
                            <button class="sumar">+</button>
                        </div>
                    </div>
                </div>`

    return plantillaProd
}

const listaProdContainer = document.querySelector(".lista-productos");

const costoFinalContainer = document.querySelector(".costo-final");

peliculasCarrito.forEach(
    (peli, i) => {
        const producto = crearProdContainer(i + 1, peli.titulo, peli.descripcion, peli.precio, peli.imagenSrc, peli.imagenAlt);

        listaProdContainer.insertAdjacentHTML("beforeend", producto);
    }
);

// Cantidad en el carrito del navbar.
const actualizarCarritoNavbar = () => {
    const cantPedido = document.querySelector(".cant-pedido");
    
    cantPedido.textContent = `${peliculasCarrito.length}`;
}

actualizarCarritoNavbar(); // Para actualizarlo al refrescar la pagina

// Funcion para actualizar costo total.
const actualizarCostoTotal = () => {
    const precioProd = document.querySelectorAll(".num-precio");
    let costoTotal = 0;

    precioProd.forEach(
        (textPrecio, i) => {
            const numPrecio = parseInt(textPrecio.textContent);

            costoTotal += numPrecio;
        }
    );

    costoFinalContainer.textContent = `$${costoTotal}`;
}

// Funcion para actualizar precios segun cantidad.
const actualizarPrecios = (indice, seSuma = true) => {
    const inputsCantidad = document.querySelectorAll(".num-cantidad");
    const preciosProd = document.querySelectorAll(".num-precio");
    const precioInicial = peliculasCarrito[indice].precio;
    let cantidad = parseInt(inputsCantidad[indice].value);

    if(seSuma) {
        cantidad += 1; // Es lo mismo que cantidad = cantidad + 1;
    } else {
        cantidad -= 1;
    }

    // La cantidad debe ser mayor o igual a 1. En caso contrario, se sale de la funcion.
    if(cantidad < 1) {
        return;
    }

    // Se actualizan los precios
    let precioFinal = precioInicial * cantidad;
    
    inputsCantidad[indice].value = `${cantidad}`;
    preciosProd[indice].textContent = `${precioFinal}`;
}

const btnsSuma = document.querySelectorAll(".cantidad-container .sumar");
const btnsResta = document.querySelectorAll(".cantidad-container .restar");

actualizarCostoTotal();

btnsSuma.forEach(
    (btn, i) => {
        btn.addEventListener(
            "click",
            () => {
                actualizarPrecios(i);
                actualizarCostoTotal();
            }
        );
    }
);


btnsResta.forEach(
    (btn, i) => {
        btn.addEventListener(
            "click",
            () => {
                actualizarPrecios(i, false);
                actualizarCostoTotal();
            }
        );
    }
);

// Evento para eliminar productos del carrito.
const btnsEliminar = document.querySelectorAll(".btn-eliminar-container button");

btnsEliminar.forEach(
    (btn, i) => {
        btn.addEventListener(
            "click",
            () => {
                peliculasCarrito.splice(i, 1);

                // Se busca el ancestro más cercano del botón que tenga la clase 'producto-container'
                const prodContainerMasCercano = btn.closest(".producto-container");
                prodContainerMasCercano.remove();

                // Se actualiza carrito
                localStorage.setItem("carritoProductos", JSON.stringify(peliculasCarrito));

                // Se actualiza contador del carrito
                actualizarCarritoNavbar();

                // Se actualiza el costo total.
                actualizarCostoTotal();
            }
        );
    }
);


