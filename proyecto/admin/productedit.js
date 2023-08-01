import * as service from "../utils/service.js";

const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get("id");
const marcas = await service.getPostMarcas();
const categoria = await service.getPostCategorias();

service
  .getPostProducto(idProducto)
  .then((producto) => {
    // Ahora que tenemos el producto, lo usamos para llenar los campos del formulario.
    document.getElementById("idInput").value = producto.id;
    document.getElementById("clasificacionInput").value =
      producto.clasificacion;
    document.getElementById("nombreInput").value = producto.nombre;
    document.getElementById("marcaIdInput").value = marcas.find(
      (c) => parseInt(c.id) === parseInt(producto.marcaid)
    ).nombre;
    document.getElementById("tipoIdInput").value = categoria.find(
      (c) => parseInt(c.id) === parseInt(producto.tipoid)
    ).nombre;
    document.getElementById("descripcionInput").value = producto.descripcion;

    // Las características son un array, así que las unimos en un solo string con un salto de línea entre cada una.
    document.getElementById("caracteristicasInput").value =
      producto.caracteristicas.join("\n");

    document.getElementById("precioInput").value = producto.precio;

    // Las imágenes también son un array, así que hacemos lo mismo que con las características.
    document.getElementById("imagenesInput").value =
      producto.imagenes.join("\n");
  })
  .catch((err) => {
    console.error("Ha habido un error al obtener el producto:", err);
  });

// boton para guardar cambios

document
  .getElementById("product_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const producto = {
      id: document.getElementById("idInput").value,
      clasificacion: document.getElementById("clasificacionInput").value,
      nombre: document.getElementById("nombreInput").value,
      marcaid: marcas.find(
        (m) => m.nombre === document.getElementById("marcaIdInput").value
      ).id,
      tipoid: categoria.find(
        (c) => c.nombre === document.getElementById("tipoIdInput").value
      ).id,
      descripcion: document.getElementById("descripcionInput").value,

      caracteristicas: document
        .getElementById("caracteristicasInput")
        .value.split("\n"),
      precio: document.getElementById("precioInput").value,
      imagenes: document.getElementById("imagenesInput").value.split("\n"),
    };
    service
      .updateProductoData(producto)
      .then(() => {
        // Creamos una alerta de Bootstrap.
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-success";
        alertDiv.textContent = "Producto actualizado con éxito!";

        // Agregamos la alerta al contenedor.
        const messageContainer = document.getElementById("alerta_exito");
        messageContainer.appendChild(alertDiv);
        // Después de un par de segundos, eliminamos la alerta.
        setTimeout(() => {
          messageContainer.removeChild(alertDiv);
        }, 2000);
      })
      .catch((err) => {
        console.error("Ha habido un error al actualizar el producto:", err);
      });
  });
