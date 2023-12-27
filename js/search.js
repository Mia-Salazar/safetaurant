const LIMIT_PAGINATION = 10;
let from = 0;
let page = 0;

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
const nextButton = document.getElementById("next");
const loadMoreSpinner = document.getElementById("loaderLoadMore");
const searchSection = document.getElementById("searchSection");
document.getElementById("search").addEventListener("submit", search, false);
document.getElementById("order").addEventListener("change", search, false);
nextButton.addEventListener("click", getNextPage, false);
loadMoreSpinner.style.display = 'none';

//Creamos una variable para guardar el resultado de la búsqueda
let restaurants;
let isLoggedIn;

//Comprobamos si el usuario ha iniciado sesión
const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost/SafeTaurant/controllers/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        isLoggedIn = true;
        changeMenuAccordingToUser("registered");
    }
    if(this.readyState == 4 && this.status == 401) {
        isLoggedIn = false
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

        link.href = `http://localhost/SafeTaurant/restaurant/index.html?ID=${restaurant.restaurantID}`;
        link.setAttribute('aria-label', `Visitar restaurante: ${restaurant.name}`);
        title.innerHTML = restaurant.name;
        address.innerHTML = restaurant.address;
        province.innerHTML = restaurant.province;
        province.classList.add("list-province");
        score.innerHTML = Math.floor(restaurant.generalScore);
        score.classList.add("list-principal-score");

        link.appendChild(title);
        link.appendChild(address);
        link.appendChild(province);
        link.appendChild(score);

        li.appendChild(link);
        list.appendChild(li);
    });
}

function getNextPage(){
    if(name && name != "") {
        loadMoreSpinner.style.display = 'flex';
        from = from + LIMIT_PAGINATION;
        page++;
        nextButton.style.display = 'none';
        getRestaurantAPI();
    }
}

const getRestaurantAPI = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/search.php?name=${name.value}&province=${provinceSelect.value || ""}&foodType=${foodSelect.value || ""}&order=${order.value || "desc"}&offset=${from}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
            //Si no hay ninguno, mostramos un mensaje indicando lo contrario
            restaurants = JSON.parse(this.responseText);
            if (restaurants[0].restaurantID !== null) {
                const hasMoreToLoad = restaurantsTotal > (from + LIMIT_PAGINATION);
                if(!hasMoreToLoad) {
                    nextButton.style.display = 'none';
                } else {
                    nextButton.style.display = 'block';
                }
                viewList();
                loadMoreSpinner.style.display = 'none';
                loader.style.display = 'none';
                orderContainer.classList.remove("hidden");
            } else {
                orderContainer.classList.add("hidden");
                showAddButtonWhenNoResults();
                loader.style.display = 'none';
                loadMoreSpinner.style.display = 'none';
                nextButton.style.display = 'none';
            }
        } else if (this.status === 404 || this.status === 204) {
            showAddButtonWhenNoResults();
            orderContainer.classList.add("hidden");
            loader.style.display = 'none';
            loadMoreSpinner.style.display = 'none';
            nextButton.style.display = 'none';
        }
    };
    xmlhttp.send();
}

//Función cuando no hay resultados
const showAddButtonWhenNoResults = () => {
    let link = document.createElement("a");
    link.setAttribute("id","addRestaurant");
    link.classList.add("primary-button");
    if (!document.getElementById("addRestaurant")) {
        if (isLoggedIn) {
            found.innerHTML = "No hay restaurantes con los filtros de búsqueda seleccionados";
            link.href = "http://localhost/SafeTaurant/restaurant/search.html";
            link.innerHTML = "Añadir restaurante" 
        } else {
            found.innerHTML = "No hay restaurantes con los filtros de búsqueda seleccionados. <br> Inicia sesión y crea el restaurante";
            link.href = "http://localhost/SafeTaurant/login.html";
            link.innerHTML = "Iniciar sesión"
        }
        searchSection.appendChild(link);
    }

    

}

//Función para buscar restaurantes con los datos recabados en el buscador
const getRestaurants = () => {
    if(name && name != "") {
        getRestaurantAPI();
    } else {
        found.innerHTML = "No hay restaurantes con los filtros de búsqueda seleccionados";
        loader.style.display = 'none';
    }
}

const getRestaurantTotal = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchTotal.php?name=${name.value}&province=${provinceSelect.value || ""}&foodType=${foodSelect.value || ""}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
            //Si no hay ninguno, mostramos un mensaje indicando lo contrario
            restaurantsTotal = JSON.parse(this.responseText);
            found.innerHTML = `Se han encontrado ${restaurantsTotal} resultados`;
            getRestaurants();
        } else if (this.status === 404 || this.status === 204) {
            //Si no encontramos ningún restaurante, mostramos un mensaje indicándolo
            found.innerHTML = "No hay restaurantes con los filtros de búsqueda seleccionados";
            orderContainer.classList.add("hidden");
            loader.style.display = 'none';
        }
    };
    xmlhttp.send();
}

//Obtenemos los valores iniciales de la ruta y llamamos a la función de obtener resultados para la búsqueda
const getInitialValues = () => {
    list.innerHTML = "";
    name.value = new URL(document.URL).searchParams.get('name');
    provinceSelect.value = new URL(document.URL).searchParams.get('province');
    foodSelect.value =  new URL(document.URL).searchParams.get('foodType');
    order.value = new URL(document.URL).searchParams.get('order');
}

//Con esta función redirigimos al usuario a otra ruta con todos los valores de la búsqueda
//Si se ha pulsado el botón de búsqueda sin introducir ningún valor en el campo de nombre, lanzamos una alerta
function search(event) {
    event.preventDefault();
    window.location.href = `http://localhost/SafeTaurant/search.html?name=${name.value}&province=${provinceSelect.value}&foodType=${foodSelect.value}&order=${order.value}`;
}

fillSelects();
getInitialValues();
checkIsLoggedIn();
getRestaurantTotal();


