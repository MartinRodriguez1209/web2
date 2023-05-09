// selecciono el boton y le agrego un listener
let boton = document.getElementById("boton_notas");
let boton_cargar_notas = document.getElementById("boton_cargar_notas");
let boton_cargar_materia = document.getElementById("boton_cargar_materia");

// busco el arreglo de notas guardades en el local storage
let notasGuardadas = JSON.parse(localStorage.getItem("notas"));
if (notasGuardadas) {
  cargarNotas(notasGuardadas);
}

// funcion que carga las notas que estan previamente en el local storage
function cargarNotas(notasGuardadas) {
  let tabla = document.getElementById("tabla_notas");

  for (let nota of notasGuardadas) {
    // creo la fila
    let nueva_fila = tabla.insertRow();

    // creo las 5 celdas de datos
    let celda1 = nueva_fila.insertCell();
    let celda2 = nueva_fila.insertCell();
    let celda3 = nueva_fila.insertCell();
    let celda4 = nueva_fila.insertCell();
    let celda5 = nueva_fila.insertCell();

    // le asigno el contenido a cada celda
    celda1.textContent = nota.apellido;
    celda2.textContent = nota.dni;
    celda3.textContent = nota.primera_nota;
    celda4.textContent = nota.segunda_nota;
    celda5.textContent = nota.promedio;
  }
}

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

  // creo un objeto que tiene la nota para guardarlo en el local storage
  let nuevaNota = {
    apellido: apellido,
    dni: dni,
    primera_nota: primera_nota,
    segunda_nota: segunda_nota,
    promedio: (primera_nota + segunda_nota) / 2,
  };
  let notasStorage = JSON.parse(localStorage.getItem("notas"));

  // si el array no existe, crear uno vacío
  if (notasStorage === null) {
    notasStorage = [];
  }

  // agregar la nueva nota al array
  notasStorage.push(nuevaNota);

  // guardar el array en el local storage
  localStorage.setItem("notas", JSON.stringify(notasStorage));

  // con esto vacio el formulario despues de apretar el boton
  document.getElementById("apellido").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
});

boton_cargar_notas.addEventListener("click", function () {
  if (isActive(boton_cargar_notas)) {
    console.log("Esta activo");
  } else {
    boton_cargar_notas.classList.add("active");
    boton_cargar_materia.classList.remove("active");
    window.location.href = "guarani.html";
  }
});

boton_cargar_materia.addEventListener("click", function () {
  if (isActive(boton_cargar_materia)) {
    console.log("Esta activo");
  } else {
    console.log("no esta activo");
    boton_cargar_materia.classList.add("active");
    boton_cargar_notas.classList.remove("active");
    window.location.href = "guarani_materias.html";
  }
});

function isActive(element) {
  return element.classList.contains("active");
}
