// selecciono el boton y le agrego un listener
let boton = document.getElementById("boton_notas");
boton.addEventListener("click", function () {
  // obtengo los valores de los campos
  let apellido = document.getElementById("apellido").value;
  let dni = document.getElementById("dni").value;
  let primera_nota = parseFloat(document.getElementById("nota1").value);
  let segunda_nota = parseFloat(document.getElementById("nota2").value);

  // selecciona la tabla para poder agregar una fila
  let tabla = document.getElementById("tabla_notas");

  // creo la fila
  let nueva_fila = tabla.insertRow();

  // creo las 5 celdas de datos
  let celda1 = nueva_fila.insertCell();
  let celda2 = nueva_fila.insertCell();
  let celda3 = nueva_fila.insertCell();
  let celda4 = nueva_fila.insertCell();
  let celda5 = nueva_fila.insertCell();

  // le asigno el contenido a cada celda
  celda1.textContent = apellido;
  celda2.textContent = dni;
  celda3.textContent = primera_nota;
  celda4.textContent = segunda_nota;
  celda5.textContent = (primera_nota + segunda_nota) / 2;

  // con esto vacio el formulario despues de apretar el boton
  document.getElementById("apellido").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
});
