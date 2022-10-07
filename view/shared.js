document.getElementById("toggle").addEventListener("click", toggleMenu, false);
const menu = document.getElementById("nav");
const toggle = document.getElementById("toggle");
let menuToggle = false;

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

const hasCorrectPassword = (value) => {
  const regex = /[A-Za-z\d]{8,}/g;
  if(!value.match(regex)) {
    return false;
  }
  return true;
}