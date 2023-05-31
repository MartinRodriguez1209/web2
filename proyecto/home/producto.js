const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get("id");
cargarProducto(idProducto);

async function cargarProducto(idProducto) {
  var r = await fetch("http://localhost:3000/productos/" + idProducto);
  var producto = await r.json();

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
}

async function cargarBreadcrumb(producto) {
  var r = await fetch("http://localhost:3000/categorias");
  var categorias = await r.json();
  var categoria = categorias.find((c) => c.id === producto.tipoid);
  if (categoria) {
    var breadCrumbCategoria = document.getElementById("breadcrumb_tipo");
    breadCrumbCategoria.textContent = categoria.nombre;
  }
  r = await fetch("http://localhost:3000/marcas");
  var marcas = await r.json();
  var marca = marcas.find((c) => c.id === producto.marcaid);
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
