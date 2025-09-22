// Listado de productos (peliculas)
const peliculas = [
    {
        titulo: "Se7en: Los siete pecados capitales",
        descripcion: "Dos detectives, protagonizados por Morgan Freeman y Brad Pitt, investigan una serie de asesinatos relacionados con los siete pecados capitales.",
        precio: 1000,
        imagenSrc: "./assets/img/seven-poster.jpg",
        imagenAlt: "Imagen de poster de Seven."
    },
    {
        titulo: "Matilda",
        descripcion: "Dirigida por Danny DeVito y basada en el libro de Roald Dahl, trata sobre una niña genio que desarrolla habilidades psicoquinéticas las cuales usa para tratar con su irresponsable familia y su malvada directora de escuela.",
        precio: 1000,
        imagenSrc: "./assets/img/matilda-poster.jpg",
        imagenAlt: "Imagen de poster de Matilda."
    },
    {
        titulo: "Superbad",
        descripcion: "Dos jóvenes, Seth y Evan, están a pocos días de graduarse de la secundaria y pretenden celebrar con todo antes de terminarla, pero su plan resulta más complicado de lo esperado.",
        precio: 1000,
        imagenSrc: "./assets/img/superbad-poster.jpg",
        imagenAlt: "Imagen de poster de Superbad."
    },
    {
        titulo: "Rápido y Furioso: Reto Tokio",
        descripcion: "Película de acción que sigue a un joven piloto de carreras que se muda a Tokio y se involucra en el mundo del drifting, enfrentándose a rivales y a su propio pasado.",
        precio: 1000,
        imagenSrc: "./assets/img/fast-furious-poster.jpg",
        imagenAlt: "Imagen de poster de Rápido y Furioso."
    },
    {
        titulo: "Mad Max: Furia en la Carretera",
        descripcion: "Centrada en un período postapocalíptico, narra la historia de Max Rockatansky y Furiosa quienes intentan escapar de un tirano en un desierto devastado, mientras se enfrentan a hordas de guerreros en una frenética persecución.",
        precio: 1000,
        imagenSrc: "./assets/img/mad-max-poster.jpg",
        imagenAlt: "Imagen de poster de Mad Max."
    }

]

// Crea plantilla para contenedores de productos
const crearProdContainer = (id, titulo, precio, imgSrc, imgAlt) => {

    const plantillaProd = `<div class="producto-card producto-${id}">
                <a class="ancla-img" href="#">
                    <img src="${imgSrc}" alt="${imgAlt}">
                </a>
                <div class="prod-titulo">
                    <a class="ancla-titulo-prod" href="#">${titulo}</a>
                </div>
                <p class="precio-prod">$${precio}</p>

                <div class="btn-container">
                    <button data-id="${id}">Añadir</button>
                </div>
            </div>`

    return plantillaProd
}

const prodContainer = document.querySelector(".productos-container");

peliculas.forEach(
    (peli, i) => {
        const producto = crearProdContainer(i + 1, peli.titulo, peli.precio, peli.imagenSrc, peli.imagenAlt);

        prodContainer.insertAdjacentHTML("beforeend", producto);
    }
);

// Se establece la pagina del detalle producto para la primera pelicula
// del listado.
const anclasDetalleProd = document.querySelectorAll(".producto-1 a")

anclasDetalleProd.forEach(
    (ancla) => {
        ancla.href = "./detalle_producto.html";
    }
);

/*
============================
    Poblado localStorage
============================
*/

// Funcion para agregar al localStorage
const agregarAlCarrito = (pelicula) => {
    let carritoProductos = JSON.parse(localStorage.getItem("carritoProductos")); 

    // Si el carrito no existe, el localStorage devuelve 'null'
    // De ser el caso, se inicializa como un array.
    if(carritoProductos === null) {
        carritoProductos = [];
    }

    // Se evalua si uno de los elementos (pelicula)
    // ya esta (o no) en el carrito para evitar duplicados.
    const yaSeAgrego = carritoProductos.some((peli) => peli.titulo === pelicula.titulo) // Si pelicula existe, devuelve 'true'

    if(yaSeAgrego) {
        alert(`La película "${pelicula.titulo}" ya está en el carrito.`);
        return;
    }

    carritoProductos.push(pelicula);

    localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos));
}

// Funcion para actualizar carrito del navbar
const actualizarCarritoNavbar = () => {
    const cantPedido = document.querySelector(".cant-pedido");

    let carritoProductos = JSON.parse(localStorage.getItem("carritoProductos"));

    if(carritoProductos === null) {
        carritoProductos = [];
    }
    
    cantPedido.textContent = `${carritoProductos.length}`;
}

actualizarCarritoNavbar();


// Botones para agregar productos al localStorage (y al carrito)
const btnsAgregar = document.querySelectorAll(".btn-container button");

btnsAgregar.forEach(
    (btn) => {
        btn.addEventListener(
            "click",
            (evento) => {
                // Es el 'id' - 1, porque los arrays son zero-index
                const idBtn = parseInt(evento.target.getAttribute("data-id")) - 1;

                // Se busca la pelicula seleccionada con el id del boton
                const peliculaAgregada = peliculas[idBtn];

                // Se agrega al localStorage del carrito de compras.
                agregarAlCarrito(peliculaAgregada);

                // Se actualiza carrito del navbar
                actualizarCarritoNavbar();
            }
        );
    }
);

//localStorage.removeItem("carritoProductos");
//console.log(localStorage);


