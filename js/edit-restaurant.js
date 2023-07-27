const restaurantID = new URL(document.URL).searchParams.get('ID');
const data = {ID: restaurantID};
const provinceSelect = document.getElementById("province");
const foodSelect = document.getElementById("foodType");
const feedback = document.getElementById("feedback");
const buttonSubmit = document.getElementById("buttonSubmit");
const buttonText = document.getElementById("buttonText");
const loader = document.getElementById("loader");
loader.style.display = 'none';

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

function editRestaurant(event){
    loader.style.display = 'flex';
    event.preventDefault();
    //Mostramos al usuario que la aplicación está en proceso
    buttonText.innerHTML = "Cargando...";
    feedback.innerHTML = "";
    //Creamos el objeto con todos los datos del nuevo restaurante
    const data = {
    restaurantID: restaurantID,
    name: document.getElementById("name").value,
    province: document.getElementById("province").value,
    address: document.getElementById("address").value,
    ZIP: Number(document.getElementById("ZIP").value),
    phone: Number(document.getElementById("phone").value),
    url: document.getElementById("url").value,
    foodType: document.getElementById("foodType").value,
    };
    //Hacemos la petición al back-end
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/edit-restaurant.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
        feedback.innerHTML = "Se editó correctamente";
        feedback.classList.add("success");
        feedback.classList.remove("error");
        loader.style.display = 'none';
    } else if (this.status == 424) {
        //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
        feedback.innerHTML = "Hubo un error en la edición del restaurante";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        loader.style.display = 'none';
    } else if (this.status == 401) {
        //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
        window.location.href = "https://foodiesaurus.miasalazar.com/login.html";
    }
    buttonText.innerHTML = "Editar restaurante";
    };
    xmlhttp.send(JSON.stringify(data));
}

const putData = () => {
    document.getElementById("name").value = restaurant.name;
    document.getElementById("address").value = restaurant.address;
    document.getElementById("province").value = restaurant.province;
    document.getElementById("ZIP").value = restaurant.ZIP;
    //Si se ha guardado el teléfono, lo mostramos
    if (restaurant.phone && restaurant.phone !== "0") {
    document.getElementById("phone").value = restaurant.phone;
    }
    //Si se ha guardado el tipo de comida, lo mostramos
    if (restaurant.foodType && restaurant.foodType !== "") {
    document.getElementById("foodType").value = restaurant.foodType;
    }
}

const getRestaurant = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/restaurant.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Si se ha encontrado el restaurante, llamamos a las funciones que muestran la información en la página y a la que  busca las calificaciones
        //Se guarda la información del restaurante
        restaurant = JSON.parse(this.responseText);
        putData();
    } else if (this.status == 404) {
        //Si no se encuentra el ID del restaurante, le dejamos este mensaje
        restaurantContainer.innerHTML = "No hay un restaurante con este ID";
        loader.style.display = 'none';
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        fillSelects();
        getRestaurant();
    } else if (this.status == 401) {
        window.location.href = "https://foodiesaurus.miasalazar.com/login.html";
    } else if (this.status == 400) {
        window.location.href = "https://foodiesaurus.miasalazar.com/login.html";
    } 
    };
    xmlhttp.send();
}
checkIsLoggedIn();