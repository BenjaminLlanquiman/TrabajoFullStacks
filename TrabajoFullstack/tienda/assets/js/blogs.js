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

