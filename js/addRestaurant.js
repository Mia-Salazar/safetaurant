const provinceSelect = document.getElementById("province");
const foodSelect = document.getElementById("foodType");
const feedback = document.getElementById("feedback");
const fidelity = document.getElementById("fidelityScoreContainer");
const buttonSubmit = document.getElementById("buttonSubmit");
const error = document.getElementById("error");
const loader = document.getElementById("loader");
const buttonText = document.getElementById("buttonText");
const namePrevious = new URL(document.URL).searchParams.get('name');
const provincePrevious = new URL(document.URL).searchParams.get('province');
loader.style.display = 'none';

//Variable para comprobar si hay carta de alérgenos
//Si no la hay, la puntuación de fidelidad será 1 directamente y no se mostrará el range input
let allergenChartToggle = false;
let user;

document.getElementById("name").value = namePrevious;
document.getElementById("add").addEventListener("submit", registerRestaurant, false);
document.getElementById("allergenChart").addEventListener("change", allergenToggle, false);

//Rellenamos los select con los array que encontramos arriba
const fillSelects = () => {
    provinces.forEach((province) => {
        let option = document.createElement("option");
        option.value = province;
        option.innerHTML = province;
        if (provincePrevious === province) {
            option.setAttribute('selected', true);
        }
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

//Mostramos u ocultamos el range input de la puntuación de fidelidad
function allergenToggle() {
    if(!allergenChartToggle) {
        fidelity.classList.remove("hidden");
    } else {
        fidelity.classList.add("hidden");
    }
    allergenChartToggle = !allergenChartToggle;
}

function registerRestaurant(event){
    loader.style.display = 'flex';
    event.preventDefault();
    //Mostramos al usuario que la aplicación está en proceso
    buttonText.innerHTML = "Cargando...";
    feedback.innerHTML = "";
    //Creamos el objeto con todos los datos del nuevo restaurante
    const data = {
        name: document.getElementById("name").value,
        province: document.getElementById("province").value,
        address: document.getElementById("address").value,
        ZIP: Number(document.getElementById("ZIP").value),
        phone: Number(document.getElementById("phone").value),
        url: document.getElementById("url").value,
        foodType: document.getElementById("foodType").value,
        created: new Date(),
        comment: document.getElementById("comment").value,
        generalScore: document.getElementById("generalScore").value,
        allergenChart: document.getElementById("allergenChart").checked ? 1 : 0,
        fidelityScore: document.getElementById("allergenChart").checked ? document.getElementById("fidelityScore").value : 0,
        allergicReaction: document.getElementById("allergicReaction").checked ? 1 : 0,
        attentionScore: document.getElementById("attentionScore").value,
        userName: user.name,
        id: user.id,
        celiacDisease: document.querySelector('input[name="celiac"]:checked').value,
        diabetes: document.querySelector('input[name="diabetes"]:checked').value,
        lactoseIntolerant: document.querySelector('input[name="lactose"]:checked').value,
        fructoseIntolerant: document.querySelector('input[name="fructose"]:checked').value,
        vegan: document.querySelector('input[name="vegan"]:checked').value,
        vegetarian: document.querySelector('input[name="vegetarian"]:checked').value,
    };
    //Hacemos la petición al back-end
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.com/controllers/addRestaurant.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            data.restaurantID = this.responseText;
            addScore(data);
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación del restaurante";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = 'none';
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            window.location.href = "https://foodiesaurus.com/login.html";
        }
    };
    xmlhttp.send(JSON.stringify(data));
}

const addScore = (data) =>{
    //Hacemos la petición al back-end      
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.com/controllers/addScore.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            addOptions(data);
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación de la puntuación";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = 'none';
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            window.location.href = "https://foodiesaurus.com/login.html";
        }
        //Mostramos al usuario que ya no está cargando
        buttonText.innerHTML = "Crear restaurante";
    };
    xmlhttp.send(JSON.stringify(data));
}

const addOptions = (data) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.com/controllers/addOptions.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            feedback.innerHTML = "Creado correctamente";
            feedback.classList.add("success");
            feedback.classList.remove("error");
            window.location.href = "https://foodiesaurus.com/";
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación de la puntuación";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = 'none';
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            window.location.href = "https://foodiesaurus.com/login.html";
        }
        //Mostramos al usuario que ya no está cargando
    buttonText.innerHTML = "Crear restaurante";
    };
    xmlhttp.send(JSON.stringify(data));
}

//Obtenemos los datos del usuario
const getProfile = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.com/controllers/profile.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, guardamos los datos del usuario en la variable user
            user = JSON.parse(this.responseText);
        } else if (this.status == 401) {
            //Si la persona no está autorizada, la expulsamos
            window.location.href = "https://foodiesaurus.com/login.html";
        } else if (this.status == 400) {
            //Si hay un error, devolvemos un error
            subtitle.innerHTML = "Hubo un error al encontrar los datos del usuario";
        }  
    };
    xmlhttp.send();
};

//Comprobamos si el usuario ha iniciado sesión
//Si la respuesta es afirmativa, continuamos con la carga de la página
//En caso contrario le expulsamos al login
const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.com/controllers/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            fillSelects();
            getProfile()
        } else if (this.status == 401) {
            window.location.href = "https://foodiesaurus.com/login.html";
        } else if (this.status == 400) {
            //Si hay un error, devolvemos un error
            subtitle.innerHTML = "Hubo un error al encontrar los datos del usuario";
        } 
    };
    xmlhttp.send();
}
checkIsLoggedIn();