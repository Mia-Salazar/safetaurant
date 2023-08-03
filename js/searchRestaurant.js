const loader = document.getElementById("loader");
const nameContainer = document.getElementById("nameContainer");
const provinceSelect = document.getElementById("province");
const nameInput = document.getElementById("name");
const feedback = document.getElementById("feedback");
let typingTimer;
const doneTypingInterval = 2000; 

loader.style.display = 'none';
nameContainer.style.display = 'none';

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
        getRestaurantAPI();
    }
}

function toggleProvince(event) {
    nameContainer.style.display = 'flex';
}

const fillSelects = () => {
    provinces.forEach((province) => {
        let option = document.createElement("option");
        option.value = province;
        option.innerHTML = province;
        provinceSelect.appendChild(option);
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
            if (restaurants[0].restaurantID !== null) {
                loader.style.display = 'none';
            } else {
                feedback.classList.add("error");
                feedback.innerHTML = "No hay restaurantes con este nombre";
                loader.style.display = 'none';
            }
        } else if (this.status === 404 || this.status === 204) {

            feedback.classList.add("error");
            feedback.innerHTML = "No hay restaurantes con este nombre";
            loader.style.display = 'none';
        }
    };
    xmlhttp.send();
}

fillSelects();