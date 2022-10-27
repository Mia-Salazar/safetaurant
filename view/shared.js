document.getElementById("toggle").addEventListener("click", toggleMenu, false);
const menu = document.getElementById("nav");
const toggle = document.getElementById("toggle");
let menuToggle = false;

//Funcionalidad para abrir y cerrar el hamburguer menú
function toggleMenu() {
  if(!menuToggle) {
    menu.classList.add("open");
    toggle.classList.add("open");
  } else {
    menu.classList.remove("open");
    toggle.classList.remove("open");
  }
  menuToggle = !menuToggle;
}

//Funcionalidad para comprobar si la contraseña es correcta
function hasCorrectPassword(value){
  const regex = /[A-Za-z\d]{8,}/g;
  if(!value.match(regex)) {
    return false;
  }
  return true;
}