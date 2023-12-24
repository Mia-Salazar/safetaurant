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
feedback.style.display = 'none';

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
        addressList.innerHTML = "";
        addressSection.style.display = 'none';
        getAddressAPI();
    }
}

function redirect(event){
    event.preventDefault();
    window.location.href = `http://localhost/SafeTaurant/restaurant/add.html`;
}

//
function addressClick(event) {
    const addresClicked = event.target.id
    event.preventDefault();
    console.log(event.target.id, 'event')
    // addresses.forEach((address) => {
    //     if(address.place_id === addresClicked) {
    //         document.getElementById(address.place_id).style.
    //     }
    //     document.getElementById("addressList")
    // })
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
        
        const cityOrTown = address.address.city ? address.address.city : address.address.town
        label.innerHTML = `${address.address.road}, ${cityOrTown}, ${address.address.state}`;
        label.htmlFor = address.place_id

        div.appendChild(input);
        div.appendChild(label);
        addressList.appendChild(div);
    });
}

const getAddressAPI = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchRestaurants.php?address=${addressInput.value}`, true);
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
                feedback.innerHTML = "¿Ninguna de estas direcciones es correcta? ¡Añade el restaurante a mano!";
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