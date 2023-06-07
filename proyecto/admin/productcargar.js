import * as service from "../utils/service.js";

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
    const imagenes = document.getElementById("imagenesInput").value.split("\n");

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
  });
