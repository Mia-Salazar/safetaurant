const found = document.getElementById("found");
const loader = document.getElementById("loader");
let restaurants;

//Para cada restaurante encontrado, creamos un <li> con todos los datos
const viewList = () => {
    restaurants.forEach((restaurant) => {
        let li = document.createElement("li");
        let link = document.createElement("a");
        let title = document.createElement("h4");
        let province = document.createElement("p");

        link.innerHTML = "Ver detalle";
        link.href = `https://foodiesaurus.miasalazar.com/view/restaurant.html?ID=${restaurant.restaurantID}`;
        title.innerHTML = restaurant.name;
        link.classList.add("primary-button");
        province.innerHTML = restaurant.province;

        li.appendChild(title);
        li.appendChild(province);
        li.appendChild(link);
        list.appendChild(li);
    });
    loader.style.display = 'none';
}

//Obtenemos los datos del usuario
const getRestaurants = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/profile-restaurants.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, guardamos los datos del usuario en la variable user
            restaurants = JSON.parse(this.responseText);
            if (restaurants.length !== 0) {
                found.innerHTML = `Has registrado ${restaurants.length} locales de restauración`;
                viewList();
            } else {
                found.innerHTML = "No has registrado ningún local de restauración";
                loader.style.display = 'none';
            }
        } else if (this.status == 401) {
            //Si la persona no está autorizada, la expulsamos
            window.location.href = "https://foodiesaurus.miasalazar.com/view/login.html";
        } else if (this.status == 400) {
            //Si hay un error, devolvemos un error
            subtitle.innerHTML = "Hubo un error al encontrar los datos del usuario";
            loader.style.display = 'none';
        }  
    };
    xmlhttp.send();
};

//Comprobamos si el usuario está activo
const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si el usuario ha iniciado sesión, llamamos a la función que añade los datos a los inputs
            getRestaurants();
        } else if (this.status == 401) {
            //Si no ha iniciado sesión, le expulsamos al login
            window.location.href = "https://foodiesaurus.miasalazar.com/view/login.html";
        }  
    };
    xmlhttp.send();
}

checkIsLoggedIn();