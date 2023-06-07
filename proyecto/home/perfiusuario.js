import * as service from "../utils/locale-storage.js";
import * as jsonService from "../utils/service.js";

const usuario = service.checkUser();

cargarPerfil();

function cargarPerfil() {
  document.getElementById("nombre_usuario").innerText = usuario.nombre;
  document.getElementById("mail_usuario").innerText = usuario.mail;
}
