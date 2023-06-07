import * as service from "../utils/locale-storage.js";
import * as jsonService from "../utils/service.js";
var carrito = service.getCarrito();
var precioTotalValue = 0;

for (let productoCarrito of carrito) {
  addCardHTML(productoCarrito);
}
async function addCardHTML(productoCarrito) {
  var cardContainer = document.getElementById("carrito_card_cont");

  var producto = await jsonService.getPostProducto(productoCarrito.productoId);

  let cardHTML = createCardHTML(producto, productoCarrito.cantidad);

  let cardElement = document.createElement("div");
  cardElement.innerHTML = cardHTML;

  // busca el botón dentro de la tarjeta y agrega un evento de click.
  let button = cardElement.querySelector(".remove-button");
  button.addEventListener("click", () => {
    removerDelCarrito(producto.id);
  });
  calcularTotal(producto.precio * productoCarrito.cantidad);
  // añade la tarjeta al contenedor.
  cardContainer.appendChild(cardElement);
}

function createCardHTML(producto, cantidad) {
  return `<div class="card h-100">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src="${producto.imagenes[0]}"
          class="card-img-top img-thumbnail"
          alt="${producto.nombre}"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-price">Precio: ${producto.precio}$</p>
          <button class="btn btnvioleta second_button w-25 mb-4 remove-button">Remover del carrito</button>
          <h5>Cantidad total : ${cantidad}</h5>
        </div>
      </div>
    </div>
    </div>`;
}

function calcularTotal(precio) {
  let precioTotalElement = document.getElementById("precio_total");

  precioTotalValue += precio;

  console.log(precioTotalValue);
  precioTotalElement.textContent =
    "Total :" + precioTotalValue.toLocaleString() + "$";
}

async function actualizarCarrito() {
  let carrito = service.getCarrito();
  let cardContainer = document.getElementById("carrito_card_cont");
  // elimina todas las tarjetas existentes.
  precioTotalValue = 0;
  cardContainer.innerHTML = "";
  // añade las tarjetas del carrito actualizado.
  for (let productoCarrito of carrito) {
    await addCardHTML(productoCarrito);
  }
}

function removerDelCarrito(id) {
  service.borrarProductoCarrito(id);
  actualizarCarrito();
}
