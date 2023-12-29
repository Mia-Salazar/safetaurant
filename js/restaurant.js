const restaurantContainer = document.getElementById("restaurantContainer");
const feedback = document.getElementById("feedback");
const nav = document.getElementById("nav");
const toggleButton = document.getElementById("toggle");
const restaurantID = new URL(document.URL).searchParams.get('ID');
const add = document.getElementById("add");
const scoreText = document.getElementById("scoreText");
const data = {ID: restaurantID};
const numberGeneralBar = document.getElementById("numberGeneralBar");
const attentionScoreBar = document.getElementById("attentionScoreBar");
const numberFidelityBar = document.getElementById("numberFidelityBar");
const loader = document.getElementById("loader");
const buttonContainer = document.getElementById("buttonContainer")

//Creamos las variables necesarias que usaremos para guardar los datos
let restaurant;
let scores;
let average;
let isLoggedIn;

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
    const averageGeneral = Math.floor(average.generalScore);
    const averageFidelity = Math.floor(average.fidelityScore);
    const averageAttention = Math.floor(average.attentionScore);
    const averageGeneralId = document.getElementById("numberGeneral");
    const averageFidelityId = document.getElementById("numberFidelity");
    const averageAttentionId = document.getElementById("attentionScore");
    document.getElementById("score").innerHTML = averageGeneral

    //General
    document.getElementById("totalOpinions").innerHTML = average.totalReviews;
    numberGeneralBar.style.width = `${averageGeneral}0%`;
    averageGeneralId.innerHTML = averageGeneral;
    //Fidelity
    averageFidelityId.innerHTML = averageFidelity;
    numberFidelityBar.style.width = `${averageFidelity}0%`;
    
    //Attention
    averageAttentionId.innerHTML = averageAttention;
    attentionScoreBar.style.width = `${averageAttention}0%`;
    getChartsFound();
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
        putData();
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
        document.getElementById("chartNumber").innerHTML = this.responseText;
        document.getElementById("chartPercent").innerHTML = this.responseText * 100 / average.totalReviews;
        getAllergicReactions();
    }   
    };
    xmlhttp.send(JSON.stringify(data));
}

//Obtenemos la información sobre cuántas veces se encontró carta de alérgenos
const getAllergicReactions = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/SafeTaurant/controllers/allergicReaction.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const percent = Math.floor(this.responseText * 100 / average.totalReviews);
        document.getElementById("chartAllergenNumber").innerHTML = this.responseText;
        document.getElementById("totalBarAllergen").innerHTML = average.totalReviews;
        document.getElementById("numberBarAllergen").innerHTML = this.responseText;
        document.getElementById("chartAllergenPercent").innerHTML = percent;
        document.getElementById("allergenScoreBar").style.width = `${percent}%`;
        getOptions();
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
        document.getElementById("totalScores").innerHTML = average.totalReviews
        document.getElementById("totalScoresAllergen").innerHTML = average.totalReviews
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
        loader.style.display = 'none';
        restaurantContainer.style.display = 'block';
    } else if (this.status == 400) {
        //Si no encontramos las puntuaciones, mostramos un mensaje
        document.getElementById("scores").innerHTML = "No hay opciones disponibles para este restaurante";
        loader.style.display = 'none';
    }   
    };
    xmlhttp.send(JSON.stringify(data));
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
        link.href = `http://localhost/SafeTaurant/restaurant/addScore.html?ID=${restaurantID}`;;
        link.classList.add("primary-button");
        link.classList.add("add-button");
        link.innerHTML = "Añadir nueva opinión"
        buttonContainer.appendChild(link);
    }
}

getRestaurant();
checkIsLoggedIn();