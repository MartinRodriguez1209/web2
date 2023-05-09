let botonLogin = document.getElementById("button_login");
const modal_login = document.getElementById("modal_login");
const overlay = document.getElementById("overlay_login");
let crearCuenta = document.getElementById("crear_cuenta_button");
const modal_registro = document.getElementById("modal_registro");

botonLogin.addEventListener("click", function () {
  modal_login.style.display = "block";
  overlay.style.display = "block";
});
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cerrarModal();
  }
});
overlay.addEventListener("click", function () {
  cerrarModal();
});
function cerrarModal() {
  modal_login.style.display = "none";
  modal_registro.style.display = "none";
  document.getElementById("overlay_login").style.display = "none";
}

crearCuenta.addEventListener("click", function () {
  modal_login.style.display = "none";
  modal_registro.style.display = "block";
});
