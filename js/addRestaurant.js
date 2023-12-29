const provinceSelect = document.getElementById("province");
const foodSelect = document.getElementById("foodType");
const feedback = document.getElementById("feedback");
const fidelity = document.getElementById("fidelityScoreContainer");
const buttonSubmit = document.getElementById("buttonSubmit");
const error = document.getElementById("error");
const loader = document.getElementById("loader");
const buttonText = document.getElementById("buttonText");
loader.style.display = 'none';

//Variable para comprobar si hay carta de alérgenos
//Si no la hay, la puntuación de fidelidad será 1 directamente y no se mostrará el range input
let allergenChartToggle = false;
let user;
let buttonDisabled = true;
let addresses;
let formData;

document.getElementById("add").addEventListener("submit", submitRestaurant, false);
document.getElementById("allergenChart").addEventListener("change", allergenToggle, false);
document.getElementById("captcha").addEventListener("change", captchaToggle, false);

// Captcha
const signupCaptcha = document.getElementById('signupCaptcha');

signupCaptcha.addEventListener('verified', (e) => {
    document.getElementById("captcha").checked = true;
    buttonSubmit.disabled = false;
});
signupCaptcha.addEventListener('error', (e) => {
    feedback.innerHTML = e.error;
});

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

const checkDuplicatedRestaurant = (latitude, longitude) => {
    const url = new URL(document.URL);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchDuplicates.php?lat=${latitude}&long=${longitude}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            const hasSimilarName = response[0]?.name.toLowerCase().includes(document.getElementById("name").value.toLowerCase());
            if (response.length === 1 && hasSimilarName) {
                formData.latitude = latitude;
                formData.longitude = longitude;
                formData.restaurantID = response[0].restaurantID;
                console.log('yep')
                addScore(formData)
            } else {
                formData.latitude = latitude;
                formData.longitude = longitude;
                registerRestaurant();
            }       
        } else if (this.status == 401) {
            //window.location.href = "http://localhost/SafeTaurant/login.html";
        } else if (this.status == 400) {
            formData.latitude = latitude;
            formData.longitude = longitude;
            registerRestaurant(0, 0)
        } 
    };
    xmlhttp.send();
}

const getAddressAPI = () => {
    const addressComplete = `${document.getElementById("address").value}, ${document.getElementById("province").value}`;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchAddress.php?address=${addressComplete}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addresses = JSON.parse(this.responseText) || [];
            if (addresses.length > 0) {
                formData.latitude = addresses[0].lat;
                formData.longitude = addresses[0].lon;
                checkDuplicatedRestaurant(addresses[0].lat, addresses[0].lon)
            } else {
                formData.latitude = 0;
                formData.longitude = 0;
                registerRestaurant();
            }
        } else if (this.status === 404 || this.status === 204) {
            formData.latitude = 0;
            formData.longitude = 0;
            registerRestaurant()
        }
    };
    xmlhttp.send();
}

function submitRestaurant(event){
    loader.style.display = 'flex';
    event.preventDefault();
    //Mostramos al usuario que la aplicación está en proceso
    buttonText.innerHTML = "Cargando...";
    feedback.innerHTML = "";
    //Creamos el objeto con todos los datos del nuevo restaurante
    formData = {
        name: document.getElementById("name").value,
        province: document.getElementById("province").value,
        address: document.getElementById("address").value,
        ZIP: 0,
        phone: 0,
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
        accesibleMenu: document.querySelector('input[name="accesibleMenu"]:checked').value,
        accesibleTable: document.querySelector('input[name="accesibleTable"]:checked').value,
        accesibleParking: document.querySelector('input[name="accesibleParking"]:checked').value,
        accesibleBathroom: document.querySelector('input[name="accesibleBathroom"]:checked').value,
        apiID: "",
    };
    getAddressAPI();
}

const registerRestaurant = () => {
    //Hacemos la petición al back-end
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/addRestaurant.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            formData.restaurantID = this.responseText;
            addScore(formData)
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación del restaurante";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = 'none';
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            //window.location.href = "http://localhost/SafeTaurant/login.html";
        }
    };
    xmlhttp.send(JSON.stringify(formData));
}

const addScore = (data) =>{
    //Hacemos la petición al back-end      
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/addScore.php", true);
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
            //window.location.href = "http://localhost/SafeTaurant/login.html";
        }
        //Mostramos al usuario que ya no está cargando
        buttonText.innerHTML = "Añadir restaurante";
    };
    xmlhttp.send(JSON.stringify(data));
}

const addOptions = (data) => {
    console.log(data, 'formData add Options')
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/addOptions.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si ha habido éxito, se lo mostramos con un texto y el color verde en él
            feedback.innerHTML = "Creado correctamente";
            feedback.classList.add("success");
            feedback.classList.remove("error");
            //window.location.href = "http://localhost/SafeTaurant/";
        } else if (this.status == 424) {
            //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
            feedback.innerHTML = "Hubo un error en la creación de la puntuación";
            feedback.classList.add("error");
            feedback.classList.remove("success");
            loader.style.display = 'none';
        } else if (this.status == 401) {
            //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
            //window.location.href = "http://localhost/SafeTaurant/login.html";
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
            //window.location.href = "http://localhost/SafeTaurant/login.html";
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
        if (this.readyState == 4 && this.status == 200) {
            fillSelects();
            getProfile()
        } else if (this.status == 401) {
            //window.location.href = "http://localhost/SafeTaurant/login.html";
        } else if (this.status == 400) {
            //Si hay un error, devolvemos un error
            subtitle.innerHTML = "Hubo un error al encontrar los datos del usuario";
        } 
    };
    xmlhttp.send();
}
checkIsLoggedIn();