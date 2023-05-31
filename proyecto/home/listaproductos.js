document.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const tipoId = urlParams.get("tipoid");
  const cardsContainer = document.getElementById("cards_container");
  cargarProductos(tipoId);

  async function cargarProductos(tipoId) {
    var r = await fetch("http://localhost:3000/productos?tipoid=" + tipoId);
    var listaProductos = await r.json();

    let cards = [];
    for (let product of listaProductos) {
      cards.push(createCardHTML(product));
    }

    let cardsRowHTML = "";
    for (let i = 0; i < cards.length; i += 2) {
      let rowContent = cards.slice(i, i + 2).join("");
      cardsRowHTML += `<div class="row justify-content-center mt-4 mb-4">${rowContent}</div>`;
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
});

document.addEventListener("click");
