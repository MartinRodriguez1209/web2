export function loginUser(user) {
  console.log("localestorage: " + user);

  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function checkUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) throw new Error("No user logged in.");
  return user;
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

export function agregarCarrito(productoId, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let itemExistente = carrito.find((item) => item.productoId === productoId);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ productoId, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function borrarProductoCarrito(productoId) {
  console.log(productoId);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  console.log(carrito);

  let itemExistente = carrito.find((item) => item.productoId === productoId);

  if (itemExistente) {
    itemExistente.cantidad -= 1;

    if (itemExistente.cantidad === 0) {
      carrito = carrito.filter((item) => item.productoId !== productoId);
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}
