import * as jsonService from "../utils/service.js";
import * as localeService from "../utils/locale-storage.js";

cargarCompras();
async function cargarCompras() {
  const historial = await jsonService.getHistorialCompras(
    localeService.checkUser().id
  );

  for (let compra of historial) {
    let cardHTML = await createCardHTML(compra);

    let contenedorCompras = document.getElementById("contenedor_compras");
    contenedorCompras.innerHTML += cardHTML;
  }
}

async function createCardHTML(compra) {
  let productosHTML = "";
  for (let producto of compra.carritoDeCompra) {
    let productoDetalles = await jsonService.getPostProducto(
      producto.productoId
    );

    // crea la cadena html para cada producto
    productosHTML += `<h5 class="card-title">${productoDetalles.nombre} x ${
      producto.cantidad
    } : ${productoDetalles.precio * producto.cantidad}$</h5>`;
  }

  // devuelve la cadena completa de la tarjeta
  return `
        <div class="row">
          <div class="card h-50">
            <div class="row">
              <div class="col">
                <div class="card-body">
                  <h5>Compra de la fecha: ${compra.fechaDeCompra}</h5>
                  ${productosHTML}
                </div>
              </div>
              <div class="col">
                <div class="card-body">
                  <p class="card-text">Estado de la compra: ${compra.estadoDeCompra}</p>
                  <p class="card-price">Precio total: ${compra.precioTotal}$</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
}
