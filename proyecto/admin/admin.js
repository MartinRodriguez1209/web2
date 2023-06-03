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
      button.type = "button";
      button.dataset.productoId = producto.id;
      button.addEventListener("click", function (event) {
        window.location.href = `http://127.0.0.1:5500/proyecto/admin/productedit.html?id=${event.target.dataset.productoId}`;
      });
      actionCell.appendChild(button);
    });
  }
}
document.getElementById("sales-tab").addEventListener("click", function () {
  document.getElementById("products-control").style.display = "none";
  document.getElementById("sales-control").style.display = "block";
});

// Escucha el evento 'hidden.bs.modal' para eliminar la capa de fondo

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

async function actualizarCampo(categoria, nuevoValor, id) {
  console.log(categoria + "  " + nuevoValor + "  " + id);
  /* service.updateProductoData(categoria, nuevoValor, id); */
}
