const feedback = document.getElementById("feedback");
const fidelity = document.getElementById("fidelityScoreContainer");
let ID = new URL(document.URL).searchParams.get("ID");
const loader = document.getElementById("loader");
const buttonText = document.getElementById("buttonText");
loader.style.display = "none";

//Variable para comprobar si hay carta de alérgenos
//Si no la hay, la puntuación de fidelidad será 1 directamente y no se mostrará el range input
let allergenChartToggle = false;
let user;
let buttonDisabled = true;

document.getElementById("add").addEventListener("submit", submitScore, false);
document.getElementById("allergenChart").addEventListener("change", allergenToggle, false);
document.getElementById("captcha").addEventListener("change", captchaToggle, false);

// Captcha
const signupCaptcha = document.getElementById("signupCaptcha");

signupCaptcha.addEventListener("verified", (e) => {
    document.getElementById("captcha").checked = true;
    buttonSubmit.disabled = false;
});
signupCaptcha.addEventListener("error", (e) => {
    feedback.innerHTML = e.error;
});

function captchaToggle() {
    buttonSubmit.disabled = !buttonDisabled;
    buttonDisabled = !buttonDisabled;
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

function submitScore(event){
    event.preventDefault();
    loader.style.display = "flex";
    const feedback = document.getElementById("feedback");
    //Mostramos al usuario que la aplicación está en proceso
    buttonText.innerHTML = "Cargando...";
    feedback.innerHTML = "";
    //Creamos un objeto con los datos
    const data = {
        created: new Date(),
        comment: document.getElementById("comment").value,
        generalScore: document.getElementById("generalScore").value,
        allergenChart: document.getElementById("allergenChart").checked ? 1 : 0,
        fidelityScore: document.getElementById("allergenChart").checked ? document.getElementById("fidelityScore").value : 0,
        attentionScore: document.getElementById("attentionScore").value,
        restaurantID: ID,
        userName: user.name,
        id: user.id,
        allergicReaction: document.getElementById("allergicReaction").checked ? 1 : 0,
        celiacDisease: document.querySelector('input[name="celiac"]:checked').value,
        diabetes: document.querySelector('input[name="diabetes"]:checked').value,
        lactoseIntolerant: document.querySelector('input[name="lactose"]:checked').value,
        fructoseIntolerant: document.querySelector('input[name="fructose"]:checked').value,
        vegan: document.querySelector('input[name="vegan"]:checked').value,
        vegetarian: document.querySelector('input[name="vegetarian"]:checked').value,
    };
    if(!ID) {
        registerRestaurant(data)
    } else {
        addScore(data);
    }

}

const checkDuplicatedRestaurant = () => {
    const url = new URL(document.URL);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchDuplicates.php?lat=${url.searchParams.get("lat")}&long=${url.searchParams.get("long")}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            const hasSimilarName = response[0].name.toLowerCase().includes(url.searchParams.get("name").toLowerCase());
            if (response.length === 1 && hasSimilarName) {
                ID = response[0].restaurantID;
            }           
        } else if (this.status == 401) {
            window.location.href = "http://localhost/SafeTaurant/login.html";
        } else if (this.status == 400) {
            //Si hay un error, devolvemos un error
            subtitle.innerHTML = "Hubo un error al encontrar los datos del usuario";
        } 
    };
    xmlhttp.send();
}

const checkAddScoreOrAddRestaurantPage = () => {
    if (!ID) {
        document.getElementById("title").innerHTML = "Añadir primera opinión al restaurante";
        checkDuplicatedRestaurant();
    }
}

const addOptions = (data) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/addOptions.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            feedback.innerHTML = "Creado correctamente";
            feedback.classList.add("success");
            feedback.classList.remove("error");
            window.location.href = "http://localhost/SafeTaurant/";
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación de la puntuación";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = "none";
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            window.location.href = "http://localhost/SafeTaurant/login.html";
        }
        //Mostramos al usuario que ya no está cargando
        buttonText.innerHTML = "Añadir restaurante";
    };
    xmlhttp.send(JSON.stringify(data));
}

//Obtenemos los datos del usuario
const getProfile = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost/SafeTaurant/controllers/profile.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, guardamos los datos del usuario en la variable user
            user = JSON.parse(this.responseText);
        } else if (this.status == 401) {
            //Si la persona no está autorizada, la expulsamos
            window.location.href = "http://localhost/SafeTaurant/login.html";
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
    xmlhttp.open("GET", "http://localhost/SafeTaurant/controllers/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 &&  this.status == 401) {
            window.location.href = "http://localhost/SafeTaurant/login.html";
        } else if (this.readyState == 4 && this.status == 200) {
            getProfile();
        }
    };
    xmlhttp.send();
}

const addScore = (data) => {
    //Hacemos la petición al back-end
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/addScore.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            addOptions(data)
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación de la nueva puntuación";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = "none";
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            window.location.href = "http://localhost/SafeTaurant/login.html";
        }
        //Mostramos al usuario que ya no está cargando
        buttonText.innerHTML = "Añadir opinión";
    };
    xmlhttp.send(JSON.stringify(data));
}

const registerRestaurant = (data) => {
    const url = new URL(document.URL);
    const urlData = url.searchParams.get("url") === 0 ? "" : url.searchParams.get("url");
    const phoneData = url.searchParams.get("phone") === 0 ? "" : url.searchParams.get("phone");
    const dataRestaurant = {
        name: url.searchParams.get("name"),
        province: url.searchParams.get("province"),
        address: url.searchParams.get("address"),
        ZIP: Number(url.searchParams.get("zip")),
        phone: phoneData,
        url: urlData,
        foodType: url.searchParams.get("foodType"),
        latitude: url.searchParams.get("lat"),
        longitude: url.searchParams.get("long"),
        apiID: url.searchParams.get("apiID"),
        created: new Date(),
        id: user.id,
    };

    const newData = data;
    //Hacemos la petición al back-end
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/addRestaurant.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            newData.restaurantID = this.responseText;
            addScore(newData);
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación del restaurante";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = "none";
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            window.location.href = "http://localhost/SafeTaurant/login.html";
        }
    };
    xmlhttp.send(JSON.stringify(dataRestaurant));
}
checkIsLoggedIn();
checkAddScoreOrAddRestaurantPage()