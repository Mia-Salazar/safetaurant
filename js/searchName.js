const loader = document.getElementById("loader");
const nameContainer = document.getElementById("nameContainer");
const provinceSelect = document.getElementById("province");
const nameInput = document.getElementById("name");
const feedback = document.getElementById("feedback");
const submit = document.getElementById("add");
const list = document.getElementById("list");
const buttonSubmit = document.getElementById("buttonSubmit");
const restaurantsList =  document.getElementById("restaurantsList");
let typingTimer;
const doneTypingInterval = 2000; 
let restaurants;

loader.style.display = 'none';
nameContainer.style.display = 'none';
list.style.display = 'none';

submit.addEventListener("submit", redirect, false);
document.getElementById("province").addEventListener("change", toggleProvince, false);
nameInput.addEventListener("keyup",function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
    loader.style.display = 'flex';
});
nameInput.addEventListener("keydown",function () {
    clearTimeout(typingTimer);
})

//user is "finished typing," do something
function doneTyping () {
    if (nameInput.value !== "") {
        loader.style.display = 'flex';
        getRestaurantAPI();
    }
}

function toggleProvince() {
    nameContainer.style.display = 'flex';
}

function redirect(event){
    event.preventDefault();
    window.location.href = `https://foodiesaurus.miasalazar.com/restaurant/add.html?name=${nameInput.value}&province=${provinceSelect.value}`;
}

const fillSelects = () => {
    provinces.forEach((province) => {
        let option = document.createElement("option");
        option.value = province;
        option.innerHTML = province;
        provinceSelect.appendChild(option);
    });
}

const createRestauranList = () => {
    restaurants.forEach((restaurant) => {
        let li = document.createElement("li");
        let link = document.createElement("a");

        li.classList.add("info-list-item");
        link.innerHTML = restaurant.name;
        link.href = `https://foodiesaurus.miasalazar.com/restaurant/index.html?ID=${restaurant.restaurantID}`;

        li.appendChild(link);
        restaurantsList.appendChild(li);
    });
}

const getRestaurantAPI = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `https://foodiesaurus.miasalazar.com/controllers/searchName.php?name=${nameInput.value}&province=${provinceSelect.value}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
            //Si no hay ninguno, mostramos un mensaje indicando lo contrario
            restaurants = JSON.parse(this.responseText);
            if (restaurants.length > 0) {
                loader.style.display = 'none';
                buttonSubmit.disabled = false;
                list.style.display = 'flex';
                createRestauranList();
            } else {
                feedback.classList.add("error");
                feedback.innerHTML = "No hay restaurantes con este nombre";
                loader.style.display = 'none';
                buttonSubmit.disabled = false;
                list.style.display = 'flex';
                restaurantsList.style.display = 'none';
            }
        } else if (this.status === 404 || this.status === 204) {

            feedback.classList.add("error");
            feedback.innerHTML = "No hay restaurantes con este nombre";
            loader.style.display = 'none';
            buttonSubmit.disabled = false;
            list.style.display = 'flex';
            restaurantsList.style.display = 'none';
        }
    };
    xmlhttp.send();
}

fillSelects();