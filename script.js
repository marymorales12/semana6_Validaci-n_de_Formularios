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

// Selección de elementos
const form = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const edad = document.getElementById("edad");
const btnEnviar = document.getElementById("btnEnviar");

// Mensajes de error
const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmPassword = document.getElementById("errorConfirmPassword");
const errorEdad = document.getElementById("errorEdad");

// Expresiones regulares para email y contraseña
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Validaciones dinámicas en tiempo real
form.addEventListener("input", () => {
  let valido = true;

  // Validación nombre (mínimo 3 caracteres)
  if (nombre.value.length < 3) {
    errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
    valido = false;
  } else {
    errorNombre.textContent = "";
  }

  // Validación email con regex (el navegador también valida con HTML5)
  if (!regexEmail.test(email.value)) {
    errorEmail.textContent = "Correo no válido.";
    valido = false;
  } else {
    errorEmail.textContent = "";
  }

  // Validación contraseña con regex
  if (!regexPassword.test(password.value)) {
    errorPassword.textContent = "Debe tener mínimo 8 caracteres, un número y un carácter especial.";
    valido = false;
  } else {
    errorPassword.textContent = ""; // Oculta mensaje cuando es válido
  }

  // Confirmar contraseña que coincida
  if (password.value !== confirmPassword.value) {
    errorConfirmPassword.textContent = "Las contraseñas no coinciden.";
    valido = false;
  } else {
    errorConfirmPassword.textContent = "";
  }

  // Validación edad (mayor o igual a 18)
  if (isNaN(edad.value) || parseInt(edad.value) < 18) {
    errorEdad.textContent = "Debes ser mayor de 18 años.";
    valido = false;
  } else {
    errorEdad.textContent = "";
  }

  // Habilitar o deshabilitar botón de enviar según validación
  btnEnviar.disabled = !valido;
});

// Al enviar el formulario
form.addEventListener("submit", (e) => {
  // El navegador ya hace la validación nativa, así que solo prevenimos para mostrar alerta personalizada
  e.preventDefault();

  if (form.checkValidity()) {
    alert("Formulario enviado correctamente. ¡Gracias por registrarte en EcoVogue!");
    form.reset();
    btnEnviar.disabled = true;

    // Restaurar mensaje de contraseña tras reset
    errorPassword.textContent = "Debe tener mínimo 8 caracteres, un número y un carácter especial.";
  } else {
    // Si por alguna razón el formulario no es válido, dejar que el navegador muestre los errores nativos
    form.reportValidity();
  }
});
