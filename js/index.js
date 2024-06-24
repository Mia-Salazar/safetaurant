const nav = document.getElementById("nav");
const toggleButton = document.getElementById("toggle");
const register = document.getElementById("register");
const link = document.getElementById("link");
const provinceSelect = document.getElementById("province");
const foodSelect = document.getElementById("foodType");
const name = document.getElementById("name");
const lastLi = document.getElementById("last");
document.getElementById("search").addEventListener("submit", search, false);

let isLoggedIn;

//Rellenamos los select con los array que encontramos arriba
const fillSelects = () => {
  provinces.forEach((province) => {
    let option = document.createElement("option");
    option.value = province;
    option.innerHTML = province;
    if (province === "Madrid") {
      option.selected = true;
    }
    provinceSelect.appendChild(option);
  });
  const foodTypeOrderes = foodType.sort();
  foodTypeOrderes.forEach((food) => {
    let option = document.createElement("option");
    option.value = food;
    option.innerHTML = food;
    foodSelect.appendChild(option);
  });
}

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

fillSelects()
checkIsLoggedIn();