import * as service from "../utils/service.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const tipoId = urlParams.get("tipoid");
  const tipoFiltroMarca = urlParams.get("filtromarca");
  const cardsContainer = document.getElementById("cards_container");
  cargarProductos(tipoId, tipoFiltroMarca);
  cargarFiltroMarcas();

  async function cargarProductos(tipoId, tipoFiltroMarca) {
    let listaProductos;
    let cardsRowHTML = "";
    if (tipoFiltroMarca !== null) {
      listaProductos = await service.getPostListaProductosPorMarca(
        tipoId,
        tipoFiltroMarca
      );
      if (listaProductos.length === 0) {
        cardsContainer.innerHTML = `<h1>No hay productos disponibles de esta marca</h1>`;
        return;
      }
    } else {
      listaProductos = await service.getPostListaProductos(tipoId);
    }

    let cards = [];
    for (let product of listaProductos) {
      cards.push(createCardHTML(product));
    }

    for (let i = 0; i < cards.length; i += 2) {
      let rowContenido = cards.slice(i, i + 2).join("");
      cardsRowHTML += `<div class="row justify-content-center mt-4 mb-4">${rowContenido}</div>`;
    }

    cardsContainer.innerHTML = cardsRowHTML;
  }

  function createCardHTML(product) {
    return `
      <div class="col-md-6">
        <a href="/proyecto/home/producto.html?id=${product.id}" class="text-decoration-none text-dark">
          <div class="card h-100">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${product.imagenes[0]}" class="card-img-top img-thumbnail" alt="${product.nombre}" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${product.nombre}</h5>
                  <p class="card-price">Precio: ${product.precio}$</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  }
  async function cargarFiltroMarcas() {
    let marcas = await service.getPostMarcas();
    let filtro = document.getElementById("filtro1");
    console.log(marcas);
    marcas.forEach((marca) => {
      let listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = marca.nombre;
      listItem.addEventListener("click", () => {
        if (listItem.classList.contains("active")) {
          window.location.href = window.location.pathname + "?tipoid=" + tipoId;
        } else {
          listItem.classList.add("active");
          console.log("Clic en marca: " + marca.nombre);
          window.location.href =
            window.location.pathname +
            "?tipoid=" +
            tipoId +
            "&filtromarca=" +
            marca.id;
        }
      });
      if (marca.id == tipoFiltroMarca) {
        listItem.classList.add("active");
      }
      filtro.appendChild(listItem);
    });
  }
});
