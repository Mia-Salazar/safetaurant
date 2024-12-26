const LIMIT_PAGINATION = 10;
let from = 0;
let page = 0;

const nav = document.getElementById("nav");
const found = document.getElementById("found");
const register = document.getElementById("register");
const name = document.getElementById("name");
const orderContainer = document.getElementById("orderContainer");
const list = document.getElementById("list");
const order = document.getElementById("order");
const loader = document.getElementById("loader");
const loadMoreSpinner = document.getElementById("loaderLoadMore");
const searchSection = document.getElementById("searchSection");
document.getElementById("search").addEventListener("submit", search, false);
document.getElementById("order").addEventListener("change", search, false);
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

const getGeneralScore = (attention, chart, fidelity, reaction) => {
    const reactionPositive = reaction === 0 ? 50 : - (reaction - 100) * 5
    const generalScore = Math.floor(((attention * 0.2) + (chart * 0.15) + (fidelity * 0.15) + (reactionPositive)) / 10)
    return generalScore;
}

const compareScores = ( a, b ) => {
    if ( a.generalScore > b.generalScore ){
      return -1;
    }
    if ( a.generalScore < b.generalScore ){
      return 1;
    }
    return 0;
  }

const orderRestaurants = ( restaurants) => {
    const newRestaurants = restaurants.map((restaurant) => {
        const averageAttentionPercent =  Math.floor(restaurant.attentionScore) * 10
        const chart = Number(restaurant.allergenChartCount) * 100 / restaurant.totalScores;
        const averageFidelityPercent = Math.floor(restaurant.fidelityScore) * 10
        const allergenPercent = Number(restaurant.allergicReactionCount) * 100 / restaurant.totalScores;
        const newRestaurant = {...restaurant, generalScore: getGeneralScore(averageAttentionPercent, chart, averageFidelityPercent, allergenPercent)}
        return newRestaurant 
    })
    const restaurantsOrdered = newRestaurants.sort(compareScores)
    return restaurantsOrdered;
}

const getRestaurantAPI = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/search.php?name=${name.value}&province=${provinceSelect.value || ""}&foodType=${foodSelect.value || ""}&order=${order.value || "desc"}&offset=${from}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
            //Si no hay ninguno, mostramos un mensaje indicando lo contrario
            const response = JSON.parse(this.responseText)
            restaurants = orderRestaurants(response)
            if (restaurants[0].restaurantID !== null) {
                viewList();
                loadMoreSpinner.style.display = 'none';
                loader.style.display = 'none';
                orderContainer.classList.remove("hidden");
            } else {
                orderContainer.classList.add("hidden");
                showAddButtonWhenNoResults();
                loader.style.display = 'none';
                loadMoreSpinner.style.display = 'none';
            }
        } else if (this.status === 404 || this.status === 204) {
            showAddButtonWhenNoResults();
            orderContainer.classList.add("hidden");
            loader.style.display = 'none';
            loadMoreSpinner.style.display = 'none';
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
            found.innerHTML = `Hay <span class="restauranta__total-number">${restaurantsTotal}</span> resultados`;
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

getInitialValues();
checkIsLoggedIn();
getRestaurantTotal();


