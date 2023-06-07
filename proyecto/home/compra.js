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

  calcularTotal(producto.precio * productoCarrito.cantidad);
  // Añade la tarjeta al contenedor.
  cardContainer.appendChild(cardElement);
}

function createCardHTML(producto, cantidad) {
  return `<div class="card h-100">
  <div class="row g-0">
    <div class="col-md-2">
      <img
        src="${producto.imagenes[0]}"
        class="card-img-top img-thumbnail"
        alt="${producto.nombre}"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-price" id="precio_total">Precio total:${
          producto.precio * cantidad
        }$</p>
        <h5>Cantidad: ${cantidad}</h5>
      </div>
    </div>
  </div>
  </div>`;
}
function calcularTotal(precio) {
  let precioTotalElement = document.getElementById("precio_total_compra");

  precioTotalValue += precio;

  console.log(precioTotalValue);
  precioTotalElement.textContent =
    "Total :" + precioTotalValue.toLocaleString() + "$";
}

document
  .getElementById("button_confirmar_compra")
  .addEventListener("click", realizarPago);

async function realizarPago(event) {
  event.preventDefault(); // Aseguramos que el formulario no se envíe automáticamente.
  const formPago = document.getElementById("form_pago");
  var datos = new FormData(formPago);
  var user = service.checkUser();
  var pagoInfo = Object.fromEntries(datos);
  pagoInfo.carritoDeCompra = carrito;
  pagoInfo.precioTotal = precioTotalValue;
  pagoInfo.userId = user.id;
  pagoInfo.fechaDeCompra = jsonService.fechaActual();
  pagoInfo.estadoDeCompra = "En proceso";
  jsonService.setPostCompra(pagoInfo);
  service.vaciarCarrito();
  document.location.href =
    "http://127.0.0.1:5500/proyecto/home/historialcompras.html";
}
