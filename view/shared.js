const menu = document.getElementById("nav");
const toggle = document.getElementById("toggle");
const navList = document.querySelectorAll(".nav-link-optional");

const dropdown = document.getElementById("account-dropdown-list");
const dropdownButton = document.getElementById("account-dropdown-button");

if(toggle) {
  toggle.addEventListener("click", toggleMenu, false);
  dropdownButton.addEventListener("click", dropdownToggle, false);
}

//Con esta función mostramos las opciones que puede usar el usuario del menú
if(navList) {
  function changeMenu(user) {
    navList.forEach((li)=> {
      if (li.classList.contains(user === "registered" ? "registered" : "no-registered")) {
        li.classList.remove("hidden");
      } else {
        li.classList.add("hidden");
      }
    });
  }
}

//Funcionalidad para abrir y cerrar el hamburguer menú
let isMenuOpen = false;
function toggleMenu() {
  if(!isMenuOpen) {
    menu.classList.add("open");
    toggle.classList.add("open");
  } else {
    menu.classList.remove("open");
    toggle.classList.remove("open");
  }
  isMenuOpen = !isMenuOpen;
}

//Funcionalidad para abrir y cerrar el dropdown
let isDropdownOpen = false;
function dropdownToggle() {
  if(!isDropdownOpen) {
    dropdown.classList.add("open");
    dropdownButton.setAttribute("aria-expanded", "true");
  } else {
    dropdown.classList.remove("open");
    dropdownButton.setAttribute("aria-expanded", "false");
  }
  isDropdownOpen = !isDropdownOpen;
}

//Funcionalidad para comprobar si la contraseña es correcta
function hasCorrectPassword(value){
  const regex = /[A-Za-z\d]{8,}/g;
  if(!value.match(regex)) {
    return false;
  }
  return true;
}