const restaurantContainer = document.getElementById("restaurantContainer");
const feedback = document.getElementById("feedback");
const nav = document.getElementById("nav");
const restaurantID = new URL(document.URL).searchParams.get('ID');
const add = document.getElementById("add");
const scoreText = document.getElementById("scoreText");
const data = {ID: restaurantID};
const numberGeneralBar = document.getElementById("numberGeneralBar");
const attentionScoreBar = document.getElementById("attentionScoreBar");
const numberFidelityBar = document.getElementById("numberFidelityBar");
const numberChartBar = document.getElementById("numberChartBar");
const loader = document.getElementById("loader");
const buttonContainer = document.getElementById("buttonContainer")
const accesibilityOptions = document.getElementById("accesibilityOptions");

let averageAttentionPercent
let averageChart
let averageFidelityPercent
let allergenReactionPercent

//Creamos las variables necesarias que usaremos para guardar los datos
let restaurant;
let scores;
let average;
let isLoggedIn;
let config;

accesibilityOptions.style.display = "none";

//Mostramos los datos del restaurante en los inputs
const putData = () => {
    document.getElementById("name").innerHTML = restaurant.name;
    document.getElementById("address").innerHTML = restaurant.address;
    document.getElementById("province").innerHTML = restaurant.province;
    //Si se ha guardado el tipo de comida, lo mostramos
    if (restaurant.foodType && restaurant.foodType !== "") {
        document.getElementById("foodType").innerHTML = restaurant.foodType;
    }
    if (restaurant.phone && restaurant.phone !== "" && restaurant.phone != 0) {
        document.getElementById("phone").innerHTML = restaurant.phone;
    }
    if (restaurant.ZIP && restaurant.ZIP !== "" && restaurant.ZIP != 0) {
        document.getElementById("zip").innerHTML = restaurant.ZIP;
    }
    if (restaurant.url && restaurant.url !== "" && restaurant.url != 0) {
        document.getElementById("url").innerHTML = restaurant.url;
        document.getElementById("url").href = restaurant.url;
    }
    getScores();
}

//Para cada puntuación creamos un <li> con los datos y lo introducimos en la <ul>
const putScores = () => {
    const scoresList = document.getElementById("scoresList");
    const scoresWithComments = scores.filter(score => score.comment !== '')
    document.getElementById("totalComments").innerHTML = scoresWithComments.length;
    scoresWithComments.forEach((score) => {
        let li = document.createElement("li");
        let date = document.createElement("small");
        let userName = document.createElement("h4");
        let allergicReaction = document.createElement("p");
        let allergenChart = document.createElement("p");
        let comment = document.createElement("p");
        let fidelityScore = document.createElement("p");
        let generalScore = document.createElement("p");
        let attentionScore = document.createElement("p");

        date.innerHTML = score.created;
        userName.innerHTML = score.userName;
        allergicReaction.innerHTML= `<span class='highlight'>¿Reacción alérgica?: </span>${score.allergicReaction === "1" ? "Sí" : "No"}`;
        allergenChart.innerHTML= `<span class='highlight'>¿Carta de alérgenos?: </span>${score.allergenChart === "1" ? "Sí" : "No"}`;
        comment.innerHTML = score.comment;
        generalScore.innerHTML = score.generalScore;
        generalScore.classList.add("principal-score-comment");
        fidelityScore.innerHTML = `<span class='highlight'>Calidad de la carta de alérgenos: </span>${score.fidelityScore}/10`;
        attentionScore.innerHTML = `<span class='highlight'>Atención recibida: </span>${score.attentionScore}/10`;

        li.appendChild(userName);
        li.appendChild(date);
        li.appendChild(generalScore);
        li.appendChild(allergicReaction);
        if (score.allergenChart === "1") {
            li.appendChild(allergenChart);
        }
        li.appendChild(fidelityScore);
        li.appendChild(attentionScore);
        li.appendChild(comment);

        scoresList.appendChild(li);
    });
    getAverage();
}

//Mostramos la puntuación media del restaurante en los inputs
const putAverage = () => {
    const averageFidelity = Math.floor(average.fidelityScore);
    const averageAttention = Math.floor(average.attentionScore);
    averageAttentionPercent =  averageAttention * 10
    averageFidelityPercent = averageFidelity * 10
    const averageFidelityId = document.getElementById("numberFidelity");
    const averageAttentionId = document.getElementById("attentionScore");

    //Fidelity
    averageFidelityId.innerHTML = averageFidelity;
    numberFidelityBar.style.width = `${averageFidelity}0%`;
    
    //Attention
    averageAttentionId.innerHTML = averageAttention;
    attentionScoreBar.style.width = `${averageAttention}0%`;
    getChartsFound();
}

