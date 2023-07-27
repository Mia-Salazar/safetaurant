const found = document.getElementById("found");
const loader = document.getElementById("loader");
let scores;

//Obtenemos los datos del usuario
const putScores = () => {
    const scoresList = document.getElementById("list");
    scores.forEach((score) => {
    let li = document.createElement("li");
    let date = document.createElement("small");
    let userName = document.createElement("h4");
    let allergenChart = document.createElement("p");
    let comment = document.createElement("p");
    let fidelityScore = document.createElement("p");
    let generalScore = document.createElement("p");
    let attentionScore = document.createElement("p");
    let allergicReaction = document.createElement("p");
    let feedback = document.createElement("p");
    let link = document.createElement("a");
    let button = document.createElement("button");

    date.innerHTML = score.created;
    userName.innerHTML = score.userName;
    allergicReaction.innerHTML= `<span class='highlight'>¿Reacción alérgica?: </span>${score.allergicReaction === "1" ? "Sí" : "No"}`;
    allergenChart.innerHTML= `<span class='highlight'>¿Carta de alérgenos?: </span>${score.allergenChart === "1" ? "Sí" : "No"}`;
    comment.innerHTML = `<span class='highlight'>Comentario: </span>${score.comment || "-"}`;
    fidelityScore.innerHTML = `<span class='highlight'>Puntuación de fidelidad: </span>${score.fidelityScore}`;
    generalScore.innerHTML = `<span class='highlight'>Puntuación general: </span>${score.generalScore}`;
    attentionScore.innerHTML = `<span class='highlight'>Puntuación de atención recibida: </span>${score.attentionScore}`;
    link.innerHTML = `Ver restaurante`;
    link.href=`https://foodiesaurus.miasalazar.com/index.html?ID=${score.restaurantID}`
    button.innerHTML = "Eliminar";

    button.classList.add("primary-button");
    button.classList.add("primary-button--ghost");
    link.classList.add("primary-button");
    button.setAttribute("id", `score-${score.scoreID}`);
    button.addEventListener("click", () => {
        deleteComment(score.scoreID, score.restaurantID)
    });
    feedback.setAttribute("id", `feedback-${score.scoreID}`);

    li.appendChild(userName);
    li.appendChild(date);
    li.appendChild(generalScore);
    li.appendChild(allergenChart);
    li.appendChild(allergicReaction);
    li.appendChild(fidelityScore);
    li.appendChild(attentionScore);
    li.appendChild(comment);
    li.appendChild(feedback);
    li.appendChild(button);
    li.appendChild(link);

    scoresList.appendChild(li);
    })
    loader.style.display = 'none';
};

const deleteComment = (scoreID, restaurantID) => {
    loader.style.display = 'flex';
    const feedback = document.getElementById(`feedback-${scoreID}`);
    const buttonSubmit = document.getElementById(`score-${scoreID}`);
    buttonSubmit.innerHTML = "Cargando...";
    //Creamos un objeto con los datos
    const data = {
    scoreID,
    restaurantID
    };
    //Hacemos la petición al back-end
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "https://foodiesaurus.miasalazar.com/controller/delete-comment.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        location.reload();
    } else if (this.status == 424) {
        //Si ha ocurrido algún error, le mostramos un texto de error y se lo ponemos de color rojo
        feedback.innerHTML = "Error";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        loader.style.display = 'none';
    } else if (this.status == 401) {
        //Si el usuario no ha iniciado sesión lo expulsamos a la página de inicio de sesión
        window.location.href = "https://foodiesaurus.miasalazar.com/login.html";
    } else if (this.status == 409) {
        feedback.innerHTML = "No puedes eliminar todas las puntuaciones de un restaurante";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        loader.style.display = 'none';
    }
    buttonSubmit.innerHTML = "Eliminar";
    };
    xmlhttp.send(JSON.stringify(data));
}

//Obtenemos los datos del usuario
const getScores = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://foodiesaurus.miasalazar.com/controller/profile-scores.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //Si ha habido éxito, guardamos los datos del usuario en la variable user
        scores = JSON.parse(this.responseText);
        if (scores.length !== 0) {
        found.innerHTML = `Has realizado ${scores.length} evaluaciones`;
        putScores();
        } else {
        found.innerHTML = "No has hecho ninguna evaluación";
        loader.style.display = 'none';
        }
    } else if (this.status == 401) {
        //Si la persona no está autorizada, la expulsamos
        window.location.href = "https://foodiesaurus.miasalazar.com/login.html";
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
        getScores();
    } else if (this.status == 401) {
        //Si no ha iniciado sesión, le expulsamos al login
        window.location.href = "https://foodiesaurus.miasalazar.com/login.html";
    }  
    };
    xmlhttp.send();
}

checkIsLoggedIn();