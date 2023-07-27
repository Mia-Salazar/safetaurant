const subtitle = document.getElementById("subtitle");
const name = document.getElementById("name")
const email = document.getElementById("email")
const img = document.getElementById("img")
const logout = document.getElementById("logout");
const loader = document.getElementById("loader");
const buttonText = document.getElementById("button-text");
let user;

logout.addEventListener("click", logoutFunction, false);

//Función para salir
function logoutFunction() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/logout.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    loader.style.display = 'flex';
    buttonText.innerHTML = 'Cargando...'
    if (this.readyState == 4 && this.status == 401) {
        //Si tiene éxito y nos devuelve un 401, significa que el usuario ha salido de la aplicación y le expulsamos al login
        window.location.href = "https://foodiesaurus.miasalazar.com/view/login.html";
    }
    };
    xmlhttp.send();
}

//Obtenemos los datos del usuario
const getProfile = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/profile.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    buttonText.innerHTML = 'Cargando...'
    if (this.readyState == 4 && this.status == 200) {
        //Si ha habido éxito, guardamos los datos del usuario en la variable user
        user = JSON.parse(this.responseText);
        putData();
    } else if (this.status == 401) {
        //Si la persona no está autorizada, la expulsamos
        window.location.href = "https://foodiesaurus.miasalazar.com/view/login.html";
    } else if (this.status == 400) {
        //Si hay un error, devolvemos un error
        subtitle.innerHTML = "Hubo un error al encontrar los datos del usuario";
        loader.style.display = 'none';
        buttonText.innerHTML = 'Salir';
    }  
    };
    xmlhttp.send();
};

//Cambiamos los valores de los inputs
const putData = () => {
    name.innerHTML = user.name;
    email.innerHTML = user.email;
    img.src = user.picture;
    loader.style.display = 'none';
    buttonText.innerHTML = 'Salir';
}

//Comprobamos si el usuario está activo
const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Si el usuario ha iniciado sesión, llamamos a la función que añade los datos a los inputs
        getProfile();
    } else if (this.status == 401) {
        //Si no ha iniciado sesión, le expulsamos al login
        window.location.href = "https://foodiesaurus.miasalazar.com/view/login.html";
    }  
    };
    xmlhttp.send();
}

checkIsLoggedIn();