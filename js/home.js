const link = document.getElementById("link");
const name = document.getElementById("name");
const lastLi = document.getElementById("last");
const searchId = document.getElementById("search")
searchId.addEventListener("submit", search, false);

let isLoggedIn;

//Con esta función redirigimos al usuario a otra ruta con todos los valores de la búsqueda
//Si se ha pulsado el botón de búsqueda sin introducir ningún valor en el campo de nombre, lanzamos una alerta
function search(event) {
  event.preventDefault();
  const province = provinceSelect.value;
  const foodType = foodSelect.value;
  window.location.href = `http://localhost/SafeTaurant/search.html?name=${name.value}&province=${province}&foodType=${foodType}&order=desc`;
}

const checkIsLoggedIn = () => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://localhost/SafeTaurant/controllers/isLoggued.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      isLoggedIn = true;
        changeLanding();
      changeMenuAccordingToUser("registered");
    }
    if(this.readyState == 4 && this.status == 401) {
      isLoggedIn = false;
    changeLanding();
      changeMenuAccordingToUser("no-registered");
    }
  };
  xmlhttp.send();
}

const changeLanding = () => {
  let link = document.createElement("a");
  link.classList.add("secondary-link");
  if (isLoggedIn) {
    link.href = `http://localhost/SafeTaurant/restaurant/search.html`;
    link.innerHTML = "¡Creálo!";
  } else {
    lastLi.innerHTML = "Inicia sesión y "
    link.href = `http://localhost/SafeTaurant/login.html`;
    link.innerHTML = "¡Creálo!";
  }
  lastLi.appendChild(link);
}

checkIsLoggedIn();