window.addEventListener("load", main);

async function main() {
  try {
    await loadHeader();
    initHomeScript(); // llamar a la función de script-home.js
  } catch (error) {
    console.log("Error al cargar la cabecera:", error);
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