const getMap = (latitude, longitude) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/getRestaurantMap.php?lat=${latitude}&long=${longitude}`, true);
    xmlhttp.responseType = 'blob';
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
            //Si no hay ninguno, mostramos un mensaje indicando lo contrario
            const imageUrl = URL.createObjectURL(xmlhttp.response);
            document.getElementById("map").src = imageUrl;
        } else if (this.status === 400) {

        }
    };
    xmlhttp.send();
}

const getStaticData = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://localhost/SafeTaurant/controllers/searchRestaurantConfig.php?restaurantID=${restaurant.restaurantID}`, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            //Si se encuentran restaurantes que coincidan con los filtros de búsqueda, llamamos a la función para pintar todos los restaurantes y mostramos un mensaje
            //Si no hay ninguno, mostramos un mensaje indicando lo contrario
            if (this.status == 200) {
                config = JSON.parse(xmlhttp.response)
            }
            putData();
        }

    };
    xmlhttp.send();
}

//Obtenemos los datos del restaurante
const getRestaurant = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/restaurant.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Si se ha encontrado el restaurante, llamamos a las funciones que muestran la información en la página y a la que  busca las calificaciones
        //Se guarda la información del restaurante
        restaurant = JSON.parse(this.responseText);
        getMap(restaurant.latitude, restaurant.longitude);
        getStaticData();
    } else if (this.status == 404) {
        //Si no se encuentra el ID del restaurante, le dejamos este mensaje
        restaurantContainer.innerHTML = "No hay un restaurante con este ID";
        loader.style.display = 'none';
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

//Obtenemos la información sobre cuántas veces se encontró carta de alérgenos
const getChartsFound = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/chartsFound.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("totalOpinions").innerHTML = average.totalReviews;
        averageChart = this.responseText * 100 / average.totalReviews;
        numberChartBar.style.width = `${averageChart}%`;
        document.getElementById("chartPercent").innerHTML = `${averageChart}%`;
        getAllergicReactions();
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

const elementConfig = (config, id) => {
    const hasOption = config === 1;
    const iconOption = hasOption ? "fa-check" : "fa-xmark";
    const ariaOpcion = hasOption ? "Sí hay esta opción"  : "No hay esta opción";
    document.getElementById(id).classList.add(iconOption);
    document.getElementById(id).setAttribute('aria-label', ariaOpcion)
}

const putConfig  = () => {
    elementConfig (config.celiacDisease, "celiacDiseaseOption");
    elementConfig (config.diabetes, "diabetesOption");
    elementConfig (config.fructoseIntolerant, "fructoseIntolerantOption");
    elementConfig (config.lactoseIntolerant, "lactoseIntolerantOption");
    elementConfig (config.vegetarian, "vegetarianOption");
    elementConfig (config.vegan, "veganOption");

    if (config.accesibleMenu || config.accesibleTable || config.accesibleParking || config.accesibleBathroom) {
        accesibilityOptions.style.display = "block";
        document.getElementById("restaurantTitle").style.display="none";
        addAccesibilityOption(config.accesibleMenu, "Menú accesible");
        addAccesibilityOption(config.accesibleTable, "Mesa accesible");
        addAccesibilityOption(config.accesibleParking, "Parking accesible");
        addAccesibilityOption(config.accesibleBathroom, "Baño accesible");
    }

    loader.style.display = 'none';
    restaurantContainer.style.display = 'block';
}

//Obtenemos la información sobre cuántas veces se encontró carta de alérgenos
const getAllergicReactions = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/allergicReaction.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        allergenReactionPercent = Math.floor(this.responseText * 100 / average.totalReviews);
        document.getElementById("numberBarAllergen").innerHTML = `${allergenReactionPercent}%`;
        document.getElementById("allergenScoreBar").style.width = `${allergenReactionPercent}%`;

        if (config) {
            putConfig();
        } else {
            getOptions();
        }
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

//Obtenemos la información de todas las puntuaciones medias
const getAverage = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/average.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Guardamos los datos en una variable
        //Colocamos los datos de las calificaciones medias en la página
        average = JSON.parse(this.responseText);
        putAverage();
    } else if (this.status == 404) {
        //Si no se encuentra el ID del restaurante, le dejamos este mensaje
        restaurantContainer.innerHTML = "No hay puntuaciones medias para este restaurante";
        loader.style.display = 'none';
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

//Obtenemos las puntuaciones
const getScores = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/scores.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Se guardan las calificaciones en una variable
        scores = JSON.parse(this.responseText) || [];
        //Llamamos a la función que añade en la página todas las puntuaciones
        putScores();
    } else if (this.status == 400) {
        //Si no encontramos las puntuaciones, mostramos un mensaje
        document.getElementById("scores").innerHTML = "No hay comentarios para este restaurante";
        loader.style.display = 'none';
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

const getAriaLabel = (yes, no) => {
    if (yes === no) return "No se sabe si hay esta opción"
    if (yes > no) return "Sí hay esta opción";
    return "No hay esta opción";
}

const getIcon = (yes, no) => {
    if (yes === no) return "fa-question"
    if (yes > no) return "fa-check";
    return "fa-xmark";
}

const getOptions = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/options.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Se guardan las calificaciones en una variable
        options = JSON.parse(this.responseText);

        const celiac = getIcon(options.celiacDiseaseYes, options.celiacDiseaseNo);
        document.getElementById("celiacDiseaseOption").classList.add(celiac);
        document.getElementById("celiacDiseaseOption").setAttribute('aria-label', getAriaLabel(options.celiacDiseaseYes, options.celiacDiseaseNo))
        const diabetes = getIcon(options.diabetesYes, options.diabetesNo);
        document.getElementById("diabetesOption").classList.add(diabetes);
        document.getElementById("diabetesOption").setAttribute('aria-label', getAriaLabel(options.diabetesYes, options.diabetesNo))
        const fructose = getIcon(options.fructoseIntolerantYes, options.fructoseIntolerantNo);
        document.getElementById("fructoseIntolerantOption").classList.add(fructose);
        document.getElementById("fructoseIntolerantOption").setAttribute('aria-label', getAriaLabel(options.fructoseIntolerantYes, options.fructoseIntolerantNo))
        const lactose = getIcon(options.lactoseIntolerantYes, options.lactoseIntolerantNo);
        document.getElementById("lactoseIntolerantOption").classList.add(lactose);
        document.getElementById("lactoseIntolerantOption").setAttribute('aria-label', getAriaLabel(options.lactoseIntolerantYes, options.lactoseIntolerantNo))
        const vegetarian = getIcon(options.vegetarianYes, options.vegetarianNo);
        document.getElementById("vegetarianOption").classList.add(vegetarian);
        document.getElementById("vegetarianOption").setAttribute('aria-label', getAriaLabel(options.vegetarianYes, options.vegetarianNo))
        const vegan = getIcon(options.veganYes, options.veganNo);
        document.getElementById("veganOption").classList.add(vegan);
        document.getElementById("veganOption").setAttribute('aria-label', getAriaLabel(options.veganYes, options.veganNo))

        getAccesibility(options);
        getGeneralScore(averageAttentionPercent, averageChart, averageFidelityPercent, allergenReactionPercent)

    } else if (this.status == 400) {
        //Si no encontramos las puntuaciones, mostramos un mensaje
        document.getElementById("scores").innerHTML = "No hay opciones disponibles para este restaurante";
        loader.style.display = 'none';
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

const addAccesibilityOption = (option, text) => {
    if(option) {
        let li = document.createElement("li");
        li.classList.add("info-list-item");
        li.innerHTML = text;
        accesibilityOptions.appendChild(li);
    }
}

const getAccesibility = (options) => {
    const hasAccesibleMenu = options.accesibleMenuYes > options.accesibleMenuNo;
    const hasAccesibleTable = options.accesibleTableYes > options.accesibleTableNo;
    const hasAccesibleParking = options.accesibleParkingYes > options.accesibleParkingNo;
    const hasAccesibleBathroom = options.accesibleBathroomYes > options.accesibleBathroomNo;
    if (hasAccesibleMenu || hasAccesibleTable || hasAccesibleParking || hasAccesibleBathroom) {
        accesibilityOptions.style.display = "block";
        document.getElementById("restaurantTitle").style.display="none";

        addAccesibilityOption(hasAccesibleMenu, "Menú accesible");
        addAccesibilityOption(hasAccesibleTable, "Mesa accesible");
        addAccesibilityOption(hasAccesibleParking, "Parking accesible");
        addAccesibilityOption(hasAccesibleBathroom, "Baño accesible");
    }
}

//Comprobamos si se ha iniciado sesión
const checkIsLoggedIn = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost/SafeTaurant/controllers/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Si se ha iniciado sesión, añadimos un link para añadir una puntuación
        isLoggedIn = true;
        showAddButtonWhenNoResults()
        changeMenuAccordingToUser("registered");
    }
    if(this.readyState == 4 && this.status == 401) {
        isLoggedIn = false;
        changeMenuAccordingToUser("no-registered");
    }
    };
    xmlhttp.send();
}

//Función cuando no hay resultados
const showAddButtonWhenNoResults = () => {
    if (isLoggedIn && !document.getElementById("addReview")) {
        let link = document.createElement("a");
        link.setAttribute("id","addReview");
        link.href = `http://localhost/SafeTaurant/restaurant/add-score.html?ID=${restaurantID}`;;
        link.classList.add("primary-button");
        link.classList.add("add-button");
        link.innerHTML = "Añadir nueva opinión"
        buttonContainer.appendChild(link);
    }
}


const getGeneralScore = (attention, chart, fidelity, reaction) => {
    const averageGeneralId = document.getElementById("numberGeneral");
    const reactionPositive = reaction === 0 ? 50 : - (reaction - 100) * 5
    const generalScore = Math.floor(((attention * 0.2) + (chart * 0.15) + (fidelity * 0.15) + (reactionPositive)) / 10)
    numberGeneralBar.style.width = `${generalScore}0%`;
    averageGeneralId.innerHTML = generalScore;
    document.getElementById("score").innerHTML = generalScore
    loader.style.display = 'none';
    restaurantContainer.style.display = 'block';
}


getRestaurant();
checkIsLoggedIn();