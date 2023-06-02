import * as service from "../utils/service.js";

document
  .getElementById("products-tab")
  .addEventListener("click", async function () {
    document.getElementById("products-control").style.display = "block";
    document.getElementById("sales-control").style.display = "none";
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
      priceCell.textContent = producto.precio;

      var actionCell = row.insertCell();
      var button = document.createElement("button");
      button.textContent = "Editar";
      button.className = "btn btn-primary";
      button.dataset.bsToggle = "modal";
      button.dataset.bsTarget = "#editProductModal";
      button.dataset.productoId = producto.id;
      button.addEventListener("click", function (event) {
        openEditProductModal(producto);
      });
      actionCell.appendChild(button);
    });
  }
}
document.getElementById("sales-tab").addEventListener("click", function () {
  document.getElementById("products-control").style.display = "none";
  document.getElementById("sales-control").style.display = "block";
});
function openEditProductModal(producto) {
  //aca se tiene que poder cambiar la descripcion, las caracteristicas y las imagenes y el precio

  document.getElementById("editProductId").value = producto.id;
  document.getElementById("editProductName").value = producto.nombre;
  document.getElementById("editProductPrice").value = producto.precio;
  // Llena los demás campos aquí.

  // Muestra el modal.
  var myModal = new bootstrap.Modal(
    document.getElementById("editProductModal"),
    {}
  );
  myModal.show();
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
