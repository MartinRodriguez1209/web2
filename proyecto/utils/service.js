const URL = "http://localhost:3000/";

export async function getPost(destino) {
  var r = await fetch(URL + destino);
  var resultado = await r.json();
  return resultado;
}
export async function getPostProducto(idProducto) {
  try {
    var r = await fetch(URL + "productos/" + idProducto);
    if (!r.ok) {
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    var producto = await r.json();
    return producto;
  } catch (error) {
    showToast("Error al obtener producto: " + error.message);
    throw error;
  }
}

export async function getPostMarcas() {
  try {
    var r = await fetch(URL + "marcas/");
    if (!r.ok) {
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    var marcas = await r.json();
    return marcas;
  } catch (error) {
    showToast("Error al obtener producto: " + error.message);
    throw error;
  }
}

export async function getPostCategorias() {
  try {
    var r = await fetch(URL + "categorias");
    if (!r.ok) {
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    var resultado = await r.json();
    return resultado;
  } catch (error) {
    showToast("Error al obtener producto: " + error.message);
    throw error;
  }
}

export async function getUser(mail, contrasenia) {
  try {
    var r = await fetch(
      URL + "usuarios?mail=" + mail + "&contrasenia=" + contrasenia
    );
    if (!r.ok) {
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    var usuario = await r.json();
    usuario = usuario[0];
    return usuario;
  } catch (error) {
    showToast("Error al obtener producto: " + error.message);
    throw error;
  }
}

export async function createUser(email, password, nombre) {
  var user = { email: email, password: password, nombre: nombre };

  const response = await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return user;
  }

  throw new Error(`HTTP error! status: ${response.status}`);
}

export async function getPostListaProductos(tipoId) {
  try {
    var r = await fetch(URL + "productos?tipoid=" + tipoId);
    if (!r.ok) {
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    var resultado = await r.json();
    return resultado;
  } catch (error) {
    showToast("Error al obtener producto: " + error.message);
    throw error;
  }
}

export function showToast(message) {
  // Crea el HTML del toast
  let toastHTML = `
      <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

  document.body.insertAdjacentHTML("beforeend", toastHTML);

  let toastElement = document.querySelector(".toast");

  var toast = new bootstrap.Toast(toastElement);
  toast.show();

  setTimeout(function () {
    document.body.removeChild(toastElement);
  }, 3000);
}

//funcion para actualizar uno de los datos del producto
export const updateProductoData = async (producto) => {
  const response = await fetch(`${URL}productos/${producto.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!response.ok) throw new Error(`HTTP error ${response.status}`);

  return response.json();
};

export async function setPostCompra(compra) {
  try {
    const response = await fetch(URL + "compras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(compra),
    });

    // Comprueba si la respuesta es correcta
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Procesa y devuelve la respuesta
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error al guardar la compra: ${err}`);
  }
}
