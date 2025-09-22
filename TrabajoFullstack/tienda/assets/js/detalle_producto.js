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

// Se obtiene localStorage.
//let peliculasCarrito = JSON.parse(localStorage.getItem("carritoProductos"));
//
//if(peliculasCarrito === null) {
//    peliculasCarrito = []
//}


// Funcion para agregar al localStorage
const agregarAlCarrito = (pelicula) => {
    let peliculasCarrito = JSON.parse(localStorage.getItem("carritoProductos")); 

    // Si el carrito no existe, el localStorage devuelve 'null'
    // De ser el caso, se inicializa como un array.
    if(peliculasCarrito === null) {
        peliculasCarrito = [];
    }

    // Se evalua si uno de los elementos (pelicula)
    // ya esta (o no) en el carrito para evitar duplicados.
    const yaSeAgrego = peliculasCarrito.some((peli) => peli.titulo === pelicula.titulo) // Si pelicula existe, devuelve 'true'

    if(yaSeAgrego) {
        alert(`La película "${pelicula.titulo}" ya está en el carrito.`);
        return;
    }

    peliculasCarrito.push(pelicula);

    localStorage.setItem("carritoProductos", JSON.stringify(peliculasCarrito));
}

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



// Botones para agregar productos al localStorage (y al carrito)
const btnAgregar = document.querySelector(".btn-agregar-container button");

btnAgregar.addEventListener(
  "click",
  () => {
    const peliculaAgregada = peliculas.find((peli) => peli.titulo === "Se7en: Los siete pecados capitales");

    agregarAlCarrito(peliculaAgregada);

    actualizarCarritoNavbar();

    console.log(localStorage);
  }
);


