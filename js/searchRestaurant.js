//Get elements
const loader = document.getElementById("loader");
const nameContainer = document.getElementById("addressContainer");
const addressInput = document.getElementById("address");
const feedback = document.getElementById("feedback");
const submit = document.getElementById("add");
const list = document.getElementById("list");
const buttonSubmit = document.getElementById("buttonSubmit");

const addressSection = document.getElementById("addressSection");
const addressList =  document.getElementById("addressList");
const addressTitle = document.getElementById("addressTitle");

const restaurantsSection = document.getElementById("restaurantsSection");
const restaurantTitle =  document.getElementById("restaurantTitle");
const restaurantsList = document.getElementById("restaurantsList");

//Global variables
let typingTimer;
const doneTypingInterval = 1000; 
let addresses;
let restaurants;

//Hice on load
loader.style.display = 'none';
buttonSubmit.style.display = 'none';
feedback.style.display = 'none';

addressList.style.display = 'none';
addressSection.style.display = 'none';

restaurantsSection.style.display = 'none';
restaurantsList.style.display = 'none';


//Events listeners
submit.addEventListener("submit", redirect, false);
addressInput.addEventListener("keyup",function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});
addressInput.addEventListener("keydown",function () {
    clearTimeout(typingTimer);
})

//user is "finished typing," do something
function doneTyping () {
    if (addressInput.value !== "") {
        loader.style.display = 'flex';

        addresses = [];
        addressList.innerHTML = "";
        addressSection.style.display = 'none';

        restaurants = [];
        restaurantsList.innerHTML = "";
        restaurantsSection.style.display = 'none';
        getAddressAPI();
    }
}

function redirect(event){
    event.preventDefault();
    window.location.href = `http://localhost/SafeTaurant/restaurant/add.html`;
}

function restaurantClick(event) {
    event.preventDefault();
    const restaurantClicked = event.target.id
    const restaurantsData = restaurants.features.find(restaurant => restaurant.properties.place_id === restaurantClicked);
    window.location.href = `http://localhost/SafeTaurant/restaurant/add-score.html?name=${restaurantsData.properties.address_line1}
    &address=&${restaurantsData.properties.address_line2}&city=${restaurantsData.properties.city}
    &lat=${restaurantsData.properties.lat}&long=${restaurantsData.properties.lon}
    &zip=${restaurantsData.properties.postcode}&apiID=${restaurantsData.properties.place_id}`;
}

function addressClick(event) {
    event.preventDefault();

    restaurantsList.innerHTML = "";
    restaurantsSection.style.display = 'none';
    restaurants = [];

    const addresClicked = event.target.id
    const addressData = addresses.find(address => address.place_id === addresClicked);
    loader.style.display = 'flex';
    getRestaurantsAPI(addressData.lat, addressData.lon);
}

const createAddressesList = () => {
    addresses.forEach((address) => {
        let label = document.createElement("label");
        let input = document.createElement("input");
        let div = document.createElement("div");

        div.classList.add("radio-container");

        input.setAttribute("name", "addressComplete");
        input.setAttribute("id", address.place_id);
        input.value = address.place_id
        input.type = "radio";
        
        const cityOrTown = address.address.city ? address.address.city : address.address.town ? address.address.town : address.address.village;
        label.innerHTML = `<strong>${address.address.road}</strong>, ${address.address.postcode}, ${cityOrTown}, ${address.address.state}`;
        label.htmlFor = address.place_id

        input.addEventListener('change', addressClick, false);

        div.appendChild(input);
        div.appendChild(label);
        addressList.appendChild(div);
    });


}

const getAddressAPI = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchAddress.php?address=${addressInput.value}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addresses = JSON.parse(this.responseText) || [];
            if (addresses.length > 0) {
                addressList.innerHTML = "";
                loader.style.display = 'none';
                addressList.style.display = 'flex';
                addressSection.style.display = 'flex';
                addressTitle.style.display = 'flex';
                feedback.style.display = 'flex';
                feedback.innerHTML = "¿Los datos no son correctos? ¡Añade el restaurante a mano!";
                buttonSubmit.style.display = 'block';
                createAddressesList();
            } else {
                feedback.style.display = 'flex';
                feedback.innerHTML = "No hay ninguna dirección con este nombre ¡Añade el restaurante!";
                loader.style.display = 'none';
                addressList.style.display = 'none';
                addressSection.style.display = 'flex';
                buttonSubmit.style.display = 'block';
                addressTitle.style.display = 'none';
            }
        } else if (this.status === 404 || this.status === 204) {
            feedback.innerHTML = "No hay ninguna dirección con este nombre ¡Añade el restaurante!";
            feedback.style.display = 'flex';
            loader.style.display = 'none';
            addressList.style.display = 'none';
            addressSection.style.display = 'flex';
            buttonSubmit.style.display = 'block';
            addressTitle.style.display = 'none';
        }
    };
    xmlhttp.send();
}

const createRestaurantsList = () => {
   restaurants.features.forEach((restaurant) => {
        let label = document.createElement("label");
        let input = document.createElement("input");
        let div = document.createElement("div");

        div.classList.add("radio-container");

        input.setAttribute("name", "restaurantComplete");
        input.setAttribute("id", restaurant.properties.place_id);
        input.value = restaurant.properties.place_id
        input.type = "radio";
        
        label.innerHTML = `<strong>${restaurant.properties.name}</strong>, ${restaurant.properties.street}, ${restaurant.properties.postcode},
        ${restaurant.properties.city}`;
        label.htmlFor = restaurant.properties.place_id;

        input.addEventListener('change', restaurantClick, false);

        div.appendChild(input);
        div.appendChild(label);
        restaurantsList.appendChild(div);
    });
}

const getRestaurantsAPI = (latitude, longitude) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchRestaurants.php?lat=${latitude}&lon=${longitude}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            restaurants = JSON.parse(this.responseText) || [];
            if (restaurants.features.length > 0) {
                restaurantsList.innerHTML = "";
                loader.style.display = 'none';
                restaurantsList.style.display = 'flex';
                restaurantsSection.style.display = 'flex';
                restaurantTitle.style.display = 'flex';
                createRestaurantsList();
            } else {
                feedback.innerHTML = "No hay ningún restaurante en esta dirección, ¡Añádelo desde 0!";
                loader.style.display = 'none';
                restaurantsList.style.display = 'none';
                restaurantsSection.style.display = 'flex';
                restaurantTitle.style.display = 'none';
            }
        } else if (this.status === 404 || this.status === 204) {
            feedback.innerHTML = "No hay ningún restaurante en esta dirección, ¡Añádelo desde 0!";
            loader.style.display = 'none';
            restaurantsList.style.display = 'none';
            restaurantsSection.style.display = 'flex';
            restaurantTitle.style.display = 'none';
        }
    };
    xmlhttp.send();
}

//Comprobamos si el usuario ha iniciado sesión
//Si la respuesta es afirmativa, continuamos con la carga de la página
//En caso contrario le expulsamos al login
const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost/SafeTaurant/controllers/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        } else if (this.status == 401) {
            window.location.href = "http://localhost/SafeTaurant/login.html";
        } else if (this.status == 400) {
            //Si hay un error, devolvemos un error
            window.location.href = "http://localhost/SafeTaurant/login.html";
        } 
    };
    xmlhttp.send();
}
checkIsLoggedIn();