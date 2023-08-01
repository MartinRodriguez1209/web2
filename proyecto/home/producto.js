const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get("id");
cargarProducto(idProducto);
import * as service from "../utils/service.js";
import * as localeService from "../utils/locale-storage.js";
async function cargarProducto(idProducto) {
  try {
    var producto = await service.getPostProducto(idProducto);

    var mainImg = document.getElementById("main_img");
    var nombreProducto = document.getElementById("nombre_producto");
    var precioProducto = document.getElementById("precio_producto");
    var cuotasProducto = document.getElementById("cuotas_producto");
    var descripcionProducto = document.getElementById("descripcion_producto");

    precioProducto.textContent = producto.precio.toLocaleString() + "$";
    nombreProducto.textContent = producto.nombre;
    mainImg.src = producto.imagenes[0];
    cuotasProducto.textContent =
      "En 12 x " + Math.floor(producto.precio / 12).toLocaleString();
    descripcionProducto.textContent = producto.descripcion;
    listaEspecificaciones(producto);
    cargarImagenes(producto);
    setClasificacion(producto.clasificacion);
    cargarBreadcrumb(producto);
    document
      .getElementById("imagenes_contenedor")
      .addEventListener("click", function (event) {
        var target = event.target;
        if (target.tagName === "IMG") {
          mainImg.src = target.src;
          console.log("Imagen clickeada: " + target.src);
        }
      });
  } catch (error) {}
}

async function cargarBreadcrumb(producto) {
  var categorias = await service.getPostCategorias();
  var marcas = await service.getPostMarcas();
  var categoria = categorias.find((c) => c.id === parseInt(producto.tipoid));
  if (categoria) {
    var breadCrumbCategoria = document.getElementById("breadcrumb_tipo");
    breadCrumbCategoria.textContent = categoria.nombre;
  }
  var marca = marcas.find((c) => c.id === parseInt(producto.marcaid));
  if (marca) {
    var breadCrumbMarca = document.getElementById("breadcrumb_marca");
    breadCrumbMarca.textContent = marca.nombre;
  }
}

function listaEspecificaciones(producto) {
  var lista = document.getElementById("lista_caracteristicas");

  var caracteristicas = producto.caracteristicas;

  for (var i = 0; i < caracteristicas.length; i++) {
    var nuevaFila = document.createElement("li");
    nuevaFila.textContent = "- " + caracteristicas[i];
    lista.appendChild(nuevaFila);
  }
}

function cargarImagenes(producto) {
  var contenedor = document.getElementById("imagenes_contenedor");
  var imagenes = producto.imagenes;

  for (let index = 0; index < imagenes.length; index++) {
    let nuevaImagen = document.createElement("img");
    nuevaImagen.src = imagenes[index];
    nuevaImagen.classList.add(
      "d-block",
      "img-thumbnail",
      "mb-3",
      "hoverable",
      "cursor-pointer"
    );
    nuevaImagen.alt = "Imagen";

    contenedor.appendChild(nuevaImagen);
  }
}

function setClasificacion(clasificacion) {
  var contClasificacion = document.getElementById("cont_clasificacion");
  var html = "";

  for (var i = 1; i <= 5; i++) {
    if (i <= clasificacion) {
      html += '<span class="fa fa-star"></span>';
    } else {
      html += '<span class="fa fa-star-o"></span>';
    }
  }

  contClasificacion.innerHTML = html;
}

document
  .getElementById("button_agregar_carrito")
  .addEventListener("click", function () {
    localeService.agregarCarrito(parseInt(idProducto), 1);
    console.log("se agrego al carrito");
    console.log(localeService.getCarrito());
  });
document
  .getElementById("button_comprar_producto")
  .addEventListener("click", function () {
    localeService.agregarCarrito(parseInt(idProducto), 1);
    console.log("se agrego al carrito");
    console.log(localeService.getCarrito());
  });
