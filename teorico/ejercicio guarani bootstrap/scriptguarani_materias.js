// selecciono el boton y le agrego un listener
let boton_materia = document.getElementById("boton_materia");
let boton_cargar_notas = document.getElementById("boton_cargar_notas");
let boton_cargar_materia = document.getElementById("boton_cargar_materia");

// busco el arreglo de notas guardades en el local storage
let materiasGuardadas = JSON.parse(localStorage.getItem("materias"));
if (materiasGuardadas) {
  cargarMaterias(materiasGuardadas);
}

// funcion que carga las notas que estan previamente en el local storage
function cargarMaterias(materiasGuardadas) {
  let tabla = document.getElementById("tabla_materias");

  for (let materia of materiasGuardadas) {
    // creo la fila
    let nueva_fila = tabla.insertRow();

    // creo las 4 celdas de datos
    let celda1 = nueva_fila.insertCell();
    let celda2 = nueva_fila.insertCell();
    let celda3 = nueva_fila.insertCell();
    let celda4 = nueva_fila.insertCell();

    // le asigno el contenido a cada celda
    celda1.textContent = materia.materia;
    celda2.textContent = materia.dia;
    celda3.textContent = materia.hora_inicio;
    celda4.textContent = materia.hora_final;
  }
}

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

boton_materia.addEventListener("click", function () {
  // busco los valores del formulario
  let materia = document.getElementById("materia").value;
  let dia = document.getElementById("dia").value;
  let hora_inicio = document.getElementById("hora_inicio").value;
  let hora_final = document.getElementById("hora_final").value;

  // busca la tabla
  let tabla = document.getElementById("tabla_materias");

  // creo una fila nueva
  let nueva_fila = tabla.insertRow();

  // creo las 4 celdas de datos
  let celda1 = nueva_fila.insertCell();
  let celda2 = nueva_fila.insertCell();
  let celda3 = nueva_fila.insertCell();
  let celda4 = nueva_fila.insertCell();

  // le asigno el contenido a cada celda
  celda1.textContent = materia;
  celda2.textContent = dia;
  celda3.textContent = hora_inicio;
  celda4.textContent = hora_final;

  // creo un objeto que tiene la materia para guardarlo en el local storage
  let nuevaMateria = {
    materia: materia,
    dia: dia,
    hora_inicio: hora_inicio,
    hora_final: hora_final,
  };
  let materiaStorage = JSON.parse(localStorage.getItem("materias"));

  // si el array no existe, crear uno vacío
  if (materiaStorage === null) {
    materiaStorage = [];
  }

  // agregar la nueva nota al array
  materiaStorage.push(nuevaMateria);

  // guardar el array en el local storage
  localStorage.setItem("materias", JSON.stringify(materiaStorage));
});
