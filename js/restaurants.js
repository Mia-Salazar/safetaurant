const nav = document.getElementById("nav");
const found = document.getElementById("found");
const toggleButton = document.getElementById("toggle");
const register = document.getElementById("register");
const name = document.getElementById("name");
const provinceSelect = document.getElementById("province");
const foodSelect = document.getElementById("foodType");
const orderContainer = document.getElementById("orderContainer");
const list = document.getElementById("list");
const order = document.getElementById("order");
const loader = document.getElementById("loader");
document.getElementById("search").addEventListener("submit", search, false);
document.getElementById("order").addEventListener("change", search, false);

//Creamos una variable para guardar el resultado de la búsqueda
let restaurants;

//Comprobamos si el usuario ha iniciado sesión
const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controllers/isLoggued.php", true);
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

//Para cada restaurante encontrado, creamos un <li> con todos los datos
const viewList = () => {
    restaurants.forEach((restaurant) => {
    let li = document.createElement("li");
    let link = document.createElement("a");
    let title = document.createElement("h4");
    let address = document.createElement("p");
    let province = document.createElement("p");
    let score = document.createElement("p");

    link.innerHTML = "Ver detalle";
    link.href = `https://foodiesaurus.miasalazar.com/restaurant/index.html?ID=${restaurant.restaurantID}`;
    title.innerHTML = restaurant.name;
    address.innerHTML = restaurant.address;
    province.innerHTML = restaurant.province;
    score.innerHTML = `${Math.floor(restaurant.generalScore)}<span>/10</span>`;
    score.classList.add("list-score");
    link.classList.add("primary-button");

    li.appendChild(title);
    li.appendChild(address);
    li.appendChild(province);
    li.appendChild(score);
    li.appendChild(link);

    list.appendChild(li);
    });
}

//Función para buscar restaurantes con los datos recabados en el buscador
const getRestaurants = () => {
    if(name && name != "") {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `https://foodiesaurus.miasalazar.com/controllers/search.php?name=${name.value}&province=${provinceSelect.value || ""}&foodType=${foodSelect.value || ""}&order=${order.value || "desc"}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
        //Si no hay ninguno, mostramos un mensaje indicando lo contrario
        restaurants = JSON.parse(this.responseText);
        if (restaurants[0].restaurantID !== null) {
            viewList();
            found.innerHTML = `Se han encontrado ${restaurants.length} resultados`;
            loader.style.display = 'none';
        } else {
            found.innerHTML = "No hay restaurantes con los filtros de búsqueda seleccionados";
            loader.style.display = 'none';
        }
        } else if (this.status === 404 || this.status === 204) {
        //Si no encontramos ningún restaurante, mostramos un mensaje indicándolo
        found.innerHTML = "No hay restaurantes con los filtros de búsqueda seleccionados";
        orderContainer.classList.add("hidden");
        loader.style.display = 'none';
        }
    };
    xmlhttp.send();
    } else {
    found.innerHTML = "No hay restaurantes con los filtros de búsqueda seleccionados";
    loader.style.display = 'none';
    }
}

//Obtenemos los valores iniciales de la ruta y llamamos a la función de obtener resultados para la búsqueda
const getInitialValues = () => {
    list.innerHTML = "";
    name.value = new URL(document.URL).searchParams.get('name');
    provinceSelect.value = new URL(document.URL).searchParams.get('province');
    foodSelect.value =  new URL(document.URL).searchParams.get('foodType');
    order.value = new URL(document.URL).searchParams.get('order');
    getRestaurants();
}

//Con esta función redirigimos al usuario a otra ruta con todos los valores de la búsqueda
//Si se ha pulsado el botón de búsqueda sin introducir ningún valor en el campo de nombre, lanzamos una alerta
function search(event) {
    event.preventDefault();
    window.location.href = `https://foodiesaurus.miasalazar.com/restaurants.html?name=${name.value}&province=${provinceSelect.value}&foodType=${foodSelect.value}&order=${order.value}`;
}

fillSelects();
getInitialValues();
checkIsLoggedIn();