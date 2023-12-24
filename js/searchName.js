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
let typingTimer;
const doneTypingInterval = 1000; 
let addresses;

addressList.style.display = 'none';
loader.style.display = 'none';
addressSection.style.display = 'none';
buttonSubmit.style.display = 'none';
addressTitle.style.display = 'none';

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
        buttonSubmit.disabled = true;
        getAddressAPI();
    }
}

// function toggleProvince() {
//     nameContainer.style.display = 'flex';
//     if (addressInput.value !== "") {
//         loader.style.display = 'flex';
//         buttonSubmit.disabled = true;
//         getAddressAPI();
//     }  
// }

function redirect(event){
    event.preventDefault();
    window.location.href = `http://localhost/SafeTaurant/restaurant/add.html`;
}

const createAddressesList = () => {
    addresses.forEach((address) => {
        let li = document.createElement("li");
        let element = document.createElement("button");

        li.classList.add("info-list-item");
        element.innerHTML = address.display_name;

        li.appendChild(element);
        addressList.appendChild(li);
    });
}

const getAddressAPI = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchRestaurants.php?address=${addressInput.value}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const addressAPI = JSON.parse(this.responseText) || [];
            addresses = addressAPI.filter((el) => {
                return el.display_name.includes("Spain")
            })
            if (addresses.length > 0) {
                addressList.innerHTML = "";
                loader.style.display = 'none';
                addressList.style.display = 'flex';
                addressSection.style.display = 'flex';
                addressTitle.style.display = 'flex';
                createAddressesList();
            } else {
                feedback.innerHTML = "No hay ninguna dirección con este nombre ¡Añade el restaurante!";
                loader.style.display = 'none';
                addressList.style.display = 'none';
                addressSection.style.display = 'flex';
                buttonSubmit.style.display = 'block';
                addressTitle.style.display = 'none';
            }
        } else if (this.status === 404 || this.status === 204) {
            feedback.innerHTML = "No hay ninguna dirección con este nombre ¡Añade el restaurante!";
            loader.style.display = 'none';
            addressList.style.display = 'none';
            addressSection.style.display = 'flex';
            buttonSubmit.style.display = 'block';
            addressTitle.style.display = 'none';
        }
    };
    xmlhttp.send();
}