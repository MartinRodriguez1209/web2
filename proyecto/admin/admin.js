import * as service from "../utils/service.js";

const tbody = document.querySelector("#sales-control tbody");
const ventas = await service.getHistorialComprasCompleto();
console.log(ventas);

const listadoProductos = service.getPostProductoCompleto();

nuevoProducto();

async function generarFilasVentas(ventas) {
  let filas = "";
  for (let venta of ventas) {
    var usuarioNombre = await service.getUsreById(parseInt(venta.userId));
    usuarioNombre = usuarioNombre[0].nombre;
    filas += `
        <tr>
        <tr>
        <td>${venta.id}</td>
        <td>${usuarioNombre}</td>
        <td><button class="btn btn-primary"  data-id-venta="${venta.id}">Ver Detalle</button></td>
        <td>${venta.precioTotal}</td>
        <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-id-venta="${venta.id}" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                ${venta.estadoDeCompra}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#">En proceso</a></li>
                <li><a class="dropdown-item" href="#">Enviado</a></li>
                <li><a class="dropdown-item" href="#">Entregado</a></li>
              </ul>
            </div>
        </td>
        </tr>`;
  }
  return filas;
}

tbody.innerHTML = await generarFilasVentas(ventas);
const botones = document.querySelectorAll(".btn.btn-primary");
for (let boton of botones) {
  boton.addEventListener("click", async function (event) {
    const idVenta = parseInt(event.target.getAttribute("data-id-venta"));
    const venta = ventas.find((venta) => venta.id === idVenta);
    const detalleVenta = await generarDetalleVenta(venta);

    const modal = `
      <div class="modal" tabindex="-1" id="detalleModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detalle de la Venta</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModal()"></button>
            </div>
            <div class="modal-body">
              ${detalleVenta}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="cerrarModal()">Cerrar</button>
            </div>
          </div>
        </div>
      </div>`;
    document.getElementById("modalContainer").innerHTML = modal;
    var myModal = new bootstrap.Modal(document.getElementById("detalleModal"));
    myModal.show();
  });
}

let dropdownItems = document.querySelectorAll(".dropdown-item");

// actualizar el estado de la compra
dropdownItems.forEach((item) => {
  item.addEventListener("click", async function (event) {
    event.preventDefault();

    let selectedOption = event.target.textContent;
    let button = event.target.closest(".dropdown").querySelector("button");
    button.textContent = selectedOption;
    console.log(button.getAttribute("data-id-venta"));
    await service.updateEstadoCompra(
      button.getAttribute("data-id-venta"),
      selectedOption
    );
  });
});

async function generarDetalleVenta(venta) {
  let detalle = `Direccion de envio: ${venta.direccionEnvio}<br/>`;

  for (let producto of venta.carritoDeCompra) {
    let detalleProducto = await service.getPostProducto(producto.productoId);

    detalle += `Producto: ${detalleProducto.nombre}, Cantidad: ${producto.cantidad}<br>`;
  }
  return detalle;
}
document.getElementById("products-tab").addEventListener("click", function () {
  document.getElementById("products-control").style.display = "block";
  document.getElementById("new-product-control").style.display = "none";
  document.getElementById("sales-control").style.display = "none";
});

document
  .getElementById("new-product-tab")
  .addEventListener("click", function () {
    document.getElementById("new-product-control").style.display = "block";
    document.getElementById("products-control").style.display = "none";
    document.getElementById("sales-control").style.display = "none";
  });

document.getElementById("sales-tab").addEventListener("click", function () {
  document.getElementById("sales-control").style.display = "block";
  document.getElementById("new-product-control").style.display = "none";
  document.getElementById("products-control").style.display = "none";
});
setCategorias();

async function loadTabla(idCategoria) {
  {
    var productos = await service.getPostListaProductos(idCategoria);
    var tableBody = document.getElementById("products-body");

    // Vaciar la tabla antes de llenarla.
    tableBody.innerHTML = "";

    // Agregar cada producto a la tabla.
    productos.forEach(function (producto) {
      var row = tableBody.insertRow();

      var idCell = row.insertCell();
      idCell.textContent = producto.id;

      var nameCell = row.insertCell();
      nameCell.textContent = producto.nombre;
      var priceCell = row.insertCell();
      priceCell.textContent = producto.precio.toLocaleString();

      var actionCell = row.insertCell();
      var button = document.createElement("button");
      button.textContent = "Editar";
      button.className = "btn btn-primary";
      button.type = "button";
      button.dataset.productoId = producto.id;
      button.addEventListener("click", function (event) {
        window.location.href = `http://127.0.0.1:5500/proyecto/admin/productedit.html?id=${event.target.dataset.productoId}`;
      });
      actionCell.appendChild(button);
    });
  }
}

async function setCategorias() {
  var categorias = await service.getPostCategorias();
  var select = document.getElementById("categoryFilter");
  categorias.forEach(function (categoria) {
    var option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.nombre;
    select.appendChild(option);
  });

  select.addEventListener("change", function () {
    loadTabla(parseInt(select.value));
  });
}

async function nuevoProducto() {
  loadDropdowns();

  async function loadDropdowns() {
    const marcas = await service.getPostMarcas();
    const tipos = await service.getPostCategorias();

    const marcaDropdown = document.getElementById("marca_dropdownt");
    const tipoDropdown = document.getElementById("tipo_dropdownt");

    marcaDropdown.innerHTML = "";
    tipoDropdown.innerHTML = "";

    for (let marca of marcas) {
      let option = document.createElement("option");
      option.value = marca.id;
      option.text = marca.nombre;
      marcaDropdown.add(option);
    }

    for (let tipo of tipos) {
      let option = document.createElement("option");
      option.value = tipo.id;
      option.text = tipo.nombre;
      tipoDropdown.add(option);
    }
  }

  // Escuchar el evento submit del formulario
  document
    .getElementById("product_form")
    .addEventListener("submit", function (event) {
      // Prevenir el comportamiento por defecto del formulario
      event.preventDefault();

      // Leer los valores de los campos de entrada
      const clasificacion = document.getElementById("clasificacionInput").value;
      const nombre = document.getElementById("nombreInput").value;
      const marcaid = document.getElementById("marca_dropdownt").value;
      const tipoid = document.getElementById("tipo_dropdownt").value;
      const descripcion = document.getElementById("descripcionInput").value;
      const caracteristicas = document
        .getElementById("caracteristicasInput")
        .value.split("\n");
      const precio = document.getElementById("precioInput").value;
      const imagenes = document
        .getElementById("imagenesInput")
        .value.split("\n");

      // Crear el objeto producto
      const producto = {
        clasificacion,
        nombre,
        marcaid,
        tipoid,
        descripcion,
        caracteristicas,
        precio,
        imagenes,
      };

      service.postNuevoProducto(producto);
      console.log(producto);
      document.getElementById("product_form").reset();
    });
}
