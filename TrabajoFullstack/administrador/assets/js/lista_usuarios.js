
// Eliminar usuario de tabla.
const filas = document.querySelectorAll("tbody tr");
const btnsEliminar = document.querySelectorAll("button.eliminar");

for(let i = 0; i < filas.length; i++) {
    btnsEliminar[i].addEventListener(
        "click",
        () => {
            filas[i].style.display = "none";
        }
    );
}

