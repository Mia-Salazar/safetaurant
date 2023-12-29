const menu = document.getElementById("nav");
const toggle = document.getElementById("toggle");
const navList = document.querySelectorAll("#nav li");

const dropdown = document.getElementById("account-dropdown-list");
const dropdownButton = document.getElementById("account-dropdown-button");

if (toggle) {
  toggle.addEventListener("click", toggleMenu, false);
}

if (dropdownButton) {
  dropdownButton.addEventListener("click", dropdownToggle, false);
}

//Con esta función mostramos las opciones que puede usar el usuario del menú
function changeMenuAccordingToUser(userType) {
  navList.forEach((li)=> {
    if (userType === "no-registered") {
      if (li.classList.contains( "registered")) {
        li.remove();
      }
    } else {
      if (li.classList.contains( "registered")) {
        li.classList.remove("hidden");
      }
      if (li.classList.contains( "no-registered")) {
        li.remove();
      }
    }
  });
}

//Funcionalidad para abrir y cerrar el hamburguer menú
let isMenuOpen = false;
function toggleMenu() {
  if (!isMenuOpen) {
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
  if (!isDropdownOpen) {
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
  if (!value.match(regex)) {
    return false;
  }
  return true;
}

// Avoid zoom on IOS devices
const checkDevice = () => {
  if(navigator.userAgent.indexOf('iPhone') > -1 ) {
    document.querySelector("[name=viewport]").setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1");
  }
}

checkDevice()