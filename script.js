const urlInput = document.getElementById("urlInput");
const agregarBtn = document.getElementById("agregarBtn");
const eliminarBtn = document.getElementById("eliminarBtn");
const galeria = document.getElementById("galeria");

let imagenSeleccionada = null;

// Función para agregar una nueva imagen a la galería
function agregarImagen() {
  const url = urlInput.value.trim();
  if (url === "") {
    alert("Por favor, ingresa una URL válida.");
    return;
  }

  const nuevaImg = document.createElement("img");
  nuevaImg.src = url;

  nuevaImg.addEventListener("click", () => seleccionarImagen(nuevaImg));

  galeria.appendChild(nuevaImg);
  urlInput.value = "";
}

// Función para seleccionar una imagen (resalta una sola)
function seleccionarImagen(img) {
  const todasLasImagenes = galeria.querySelectorAll("img");
  todasLasImagenes.forEach(i => i.classList.remove("seleccionada"));
  img.classList.add("seleccionada");
  imagenSeleccionada = img;
}

// Función para eliminar la imagen seleccionada
function eliminarImagen() {
  if (imagenSeleccionada) {
    galeria.removeChild(imagenSeleccionada);
    imagenSeleccionada = null;
  } else {
    alert("Selecciona una imagen para eliminar.");
  }
}

// Eventos
agregarBtn.addEventListener("click", agregarImagen);
eliminarBtn.addEventListener("click", eliminarImagen);

// Atajo de teclado: Enter agrega imagen
urlInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    agregarImagen();
  }
});
