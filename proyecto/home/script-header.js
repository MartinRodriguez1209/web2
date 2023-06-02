import * as service from "../utils/service.js";
import * as localeService from "../utils/locale-storage.js";
window.addEventListener("load", main);

async function main() {
  try {
    await loadHeader();
    initHomeScript();
    checkUser();
  } catch (error) {
    console.log(error);
  }
}

function checkUser() {
  try {
    var usuario = localeService.checkUser();
    console.log(usuario);
    document
      .getElementById("login_modal_button")
      .classList.add("visually-hidden");
    document.getElementById("button_user").classList.remove("visually-hidden");
    document.getElementById("button_user").textContent = usuario.nombre;
    document
      .getElementById("button_cerrar_sesion")
      .addEventListener("click", function () {
        localeService.logoutUser();
        document
          .getElementById("login_modal_button")
          .classList.remove("visually-hidden");
        document.getElementById("button_user").classList.add("visually-hidden");
      });
  } catch (error) {
    console.log(error);
  }
}

async function loadHeader() {
  // Cargar la cabecera
  const response = await fetch("header.html");
  const data = await response.text();

  // Actualizar el DOM y esperar a que se complete
  document.body.insertAdjacentHTML("afterbegin", data);
  await new Promise(requestAnimationFrame);
}
function initHomeScript() {
  var botonLogin = document.getElementById("button_login");
  const loginForm = document.getElementById("login_form");
  botonLogin.addEventListener("click", async function () {
    if (loginForm.checkValidity()) {
      try {
        let user = await service.getUser(
          loginForm.elements.input_mail.value,
          loginForm.elements.input_password.value
        );
        localeService.loginUser(user);
        checkUser();
        var modal = new bootstrap.Modal(document.getElementById("loginModal"));
        modal.hide();
        console.log(user.nombre);
      } catch (error) {}
    } else {
    }
  });
  document
    .getElementById("button_crear_cuenta")
    .addEventListener("click", function () {
      // cambia titulo modal
      document.getElementById("loginModalLabel").textContent = "Crear cuenta";

      // cambia el form para registrar el usuario
      let form = document.getElementById("login_form");
      form.innerHTML = `
        <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="input_mail" placeholder="Ingrese su correo electrónico" required/>
        </div>
        <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          class="form-control"
          id="input_nombre"
          placeholder="Ingrese su nombre"
          required
        />
      </div>
        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="input_password" placeholder="Ingrese su contraseña" required/>
        </div>
        <div class="mb-3">
            <label for="passwordConfirm" class="form-label">Confirme su contraseña</label>
            <input type="password" class="form-control" id="input_password_confirm" placeholder="Ingrese su contraseña nuevamente" required/>
        </div>
        <button type="button" id="button_register" class="btn btn-primary">
            Registrar
        </button>
    `;

      // boton de registrar
      document
        .getElementById("button_register")
        .addEventListener("click", async function () {
          var mail = document.getElementById("input_mail").value;
          var contrasenia = document.getElementById("input_password").value;
          var constraseniaConfirm = document.getElementById(
            "input_password_confirm"
          ).value;
          var nombre = document.getElementById("input_nombre").value;
          if (contrasenia === constraseniaConfirm) {
            var user = await service.createUser(mail, contrasenia, nombre);
            console.log(user);
            localeService.loginUser(user);
            checkUser();
            service.showToast("Se creo el usuario");
          }
        });
    });
}
