const restaurantContainer = document.getElementById("restaurantContainer");
const feedback = document.getElementById("feedback");
const nav = document.getElementById("nav");
const toggleButton = document.getElementById("toggle");
const restaurantID = new URL(document.URL).searchParams.get('ID');
const add = document.getElementById("add");
const addScore = document.getElementById("addScore");
const scoreText = document.getElementById("scoreText");
const data = {ID: restaurantID};
const numberGeneralBar = document.getElementById("numberGeneralBar");
const attentionScoreBar = document.getElementById("attentionScoreBar");
const numberFidelityBar = document.getElementById("numberFidelityBar");
const loader = document.getElementById("loader");

//Creamos las variables necesarias que usaremos para guardar los datos
let restaurant;
let scores;
let average;
let user;

//Mostramos los datos del restaurante en los inputs
const putData = () => {
    document.getElementById("name").innerHTML = restaurant.name;
    document.getElementById("address").innerHTML = restaurant.address;
    document.getElementById("province").innerHTML = restaurant.province;
    document.getElementById("zip").innerHTML = restaurant.ZIP;
    //Si se ha guardado el teléfono, lo mostramos
    if (restaurant.phone && restaurant.phone !== "0") {
    document.getElementById("phone").innerHTML = restaurant.phone;
    }
    //Si se ha guardado el tipo de comida, lo mostramos
    if (restaurant.foodType && restaurant.foodType !== "") {
    document.getElementById("foodType").innerHTML = restaurant.foodType;
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
    comment.innerHTML = `<span class='highlight'>Comentario: </span>${score.comment || "-"}`;
    fidelityScore.innerHTML = `<span class='highlight'>Puntuación de fidelidad: </span>${score.fidelityScore}`;
    generalScore.innerHTML = `<span class='highlight'>Puntuación general: </span>${score.generalScore}`;
    attentionScore.innerHTML = `<span class='highlight'>Puntuación de atención recibida: </span>${score.attentionScore}`;

    li.appendChild(userName);
    li.appendChild(date);
    li.appendChild(generalScore);
    li.appendChild(allergicReaction);
    li.appendChild(allergenChart);
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

//Obtenemos la información sobre cuántas veces se encontró carta de alérgenos
const getChartsFound = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/charts-found.php", true);
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
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/allergic-reaction.php", true);
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
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/average.php", true);
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
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/scores.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Se guardan las calificaciones en una variable
        scores = JSON.parse(this.responseText);
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

const getAriaLabel = (hasOption) => {
    if (hasOption) return "Sí hay esta opción";
    return "No hay esta opción";
}

const getOptions = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/get-options.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Se guardan las calificaciones en una variable
        options = JSON.parse(this.responseText);

        const celiac = options.celiacDiseaseYes > options.celiacDiseaseNo ? "fa-check" : "fa-xmark";
        document.getElementById("celiacDiseaseOption").classList.add(celiac);
        document.getElementById("celiacDiseaseOption").setAttribute('aria-label', getAriaLabel(celiac))
        const diabetes = options.diabetesYes > options.diabetesNo ? "fa-check" : "fa-xmark";
        document.getElementById("diabetesOption").classList.add(diabetes);
        document.getElementById("diabetesOption").setAttribute('aria-label', getAriaLabel(diabetes))
        const fructose = options.fructoseIntolerantYes > options.fructoseIntolerantNo ? "fa-check" : "fa-xmark";
        document.getElementById("fructoseIntolerantOption").classList.add(fructose);
        document.getElementById("fructoseIntolerantOption").setAttribute('aria-label', getAriaLabel(fructose))
        const lactose = options.lactoseIntolerantYes > options.lactoseIntolerantNo ? "fa-check" : "fa-xmark";
        document.getElementById("lactoseIntolerantOption").classList.add(lactose);
        document.getElementById("lactoseIntolerantOption").setAttribute('aria-label', getAriaLabel(lactose))
        const vegetarian = options.vegetarianYes > options.vegetarianNo ? "fa-check" : "fa-xmark";
        document.getElementById("vegetarianOption").classList.add(vegetarian);
        document.getElementById("vegetarianOption").setAttribute('aria-label', getAriaLabel(vegetarian))
        const vegan = options.veganYes > options.veganNo ? "fa-check" : "fa-xmark";
        document.getElementById("veganOption").classList.add(vegan);
        document.getElementById("veganOption").setAttribute('aria-label', getAriaLabel(vegan))

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
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/isLoggued.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Si se ha iniciado sesión, añadimos un link para añadir una puntuación
        addScore.href = `https://foodiesaurus.miasalazar.com/add-score.html?ID=${restaurantID}`;
        changeMenuAccordingToUser("registered");
    }
    if(this.readyState == 4 && this.status == 401) {
        addScore.classList.add("hidden");
        scoreText.classList.add("hidden");
        changeMenuAccordingToUser("no-registered");
    }
    };
    xmlhttp.send();
}

getRestaurant();
checkIsLoggedIn();