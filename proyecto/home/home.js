import * as service from "../utils/service.js";

const homeData = await service.getHomeInfo();
console.log(homeData);

cargarCarrusel();
cargarCarruselDestacados();

function cargarCarrusel() {
  var carrusel = document.getElementById("carrusel_principal");
  var carouselIndicators = document.getElementById("carrusel_indicadores");

  let carouselIndicatorsHTML = homeData[0].imagenesBanner
    .map((_, index) => {
      return `
        <li data-bs-target="#myCarousel" data-bs-slide-to="${index}" class="${
        index === 0 ? "active" : ""
      }">
        </li>`;
    })
    .join("");

  carouselIndicators.innerHTML = carouselIndicatorsHTML;
  let carruselHTML = homeData[0].imagenesBanner
    .map((image, index) => {
      return `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${image}" class="d-block w-100" alt="Imagen ${
        index + 1
      }" />
          </div>`;
    })
    .join("");

  carrusel.innerHTML = carruselHTML;
}

async function cargarCarruselDestacados() {
  const idProductosDestacados = homeData[0].idProductosDestacados;
  const productos = await Promise.all(
    idProductosDestacados.map((id) => service.getPostProducto(id))
  );

  // agrupar los productos cada 3
  const gruposProductos = productos.reduce((grupos, producto, index) => {
    const grupoIndex = Math.floor(index / 3);

    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }

    grupos[grupoIndex].push(producto);

    return grupos;
  }, []);

  var carrusel = document.getElementById("carrusel_cont");

  let carruselHTML = gruposProductos
    .map((grupoProductos, index) => {
      const tarjetasHTML = grupoProductos
        .map((producto) => {
          return `
          <div class="col-sm-6 col-md-4">
            <a href="/proyecto/home/producto.html?id=${producto.id}" class="text-decoration-none text-dark">
              <div class="card hover" style="width: 18rem">
                <img src="${producto.imagenes[0]}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5>${producto.precio}$</h5>
                  <p class="card-text">${producto.nombre}</p>
                </div>
              </div>
            </a>
          </div>
        `;
        })
        .join("");

      return `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <div class="container">
          <div class="row">
            ${tarjetasHTML}
          </div>
        </div>
      </div>`;
    })
    .join("");

  carrusel.innerHTML = carruselHTML;
}
