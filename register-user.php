<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Una aplicación web donde puedes ver y puntuar restaurante según los alérgenos">
    <meta name="keywords" content="alergenos, carta alérgenos, restaurantes, puntuación"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="index.css">
        <link rel="stylesheet" type="text/css" href="register-user.css">
    <link rel="icon" href="./img/favicon.ico" />
    <link rel="apple-touch-icon" href="./img/logo.png" />
    <title>SafeTaurant, restaurantes sin alergias</title>
  </head>
  <body>
    <header class="header">
      <div class="title-container">
        <h1 class="title">Safe<span>Taurant</span></h1>
        <figure class="shield-container">
          <img class="shield" src="./img/shield.png" alt="" />
        </figure>
      </div>
      <nav></nav>
    </header>
    <main class="main">
      <form class="register-form" method="post" action="index.php">
        <h2>¡Te damos la bienvenida!</h2>
        <p>Regístrate para poder acceder a todas las funcionalidades de <span class="logo-text">SafeTaurant</span>. Los campos con un asterisco (*) son obligatorios.</p>
        <div class="input-group">
          <label class="input-label" for="Name">Nombre*: </label>
          <input class="input" id="Name" placeholder="Escribe tu nombre" name="Name" type="text" required />
        </div>
        <div class="input-group">
          <label class="input-label" for="Surname">Apellido: </label>
          <input class="input" id="Surname" placeholder="Escribe tu apellido" name="Surname" type="text" />
        </div>
        <div class="input-group">
          <label class="input-label" for="BirthDate">Fecha de nacimiento*: </label>
          <input class="input" id="BirthDate" placeholder="Escribe tu fecha" name="BirthDate" type="date" required />
        </div>
        <div class="input-group">
          <label class="input-label" for="Email">Correo electrónico*: </label>
          <input class="input" id="Email" placeholder="Escribe tu email" name="Wmail" type="email" required />
        </div>
        <div class="input-group">
          <label class="input-label" for="Password">Contraseña*: </label>
          <input class="input" id="Password" placeholder="Escribe tu contraseña" name="Password" type="password" required />
        </div>
        <div class="input-group">
          <label class="input-label" for="  Allergies">Alergias: </label>
          <textarea id="  Allergies" name=" Allergies" rows="4" cols="50"></textarea>
        </div>
        <div class="checkbox-group">
          <label class="input-label" for="CeliacDisease">¿Celíaquía?</label>
          <input class="input" id="CeliacDisease" name="CeliacDisease" type="checkbox" required />
        </div>
        <div class="checkbox-group">
          <label class="input-label" for="LactoseIntolerance">¿Intolerancia a la lactosa?</label>
          <input class="input" id="LactoseIntolerance" name="LactoseIntolerance" type="checkbox" required />
        </div>
        <button type="submit" class="primary-button">Registrar</button>
        <a class="link-login" href="login.php">Inicia sesión si ya tienes cuenta</a>
      </form>
    </main>
    <footer></footer>
  </body>
</html>