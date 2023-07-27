const nav = document.getElementById("nav");
const toggleButton = document.getElementById("toggle");
const register = document.getElementById("register");
const link = document.getElementById("link");
const provinceSelect = document.getElementById("province");
const foodSelect = document.getElementById("foodType");
const name = document.getElementById("name");
document.getElementById("search").addEventListener("submit", search, false);

//Rellenamos los select con los array que encontramos arriba
const fillSelects = () => {
  provinces.forEach((province) => {
    let option = document.createElement("option");
    option.value = province;
    option.innerHTML = province;
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
  window.location.href = `https://foodiesaurus.miasalazar.com/view/restaurants.html?name=${name.value}&province=${province}&foodType=${foodType}&order=desc`;
}

const checkIsLoggedIn = () => {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/isLoggued.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      changeMenuAccordingToUser("registered");
    }
    if(this.readyState == 4 && this.status == 401) {
      changeMenuAccordingToUser("no-registered");
    }
  };
  xmlhttp.send();
}
fillSelects()
checkIsLoggedIn();