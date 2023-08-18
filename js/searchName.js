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

restaurantsList.style.display = 'none';
loader.style.display = 'none';
nameContainer.style.display = 'none';
sectionList.style.display = 'none';

submit.addEventListener("submit", redirect, false);
document.getElementById("province").addEventListener("change", toggleProvince, false);
nameInput.addEventListener("keyup",function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});
nameInput.addEventListener("keydown",function () {
    clearTimeout(typingTimer);
})

//user is "finished typing," do something
function doneTyping () {
    if (nameInput.value !== "") {
        loader.style.display = 'flex';
        buttonSubmit.disabled = true;
        getRestaurantAPI();
    }
}

function toggleProvince() {
    nameContainer.style.display = 'flex';
    if (nameInput.value !== "") {
        loader.style.display = 'flex';
        buttonSubmit.disabled = true;
        getRestaurantAPI();
    }  
}

function redirect(event){
    event.preventDefault();
    window.location.href = `https://foodiesaurus.com/restaurant/add.html?name=${nameInput.value}&province=${provinceSelect.value}`;
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
        link.href = `https://foodiesaurus.com/restaurant/index.html?ID=${restaurant.restaurantID}`;

        li.appendChild(link);
        restaurantsList.appendChild(li);
    });
}

const getRestaurantAPI = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `https://foodiesaurus.com/controllers/searchName.php?name=${nameInput.value}&province=${provinceSelect.value}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
            //Si no hay ninguno, mostramos un mensaje indicando lo contrario
            restaurants = JSON.parse(this.responseText);
            if (restaurants.length > 0) {
                restaurantsList.innerHTML = "";
                loader.style.display = 'none';
                buttonSubmit.disabled = false;
                restaurantsList.style.display = 'flex';
                sectionList.style.display = 'flex';
                createRestauranList();
            } else {
                feedback.innerHTML = "No ningún restaurantes con este nombre ¡Añádelo!";
                loader.style.display = 'none';
                buttonSubmit.disabled = false;
                restaurantsList.style.display = 'none';
                sectionList.style.display = 'flex';
            }
        } else if (this.status === 404 || this.status === 204) {
            feedback.innerHTML = "No ningún restaurantes con este nombre ¡Añádelo!";
            loader.style.display = 'none';
            buttonSubmit.disabled = false;
            restaurantsList.style.display = 'none';
            sectionList.style.display = 'flex';
        }
    };
    xmlhttp.send();
}

fillSelects();